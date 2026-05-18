#!/usr/bin/env node
/**
 * Detect which of the 9 canonical features apply to each published listing
 * (using listing name, description, tags, and any saved Google data via
 * Anthropic) and upsert rows into the listing_features table.
 *
 * Run locally — DO NOT run on Vercel. Requires:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY   (service role; anon won't pass RLS for writes)
 *   ANTHROPIC_API_KEY
 *
 * Resumable: by default skips listings that already have any
 * listing_features row. Pass --regenerate to wipe & rebuild for the
 * targeted listings.
 *
 * Usage:
 *   node scripts/generate-listing-features.mjs
 *   node scripts/generate-listing-features.mjs --limit 25
 *   node scripts/generate-listing-features.mjs --category eat
 *   node scripts/generate-listing-features.mjs --slug fergies-cafe
 *   node scripts/generate-listing-features.mjs --regenerate --slug fergies-cafe
 *   node scripts/generate-listing-features.mjs --dry-run --limit 5
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
  // New-style Supabase API keys: sb_secret_* (service role) / sb_publishable_* (anon).
  if (key.startsWith('sb_secret_')) return;
  if (key.startsWith('sb_publishable_')) {
    console.error(
      'SUPABASE_SERVICE_ROLE_KEY is a publishable key. Use the secret key (sb_secret_...) from Supabase → Project Settings → API. Aborting.',
    );
    process.exit(1);
  }
  // Legacy JWT-style keys.
  try {
    const payload = JSON.parse(Buffer.from(key.split('.')[1], 'base64url').toString());
    if (payload.role === 'service_role') return;
    console.error(
      `SUPABASE_SERVICE_ROLE_KEY has role="${payload.role}". The script needs the service_role key (Supabase → Project Settings → API). Aborting.`,
    );
    process.exit(1);
  } catch {
    console.error('SUPABASE_SERVICE_ROLE_KEY is not a recognized format (expected sb_secret_* or a JWT). Aborting.');
    process.exit(1);
  }
}

const FEATURES = [
  { slug: 'kid-friendly', name: 'Kid friendly' },
  { slug: 'dog-friendly', name: 'Dog friendly' },
  { slug: 'outdoor-seating', name: 'Outdoor seating' },
  { slug: 'wheelchair-accessible', name: 'Wheelchair accessible' },
  { slug: 'free-parking', name: 'Free parking' },
  { slug: 'wifi', name: 'Wi-Fi' },
  { slug: 'takeout', name: 'Takeout' },
  { slug: 'delivery', name: 'Delivery' },
  { slug: 'reservations-required', name: 'Reservations required' },
];
const FEATURE_NAME_BY_SLUG = Object.fromEntries(FEATURES.map((f) => [f.slug, f.name]));
const FEATURE_SLUGS = FEATURES.map((f) => f.slug);

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

const SYSTEM_PROMPT = `You analyze a local business listing from Best Sea to Sky (a Squamish/Whistler/Pemberton directory in British Columbia) and decide which of a fixed list of features apply.

Two kinds of evidence are acceptable:
  STRONG  — the listing text or tags explicitly mention or strongly imply the feature.
  TYPICAL — the feature is overwhelmingly typical for a business of this category/style (use sparingly, only when there is essentially no doubt).

Per-feature guidance:

- "outdoor-seating": STRONG only — patio, deck, terrace, beer garden, garden seating, outdoor seating, alfresco, rooftop, sidewalk seating. Do not infer from "summer destination" or generic mountain scenery.

- "kid-friendly": STRONG only — family, kids menu, child-friendly, playground, family restaurant. Casual cafes and bakeries DO NOT default to kid-friendly. Fine-dining and bars are never kid-friendly without explicit support.

- "dog-friendly": STRONG only — dogs welcome, pet-friendly, dog-friendly patio. Do not assume.

- "wheelchair-accessible": STRONG only — step-free, accessible entrance, wheelchair accessible, ramp. Do not assume.

- "free-parking": STRONG only — free parking, complimentary parking, ample parking, large parking lot. In Whistler Village, paid parking is the norm — do NOT assert free-parking unless it's stated.

- "wifi": TYPICAL is acceptable for: cafes/coffee shops/cafés, casual restaurants, hotels/lodges, breweries, bakeries with seating. NOT typical for: takeout windows, food trucks, fast-food chains, fine-dining-only spots, retail without seating.

- "takeout": TYPICAL is acceptable for: cafes/coffee shops/bakeries, casual restaurants, pizzerias, fast-casual spots, breweries with food, asian quick-service. NOT typical for: fine-dining tasting menus, sit-down-only bars without a kitchen, hotels.

- "delivery": STRONG only — delivery, Uber Eats, DoorDash, SkipTheDishes, in-house delivery. Do not assume just because takeout exists.

- "reservations-required": STRONG only — reservations required, by reservation only, must book ahead, prix-fixe by reservation. DO NOT use for places that merely "accept reservations" or "recommend reservations."

Return STRICT JSON, no prose, no markdown fences, in this exact shape:
{"features": ["slug1", "slug2", ...]}

Where each slug is one of:
  kid-friendly, dog-friendly, outdoor-seating, wheelchair-accessible,
  free-parking, wifi, takeout, delivery, reservations-required.

If none apply, return {"features": []}.`;

function buildPrompt(listing) {
  const town = listing.towns?.name || 'the Sea to Sky corridor';
  const category = listing.categories?.name || 'business';
  const tagNames = (listing.listing_tags || [])
    .map((lt) => lt?.tags?.name)
    .filter(Boolean)
    .join(', ');
  const desc = (listing.description || listing.short_description || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .slice(0, 2000);

  return `Business name: ${listing.name}
Category: ${category}
Town: ${town}
Tags: ${tagNames || '(none)'}
Address: ${listing.address || 'unknown'}
Description: ${desc || '(no description)'}

Which features apply? Return strict JSON now.`;
}

async function detectFeatures(listing) {
  const res = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 200,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: buildPrompt(listing) }],
  });

  const text = res.content.map((b) => (b.type === 'text' ? b.text : '')).join('').trim();
  const cleaned = text.replace(/^```json\s*/i, '').replace(/^```\s*/, '').replace(/```\s*$/, '').trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error(`Model returned non-JSON: ${text.slice(0, 200)}`);
  }
  if (!parsed || !Array.isArray(parsed.features)) {
    throw new Error(`Output missing "features" array: ${text.slice(0, 200)}`);
  }
  return [...new Set(parsed.features)]
    .filter((s) => typeof s === 'string')
    .map((s) => s.trim().toLowerCase())
    .filter((s) => FEATURE_SLUGS.includes(s));
}

