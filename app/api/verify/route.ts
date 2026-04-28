import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/token";
import { verifyWaitlistEntry } from "@/lib/db";
import { Resend } from "resend";
import { WelcomeEmail } from "@/components/emails/WelcomeEmail";

const resend = new Resend(process.env.RESEND_API_KEY || "no-key");

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const email = await verifyToken(token);

  if (!email) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
  }

  try {
    // Update DB status to VERIFIED and get user's name
    const name = await verifyWaitlistEntry(email);

    // Send Welcome Email
    await resend.emails.send({
      from: "Distilled by Starky Labs <hello@distilled.starkylabs.com>",
      to: email,
      subject: "You're on the list | Distilled by Starky Labs",
      react: <WelcomeEmail name={name} />,
    });

    // Redirect to success page
    return NextResponse.redirect(new URL("/verify-success", req.url));
  } catch (err) {
    console.error("Verification error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
