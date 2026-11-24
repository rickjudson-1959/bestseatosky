# Draft batch — 2026-11-24

**Topic:** Sea to Sky Gondola in winter — the gondola ride up the side of the Stawamus Chief in Squamish, with its viewing platform, suspension bridge, and snowshoe trails. A big, well-known corridor landmark that hasn't had its own guide yet, and a strong fit for late November as winter operations start up and summer-only features (the Via Ferrata, the longer hiking trails) are off the table.

**Why this topic fits the rotation:** The last six posts cycled Pemberton (Joffre Lakes, 11-03) → Squamish (Brackendale eagles, 11-06) → the drive (winter driving, 11-10) → Britannia Beach (Minaty Bay, 11-13) → Whistler (Function Junction, 11-17) → Pemberton (Distillery, 11-20), so Squamish is next up and hasn't had a fresh post since the eagle-viewing one three weeks ago. Every existing Squamish post so far — swimming holes, post-hike patios, the Shannon Falls/Chief viewpoint, Murrin Park, the railway museum, eagle viewing — is either summer-oriented or incidental to winter. The Sea to Sky Gondola is Squamish's single best-known attraction and doesn't have a post of its own at all yet, and framing it for winter (snowshoe trails, the viewing platform, the suspension bridge) gives readers something to actually do on the corridor right now, as opposed to a trail that's buried or a lake that's frozen over.

---

## Blog Post (SQL)

```sql
-- Best Sea to Sky — new blog post
-- Paste into Supabase SQL Editor. Does NOT set status to 'published' —
-- left as 'draft' so Rick reviews and flips status before it goes live.
-- featured_image left NULL: Rick needs a real photo of the Sea to Sky
-- Gondola itself — the viewing platform, the suspension bridge, or a gondola
-- cabin against the Chief — brand book rule is no stock mountain imagery
-- standing in for a specific corridor landmark.

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
  'sea-to-sky-gondola-winter',
  'Sea to Sky Gondola in Winter: Squamish''s Big View Without the Summer Lineup',
  'The Sea to Sky Gondola swaps its summer Via Ferrata and longer trails for snowshoe routes and the same panoramic view over Howe Sound. Here''s what winter at the gondola actually looks like, and what to know before you go.',
  NULL, -- TODO(Rick): real photo of the viewing platform, the suspension bridge, or a gondola cabin against the Chief, no stock
  'Most visitors know the Stawamus Chief as the thing you climb. The Sea to Sky Gondola is the other way up — a cabin ride from the highway to a viewing platform and suspension bridge near the summit, no scramble required. In winter it trades its summer-only features for snowshoe trails and the same big view over Howe Sound, which makes it one of the more reliable things to do in Squamish once the swimming holes and alpine lakes are out of season.',
  '<p>Drive through Squamish on Highway 99 and it''s hard to miss the Sea to Sky Gondola station at the base of the Stawamus Chief, cabins running up the mountainside toward a viewing platform you can usually spot from the road. It''s one of the corridor''s most recognizable landmarks, and unlike the Chief itself &mdash; which you climb, the hard way, on your own legs &mdash; the gondola gets you most of the same view in about ten minutes, no scramble required.</p>

<h2>What changes in winter</h2>

<p>The gondola runs a different lineup of things to do depending on the season. The Via Ferrata &mdash; the assisted climbing route along the rock face &mdash; is a summer-only feature, and some of the longer alpine hiking trails at the top aren''t realistic once there''s real snow on the ground. What takes their place in winter is a network of snowshoe trails, which turn the same ridge into a quieter, slower outing. [VERIFY: confirm current winter trail names, distances, and whether snowshoes can be rented on site or need to be brought, before publishing.]</p>

<p>The viewing platform and the Sky Pilot Suspension Bridge near the summit are the other big draw, and those work in any season &mdash; if anything, a clear winter day gives you a sharper, colder-air view down Howe Sound than the summer haze usually allows. [VERIFY: confirm the suspension bridge and viewing platform remain open and accessible in winter conditions, and whether there''s ever a weather-related closure, before publishing.]</p>

<h2>What to know before you go</h2>

<p>This is still a mountain in winter, even with a gondola doing the climbing for you. Dress for the top being noticeably colder and windier than the parking lot &mdash; the usual layers-plus-a-real-jacket advice applies, and good footwear matters even on packed paths. [VERIFY: confirm current winter operating hours, ticket pricing, and parking situation before publishing &mdash; the gondola has adjusted winter hours in past seasons and we don''t want to publish a schedule that''s already out of date.]</p>

<p>There''s a lodge and food service at the base and, in past seasons, at or near the summit as well. [VERIFY: confirm which food and washroom facilities are actually open in winter versus summer-only before publishing.] If you''re bringing kids or anyone who tires out fast, it''s worth knowing in advance how much of the top is flat, groomed path versus steeper snowshoe trail, since that changes how far a family can comfortably wander from the platform.</p>

<h2>Who this is actually good for</h2>

<p>The gondola is the rare Squamish attraction that doesn''t ask much of you physically to get the view, which makes it a good option on a day when the weather or the group isn''t up for a real hike. It''s also a solid rainy-or-snowy-day fallback precisely because the ride itself is indoors and heated, even if conditions at the top are rough. For anyone who''s driven past the station a dozen times on the way to Whistler without stopping, winter &mdash; with shorter lineups than peak summer &mdash; is actually a reasonable time to finally pull off.</p>

<p>If you''ve already done the swimming holes and the post-hike patios on past Squamish stops, this is the cold-weather counterpart: something that''s genuinely better suited to November and December than to July.</p>',
  'Best Sea to Sky Team',
  'draft',
  '[{"question":"Is the Sea to Sky Gondola open in winter?","answer":"Yes — it runs year-round, with a different mix of activities depending on the season. [VERIFY: confirm current winter operating days/hours before publishing]."},{"question":"What''s different about the Sea to Sky Gondola in winter versus summer?","answer":"The summer-only Via Ferrata and some longer alpine hiking trails aren''t available in winter; snowshoe trails take their place, and the viewing platform and suspension bridge remain open in both seasons. [VERIFY: confirm exact seasonal trail list before publishing]."},{"question":"Do you need your own snowshoes for the Sea to Sky Gondola in winter?","answer":"[VERIFY: confirm whether snowshoe rentals are available on site or whether visitors need to bring their own before publishing]."},{"question":"Is the Sea to Sky Gondola a good alternative to hiking the Stawamus Chief?","answer":"It''s a different experience rather than a substitute — the gondola gets you a comparable view over Howe Sound in about ten minutes without the climb, which makes it a good option for anyone not up for the Chief''s steep trail, especially in winter conditions."}]'::jsonb
);
```

