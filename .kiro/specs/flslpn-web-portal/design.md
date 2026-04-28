# Design Document: FLSLPN Web Portal

## Overview

The FLSLPN Web Portal is a public-facing website for the Female Law Students & Legal Professionals Network at Haramaya University. It is a content-driven application where non-technical administrators manage all dynamic content (events, team members, announcements, hero images) through a Sanity CMS dashboard, while visitors browse a polished, accessible, mobile-first interface.

The stack is:
- **Framework**: Next.js 14+ (App Router, TypeScript)
- **Styling**: Tailwind CSS with `class`-based dark mode
- **Animations**: Framer Motion
- **CMS**: Sanity v3 (headless, real-time content delivery)
- **Deployment**: Vercel (production on `main`, preview on PRs)
- **Image handling**: Next.js `<Image>` component + Sanity image pipeline

The design follows a clear separation of concerns: Sanity owns all mutable content, Next.js owns routing and rendering, and Tailwind owns visual presentation. Data flows from Sanity → GROQ queries in `lib/sanity/` → React Server Components → UI components.

---

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Vercel Edge                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Next.js App Router (SSG + ISR)          │   │
│  │                                                      │   │
│  │  app/                                                │   │
│  │  ├── (site)/          ← public-facing pages          │   │
│  │  │   ├── page.tsx     ← Home                         │   │
│  │  │   ├── about/       ← About                        │   │
│  │  │   ├── events/      ← Events list + [slug]         │   │
│  │  │   ├── team/        ← Team                         │   │
│  │  │   ├── join/        ← Join form                    │   │
│  │  │   └── contact/     ← Contact form                 │   │
│  │  └── studio/          ← Sanity Studio (embedded)     │   │
│  └──────────────────────────────────────────────────────┘   │
│                          │                                   │
│                    GROQ queries                              │
│                          │                                   │
│  ┌───────────────────────▼──────────────────────────────┐   │
│  │              Sanity Content Lake (CDN)               │   │
│  │  Documents: Event, TeamMember, SiteSettings,         │   │
│  │             Announcement                             │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Rendering Strategy

| Page | Strategy | Rationale |
|---|---|---|
| Home (`/`) | ISR (revalidate: 60s) | Hero images and events change infrequently |
| About (`/about`) | ISR (revalidate: 300s) | Rarely updated |
| Events list (`/events`) | ISR (revalidate: 60s) | New events added periodically |
| Event detail (`/events/[slug]`) | SSG + `generateStaticParams` | Pre-render known slugs at build time |
| Team (`/team`) | ISR (revalidate: 300s) | Team changes infrequently |
| Join (`/join`) | Static | Form page, no CMS data |
| Contact (`/contact`) | Static | Form page, no CMS data |
| Sanity Studio (`/studio`) | Client-side only | Admin tool, not public |

ISR (Incremental Static Regeneration) satisfies Requirement 2.5 — content updates are reflected on the next page request without a code deployment.

---

## Components and Interfaces

### Project Folder Structure

