import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

// Static — no CMS data needed
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Contact — FLSLPN",
  description:
    "Get in touch with the Female Law Students & Legal Professionals Network at Haramaya University.",
};

// Contact details
const CONTACT_EMAIL = "hu.flslpn@gmail.com";
const CONTACT_ADDRESS = "College of Law, Haramaya University, Haramaya, Ethiopia";

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/female-law-students-and-legal-professionals-network/" },
  { label: "Instagram", href: "https://www.instagram.com/flslpn" },
  { label: "Telegram", href: "https://t.me/+h1Rgdgwlt-w1MGZk" },
  { label: "TikTok", href: "http://tiktok.com/@flsn_hu" },
];

/**
 * Contact page — static page with contact info and ContactForm.
 * Requirements: 11.1, 11.2
 */
export default function ContactPage() {
  return (
    <div className="page-bg min-h-screen">

      {/* Page hero */}
      <section
        aria-labelledby="contact-heading"
        className="bg-navy dark:bg-navy-dark py-20 px-4 sm:px-6 lg:px-8 text-center"
      >
        <ScrollReveal>
          <span className="inline-block w-12 h-1 bg-gold rounded mb-6" aria-hidden="true" />
          <h1
            id="contact-heading"
            className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            Contact Us
          </h1>
          <p className="font-sans text-lg text-white/70 max-w-xl mx-auto">
            We&apos;d love to hear from you
          </p>
        </ScrollReveal>
      </section>

      {/* Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Contact info */}
          <div>
            <ScrollReveal>
              <h2 className="font-serif text-2xl font-bold text-navy dark:text-white mb-8">
                Get in Touch
              </h2>

              {/* Email */}
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-2">
                  Email
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-sans text-base hover:opacity-70 transition-opacity duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded break-all"
                  style={{ color: "var(--text-primary)" }}
                >
                  {CONTACT_EMAIL}
                </a>
              </div>

              {/* Address */}
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-2">
                  Address
                </p>
                <address className="font-sans text-base not-italic leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {CONTACT_ADDRESS}
                </address>
              </div>

              {/* Social links */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-3">
                  Follow Us
                </p>
                <div className="flex items-center gap-4">
                  {SOCIAL_LINKS.map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`FLSLPN on ${label}`}
                      className="
                        font-sans text-sm font-medium
                        text-navy/60 dark:text-white/60
                        hover:text-gold dark:hover:text-gold
                        transition-colors duration-150
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded
                      "
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Contact form */}
          <div>
            <ScrollReveal delay={0.1}>
              <h2 className="font-serif text-2xl font-bold text-navy dark:text-white mb-2">
                Send a Message
              </h2>
              <p className="font-sans text-navy/60 dark:text-white/60 mb-8 text-sm">
                Fields marked with <span className="text-red-500" aria-hidden="true">*</span> are required.
              </p>
              <ContactForm />
            </ScrollReveal>
          </div>

        </div>
      </section>

    </div>
  );
}
