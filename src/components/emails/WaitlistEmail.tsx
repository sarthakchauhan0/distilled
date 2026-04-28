import * as React from "react";

interface WaitlistEmailProps {
  name: string;
  verificationUrl: string;
}

export const WaitlistEmail: React.FC<Readonly<WaitlistEmailProps>> = ({
  name,
  verificationUrl,
}) => (
  <div style={{
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    backgroundColor: "#ffffff",
    color: "#1a1a1a",
    padding: "40px 20px",
    maxWidth: "600px",
    margin: "0 auto",
  }}>
    <h1 style={{
      fontSize: "24px",
      fontWeight: "700",
      letterSpacing: "-0.02em",
      marginBottom: "24px",
    }}>
      Welcome to Distilled
    </h1>
    <p style={{ fontSize: "16px", lineHeight: "1.6", marginBottom: "24px" }}>
      Hi {name.split(" ")[0]},
    </p>
    <p style={{ fontSize: "16px", lineHeight: "1.6", marginBottom: "32px" }}>
      Thank you for your interest in the Distilled private beta. Before we can add you to the waitlist, we just need to verify your email address.
    </p>
    <a
      href={verificationUrl}
      style={{
        display: "inline-block",
        backgroundColor: "#4f46e5",
        color: "#ffffff",
        padding: "14px 28px",
        borderRadius: "8px",
        fontSize: "16px",
        fontWeight: "600",
        textDecoration: "none",
        textAlign: "center",
      }}
    >
      Verify Email Address
    </a>
    <p style={{ fontSize: "14px", color: "#666666", marginTop: "32px", lineHeight: "1.6" }}>
      If you didn't request this, you can safely ignore this email. The link will expire in 24 hours.
    </p>
    <hr style={{ border: "none", borderTop: "1px solid #eaeaea", margin: "32px 0" }} />
    <p style={{ fontSize: "12px", color: "#999999", textAlign: "center" }}>
      Starky Labs &copy; 2026 | Privacy-First DevTools
    </p>
  </div>
);
