import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { STATIC_EVENTS } from "@/lib/staticData";
import { formatDate } from "@/lib/utils";
import { EventDetailClient } from "@/components/events/EventDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return STATIC_EVENTS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = STATIC_EVENTS.find((e) => e.slug === slug);
  if (!event) return { title: "Event Not Found — FLSLPN" };
  return { title: `${event.title} — FLSLPN`, description: event.description };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const event = STATIC_EVENTS.find((e) => e.slug === slug);
  if (!event) notFound();

  return (
    <div className="page-bg min-h-screen">
      <EventDetailClient event={event} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="pt-8" style={{ borderTop: "1px solid rgba(201,168,76,0.2)" }}>
          <Link href="/events" className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: "#C9A84C" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m19 12H5M12 5l-7 7 7 7"/></svg>
            Back to Events
          </Link>
        </div>
      </div>
    </div>
  );
}
