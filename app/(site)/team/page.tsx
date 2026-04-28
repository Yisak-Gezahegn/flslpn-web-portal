"use client";

import { useState } from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { STATIC_TEAM, type StaticTeamMember } from "@/lib/staticData";

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

function getInitials(name: string) {
  return name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();
}

function TeamMemberCard({ member }: { member: StaticTeamMember }) {
  const [bioVisible, setBioVisible] = useState(false);
  const photoExists = !member.photo.includes("placeholder");

  return (
    <article
      className="flex flex-col rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1"
      style={{ backgroundColor: "#ffffff", boxShadow: "0 4px 20px rgba(10,22,40,0.08)", border: "1px solid rgba(10,22,40,0.05)" }}
    >
      {/* Photo / Avatar */}
      <div
        className="relative overflow-hidden cursor-pointer select-none"
        style={{ aspectRatio: "1/1", backgroundColor: "#1A2E4A" }}
        onClick={() => setBioVisible(v => !v)}
        onKeyDown={(e) => e.key === "Enter" && setBioVisible(v => !v)}
        tabIndex={0}
        role="button"
        aria-label={`${bioVisible ? "Hide" : "Show"} bio for ${member.name}`}
        aria-expanded={bioVisible}
      >
        {photoExists ? (
          <Image
            src={member.photo}
            alt={`${member.name} — ${member.role}`}
            fill
            className="object-cover object-top transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          /* Styled initials avatar */
          <div className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ background: "linear-gradient(135deg, #0A1628 0%, #1A2E4A 100%)" }}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-3"
              style={{ backgroundColor: "rgba(201,168,76,0.15)", border: "2px solid rgba(201,168,76,0.4)" }}>
              <span style={{ color: "#C9A84C", fontFamily: "var(--font-playfair, Georgia, serif)" }}
                className="text-3xl font-bold">
                {getInitials(member.name)}
              </span>
            </div>
            <span style={{ color: "rgba(255,255,255,0.5)" }} className="text-xs">Photo coming soon</span>
          </div>
        )}

        {/* Bio overlay — shown on click/tap */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center p-5 transition-opacity duration-300"
          style={{
            backgroundColor: "rgba(10,22,40,0.93)",
            opacity: bioVisible ? 1 : 0,
            pointerEvents: bioVisible ? "auto" : "none",
          }}
        >
          <p className="text-sm leading-relaxed text-center mb-4" style={{ color: "rgba(255,255,255,0.92)" }}>
            {member.bio}
          </p>
          <span className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(201,168,76,0.2)", color: "#C9A84C" }}>
            Tap to close
          </span>
        </div>

        {/* Tap hint */}
        {!bioVisible && (
          <div className="absolute bottom-2 right-2 px-2 py-1 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ backgroundColor: "rgba(10,22,40,0.7)", color: "rgba(255,255,255,0.8)" }}>
            Tap for bio
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col gap-2 flex-1">
        <h3 style={{ color: "#0A1628", fontFamily: "var(--font-playfair, Georgia, serif)" }}
          className="text-base font-bold leading-snug">
          {member.name}
        </h3>
        <p style={{ color: "#C9A84C" }} className="text-xs font-semibold uppercase tracking-wide">
          {member.role}
        </p>

        {/* LinkedIn */}
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on LinkedIn`}
            className="inline-flex items-center gap-2 mt-auto pt-3 text-xs font-medium transition-opacity duration-150 hover:opacity-70"
            style={{ color: "#0A66C2", borderTop: "1px solid rgba(10,22,40,0.08)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <LinkedInIcon />
            View LinkedIn
          </a>
        )}
      </div>
    </article>
  );
}

export default function TeamPage() {
  return (
    <div style={{ backgroundColor: "#f8f7f4" }} className="min-h-screen">

      {/* Hero */}
      <section style={{ backgroundColor: "#0A1628" }} className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <div className="w-12 h-1 rounded mb-6 mx-auto" style={{ backgroundColor: "#C9A84C" }} />
          <h1 style={{ color: "#ffffff", fontFamily: "var(--font-playfair, Georgia, serif)" }}
            className="text-4xl sm:text-5xl font-bold mb-4">Our Team</h1>
          <p style={{ color: "rgba(255,255,255,0.7)" }} className="text-lg max-w-xl mx-auto">
            Meet the dedicated leaders driving FLSLPN&apos;s mission forward
          </p>
          <p style={{ color: "rgba(255,255,255,0.45)" }} className="text-sm mt-3">
            Tap any photo to read their bio
          </p>
        </ScrollReveal>
      </section>

      {/* Team grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {STATIC_TEAM.map((member, i) => (
              <ScrollReveal key={member.id} delay={i * 0.05}>
                <TeamMemberCard member={member} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
