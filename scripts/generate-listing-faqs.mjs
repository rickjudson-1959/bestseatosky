#!/usr/bin/env node
/**
 * Generate 3-5 FAQs for every published listing that doesn't have faq_json
 * yet, using the Anthropic API, and write them back to the listings table.
 *
 * Run locally — DO NOT run on Vercel. Requires:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY   (service role; anon won't pass RLS for update)
 *   ANTHROPIC_API_KEY
 *
 * Usage:
 *   node scripts/generate-listing-faqs.mjs
 *   node scripts/generate-listing-faqs.mjs --limit 25         # only 25 rows
 *   node scripts/generate-listing-faqs.mjs --category eat     # filter
 *   node scripts/generate-listing-faqs.mjs --slug fergies-cafe
 *   node scripts/generate-listing-faqs.mjs --regenerate       # overwrite existing faq_json
 *   node scripts/generate-listing-faqs.mjs --dry-run          # print, don't write
 */

import { createClient } from '@supabase/supabase-js';
import Anthropic from '@anthropic-ai/sdk';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5';

if (!SUPABASE_URL || !SERVICE_ROLE_KEY || !ANTHROPIC_API_KEY) {
  console.error(
    'Missing env vars. Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ANTHROPIC_API_KEY',
  );
  process.exit(1);
}

assertServiceRoleKey(SERVICE_ROLE_KEY);

function assertServiceRoleKey(key) {
  if (key.startsWith('sb_secret_')) return;
  if (key.startsWith('sb_publishable_')) {
    console.error(
      'SUPABASE_SERVICE_ROLE_KEY is a publishable key. Use the secret key (sb_secret_...) from Supabase → Project Settings → API. Aborting.',
    );
    process.exit(1);
  }
  try {
    const payload = JSON.parse(Buffer.from(key.split('.')[1], 'base64url').toString());
    if (payload.role === 'service_role') return;
    console.error(
      `SUPABASE_SERVICE_ROLE_KEY has role="${payload.role}". The script needs the service_role key. Aborting.`,
    );
    process.exit(1);
  } catch {
    console.error('SUPABASE_SERVICE_ROLE_KEY is not a recognized format (expected sb_secret_* or a JWT). Aborting.');
    process.exit(1);
  }
}

function parseArgs(argv) {
  const args = { limit: null, category: null, slug: null, regenerate: false, dryRun: false };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--regenerate') args.regenerate = true;
    else if (a === '--dry-run') args.dryRun = true;
    else if (a === '--limit') args.limit = Number(argv[++i]);
    else if (a === '--category') args.category = argv[++i];
    else if (a === '--slug') args.slug = argv[++i];
    else console.warn('Unknown arg:', a);
  }
  return args;
}

const args = parseArgs(process.argv);
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You write short, useful FAQs for a local-business directory called Best Sea to Sky covering Squamish, Whistler, and Pemberton in British Columbia.

Given the business info, produce 3-5 frequently asked questions that a real visitor would ask before visiting. Focus on practical info: parking, reservations, kid/dog friendliness, hours, dress code, what to order/do, accessibility, payment, seasonality. Avoid generic filler.

Return STRICT JSON only, no prose, no markdown fences. Schema:
[{"question":"...","answer":"..."}, ...]

Rules:
- 3 to 5 items.
- Each answer 1-3 sentences, plain text (no markdown).
- Tailored to the actual business — never invent specific facts (phone numbers, prices, dietary policies) that aren't supported by the provided info. If unknown, phrase generally ("Most parties of 6+ should call ahead.").
- Do not include the business name in every question — vary phrasing.
- No emojis.`;

async function generateFaqs(listing) {
  const town = listing.towns?.name || 'the Sea to Sky corridor';
  const category = listing.categories?.name || 'business';
  const desc = (listing.description || listing.short_description || '').replace(/<[^>]+>/g, ' ').slice(0, 1500);

  const userPrompt = `Business name: ${listing.name}
Category: ${category}
Town: ${town}
Address: ${listing.address || 'unknown'}
Price level: ${listing.price_level ?? 'unknown'}
Google rating: ${listing.google_rating ?? 'n/a'} (${listing.google_review_count ?? 0} reviews)
Description: ${desc || '(no description)'}

Return strict JSON FAQ array now.`;

  const res = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 800,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userPrompt }],
  });

  const text = res.content.map((b) => (b.type === 'text' ? b.text : '')).join('').trim();
  const cleaned = text.replace(/^```json\s*/i, '').replace(/^```\s*/, '').replace(/```\s*$/, '').trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error(`Model returned non-JSON: ${text.slice(0, 200)}`);
  }
  if (!Array.isArray(parsed)) throw new Error('FAQ output was not an array.');
  const cleanItems = parsed
    .filter((x) => x && typeof x.question === 'string' && typeof x.answer === 'string')
    .map((x) => ({ question: x.question.trim(), answer: x.answer.trim() }));
  if (cleanItems.length < 3) throw new Error(`Only got ${cleanItems.length} FAQs.`);
  return cleanItems.slice(0, 5);
}

async function fetchTargets() {
  let q = supabase
    .from('listings')
    .select('id, slug, name, description, short_description, address, price_level, google_rating, google_review_count, faq_json, category_id, town_id, categories(name, slug), towns(name)')
    .eq('status', 'published');

  if (!args.regenerate) q = q.is('faq_json', null);
  if (args.slug) q = q.eq('slug', args.slug);
  if (args.limit) q = q.limit(args.limit);

  const { data, error } = await q;
  if (error) throw error;

  if (args.category) {
    return (data || []).filter((l) => l.categories?.slug === args.category);
  }
  return data || [];
}

async function main() {
  const targets = await fetchTargets();
  console.log(`Found ${targets.length} listing(s) to process.`);
  if (targets.length === 0) return;

  let ok = 0;
  let fail = 0;
  for (const listing of targets) {
    process.stdout.write(`• ${listing.name} (${listing.slug}) … `);
    try {
      const faqs = await generateFaqs(listing);
      if (args.dryRun) {
        console.log(`[dry-run] ${faqs.length} FAQs`);
        console.log(JSON.stringify(faqs, null, 2));
      } else {
        const { error } = await supabase
          .from('listings')
          .update({ faq_json: faqs })
          .eq('id', listing.id);
        if (error) throw error;
        console.log(`✓ ${faqs.length} FAQs saved`);
      }
      ok++;
    } catch (e) {
      console.log(`✗ ${e.message}`);
      fail++;
    }
  }
  console.log(`\nDone. ${ok} succeeded, ${fail} failed.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
