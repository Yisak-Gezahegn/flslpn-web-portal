import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity/client";
import {
  SITE_SETTINGS_QUERY,
  ACTIVE_ANNOUNCEMENTS_QUERY,
} from "@/lib/sanity/queries";
import type { SiteSettings, Announcement } from "@/types";
import { PortableTextRenderer } from "@/components/ui/PortableTextRenderer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { formatDate } from "@/lib/utils";

// ─── ISR — revalidate every 5 minutes ────────────────────────────────────────
export const revalidate = 300;

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "About — FLSLPN",
  description:
    "Learn about the Female Law Students & Legal Professionals Network at Haramaya University — our mission, values, and announcements.",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

/**
 * About page — React Server Component with ISR (revalidate: 300s).
 *
 * Renders:
 * - Full aboutText rich text from SiteSettings
 * - missionStatement as a styled pull-quote banner
 * - Active Announcements ordered by publishedAt descending
 *
 * Requirements: 7.1, 7.2, 7.3, 7.4
 */
export default async function AboutPage() {
  const [siteSettings, announcements] = await Promise.all([
    sanityFetch<SiteSettings>(SITE_SETTINGS_QUERY).catch(() => null),
    sanityFetch<Announcement[]>(ACTIVE_ANNOUNCEMENTS_QUERY).catch(() => []),
  ]);

  const aboutText = siteSettings?.aboutText ?? [];
  const missionStatement =
    siteSettings?.missionStatement ??
    "Empowering women in law at Haramaya University";

  return (
    <div className="bg-white dark:bg-navy min-h-screen">

      {/* ── Page hero ──────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="about-heading"
        className="bg-navy dark:bg-navy-dark py-20 px-4 sm:px-6 lg:px-8 text-center"
      >
        <ScrollReveal>
          <span className="inline-block w-12 h-1 bg-gold rounded mb-6" aria-hidden="true" />
          <h1
            id="about-heading"
            className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            About FLSLPN
          </h1>
          <p className="font-sans text-lg text-white/70 max-w-2xl mx-auto">
            Female Law Students &amp; Legal Professionals Network
          </p>
        </ScrollReveal>
      </section>

      {/* ── Mission statement pull-quote ───────────────────────────────────── */}
      <section
        aria-label="Mission statement"
        className="py-14 px-4 sm:px-6 lg:px-8 bg-gold/10 dark:bg-gold/5 border-y border-gold/20"
      >
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <blockquote className="font-serif text-2xl sm:text-3xl font-semibold text-navy dark:text-white leading-snug">
              <span className="text-gold text-5xl leading-none mr-1" aria-hidden="true">&ldquo;</span>
              {missionStatement}
              <span className="text-gold text-5xl leading-none ml-1" aria-hidden="true">&rdquo;</span>
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* ── About text (rich text) ─────────────────────────────────────────── */}
      {aboutText.length > 0 && (
        <section
          aria-labelledby="about-text-heading"
          className="py-16 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <h2
                id="about-text-heading"
                className="font-serif text-2xl sm:text-3xl font-bold text-navy dark:text-white mb-8"
              >
                Our Story
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <PortableTextRenderer value={aboutText} />
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ── Announcements ─────────────────────────────────────────────────── */}
      {announcements.length > 0 && (
        <section
          aria-labelledby="announcements-heading"
          className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-navy-dark"
        >
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <span className="inline-block w-12 h-1 bg-gold rounded mb-4" aria-hidden="true" />
              <h2
                id="announcements-heading"
                className="font-serif text-2xl sm:text-3xl font-bold text-navy dark:text-white mb-10"
              >
                Announcements
              </h2>
            </ScrollReveal>

            <div className="flex flex-col gap-8">
              {announcements.map((announcement, i) => (
                <ScrollReveal key={announcement._id} delay={i * 0.08}>
                  <article className="bg-white dark:bg-navy rounded-2xl p-6 shadow-sm border border-gold/10">
                    <header className="mb-4">
                      <h3 className="font-serif text-xl font-bold text-navy dark:text-white mb-1">
                        {announcement.title}
                      </h3>
                      {announcement.publishedAt && (
                        <time
                          dateTime={announcement.publishedAt}
                          className="text-xs font-semibold uppercase tracking-widest text-gold"
                        >
                          {formatDate(announcement.publishedAt)}
                        </time>
                      )}
                    </header>
                    {announcement.body?.length > 0 && (
                      <PortableTextRenderer value={announcement.body} />
                    )}
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
