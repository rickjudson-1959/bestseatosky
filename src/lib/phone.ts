/** Digits for the Best Sea to Sky business line. Never a listing's phone. */
const SITE_PHONE_DIGITS = '7787702931';

function phoneDigits(phone: string): string {
  return phone.replace(/\D/g, '');
}

/** Trailing ext / extension / x / #, not part of the dialed number. */
const EXTENSION_PATTERN = /(?:extension|ext\.?|x|#)\s*(\d+)\s*$/i;

function splitExtension(phone: string): { base: string; extension: string | null } {
  const match = phone.match(EXTENSION_PATTERN);
  if (!match || match.index == null) return { base: phone.trim(), extension: null };
  const base = phone.slice(0, match.index).trim();
  if (!base) return { base: phone.trim(), extension: null };
  return { base, extension: match[1] };
}

function isSitePhone(phone: string): boolean {
  const digits = phoneDigits(splitExtension(phone).base);
  return digits === SITE_PHONE_DIGITS || digits === `1${SITE_PHONE_DIGITS}`;
}

/** Trimmed listing phone, or null when the listing has no number of its own. */
export function listingPhone(phone: string | null | undefined): string | null {
  if (typeof phone !== 'string') return null;
  const trimmed = phone.trim();
  if (!trimmed || isSitePhone(trimmed)) return null;
  return trimmed;
}

/**
 * tel: href in E.164. A 10-digit North American number becomes +1.
 * Null when the listing has no dialable phone of its own.
 */
export function listingTelHref(phone: string | null | undefined): string | null {
  const display = listingPhone(phone);
  if (!display) return null;
  const { base, extension } = splitExtension(display);
  let digits = base.replace(/\D/g, '');
  if (digits.length === 10) digits = `1${digits}`;
  let href: string | null = null;
  if (digits.length === 11 && digits.startsWith('1')) href = `tel:+${digits}`;
  else if (base.trim().startsWith('+') && digits.length >= 8 && digits.length <= 15) {
    href = `tel:+${digits}`;
  }
  if (!href) return null;
  return extension ? `${href},${extension}` : href;
}

function withoutTelephone<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => withoutTelephone(item)) as T;
  }
  if (!value || typeof value !== 'object') return value;
  const next: Record<string, unknown> = {};
  for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
    if (key === 'telephone') continue;
    next[key] = withoutTelephone(child);
  }
  return next as T;
}

/**
 * JSON-LD telephone comes only from the listing's own phone.
 * Stored schema_json cannot keep a different number. Omitted when the listing has none.
 */
export function withListingTelephone<T extends Record<string, unknown>>(
  schema: T,
  phone: string | null | undefined,
): T {
  const next = withoutTelephone(schema) as Record<string, unknown>;
  const display = listingPhone(phone);
  if (display) next.telephone = display;
  return next as T;
}