async function fetchTargets() {
  let q = supabase
    .from('listings')
    .select('id, slug, name, description, short_description, address, category_id, town_id, categories(name, slug), towns(name), listing_tags(tags(name, slug))')
    .eq('status', 'published');

  if (args.slug) q = q.eq('slug', args.slug);
  if (args.limit) q = q.limit(args.limit);

  const { data, error } = await q;
  if (error) throw error;
  let rows = data || [];
  if (args.category) rows = rows.filter((l) => l.categories?.slug === args.category);
  if (rows.length === 0) return rows;

  if (args.regenerate) return rows;

  // Skip listings that already have any feature row.
  const ids = rows.map((r) => r.id);
  const { data: existing, error: exErr } = await supabase
    .from('listing_features')
    .select('listing_id')
    .in('listing_id', ids);
  if (exErr) throw exErr;
  const seen = new Set((existing || []).map((r) => r.listing_id));
  return rows.filter((r) => !seen.has(r.id));
}

async function writeFeatures(listingId, slugs) {
  if (args.regenerate) {
    const { error } = await supabase
      .from('listing_features')
      .delete()
      .eq('listing_id', listingId);
    if (error) throw error;
  }
  if (slugs.length === 0) return;

  const rows = slugs.map((slug) => ({
    listing_id: listingId,
    feature_slug: slug,
    feature_name: FEATURE_NAME_BY_SLUG[slug],
  }));
  const { error } = await supabase
    .from('listing_features')
    .upsert(rows, { onConflict: 'listing_id,feature_slug', ignoreDuplicates: true });
  if (error) throw error;
}

async function main() {
  const targets = await fetchTargets();
  console.log(`Found ${targets.length} listing(s) to process.`);
  if (targets.length === 0) return;

  let ok = 0;
  let fail = 0;
  let totalFeatures = 0;
  for (const listing of targets) {
    process.stdout.write(`• ${listing.name} (${listing.slug}) … `);
    try {
      const slugs = await detectFeatures(listing);
      totalFeatures += slugs.length;
      if (args.dryRun) {
        console.log(`[dry-run] ${slugs.length} feature(s): ${slugs.join(', ') || '(none)'}`);
      } else {
        await writeFeatures(listing.id, slugs);
        console.log(`✓ ${slugs.length} feature(s): ${slugs.join(', ') || '(none)'}`);
      }
      ok++;
    } catch (e) {
      console.log(`✗ ${e.message}`);
      fail++;
    }
  }
  console.log(`\nDone. ${ok} succeeded, ${fail} failed, ${totalFeatures} total feature rows.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
