# Best Sea to Sky — Project Manifest

**Last updated:** 2026-02-15
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
│   ├── sitemap.ts              # Dynamic XML sitemap for all listings
│   ├── robots.ts               # Robots.txt config
│   ├── not-found.tsx           # Custom 404 page
│   ├── [category]/
│   │   ├── page.tsx            # Category listing page (eat, stay, play, etc.)
│   │   ├── FilterBar.tsx       # Client-side town + tag filtering
│   │   └── [slug]/
│   │       └── page.tsx        # Individual listing detail page
│   └── api/
│       └── search/
│           └── route.ts        # GET /api/search?q= — name search endpoint
├── components/
│   ├── Header.tsx              # Sticky nav with category links
│   ├── Footer.tsx              # Organized footer with curated links
│   ├── SearchBar.tsx           # Debounced live search (client component)
│   └── ListingCard.tsx         # Listing preview card with image/gradient
├── lib/
│   ├── supabase.ts             # Supabase client + type definitions
│   └── data.ts                 # Data fetching functions (getListings, etc.)
└── middleware.ts               # Domain redirect (→ bestseatosky.com)
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

---

## Key Features

- **859 listings** scraped via Apify from Google Places
- **706 listings** have Google Places photos (lh3.googleusercontent.com)
- **Live search** on homepage (debounced, searches by name)
- **Filtering** on category pages (by town, by tag)
- **SEO:** dynamic sitemap, robots.txt, JSON-LD schema markup, meta tags
- **Image fallback:** gradient + emoji when no photo available

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
