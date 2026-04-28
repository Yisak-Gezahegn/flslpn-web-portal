"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { HeroSlide } from "@/types";
import { urlFor } from "@/lib/sanity/image";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface HeroCarouselProps {
  slides: HeroSlide[];
  missionStatement: string;
  organizationName: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const AUTO_ADVANCE_MS = 5000;
const TRANSITION_DURATION_MS = 500; // 400–700ms per spec

// ─── Animation variants ───────────────────────────────────────────────────────

const slideVariants = {
  enter: { opacity: 0 },
  center: {
    opacity: 1,
    transition: { duration: TRANSITION_DURATION_MS / 1000, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: TRANSITION_DURATION_MS / 1000, ease: "easeInOut" },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * HeroCarousel — animated full-viewport hero image slider.
 *
 * Features:
 * - Auto-advances every 5 seconds
 * - Framer Motion AnimatePresence cross-fade (500ms)
 * - Navigation lock via `isTransitioning` ref — ignores input mid-transition
 * - Dot and arrow navigation controls
 * - Overlay text (org name + mission statement)
 * - onError fallback to bg-navy when an image fails to load
 * - Responsive: full viewport height on all breakpoints
 *
 * Requirements: 5.1 – 5.8
 */
export function HeroCarousel({
  slides,
  missionStatement,
  organizationName,
}: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const isTransitioning = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const slideCount = slides.length;

  // ── Navigation helpers ──────────────────────────────────────────────────────

  const goTo = useCallback(
    (index: number) => {
      // Lock: ignore input while a transition is in progress
      if (isTransitioning.current) return;

      isTransitioning.current = true;
      setActiveIndex(index);

      // Release lock after transition completes
      setTimeout(() => {
        isTransitioning.current = false;
      }, TRANSITION_DURATION_MS + 50); // small buffer
    },
    []
  );

  const goNext = useCallback(() => {
    goTo((activeIndex + 1) % slideCount);
  }, [activeIndex, slideCount, goTo]);

  const goPrev = useCallback(() => {
    goTo((activeIndex - 1 + slideCount) % slideCount);
  }, [activeIndex, slideCount, goTo]);

  // ── Auto-advance ────────────────────────────────────────────────────────────

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(goNext, AUTO_ADVANCE_MS);
  }, [goNext]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  // Reset timer when user manually navigates
  const handleGoTo = useCallback(
    (index: number) => {
      goTo(index);
      resetTimer();
    },
    [goTo, resetTimer]
  );

  const handleGoNext = useCallback(() => {
    goNext();
    resetTimer();
  }, [goNext, resetTimer]);

  const handleGoPrev = useCallback(() => {
    goPrev();
    resetTimer();
  }, [goPrev, resetTimer]);

  // ── Image error handler ─────────────────────────────────────────────────────

  const handleImageError = useCallback((key: string) => {
    setFailedImages((prev) => new Set(prev).add(key));
  }, []);

  // ── Guard: no slides ────────────────────────────────────────────────────────

  if (!slides || slides.length === 0) {
    return (
      <div className="relative w-full h-screen bg-navy flex items-center justify-center">
        <p className="text-white/50 font-sans text-sm">No hero images configured</p>
      </div>
    );
  }

  const currentSlide = slides[activeIndex];

  return (
    <section
      aria-label="Hero image carousel"
      className="relative w-full h-screen overflow-hidden bg-navy"
    >
      {/* ── Slides ─────────────────────────────────────────────────────────── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentSlide._key}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          {failedImages.has(currentSlide._key) ? (
            // Fallback: solid navy background when image fails to load
            <div className="absolute inset-0 bg-navy" aria-hidden="true" />
          ) : (
            <Image
              src={urlFor(currentSlide.asset).width(1920).height(1080).format("webp").quality(85).url()}
              alt={currentSlide.alt || `${organizationName} hero image ${activeIndex + 1}`}
              fill
              priority={activeIndex === 0}
              className="object-cover object-center brightness-50"
              sizes="100vw"
              onError={() => handleImageError(currentSlide._key)}
            />
          )}

          {/* Dark gradient overlay with fog effect for text legibility */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(10,22,40,0.55) 0%, rgba(10,22,40,0.35) 40%, rgba(10,22,40,0.75) 100%)",
              backdropFilter: "blur(1px)",
            }}
            aria-hidden="true"
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Overlay text ───────────────────────────────────────────────────── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10 pointer-events-none">
        <motion.h1
          key={`title-${currentSlide._key}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg max-w-4xl leading-tight"
        >
          {organizationName}
        </motion.h1>
        <motion.p
          key={`mission-${currentSlide._key}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="font-sans text-lg sm:text-xl text-white/90 drop-shadow mt-4 max-w-2xl leading-relaxed"
        >
          {missionStatement}
        </motion.p>
      </div>

      {/* ── Arrow controls ─────────────────────────────────────────────────── */}
      <button
        type="button"
        onClick={handleGoPrev}
        aria-label="Previous slide"
        className="
          absolute left-4 top-1/2 -translate-y-1/2 z-20
          w-11 h-11 rounded-full
          bg-black/30 hover:bg-black/50
          text-white
          flex items-center justify-center
          transition-colors duration-150
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold
        "
      >
        <ChevronLeftIcon />
      </button>

      <button
        type="button"
        onClick={handleGoNext}
        aria-label="Next slide"
        className="
          absolute right-4 top-1/2 -translate-y-1/2 z-20
          w-11 h-11 rounded-full
          bg-black/30 hover:bg-black/50
          text-white
          flex items-center justify-center
          transition-colors duration-150
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold
        "
      >
        <ChevronRightIcon />
      </button>

      {/* ── Dot navigation ─────────────────────────────────────────────────── */}
      <div
        role="tablist"
        aria-label="Slide navigation"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2"
      >
        {slides.map((slide, i) => (
          <button
            key={slide._key}
            type="button"
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => handleGoTo(i)}
            className={`
              rounded-full transition-all duration-300
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy
              ${
                i === activeIndex
                  ? "w-6 h-3 bg-gold"
                  : "w-3 h-3 bg-white/50 hover:bg-white/80"
              }
            `}
          />
        ))}
      </div>

      {/* ── Slide counter (screen reader) ──────────────────────────────────── */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {activeIndex + 1} of {slideCount}
      </div>
    </section>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function ChevronLeftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
