import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

// ─── Sanity image asset ───────────────────────────────────────────────────────

export interface SanityImageAsset {
  _type: "image";
  asset: SanityImageSource;
  alt?: string;
}

// ─── Hero slide (used inside SiteSettings.heroImages) ────────────────────────

export interface HeroSlide {
  _key: string;
  asset: SanityImageSource;
  alt: string;
}

// ─── Event ───────────────────────────────────────────────────────────────────

export interface Event {
  _id: string;
  _type: "event";
  title: string;
  /** ISO 8601 datetime string */
  date: string;
  description: PortableTextBlock[];
  slug: { current: string };
  coverImage: SanityImageAsset;
  gallery: SanityImageAsset[];
}

// ─── Team member ─────────────────────────────────────────────────────────────

export interface TeamMember {
  _id: string;
  _type: "teamMember";
  name: string;
  role: string;
  photo: SanityImageAsset;
  bio?: string;
  /** Ascending sort order for display */
  order: number;
}

// ─── Site settings (singleton) ───────────────────────────────────────────────

export interface SiteSettings {
  _id: "siteSettings";
  _type: "siteSettings";
  /** Exactly 3 hero images required by CMS validation */
  heroImages: HeroSlide[];
  aboutText: PortableTextBlock[];
  missionStatement: string;
  contactEmail: string;
}

// ─── Announcement ────────────────────────────────────────────────────────────

export interface Announcement {
  _id: string;
  _type: "announcement";
  title: string;
  body: PortableTextBlock[];
  /** ISO 8601 datetime string */
  publishedAt: string;
  isActive: boolean;
}

// ─── Form submission payloads ─────────────────────────────────────────────────

export interface JoinFormData {
  fullName: string;
  email: string;
  phone?: string;
  yearOfStudy: "1st" | "2nd" | "3rd" | "4th" | "5th" | "Graduate";
  areasOfInterest?: string[];
  message?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
