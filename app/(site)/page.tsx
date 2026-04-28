import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity/client";
import { SITE_SETTINGS_QUERY, RECENT_EVENTS_QUERY } from "@/lib/sanity/queries";
import type { SiteSettings, Event } from "@/types";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { MissionSection } from "@/components/home/MissionSection";
import { EventsPreview } from "@/components/home/EventsPreview";
import { JoinCTA } from "@/components/home/JoinCTA";
import { STATIC_EVENTS } from "@/lib/staticData";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "FLSLPN — Female Law Students & Legal Professionals Network",
  description: "The official portal of the Female Law Students & Legal Professionals Network at Haramaya University. Empowering women in law.",
};

export default async function HomePage() {
  const [siteSettings, cmsEvents] = await Promise.all([
    sanityFetch<SiteSettings>(SITE_SETTINGS_QUERY).catch(() => null),
    sanityFetch<Event[]>(RECENT_EVENTS_QUERY).catch(() => []),
  ]);

  const heroSlides = siteSettings?.heroImages ?? [];
  const missionStatement = siteSettings?.missionStatement ?? "Empowering women in law at Haramaya University";
  const aboutText = siteSettings?.aboutText ?? [];

  // Use CMS events if available, otherwise show 3 most recent static events
  const recentEvents = cmsEvents.length > 0 ? cmsEvents : [];

  return (
    <>
      {heroSlides.length > 0 ? (
        <HeroCarousel slides={heroSlides} missionStatement={missionStatement} organizationName="FLSLPN" />
      ) : (
        <section className="relative w-full h-screen flex flex-col items-center justify-center text-center px-6" style={{ backgroundColor: "#0A1628" }}>
          <h1 style={{ color: "#ffffff", fontFamily: "var(--font-playfair, Georgia, serif)" }} className="text-5xl sm:text-6xl font-bold mb-4">FLSLPN</h1>
          <p style={{ color: "rgba(255,255,255,0.8)" }} className="text-xl max-w-xl">{missionStatement}</p>
        </section>
      )}
      <MissionSection aboutText={aboutText} />
      <EventsPreview events={recentEvents} staticEvents={STATIC_EVENTS.slice(0, 3)} />
      <JoinCTA />
    </>
  );
}
