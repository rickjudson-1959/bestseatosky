import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  CONSENT_TEXT_V1,
  CONSENT_VERSION,
  consentIp,
  consentNoticeParts,
  consentSourceUrl,
  isMissingConsentColumnError,
} from './consent.ts';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '../..');

test('consent constant contains the mailing address and Unsubscribe', () => {
  assert.equal(CONSENT_VERSION, '2026-11-v1');
  assert.match(CONSENT_TEXT_V1, /Best Sea to Sky/);
  assert.match(CONSENT_TEXT_V1, /1365 Victoria St\., Squamish, BC V8B 1E5/);
  assert.match(CONSENT_TEXT_V1, /Unsubscribe/);
  assert.match(CONSENT_TEXT_V1, /ongoing/);
  assert.match(CONSENT_TEXT_V1, /weekend newsletter/);
  assert.equal(CONSENT_TEXT_V1.endsWith('Privacy policy'), true);
  assert.equal(CONSENT_TEXT_V1.includes('\u2014'), false);
  assert.equal(CONSENT_TEXT_V1.includes('\u2013'), false);
  assert.equal(CONSENT_TEXT_V1.includes('778-770-2931'), false);
  assert.equal(/cheakamus/i.test(CONSENT_TEXT_V1), false);
});

test('consent notice keeps the stored sentence and links the privacy label', () => {
  const parts = consentNoticeParts();
  assert.equal(`${parts.before}${parts.label}${parts.after}`, CONSENT_TEXT_V1);
  assert.equal(parts.label, 'Privacy policy');
});

test('missing consent columns are detected without treating other errors as missing', () => {
  assert.equal(isMissingConsentColumnError({ code: 'PGRST204', message: 'schema cache' }), true);
  assert.equal(
    isMissingConsentColumnError({
      code: '42703',
      message: 'column "consent_text" of relation "subscribers" does not exist',
    }),
    true,
  );
  assert.equal(isMissingConsentColumnError({ code: '23505', message: 'duplicate key' }), false);
  assert.equal(isMissingConsentColumnError(null), false);
});

test('source URL prefers the form page and falls back to Referer', () => {
  assert.equal(
    consentSourceUrl('https://bestseatosky.com/weekend', 'https://bestseatosky.com/'),
    'https://bestseatosky.com/weekend',
  );
  assert.equal(
    consentSourceUrl('javascript:alert(1)', 'https://bestseatosky.com/ski-season'),
    'https://bestseatosky.com/ski-season',
  );
  assert.equal(consentSourceUrl('', null), null);
});

test('IP is the first forwarded address, then x-real-ip', () => {
  assert.equal(consentIp('203.0.113.8, 10.0.0.1', '198.51.100.4'), '203.0.113.8');
  assert.equal(consentIp(null, '198.51.100.4'), '198.51.100.4');
  assert.equal(consentIp('not an ip', null), null);
});

test('signup form, subscribe API, and privacy policy share the consent facts', () => {
  const form = fs.readFileSync(path.join(root, 'src/components/NewsletterSignup.tsx'), 'utf8');
  const route = fs.readFileSync(path.join(root, 'src/app/api/subscribe/route.ts'), 'utf8');
  const privacy = fs.readFileSync(path.join(root, 'src/app/privacy/page.tsx'), 'utf8');

  assert.match(form, /CONSENT_TEXT_V1/);
  assert.match(form, /href="\/privacy"/);
  assert.equal(form.includes('type="checkbox"'), false);
  assert.equal((form.match(/<ConsentNotice/g) || []).length, 2);

  assert.match(route, /CONSENT_TEXT_V1/);
  assert.match(route, /CONSENT_VERSION/);
  assert.match(route, /consent_text/);
  assert.match(route, /consent_version/);
  assert.match(route, /source_url/);
  assert.match(route, /consent_at/);
  assert.match(route, /x-forwarded-for/);
  assert.match(route, /x-real-ip/);
  assert.match(route, /isMissingConsentColumnError/);

  const sectionStart = privacy.indexOf('Newsletter and email');
  assert.notEqual(sectionStart, -1);
  const section = privacy.slice(sectionStart, privacy.indexOf('How We Use Your Information', sectionStart));
  assert.match(section, /1365 Victoria St\., Squamish, BC V8B 1E5/);
  assert.match(section, /Brevo/);
  assert.match(section, /hello@bestseatosky\.com/);
  assert.match(section, /10 business days/);
  assert.match(privacy, /<strong>Effective date:<\/strong> November 11, 2026/);
  assert.equal(section.includes('\u2014'), false);
  assert.equal(section.includes('778-770-2931'), false);
  assert.equal(/cheakamus/i.test(section), false);
});
