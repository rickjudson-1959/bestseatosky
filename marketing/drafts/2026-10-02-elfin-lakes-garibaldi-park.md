# Draft batch — 2026-10-02

**Topic:** Elfin Lakes, Garibaldi Provincial Park (Squamish) — the alpine day hike to the Elfin Lakes shelter, with early October framed as the last good window before snow closes the upper trail for the season.

**Why this topic fits the rotation:** Squamish's last dedicated post was 2026-09-11 (post-hike patios); the two since then went to Pemberton (one-mile-lake) and Whistler (lost-lake), and drive/Highway-99 posts (Britannia Beach, Brandywine Falls, Porteau Cove, Tantalus Lookout) are already the most-covered bucket in the folder, so Squamish is next in the rotation. None of the existing Squamish drafts (swimming lakes, post-hike patios, Shannon Falls/Chief viewpoint) touch Garibaldi Provincial Park or an alpine hike, so this is a genuinely different angle — and early October is a real seasonal hook: the gravel access road and lower trail are still in good shape, the summer crowds are gone, and the shelter season is winding down before snow makes it a different (snowshoe/ski) trip entirely.

---

## Blog Post (SQL)

```sql
-- Best Sea to Sky — new blog post
-- Paste into Supabase SQL Editor. Does NOT set status to 'published' —
-- left as 'draft' so Rick reviews and flips status before it goes live.
-- featured_image left NULL: Rick needs a real photo of the Elfin Lakes
-- shelter, the lakes themselves, or the view back toward the Tantalus
-- Range from the trail — brand book rule is no stock imagery standing in
-- for a specific corridor location.

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
  'elfin-lakes-garibaldi-park',
  'Elfin Lakes: Squamish''s Big Alpine Day Hike, Before the Snow Closes In',
  'Elfin Lakes in Garibaldi Provincial Park is an 11-kilometre gravel-road-then-trail hike to an alpine shelter with glacier views — here''s what it actually takes, and why early October is one of the best times to go.',
  NULL, -- TODO(Rick): real photo of the Elfin Lakes shelter, the lakes, or the view toward the Tantalus Range from the trail, no stock
  'Most Squamish hikes people hear about top out at a viewpoint after an hour or two. Elfin Lakes is the one that asks for a full day and pays it back with an actual alpine basin, a backcountry shelter, and glacier views the whole way in — and early October, before the upper trail turns to snow, is one of the best windows to do it.',
  '<p>Squamish''s hiking reputation mostly runs through the Stawamus Chief and the Sea to Sky Gondola &mdash; both great, both done in an afternoon. Elfin Lakes is a different kind of day: a roughly 22-kilometre round trip into Garibaldi Provincial Park that starts on a wide gravel road and finishes in a genuine alpine basin, with a BC Parks shelter and the Gargoyles rock formations above it. It''s a bigger commitment than anything else we''ve written up on the Squamish side, and it''s worth knowing what you''re actually signing up for before you go.</p>

<h2>Getting to the trailhead</h2>

<p>The Diamond Head parking lot is the start point, up the Mamquam Forest Service Road off the Squamish Valley &mdash; a gravel road suitable for most vehicles in good conditions, though it narrows and gets rougher the further up you go. [VERIFY: current road condition and any washout or closure notices for the Mamquam FSR before publishing &mdash; forest service roads on this corridor change season to season and this one is no exception]. The lot fills on clear weekends, so an early start isn''t just about daylight, it''s about having somewhere to park.</p>

<h2>The hike itself</h2>

<p>The first several kilometres run along a wide, gently graded gravel road through subalpine forest &mdash; easy walking, but it goes on long enough that it can feel like a warm-up that doesn''t end. That changes once the road gives way to singletrack and you climb into the open basin below Mamquam Mountain, with the Tantalus Range visible across the valley for most of the back half. The reward at the top is the Elfin Lakes basin itself: two small lakes, a backcountry shelter run by BC Parks, and the Gargoyles &mdash; a cluster of volcanic rock spires &mdash; a short detour beyond. [VERIFY: current one-way distance and elevation gain figures before publishing &mdash; different trail signage and sources round these differently, and BC Parks'' own page is the number to trust].</p>

<h2>Why early October, specifically</h2>

<p>This is a three-season trail at best. Snow can close the upper section as early as mid-autumn and lingers into early summer most years, which narrows the realistic hiking window considerably. Early October usually still has the gravel road and lower trail in solid shape, the summer weekend crowds have thinned out, and the basin gets genuinely good fall light without the bugs that make July and August less pleasant up there. [VERIFY: current trail report and snow conditions before publishing &mdash; check the BC Parks Garibaldi Provincial Park page or a recent trip report, since this changes year to year and week to week late in the season].</p>

<h2>The shelter, if you''re staying overnight</h2>

<p>The Elfin Lakes shelter sleeps a limited number of people on a first-come basis alongside a campground, and BC Parks runs a reservation and fee system for both. [VERIFY: current shelter/campground reservation system, fees, and capacity before publishing &mdash; BC Parks has changed its backcountry booking platform in recent years and the details need to be confirmed against the current Garibaldi Provincial Park page]. Even as a day hike, there''s a day-use consideration here too. [VERIFY: whether a day-use pass or parking fee currently applies at the Diamond Head trailhead].</p>

<h2>What to bring</h2>

<p>Layers matter more here than on most of our other write-ups &mdash; you start in forest, finish in open alpine terrain, and October temperatures swing hard between the parking lot and the basin. Bring more water than you think you need, since there''s limited reliable access along the gravel-road section, proper boots rather than trail runners once you''re past the forest, and a headlamp if you''re cutting it close on an October day''s shorter daylight. This is also a hike where checking the forecast for the alpine specifically, not just Squamish town, actually matters &mdash; conditions up at the lakes can be well off what it''s doing at the trailhead.</p>',
  'Best Sea to Sky Team',
  'draft',
  '[{"question":"How long is the Elfin Lakes hike?","answer":"It''s a big day hike — roughly 22 kilometres round trip from the Diamond Head parking lot, starting on gravel road and finishing on alpine trail. [VERIFY: confirm the exact one-way distance and elevation gain against the current BC Parks Garibaldi Provincial Park page before publishing]."},{"question":"Is Elfin Lakes good for beginners?","answer":"It''s a long day for a beginner — the distance and elevation gain add up even though the first section is an easy gravel road. It''s a better fit for hikers comfortable with a full day on their feet."},{"question":"When does the Elfin Lakes trail close for the season?","answer":"There''s no fixed date — snow typically closes the upper trail sometime in fall and it stays closed into early summer most years. [VERIFY: current trail/snow conditions before publishing, since this varies year to year]."},{"question":"Can you stay overnight at Elfin Lakes?","answer":"Yes, BC Parks operates a shelter and campground at Elfin Lakes on a reservation and fee system. [VERIFY: current booking platform, fees, and capacity before publishing]."}]'::jsonb
);
```

