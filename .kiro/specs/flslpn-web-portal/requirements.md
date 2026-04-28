# Requirements Document

## Introduction

The FLSLPN Web Portal is a professional, dynamic web application for the Female Law Students & Legal Professionals Network (FLSLPN) at Haramaya University. The portal serves as the organization's primary digital presence — enabling non-technical administrators to manage content (events, team members, announcements), prospective members to learn about and join the network, and the public to engage with the organization's mission and activities.

The application is built with Next.js (App Router), TypeScript, and Tailwind CSS, backed by a headless CMS (Sanity or Contentful) or Supabase/PostgreSQL for admin-controlled content. It is deployed on Vercel and follows a mobile-first, accessible, and high-performance design philosophy using a legal-inspired color palette (deep navy, gold, white).

---

## Glossary

- **Portal**: The FLSLPN web application as a whole.
- **Admin**: A non-technical staff member of FLSLPN who manages content through the CMS dashboard without touching code.
- **CMS**: Content Management System — the headless backend (Sanity or Contentful) or Supabase/PostgreSQL database used to store and serve dynamic content.
- **Visitor**: Any unauthenticated user browsing the Portal.
- **Member**: A registered or prospective member of FLSLPN.
- **Hero_Carousel**: The animated image slider on the Home page featuring three hero images.
- **Navbar**: The persistent, interactive top navigation bar.
- **Footer**: The comprehensive bottom section present on all pages.
- **Event**: A structured content entry in the CMS representing an FLSLPN activity, including title, date, description, and photos.
- **Team_Member**: A structured content entry in the CMS representing a leader or member of FLSLPN, including name, role, photo, and bio.
- **Join_Form**: The contact/membership application form on the Join page.
- **Loading_Skeleton**: A placeholder UI element displayed while content is being fetched from the CMS.
- **Dark_Mode**: A site-wide color theme with dark backgrounds and light text.
- **Light_Mode**: A site-wide color theme with light backgrounds and dark text.
- **Vercel**: The cloud deployment platform hosting the Portal.
- **App_Router**: The Next.js 13+ file-system-based routing system using the `app/` directory.

---

## Requirements

### Requirement 1: Project Foundation and Folder Structure

**User Story:** As a developer, I want a well-organized project structure that integrates existing resources, so that the codebase is maintainable and scalable.

#### Acceptance Criteria

1. THE Portal SHALL use the Next.js App Router (`app/` directory) as the routing foundation.
2. THE Portal SHALL organize source code under `src/` with subdirectories for `components/`, `lib/`, `hooks/`, `types/`, and `styles/`.
3. THE Portal SHALL reference existing image assets from the `Resource/image/` directory, making them accessible via Next.js static asset handling or CMS upload.
4. THE Portal SHALL include a `sanity/` (or `contentful/`) directory at the project root for CMS schema definitions.
5. THE Portal SHALL include environment variable configuration via `.env.local` for CMS API keys, with `.env.example` committed to the repository.
6. WHEN a new page route is added, THE App_Router SHALL resolve it via a corresponding `page.tsx` file inside `app/[route]/`.

---

### Requirement 2: CMS Schema Design for Admin-Controlled Content

**User Story:** As an Admin, I want to update event photos, member lists, and text content through a dashboard, so that I can keep the Portal current without writing code.

#### Acceptance Criteria

1. THE CMS SHALL provide a schema for an `Event` document type with fields: `title` (string, required), `date` (datetime, required), `description` (rich text), `slug` (auto-generated, unique), `coverImage` (image asset), and `gallery` (array of image assets).
2. THE CMS SHALL provide a schema for a `TeamMember` document type with fields: `name` (string, required), `role` (string, required), `photo` (image asset), `bio` (text), and `order` (number, for display ordering).
3. THE CMS SHALL provide a schema for a `SiteSettings` singleton document with fields: `heroImages` (array of exactly 3 image assets with alt text), `aboutText` (rich text), `missionStatement` (string), and `contactEmail` (string).
4. THE CMS SHALL provide a schema for an `Announcement` document type with fields: `title` (string, required), `body` (rich text), `publishedAt` (datetime), and `isActive` (boolean).
5. WHEN an Admin publishes or updates a document in the CMS, THE Portal SHALL reflect the updated content on the next page request without requiring a code deployment.
6. IF a required field is left empty by the Admin, THEN THE CMS SHALL prevent publication and display a validation error message.