```
flslpn-web-portal/
├── app/
│   ├── layout.tsx                  ← Root layout (Navbar, Footer, ThemeProvider)
│   ├── globals.css                 ← Tailwind base + custom CSS variables
│   ├── (site)/
│   │   ├── page.tsx                ← Home page
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── events/
│   │   │   ├── page.tsx            ← Events listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx        ← Event detail
│   │   ├── team/
│   │   │   └── page.tsx
│   │   ├── join/
│   │   │   └── page.tsx
│   │   └── contact/
│   │       └── page.tsx
│   ├── studio/
│   │   └── [[...tool]]/
│   │       └── page.tsx            ← Embedded Sanity Studio
│   └── api/
│       ├── join/
│       │   └── route.ts            ← Join form submission handler
│       └── contact/
│           └── route.ts            ← Contact form submission handler
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── MobileDrawer.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ThemeProvider.tsx
│   │   ├── home/
│   │   │   ├── HeroCarousel.tsx
│   │   │   ├── MissionSection.tsx
│   │   │   ├── EventsPreview.tsx
│   │   │   └── JoinCTA.tsx
│   │   ├── events/
│   │   │   ├── EventCard.tsx
│   │   │   ├── EventGrid.tsx
│   │   │   └── EventGallery.tsx
│   │   ├── team/
│   │   │   ├── TeamCard.tsx
│   │   │   └── TeamGrid.tsx
│   │   ├── forms/
│   │   │   ├── JoinForm.tsx
│   │   │   └── ContactForm.tsx
│   │   └── ui/
│   │       ├── Skeleton.tsx
│   │       ├── ScrollReveal.tsx
│   │       ├── ThemeToggle.tsx
│   │       └── PortableTextRenderer.tsx
│   ├── lib/
│   │   ├── sanity/
│   │   │   ├── client.ts           ← Sanity client configuration
│   │   │   ├── queries.ts          ← All GROQ query strings
│   │   │   └── image.ts            ← Sanity image URL builder
│   │   └── utils.ts                ← Shared utility functions
│   ├── hooks/
│   │   ├── useTheme.ts
│   │   └── useScrolled.ts
│   ├── types/
│   │   └── index.ts                ← TypeScript interfaces for CMS documents
│   └── styles/
│       └── fonts.ts                ← Next.js font configuration
├── sanity/
│   ├── sanity.config.ts            ← Sanity project configuration
│   ├── schemaTypes/
│   │   ├── index.ts                ← Schema registry
│   │   ├── event.ts
│   │   ├── teamMember.ts
│   │   ├── siteSettings.ts
│   │   └── announcement.ts
│   └── lib/
│       └── image.ts                ← Sanity image helper (shared)
├── public/
│   └── favicon.ico
├── Resource/                       ← Existing assets (read-only reference)
│   ├── image/                      ← 120 source images (.jpg, .HEIC)
│   └── others/
│       ├── FLSN info.docx
│       └── logo.webp
├── scripts/
│   └── upload-images.ts            ← One-time script to upload Resource/image/ to Sanity
├── .env.local                      ← Local secrets (gitignored)
├── .env.example                    ← Committed template
├── vercel.json
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

### Component Interfaces

#### Navbar

```typescript
// src/components/layout/Navbar.tsx
// No props — reads theme from context, active route from usePathname()
export function Navbar(): JSX.Element

// Internal state:
// - isDrawerOpen: boolean
// - isScrolled: boolean (via useScrolled hook, triggers at 80px)
```

The Navbar is a Client Component (`'use client'`) because it manages drawer state and scroll detection. It renders the logo, desktop nav links, `ThemeToggle`, and a hamburger button. On mobile, it renders `MobileDrawer`.

#### MobileDrawer

```typescript
interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
}

interface NavLink {
  href: string;
  label: string;
}
```

Animated with Framer Motion (`AnimatePresence` + slide-in from right). Closes on link click and on backdrop click.

#### Footer

```typescript
// No props — static content + SiteSettings.contactEmail passed as prop
interface FooterProps {
  contactEmail: string;
}
```

Server Component. Receives `contactEmail` from the root layout which fetches `SiteSettings` once.

#### HeroCarousel

```typescript
interface HeroCarouselProps {
  slides: HeroSlide[];
  missionStatement: string;
  organizationName: string;
}

