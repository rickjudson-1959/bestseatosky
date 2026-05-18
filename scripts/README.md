# Scripts

One-off maintenance scripts. Run from your laptop, not Vercel.

## `generate-listing-faqs.mjs`

Generates 3–5 FAQs per published listing via the Anthropic API and writes
them to `listings.faq_json`. The site already renders FAQ accordions and
FAQPage JSON-LD anywhere `faq_json` is populated.

### One-time setup

1. Install local dev deps (you don't need a long-running `npm install` —
   just enough to bring in `@anthropic-ai/sdk` alongside the existing
   `@supabase/supabase-js`):
   ```sh
   npm install
   ```
2. Create `.env.local` in the repo root with:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...   # service role, not anon
   ANTHROPIC_API_KEY=sk-ant-...
   # optional override:
   # ANTHROPIC_MODEL=claude-sonnet-4-6
   ```
   The service role key bypasses RLS — keep it out of git. `.env.local`
   is already ignored.

### Running

```sh
# Generate FAQs for every listing missing faq_json (~850 rows).
# Budget ~$1–3 in API tokens with the default Haiku model.
npm run faqs

# Test against a small batch first:
npm run faqs -- --limit 5

# One specific listing:
npm run faqs -- --slug fergies-cafe

# A single category:
npm run faqs -- --category eat --limit 10

# Print results without writing:
npm run faqs -- --slug fergies-cafe --dry-run

# Force regeneration over existing FAQs:
npm run faqs -- --regenerate --slug fergies-cafe
```

Re-run if it fails partway — by default it only touches listings whose
`faq_json` is still `NULL`, so it's resumable.
