import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/token";
import { verifyWaitlistEntry } from "@/lib/db";

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
    // Update DB status to VERIFIED
    await verifyWaitlistEntry(email);

    // Redirect to success page
    return NextResponse.redirect(new URL("/verify-success", req.url));
  } catch (err) {
    console.error("Verification error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
