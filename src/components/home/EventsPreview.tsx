import Image from "next/image";
import Link from "next/link";
import type { Event } from "@/types";
import type { StaticEvent } from "@/lib/staticData";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { formatDateShort } from "@/lib/utils";

interface EventsPreviewProps {
  events: Event[];
  staticEvents?: StaticEvent[];
}

export function EventsPreview({ events, staticEvents = [] }: EventsPreviewProps) {
  const useCMS = events.length > 0;

  return (
    <section aria-labelledby="events-preview-heading" style={{ backgroundColor: "#0A1628" }} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <div className="w-12 h-1 rounded mb-4" style={{ backgroundColor: "#C9A84C" }} />
              <h2 id="events-preview-heading" style={{ color: "#ffffff", fontFamily: "var(--font-playfair, Georgia, serif)" }}
                className="text-3xl sm:text-4xl font-bold">
                Recent Events
              </h2>
            </div>
            <Link href="/events" style={{ color: "#C9A84C" }}
              className="text-sm font-medium hover:opacity-70 transition-opacity whitespace-nowrap">
              View all events →
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {useCMS ? (
            events.map((event, i) => (
              <ScrollReveal key={event._id} delay={i * 0.1}>
                <CMSEventCard event={event} />
              </ScrollReveal>
            ))
          ) : (
            staticEvents.map((event, i) => (
              <ScrollReveal key={event.id} delay={i * 0.1}>
                <StaticEventCard event={event} />
              </ScrollReveal>
            ))
          )}
        </div>

      </div>
    </section>
  );
}

function StaticEventCard({ event }: { event: StaticEvent }) {
  return (
    <Link href={`/events/${event.slug}`} className="group block h-full">
      <article
        className="flex flex-col rounded-2xl overflow-hidden h-full transition-transform duration-300 group-hover:-translate-y-1"
        style={{ backgroundColor: "#1A2E4A", border: "1px solid rgba(201,168,76,0.1)" }}
      >
        <div className="relative overflow-hidden" style={{ height: "200px" }}>
          <Image src={event.coverImage} alt={event.title} fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,22,40,0.6) 0%, transparent 60%)" }} />
        </div>
        <div className="p-5 flex flex-col flex-1 gap-2">
          <time style={{ color: "#C9A84C" }} className="text-xs font-semibold uppercase tracking-widest">
            {formatDateShort(event.date)}
          </time>
          <h3 style={{ color: "#ffffff", fontFamily: "var(--font-playfair, Georgia, serif)" }}
            className="text-base font-bold leading-snug line-clamp-2">
            {event.title}
          </h3>
          <p style={{ color: "rgba(255,255,255,0.6)" }} className="text-sm leading-relaxed line-clamp-2 flex-1">
            {event.description}
          </p>
          <span style={{ color: "#C9A84C" }} className="text-sm font-medium mt-2">Read More →</span>
        </div>
      </article>
    </Link>
  );
}

function CMSEventCard({ event }: { event: Event }) {
  return (
    <Link href={`/events/${event.slug.current}`} className="group block h-full">
      <article className="flex flex-col rounded-2xl overflow-hidden h-full transition-transform duration-300 group-hover:-translate-y-1"
        style={{ backgroundColor: "#1A2E4A", border: "1px solid rgba(201,168,76,0.1)" }}>
        <div className="p-5 flex flex-col flex-1 gap-2">
          <time style={{ color: "#C9A84C" }} className="text-xs font-semibold uppercase tracking-widest">
            {formatDateShort(event.date)}
          </time>
          <h3 style={{ color: "#ffffff", fontFamily: "var(--font-playfair, Georgia, serif)" }}
            className="text-base font-bold leading-snug line-clamp-2">
            {event.title}
          </h3>
          <span style={{ color: "#C9A84C" }} className="text-sm font-medium mt-2">Read More →</span>
        </div>
      </article>
    </Link>
  );
}
