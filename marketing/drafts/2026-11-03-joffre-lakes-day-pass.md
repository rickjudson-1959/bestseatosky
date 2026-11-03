# Draft batch — 2026-11-03

**Topic:** Joffre Lakes Provincial Park — the three glacier-fed turquoise lakes
on Duffey Lake Road past Pemberton, and the day-use reservation system that
trips people up if they don't know about it before they drive up.

**Why this topic fits the rotation:** Joffre Lakes is one of the most
photographed hikes in this part of BC and it hasn't appeared in this folder
at all yet — every prior Pemberton post (farm stand loop, Nairn Falls, One
Mile Lake, Keyhole Hot Springs) has skipped it, likely because the
reservation system makes it a slightly more complicated post than a
straightforward trail writeup. That complication is exactly the service
angle: it's the single biggest reason people show up and get turned away, so
a guide that actually explains the pass system is doing real work, not just
adding another waterfall post to the pile. It also pulls Pemberton-area
coverage (4 prior posts) closer to parity with Squamish and Whistler, and
keeps the rotation off repeat-hike territory for another cycle.

---

## Blog Post (SQL)

```sql
-- Best Sea to Sky — new blog post
-- Paste into Supabase SQL Editor. Does NOT set status to 'published' —
-- left as 'draft' so Rick reviews and flips status before it goes live.
-- featured_image left NULL: Rick needs a real photo of one of the three
-- Joffre Lakes (the turquoise colour is the whole draw, and brand book
-- rules out generic alpine-lake stock standing in for this specific spot).

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
  'joffre-lakes-day-pass-what-to-know',
  'Joffre Lakes: The Reservation System Nobody Tells You About Until You''re Already There',
  'Joffre Lakes'' three turquoise lakes are some of the most photographed water in BC — but you need a day-use pass before you drive up, not after. Here''s how the system actually works and how to hike it right.',
  NULL, -- TODO(Rick): real photo of Lower, Middle, or Upper Joffre Lake — the turquoise colour is the point, no generic alpine lake stock
  'Three glacier-fed lakes, each one a slightly different shade of turquoise, strung along one trail past Pemberton — and a parking lot that fills on a reservation, not a first-come basis. Miss that second part and you''re turning around at the gate.',
  '<p>Keep driving north past Pemberton on Highway 99 and the road becomes Duffey Lake Road, climbing into terrain that looks less like the Sea to Sky corridor''s usual green and more like something out of the Rockies. About 25 minutes past town, a gravel pullout marks the start of one of the most striking hikes in this part of BC &mdash; and one that catches a lot of visitors off guard, because showing up with a full tank of gas and good intentions isn''t enough anymore.</p>

<h2>What you''re actually hiking to</h2>

<p>Joffre Lakes is three lakes on one trail, each a different glacial blue-green, fed by the Matier Glacier that sits above the valley. Lower Joffre Lake is the easy one &mdash; a flat walk of about ten minutes from the parking lot, and genuinely worth doing even if you''re not planning to go further. Middle Joffre Lake is roughly 3 km in with some real climbing, and it''s the one you''ve probably seen on a postcard or someone''s feed: the glacier visible across the water on a clear day. Upper Joffre Lake adds another steep push to a full round trip of around 10 km. [VERIFY: current official trail distance and elevation gain figures from BC Parks before publishing]</p>

<p>You don''t need to do all three to make the drive worth it. Plenty of people turn around at Middle Lake and leave completely satisfied; the Upper Lake push is for people who want the full day and don''t mind the extra climb.</p>

<h2>The part that actually matters: the day-use pass</h2>

<p>Here''s what trips people up. Joffre Lakes operates on a day-use pass system through BC Parks &mdash; you reserve a timed entry online before you go, and the parking lot does not take walk-ups once it''s full. [VERIFY: current reservation platform (Discover Camping or successor), exact season dates the pass system is in effect, booking window, and whether there''s a fee per pass] This isn''t a minor inconvenience; it''s the difference between a great day and driving all the way from Vancouver only to be turned back at the pullout.</p>

<p>Book before you leave the house, not from the road. [VERIFY: how far in advance passes typically get booked up during peak summer weekends, and whether shoulder-season weekdays are easier to get without advance booking] If you can''t get a pass for the day you wanted, shifting to an early weekday morning is generally the better bet than hoping for a cancellation.</p>

<h2>Good to know before you go</h2>

<p>This is a genuine mountain trail, not a paved path &mdash; sturdy footwear matters, especially past Lower Lake where the terrain gets rougher and can still hold snow and ice into early summer at elevation. [VERIFY: typical snow-free window and any current trail closures or hazard advisories] Bring layers; the air coming off a glacier-fed lake is noticeably colder than the parking lot.</p>

<p>There is no food or water service at the trailhead, so bring what you need for the full round trip, and pack out everything you bring in &mdash; this is a heavily visited spot and it stays beautiful because people treat it that way. Washrooms exist at the parking area but don''t expect much beyond that. [VERIFY: current washroom/facility status at the trailhead]</p>

<p>The honest pitch: Joffre Lakes earns the hype in the photos. The reservation system is the unglamorous part nobody posts about, and it''s exactly the part that determines whether your day happens at all.</p>',
  'Best Sea to Sky',
  'draft',
  '[
    {"question": "Do I need a reservation to hike Joffre Lakes?", "answer": "Yes — Joffre Lakes Provincial Park uses a day-use pass system for its parking lot during the park''s managed season. Book your timed entry online before you drive up; the lot does not take walk-ups once full. Confirm current booking details on the BC Parks site before you go."},
    {"question": "How far is the hike to Joffre Lakes?", "answer": "Lower Joffre Lake is about a ten-minute flat walk from the parking lot. Middle Joffre Lake is roughly 3 km in with real elevation gain. A full round trip to Upper Joffre Lake is around 10 km with a steeper climb — check current BC Parks trail stats before you go."},
    {"question": "Do I need to hike to all three lakes?", "answer": "No. Many visitors turn around after Middle Lake, which is the one most commonly photographed with the glacier visible across the water, and leave satisfied. Upper Lake is for those wanting the full day."},
    {"question": "How far is Joffre Lakes from Pemberton?", "answer": "About 25 minutes north of Pemberton on Duffey Lake Road, the continuation of Highway 99 past town."}
  ]'::jsonb
);
```

