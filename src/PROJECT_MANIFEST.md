# Best Sea to Sky — Project Manifest

**Last updated:** 2026-02-16
**Live URL:** https://bestseatosky.com
**Repo:** https://github.com/rickjudson-1959/bestseatosky
**Hosting:** Vercel (auto-deploy from `main`)
**Database:** Supabase (ntbedmwekuzpsvqubadb)

---

## Stack

- **Framework:** Next.js 16.1.6 (App Router, Turbopack)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4
- **Database:** Supabase (PostgreSQL)
- **Fonts:** DM Serif Display (headings), Source Sans 3 (body)
- **React Compiler:** Enabled

---

## Domains

| Domain | Role |
|--------|------|
| bestseatosky.com | Primary (canonical) |
| www.bestseatosky.com | 301 → bestseatosky.com |
| bestseatosky.ca | 301 → bestseatosky.com |
| www.bestseatosky.ca | 301 → bestseatosky.com |

Domain redirects handled by `src/middleware.ts` + `vercel.json`.

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (Header, Footer, fonts, meta)
│   ├── page.tsx                # Homepage (hero, search, featured, categories)
│   ├── globals.css             # Tailwind imports, custom scrollbar, utilities
│   ├── sitemap.ts              # Dynamic XML sitemap (listings, guides, blog)
│   ├── robots.ts               # Robots.txt config
│   ├── not-found.tsx           # Custom 404 page
│   ├── [category]/
│   │   ├── page.tsx            # Category listing page (eat, stay, play, etc.)
│   │   ├── FilterBar.tsx       # Client-side town + tag filtering
│   │   └── [slug]/
│   │       └── page.tsx        # Listing detail (OG tags, related, cross-category, claim link)
│   ├── blog/
│   │   ├── page.tsx            # Blog index (post cards with title, excerpt, date)
│   │   └── [slug]/
│   │       └── page.tsx        # Blog post (HTML content, OG tags, Article schema)
│   ├── guide/
│   │   ├── page.tsx            # Guide landing page (all guides grouped by category)
│   │   └── [slug]/
│   │       └── page.tsx        # SEO guide page (ranked listings, OG tags)
│   └── api/
│       └── search/
│           └── route.ts        # GET /api/search?q= — name search endpoint
├── components/
│   ├── Header.tsx              # Sticky nav with category links, Guides, Blog
│   ├── Footer.tsx              # Footer with curated links, guides, mailto contact
│   ├── SearchBar.tsx           # Debounced live search (client component)
│   └── ListingCard.tsx         # Listing preview card with image/gradient
├── lib/
│   ├── supabase.ts             # Supabase client + type definitions
│   └── data.ts                 # Data fetching functions
├── middleware.ts               # Domain redirect (→ bestseatosky.com)
└── PROJECT_MANIFEST.md         # This file

