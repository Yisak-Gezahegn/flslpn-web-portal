import Image from "next/image";
import Link from "next/link";
import type { Event } from "@/types";
import { urlFor } from "@/lib/sanity/image";
import { formatDateShort } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface EventCardProps {
  event: Event;
  /** 'preview' — compact card for home page; 'full' — larger card for /events listing */
  variant?: "preview" | "full";
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * EventCard — displays an event's cover image, title, date, and a "Read More" link.
 *
 * Two variants:
 * - `preview` (default): compact card used on the Home page events preview section
 * - `full`: slightly larger card used on the /events listing page
 *
 * Uses Next.js <Image> for optimised loading and ScrollReveal for entrance animation.
 * Requirements: 6.2, 8.2, 13.1, 13.4
 */
export function EventCard({ event, variant = "preview" }: EventCardProps) {
  const { title, date, slug, coverImage } = event;
  const href = `/events/${slug.current}`;
  const formattedDate = formatDateShort(date);

  const imageUrl = coverImage?.asset
    ? urlFor(coverImage.asset)
        .width(variant === "full" ? 800 : 600)
        .height(variant === "full" ? 450 : 340)
        .format("webp")
        .quality(80)
        .url()
    : null;

  const imageHeight = variant === "full" ? "h-52 sm:h-60" : "h-44 sm:h-52";

  return (
    <ScrollReveal>
      <article className="group flex flex-col bg-white dark:bg-navy-light rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full">

        {/* Cover image */}
        <Link
          href={href}
          className="block relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className={`relative w-full ${imageHeight} bg-navy-light`}>
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={coverImage?.alt ?? title}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              /* Fallback when no cover image */
              <div className="absolute inset-0 bg-navy-light flex items-center justify-center">
                <span className="text-gold/40 font-serif text-4xl">FLSLPN</span>
              </div>
            )}
          </div>
        </Link>

        {/* Card body */}
        <div className="flex flex-col flex-1 p-5 gap-3">
          {/* Date badge */}
          <time
            dateTime={date}
            className="text-xs font-semibold uppercase tracking-widest text-gold"
          >
            {formattedDate}
          </time>

          {/* Title */}
          <h3 className="font-serif text-lg font-bold text-navy dark:text-white leading-snug line-clamp-2">
            <Link
              href={href}
              className="hover:text-gold dark:hover:text-gold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
            >
              {title}
            </Link>
          </h3>

          {/* Read More link */}
          <div className="mt-auto pt-2">
            <Link
              href={href}
              className="
                inline-flex items-center gap-1
                text-sm font-medium text-gold hover:text-gold-dark
                transition-colors duration-150
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded
              "
              aria-label={`Read more about ${title}`}
            >
              Read More
              <ArrowRightIcon />
            </Link>
          </div>
        </div>

      </article>
    </ScrollReveal>
  );
}

// ─── Icon ─────────────────────────────────────────────────────────────────────

function ArrowRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