---

## Facebook Post

The hike that asks for your whole day — and pays it back. 🏔️

Elfin Lakes, up in Garibaldi Provincial Park above Squamish, isn't a quick afternoon viewpoint. It's a long gravel road into subalpine forest, then singletrack up into an open basin with the Tantalus Range across the valley the whole way — two small lakes, a BC Parks shelter, and the Gargoyles rock spires just beyond.

Early October is one of the best times to go: the road and lower trail are usually still in good shape, the summer crowds have cleared out, and you get real fall light in the basin before snow makes this a different kind of trip entirely.

Full breakdown of the trailhead, what to bring, and the shelter/reservation system linked in the first comment. 👇

First comment: bestseatosky.com/blog/elfin-lakes-garibaldi-park

📍 Garibaldi Provincial Park, Squamish, BC

#elfinlakes #garibaldiprovincialpark #squamish #diamondhead #seatosky #explorebc #britishcolumbia #hellobc #bctravel #hikingbc

---

## Instagram Post

**Caption:**

Most Squamish hikes top out in an hour. This one asks for your whole day. 🌲

Elfin Lakes — a gravel road into the forest, then singletrack up into an alpine basin with the Tantalus Range across the valley the whole climb. Two small lakes, a backcountry shelter, and the Gargoyles rock spires just past it.

Early October's your window — road and lower trail still solid, the summer crowds gone, real fall light in the basin before snow shuts the upper section down for the season.

Everything you need before you go — trailhead, gear, the shelter booking system — is in our first comment. ⬇️

First comment: Link to the Elfin Lakes guide → bestseatosky.com/elfin-lakes-garibaldi-park

📍 Garibaldi Provincial Park, Squamish, BC

#elfinlakes #garibaldiprovincialpark #squamish #diamondhead #seatosky #explorebc #britishcolumbia #hellobc #bctravel #hikingbc

---

## Media Notes

**Your media (preferred):** Check `carousel-photos/chief/` and `carousel-photos/whistler/` (and anywhere else Squamish/Garibaldi-area alpine shots might be filed) locally for any existing Elfin Lakes, Diamond Head, or Garibaldi Provincial Park footage before defaulting to anything below — this is a big-day-hike shot, so it's only usable if Rick has actually done this specific trail.

If new footage is needed, this is a strong Reel candidate per content-strategy.md's format priority:
- One 10–15 sec clip: the start of the gravel road at the Diamond Head parking lot, to set the "this starts easy" expectation
- One 10–15 sec clip: the transition point where the road becomes singletrack and the alpine basin opens up, with the Tantalus Range in frame — this is the payoff shot
- One 8–10 sec clip: the shelter and/or the lakes themselves, wide shot for scale
- One close-up: boots/poles on the trail or a water bottle being filled, to sell the "bring enough water" practical note
- Audio: a steady, slightly cinematic trending track suits the "big day out" framing; on-screen text overlay in the first 2 seconds — "22km round trip, worth every step" — as the hook, no voiceover needed

**Stock — search "Elfin Lakes Garibaldi Provincial Park" (fallback only):** If no usable footage turns up locally, licensed stock of Elfin Lakes or the Garibaldi Provincial Park basin specifically (verify it's actually this location, not a generic alpine-lake stock shot) is an acceptable fallback per the brand book.

**Blotato can build:** A carousel version works as a secondary post — pull "Getting to the trailhead," "The hike itself," and "What to bring" into 3–4 slide cards in brand colours (Emerald/Slate), with a real trail photo swapped onto the cover slide once Rick has one, and a follow CTA on the last slide.
