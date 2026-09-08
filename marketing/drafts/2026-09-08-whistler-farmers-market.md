# Draft batch — 2026-09-08

**Topic:** The Whistler Farmers Market — what it actually is beyond the tourist-brochure line, what locals go for (the produce, the cheese, the baked goods, live music), and how to time a visit so it doesn't feel like a stop on someone else's itinerary.

**Why this topic fits the rotation:** Existing drafts cover Britannia Beach (2026-08-18), Pemberton's farm-stand loop (2026-08-21), Squamish's swimming holes (2026-08-25), Whistler's Train Wreck Trail (2026-08-28), Brandywine Falls as a Highway 99 stop (2026-09-01), and Nairn Falls south of Pemberton (2026-09-04). Whistler and Squamish are the two towns with only one post each so far, and the last three posts in a row were all "quiet trail or waterfall off the highway" — this breaks that pattern with a market/food angle instead of another nature pull-off, while still giving Whistler its second post.

---

## Blog Post (SQL)

```sql
-- Best Sea to Sky — new blog post
-- Paste into Supabase SQL Editor. Does NOT set status to 'published' —
-- left as 'draft' so Rick reviews and flips status before it goes live.
-- featured_image left NULL: Rick needs a real photo of the actual market
-- stalls/crowd in Upper Village Whistler — brand book rule is no stock
-- imagery standing in for a specific corridor location.

INSERT INTO blog_posts (
  slug,
  title,
  meta_description,
  featured_image,
  excerpt,
  content,
  author,
  status,
  faq_json
) VALUES (
  'whistler-farmers-market-guide',
  'The Whistler Farmers Market: What Locals Actually Buy (And When to Go)',
  'The Whistler Farmers Market runs in Upper Village every summer weekend, but it''s easy to walk through as just another photo op. Here''s what locals actually shop for, and how to time your visit.',
  NULL, -- TODO(Rick): real photo of the market stalls, the produce table, or the crowd in Upper Village — no stock
  'Most visitors walk through the Whistler Farmers Market on their way to somewhere else — a quick browse between the gondola and dinner. Locals treat it differently: it''s the one morning a week they actually plan around. Here''s what''s worth showing up for, and when to go if you want the market before the crowds do.',
  '<p>Whistler markets itself hard on lift tickets and lake views, so the farmers market tends to get filed under "cute extra" rather than an actual reason to plan a morning around. That undersells it. On a good Sunday it''s the closest thing the village has to a town square — long tables of B.C. produce, a rotating lineup of food vendors, live music drifting between the stalls, and a crowd that''s a genuine mix of locals doing their weekly shop and visitors who stumbled into it.</p>

<h2>When it actually runs</h2>

<p>The market sets up in Upper Village, on the plaza near the Fairmont [VERIFY: exact current location/plaza name and whether it has moved for the 2026 season before publishing]. It runs on a weekend schedule from roughly early summer through early fall [VERIFY: exact 2026 season start and end dates and which day(s) of the week before publishing — this has shifted between years]. Hours are generally late morning into early afternoon [VERIFY: exact current opening and closing times before publishing].</p>

<h2>What''s actually worth buying</h2>

<p>The produce tables are the backbone — much of it trucked up from the Pemberton Valley and the Fraser Valley, so the seed potatoes and corn you see here are often the same growers behind the honesty-box stands on Pemberton Meadows Road, just closer to the village. Beyond produce, the market is where the corridor''s smaller food producers show up in person: a cheese vendor, a bakery table, someone doing fresh-pressed juice or kombucha, a honey stand [VERIFY: current vendor lineup before publishing — vendors rotate season to season and naming a specific business that isn''t there anymore looks careless]. Prepared food is the other draw — a rotating set of food trucks and stalls means you can make a full breakfast or lunch out of a market lap without sitting down anywhere.</p>

<h2>How to actually do it like a local</h2>

<p>Go early. The market gets genuinely busy by midday once the village fills in from the gondola crowd, and the best of the produce and baked goods sell out first. Bring cash as a backup even though most stalls take cards now [VERIFY: current payment norms across most vendors before publishing], and bring a bag — the whole point is walking out with something, not just photos of it. If there''s live music booked, it''s usually a local or regional act rather than anything touring [VERIFY: current live-music booking pattern before publishing], which fits the market''s actual vibe better than the polished village marketing suggests.</p>

<h2>Pair it with</h2>

<p>The market sits close enough to the village core that it folds naturally into a bigger Whistler morning — a walk down to Lost Lake or the Valley Trail afterward, or a coffee stop before heading out to the Train Wreck Trail. For anyone doing a longer Sea to Sky loop, it''s also a reasonable spot to pick up snacks for the drive north to Pemberton, rather than relying on a gas station.</p>',
  'Best Sea to Sky Team',
  'draft',
  '[{"question":"Where is the Whistler Farmers Market held?","answer":"In Upper Village, Whistler. [VERIFY: exact plaza/location for the current season before publishing]."},{"question":"What days and months does the Whistler Farmers Market run?","answer":"It runs on a weekend schedule roughly from early summer through early fall. [VERIFY: exact 2026 season dates and day(s) of the week before publishing]."},{"question":"Is the Whistler Farmers Market free to visit?","answer":"Yes, browsing the market is free — you only pay for what you buy from individual vendors."},{"question":"What should I buy at the Whistler Farmers Market?","answer":"Locals go for the B.C. produce tables (much of it from the Pemberton and Fraser valleys), the cheese and bakery stalls, and the rotating prepared-food vendors. Go early, since the best of it sells out by midday."}]'::jsonb
);
```

