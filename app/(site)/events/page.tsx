import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { STATIC_EVENTS } from "@/lib/staticData";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Events — FLSLPN",
  description: "Browse all events and activities organised by the Female Law Students & Legal Professionals Network at Haramaya University.",
};

export default function EventsPage() {
  const featured = STATIC_EVENTS[0];
  const rest = STATIC_EVENTS.slice(1);

  return (
    <div className="page-bg min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#0A1628" }} className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <div className="w-12 h-1 rounded mb-6 mx-auto" style={{ backgroundColor: "#C9A84C" }} />
          <h1 style={{ color: "#ffffff", fontFamily: "var(--font-playfair, Georgia, serif)" }}
            className="text-4xl sm:text-5xl font-bold mb-4">Events & Activities</h1>
          <p style={{ color: "rgba(255,255,255,0.7)" }} className="text-lg max-w-xl mx-auto">
            {STATIC_EVENTS.length} events since our founding in 2022
          </p>
        </ScrollReveal>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* ── Featured (latest) ─────────────────────────────────────────── */}
        <ScrollReveal>
          <p style={{ color: "#C9A84C" }} className="text-xs font-bold uppercase tracking-widest mb-5">Latest Event</p>
          <Link href={`/events/${featured.slug}`} className="group block mb-16">
            <div className="relative rounded-3xl overflow-hidden" style={{ height: "460px", boxShadow: "0 20px 60px rgba(10,22,40,0.2)" }}>
              <Image src={featured.coverImage} alt={featured.title} fill priority
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105 brightness-75"
                sizes="100vw" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,22,40,0.0) 30%, rgba(10,22,40,0.85) 100%)" }} />
              {/* Content bottom-right */}
              <div className="absolute bottom-0 right-0 p-8 max-w-lg text-right">
                <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3" style={{ backgroundColor: "#C9A84C", color: "#0A1628" }}>
                  {formatDate(featured.date)}
                </div>
                <h2 style={{ color: "#ffffff", fontFamily: "var(--font-playfair, Georgia, serif)" }}
                  className="text-2xl sm:text-3xl font-bold mb-3 leading-tight">{featured.title}</h2>
                <p style={{ color: "rgba(255,255,255,0.8)" }} className="text-sm leading-relaxed line-clamp-2 mb-4">{featured.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200 group-hover:opacity-90"
                  style={{ backgroundColor: "#C9A84C", color: "#0A1628" }}>
                  View Event →
                </span>
              </div>
              {/* Gallery preview strip */}
              {featured.gallery.length > 1 && (
                <div className="absolute top-4 left-4 flex gap-2">
                  {featured.gallery.slice(1, 4).map((img, i) => (
                    <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden border-2" style={{ borderColor: "rgba(201,168,76,0.5)" }}>
                      <Image src={img} alt="" fill className="object-cover" sizes="64px" />
                    </div>
                  ))}
                  {featured.gallery.length > 4 && (
                    <div className="w-16 h-16 rounded-lg flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: "rgba(10,22,40,0.8)", color: "#C9A84C", border: "2px solid rgba(201,168,76,0.5)" }}>
                      +{featured.gallery.length - 4}
                    </div>
                  )}
                </div>
              )}
            </div>
          </Link>
        </ScrollReveal>

        {/* ── All events grid ───────────────────────────────────────────── */}
        <ScrollReveal>
          <p style={{ color: "#C9A84C" }} className="text-xs font-bold uppercase tracking-widest mb-8">All Events</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {rest.map((event, i) => (
            <ScrollReveal key={event.id} delay={i * 0.05}>
              <Link href={`/events/${event.slug}`} className="group block h-full">
                <article className="flex flex-col rounded-2xl overflow-hidden h-full transition-transform duration-300 group-hover:-translate-y-2 card-bg"
                  style={{ boxShadow: "0 4px 20px rgba(10,22,40,0.08)", border: "1px solid var(--border-subtle)" }}>

                  {/* Cover */}
                  <div className="relative overflow-hidden" style={{ height: "220px" }}>
                    <Image src={event.coverImage} alt={event.title} fill
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105 brightness-90"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,22,40,0.5) 0%, transparent 50%)" }} />
                    {/* Year badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold"
                      style={{ backgroundColor: "rgba(10,22,40,0.85)", color: "#C9A84C" }}>
                      {new Date(event.date).getFullYear()}
                    </div>
                    {/* Photo count */}
                    {event.gallery.length > 1 && (
                      <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs"
                        style={{ backgroundColor: "rgba(10,22,40,0.75)", color: "rgba(255,255,255,0.9)" }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
                        {event.gallery.length} photos
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1 gap-2">
                    <time style={{ color: "#C9A84C" }} className="text-xs font-semibold uppercase tracking-widest">
                      {formatDate(event.date)}
                    </time>
                    <h3 style={{ color: "var(--text-primary)", fontFamily: "var(--font-playfair, Georgia, serif)" }}
                      className="text-base font-bold leading-snug line-clamp-2 group-hover:opacity-80 transition-opacity">
                      {event.title}
                    </h3>
                    <p style={{ color: "var(--text-secondary)" }} className="text-sm leading-relaxed line-clamp-2 flex-1">
                      {event.description}
                    </p>

                    {/* Mini gallery strip */}
                    {event.gallery.length > 1 && (
                      <div className="flex gap-1 mt-2">
                        {event.gallery.slice(0, 4).map((img, j) => (
                          <div key={j} className="relative rounded overflow-hidden flex-1" style={{ height: "40px" }}>
                            <Image src={img} alt="" fill className="object-cover" sizes="60px" />
                          </div>
                        ))}
                      </div>
                    )}

                    <span style={{ color: "#C9A84C" }} className="text-sm font-semibold mt-1 group-hover:gap-2 transition-all">
                      View Gallery →
                    </span>
                  </div>
                </article>
              </Link>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </div>
  );
}
