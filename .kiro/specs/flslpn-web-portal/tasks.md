# Implementation Plan: FLSLPN Web Portal

## Overview

Build the FLSLPN Web Portal incrementally, starting with the project scaffold and shared infrastructure, then layering in pages and features, and finishing with testing and deployment configuration. Each task builds directly on the previous one so there is no orphaned code at any stage.

Stack: Next.js 14+ (App Router, TypeScript), Tailwind CSS, Framer Motion, Sanity v3, Vercel.

---

## Tasks

- [x] 1. Initialize project scaffold and configuration files
  - Bootstrap a new Next.js 14+ project with TypeScript and the App Router (`app/` directory) using `create-next-app`
  - Create the full folder structure: `app/`, `src/components/`, `src/lib/`, `src/hooks/`, `src/types/`, `src/styles/`, `sanity/schemaTypes/`, `scripts/`, `public/`
  - Configure `tailwind.config.ts` with `darkMode: 'class'`, the `navy` and `gold` color tokens, and the Inter + Playfair Display font families
  - Configure `next.config.ts` with Sanity image domain in `images.remotePatterns` and any required headers
  - Create `.env.example` with placeholder keys (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_TOKEN`, `RESEND_API_KEY`) and add `.env.local` to `.gitignore`
  - Create `vercel.json` with build settings and a redirect from `/studio` to the embedded Sanity Studio route
  - Add `src/styles/fonts.ts` configuring `next/font` for Inter (sans) and Playfair Display (serif)
  - _Requirements: 1.1, 1.2, 1.5, 14.5, 14.6_

- [x] 2. Define TypeScript types and Sanity CMS schemas
  - [x] 2.1 Create `src/types/index.ts` with all TypeScript interfaces: `SanityImageAsset`, `HeroSlide`, `Event`, `TeamMember`, `SiteSettings`, `Announcement`, `JoinFormData`, `ContactFormData`
    - _Requirements: 1.2, 2.1, 2.2, 2.3, 2.4_

  - [x] 2.2 Create Sanity schema files: `sanity/schemaTypes/event.ts`, `teamMember.ts`, `siteSettings.ts`, `announcement.ts`, and `sanity/schemaTypes/index.ts` registry
    - Implement all fields, required validations, and ordering rules exactly as specified in the design
    - Enforce the `siteSettings` singleton via `__experimental_actions` in `sanity/sanity.config.ts`
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.6_

  - [ ]* 2.3 Write property test for hero images array validation (Property 1)
    - **Property 1: Hero Images Array Validation** — schema validation accepts the array if and only if it contains exactly 3 elements
    - Use `fast-check` to generate arrays of arbitrary length and assert acceptance only at length 3
    - **Validates: Requirements 2.3**

  - [ ]* 2.4 Write property test for required field validation (Property 2)
    - **Property 2: Required Field Validation** — for any document with at least one required field absent/empty, validation returns a non-empty error; for any document with all required fields present and non-empty, validation returns no error
    - Use `fast-check` to generate partial and complete document objects for each schema type
    - **Validates: Requirements 2.6**

- [x] 3. Set up Sanity client, GROQ queries, and image helpers
  - Create `src/lib/sanity/client.ts` with the typed `sanityFetch<T>` helper using `createClient` from `next-sanity`
  - Create `src/lib/sanity/queries.ts` with all GROQ query strings: `SITE_SETTINGS_QUERY`, `RECENT_EVENTS_QUERY`, `ALL_EVENTS_QUERY`, `EVENT_BY_SLUG_QUERY`, `EVENT_SLUGS_QUERY`, `TEAM_MEMBERS_QUERY`, `ACTIVE_ANNOUNCEMENTS_QUERY`
  - Create `src/lib/sanity/image.ts` with the Sanity image URL builder using `@sanity/image-url`
  - Create `src/lib/utils.ts` with shared helpers: `formatDate(isoString: string): string` and any slug utilities
  - Create `sanity/sanity.config.ts` wiring the schema registry and Sanity Studio configuration
  - _Requirements: 1.4, 2.5, 8.7_

- [x] 4. Implement ThemeProvider and dark/light mode infrastructure
  - [x] 4.1 Create `src/components/layout/ThemeProvider.tsx` as a Client Component that reads `localStorage` on mount, applies the `dark` class to `<html>`, exposes `ThemeContext` with `{ theme, toggle }`, and falls back to `prefers-color-scheme` when no stored preference exists
    - Inject the inline FOUC-prevention `<script>` into `app/layout.tsx`'s `<head>`
    - _Requirements: 12.1, 12.3, 12.4, 12.5, 12.6_

  - [x] 4.2 Create `src/hooks/useTheme.ts` that consumes `ThemeContext`
    - _Requirements: 12.2, 12.3_

  - [x] 4.3 Create `src/components/ui/ThemeToggle.tsx` — a button that calls `toggle()` from `useTheme` and renders a sun/moon icon
    - _Requirements: 12.2, 12.3_

  - [ ]* 4.4 Write property test for theme persistence round-trip (Property 10)
    - **Property 10: Theme Persistence Round-Trip** — for any theme value in `{ 'dark', 'light' }`, storing it in `localStorage` and re-running the initialization logic SHALL result in the correct `dark` class state on `<html>`
    - Use `fast-check` to generate theme values and assert the round-trip invariant using a jsdom environment
    - **Validates: Requirements 12.4**

- [x] 5. Implement Navbar and MobileDrawer
  - [x] 5.1 Create `src/hooks/useScrolled.ts` — returns `true` when `window.scrollY > 80`, using a `scroll` event listener with cleanup
    - _Requirements: 3.6_

  - [ ]* 5.2 Write property test for navbar scroll state threshold (Property 3)
    - **Property 3: Navbar Scroll State Threshold** — `useScrolled` returns `true` if and only if scroll position is strictly greater than 80 pixels
    - Use `fast-check` to generate arbitrary non-negative scroll values and assert the threshold invariant
    - **Validates: Requirements 3.6**

  - [x] 5.3 Create `src/components/layout/MobileDrawer.tsx` with `MobileDrawerProps` interface, Framer Motion `AnimatePresence` slide-in animation, backdrop click to close, and link-click-to-close behavior
    - _Requirements: 3.3, 3.4, 3.5_

  - [x] 5.4 Create `src/components/layout/Navbar.tsx` as a Client Component integrating `useScrolled`, `ThemeToggle`, `MobileDrawer`, hamburger button, desktop nav links, logo/name display, and active route highlighting via `usePathname()`
    - Apply background blur and shadow when `isScrolled` is true
    - _Requirements: 3.1, 3.2, 3.3, 3.6, 3.7, 3.8_

  - [ ]* 5.5 Write property test for active navigation link exclusivity (Property 4)
    - **Property 4: Active Navigation Link Exclusivity** — for any valid route pathname, exactly one nav link receives the active style and no other link does
    - Use `fast-check` to generate route pathnames from the known set and assert exactly-one-active invariant
    - **Validates: Requirements 3.8**

- [x] 6. Implement Footer and root layout
  - Create `src/components/layout/Footer.tsx` as a Server Component with `FooterProps { contactEmail: string }`, displaying organization name, mission tagline, copyright year, quick nav links, social media icon links (opening in new tab), and `mailto:` contact link; fully responsive with column stacking below 768px
  - Create `app/layout.tsx` as the root layout: fetch `SiteSettings` once via `sanityFetch`, inject the FOUC-prevention theme script, wrap children in `ThemeProvider`, render `Navbar` and `Footer`
  - Create `app/globals.css` with Tailwind directives and CSS custom properties for brand colors
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 1.1_

- [x] 7. Implement shared UI components
  - [x] 7.1 Create `src/components/ui/Skeleton.tsx` with `SkeletonProps { className?: string; count?: number }` — renders N animated pulse placeholder blocks
    - _Requirements: 6.3, 8.3, 9.6_

  - [x] 7.2 Create `src/components/ui/ScrollReveal.tsx` with `ScrollRevealProps { children, delay? }` — wraps children in a Framer Motion `motion.div` using `whileInView` and `viewport: { once: true }` for scroll-triggered fade-in
    - _Requirements: 6.5_

  - [x] 7.3 Create `src/components/ui/PortableTextRenderer.tsx` with `PortableTextRendererProps { value, className? }` — renders Sanity Portable Text using `@portabletext/react` with custom component overrides for brand-styled headings, links, and lists
    - _Requirements: 7.2, 7.3_

- [x] 8. Implement HeroCarousel
  - [x] 8.1 Create `src/components/home/HeroCarousel.tsx` as a Client Component with `HeroCarouselProps { slides, missionStatement, organizationName }`:
    - Auto-advance every 5 seconds via `useEffect` + `setInterval`
    - Framer Motion `AnimatePresence` cross-fade transitions (400–700ms)
    - Navigation lock via `isTransitioning` ref — ignore input while transitioning
    - Dot and arrow navigation controls
    - Overlay text (org name + mission statement) on each slide
    - `onError` fallback to `bg-navy` when an image fails to load
    - Responsive 16:9 / full-viewport-height aspect ratio
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8_

  - [ ]* 8.2 Write property test for carousel dot navigation (Property 5)
    - **Property 5: Carousel Dot Navigation** — for any valid slide index `i` in `[0, N-1]`, activating the navigation control for slide `i` sets the active index to `i`
    - Use `fast-check` to generate `(N, i)` pairs and assert the state transition
    - **Validates: Requirements 5.3**

  - [ ]* 8.3 Write property test for carousel transition lock (Property 6)
    - **Property 6: Carousel Transition Lock** — any navigation input received while `isTransitioning` is `true` leaves the active slide index unchanged
    - Use `fast-check` to generate arbitrary navigation inputs during a locked state and assert index immutability
    - **Validates: Requirements 5.6**

- [x] 9. Implement Home page sections and page
  - [x] 9.1 Create `src/components/home/MissionSection.tsx` — renders `SiteSettings.aboutText` via `PortableTextRenderer` wrapped in `ScrollReveal`
    - _Requirements: 6.1_

  - [x] 9.2 Create `src/components/events/EventCard.tsx` with `EventCardProps { event, variant?: 'preview' | 'full' }` — displays cover image (Next.js `<Image>`), title, date, and "Read More" link; uses `ScrollReveal` for entrance animation
    - _Requirements: 6.2, 8.2, 13.1, 13.4_

  - [x] 9.3 Create `src/components/home/EventsPreview.tsx` — renders 3 `EventCard` components in `'preview'` variant; shows `Skeleton` placeholders while loading
    - _Requirements: 6.2, 6.3_

  - [x] 9.4 Create `src/components/home/JoinCTA.tsx` — a call-to-action section with a button linking to `/join`, wrapped in `ScrollReveal`
    - _Requirements: 6.4_

  - [x] 9.5 Create `app/(site)/page.tsx` (Home page) as a React Server Component with ISR (`revalidate: 60`): fetch `SiteSettings` and `RECENT_EVENTS_QUERY`, render `HeroCarousel`, `MissionSection`, `EventsPreview`, and `JoinCTA`
    - _Requirements: 5.1, 5.5, 6.1, 6.2, 6.4_

  - [ ]* 9.6 Write property test for events preview recency (Property 7)
    - **Property 7: Events Preview Recency** — for any collection of Events with at least 3 entries, the preview query returns exactly 3 events and every returned event has a date ≥ the date of every non-returned event
    - Use `fast-check` to generate arrays of Event objects with random dates and assert the recency invariant against the query logic
    - **Validates: Requirements 6.2**

- [x] 10. Implement About page
  - Create `app/(site)/about/page.tsx` as a React Server Component with ISR (`revalidate: 300`): fetch `SiteSettings` and `ACTIVE_ANNOUNCEMENTS_QUERY`
  - Render `aboutText` via `PortableTextRenderer`, `missionStatement` as a styled pull-quote/banner, and active `Announcement` entries ordered by `publishedAt` descending
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [x] 11. Implement Events listing and detail pages
  - [x] 11.1 Create `src/components/events/EventGrid.tsx` — renders a responsive grid of `EventCard` components; shows `Skeleton` placeholders while loading
    - _Requirements: 8.2, 8.3_

  - [x] 11.2 Create `app/(site)/events/page.tsx` as a React Server Component with ISR (`revalidate: 60`): fetch `ALL_EVENTS_QUERY` and render `EventGrid`
    - _Requirements: 8.1, 8.2, 8.3_

  - [x] 11.3 Create `src/components/events/EventGallery.tsx` — renders all gallery images in a responsive CSS grid using Next.js `<Image>` with `alt` text from CMS
    - _Requirements: 8.5, 13.1, 13.4_

  - [x] 11.4 Create `app/(site)/events/[slug]/page.tsx` as a React Server Component with SSG + `generateStaticParams` (fetches `EVENT_SLUGS_QUERY`) and `generateMetadata`: fetch `EVENT_BY_SLUG_QUERY`, call `notFound()` for missing slugs, render event title, date, description, and `EventGallery`
    - _Requirements: 8.4, 8.5, 8.6, 8.7, 1.6_

  - [x] 11.5 Create `app/not-found.tsx` with brand styling and a link back to `/events`
    - _Requirements: 8.6_

- [x] 12. Implement Team page
  - [x] 12.1 Create `src/components/team/TeamCard.tsx` with `TeamCardProps { member }` — displays photo, name, role, and bio revealed on hover via CSS `group-hover` + Tailwind transition; uses Next.js `<Image>` for photo
    - _Requirements: 9.3, 9.4, 13.1, 13.4_

  - [x] 12.2 Create `src/components/team/TeamGrid.tsx` — renders a responsive grid (1 col mobile / 2 col tablet / 3 col desktop) of `TeamCard` components; shows `Skeleton` placeholders while loading
    - _Requirements: 9.2, 9.6_

  - [x] 12.3 Create `app/(site)/team/page.tsx` as a React Server Component with ISR (`revalidate: 300`): fetch `TEAM_MEMBERS_QUERY` (ordered by `order` asc) and render `TeamGrid`
    - _Requirements: 9.1, 9.2, 9.5_

  - [ ]* 12.4 Write property test for team member display order (Property 8)
    - **Property 8: Team Member Display Order** — for any array of TeamMember objects with distinct `order` values, the rendered grid displays members in strictly ascending order of `order`
    - Use `fast-check` to generate shuffled arrays of TeamMember objects and assert the sort invariant
    - **Validates: Requirements 9.5**

- [x] 13. Implement Join form and API route
  - [x] 13.1 Create the `zod` validation schema for `JoinFormData` in `src/lib/utils.ts` or a dedicated `src/lib/schemas.ts`: required fields (fullName, email, yearOfStudy), optional fields (phone, areasOfInterest, message), email format validation
    - _Requirements: 10.2, 10.3, 10.4_

  - [ ]* 13.2 Write property test for Join form validation correctness (Property 9 — Join)
    - **Property 9: Form Validation Correctness (Join)** — for any JoinFormData where at least one required field is missing or whitespace-only, zod returns a validation error identifying the field; for any complete valid submission, zod returns success
    - Use `fast-check` to generate partial and complete `JoinFormData` objects
    - **Validates: Requirements 10.3, 10.4**

  - [x] 13.3 Create `app/api/join/route.ts` — Next.js Route Handler that parses the request body, re-validates with the zod schema, sends an email notification via Resend/Nodemailer, and returns `{ success: true }` or `{ error: string }`
    - _Requirements: 10.5, 10.7_

  - [x] 13.4 Create `src/components/forms/JoinForm.tsx` as a Client Component using `react-hook-form` + the zod schema: all required and optional fields, inline validation error messages adjacent to invalid fields, submit button disabled + loading indicator during submission, success confirmation message on success, descriptive error message on failure
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7_

  - [x] 13.5 Create `app/(site)/join/page.tsx` (static, no ISR) rendering `JoinForm`
    - _Requirements: 10.1_

- [x] 14. Implement Contact form and API route
  - [x] 14.1 Create the `zod` validation schema for `ContactFormData`: all four fields required (name, email, subject, message), email format validation
    - _Requirements: 11.3, 11.5_

  - [ ]* 14.2 Write property test for Contact form validation correctness (Property 9 — Contact)
    - **Property 9: Form Validation Correctness (Contact)** — for any ContactFormData where at least one required field is missing or whitespace-only, zod returns a validation error; for any complete valid submission, zod returns success
    - Use `fast-check` to generate partial and complete `ContactFormData` objects
    - **Validates: Requirements 11.4, 11.5**

  - [x] 14.3 Create `app/api/contact/route.ts` — same pattern as the join route: parse, validate, send email, return structured response; preserve form state on failure
    - _Requirements: 11.4, 11.6_

  - [x] 14.4 Create `src/components/forms/ContactForm.tsx` as a Client Component: Name, Email, Subject, Message fields, inline validation errors, success/error states, form data preserved on failure
    - _Requirements: 11.3, 11.4, 11.5, 11.6_

  - [x] 14.5 Create `app/(site)/contact/page.tsx` (static) displaying contact email, address, social links, and rendering `ContactForm`
    - _Requirements: 11.1, 11.2_

- [x] 15. Checkpoint — Ensure all tests pass
  - Run `vitest --run` to execute all unit and property-based tests
  - Verify all pages render without TypeScript errors (`tsc --noEmit`)
  - Ensure all routes resolve correctly in a local build (`next build`)
  - Ask the user if any questions arise before proceeding

- [x] 16. Set up embedded Sanity Studio and image migration script
  - Create `app/studio/[[...tool]]/page.tsx` as a client-side-only page rendering the embedded Sanity Studio using `NextStudio` from `next-sanity/studio`
  - Create `scripts/upload-images.ts` — a one-time migration script that reads all files from `Resource/image/`, converts `.HEIC` files to `.webp` using `sharp`, and uploads them to Sanity via the Sanity client's asset upload API
  - _Requirements: 1.3, 2.1, 13.7_

- [x] 17. Implement accessibility and performance enhancements
  - Audit all pages and replace any non-semantic elements with `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>` as appropriate
  - Verify every `<Image>` component has a non-empty `alt` prop sourced from CMS fields or a descriptive static string
  - Add visible `:focus-visible` ring styles to all interactive elements (buttons, links, form fields) in `globals.css` or Tailwind config
  - Verify all form fields have associated `<label>` elements with correct `htmlFor` / `id` pairing
  - Confirm color contrast ratios meet WCAG AA for all text/background combinations in both light and dark modes
  - _Requirements: 13.1, 13.3, 13.4, 13.5, 13.6_

- [x] 18. Wire Sanity Studio route and finalize deployment configuration
  - Confirm `vercel.json` includes the correct build command, output directory, and any required security headers (`X-Frame-Options`, `X-Content-Type-Options`)
  - Document all required Vercel Environment Variables in `README.md` (referencing `.env.example`)
  - Verify `main` branch is mapped to production in Vercel project settings
  - Confirm `feature/*` and `fix/*` branch naming convention is documented in `README.md`
  - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6_

- [x] 19. Final checkpoint — Ensure all tests pass
  - Run `vitest --run` to confirm all unit and property-based tests pass
  - Run `next build` to confirm a clean production build with no TypeScript or lint errors
  - Verify the embedded Sanity Studio loads at `/studio`
  - Verify all six public routes (`/`, `/about`, `/events`, `/team`, `/join`, `/contact`) render correctly
  - Ask the user if any questions arise before considering the implementation complete

---

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for full traceability
- Property-based tests use `fast-check` with a minimum of 100 iterations each
- Unit and integration tests use Vitest + React Testing Library; E2E tests use Playwright
- Checkpoints (tasks 15 and 19) ensure incremental validation before moving to the next phase
- The `scripts/upload-images.ts` migration (task 16) is a one-time operation and should be run once Sanity credentials are configured
- HEIC images in `Resource/image/` must be converted before upload — handled by the migration script using `sharp`
