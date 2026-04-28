import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found — FLSLPN",
};

/**
 * Custom 404 page with brand styling.
 * Requirement: 8.6
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-center text-center px-6">
      <span className="font-serif text-gold text-8xl font-bold leading-none mb-4" aria-hidden="true">
        404
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
        Page Not Found
      </h1>
      <p className="font-sans text-lg text-white/60 max-w-md mb-10">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/events"
          className="
            inline-flex items-center justify-center
            px-6 py-3 rounded-full
            bg-gold hover:bg-gold-light
            text-navy font-semibold font-sans text-sm
            transition-colors duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy
          "
        >
          Browse Events
        </Link>
        <Link
          href="/"
          className="
            inline-flex items-center justify-center
            px-6 py-3 rounded-full
            border border-gold/40 hover:border-gold
            text-white hover:text-gold
            font-semibold font-sans text-sm
            transition-colors duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy
          "
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
