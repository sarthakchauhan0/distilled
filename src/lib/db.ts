import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface WaitlistEntry {
  email: string;
  name?: string;
  company_size?: string;
  status: "PENDING" | "VERIFIED";
}

export async function upsertWaitlistEntry(entry: WaitlistEntry) {
  const { error } = await supabase
    .from("waitlist")
    .upsert(
      {
        email: entry.email,
        name: entry.name,
        company_size: entry.company_size,
        status: entry.status,
      },
      { onConflict: "email" }
    );

  if (error) {
    console.error("Supabase upsert error:", error);
    throw new Error("Failed to update waitlist entry.");
  }
}

export async function verifyWaitlistEntry(email: string) {
  const { error } = await supabase
    .from("waitlist")
    .update({ status: "VERIFIED" })
    .eq("email", email);

  if (error) {
    console.error("Supabase verify error:", error);
    throw new Error("Failed to verify email.");
  }
}
