import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/token";
import { verifyWaitlistEntry } from "@/lib/db";
import { Resend } from "resend";
import { WelcomeEmail } from "@/components/emails/WelcomeEmail";

const resend = new Resend(process.env.RESEND_API_KEY || "no-key");

// Switching to 'nodejs' (Serverless) which has a more generous timeout than 'edge'
// for handling multiple external API calls (Supabase + Resend).
export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  try {
    const email = await verifyToken(token);

    if (!email) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    // 1. Update DB status to VERIFIED and get user's name
    // We await this because we need the name for the email
    const name = await verifyWaitlistEntry(email);

    // 2. Send Welcome Email
    // We use await here to ensure it's sent before we finish
    // but we wrap it in a try-catch so an email failure doesn't 
    // break the user's verification experience.
    try {
      await resend.emails.send({
        from: "Distilled <hello@distilled.starkylabs.com>",
        to: email,
        subject: "You're on the list | Distilled by Starky Labs",
        react: <WelcomeEmail name={name} />,
      });
    } catch (emailErr) {
      console.error("Welcome email failed to send:", emailErr);
      // We don't throw here so the user still gets redirected to success
    }

    // Redirect to success page
    const successUrl = new URL("/verify-success", req.url);
    return NextResponse.redirect(successUrl);
  } catch (err) {
    console.error("Verification process error:", err);
    return NextResponse.json({ 
      error: "Verification failed. Please try again or contact support." 
    }, { status: 500 });
  }
}
