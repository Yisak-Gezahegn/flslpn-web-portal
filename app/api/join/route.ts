import { NextRequest, NextResponse } from "next/server";
import { joinFormSchema } from "@/lib/schemas";

/**
 * POST /api/join
 *
 * Handles membership application form submissions.
 * 1. Parses and re-validates the request body with the zod schema.
 * 2. Sends an email notification via Resend (if API key is configured).
 * 3. Returns { success: true } or { error: string }.
 *
 * Requirements: 10.5, 10.7
 */
export async function POST(request: NextRequest) {
  try {
    // Parse body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    // Server-side validation (mirrors client-side schema)
    const result = joinFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const data = result.data;

    // Send email notification via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(resendApiKey);

        await resend.emails.send({
          from: "FLSLPN Portal <noreply@flslpn.org>",
          to: process.env.NOTIFICATION_EMAIL ?? "flslpn@haramaya.edu.et",
          subject: `New Membership Application — ${data.fullName}`,
          text: [
            `New membership application received:`,
            ``,
            `Name: ${data.fullName}`,
            `Email: ${data.email}`,
            `Phone: ${data.phone ?? "Not provided"}`,
            `Year of Study: ${data.yearOfStudy}`,
            `Areas of Interest: ${data.areasOfInterest?.join(", ") ?? "Not specified"}`,
            `Message: ${data.message ?? "None"}`,
          ].join("\n"),
        });
      } catch (emailError) {
        // Log but don't fail the request — form data was valid
        console.error("[join] Email send failed:", emailError);
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[join] Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
