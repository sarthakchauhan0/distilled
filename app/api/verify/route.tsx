import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/token";
import { getWaitlistEntry, verifyWaitlistEntry } from "@/lib/db";
import { Resend } from "resend";
import { WelcomeEmail } from "@/components/emails/WelcomeEmail";

const resend = new Resend(process.env.RESEND_API_KEY || "no-key");

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

    // Check current status
    const entry = await getWaitlistEntry(email);

    if (entry?.status === "VERIFIED") {
      // Already verified, just redirect to success page
      // We add a 'verified=already' param so the success page can show a custom message
      return NextResponse.redirect(new URL("/verify-success?verified=already", req.url));
    }

    // If PENDING, update DB status to VERIFIED
    const name = await verifyWaitlistEntry(email);

    // Send Welcome Email
    try {
      await resend.emails.send({
        from: "Distilled <hello@distilled.starkylabs.com>",
        to: email,
        subject: "You're on the list | Distilled by Starky Labs",
        react: <WelcomeEmail name={name} />,
      });
    } catch (emailErr) {
      console.error("Welcome email failed to send:", emailErr);
    }

    // Redirect to success page
    return NextResponse.redirect(new URL("/verify-success", req.url));
  } catch (err) {
    console.error("Verification process error:", err);
    return NextResponse.json({ 
      error: "Verification failed. Please try again or contact support." 
    }, { status: 500 });
  }
}
