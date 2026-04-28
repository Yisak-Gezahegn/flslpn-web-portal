import Image from "next/image";
import type { TeamMember } from "@/types";
import { urlFor } from "@/lib/sanity/image";

export interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  const { name, role, photo, bio } = member;

  const photoUrl = photo?.asset
    ? urlFor(photo.asset).width(400).height(400).format("webp").quality(80).fit("crop").url()
    : null;

  const altText = photo?.alt?.trim() || `${name} — ${role}`;

  // Extract LinkedIn from bio if present (stored as URL in bio field)
  const linkedinMatch = bio?.match(/https?:\/\/(www\.)?linkedin\.com\/[^\s]*/);
  const linkedinUrl = linkedinMatch ? linkedinMatch[0] : null;
  const bioText = bio?.replace(/https?:\/\/[^\s]*/g, "").trim() || null;

  return (
    <article
      className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 12px rgba(10,22,40,0.08)",
        border: "1px solid rgba(10,22,40,0.06)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(10,22,40,0.18)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(10,22,40,0.08)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      {/* Photo */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1/1", backgroundColor: "#1A2E4A" }}>
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={altText}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: "#1A2E4A" }}>
            <span style={{ color: "rgba(201,168,76,0.4)", fontFamily: "var(--font-playfair, Georgia, serif)" }} className="text-5xl font-bold">
              {name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        {/* Bio overlay on hover */}
        {bioText && (
          <div
            className="absolute inset-0 flex items-center justify-center p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ backgroundColor: "rgba(10,22,40,0.92)" }}
            aria-hidden="true"
          >
            <p className="text-sm leading-relaxed text-center" style={{ color: "rgba(255,255,255,0.9)" }}>
              {bioText}
            </p>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col gap-2">
        <h3 style={{ color: "#0A1628", fontFamily: "var(--font-playfair, Georgia, serif)" }} className="text-lg font-bold leading-snug">
          {name}
        </h3>
        <p style={{ color: "#C9A84C" }} className="text-sm font-medium">
          {role}
        </p>

        {/* LinkedIn */}
        {linkedinUrl && (
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on LinkedIn`}
            className="inline-flex items-center gap-2 mt-1 text-sm font-medium transition-opacity duration-150 hover:opacity-70"
            style={{ color: "#0A66C2" }}
          >
            <LinkedInIcon />
            LinkedIn Profile
          </a>
        )}

        {/* Screen reader bio */}
        {bioText && <p className="sr-only">{bioText}</p>}
      </div>
    </article>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}