---

### Requirement 3: Global Layout — Navbar

**User Story:** As a Visitor, I want a persistent, responsive navigation bar, so that I can access any section of the Portal from any page.

#### Acceptance Criteria

1. THE Navbar SHALL be present on every page of the Portal.
2. THE Navbar SHALL display the FLSLPN logo/name and navigation links to: Home, About, Events, Team, Join, and Contact.
3. WHEN the viewport width is below 768px, THE Navbar SHALL replace the navigation links with a hamburger menu icon.
4. WHEN the hamburger menu icon is activated, THE Navbar SHALL display a full-screen or slide-in mobile navigation drawer with all navigation links.
5. WHEN a navigation link is activated, THE Navbar SHALL close the mobile drawer and navigate to the corresponding page.
6. WHILE the Visitor scrolls past 80px from the top of the page, THE Navbar SHALL apply a background blur and shadow to remain legible over page content.
7. THE Navbar SHALL include the Dark/Light mode toggle control.
8. WHEN a navigation link corresponds to the current active route, THE Navbar SHALL apply a distinct active visual style to that link.

---

### Requirement 4: Global Layout — Footer

**User Story:** As a Visitor, I want a comprehensive footer on every page, so that I can find contact information, social links, and quick navigation.

#### Acceptance Criteria

1. THE Footer SHALL be present on every page of the Portal.
2. THE Footer SHALL display the organization name, a brief mission tagline, and copyright notice with the current year.
3. THE Footer SHALL include quick navigation links to all primary pages.
4. THE Footer SHALL display social media links (Facebook, LinkedIn, Twitter/X, Instagram) as icon links that open in a new browser tab.
5. THE Footer SHALL display the organization's contact email address as a `mailto:` link.
6. THE Footer SHALL be fully responsive, stacking columns vertically on mobile viewports below 768px.

---

### Requirement 5: Home Page — Hero Carousel

**User Story:** As a Visitor, I want an engaging animated hero section on the Home page, so that I immediately understand the organization's identity and mission.

#### Acceptance Criteria

1. THE Hero_Carousel SHALL display exactly 3 hero images sourced from the `heroImages` field in the CMS `SiteSettings` document.
2. THE Hero_Carousel SHALL automatically advance to the next image every 5 seconds.
3. WHEN a Visitor activates a carousel navigation dot or arrow control, THE Hero_Carousel SHALL immediately transition to the corresponding image.
4. THE Hero_Carousel SHALL use Framer Motion for slide transition animations with a duration between 400ms and 700ms.
5. THE Hero_Carousel SHALL display overlay text (organization name and mission statement) sourced from the CMS `SiteSettings` document on each slide.
6. WHILE the Hero_Carousel is transitioning between images, THE Hero_Carousel SHALL not accept additional navigation input until the transition completes.
7. THE Hero_Carousel SHALL be fully responsive, maintaining a 16:9 or full-viewport-height aspect ratio across mobile, tablet, and desktop breakpoints.
8. IF a hero image fails to load, THEN THE Hero_Carousel SHALL display a fallback background color using the deep navy brand color.

---

### Requirement 6: Home Page — Content Sections

**User Story:** As a Visitor, I want to see a summary of the organization's mission, upcoming events, and a call to action on the Home page, so that I can quickly understand the network's value.

#### Acceptance Criteria

