import { SignJWT, jwtVerify } from "jose";

const getSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    // During build or dev if not set, use a fallback but warn
    if (process.env.NODE_ENV === "production") {
      throw new Error("JWT_SECRET environment variable is required in production");
    }
    return new TextEncoder().encode("dev_secret_fallback_1234567890");
  }
  return new TextEncoder().encode(secret);
};

/**
 * Generates a time-sensitive verification token.
 * @param email The user's email address.
 * @returns A signed JWT.
 */
export async function generateVerificationToken(email: string): Promise<string> {
  const secret = getSecret();
  return await new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h") // Token expires in 24 hours
    .sign(secret);
}

/**
 * Verifies a verification token and extracts the email.
 * @param token The JWT to verify.
 * @returns The email address if valid, null otherwise.
 */
export async function verifyToken(token: string): Promise<string | null> {
  try {
    const secret = getSecret();
    const { payload } = await jwtVerify(token, secret);
    return payload.email as string;
  } catch (err) {
    console.error("Token verification failed:", err);
    return null;
  }
}
