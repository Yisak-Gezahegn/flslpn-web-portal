import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Contact — FLSLPN",
  description: "Get in touch with the Female Law Students & Legal Professionals Network at Haramaya University.",
};

const CONTACT_EMAIL = "hu.flslpn@gmail.com";
const CONTACT_ADDRESS = "College of Law, Haramaya University, Haramaya, Ethiopia";

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/female-law-students-and-legal-professionals-network/" },
  { label: "Instagram", href: "https://www.instagram.com/flslpn" },
  { label: "Telegram", href: "https://t.me/+h1Rgdgwlt-w1MGZk" },
  { label: "TikTok", href: "http://tiktok.com/@flsn_hu" },
];

export default function ContactPage() {
  return (
    <div className="page-bg min-h-screen">

      {/* Hero */}
      <section style={{ backgroundColor: "#0A1628" }} className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <div className="w-12 h-1 rounded mb-6 mx-auto" style={{ backgroundColor: "#C9A84C" }} />
          <h1 style={{ color: "#ffffff", fontFamily: "var(--font-playfair, Georgia, serif)" }}
            className="text-4xl sm:text-5xl font-bold mb-4">Contact Us</h1>
          <p style={{ color: "rgba(255,255,255,0.7)" }} className="text-lg max-w-xl mx-auto">
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
              <h2 className="text-2xl font-bold mb-8"
                style={{ color: "var(--text-primary)", fontFamily: "var(--font-playfair, Georgia, serif)" }}>
                Get in Touch
              </h2>

              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#C9A84C" }}>Email</p>
                <a href={`mailto:${CONTACT_EMAIL}`}
                  className="text-base hover:opacity-70 transition-opacity break-all"
                  style={{ color: "var(--text-primary)" }}>
                  {CONTACT_EMAIL}
                </a>
              </div>

              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#C9A84C" }}>Address</p>
                <address className="text-base not-italic leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {CONTACT_ADDRESS}
                </address>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#C9A84C" }}>Follow Us</p>
                <div className="flex flex-wrap items-center gap-4">
                  {SOCIAL_LINKS.map(({ label, href }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      className="text-sm font-medium transition-colors duration-150 hover:opacity-70"
                      style={{ color: "var(--text-secondary)" }}>
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
              <h2 className="text-2xl font-bold mb-2"
                style={{ color: "var(--text-primary)", fontFamily: "var(--font-playfair, Georgia, serif)" }}>
                Send a Message
              </h2>
              <p className="mb-8 text-sm" style={{ color: "var(--text-muted)" }}>
                Fields marked with <span style={{ color: "#ef4444" }} aria-hidden="true">*</span> are required.
              </p>
              <ContactForm />
            </ScrollReveal>
          </div>

        </div>
      </section>
    </div>
  );
}
