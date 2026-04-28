"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormInput } from "@/lib/schemas";

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

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * ContactForm — contact/enquiry form.
 *
 * Uses react-hook-form + zod for validation.
 * All four fields are required.
 * Form data is preserved on server failure (react-hook-form retains values).
 * Requirements: 11.3 – 11.6
 */
export function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [serverError, setServerError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
  });

  async function onSubmit(data: ContactFormInput) {
    setSubmitStatus("submitting");
    setServerError("");

    try {
      const response = await fetch("/api/contact", {
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
        // Keep status as "error" so form data is preserved (react-hook-form retains values)
        setSubmitStatus("error");
      }
    } catch {
      setServerError(
        "Unable to send your message. Please check your connection and try again."
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
        <div className="text-4xl mb-4" aria-hidden="true">✉️</div>
        <h2 className="font-serif text-2xl font-bold text-navy dark:text-white mb-2">
          Message Sent!
        </h2>
        <p className="font-sans text-navy/70 dark:text-white/70">
          Thank you for reaching out. We&apos;ll get back to you as soon as possible.
        </p>
        <button
          type="button"
          onClick={() => setSubmitStatus("idle")}
          className="mt-6 text-sm text-gold hover:text-gold-dark underline font-sans transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  // ── Form ────────────────────────────────────────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Contact form"
      className="flex flex-col gap-6"
    >
      {/* Name */}
      <div>
        <label htmlFor="contact-name" className={labelClass}>
          Name <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          placeholder="Your full name"
          aria-required="true"
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className={inputClass}
          {...register("name")}
        />
        {errors.name && (
          <p id="contact-name-error" role="alert" className={errorClass}>
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="contact-email" className={labelClass}>
          Email Address <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-required="true"
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className={inputClass}
          {...register("email")}
        />
        {errors.email && (
          <p id="contact-email-error" role="alert" className={errorClass}>
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="contact-subject" className={labelClass}>
          Subject <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-subject"
          type="text"
          placeholder="What is your message about?"
          aria-required="true"
          aria-describedby={errors.subject ? "contact-subject-error" : undefined}
          className={inputClass}
          {...register("subject")}
        />
        {errors.subject && (
          <p id="contact-subject-error" role="alert" className={errorClass}>
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={6}
          placeholder="Write your message here…"
          aria-required="true"
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={`${inputClass} resize-y min-h-[140px]`}
          {...register("message")}
        />
        {errors.message && (
          <p id="contact-message-error" role="alert" className={errorClass}>
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Server error — form data preserved */}
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
            Sending…
          </>
        ) : (
          "Send Message"
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
