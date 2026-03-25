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
- **Shared components:** `TagFilterGrid` (tag-only filter + grid), `FallbackImage` (graceful image error handling), `FaqSection` (accordion FAQ), `NewsletterSignup`, `TrustStrip`.
- **Description field supports HTML.** Listing descriptions render via `dangerouslySetInnerHTML` — admin-controlled content only.
- **FAQ support on listings.** Add `faq_json` (jsonb) to a listing record to render accordion + FAQPage schema. Format: `[{"question":"...","answer":"..."}]`.
- **Category-specific overrides** in shared templates use `categorySlug === 'eat'` conditionals (meta title, H1, internal links).

## Style

- Fonts: DM Serif Display (headings), Source Sans 3 (body)
- Color scheme per category (eat=orange/red, stay=indigo/purple, play=emerald/green, etc.)
- Warm local voice — "we live here" tone, not corporate
- Tailwind utility classes, no CSS modules

## Deploy

Push to `main` and Vercel auto-deploys. No CI beyond Vercel's build step. No local build tools needed.
