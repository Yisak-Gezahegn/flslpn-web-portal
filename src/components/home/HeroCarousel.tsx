"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { HeroSlide } from "@/types";
import { urlFor } from "@/lib/sanity/image";

export interface HeroCarouselProps {
  slides: HeroSlide[];
  missionStatement: string;
  organizationName: string;
}

const AUTO_ADVANCE_MS = 5000;
const TRANSITION_MS = 500;

const slideVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: TRANSITION_MS / 1000, ease: "easeInOut" } },
  exit: { opacity: 0, transition: { duration: TRANSITION_MS / 1000, ease: "easeInOut" } },
};

export function HeroCarousel({ slides, missionStatement, organizationName }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const isTransitioning = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const slideCount = slides.length;

  const goTo = useCallback((index: number) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setActiveIndex(index);
    setTimeout(() => { isTransitioning.current = false; }, TRANSITION_MS + 50);
  }, []);

  const goNext = useCallback(() => goTo((activeIndex + 1) % slideCount), [activeIndex, slideCount, goTo]);
  const goPrev = useCallback(() => goTo((activeIndex - 1 + slideCount) % slideCount), [activeIndex, slideCount, goTo]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(goNext, AUTO_ADVANCE_MS);
  }, [goNext]);

  useEffect(() => { resetTimer(); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, [resetTimer]);

  const handleGoTo = useCallback((i: number) => { goTo(i); resetTimer(); }, [goTo, resetTimer]);
  const handleGoNext = useCallback(() => { goNext(); resetTimer(); }, [goNext, resetTimer]);
  const handleGoPrev = useCallback(() => { goPrev(); resetTimer(); }, [goPrev, resetTimer]);

  if (!slides || slides.length === 0) {
    return (
      <section className="relative w-full h-screen flex items-center" style={{ backgroundColor: "#0A1628" }}>
        <StaticHeroContent organizationName={organizationName} missionStatement={missionStatement} />
      </section>
    );
  }

  const currentSlide = slides[activeIndex];

  return (
    <section aria-label="Hero image carousel" className="relative w-full h-screen overflow-hidden" style={{ backgroundColor: "#0A1628" }}>

      {/* Background image — right side with overlay */}
      <AnimatePresence mode="sync">
        <motion.div key={currentSlide._key} variants={slideVariants} initial="enter" animate="center" exit="exit"
          className="absolute inset-0">
          {failedImages.has(currentSlide._key) ? (
            <div className="absolute inset-0" style={{ backgroundColor: "#0A1628" }} />
          ) : (
            <Image
              src={urlFor(currentSlide.asset).width(1920).height(1080).format("webp").quality(85).url()}
              alt={currentSlide.alt || `${organizationName} hero image ${activeIndex + 1}`}
              fill priority={activeIndex === 0}
              className="object-cover object-center brightness-50"
              sizes="100vw"
              onError={() => setFailedImages(prev => new Set(prev).add(currentSlide._key))}
            />
          )}
          {/* Left dark gradient for text readability */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to right, rgba(10,22,40,0.92) 0%, rgba(10,22,40,0.7) 45%, rgba(10,22,40,0.2) 100%)"
          }} aria-hidden="true" />
        </motion.div>
      </AnimatePresence>

      {/* Text content — left aligned */}
      <div className="absolute inset-0 flex items-center z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
          <div className="max-w-xl">
            <motion.p
              key={`tag-${currentSlide._key}`}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "#C9A84C" }}>
              Haramaya University
            </motion.p>
            <motion.h1
              key={`title-${currentSlide._key}`}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-bold text-white leading-tight mb-6"
              style={{ fontFamily: "var(--font-playfair, Georgia, serif)", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              {organizationName === "FLSLPN"
                ? <>Female Law Students &amp;<br />Legal Professionals Network</>
                : organizationName}
            </motion.h1>
            <motion.p
              key={`mission-${currentSlide._key}`}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-base sm:text-lg leading-relaxed mb-8"
              style={{ color: "rgba(255,255,255,0.8)" }}>
              {missionStatement}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4">
              <Link href="/join"
                className="inline-flex items-center px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: "#C9A84C", color: "#0A1628" }}>
                Join Us
              </Link>
              <Link href="/about"
                className="inline-flex items-center px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:bg-white/10"
                style={{ color: "#ffffff", border: "1px solid rgba(255,255,255,0.4)" }}>
                Learn More
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Dot navigation */}
      <div role="tablist" aria-label="Slide navigation"
        className="absolute bottom-6 left-6 sm:left-10 lg:left-16 z-20 flex items-center gap-2">
        {slides.map((slide, i) => (
          <button key={slide._key} type="button" role="tab"
            aria-selected={i === activeIndex} aria-label={`Go to slide ${i + 1}`}
            onClick={() => handleGoTo(i)}
            className="rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
            style={{
              width: i === activeIndex ? "24px" : "10px",
              height: "10px",
              backgroundColor: i === activeIndex ? "#C9A84C" : "rgba(255,255,255,0.4)",
            }} />
        ))}
      </div>

      {/* Arrow controls */}
      <button type="button" onClick={handleGoPrev} aria-label="Previous slide"
        className="absolute right-16 bottom-4 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
        style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "#ffffff" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
      </button>
      <button type="button" onClick={handleGoNext} aria-label="Next slide"
        className="absolute right-4 bottom-4 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
        style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "#ffffff" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
      </button>

      <div className="sr-only" aria-live="polite">Slide {activeIndex + 1} of {slideCount}</div>
    </section>
  );
}

function StaticHeroContent({ organizationName, missionStatement }: { organizationName: string; missionStatement: string }) {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
      <div className="max-w-xl">
        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#C9A84C" }}>Haramaya University</p>
        <h1 className="font-bold text-white leading-tight mb-6"
          style={{ fontFamily: "var(--font-playfair, Georgia, serif)", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
          Female Law Students &amp;<br />Legal Professionals Network
        </h1>
        <p className="text-lg leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.8)" }}>{missionStatement}</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/join" className="inline-flex items-center px-6 py-3 rounded-full font-semibold text-sm"
            style={{ backgroundColor: "#C9A84C", color: "#0A1628" }}>Join Us</Link>
          <Link href="/about" className="inline-flex items-center px-6 py-3 rounded-full font-semibold text-sm"
            style={{ color: "#ffffff", border: "1px solid rgba(255,255,255,0.4)" }}>Learn More</Link>
        </div>
      </div>
    </div>
  );
}
