"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ScrollRevealProps {
  children: ReactNode;
  /** Optional stagger delay in seconds. Defaults to 0. */
  delay?: number;
  /** Optional additional className for the wrapper div */
  className?: string;
}

// ─── Animation variants ───────────────────────────────────────────────────────

const revealVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
      delay,
    },
  }),
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * ScrollReveal — wraps children in a Framer Motion div that fades in
 * and slides up when the element enters the viewport.
 *
 * - Uses `whileInView` so the animation triggers on scroll.
 * - `viewport: { once: true }` ensures it only animates once per page load.
 * - `delay` can be used to stagger multiple sibling elements.
 *
 * @example
 * <ScrollReveal delay={0.1}>
 *   <EventCard event={event} />
 * </ScrollReveal>
 */
export function ScrollReveal({
  children,
  delay = 0,
  className = "",
}: ScrollRevealProps) {
  return (
    <motion.div
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  );
}
