/** Shared signup consent wording. The form renders this string and the API stores it. */
export const CONSENT_VERSION = '2026-11-v1';

export const CONSENT_TEXT_V1 =
  'By signing up you agree to get the ongoing Best Sea to Sky weekend newsletter and occasional local picks by email. Unsubscribe anytime. Best Sea to Sky, 1365 Victoria St., Squamish, BC V8B 1E5. Privacy policy';

const PRIVACY_LABEL = 'Privacy policy';

export function consentNoticeParts(text: string = CONSENT_TEXT_V1): {
  before: string;
  label: string;
  after: string;
} {
  const index = text.lastIndexOf(PRIVACY_LABEL);
  if (index === -1) {
    return { before: text, label: PRIVACY_LABEL, after: '' };
  }
  return {
    before: text.slice(0, index),
    label: PRIVACY_LABEL,
    after: text.slice(index + PRIVACY_LABEL.length),
  };
}

type ColumnError = {
  code?: string | null;
  message?: string | null;
} | null;

/** True when PostgREST or Postgres rejected the insert because a column is not there yet. */
export function isMissingConsentColumnError(error: ColumnError): boolean {
  if (!error) return false;
  if (error.code === 'PGRST204' || error.code === '42703') return true;
  const message = error.message ?? '';
  return /schema cache/i.test(message) || /column .+ does not exist/i.test(message);
}

function pageUrl(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > 2000) return null;
  try {
    const url = new URL(trimmed);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
    return trimmed;
  } catch {
    return null;
  }
}

/** Page URL from the form, then the Referer header. */
export function consentSourceUrl(bodyUrl: unknown, referer: string | null): string | null {
  return pageUrl(bodyUrl) ?? pageUrl(referer);
}

/** Client IP from x-forwarded-for, then x-real-ip. */
export function consentIp(forwardedFor: string | null, realIp: string | null): string | null {
  const forwarded = forwardedFor?.split(',')[0]?.trim() ?? '';
  const candidate = forwarded || realIp?.trim() || '';
  if (!candidate || candidate.length > 64) return null;
  if (!/^[0-9a-fA-F:.]+$/.test(candidate)) return null;
  return candidate;
}

export function consentUserAgent(value: string | null): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, 512);
}
