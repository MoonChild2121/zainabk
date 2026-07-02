"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Partial<Record<"email" | "subject" | "message", string>>;
};

// Reject anything containing CR/LF — the classic header-injection vector.
// (Resend's JSON API isn't SMTP so it's not strictly exploitable here, but
// stripping it keeps the subject/reply-to clean and is good hygiene.)
const noNewlines = (label: string) =>
  z.string().refine((v) => !/[\r\n]/.test(v), `${label} contains invalid characters`);

const schema = z.object({
  email: noNewlines("Email").pipe(z.email("Enter a valid email address")),
  // Subject is optional — falls back to a placeholder in the email itself.
  subject: noNewlines("Subject")
    .pipe(z.string().trim().max(150, "Subject is too long"))
    .optional()
    .default(""),
  message: z
    .string()
    .trim()
    .min(1, "Please write a message")
    .max(5000, "Message is too long"),
});

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "zkashif.bscs21seecs@seecs.edu.pk";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

export async function sendMessage(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // 1. Honeypot — real users never see or fill this field.
  if (typeof formData.get("company") === "string" && formData.get("company") !== "") {
    // Pretend success so bots don't learn they were caught.
    return { status: "success", message: "Thanks! Your message is on its way." };
  }

  // 2. Rate limit per client IP (5 sends / 10 min).
  const hdrs = await headers();
  const ip =
    hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    hdrs.get("x-real-ip") ||
    "unknown";
  const limit = rateLimit(`contact:${ip}`, 5, 10 * 60 * 1000);
  if (!limit.allowed) {
    return {
      status: "error",
      message: `Too many messages. Please try again in ${Math.ceil(limit.retryAfter / 60)} minute(s).`,
    };
  }

  // 3. Validate.
  const parsed = schema.safeParse({
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const flat = z.flattenError(parsed.error).fieldErrors;
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      errors: {
        email: flat.email?.[0],
        subject: flat.subject?.[0],
        message: flat.message?.[0],
      },
    };
  }

  const { email, subject, message } = parsed.data;

  // 4. Config guard — surface a clear error if the key is missing.
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — cannot send contact email.");
    return {
      status: "error",
      message: "The contact form isn't configured yet. Please email me directly.",
    };
  }

  // 5. Send. replyTo is the submitter so replies go straight back to them.
  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: email,
      subject: `[Portfolio] ${subject || "(No subject)"}`,
      text: `From: ${email}\n\n${message}`,
    });

    if (error) {
      console.error("Resend send failed:", error);
      return {
        status: "error",
        message: "Something went wrong sending your message. Please try again.",
      };
    }
  } catch (err) {
    console.error("Unexpected error sending contact email:", err);
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again.",
    };
  }

  return { status: "success", message: "Thanks! Your message is on its way." };
}