interface HeroSlide {
  _key: string;
  asset: SanityImageAsset;
  alt: string;
}
```

Client Component. Uses Framer Motion `AnimatePresence` for cross-fade transitions (400–700ms). Auto-advances every 5 seconds via `useEffect` + `setInterval`. Navigation input is locked during transitions via a `isTransitioning` ref.

#### EventCard

```typescript
interface EventCardProps {
  event: Event;
  variant?: 'preview' | 'full'; // 'preview' for home page, 'full' for /events
}
```

#### TeamCard

```typescript
interface TeamCardProps {
  member: TeamMember;
}
// Bio revealed on hover via CSS group-hover + Tailwind transition
```

#### Skeleton

```typescript
interface SkeletonProps {
  className?: string;
  count?: number; // renders N skeleton blocks
}
```

#### ScrollReveal

```typescript
interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number; // stagger delay in seconds
}
// Uses Framer Motion whileInView + viewport: { once: true }
```

#### PortableTextRenderer

```typescript
interface PortableTextRendererProps {
  value: PortableTextBlock[]; // Sanity Portable Text
  className?: string;
}
// Uses @portabletext/react with custom component overrides for brand styling
```

#### JoinForm / ContactForm

Both are Client Components using `react-hook-form` + `zod` for validation. They call Next.js API routes (`/api/join`, `/api/contact`) via `fetch`. Submission state machine: `idle → submitting → success | error`.

---

## Data Models

### TypeScript Interfaces (`src/types/index.ts`)

```typescript
import type { PortableTextBlock } from '@portabletext/types';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export interface SanityImageAsset {
  _type: 'image';
  asset: SanityImageSource;
  alt?: string;
}

export interface Event {
  _id: string;
  _type: 'event';
  title: string;
  date: string; // ISO 8601
  description: PortableTextBlock[];
  slug: { current: string };
  coverImage: SanityImageAsset;
  gallery: SanityImageAsset[];
}

export interface TeamMember {
  _id: string;
  _type: 'teamMember';
  name: string;
  role: string;
  photo: SanityImageAsset;
  bio?: string;
  order: number;
}

export interface SiteSettings {
  _id: 'siteSettings';
  _type: 'siteSettings';
  heroImages: HeroSlide[];
  aboutText: PortableTextBlock[];
  missionStatement: string;
  contactEmail: string;
}

export interface HeroSlide {
  _key: string;
  asset: SanityImageSource;
  alt: string;
}

export interface Announcement {
  _id: string;
  _type: 'announcement';
  title: string;
  body: PortableTextBlock[];
  publishedAt: string;
  isActive: boolean;
}

// Form submission payloads
export interface JoinFormData {
  fullName: string;
  email: string;
  phone?: string;
  yearOfStudy: '1st' | '2nd' | '3rd' | '4th' | '5th' | 'Graduate';
  areasOfInterest?: string[];
  message?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
```

### Sanity Schema Definitions (`sanity/schemaTypes/`)

#### `event.ts`

```typescript
import { defineField, defineType } from 'sanity';

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'date', type: 'datetime', validation: (r) => r.required() }),
    defineField({ name: 'description', type: 'array', of: [{ type: 'block' }] }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'coverImage', type: 'image', options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string' })] }),
    defineField({
      name: 'gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true },
        fields: [defineField({ name: 'alt', type: 'string' })] }],
    }),
  ],
  orderings: [{ title: 'Date, Newest', name: 'dateDesc',
    by: [{ field: 'date', direction: 'desc' }] }],
});
```

#### `teamMember.ts`

```typescript
export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'role', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'photo', type: 'image', options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string' })] }),
    defineField({ name: 'bio', type: 'text', rows: 4 }),
    defineField({ name: 'order', type: 'number', initialValue: 99 }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc',
    by: [{ field: 'order', direction: 'asc' }] }],
});
```

#### `siteSettings.ts`

```typescript
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // Singleton: enforced via __experimental_actions in Sanity config
  fields: [
    defineField({
      name: 'heroImages',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true },
        fields: [defineField({ name: 'alt', type: 'string', validation: (r) => r.required() })] }],
      validation: (r) => r.required().min(3).max(3).error('Exactly 3 hero images required'),
    }),
    defineField({ name: 'aboutText', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'missionStatement', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'contactEmail', type: 'string',
      validation: (r) => r.required().email() }),
  ],
});
```

#### `announcement.ts`

```typescript
export const announcement = defineType({
  name: 'announcement',
  title: 'Announcement',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'body', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'publishedAt', type: 'datetime' }),
    defineField({ name: 'isActive', type: 'boolean', initialValue: true }),
  ],
});
```

### GROQ Queries (`src/lib/sanity/queries.ts`)

```typescript
// Site settings (used in root layout)
export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  heroImages[]{ asset, alt },
  aboutText,
  missionStatement,
  contactEmail
}`;

// 3 most recent events for home page preview
export const RECENT_EVENTS_QUERY = `*[_type == "event"] | order(date desc) [0..2]{
  _id, title, date, slug, coverImage{ asset, alt }
}`;

// All events for listing page
export const ALL_EVENTS_QUERY = `*[_type == "event"] | order(date desc){
  _id, title, date, slug, coverImage{ asset, alt }
}`;

// Single event by slug
export const EVENT_BY_SLUG_QUERY = `*[_type == "event" && slug.current == $slug][0]{
  _id, title, date, description, slug,
  coverImage{ asset, alt },
  gallery[]{ asset, alt, _key }
}`;

// All event slugs for generateStaticParams
export const EVENT_SLUGS_QUERY = `*[_type == "event"]{ "slug": slug.current }`;

// All team members ordered by display order
export const TEAM_MEMBERS_QUERY = `*[_type == "teamMember"] | order(order asc){
  _id, name, role, photo{ asset, alt }, bio, order
}`;

// Active announcements for About page
export const ACTIVE_ANNOUNCEMENTS_QUERY = `*[_type == "announcement" && isActive == true]
  | order(publishedAt desc){
  _id, title, body, publishedAt
}`;
```

