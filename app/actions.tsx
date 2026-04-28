"use server";

import { Resend } from "resend";
import { isDisposableEmail } from "@/lib/disposable";
import { upsertWaitlistEntry } from "@/lib/db";
import { generateVerificationToken } from "@/lib/token";
import { WaitlistEmail } from "@/components/emails/WaitlistEmail";

const resend = new Resend(process.env.RESEND_API_KEY || "no-key");

interface JoinWaitlistResponse {
  success: boolean;
  error?: string;
}

export async function joinWaitlistAction(
  formData: {
    name: string;
    email: string;
    companySize: string;
    turnstileToken: string;
  }
): Promise<JoinWaitlistResponse> {
  const { name, email, companySize, turnstileToken } = formData;

  // Check for RESEND_API_KEY
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is missing.");
    return { success: false, error: "Email service is not configured." };
  }

  // 1. Bot Defense: Verify Turnstile Token
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (!turnstileSecret) {
    console.error("TURNSTILE_SECRET_KEY is not configured.");
    return { success: false, error: "Security configuration error." };
  }

  try {
    const verifyResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${encodeURIComponent(turnstileSecret)}&response=${encodeURIComponent(turnstileToken)}`,
      }
    );

    const verifyData = await verifyResponse.json();
    if (!verifyData.success) {
      return { success: false, error: "Bot detection failed. Please try again." };
    }

    // 2. Email Quality Check
    if (isDisposableEmail(email)) {
      return {
        success: false,
        error: "Please use a valid email address. Disposable emails are not allowed.",
      };
    }

    // 3. Generate Verification Token
    const token = await generateVerificationToken(email);
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/verify?token=${token}`;

    // 4. Store in DB as PENDING
    await upsertWaitlistEntry({
      email,
      name,
      company_size: companySize,
      status: "PENDING",
    });

    // 5. Send Verification Email
    const { error: emailError } = await resend.emails.send({
      from: "Distilled <hello@distilled.starkylabs.com>",
      to: email,
      subject: "Verify your email | Distilled",
      react: <WaitlistEmail name={name} verificationUrl={verificationUrl} />,
    });

    if (emailError) {
      console.error("Resend error:", emailError);
      return { success: false, error: "Failed to send verification email." };
    }

    return { success: true };
  } catch (err: any) {
    console.error("Waitlist action error:", err);
    return { 
      success: false, 
      error: err instanceof Error ? err.message : "An unexpected error occurred." 
    };
  }
}