public/
├── og-default.svg              # OG image source (1200x630, dark green)
└── og-default.png              # OG image for social sharing (converted from SVG)
```

---

## Database Schema (Supabase)

### Tables

| Table | Key Columns |
|-------|-------------|
| **categories** | id, slug, name, description, icon, display_order |
| **towns** | id, slug, name, description, latitude, longitude, display_order |
| **tags** | id, slug, name, category_id |
| **listings** | id, slug, name, description, short_description, category_id, town_id, address, phone, email, website, hours, price_level, google_rating, google_review_count, google_place_id, featured_image_url, images, featured, status, meta_title, meta_description, schema_type, schema_json |
| **listing_tags** | listing_id, tag_id (junction table) |
| **seo_pages** | id, slug, title, meta_description, h1_text, intro_content, category_id, tag_id, town_id, schema_json, canonical_url, status |
| **blog_posts** | id, slug, title, meta_description, featured_image, excerpt, content, author, status, published_at |

### Categories

eat, stay, play, visit, shop, services

### Towns

squamish, whistler, pemberton, britannia-beach, lions-bay, furry-creek

---

## Data Functions (`src/lib/data.ts`)

| Function | Returns | Used By |
|----------|---------|---------|
| `getCategories()` | Category[] | Homepage, nav |
| `getTowns()` | Town[] | FilterBar |
| `getTagsByCategory(id)` | Tag[] | FilterBar |
| `getCategoryBySlug(slug)` | Category \| null | Category pages |
| `getListings(options?)` | Listing[] | Homepage, category pages |
| `getListingBySlug(slug)` | Listing \| null | Detail pages |
| `getListingCount(slug?)` | number | Category pages |
| `getAllSeoPages()` | SeoPage[] (with categories) | Guide landing page |
| `getSeoPageBySlug(slug)` | SeoPage \| null | Guide pages |
| `getRelatedListings(id, townId, catId)` | Listing[] | Detail page ("More in [Town]") |
| `getCrossCategoryListings(id, townId, catId)` | Listing[] | Detail page ("You Might Also Like") |
| `getGuideListings(page)` | Listing[] | Guide pages |
| `getBlogPosts()` | BlogPost[] | Blog index |
| `getBlogPostBySlug(slug)` | BlogPost \| null | Blog post page |

---

## Key Features

- **859 listings** scraped via Apify from Google Places
- **809 listings** have Google Places photos (lh3.googleusercontent.com)
- **859 AI-generated descriptions** via Claude Sonnet (unique, SEO-optimized, 2-3 sentences each)
- **Live search** on homepage (debounced, searches by name)
- **Filtering** on category pages (by town, by tag)
- **Guide landing page** at `/guide` — all published guides grouped by category
- **Blog** at `/blog` — index page + individual post pages with HTML content, Article schema, OG tags
- **SEO guide pages** at `/guide/[slug]` — ranked lists from seo_pages table
- **Related listings** on detail pages: "More in [Town]" (4, same category) + "You Might Also Like" (3, different category)
- **Enhanced Schema.org JSON-LD** on detail pages: full PostalAddress (locality, BC, CA), canonical url, sameAs, image
- **Open Graph & Twitter cards** on listing detail pages (title, description, image, canonical url) and guide pages (default OG image at `public/og-default.png`)
- **Claim your listing** — "Is this your business?" mailto link on listing sidebar (hello@bestseatosky.com)
- **SEO:** dynamic sitemap, robots.txt, JSON-LD schema markup, meta tags
- **Image fallback:** gradient + emoji when no photo available

---

## Guide Pages (`/guide` and `/guide/[slug]`)

### Landing Page (`/guide`)
- Shows all published seo_pages as cards grouped by category
- Cards display h1_text, meta_description, and link to the full guide
- Category section headers with colored accents (Eat, Stay, Play, Visit)
- "Guides" link in main header nav

### Individual Guide Pages (`/guide/[slug]`)
Driven by the `seo_pages` table. Each guide page:
- Filters listings by category_id, town_id, and/or tag_id
- Displays top 15 listings ranked by google_rating + google_review_count
- Includes numbered list with photos, ratings, descriptions, addresses
- Schema.org ItemList JSON-LD markup
- Breadcrumb navigation

Key guides linked from footer:
- `/guide/best-restaurants-squamish`
- `/guide/best-hikes-squamish`
- `/guide/best-hotels-whistler`
- `/guide/things-to-do-whistler`

---

## Category Color Scheme

| Category | Gradient |
|----------|----------|
| eat | orange → red |
| stay | indigo → purple |
| play | emerald → green |
| visit | pink → rose |
| shop | amber → red |
| services | sky → indigo |

---

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public API key |

Set in both `.env.local` (local) and Vercel dashboard (production/preview/development).

---

## Scripts

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## External Tools

| Tool | Purpose |
|------|---------|
| **Apify** | Google Places scraper for listing data |
| **Google Places API (New)** | Photo fetching (via fetch-photos.js in bestseatosky-files) |
| **Namecheap** | Domain registrar for .com and .ca |
| **Vercel** | Hosting, auto-deploy from GitHub |
| **Supabase** | Database, API, auth (PostgreSQL) |

---

## Deployment

Push to `main` → Vercel auto-deploys to production. No CI/CD pipeline beyond Vercel's built-in build step.
