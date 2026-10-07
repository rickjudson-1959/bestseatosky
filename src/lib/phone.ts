/** Digits for the Best Sea to Sky business line. Never a listing's phone. */
const SITE_PHONE_DIGITS = '7787702931';

function phoneDigits(phone: string): string {
  return phone.replace(/\D/g, '');
}

function isSitePhone(phone: string): boolean {
  const digits = phoneDigits(phone);
  return digits === SITE_PHONE_DIGITS || digits === `1${SITE_PHONE_DIGITS}`;
}

/** Trimmed listing phone, or null when the listing has no number of its own. */
export function listingPhone(phone: string | null | undefined): string | null {
  if (typeof phone !== 'string') return null;
  const trimmed = phone.trim();
  if (!trimmed || isSitePhone(trimmed)) return null;
  return trimmed;
}

/** tel: href for a listing's own phone. Null when there is nothing to dial. */
export function listingTelHref(phone: string | null | undefined): string | null {
  const display = listingPhone(phone);
  if (!display) return null;
  const hasPlus = display.startsWith('+');
  const digits = display.replace(/\D/g, '');
  if (!digits) return null;
  return hasPlus ? `tel:+${digits}` : `tel:${digits}`;
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