---

## Facebook Post

**Format:** Reel (15–20 sec) — a gondola ride up a snowy mountainside with a view payoff at the top is exactly the kind of motion-plus-payoff clip that performs well as a Reel, and it's the format content-strategy.md prioritizes first.

**Location tag:** Sea to Sky Gondola, Squamish, BC

**Post text:**

Most people know the Chief as the thing you climb. There's another way up — and this time of year, it comes with snow.

The Sea to Sky Gondola swaps its summer features for snowshoe trails once winter hits, but the view over Howe Sound from the top doesn't change — if anything, a clear cold day gives you a sharper one.

No scramble required. Full guide in the first comment.

Have you done the gondola in winter, or only in summer? 👇

**First comment (link):**
Full guide here → bestseatosky.com/play/sea-to-sky-gondola-winter [VERIFY: confirm correct live URL path/category for this guide before posting]

**Hashtags (~10):**
#squamish #squamishbc #seatoskygondola #stawamuschief #howesound #seatosky #seatoskyhighway #explorebc #britishcolumbia #hellobc

---

## Instagram Post

**Format:** Reel (15–20 sec) — same clip as Facebook: gondola cabin ascending through snow-dusted trees, cut to the viewing platform/suspension bridge payoff shot. Reels are the priority format per content-strategy.md and this topic is built for motion.

**Caption:**

The other way up the Chief. 🚡❄️

Summer at the Sea to Sky Gondola means the Via Ferrata and the long alpine trails. Winter means snowshoe trails instead — same big Howe Sound view, way fewer people, and you don't have to climb a single step to get there.

Full guide linked in the first comment 👇

**First comment (link):**
bestseatosky.com/play/sea-to-sky-gondola-winter [VERIFY: confirm correct live URL path before posting]

**Location tag:** Sea to Sky Gondola, Squamish, BC

**Hashtags (~10):**
#squamish #squamishbc #seatoskygondola #stawamuschief #howesound #seatosky #seatoskyhighway #explorebc #britishcolumbia #hellobc

---

## Media Notes

**Check `carousel-photos/chief/` and `carousel-photos/Squamish/` locally first** — Rick's photo library is gitignored and not visible to this routine, but per content-strategy.md these folders are exactly the kind that likely already hold usable shots of the gondola, the viewing platform, or the suspension bridge from past visits. Look there before shooting anything new.

If nothing in those folders covers the gondola itself, especially in winter conditions, this is a **"Your media"** post:

- One 8–12 second clip from inside or looking out of a gondola cabin as it climbs through snowy trees — vertical, handheld is fine
- One 5–8 second clip at the viewing platform or suspension bridge, slow pan across the Howe Sound view
- One still or short clip of the base station/lineup area with snow visible, for context and to show it's winter
- If snowshoe trails are open and shot-able: one clip of boots/snowshoes on a packed trail at the top
- Light text overlay ("Winter at the Sea to Sky Gondola") works well over the ascent shot; no voiceover needed, a calm instrumental or ambient trending audio track fits the payoff-view cut better than talking over it

**Fallback if no fresh winter footage is realistic soon:** Stock — search "Sea to Sky Gondola" or "Stawamus Chief winter" specifically (per brand book: real-place stock only, never a generic snowy-mountain-gondola stock photo standing in for this one).