1. THE Portal SHALL display a Mission/About summary section below the Hero_Carousel, sourced from the CMS `SiteSettings.aboutText` field.
2. THE Portal SHALL display a preview of the 3 most recent Events below the mission section, each showing the event title, date, cover image, and a "Read More" link.
3. WHEN content for the Events preview is being fetched, THE Portal SHALL display Loading_Skeleton placeholders in place of the event cards.
4. THE Portal SHALL display a "Join Us" call-to-action section with a button linking to the Join page.
5. WHEN a Visitor scrolls a content section into the viewport, THE Portal SHALL trigger a scroll-reveal animation using Framer Motion.

---

### Requirement 7: About Page

**User Story:** As a Visitor, I want to read about FLSLPN's history, mission, and values, so that I can understand the organization's purpose.

#### Acceptance Criteria

1. THE Portal SHALL render an About page at the `/about` route.
2. THE About page SHALL display the full `aboutText` rich text content sourced from the CMS `SiteSettings` document.
3. THE About page SHALL display the `missionStatement` prominently as a styled pull-quote or banner.
4. THE About page SHALL display any active `Announcement` entries sourced from the CMS, ordered by `publishedAt` descending.

---

### Requirement 8: Events Page with Dynamic Routing

**User Story:** As a Visitor, I want to browse all events and view detailed information for each one, so that I can stay informed about FLSLPN activities.

#### Acceptance Criteria

1. THE Portal SHALL render an Events listing page at the `/events` route displaying all published `Event` documents from the CMS.
2. THE Events listing page SHALL display each event as a card with the cover image, title, and date.
3. WHEN content for the Events listing is being fetched, THE Portal SHALL display Loading_Skeleton placeholders.
4. THE Portal SHALL render a dynamic Event detail page at the `/events/[slug]` route for each published `Event` document.
5. THE Event detail page SHALL display the event title, date, full description, and all images from the `gallery` field in a responsive photo grid.
6. WHEN a Visitor navigates to `/events/[slug]` for a slug that does not exist in the CMS, THE Portal SHALL return a 404 page.
7. THE Portal SHALL use Next.js `generateStaticParams` to pre-render Event detail pages at build time for known slugs.

---

### Requirement 9: Team Page

**User Story:** As a Visitor, I want to see the FLSLPN leadership team in a professional grid layout, so that I can learn who leads the organization.

#### Acceptance Criteria

1. THE Portal SHALL render a Team page at the `/team` route.
2. THE Team page SHALL display all published `TeamMember` documents from the CMS in a responsive grid layout (1 column on mobile, 2 on tablet, 3 on desktop).
3. THE Team page SHALL display each team member's photo, name, and role.
4. WHEN a Visitor hovers over a team member card, THE Portal SHALL display the member's bio text with a smooth CSS transition.
5. THE Team page SHALL order team members by the `order` field in the CMS ascending.
6. WHEN content for the Team page is being fetched, THE Portal SHALL display Loading_Skeleton placeholders.

---

### Requirement 10: Join Page — Membership Application Form

**User Story:** As a prospective Member, I want to submit a membership application through a validated form, so that I can join the FLSLPN network.

#### Acceptance Criteria

1. THE Portal SHALL render a Join page at the `/join` route containing the Join_Form.
2. THE Join_Form SHALL include fields for: Full Name (text, required), Email Address (email, required), Phone Number (text, optional), Year of Study (select: 1st–5th year + Graduate, required), Area of Interest (multi-select or checkboxes, optional), and Message (textarea, optional).
3. WHEN a Visitor submits the Join_Form with a missing required field, THE Join_Form SHALL display an inline validation error message adjacent to the invalid field without reloading the page.
4. WHEN a Visitor submits the Join_Form with an invalid email format, THE Join_Form SHALL display an inline validation error message on the email field.
5. WHEN a Visitor submits the Join_Form with all required fields valid, THE Join_Form SHALL submit the data to a server action or API route and display a success confirmation message.
6. WHILE the Join_Form submission is in progress, THE Join_Form SHALL disable the submit button and display a loading indicator.
7. IF the Join_Form submission fails due to a server error, THEN THE Join_Form SHALL display a descriptive error message and re-enable the submit button.