### Sanity Client (`src/lib/sanity/client.ts`)

```typescript
import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // CDN for public reads; set false for draft previews
});

// Typed fetch helper
export async function sanityFetch<T>(
  query: string,
  params?: Record<string, unknown>
): Promise<T> {
  return client.fetch<T>(query, params ?? {});
}
```

---

## Theming Strategy

### Tailwind Configuration (`tailwind.config.ts`)

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  darkMode: 'class', // class-based: <html class="dark">
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A1628',
          light: '#1A2E4A',
          dark: '#060E1A',
        },
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E2C97E',
          dark: '#A07830',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
```

### ThemeProvider (`src/components/layout/ThemeProvider.tsx`)

```typescript
'use client';
// Wraps children, reads localStorage on mount, applies 'dark' class to <html>
// Exposes ThemeContext: { theme: 'dark' | 'light', toggle: () => void }
```

**Theme initialization script** — injected into `<head>` as an inline `<script>` to prevent flash of unstyled content (FOUC):

```html
<script>
  (function() {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!stored && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  })();
</script>
```

This script runs synchronously before React hydration, eliminating theme flicker on page load.

### Color Usage Convention

| Token | Light Mode | Dark Mode | Usage |
|---|---|---|---|
| `bg-white dark:bg-navy` | white | deep navy | Page backgrounds |
| `text-navy dark:text-white` | navy | white | Body text |
| `text-gold` | gold | gold | Accents, headings |
| `border-gold/30` | gold 30% opacity | gold 30% opacity | Dividers |
| `bg-navy dark:bg-navy-dark` | navy | darker navy | Navbar, Footer |

---

## Data Flow

### Server Component Data Flow (typical page)

```
app/(site)/events/page.tsx  (React Server Component)
  │
  ├── await sanityFetch<Event[]>(ALL_EVENTS_QUERY)
  │         │
  │         └── Sanity CDN → GROQ → JSON response
  │
  └── <EventGrid events={events} />
        └── <EventCard event={event} />  (for each)
```

### Root Layout Data Flow

The root layout fetches `SiteSettings` once and passes `contactEmail` to `Footer`. Hero images and mission statement are passed down to the Home page via props from the page-level fetch.

```
app/layout.tsx
  ├── await sanityFetch<SiteSettings>(SITE_SETTINGS_QUERY)
  ├── <ThemeProvider>
  │     ├── <Navbar />                    ← no CMS data needed
  │     ├── {children}                    ← page content
  │     └── <Footer contactEmail={...} />
  └── (inline theme script in <head>)
