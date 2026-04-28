/**
 * GROQ query strings for all CMS data fetching.
 *
 * Naming convention: <SCOPE>_<DESCRIPTION>_QUERY
 * All queries project only the fields actually needed by the UI
 * to keep payloads small and avoid over-fetching.
 */

// ─── Site Settings ────────────────────────────────────────────────────────────

/**
 * Fetches the singleton SiteSettings document.
 * Used in the root layout (contactEmail → Footer) and Home page (heroImages, missionStatement).
 */
export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0]{
    heroImages[]{
      _key,
      asset,
      alt
    },
    aboutText,
    missionStatement,
    contactEmail
  }
`;

// ─── Events ───────────────────────────────────────────────────────────────────

/**
 * 3 most recent events for the Home page preview section.
 * Ordered by date descending; only fields needed for EventCard are projected.
 */
export const RECENT_EVENTS_QUERY = `
  *[_type == "event"] | order(date desc) [0..2]{
    _id,
    title,
    date,
    slug,
    coverImage{
      asset,
      alt
    }
  }
`;

/**
 * All published events for the /events listing page.
 * Ordered by date descending.
 */
export const ALL_EVENTS_QUERY = `
  *[_type == "event"] | order(date desc){
    _id,
    title,
    date,
    slug,
    coverImage{
      asset,
      alt
    }
  }
`;

/**
 * Full event document by slug for the /events/[slug] detail page.
 * Includes description (rich text) and full gallery array.
 */
export const EVENT_BY_SLUG_QUERY = `
  *[_type == "event" && slug.current == $slug][0]{
    _id,
    title,
    date,
    description,
    slug,
    coverImage{
      asset,
      alt
    },
    gallery[]{
      _key,
      asset,
      alt
    }
  }
`;

/**
 * All event slugs — used by generateStaticParams to pre-render
 * every known event detail page at build time.
 */
export const EVENT_SLUGS_QUERY = `
  *[_type == "event"]{
    "slug": slug.current
  }
`;

// ─── Team Members ─────────────────────────────────────────────────────────────

/**
 * All published team members ordered by the `order` field ascending.
 * Used on the /team page.
 */
export const TEAM_MEMBERS_QUERY = `
  *[_type == "teamMember"] | order(order asc){
    _id,
    name,
    role,
    photo{
      asset,
      alt
    },
    bio,
    order
  }
`;

// ─── Announcements ────────────────────────────────────────────────────────────

/**
 * Active announcements for the /about page.
 * Filtered to isActive == true, ordered by publishedAt descending.
 */
export const ACTIVE_ANNOUNCEMENTS_QUERY = `
  *[_type == "announcement" && isActive == true] | order(publishedAt desc){
    _id,
    title,
    body,
    publishedAt
  }
`;
