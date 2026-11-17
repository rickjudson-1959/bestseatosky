# Draft batch — 2026-11-17

**Topic:** Function Junction — Whistler's working light-industrial neighbourhood five minutes south of the village, where the breweries, bike shops, and makers actually are. No chairlifts, no village stroll — just the part of Whistler that runs on weekdays too.

**Why this topic fits the rotation:** Whistler's last post was Wedge Pond (10-27), three weeks ago, and every other Whistler post in this folder (Train Wreck, the farmers market, Lost Lake, Cheakamus Lake, Wedge Pond) is an outdoor/nature stop. Function Junction is a different kind of place entirely — a neighbourhood, not a trail or a lake — and it's genuinely indoor-friendly, which matters going into late November when short days and wet weather make an alpine stop a harder sell. It also hasn't been touched: no post in this folder mentions breweries, bike shops, or anywhere off the village core. The two most recent posts (winter driving 11-10, Minaty Bay 11-13) were highway-wide and Britannia Beach; this brings the rotation back to Whistler without repeating a single lake, trail, or market angle already covered.

---

## Blog Post (SQL)

```sql
-- Best Sea to Sky — new blog post
-- Paste into Supabase SQL Editor. Does NOT set status to 'published' —
-- left as 'draft' so Rick reviews and flips status before it goes live.
-- featured_image left NULL: Rick needs a real photo of Function Junction
-- itself — a brewery taproom, a bike shop storefront, or the industrial
-- park strip itself — brand book rule is no stock imagery standing in for
-- a specific corridor location, and generic "brewery interior" stock would
-- be an obvious miss here.

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
  'function-junction-whistler',
  'Function Junction: The Part of Whistler That Isn''t Trying to Sell You Anything',
  'Five minutes south of Whistler Village, Function Junction is where the breweries, bike shops, and makers actually operate. No chairlift views, no village markup — here''s why it''s worth the short drive down.',
  NULL, -- TODO(Rick): real photo of a Function Junction brewery taproom, bike shop storefront, or the strip itself, no stock
  'Whistler Village is built to be looked at. Function Junction, a few minutes south, isn''t built to be looked at all — it''s where the village''s breweries, bike shops, and workshops actually operate, and that''s exactly the appeal.',
  '<p>Every Whistler visit starts the same way: park near the village, walk the cobblestones, look up at the mountains. Function Junction never shows up on that walk. It''s a light-industrial strip a few minutes south of the village on Highway 99 &mdash; warehouses, loading docks, the kind of unglamorous zoning that exists in every ski town but almost never gets photographed for a tourism brochure. That''s precisely why it''s worth knowing about: it''s where a chunk of Whistler''s actual working life happens, at prices and in rooms that don''t have a village-core markup built in.</p>

<h2>What''s actually down there</h2>

<p>Function Junction is home to several of the corridor''s breweries and taprooms, a cluster of bike shops that do real repair work (not just rentals), and a rotating handful of makers, bakeries, and small manufacturers that use the cheap warehouse space to actually produce things. [VERIFY: confirm current list of breweries/bike shops/makers operating in Function Junction before publishing — this kind of small-business lineup turns over and needs a recent check rather than relying on an old list]. None of it is dressed up for visitors. You park in a gravel or paved lot outside a warehouse door, and what you get inside is the real version of whatever that business does &mdash; a taproom with tanks visible through a window, a bike shop with a repair stand mid-job, not a storefront built around a photo opportunity.</p>

<h2>Why it''s worth the five-minute drive</h2>

<p>Three reasons. First, prices: without village-core rent built into the bill, a flight or a pint in Function Junction tends to run cheaper than the same thing a few minutes north. [VERIFY: confirm this price difference is still accurate and avoid stating a specific dollar amount without current data]. Second, it''s where locals actually go on a Tuesday, which is a different crowd and a different pace than the village in high season. Third &mdash; and this matters heading into late November &mdash; it''s almost entirely indoors. A short, wet, early-dark day that rules out a hike or a lookout doesn''t rule out an afternoon working through two or three taprooms and a bike shop.</p>

<h2>Good to know before you go</h2>

<p>Most of Function Junction is walkable once you''re parked, though it''s spread across a few blocks of industrial park, not one tidy strip &mdash; expect some driving or a short walk between stops rather than a single row of storefronts. [VERIFY: confirm current parking situation, whether there''s a free public lot or whether visitors should park at individual businesses, and whether transit (the Whistler local bus) serves the area directly]. Hours lean toward standard business hours for the shops and typical taproom hours for the breweries &mdash; this isn''t a late-night village-style scene, so check individual hours before making the trip, especially outside peak season. [VERIFY: confirm typical hours and whether any of the breweries/shops close seasonally in the off months].</p>

<p>The honest pitch: Function Junction will never be the reason someone books a Whistler trip. But if you''re already here and want an afternoon that feels like the town rather than the postcard of the town, this is where to spend it &mdash; and it works just as well on a grey Tuesday in November as it does in July.</p>',
  'Best Sea to Sky',
  'draft',
  '[
    {"question": "What is Function Junction in Whistler?", "answer": "Function Junction is a light-industrial neighbourhood a few minutes south of Whistler Village on Highway 99, home to several breweries and taprooms, bike repair shops, and small local makers — the working side of Whistler, away from the village core."},
    {"question": "Is Function Junction worth visiting?", "answer": "Yes, especially if you want a lower-key, less expensive alternative to the village core. It is popular with locals, tends to be cheaper than village-core pricing, and is almost entirely indoors, which makes it a good option on a short or wet day."},
    {"question": "How far is Function Junction from Whistler Village?", "answer": "It is a short drive, roughly five minutes south of Whistler Village along Highway 99."},
    {"question": "What can you do in Function Junction?", "answer": "Visit local breweries and taprooms, get a bike serviced or browse gear at a local bike shop, and check out small makers and bakeries that operate out of the area's warehouse spaces."}
  ]'::jsonb
);
```