---

## Facebook Post

Three lakes, three shades of turquoise, one glacier feeding all of them — Joffre Lakes is one of the most photographed hikes in this part of BC, and most people have seen the photo before they've heard the catch.

You need a day-use pass before you drive up, not after. The parking lot runs on a reservation system, not first-come, and showing up without one means turning around at the pullout — about 25 minutes past Pemberton, with nowhere else to go from there.

Lower Lake is a 10-minute flat walk and worth doing on its own. Middle Lake (the postcard one, glacier and all) is about 3 km in with real climbing. Upper Lake is the full day, around 10 km round trip.

Book before you leave the house. Full breakdown of the pass system and what to expect on trail — link in the first comment.

📍 Joffre Lakes Provincial Park

Anyone been turned away at the gate before they knew about the reservation?

---

## Instagram Post

**Caption:**

That turquoise lake photo you've seen a dozen times? It's probably Joffre Lakes. 💙

Three lakes, three different shades of glacial blue-green, fed by the Matier Glacier — about 25 minutes past Pemberton on Duffey Lake Road. Lower Lake is a flat 10-minute walk and worth it on its own. Middle Lake is the one everyone photographs, glacier visible across the water, about 3 km in. Upper Lake is the full day, roughly 10 km round trip.

Here's the part nobody posts about: you need a day-use pass before you drive up. The parking lot runs on reservations, not walk-ups — book before you leave, not from the road, or you're turning around at the pullout with nowhere else to go. Full breakdown of how the pass system actually works, first comment.

Tag someone who needs to see this before their next Joffre Lakes trip. 👇

First comment: How the Joffre Lakes day-use pass actually works → bestseatosky.com/blog/joffre-lakes-day-pass-what-to-know

📍 Joffre Lakes Provincial Park

#joffrelakes #pemberton #duffeylakeroad #seatosky #explorebc #britishcolumbia #hellobc #bctravel #hikingbc #glacierlake

---

## Media Notes

Joffre Lakes is past Pemberton on Duffey Lake Road — technically just beyond the core corridor towns, but on the same Highway 99 route Best Sea to Sky covers end to end. Check `carousel-photos/pemberton/` locally for existing shots before defaulting to stock — Rick may already have Joffre Lakes photos from a past trip even though the trailhead itself is north of Pemberton proper, since it's the same general area trip.

If nothing exists yet in the local library, this is a case for **Stock — search "Joffre Lakes"**: the turquoise colour of the water is the entire visual hook for this topic, and it's a specific, identifiable, heavily photographed real location (not a lookalike or generic alpine lake), so licensed stock of the actual Middle or Upper Joffre Lake is an acceptable fallback per the brand book. Search Dreamstime for "Joffre Lakes" or "Joffre Lakes Middle Lake" specifically — confirm the image is actually Joffre Lakes before using it, not a similar-looking glacial lake elsewhere in BC.

If Rick does have real footage or wants to shoot it on a future visit, **Your media** would outperform stock:
1. The flat walk-in to Lower Lake, handheld, 8–10 sec
2. The reveal moment arriving at Middle Lake's shoreline — the turquoise water and glacier in frame — 10–15 sec, this is the hero shot/clip
3. A detail shot of the trail surface/terrain past Lower Lake (roots, rock, any snow) for the "sturdy footwear" point — 5–8 sec
4. The parking lot or trailhead signage, for context and to visually anchor the day-pass message — 5–8 sec

If a Reel gets built from this, lead with the Middle Lake reveal (clip 2) in the first second — that shot alone is the reach driver, per content-strategy.md's "Reels lead" rule, and the day-pass information works better as text overlay/caption than as something to show on camera.
