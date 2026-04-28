import { z } from "zod";

// ─── Shared helpers ───────────────────────────────────────────────────────────

/** Trims whitespace and rejects empty/whitespace-only strings */
const nonEmptyString = z
  .string()
  .trim()
  .min(1, { message: "This field is required" });

const emailField = z
  .string()
  .trim()
  .min(1, { message: "Email address is required" })
  .email({ message: "Please enter a valid email address" });

// ─── Join form schema ─────────────────────────────────────────────────────────

/**
 * Zod validation schema for JoinFormData.
 *
 * Required: fullName, email, yearOfStudy
 * Optional: phone, areasOfInterest, message
 *
 * Requirements: 10.2, 10.3, 10.4
 */
export const joinFormSchema = z.object({
  fullName: nonEmptyString.max(100, { message: "Name must be 100 characters or fewer" }),
  email: emailField,
  phone: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v === "" ? undefined : v)),
  yearOfStudy: z.enum(["1st", "2nd", "3rd", "4th", "5th", "Graduate"], {
    errorMap: () => ({ message: "Please select your year of study" }),
  }),
  areasOfInterest: z.array(z.string()).optional(),
  message: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v === "" ? undefined : v)),
});

export type JoinFormInput = z.infer<typeof joinFormSchema>;

// ─── Contact form schema ──────────────────────────────────────────────────────

/**
 * Zod validation schema for ContactFormData.
 *
 * All four fields are required.
 * Requirements: 11.3, 11.5
 */
export const contactFormSchema = z.object({
  name: nonEmptyString.max(100, { message: "Name must be 100 characters or fewer" }),
  email: emailField,
  subject: nonEmptyString.max(200, { message: "Subject must be 200 characters or fewer" }),
  message: nonEmptyString.max(5000, { message: "Message must be 5000 characters or fewer" }),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
