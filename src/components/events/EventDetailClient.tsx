"use client";

import { useState } from "react";
import Image from "next/image";
import { Lightbox } from "@/components/ui/Lightbox";
import type { StaticEvent } from "@/lib/staticData";
import { formatDate } from "@/lib/utils";

interface EventDetailClientProps {
  event: StaticEvent;
}

export function EventDetailClient({ event }: EventDetailClientProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryImages = event.gallery.length > 0 ? event.gallery : [event.coverImage];

  return (
    <>
      {/* Hero cover */}
      <div className="relative w-full" style={{ height: "480px" }}>
        <Image
          src={event.coverImage}
          alt={event.title}
          fill
          priority
          className="object-cover object-center brightness-60"
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,22,40,0.9) 0%, rgba(10,22,40,0.2) 70%, transparent 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 pb-10 max-w-5xl mx-auto w-full">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4" style={{ backgroundColor: "#C9A84C", color: "#0A1628" }}>
            {formatDate(event.date)}
          </div>
          <h1 style={{ color: "#ffffff", fontFamily: "var(--font-playfair, Georgia, serif)" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-3xl">
            {event.title}
          </h1>
          {galleryImages.length > 1 && (
            <p style={{ color: "rgba(255,255,255,0.6)" }} className="mt-3 text-sm flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
              {galleryImages.length} photos — tap to view
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p style={{ color: "rgba(10,22,40,0.8)", lineHeight: "1.9" }} className="text-lg max-w-3xl mb-12">
          {event.description}
        </p>

        {/* Gallery */}
        {galleryImages.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-1 rounded" style={{ backgroundColor: "#C9A84C" }} />
              <h2 style={{ color: "#0A1628", fontFamily: "var(--font-playfair, Georgia, serif)" }} className="text-2xl font-bold">
                Photo Gallery
              </h2>
              <span style={{ color: "rgba(10,22,40,0.4)" }} className="text-sm">{galleryImages.length} photos</span>
            </div>

            {/* Masonry grid — clickable */}
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`View photo ${i + 1} of ${galleryImages.length}`}
                  className="break-inside-avoid relative overflow-hidden rounded-xl group w-full block transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
                  style={{ boxShadow: "0 2px 8px rgba(10,22,40,0.1)" }}
                >
                  <Image
                    src={img}
                    alt={`${event.title} — photo ${i + 1}`}
                    width={400}
                    height={i % 3 === 0 ? 500 : 300}
                    className="w-full h-auto object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ backgroundColor: "rgba(10,22,40,0.45)" }}
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(201,168,76,0.9)" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0A1628" strokeWidth="2.5" aria-hidden="true">
                        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/>
                      </svg>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={galleryImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          altPrefix={event.title}
        />
      )}
    </>
  );
}
