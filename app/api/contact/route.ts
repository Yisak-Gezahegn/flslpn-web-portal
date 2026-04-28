import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/schemas";

/**
 * POST /api/contact
 *
 * Handles contact form submissions.
 * 1. Parses and re-validates the request body with the zod schema.
 * 2. Sends an email notification via Resend (if API key is configured).
 * 3. Returns { success: true } or { error: string }.
 * Form state is preserved on failure (handled client-side).
 *
 * Requirements: 11.4, 11.6
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

    // Server-side validation
    const result = contactFormSchema.safeParse(body);
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
          reply_to: data.email,
          subject: `Contact Form: ${data.subject}`,
          text: [
            `New contact form submission:`,
            ``,
            `Name: ${data.name}`,
            `Email: ${data.email}`,
            `Subject: ${data.subject}`,
            ``,
            `Message:`,
            data.message,
          ].join("\n"),
        });
      } catch (emailError) {
        console.error("[contact] Email send failed:", emailError);
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[contact] Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
