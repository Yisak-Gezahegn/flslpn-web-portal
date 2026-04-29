"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { joinFormSchema, type JoinFormInput } from "@/lib/schemas";

// ─── Styles using CSS variables (work in both light and dark mode) ────────────

const fieldStyle: React.CSSProperties = {
  backgroundColor: "var(--bg-card)",
  color: "var(--text-primary)",
  border: "1px solid var(--border-subtle)",
};

const labelStyle: React.CSSProperties = {
  color: "var(--text-primary)",
  display: "block",
  fontSize: "0.875rem",
  fontWeight: 500,
  marginBottom: "0.25rem",
};

const optionalStyle: React.CSSProperties = {
  color: "var(--text-muted)",
  fontWeight: 400,
};

const fieldClass = "w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors duration-150 font-sans text-sm";

const AREAS_OF_INTEREST = [
  "Human Rights Law", "Family Law", "Criminal Law", "Corporate Law",
  "Environmental Law", "International Law", "Legal Aid & Pro Bono",
  "Research & Academia", "Mentorship",
];

export function JoinForm() {
  const [submitStatus, setSubmitStatus] = useState<"idle"|"submitting"|"success"|"error">("idle");
  const [serverError, setServerError] = useState("");

  const { register, handleSubmit, formState: { errors }, reset } = useForm<JoinFormInput>({
    resolver: zodResolver(joinFormSchema),
  });

  async function onSubmit(data: JoinFormInput) {
    setSubmitStatus("submitting");
    setServerError("");
    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) { setSubmitStatus("success"); reset(); }
      else {
        const json = await res.json().catch(() => ({}));
        setServerError(json.error ?? "Something went wrong. Please try again.");
        setSubmitStatus("error");
      }
    } catch {
      setServerError("Unable to submit. Please check your connection and try again.");
      setSubmitStatus("error");
    }
  }

  if (submitStatus === "success") {
    return (
      <div role="alert" className="rounded-2xl p-8 text-center"
        style={{ backgroundColor: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)" }}>
        <div className="text-4xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)", fontFamily: "var(--font-playfair, Georgia, serif)" }}>
          Application Received!
        </h2>
        <p style={{ color: "var(--text-secondary)" }}>Thank you for applying to join FLSLPN. We&apos;ll be in touch soon.</p>
        <button type="button" onClick={() => setSubmitStatus("idle")}
          className="mt-6 text-sm underline transition-colors" style={{ color: "#C9A84C" }}>
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Membership application form" className="flex flex-col gap-6">

      {/* Full Name */}
      <div>
        <label htmlFor="fullName" style={labelStyle}>
          Full Name <span style={{ color: "#ef4444" }} aria-hidden="true">*</span>
        </label>
        <input id="fullName" type="text" autoComplete="name" placeholder="Your full name"
          aria-required="true" className={fieldClass} style={fieldStyle} {...register("fullName")} />
        {errors.fullName && <p role="alert" className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" style={labelStyle}>
          Email Address <span style={{ color: "#ef4444" }} aria-hidden="true">*</span>
        </label>
        <input id="email" type="email" autoComplete="email" placeholder="you@example.com"
          aria-required="true" className={fieldClass} style={fieldStyle} {...register("email")} />
        {errors.email && <p role="alert" className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" style={labelStyle}>
          Phone Number <span style={optionalStyle}>(optional)</span>
        </label>
        <input id="phone" type="tel" autoComplete="tel" placeholder="+251 9XX XXX XXX"
          className={fieldClass} style={fieldStyle} {...register("phone")} />
      </div>

      {/* University ID */}
      <div>
        <label htmlFor="universityId" style={labelStyle}>
          University ID <span style={optionalStyle}>(optional)</span>
        </label>
        <input id="universityId" type="text" placeholder="e.g. HU/LAW/123/14"
          className={fieldClass} style={fieldStyle} {...register("universityId" as any)} />
      </div>

      {/* Location */}
      <div>
        <label htmlFor="location" style={labelStyle}>
          Location / Department <span style={optionalStyle}>(optional)</span>
        </label>
        <input id="location" type="text" placeholder="e.g. Haramaya University, College of Law"
          className={fieldClass} style={fieldStyle} {...register("location" as any)} />
      </div>

      {/* Year of Study */}
      <div>
        <label htmlFor="yearOfStudy" style={labelStyle}>
          Year of Study <span style={{ color: "#ef4444" }} aria-hidden="true">*</span>
        </label>
        <select id="yearOfStudy" aria-required="true" className={fieldClass} style={fieldStyle}
          {...register("yearOfStudy")} defaultValue="">
          <option value="" disabled>Select your year</option>
          <option value="1st">1st Year</option>
          <option value="2nd">2nd Year</option>
          <option value="3rd">3rd Year</option>
          <option value="4th">4th Year</option>
          <option value="5th">5th Year</option>
          <option value="Graduate">Graduate</option>
        </select>
        {errors.yearOfStudy && <p role="alert" className="mt-1 text-sm text-red-500">{errors.yearOfStudy.message}</p>}
      </div>

      {/* Areas of Interest */}
      <fieldset>
        <legend style={labelStyle}>
          Areas of Interest <span style={optionalStyle}>(optional)</span>
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          {AREAS_OF_INTEREST.map((area) => (
            <label key={area} className="flex items-center gap-2 cursor-pointer font-sans text-sm transition-colors"
              style={{ color: "var(--text-secondary)" }}>
              <input type="checkbox" value={area}
                className="w-4 h-4 rounded" style={{ accentColor: "#C9A84C" }}
                {...register("areasOfInterest")} />
              {area}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Message */}
      <div>
        <label htmlFor="message" style={labelStyle}>
          Message <span style={optionalStyle}>(optional)</span>
        </label>
        <textarea id="message" rows={4} placeholder="Tell us why you want to join FLSLPN..."
          className={`${fieldClass} resize-y min-h-[100px]`} style={fieldStyle}
          {...register("message")} />
      </div>

      {/* Server error */}
      {submitStatus === "error" && serverError && (
        <div role="alert" className="rounded-lg px-4 py-3"
          style={{ backgroundColor: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)" }}>
          <p className="text-sm text-red-500">{serverError}</p>
        </div>
      )}

      {/* Submit */}
      <button type="submit" disabled={submitStatus === "submitting"}
        className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold font-sans text-base transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60"
        style={{ backgroundColor: "#C9A84C", color: "#0A1628" }}>
        {submitStatus === "submitting" ? (<><SpinnerIcon />Submitting…</>) : "Submit Application"}
      </button>
    </form>
  );
}

function SpinnerIcon() {
  return (
    <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
