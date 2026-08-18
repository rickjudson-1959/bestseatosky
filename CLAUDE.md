# Best Sea to Sky — Claude Code Context

## Project

Local directory site for the Sea to Sky corridor (Squamish, Whistler, Pemberton). Next.js 16 + Supabase + Tailwind CSS v4 on Vercel.

See `src/PROJECT_MANIFEST.md` for full architecture, file structure, database schema, and feature list.

## Quick Reference

- **Live site:** https://bestseatosky.com
- **Repo:** https://github.com/rickjudson-1959/bestseatosky
- **Hosting:** Vercel (auto-deploy from `main`)
- **Database:** Supabase (PostgreSQL) — no local env vars, managed via Vercel env
- **No local node_modules** — build/deploy happens on Vercel

## Key Patterns

- **Listings are database-driven.** All listing data (name, description, meta, images, FAQs) lives in Supabase `listings` table. Content changes to individual listings require Supabase SQL/dashboard updates, not code changes.
- **Dynamic routes:** `[category]/page.tsx` for category pages, `[category]/[slug]/page.tsx` for listing detail pages.
- **Static routes override dynamic.** Town guides at `eat/squamish/`, `eat/whistler/`, `eat/pemberton/` take precedence over `[category]/[slug]`.
- **Shared components:** `TagFilterGrid` (tag-only filter + grid), `FallbackImage` (graceful image error handling), `FaqSection` (accordion FAQ), `AffiliateCard` (product callout with nofollow/sponsored links), `NewsletterSignup`, `TrustStrip`.
- **Description field supports HTML.** Listing descriptions render via `dangerouslySetInnerHTML` — admin-controlled content only.
- **FAQ support on listings.** Add `faq_json` (jsonb) to a listing record to render accordion + FAQPage schema. Format: `[{"question":"...","answer":"..."}]`.
- **Category-specific overrides** in shared templates use `categorySlug === 'eat'` conditionals (meta title, H1, internal links).
- **Affiliate cards** use slug-based conditionals. Guide pages match `slug.startsWith('best-hikes')`, `slug.startsWith('best-rock-climbing')`, etc. Blog posts use `getBlogAffiliateCards(slug)` with pattern matching (max 2 per post). All links use `rel="nofollow sponsored"`.

## Style

- Fonts: DM Serif Display (headings), Source Sans 3 (body)
- Color scheme per category (eat=orange/red, stay=indigo/purple, play=emerald/green, etc.)
- Warm local voice — "we live here" tone, not corporate
- Tailwind utility classes, no CSS modules

## Deploy

Push to `main` and Vercel auto-deploys. No CI beyond Vercel's build step. No local build tools needed.

## Folder Map (consolidated 2026-08-18)

`/Users/richardsjudson/bestseatosky` is the **single** local copy of this
project — a former duplicate clone at `~/Documents/bestseatosky` was deleted.
If you ever see a reference to that path, it's stale.

- **`marketing/`** — brand book, voice/content-strategy rules, and dated
  drafts. Git-tracked. This is what the scheduled content-drafting routine
  ("Best Sea to Sky - Content Drafts," Tue/Fri) reads and writes to.
- **`carousel-photos/`, `carousel-slides/`** — Rick's real photo/video
  library, organized by town. Gitignored (local-only, not deployed).
- **`archive/`** — old working files consolidated from `~/Documents` on
  2026-08-18 (media kit, campaign plan, past blog SQL, past FB post folders).
  Gitignored, reference-only, not live code. See `archive/README.md` before
  touching anything in there — in particular, never add a `CLAUDE.md` or
  `.claude/` folder inside `archive/`, since Claude Code would auto-load it
  and silently override these instructions.
