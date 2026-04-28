import * as React from "react";

interface WelcomeEmailProps {
  name: string;
}

export const WelcomeEmail: React.FC<Readonly<WelcomeEmailProps>> = ({
  name,
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
      Welcome to the future of efficient building.
    </h1>
    <p style={{ fontSize: "16px", lineHeight: "1.6", marginBottom: "24px" }}>
      Hi {name.split(" ")[0]},
    </p>
    <p style={{ fontSize: "16px", lineHeight: "1.6", marginBottom: "24px" }}>
      You're successfully on the waitlist for the private beta of Distilled by Starky Labs.
    </p>
    <p style={{ fontSize: "16px", lineHeight: "1.6", marginBottom: "24px" }}>
      We're building edge-native, privacy-first DevTools that optimize your AI token usage without sacrificing capability.
    </p>
    <p style={{ fontSize: "16px", lineHeight: "1.6", marginBottom: "32px" }}>
      Best,<br />
      The Starky Labs Team
    </p>
    <hr style={{ border: "none", borderTop: "1px solid #eaeaea", margin: "32px 0" }} />
    <p style={{ fontSize: "12px", color: "#999999", textAlign: "center" }}>
      Starky Labs | Distributed Globally
    </p>
  </div>
);
