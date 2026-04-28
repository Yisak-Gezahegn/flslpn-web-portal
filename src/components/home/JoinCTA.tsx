import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * JoinCTA — call-to-action section encouraging visitors to join FLSLPN.
 *
 * Wrapped in ScrollReveal for entrance animation.
 * Requirement: 6.4
 */
export function JoinCTA() {
  return (
    <section
      aria-labelledby="join-cta-heading"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-navy dark:bg-navy-dark"
    >
      <div className="max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <span className="inline-block w-12 h-1 bg-gold rounded mb-6" aria-hidden="true" />
          <h2
            id="join-cta-heading"
            className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            Become a Member
          </h2>
          <p className="font-sans text-lg text-white/70 leading-relaxed mb-8 max-w-xl mx-auto">
            Join the Female Law Students &amp; Legal Professionals Network and
            connect with a community dedicated to empowering women in law.
          </p>
          <Link
            href="/join"
            className="
              inline-flex items-center justify-center
              px-8 py-4 rounded-full
              bg-gold hover:bg-gold-light
              text-navy font-semibold font-sans text-base
              transition-colors duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy
              shadow-lg shadow-gold/20
            "
          >
            Join Us Today
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
