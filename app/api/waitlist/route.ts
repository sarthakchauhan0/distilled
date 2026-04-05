import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, companySize, timestamp } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // 1. Internal Notification (to the team)
    const internalEmail = await resend.emails.send({
      from: "Distilled by Starky Labs <distilled@starkylabs.com>",
      to: "distilled@starkylabs.com",
      subject: `[New Lead] ${name || "Someone"} for Distilled by Starky Labs`,
      html: `
        <h2>New Waitlist Registration</h2>
        <p><strong>Name:</strong> ${name || "N/A"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company Size:</strong> ${companySize || "N/A"}</p>
        <p><strong>Timestamp:</strong> ${timestamp}</p>
      `,
    });

    if (internalEmail.error) {
      console.error("Resend internal error:", internalEmail.error);
    }

    // 2. User Auto-Responder (to the signee)
    const userEmail = await resend.emails.send({
      from: "Distilled by Starky Labs <distilled@starkylabs.com>",
      to: email,
      subject: "You're on the list | Distilled by Starky Labs",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #111;">
          <h1 style="font-size: 20px; font-weight: 600;">Welcome to the future of efficient building.</h1>
          <p>Hi ${name ? name.split(" ")[0] : "there"},</p>
          <p>You're successfully on the waitlist for the private beta of <strong>Distilled by Starky Labs</strong>.</p>
          <p>We're building edge-native, privacy-first DevTools that optimize your AI token usage without sacrificing capability. We'll be in touch soon as we start rolling out access.</p>
          <p>Best,<br/>The Starky Labs Team</p>
          <hr style="border: none; border-top: solid 1px #eee; margin-top: 30px;" />
          <p style="font-size: 12px; color: #666;">Starky Labs | Distributed Globally</p>
        </div>
      `,
    });

    if (userEmail.error) {
      console.error("Resend user error:", userEmail.error);
    }

    return NextResponse.json(
      { message: "Waitlist request processed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Waitlist processing error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
