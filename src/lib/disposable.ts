/**
 * A curated list of common disposable email domains.
 * In a production environment, you might want to use a more comprehensive list or an API.
 */
const DISPOSABLE_DOMAINS = new Set([
  "10minutemail.com",
  "mailinator.com",
  "temp-mail.org",
  "guerrillamail.com",
  "trashmail.com",
  "sharklasers.com",
  "getnada.com",
  "dispostable.com",
  "yopmail.com",
  "maildrop.cc",
  "teleworm.us",
  "dayrep.com",
  "armyspy.com",
  "spymail.one",
  "burnermiler.com",
  "tempmail.net",
  "mohmal.com",
]);

/**
 * Checks if an email address belongs to a disposable/temporary email provider.
 * @param email The email address to check.
 * @returns True if the email is disposable, false otherwise.
 */
export function isDisposableEmail(email: string): boolean {
  if (!email || !email.includes("@")) return false;
  
  const domain = email.split("@")[1].toLowerCase();
  
  // Check against our curated list
  if (DISPOSABLE_DOMAINS.has(domain)) return true;
  
  // Basic check for common patterns in disposable domains
  const disposablePatterns = [
    /^temp-?mail/i,
    /^drop-?mail/i,
    /^throwaway/i,
    /^get-?nada/i,
    /vps\.biz$/i, // Common for botnets
  ];
  
  return disposablePatterns.some(pattern => pattern.test(domain));
}
