"use client";

import { useState } from "react";
import type { PortableTextBlock } from "@portabletext/types";
import { PortableTextRenderer } from "@/components/ui/PortableTextRenderer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface MissionSectionProps {
  aboutText: PortableTextBlock[];
}

const STATS = [
  { value: "2021", label: "Founded" },
  { value: "12+", label: "Team Leaders" },
  { value: "14+", label: "Events Held" },
  { value: "100+", label: "Members" },
];

const VALUES = [
  { icon: "⚖️", title: "Empowerment", desc: "Supporting the growth and confidence of female law students and young legal professionals." },
  { icon: "🌍", title: "Gender Equality", desc: "Promoting fairness, women's rights, and equal opportunities in law and society." },
  { icon: "🤝", title: "Inclusivity", desc: "Building a welcoming platform for students, professionals, and community members of all backgrounds." },
  { icon: "💡", title: "Community Impact", desc: "Contributing to society through women's rights awareness and legal outreach." },
];

export function MissionSection({ aboutText }: MissionSectionProps) {
  const [activeValue, setActiveValue] = useState<number | null>(null);

  return (
    <section aria-labelledby="mission-heading" className="overflow-hidden">

      {/* Stats banner — always dark */}
      <div style={{ backgroundColor: "#0A1628" }} className="py-8 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold" style={{ color: "#C9A84C", fontFamily: "var(--font-playfair, Georgia, serif)" }}>
                  {stat.value}
                </p>
                <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.65)" }}>{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Who We Are — uses CSS vars */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 alt-bg">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-col items-center text-center mb-10">
              <div className="w-12 h-1 rounded mb-5" style={{ backgroundColor: "#C9A84C" }} />
              <h2 id="mission-heading" className="text-3xl sm:text-4xl font-bold mb-4 text-main"
                style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}>
                Who We Are
              </h2>
              <p className="text-lg max-w-2xl leading-relaxed text-sub">
                The Female Law Students &amp; Legal Professionals Network at Haramaya University — empowering women in law since 2021.
              </p>
            </div>
          </ScrollReveal>

          {aboutText.length > 0 && (
            <ScrollReveal delay={0.15}>
              <PortableTextRenderer value={aboutText} />
            </ScrollReveal>
          )}
        </div>
      </div>

      {/* Core Values — uses CSS vars */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 card-bg">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="w-12 h-1 rounded mb-5 mx-auto" style={{ backgroundColor: "#C9A84C" }} />
              <h2 className="text-3xl sm:text-4xl font-bold text-main"
                style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}>
                Our Core Values
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((val, i) => (
              <ScrollReveal key={val.title} delay={i * 0.1}>
                <button
                  type="button"
                  onClick={() => setActiveValue(activeValue === i ? null : i)}
                  className="w-full text-left rounded-2xl p-6 transition-all duration-300 cursor-pointer"
                  style={{
                    backgroundColor: activeValue === i ? "#0A1628" : "var(--bg-section-alt)",
                    border: `2px solid ${activeValue === i ? "#C9A84C" : "var(--border-subtle)"}`,
                    boxShadow: activeValue === i ? "0 8px 32px rgba(10,22,40,0.2)" : "0 2px 8px rgba(0,0,0,0.06)",
                    transform: activeValue === i ? "translateY(-4px)" : "translateY(0)",
                  }}
                >
                  <div className="text-3xl mb-3">{val.icon}</div>
                  <h3 className="font-bold text-lg mb-2 transition-colors duration-200"
                    style={{
                      color: activeValue === i ? "#C9A84C" : "var(--text-primary)",
                      fontFamily: "var(--font-playfair, Georgia, serif)"
                    }}>
                    {val.title}
                  </h3>
                  <p className="text-sm leading-relaxed transition-colors duration-200"
                    style={{ color: activeValue === i ? "rgba(255,255,255,0.85)" : "var(--text-secondary)" }}>
                    {val.desc}
                  </p>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
