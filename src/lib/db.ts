/**
 * Cloudflare D1 Database Interface Mock
 * 
 * To use with actual D1:
 * 1. Initialize your database: `npx wrangler d1 create distilled-db`
 * 2. Add the binding to wrangler.toml:
 *    [[d1_databases]]
 *    binding = "DB"
 *    database_name = "distilled-db"
 *    database_id = "your-database-id"
 * 3. Use `process.env.DB` or `env.DB` to interact.
 * 
 * SQL Schema:
 * 
 * CREATE TABLE waitlist (
 *   id INTEGER PRIMARY KEY AUTOINCREMENT,
 *   email TEXT UNIQUE NOT NULL,
 *   name TEXT,
 *   company_size TEXT,
 *   status TEXT DEFAULT 'PENDING', -- PENDING, VERIFIED
 *   created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
 *   verified_at DATETIME
 * );
 */

export interface WaitlistEntry {
  email: string;
  name?: string;
  company_size?: string;
  status: "PENDING" | "VERIFIED";
  created_at?: string;
  verified_at?: string;
}

// This is a placeholder for actual DB logic.
// In a real Cloudflare Edge environment, you would use:
// const db = env.DB; 
// const result = await db.prepare("...").bind(...).run();

export async function upsertWaitlistEntry(entry: WaitlistEntry) {
  console.log(`[DB MOCK] Upserting entry for ${entry.email} with status ${entry.status}`);
  // In D1: 
  // await DB.prepare(`
  //   INSERT INTO waitlist (email, name, company_size, status) 
  //   VALUES (?, ?, ?, ?) 
  //   ON CONFLICT(email) DO UPDATE SET 
  //     name = excluded.name, 
  //     company_size = excluded.company_size,
  //     status = excluded.status
  // `).bind(entry.email, entry.name, entry.company_size, entry.status).run();
  return true;
}

export async function verifyWaitlistEntry(email: string) {
  console.log(`[DB MOCK] Verifying entry for ${email}`);
  // In D1:
  // await DB.prepare(`
  //   UPDATE waitlist 
  //   SET status = 'VERIFIED', verified_at = CURRENT_TIMESTAMP 
  //   WHERE email = ?
  // `).bind(email).run();
  return true;
}

export async function getWaitlistEntry(email: string): Promise<WaitlistEntry | null> {
  console.log(`[DB MOCK] Fetching entry for ${email}`);
  // In D1:
  // return await DB.prepare("SELECT * FROM waitlist WHERE email = ?").bind(email).first();
  return null;
}