---

## Facebook Post

**Format:** Reel (10–15 sec clips, 3–4 cuts) — a quick walking tour through a taproom door, a bike shop, and back outside works well as a fast-paced Reel and this topic benefits from showing multiple stops in one short video rather than a single static photo.

**Location tag:** Function Junction, Whistler, BC

**Post text:**

Whistler Village is built to be looked at. Five minutes south, Function Junction isn't trying to sell you anything — it's just where the town's breweries, bike shops, and makers actually work.

No chairlift views, no village markup. Just taprooms with the tanks right there, a bike shop mid-repair, and the kind of prices that don't have village-core rent baked in.

It's also almost entirely indoors — worth remembering on a short, wet November day when a hike isn't in the cards.

Full write-up — link in the first comment.

📍 Function Junction, Whistler, BC

Which Function Junction spot do you always end up at?

**First comment (link):**
Full guide here → bestseatosky.com/stay/.../function-junction-whistler [VERIFY: confirm correct live URL path/category for this guide before posting]

**Hashtags (~10):**
#functionjunction #whistler #whistlervillage #seatosky #whistlerbc #explorebc #britishcolumbia #hellobc #bctravel #highway99

---

## Instagram Post

**Format:** Reel (same cuts as Facebook — vertical, 10–15 sec clips, 3–4 locations)

**Caption:**

The village is for photos. Function Junction is where Whistler actually works. 🍻🚲

Five minutes south of the village, no chairlift views, no markup — just the breweries, bike shops, and makers that keep this town running. Cheaper pints, real bike repairs, and almost entirely indoors, which matters a lot more once the days get short and wet.

Not the Whistler you see on a postcard. The one locals actually use.

Tag someone who needs a lower-key Whistler afternoon. 👇

First comment: Full guide to Function Junction → bestseatosky.com/stay/.../function-junction-whistler

📍 Function Junction, Whistler, BC

#functionjunction #whistler #whistlervillage #seatosky #whistlerbc #explorebc #britishcolumbia #hellobc #bctravel #highway99

---

## Media Notes

**Check `carousel-photos/whistler/` locally first** — Rick's photo library is gitignored and not visible to this routine, but per content-strategy.md, Whistler's general folder may already have brewery, bike shop, or Function Junction shots from past visits. Look there before shooting anything new.

If nothing covers Function Junction specifically, this is a **"Your media"** post — it needs a short, dedicated walk-through next time Rick is in the area:

1. Exterior/parking-lot establishing shot of the Function Junction strip — warehouses, loading docks, signage — 5–8 sec, sets up the "this doesn't look like the village" contrast
2. Inside a taproom: tanks visible, a pint being poured or set on the table — 8–10 sec
3. Inside a bike shop: a repair stand mid-job, gear on the wall — 8–10 sec
4. One more stop if available (a bakery, a maker, a second brewery) — 5–8 sec
5. Optional closing shot: back outside, highway sign or Whistler Village visible in the distance for geographic context — 5 sec

Total run time roughly 30–40 sec. Text overlay should carry the "this is the Whistler locals actually use" contrast up front, since that's the hook. No voiceover needed if overlay text carries it; a casual, mid-tempo track (not epic/cinematic) fits the workaday tone better than a dramatic mountain-adventure track.

**Fallback if no fresh footage is realistic soon:** This is a weak fit for stock — the entire point is showing the real, specific businesses, and a generic "brewery interior" or "bike shop" stock photo would misrepresent the actual place and break the brand book's rule against standing in for a specific corridor location. Hold this post until real footage is available rather than substituting stock.
