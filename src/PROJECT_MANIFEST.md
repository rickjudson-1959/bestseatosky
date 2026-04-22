# Best Sea to Sky — Project Manifest

**Last updated:** 2026-04-14
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
- **Email:** Resend (transactional email notifications) + Brevo (subscriber list sync)
- **AI:** Anthropic Claude API (trip planner chatbot)
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
│   ├── layout.tsx              # Root layout (Header, Footer, fonts, meta, GoogleAnalytics)
│   ├── page.tsx                # Homepage (hero, search, featured, categories)
│   ├── globals.css             # Tailwind imports, custom scrollbar, utilities
│   ├── sitemap.ts              # Dynamic XML sitemap (listings, guides, blog)
│   ├── robots.ts               # Robots.txt config
│   ├── not-found.tsx           # Custom 404 page
│   ├── [category]/
│   │   ├── page.tsx            # Category listing page (eat, stay, play, etc.)
│   │   ├── FilterBar.tsx       # Client-side town + tag filtering
│   │   └── [slug]/
│   │       └── page.tsx        # Listing detail (OG tags, related, cross-category, UTM links, claim link, FAQ support)
│   ├── eat/
│   │   ├── squamish/
│   │   │   └── page.tsx        # Curated Squamish restaurant guide (top picks, best-by-category, full grid)
│   │   ├── whistler/
│   │   │   └── page.tsx        # Curated Whistler restaurant guide (top picks, best-by-category, full grid)
│   │   └── pemberton/
│   │       └── page.tsx        # Curated Pemberton restaurant guide (top picks, best-by-category, full grid)
│   ├── stay/
│   │   ├── squamish/
│   │   │   └── page.tsx        # Curated Squamish accommodation guide (areas, top picks, Trivago affiliate)
│   │   └── whistler/
│   │       └── page.tsx        # Curated Whistler accommodation guide (areas, top picks, Trivago affiliate)
│   ├── advertise/
│   │   └── page.tsx            # Advertise page (4-tier pricing cards, value props, stats)
│   ├── blog/
│   │   ├── page.tsx            # Blog index (post cards with title, excerpt, date)
│   │   └── [slug]/
│   │       └── page.tsx        # Blog post (HTML content, OG tags, Article schema)
│   ├── guide/
│   │   ├── page.tsx            # Guide landing page (all guides grouped by category)
│   │   └── [slug]/
│   │       └── page.tsx        # SEO guide page (ranked listings, OG tags)
│   ├── 48-hours-squamish/
│   │   └── page.tsx            # 48-hour Squamish itinerary (2-day timeline layout)
│   ├── best-patios/
│   │   └── page.tsx            # Best patios guide (8 ranked patios, Squamish to Pemberton)
│   ├── ski-season/
│   │   └── page.tsx            # Ski Season Survival Guide (5 sections, Whistler focus)
│   ├── neighbourhood/
│   │   ├── squamish/
│   │   │   └── page.tsx        # Downtown vs Garibaldi Highlands comparison
│   │   └── whistler/
│   │       └── page.tsx        # Village vs Creekside comparison
│   ├── chat/
│   │   └── page.tsx            # AI trip planner chatbot full page (/chat)
│   ├── local-seo-audit/
│   │   ├── page.tsx            # Free local SEO audit landing page
│   │   └── AuditForm.tsx       # SEO audit form (client component)
│   ├── get-listed/
│   │   ├── page.tsx            # Get Listed conversion page (hero, stats, testimonials, 4-tier pricing, comparison table, FAQs, form)
│   │   └── GetListedForm.tsx   # Get Listed form (client component, status states)
│   ├── about/
│   │   └── page.tsx            # About page
│   ├── why/
│   │   └── page.tsx            # Why Best Sea to Sky (competitive comparison)
│   ├── methodology/
│   │   └── page.tsx            # How We Rank (ranking methodology)
│   ├── contact/
│   │   ├── page.tsx            # Contact page (info cards + form)
│   │   └── ContactForm.tsx     # Contact form (client component, Resend email via /api/contact)
│   ├── terms/
│   │   └── page.tsx            # Terms of use page
│   ├── privacy/
│   │   └── page.tsx            # Privacy policy page
│   └── api/
│       ├── chat/
│       │   └── route.ts        # POST /api/chat — AI trip planner (Claude API, streaming responses)
│       ├── contact/
│       │   └── route.ts        # POST /api/contact — contact form submission + Resend email
│       ├── get-listed/
│       │   └── route.ts        # POST /api/get-listed — listing request + Resend email
│       ├── search/
│       │   └── route.ts        # GET /api/search?q= — name search endpoint
│       ├── seo-audit/
│       │   └── route.ts        # POST /api/seo-audit — SEO audit request, stores in Supabase, Resend notification
│       └── subscribe/
│           └── route.ts        # POST /api/subscribe — newsletter signup, Supabase subscribers table, Brevo sync, welcome email with trip planner PDF + admin notification via Resend
├── components/
│   ├── GoogleAnalytics.tsx     # GA4 client component (G-E25R61BYD9, afterInteractive)
│   ├── Header.tsx              # Sticky nav with category links, Guides, Blog, Get Listed CTA, mobile hamburger menu
│   ├── Footer.tsx              # Footer with curated links, guides, Get Listed, contact, advertise
│   ├── SearchBar.tsx           # Debounced live search (client component)
│   ├── ListingCard.tsx         # Listing preview card with image/gradient (featured badge + green border for featured)
│   ├── SocialProof.tsx         # VisitorTestimonials (full section) + TrustStrip (compact bar)
│   ├── NewsletterSignup.tsx    # Newsletter signup form (client component, default + compact variants, posts to /api/subscribe)
│   ├── ChatUI.tsx              # AI trip planner chat interface (client component, streaming)
│   ├── ChatWidget.tsx          # Floating chat widget (client component, bottom-right overlay)
│   ├── FaqSection.tsx          # Accordion FAQ component (client component, expandable Q&A)
│   ├── FallbackImage.tsx       # Image component with graceful emoji fallback on error
│   ├── TagFilterGrid.tsx       # Shared tag-only filter + listing grid (used by town guide pages)
│   ├── AffiliateCard.tsx       # Reusable affiliate product card (title, desc, linkText, linkUrl, disclaimer; rel="nofollow sponsored")
│   └── FeaturedInGuides.tsx    # "Featured in" guide links on listing detail pages (internal linking)
├── lib/
│   ├── supabase.ts             # Supabase client + type definitions (incl. ListingRequest)
│   ├── data.ts                 # Data fetching functions (incl. submitListingRequest)
│   └── utm.ts                  # buildUTMUrl() — appends UTM params to outbound links
├── middleware.ts               # Domain redirect (→ bestseatosky.com)
└── PROJECT_MANIFEST.md         # This file