---

### Requirement 11: Contact Page

**User Story:** As a Visitor, I want to find the organization's contact information and send a direct message, so that I can reach FLSLPN for inquiries.

#### Acceptance Criteria

1. THE Portal SHALL render a Contact page at the `/contact` route.
2. THE Contact page SHALL display the organization's contact email, physical address (if available), and social media links.
3. THE Contact page SHALL include a contact form with fields: Name (text, required), Email (email, required), Subject (text, required), and Message (textarea, required).
4. WHEN a Visitor submits the contact form with all required fields valid, THE Portal SHALL submit the data to a server action or API route and display a success confirmation message.
5. WHEN a Visitor submits the contact form with a missing required field, THE Portal SHALL display an inline validation error without reloading the page.
6. IF the contact form submission fails, THEN THE Portal SHALL display a descriptive error message and preserve the Visitor's entered data.

---

### Requirement 12: Dark/Light Mode Toggle

**User Story:** As a Visitor, I want to switch between dark and light color themes, so that I can use the Portal comfortably in different lighting conditions.

#### Acceptance Criteria

1. THE Portal SHALL support both a Dark_Mode and a Light_Mode color theme.
2. THE Navbar SHALL include a toggle control (button or switch) that switches between Dark_Mode and Light_Mode.
3. WHEN a Visitor activates the mode toggle, THE Portal SHALL apply the selected theme to all pages immediately without a full page reload.
4. THE Portal SHALL persist the Visitor's theme preference in `localStorage` so that the selected theme is restored on subsequent visits.
5. WHEN no stored preference exists, THE Portal SHALL default to the Visitor's operating system color scheme preference via the `prefers-color-scheme` media query.
6. THE Portal SHALL implement theming using Tailwind CSS `dark:` variant classes and a `class`-based dark mode strategy on the `<html>` element.

---

### Requirement 13: Performance and Accessibility

**User Story:** As a Visitor, I want the Portal to load quickly and be accessible, so that I can use it effectively regardless of my device or ability.

#### Acceptance Criteria

1. THE Portal SHALL use Next.js `Image` component for all images to enable automatic optimization, lazy loading, and responsive `srcset` generation.
2. THE Portal SHALL achieve a Lighthouse Performance score of 80 or above on the Home page when measured on a simulated mobile device.
3. THE Portal SHALL achieve a Lighthouse Accessibility score of 90 or above on all primary pages.
4. THE Portal SHALL provide descriptive `alt` text for all images, sourced from the CMS alt text fields where applicable.
5. THE Portal SHALL use semantic HTML elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`) throughout all pages.
6. WHEN interactive elements (buttons, links, form fields) receive keyboard focus, THE Portal SHALL display a visible focus indicator.
7. THE Portal SHALL support HEIC image assets by converting them to web-compatible formats (JPEG/WebP) during the build process or via CMS upload transformation.

---

### Requirement 14: Vercel Deployment and Git Workflow

**User Story:** As a developer, I want a safe Git workflow and Vercel deployment strategy, so that I can push updates without breaking the production site.

#### Acceptance Criteria

1. THE Portal SHALL be deployed to Vercel with the `main` branch mapped to the production environment.
2. THE Portal SHALL use a Git branching strategy where all feature development occurs on `feature/*` branches and all fixes on `fix/*` branches, never directly on `main`.
3. WHEN a pull request is opened targeting `main`, THE Portal's Vercel integration SHALL automatically create a Preview Deployment for that pull request.
4. WHEN a pull request is merged into `main`, THE Portal's Vercel integration SHALL automatically trigger a production deployment.
5. THE Portal SHALL store all secrets (CMS API tokens, database URLs) as Vercel Environment Variables and SHALL NOT commit them to the repository.
6. THE Portal SHALL include a `vercel.json` configuration file specifying build settings and any required redirects or headers.
7. WHEN a production deployment fails, THE Portal's Vercel integration SHALL automatically roll back to the last successful deployment.
