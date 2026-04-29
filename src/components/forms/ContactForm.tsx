"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormInput } from "@/lib/schemas";

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

const fieldClass = "w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors duration-150 font-sans text-sm";

export function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<"idle"|"submitting"|"success"|"error">("idle");
  const [serverError, setServerError] = useState("");

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
  });

  async function onSubmit(data: ContactFormInput) {
    setSubmitStatus("submitting");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
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
      setServerError("Unable to send your message. Please check your connection and try again.");
      setSubmitStatus("error");
    }
  }

  if (submitStatus === "success") {
    return (
      <div role="alert" className="rounded-2xl p-8 text-center"
        style={{ backgroundColor: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)" }}>
        <div className="text-4xl mb-4">✉️</div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)", fontFamily: "var(--font-playfair, Georgia, serif)" }}>
          Message Sent!
        </h2>
        <p style={{ color: "var(--text-secondary)" }}>Thank you for reaching out. We&apos;ll get back to you as soon as possible.</p>
        <button type="button" onClick={() => setSubmitStatus("idle")}
          className="mt-6 text-sm underline transition-colors" style={{ color: "#C9A84C" }}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Contact form" className="flex flex-col gap-6">

      {/* Name */}
      <div>
        <label htmlFor="contact-name" style={labelStyle}>
          Name <span style={{ color: "#ef4444" }} aria-hidden="true">*</span>
        </label>
        <input id="contact-name" type="text" autoComplete="name" placeholder="Your full name"
          aria-required="true" className={fieldClass} style={fieldStyle} {...register("name")} />
        {errors.name && <p role="alert" className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="contact-email" style={labelStyle}>
          Email Address <span style={{ color: "#ef4444" }} aria-hidden="true">*</span>
        </label>
        <input id="contact-email" type="email" autoComplete="email" placeholder="you@example.com"
          aria-required="true" className={fieldClass} style={fieldStyle} {...register("email")} />
        {errors.email && <p role="alert" className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="contact-subject" style={labelStyle}>
          Subject <span style={{ color: "#ef4444" }} aria-hidden="true">*</span>
        </label>
        <input id="contact-subject" type="text" placeholder="What is your message about?"
          aria-required="true" className={fieldClass} style={fieldStyle} {...register("subject")} />
        {errors.subject && <p role="alert" className="mt-1 text-sm text-red-500">{errors.subject.message}</p>}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" style={labelStyle}>
          Message <span style={{ color: "#ef4444" }} aria-hidden="true">*</span>
        </label>
        <textarea id="contact-message" rows={6} placeholder="Write your message here…"
          aria-required="true" className={`${fieldClass} resize-y min-h-[140px]`} style={fieldStyle}
          {...register("message")} />
        {errors.message && <p role="alert" className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
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
        {submitStatus === "submitting" ? (<><SpinnerIcon />Sending…</>) : "Send Message"}
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
