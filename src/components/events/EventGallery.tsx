import Image from "next/image";
import type { SanityImageAsset } from "@/types";
import { urlFor } from "@/lib/sanity/image";

// ─── Types ────────────────────────────────────────────────────────────────────

interface EventGalleryProps {
  images: SanityImageAsset[];
  eventTitle: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * EventGallery — responsive photo grid for an event's gallery images.
 *
 * Uses Next.js <Image> for optimised loading.
 * Alt text is sourced from CMS fields; falls back to a descriptive string.
 * Requirements: 8.5, 13.1, 13.4
 */
export function EventGallery({ images, eventTitle }: EventGalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <section aria-labelledby="gallery-heading" className="mt-12">
      <h2
        id="gallery-heading"
        className="font-serif text-2xl font-bold text-navy dark:text-white mb-6"
      >
        Photo Gallery
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {images.map((image, index) => {
          const imageUrl = image.asset
            ? urlFor(image.asset)
                .width(600)
                .height(450)
                .format("webp")
                .quality(80)
                .fit("crop")
                .url()
            : null;

          if (!imageUrl) return null;

          const altText =
            image.alt?.trim() ||
            `${eventTitle} — photo ${index + 1}`;

          return (
            <div
              key={index}
              className="relative aspect-[4/3] overflow-hidden rounded-xl bg-navy-light group"
            >
              <Image
                src={imageUrl}
                alt={altText}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
