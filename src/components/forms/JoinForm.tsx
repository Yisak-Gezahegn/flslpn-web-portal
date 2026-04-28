"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { joinFormSchema, type JoinFormInput } from "@/lib/schemas";

// ─── Shared field styles ──────────────────────────────────────────────────────

const inputClass = `
  w-full px-4 py-3 rounded-lg border
  bg-white dark:bg-navy-light
  text-navy dark:text-white
  placeholder:text-navy/40 dark:placeholder:text-white/30
  border-navy/20 dark:border-white/20
  focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent
  transition-colors duration-150
  font-sans text-sm
`;

const errorClass = "mt-1 text-sm text-red-500 dark:text-red-400 font-sans";
const labelClass = "block text-sm font-medium text-navy dark:text-white mb-1 font-sans";

// ─── Areas of interest options ────────────────────────────────────────────────

const AREAS_OF_INTEREST = [
  "Human Rights Law",
  "Family Law",
  "Criminal Law",
  "Corporate Law",
  "Environmental Law",
  "International Law",
  "Legal Aid & Pro Bono",
  "Research & Academia",
  "Mentorship",
];

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * JoinForm — membership application form.
 *
 * Uses react-hook-form + zod for validation.
 * Inline validation errors adjacent to invalid fields.
 * Submit button disabled + loading indicator during submission.
 * Success confirmation on success; descriptive error on failure.
 *
 * Requirements: 10.1 – 10.7
 */
export function JoinForm() {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [serverError, setServerError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<JoinFormInput>({
    resolver: zodResolver(joinFormSchema),
  });

  async function onSubmit(data: JoinFormInput) {
    setSubmitStatus("submitting");
    setServerError("");

    try {
      const response = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
      } else {
        const json = await response.json().catch(() => ({}));
        setServerError(
          json.error ?? "Something went wrong. Please try again."
        );
        setSubmitStatus("error");
      }
    } catch {
      setServerError(
        "Unable to submit. Please check your connection and try again."
      );
      setSubmitStatus("error");
    }
  }

  // ── Success state ───────────────────────────────────────────────────────────
  if (submitStatus === "success") {
    return (
      <div
        role="alert"
        className="rounded-2xl bg-gold/10 border border-gold/30 p-8 text-center"
      >
        <div className="text-4xl mb-4" aria-hidden="true">🎉</div>
        <h2 className="font-serif text-2xl font-bold text-navy dark:text-white mb-2">
          Application Received!
        </h2>
        <p className="font-sans text-navy/70 dark:text-white/70">
          Thank you for applying to join FLSLPN. We&apos;ll be in touch soon.
        </p>
        <button
          type="button"
          onClick={() => setSubmitStatus("idle")}
          className="mt-6 text-sm text-gold hover:text-gold-dark underline font-sans transition-colors"
        >
          Submit another application
        </button>
      </div>
    );
  }

  // ── Form ────────────────────────────────────────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Membership application form"
      className="flex flex-col gap-6"
    >
      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className={labelClass}>
          Full Name <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          id="fullName"
          type="text"
          autoComplete="name"
          placeholder="Your full name"
          aria-required="true"
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
          className={inputClass}
          {...register("fullName")}
        />
        {errors.fullName && (
          <p id="fullName-error" role="alert" className={errorClass}>
            {errors.fullName.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className={labelClass}>
          Email Address <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-required="true"
          aria-describedby={errors.email ? "email-error" : undefined}
          className={inputClass}
          {...register("email")}
        />
        {errors.email && (
          <p id="email-error" role="alert" className={errorClass}>
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone (optional) */}
      <div>
        <label htmlFor="phone" className={labelClass}>
          Phone Number <span className="text-navy/40 dark:text-white/40 font-normal">(optional)</span>
        </label>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+251 9XX XXX XXX"
          className={inputClass}
          {...register("phone")}
        />
      </div>

      {/* University ID (optional) */}
      <div>
        <label htmlFor="universityId" className={labelClass}>
          University ID <span className="text-navy/40 dark:text-white/40 font-normal">(optional)</span>
        </label>
        <input
          id="universityId"
          type="text"
          placeholder="e.g. HU/LAW/123/14"
          className={inputClass}
          {...register("universityId" as any)}
        />
      </div>

      {/* Location (optional) */}
      <div>
        <label htmlFor="location" className={labelClass}>
          Location / Department <span className="text-navy/40 dark:text-white/40 font-normal">(optional)</span>
        </label>
        <input
          id="location"
          type="text"
          placeholder="e.g. Haramaya University, College of Law"
          className={inputClass}
          {...register("location" as any)}
        />
      </div>

      {/* Year of Study */}
      <div>
        <label htmlFor="yearOfStudy" className={labelClass}>
          Year of Study <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <select
          id="yearOfStudy"
          aria-required="true"
          aria-describedby={errors.yearOfStudy ? "yearOfStudy-error" : undefined}
          className={inputClass}
          {...register("yearOfStudy")}
          defaultValue=""
        >
          <option value="" disabled>Select your year</option>
          <option value="1st">1st Year</option>
          <option value="2nd">2nd Year</option>
          <option value="3rd">3rd Year</option>
          <option value="4th">4th Year</option>
          <option value="5th">5th Year</option>
          <option value="Graduate">Graduate</option>
        </select>
        {errors.yearOfStudy && (
          <p id="yearOfStudy-error" role="alert" className={errorClass}>
            {errors.yearOfStudy.message}
          </p>
        )}
      </div>

      {/* Areas of Interest (optional checkboxes) */}
      <fieldset>
        <legend className={labelClass}>
          Areas of Interest <span className="text-navy/40 dark:text-white/40 font-normal">(optional)</span>
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          {AREAS_OF_INTEREST.map((area) => (
            <label
              key={area}
              className="flex items-center gap-2 cursor-pointer font-sans text-sm text-navy/80 dark:text-white/80 hover:text-navy dark:hover:text-white transition-colors"
            >
              <input
                type="checkbox"
                value={area}
                className="w-4 h-4 rounded border-navy/30 text-gold focus:ring-gold focus:ring-offset-0"
                {...register("areasOfInterest")}
              />
              {area}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Message (optional) */}
      <div>
        <label htmlFor="message" className={labelClass}>
          Message <span className="text-navy/40 dark:text-white/40 font-normal">(optional)</span>
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="Tell us why you want to join FLSLPN..."
          className={`${inputClass} resize-y min-h-[100px]`}
          {...register("message")}
        />
      </div>

      {/* Server error */}
      {submitStatus === "error" && serverError && (
        <div role="alert" className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3">
          <p className="text-sm text-red-600 dark:text-red-400 font-sans">{serverError}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitStatus === "submitting"}
        aria-disabled={submitStatus === "submitting"}
        className="
          inline-flex items-center justify-center gap-2
          px-8 py-4 rounded-full
          bg-gold hover:bg-gold-light disabled:bg-gold/50
          text-navy font-semibold font-sans text-base
          transition-colors duration-200
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2
          disabled:cursor-not-allowed
        "
      >
        {submitStatus === "submitting" ? (
          <>
            <SpinnerIcon />
            Submitting…
          </>
        ) : (
          "Submit Application"
        )}
      </button>
    </form>
  );
}

function SpinnerIcon() {
  return (
    <svg
      className="animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
