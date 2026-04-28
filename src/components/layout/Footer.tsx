import Link from "next/link";
import { currentYear } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FooterProps {
  contactEmail: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/team", label: "Team" },
  { href: "/join", label: "Join Us" },
  { href: "/contact", label: "Contact" },
];

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: FacebookIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/female-law-students-and-legal-professionals-network/",
    icon: LinkedInIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/flslpn",
    icon: InstagramIcon,
  },
  {
    label: "Telegram",
    href: "https://t.me/+h1Rgdgwlt-w1MGZk",
    icon: TelegramIcon,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Footer — Server Component present on every page.
 *
 * Displays:
 * - Organisation name + mission tagline + copyright
 * - Quick navigation links
 * - Social media icon links (open in new tab)
 * - Contact email as a mailto: link
 *
 * Fully responsive: stacks to a single column below 768px.
 * Requirements: 4.1 – 4.6
 */
export function Footer({ contactEmail }: FooterProps) {
  const year = currentYear();

  return (
    <footer style={{ backgroundColor: "#0A1628", borderTop: "1px solid rgba(201,168,76,0.2)" }} className="mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Main grid — 1 col mobile / 3 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">

          {/* Column 1 — Brand */}
          <div className="flex flex-col gap-3">
            <p className="font-serif font-bold text-gold text-xl">FLSLPN</p>
            <p className="text-sm text-white/70 leading-relaxed max-w-xs">
              Female Law Students &amp; Legal Professionals Network at Haramaya
              University — empowering women in law.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3 mt-2">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`FLSLPN on ${label}`}
                  className="
                    text-white/50 hover:text-gold
                    transition-colors duration-150
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy rounded
                  "
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Quick navigation */}
          <nav aria-label="Footer navigation">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold/80 mb-4">
              Quick Links
            </p>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="
                      text-sm text-white/70 hover:text-white
                      transition-colors duration-150
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded
                    "
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3 — Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold/80 mb-4">
              Contact Us
            </p>
            <a
              href={`mailto:${contactEmail}`}
              className="
                text-sm text-white/70 hover:text-gold
                transition-colors duration-150
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded
                break-all
              "
            >
              {contactEmail}
            </a>
            <p className="text-sm text-white/50 mt-3 leading-relaxed">
              Haramaya University<br />
              College of Law<br />
              Haramaya, Ethiopia
            </p>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gold/10 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/40">
            &copy; {year} FLSLPN — Female Law Students &amp; Legal Professionals
            Network. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Haramaya University
          </p>
        </div>

      </div>
    </footer>
  );
}

// ─── Social icons (inline SVG, 20×20) ────────────────────────────────────────

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 13.667l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.978.892z"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