public/
├── icon.svg                    # Custom SVG icon (favicon, header logo, footer logo)
├── og-default.svg              # OG image source (1200x630, dark green)
├── og-default.jpg              # OG image for social sharing (referenced by layout.tsx)
├── og-default.png              # OG image for social sharing (PNG variant)
├── downloads/
│   └── sea-to-sky-trip-planner.pdf  # Lead magnet PDF attached to welcome email
├── og-eat.jpg                  # Category OG image for Eat
├── og-stay.jpg                 # Category OG image for Stay
├── og-play.jpg                 # Category OG image for Play
├── og-visit.jpg                # Category OG image for Visit
├── og-shop.jpg                 # Category OG image for Shop
├── og-services.jpg             # Category OG image for Services
└── images/listings/            # Listing-specific images (headshots, logos, working photos)
```

---

## Database Schema (Supabase)

### Tables

| Table | Key Columns |
|-------|-------------|
| **categories** | id, slug, name, description, icon, display_order |
| **towns** | id, slug, name, description, latitude, longitude, display_order |
| **tags** | id, slug, name, category_id |
| **listings** | id, slug, name, description, short_description, category_id, town_id, address, phone, email, website, hours, price_level, google_rating, google_review_count, google_place_id, featured_image_url, images, featured, status, meta_title, meta_description, schema_type, schema_json, faq_json |
| **listing_tags** | listing_id, tag_id (junction table) |
| **seo_pages** | id, slug, title, meta_description, h1_text, intro_content, category_id, tag_id, town_id, schema_json, canonical_url, status |
| **blog_posts** | id, slug, title, meta_description, featured_image, excerpt, content, author, status, published_at |
| **listing_requests** | id, business_name, contact_name, email, phone, website, category_id (FK), town_id (FK), message, status, created_at, updated_at |
| **subscribers** | id, email (unique), source, created_at |

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
| `getGuidesForListing(catId, townId, tagIds)` | SeoPage[] | Listing detail page ("Featured in" guides) |
| `submitListingRequest(request)` | ListingRequest | Get Listed API route |

---

## Key Features

- **859 listings** scraped via Apify from Google Places
- **809 listings** have Google Places photos (lh3.googleusercontent.com)
- **859 AI-generated descriptions** via Claude Sonnet (unique, SEO-optimized, 2-3 sentences each)
- **Live search** on homepage (debounced, searches by name)
- **Filtering** on category pages (by town, by tag)
- **Guide landing page** at `/guide` — all published guides grouped by category
- **Blog** at `/blog` — index page + individual post pages with HTML content, Article schema, OG tags
- **27 SEO guide pages** at `/guide/[slug]` — ranked lists from seo_pages table
- **Related listings** on detail pages: "More in [Town]" (4, same category) + "You Might Also Like" (3, different category)
- **Enhanced Schema.org JSON-LD** on detail pages: full PostalAddress (locality, BC, CA), canonical url, sameAs, image; aggregateRating only renders when review count > 0
- **Open Graph & Twitter cards** on listing detail pages (title, description, image, canonical url) and guide pages (default OG image at `public/og-default.png`)
- **Claim your listing** — "Is this your business?" mailto link on listing sidebar (hello@bestseatosky.com)
- **Advertise page** at `/advertise` — 4-tier pricing cards (Local Starter free, Corridor Leader $49/mo, Sponsored Guide $149/mo, Local Partner $299/mo), value props, platform stats
- **Get Listed page** at `/get-listed` — full conversion landing page: hero, social proof stats, B2B testimonials, 4-tier pricing cards (Local Starter free, Corridor Leader $49/mo, Sponsored Guide $149/mo, Local Partner $299/mo), feature comparison table, FAQs, and submission form. Stripe checkout for paid tiers. Inserts into `listing_requests` table, sends email notification via Resend
- **UTM tracking** on outbound links — "Get Directions" and "Visit Website" links on listing detail pages include utm_source=bestseatosky, utm_medium=directory, utm_campaign={category}, utm_content={listing-slug}
- **Google Analytics** (G-E25R61BYD9) — loaded via GoogleAnalytics client component on all pages
- **AI trip planner** — chatbot at `/chat` + floating widget site-wide; Claude API with streaming responses, recommends listings/guides with internal links
- **Local SEO audit** at `/local-seo-audit` — free audit request form for corridor businesses, stores in Supabase, sends notification via Resend
- **Newsletter signup** — email capture with "Get the Free Guide" CTA, stores in `subscribers` table (Supabase), syncs to Brevo contact list, sends welcome email with trip planner PDF via Resend, admin notification on new subscriber; default + compact variants
- **Contact form** at `/contact` — name, email, subject, message fields with validation, sends via `/api/contact` + Resend to hello@bestseatosky.com
- **FAQ accordion** — reusable expandable Q&A component used on guide and content pages, with FAQPage schema.org markup
- **"Featured in" guides** — listing detail pages show links to guide pages that include the listing (internal linking via `getGuidesForListing`)
- **Category-specific OG images** — og-eat.jpg, og-stay.jpg, etc. for social sharing per category
- **SEO:** dynamic sitemap, robots.txt, JSON-LD schema markup, meta tags, SearchAction schema, BreadcrumbList schema
- **Mobile hamburger menu** — animated 3-bar toggle in header, full-width dropdown nav, auto-closes on link tap
- **Image fallback:** category placeholder image from Supabase Storage when no featured photo; emoji fallback if placeholder also fails. Helper: `getPlaceholderImage(categorySlug)` in `lib/supabase.ts`
- **Featured listings** — visual differentiation with emerald border, green tint, and "★ Featured" badge; sorted to top of category pages
- **Social proof** — VisitorTestimonials on homepage + guide index; TrustStrip on category pages + guide detail pages
- **Town restaurant guides** — curated `/eat/squamish`, `/eat/whistler`, `/eat/pemberton` pages with editorial top picks, best-by-category sections, and full filterable grids; linked from `/eat` page
- **Listing FAQs** — listings with `faq_json` data render accordion FAQ section + FAQPage schema markup on detail pages
- **HTML descriptions** — listing detail pages render description as HTML for rich content (bold, lists, etc.)
- **Affiliate cards** — reusable `AffiliateCard` component with `rel="nofollow sponsored"` links. Slug-based conditional rendering on guide pages (hiking→boots, climbing→gear, MTB→bike gear, skiing→ski gear, stay/hotel/accommodation/lodge→Trivago), blog posts (slug pattern matching, max 2 per post), town stay pages (Trivago), and static content pages (48-hours-squamish, ski-season). Affiliate links: hiking boots, backpacks, climbing gear, MTB gear, ski gear, Trivago hotel comparison
- **5 static content pages** — neighbourhood guides (Squamish, Whistler), seasonal (ski, patios), itinerary (48hrs Squamish)
- **Canonical tags** — site-wide via `alternates.canonical` in page metadata; filtered pages canonicalize to parent
- **Newsletter + lead magnet** — email capture component on homepage, category, blog index, and guide index pages; subscribers receive "Sea to Sky Trip Planner" welcome email with curated local picks via Resend; stored in `subscribers` table
- **Dynamic meta descriptions** — listing pages generate unique descriptions from name, town, rating, review count
- **Outcome-focused B2B copy** — Get Listed and Advertise pages use warm local voice, not SaaS jargon

---

## Guide Pages (`/guide` and `/guide/[slug]`)

### Landing Page (`/guide`)
- Shows all published seo_pages as cards grouped by category
- Cards display h1_text, meta_description, and link to the full guide
- Category section headers with colored accents (Eat, Stay, Play, Visit, Shop)
- "Guides" link in main header nav

### Individual Guide Pages (`/guide/[slug]`)
Driven by the `seo_pages` table. Each guide page:
- Filters listings by category_id, town_id, and/or tag_id
- Displays top 15 listings ranked by google_rating + google_review_count
- Includes numbered list with photos, ratings, descriptions, addresses
- Schema.org ItemList JSON-LD markup
- Breadcrumb navigation

Key guides linked from footer:
- `/guide` (All Guides)

### Static Content Pages (not database-driven)

These are standalone pages with hardcoded local content, separate from the `/guide/[slug]` dynamic route:

| Route | Type | Description |
|-------|------|-------------|
| `/48-hours-squamish` | Itinerary | 2-day local's itinerary with timeline layout (14 stops) |
| `/ski-season` | Seasonal | Whistler ski survival guide (lift lines, cheap eats, secret runs, accommodation, Highway 99) |
| `/best-patios` | Seasonal | 8 ranked patios from Squamish to Pemberton |
| `/neighbourhood/squamish` | Neighbourhood | Downtown vs Garibaldi Highlands comparison |
| `/neighbourhood/whistler` | Neighbourhood | Village vs Creekside comparison |

All linked from: homepage "Local Guides" section, footer Guides column, and cross-linked between each other.

### Town Restaurant Guides (curated, data-driven)

| Route | Description |
|-------|-------------|
| `/eat/squamish` | Squamish restaurant guide — 8 top picks, 5 category sections (Post-Hike, Brunch, Date Night, Coffee, Breweries), full filterable grid |
| `/eat/whistler` | Whistler restaurant guide — 10 top picks, 5 category sections (Apres-Ski, Brunch, Date Night, Coffee, Sushi), full filterable grid |
| `/eat/pemberton` | Pemberton restaurant guide — 4 top picks, 4 category sections (After a Day Out, Brunch, Date Night, Coffee & Bakeries), full filterable grid |

Static routes that override `[category]/[slug]` dynamic routing. Curated editorial content matched to DB listings by name. Internal-linked from `/eat` page.

### Town Stay Guides (curated, data-driven)

| Route | Description |
|-------|-------------|
| `/stay/squamish` | Squamish accommodation guide — area breakdowns, top picks, Trivago affiliate card |
| `/stay/whistler` | Whistler accommodation guide — area breakdowns, top picks, Trivago affiliate card |

Static routes with curated editorial content. Internal-linked from `/stay` page. Trivago affiliate links via Awin.

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
| `RESEND_API_KEY` | Resend API key for email notifications |
| `ANTHROPIC_API_KEY` | Anthropic API key for trip planner chatbot |
| `BREVO_API_KEY` | Brevo API key for subscriber list sync |
| `BREVO_LIST_ID` | Brevo contact list ID |

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
| **Resend** | Transactional email (Get Listed, contact, audit, subscriber welcome emails) |
| **Stripe** | Payment processing (Corridor Leader, Sponsored Guide tiers) |
| **Brevo** | Email marketing — subscriber list sync on signup |
| **Anthropic Claude API** | AI trip planner chatbot (streaming) |
| **Awin / Trivago** | Affiliate hotel comparison links on stay pages and guide pages |

---

## Deployment

Push to `main` → Vercel auto-deploys to production. No CI/CD pipeline beyond Vercel's built-in build step.
