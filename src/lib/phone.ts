/** Trimmed listing phone, or null when the listing has no number. */
export function listingPhone(phone: string | null | undefined): string | null {
  if (typeof phone !== 'string') return null;
  const trimmed = phone.trim();
  return trimmed ? trimmed : null;
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
