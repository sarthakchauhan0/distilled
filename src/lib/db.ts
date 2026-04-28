import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "";

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface WaitlistEntry {
  email: string;
  name?: string;
  company_size?: string;
  status: "PENDING" | "VERIFIED";
}

export async function upsertWaitlistEntry(entry: WaitlistEntry) {
  if (!supabase) {
    throw new Error("Supabase client is not initialized.");
  }

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

export async function getWaitlistEntry(email: string) {
  if (!supabase) return null;
  const { data } = await supabase
    .from("waitlist")
    .select("name, status")
    .eq("email", email)
    .single();
  return data;
}

export async function verifyWaitlistEntry(email: string) {
  if (!supabase) {
    throw new Error("Supabase client is not initialized.");
  }

  const { data, error } = await supabase
    .from("waitlist")
    .update({ status: "VERIFIED" })
    .eq("email", email)
    .select("name")
    .single();

  if (error) {
    console.error("Supabase verify error:", error);
    throw new Error("Failed to verify email.");
  }

  return data?.name || "Member";
}