---

## Facebook Post

There's a version of the Whistler Farmers Market that most visitors never see — the one that happens before 11am, before the village fills in, when it's actually locals doing their weekly shop instead of a stop between the gondola and lunch.

Long tables of B.C. produce (a lot of it grown an hour up the valley in Pemberton), a cheese stall, someone's fresh bread, and live music drifting across the plaza. It's the closest thing Whistler has to a town square.

We put together what's actually worth showing up for and when to go before it gets busy — link in the first comment.

What do you always end up buying when you go? 👇

**First comment:** The Whistler Farmers Market, mapped out 👉 bestseatosky.com/blog/whistler-farmers-market-guide

**Location tag:** Whistler Village, BC

---

## Instagram Post

**Format:** Carousel (6–8 slides) — content-strategy.md ranks carousels second for "save this" list-style content, and a market lends itself naturally to a visual list (produce table → cheese stall → bakery → live music → the walk-out haul) rather than a single-shot Reel.

**Caption:**

The Whistler Farmers Market, before 11am, before the village crowd shows up. 🧺

Long tables of B.C. produce (much of it grown an hour up the valley in Pemberton), a cheese stall, fresh bread, live music on the plaza — it's the closest thing Whistler has to a town square, and most visitors walk right through it on the way to somewhere else.

Swipe for what's actually worth buying, and save this for your next Whistler weekend. Full guide — link in our first comment.

**First comment:** The Whistler Farmers Market, mapped out 👉 bestseatosky.com/blog/whistler-farmers-market-guide

**Location tag:** Whistler Village, BC

**Hashtags:** #whistlerfarmersmarket #whistlervillage #whistlerbc #seatosky #upperVillage #explorebc #britishcolumbia #hellobc #bctravel #shoplocalbc

---

## Media Notes

**Check `carousel-photos/whistler/` locally first** — Rick's local photo library is organized by town, and market/village-plaza shots may already exist there from prior Whistler content. Confirm what's there before shooting or building anything new.

If nothing usable exists yet, this is **Your media** (preferred), sized for a carousel rather than a single Reel:

- One wide shot of the market plaza with stalls and people, taken from the same angle each visit if possible (this becomes the cover/slide 1)
- One close shot of a produce table — colour and texture, natural light
- One close shot of a specific vendor product in hand (cheese, bread, a jar of honey) — the brand book's "product in hand" rule for Shop-style content applies here even though this is technically a Play/Visit-adjacent post
- One shot of any live music or performer setup, if present that visit
- One "walk-out haul" shot — a tote bag or basket with the actual purchases, on a bench or car hood, natural light
- Optional: one short 8–10 sec vertical video pan across the stalls for use as a Reel teaser pointing back to the carousel

**Fallback if Rick has nothing current:** this is a poor fit for stock — a farmers market's whole appeal is that it's a specific, current, real scene, and a generic market stock photo would read as fake immediately. If no current photos exist, hold this post until Rick can shoot it on an actual market Sunday rather than substituting stock.