```

### Form Submission Data Flow

```
JoinForm (Client Component)
  │
  ├── react-hook-form + zod validation (client-side)
  │
  ├── fetch('/api/join', { method: 'POST', body: JSON })
  │         │
  │         └── app/api/join/route.ts (Next.js Route Handler)
  │               ├── Parse + validate body (zod)
  │               ├── Send email via Resend/Nodemailer
  │               └── Return { success: true } | { error: string }
  │
  └── Display success message or error message
```

### Dynamic Route Data Flow (Event Detail)

```
app/(site)/events/[slug]/page.tsx
  │
  ├── generateStaticParams()
  │     └── sanityFetch<{slug: string}[]>(EVENT_SLUGS_QUERY)
  │           → pre-renders all known slugs at build time
  │
  ├── generateMetadata({ params })
  │     └── sanityFetch<Event>(EVENT_BY_SLUG_QUERY, { slug })
  │           → populates <title> and <meta description>
  │
  └── page component
        ├── sanityFetch<Event>(EVENT_BY_SLUG_QUERY, { slug })
        ├── if (!event) notFound()   ← triggers 404 page
        └── render EventDetail + EventGallery
```

---

## Error Handling

### CMS Fetch Errors

- All `sanityFetch` calls are wrapped in `try/catch` at the page level.
- On fetch failure, pages render a graceful fallback (empty state with a message) rather than crashing.
- The Sanity CDN has high availability; transient errors are handled by Next.js ISR — the stale page is served until a fresh fetch succeeds.

### 404 Handling

- `/events/[slug]` calls `notFound()` from `next/navigation` when the slug is not found in Sanity. This renders the `app/not-found.tsx` page.
- A custom `not-found.tsx` is created with brand styling and a link back to `/events`.

### Form Errors

- Client-side: `zod` schema validation catches missing/invalid fields before submission.
- Server-side: API routes re-validate with the same `zod` schema and return structured error responses.
- Network errors: `fetch` failures are caught in the Client Component and display a user-friendly message while preserving form state.

### Image Load Errors

- `HeroCarousel` uses the `onError` prop on `<Image>` to set a fallback `bg-navy` background when a hero image fails to load (Requirement 5.8).
- All `<Image>` components include `alt` text sourced from CMS fields.

### HEIC Image Handling

- The `scripts/upload-images.ts` one-time migration script uses `sharp` to convert `.HEIC` files to `.webp` before uploading to Sanity.
- Sanity's image pipeline also supports on-the-fly format conversion via URL parameters (`?fm=webp`).

---

## Testing Strategy

This feature involves a mix of UI rendering, form validation logic, CMS data fetching, and deployment configuration. Property-based testing is applicable to the form validation logic (pure functions with a wide input space) and the carousel navigation state machine. UI rendering, CMS integration, and deployment are better covered by example-based and integration tests.

### Unit Tests (Vitest + React Testing Library)

- **Form validation schemas** (`zod` schemas for `JoinFormData` and `ContactFormData`): test required field enforcement, email format validation, and optional field handling with specific examples and edge cases.
- **Utility functions** (`src/lib/utils.ts`): test date formatting, slug generation helpers.
- **ThemeProvider**: test that `localStorage` is read on mount, that the `dark` class is toggled correctly, and that `prefers-color-scheme` is respected when no stored preference exists.
- **Navbar scroll behavior**: test that `isScrolled` becomes true after scrolling past 80px.
- **HeroCarousel state**: test that the active slide index advances correctly, wraps around, and that navigation is locked during transitions.

### Property-Based Tests (fast-check, minimum 100 iterations)

See Correctness Properties section for the formal property definitions. Each property maps to one property-based test.

### Integration Tests (Playwright)

- **Home page**: verify Hero Carousel renders 3 slides, mission text is visible, events preview shows 3 cards.
- **Events page**: verify event cards render with title, date, and image; clicking a card navigates to the detail page.
- **Join form**: submit with valid data → success message; submit with empty required fields → inline errors.
- **Contact form**: same pattern as Join form.
- **Dark mode toggle**: clicking the toggle adds/removes `dark` class on `<html>`.
- **Mobile navigation**: at 375px viewport, hamburger is visible; clicking it opens the drawer.

### Accessibility Tests

- Run `axe-core` via `@axe-core/playwright` on all primary pages.
- Verify Lighthouse Accessibility score ≥ 90 in CI via `lighthouse-ci`.

### Performance Tests

- Run Lighthouse CI on the Home page in the Vercel preview deployment.
- Assert Performance score ≥ 80 on simulated mobile.


---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

The following properties are derived from the acceptance criteria that involve pure functions or logic with a meaningful input space. They are implemented using **fast-check** (TypeScript property-based testing library) with a minimum of 100 iterations each.

Features not covered by properties (UI rendering, CMS infrastructure, deployment) are covered by example-based unit tests and integration tests as described in the Testing Strategy section.

---

### Property 1: Hero Images Array Validation

*For any* array of hero image objects, the `SiteSettings` schema validation rule SHALL accept the array if and only if it contains exactly 3 elements.

**Validates: Requirements 2.3**

---

### Property 2: Required Field Validation

*For any* CMS document object where at least one required field is absent or empty, the schema validation function SHALL return a non-empty error result. *For any* document object where all required fields are present and non-empty, the schema validation function SHALL return no error.

**Validates: Requirements 2.6**

---

### Property 3: Navbar Scroll State Threshold

*For any* scroll position value, the `useScrolled` hook SHALL return `true` if and only if the scroll position is strictly greater than 80 pixels.

**Validates: Requirements 3.6**

---

### Property 4: Active Navigation Link Exclusivity

*For any* valid route pathname, the Navbar SHALL apply the active visual style to exactly one navigation link — the link whose `href` matches the current pathname — and SHALL NOT apply the active style to any other link.

**Validates: Requirements 3.8**

---

### Property 5: Carousel Dot Navigation

*For any* valid slide index `i` in the range `[0, N-1]` where `N` is the number of slides, activating the navigation control for slide `i` SHALL set the carousel's active index to `i`.

**Validates: Requirements 5.3**

---

### Property 6: Carousel Transition Lock

*For any* navigation input (dot click or arrow click) received while the carousel's `isTransitioning` flag is `true`, the active slide index SHALL remain unchanged.

**Validates: Requirements 5.6**

---

### Property 7: Events Preview Recency

*For any* collection of `Event` objects with at least 3 entries, the events preview query SHALL return exactly 3 events, and every returned event SHALL have a date that is greater than or equal to the date of every non-returned event in the collection.

**Validates: Requirements 6.2**

---

### Property 8: Team Member Display Order

*For any* array of `TeamMember` objects with distinct `order` values, the rendered team grid SHALL display the members in strictly ascending order of their `order` field.

**Validates: Requirements 9.5**

---

### Property 9: Form Validation Correctness

*For any* form submission object (Join or Contact) where at least one required field is missing or contains only whitespace, the `zod` validation schema SHALL return a validation error identifying the invalid field. *For any* form submission object where all required fields are present and non-empty, and the email field matches a valid email format, the schema SHALL return a success result.

**Validates: Requirements 10.3, 10.4, 11.4, 11.5**

---

### Property 10: Theme Persistence Round-Trip

*For any* theme value in `{ 'dark', 'light' }`, storing that value in `localStorage` under the `'theme'` key and then re-running the theme initialization logic SHALL result in the `<html>` element having the corresponding class (`'dark'` or no `'dark'` class) applied.

**Validates: Requirements 12.4**
