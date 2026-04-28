import type { Metadata } from "next";
import { JoinForm } from "@/components/forms/JoinForm";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

// Static — no CMS data needed
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Join Us — FLSLPN",
  description:
    "Apply to become a member of the Female Law Students & Legal Professionals Network at Haramaya University.",
};

/**
 * Join page — static page rendering the membership application form.
 * Requirement: 10.1
 */
export default function JoinPage() {
  return (
    <div className="bg-white dark:bg-navy min-h-screen">

      {/* Page hero */}
      <section
        aria-labelledby="join-heading"
        className="bg-navy dark:bg-navy-dark py-20 px-4 sm:px-6 lg:px-8 text-center"
      >
        <ScrollReveal>
          <span className="inline-block w-12 h-1 bg-gold rounded mb-6" aria-hidden="true" />
          <h1
            id="join-heading"
            className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            Join FLSLPN
          </h1>
          <p className="font-sans text-lg text-white/70 max-w-xl mx-auto">
            Become part of a network dedicated to empowering women in law
          </p>
        </ScrollReveal>
      </section>

      {/* Form section */}
      <section
        aria-labelledby="join-form-heading"
        className="py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <h2
              id="join-form-heading"
              className="font-serif text-2xl font-bold text-navy dark:text-white mb-2"
            >
              Membership Application
            </h2>
            <p className="font-sans text-navy/60 dark:text-white/60 mb-8 text-sm">
              Fields marked with <span className="text-red-500" aria-hidden="true">*</span> are required.
            </p>
          </ScrollReveal>
          <JoinForm />
        </div>
      </section>

    </div>
  );
}
