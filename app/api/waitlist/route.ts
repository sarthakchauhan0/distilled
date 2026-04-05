import { NextResponse } from "next/server";
import { Resend } from "resend";

// Ensure environment variable is set
const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key");

export async function POST(req: Request) {
  try {
    const { name, email, companySize, consent, timestamp } = await req.json();

    if (!name || !email || !companySize || !consent) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1. Internal Notification
    const internalEmail = await resend.emails.send({
      from: "Starky Labs <hello@starkylabs.com>",
      to: "support@starkylabs.com",
      subject: "[New Lead] Starky Distilled Registration",
      html: `
        <h2>New Waitlist Registration</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company Size:</strong> ${companySize}</p>
        <p><strong>Timestamp:</strong> ${timestamp}</p>
        <p><strong>Consent Given:</strong> Yes</p>
      `,
    });

    if (internalEmail.error) {
      console.error("Resend internal notification error:", internalEmail.error);
      return NextResponse.json(
        { error: "Failed to send internal notification" },
        { status: 500 }
      );
    }

    // 2. User Auto-Responder
    const autoResponder = await resend.emails.send({
      from: "Starky Labs <support@starkylabs.com>",
      to: email,
      subject: "Welcome to Distilled by Starky Labs",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a;">
          <h1 style="font-size: 24px; font-weight: 600; letter-spacing: -0.5px; margin-bottom: 24px;">Welcome to the future of efficient building.</h1>
          
          <p style="font-size: 16px; line-height: 24px; color: #4a4a4a; margin-bottom: 24px;">
            Hi ${name.split(" ")[0]},
          </p>
          
          <p style="font-size: 16px; line-height: 24px; color: #4a4a4a; margin-bottom: 24px;">
            You're on the list for the private beta of Distilled. We're building edge-native, privacy-first DevTools that optimize your AI token usage without sacrificing capability.
          </p>

          <p style="font-size: 16px; line-height: 24px; color: #4a4a4a; margin-bottom: 48px;">
            We'll be in touch soon with access instructions.
          </p>
          
          <hr style="border: none; border-top: 1px solid #eaeaea; margin-bottom: 24px;" />
          
          <p style="font-size: 12px; line-height: 18px; color: #888888;">
            Starky Labs | Distributed Globally<br/>
            <a href="mailto:support@starkylabs.com" style="color: #666; text-decoration: none;">support@starkylabs.com</a>
          </p>
        </div>
      `,
    });

    if (autoResponder.error) {
      console.error("Resend auto-responder error:", autoResponder.error);
      // We still return success to the user as their data was processed
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
