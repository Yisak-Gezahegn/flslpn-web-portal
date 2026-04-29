"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const MISSION = "To empower female law students and young legal professionals through mentorship, leadership, advocacy, and professional development.";

const VISION = "To build a strong community of confident and skilled women leaders in the legal profession who promote justice, equality, and positive social impact.";

const GOALS = [
  "Enhance the academic and professional skills of female law students",
  "Raise awareness of women's legal rights and gender equality",
  "Promote mentorship and networking between students and legal professionals",
  "Foster leadership, advocacy, and professional growth among members",
];

const VALUES = [
  {
    icon: "⚖️",
    title: "Empowerment",
    desc: "Supporting the growth and confidence of female law students and young legal professionals.",
  },
  {
    icon: "🌍",
    title: "Gender Equality & Justice",
    desc: "Promoting fairness, women's rights, and equal opportunities in law and society.",
  },
  {
    icon: "🤝",
    title: "Inclusivity",
    desc: "Building a welcoming platform that includes students, professionals, and community members of all backgrounds, including persons with disabilities.",
  },
  {
    icon: "💡",
    title: "Community Impact",
    desc: "Contributing to society through women's rights awareness and legal outreach.",
  },
];

export default function AboutPage() {
  const [activeValue, setActiveValue] = useState<number | null>(null);

  return (
    <div className="page-bg min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#0A1628" }} className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <div className="w-12 h-1 rounded mb-6 mx-auto" style={{ backgroundColor: "#C9A84C" }} />
          <h1 style={{ color: "#ffffff", fontFamily: "var(--font-playfair, Georgia, serif)" }}
            className="text-4xl sm:text-5xl font-bold mb-4">
            About FLSLPN
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)" }} className="text-lg max-w-2xl mx-auto">
            Female Law Students &amp; Legal Professionals Network
          </p>
        </ScrollReveal>
      </section>

      {/* ── Our Story ────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 card-bg">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-1 rounded" style={{ backgroundColor: "#C9A84C" }} />
              <h2 className="text-3xl font-bold text-main" style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}>
                Our Story
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="space-y-5 text-lg leading-relaxed text-sub">
              <p>
                The Female Law Students in the Legal Professional Network – Haramaya University Chapter was established in <strong className="text-main">October 2021</strong> by <strong className="text-main">Ms. Zebiba Musema</strong> with the support of Ms. Urji Biso, Dr. Richard Wentzell, and Haramaya University College of Law.
              </p>
              <p>
                The network is a <strong className="text-main">student-led initiative</strong> that empowers female law students and young legal professionals through mentorship, leadership, advocacy, and professional development.
              </p>
              <p>
                In <strong className="text-main">2025</strong>, the network was relaunched with new impact-driven activities to strengthen community engagement and women's empowerment in the legal field.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Mission & Vision ─────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 alt-bg">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Mission */}
          <ScrollReveal>
            <div className="card-bg rounded-3xl p-8 border border-sub transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              style={{ boxShadow: "0 4px 20px rgba(10,22,40,0.08)" }}>
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-4 text-main" style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}>
                Our Mission
              </h3>
              <p className="text-base leading-relaxed text-sub">
                {MISSION}
              </p>
            </div>
          </ScrollReveal>

          {/* Vision */}
          <ScrollReveal delay={0.1}>
            <div className="card-bg rounded-3xl p-8 border border-sub transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              style={{ boxShadow: "0 4px 20px rgba(10,22,40,0.08)" }}>
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-2xl font-bold mb-4 text-main" style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}>
                Our Vision
              </h3>
              <p className="text-base leading-relaxed text-sub">
                {VISION}
              </p>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ── Goals ────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 card-bg">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-8 h-1 rounded" style={{ backgroundColor: "#C9A84C" }} />
              <h2 className="text-3xl font-bold text-main" style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}>
                Our Goals
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {GOALS.map((goal, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="flex gap-4 p-5 rounded-2xl border border-sub transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{ backgroundColor: "var(--bg-section-alt)" }}>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ backgroundColor: "#C9A84C", color: "#0A1628" }}>
                    {i + 1}
                  </div>
                  <p className="text-base leading-relaxed text-sub flex-1">{goal}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Values — interactive ────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 alt-bg">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="w-12 h-1 rounded mb-5 mx-auto" style={{ backgroundColor: "#C9A84C" }} />
              <h2 className="text-3xl font-bold text-main" style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}>
                Our Core Values
              </h2>
              <p className="text-dim text-sm mt-3">Tap any value to learn more</p>
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
                    backgroundColor: activeValue === i ? "#0A1628" : "var(--bg-card)",
                    border: `2px solid ${activeValue === i ? "#C9A84C" : "var(--border-subtle)"}`,
                    boxShadow: activeValue === i ? "0 12px 40px rgba(10,22,40,0.2)" : "0 2px 8px rgba(10,22,40,0.06)",
                    transform: activeValue === i ? "translateY(-6px) scale(1.02)" : "translateY(0)",
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
      </section>

    </div>
  );
}
