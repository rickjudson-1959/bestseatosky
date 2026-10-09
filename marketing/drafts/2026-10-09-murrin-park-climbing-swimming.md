# Draft batch — 2026-10-09

**Topic:** Murrin Provincial Park — the small day-use park between Britannia Beach and Squamish that locals know as a sport-climbing and bouldering crag with a swimming lake attached, and that almost every road-tripper drives past without a second look.

**Why this topic fits the rotation:** Checked all fifteen existing files in `marketing/drafts/` before picking this. Britannia Beach/Highway 99 is the most under-covered stretch of the corridor in the existing drafts (one post, versus three-plus each for Squamish, Whistler, and Pemberton), and Murrin Park sits right on that stretch — a few minutes south of Britannia Beach, north of Squamish proper — without repeating the Britannia Beach highway-stop post or either existing Squamish angle (swimming holes, post-hike patios, Shannon Falls/Chief). It's also genuinely seasonal: October is when Squamish-corridor climbers actually prefer to be out, since summer granite gets too hot to hold and fall brings cooler temps and better friction — a real, verifiable local fact rather than a generic "fall hiking" angle.

---

## Blog Post (SQL)

```sql
-- Best Sea to Sky — new blog post
-- Paste into Supabase SQL Editor. Does NOT set status to 'published' —
-- left as 'draft' so Rick reviews and flips status before it goes live.
-- featured_image left NULL: Rick needs a real photo of Browning Lake or the
-- Murrin Park crag — brand book rule is no stock standing in for a specific
-- corridor location. Check carousel-photos/Squamish/ and any Britannia
-- Beach/Murrin-area folders locally first (gitignored, not visible to this
-- routine) before defaulting to a stock search.

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
  'murrin-park-climbing-swimming',
  'Murrin Park: The Crag and Swimming Lake Most Drivers Never Notice',
  'Between Britannia Beach and Squamish, Murrin Provincial Park packs a real climbing crag and a swimming lake into one small pullout most people drive straight past. Here''s what''s actually there and why fall is the best time to go.',
  NULL, -- TODO(Rick): real photo of Browning Lake or the Murrin crag, no stock
  'Most of the traffic on this stretch of Highway 99 is looking for the Stawamus Chief or the Britannia Beach mill building and blows right past a small provincial park in between that locals treat very differently — as one of the best small crags on the corridor, with a lake to cool off in afterward.',
  '<p>Drive the stretch of Highway 99 between Britannia Beach and Squamish and you''ll pass a small, easy-to-miss pullout on the water side of the road without a second thought &mdash; there''s no mill building to look at, no waterfall visible from the car. That''s Murrin Provincial Park, and it''s one of the corridor''s better-kept locals'' secrets: a genuine sport-climbing and bouldering crag wrapped around a small lake, all of it accessible from a parking lot you can actually find a spot in most days.</p>

<h2>What''s actually there</h2>

<p>Murrin Park is small by provincial-park standards &mdash; this isn''t an all-day wilderness trip, it''s a focused stop. The centrepiece is Browning Lake, a small, calm lake with a short loop trail around it, a floating log dock area, and water that warms up through the season in a way Howe Sound never does. Ringing the park are granite bluffs that make up one of the most concentrated sport-climbing and bouldering areas in the whole Squamish corridor [VERIFY: current route count and difficulty range at Murrin &mdash; check the Squamish climbing guidebook or a current local climbing shop before publishing], with routes visible from the parking lot and short approaches that make it popular with climbers who don''t want to burn an hour just getting to the rock.</p>

<h2>Why fall is actually the better time to go</h2>

<p>Most people assume climbing season peaks in July and August, and for a lot of this corridor that''s backwards. Squamish-area granite holds heat, and by mid-summer the rock can be too warm and greasy to climb well on, especially on south- and west-facing routes. Once the weather cools into fall, friction improves, the crowds thin out, and the approach trail and lakeside picnic spots are a lot more pleasant without peak-summer heat. If you''ve got climbing shoes and you''ve been putting off a Murrin trip because summer felt like the obvious window, October is arguably the better call.</p>

<h2>You don''t need to climb to make this worth the stop</h2>

<p>Murrin works as a non-climbing stop too, and that''s easy to miss if all you''ve heard about the park is the crag reputation. The Browning Lake loop is flat, short, and genuinely pleasant &mdash; a fifteen- to twenty-minute walk with a bench or two along the way [VERIFY: current loop trail length and estimated walking time before publishing]. It''s a reasonable stretch-your-legs stop with kids who've been in a car seat since Vancouver, and a quieter alternative to the packed Shannon Falls/Chief lot a few minutes further up the highway on a busy weekend. Bring a picnic; there are tables near the lake.</p>

<h2>Good to know before you go</h2>

<p>Murrin is day-use only &mdash; no camping &mdash; and the parking lot is small, so it fills up on sunny weekends even though most drivers don''t know the park is there. [VERIFY: current BC Parks day-use fee or pass requirement for Murrin before publishing] There''s no food or services at the park itself, so treat it as a stop between Britannia Beach''s coffee options and whatever''s waiting in Squamish, not a destination with its own amenities. If you''re coming specifically to climb, check current local conditions and access notes before you go &mdash; approach trails and specific crag areas can be affected by seasonal closures. [VERIFY: current access/closure status for Murrin''s climbing areas before publishing]</p>

<p>The honest version of this one is simple: Britannia Beach gets the photo stop and Squamish gets the big crowds, and the small park sitting right between them gets driven past by almost everyone. If you climb, or you just want a quieter lake stop than the busy lots further up the highway, Murrin is worth the five-minute pullout.</p>',
  'Best Sea to Sky',
  'draft',
  '[
    {"question": "Where is Murrin Provincial Park?", "answer": "It is on Highway 99 between Britannia Beach and Squamish, a small day-use park on the water side of the road."},
    {"question": "Can you swim at Murrin Park?", "answer": "Yes. Browning Lake, the small lake at the centre of the park, warms up through the season and has a short loop trail and dock area around it."},
    {"question": "Is Murrin Park good for climbing?", "answer": "Yes. It is one of the more concentrated sport-climbing and bouldering areas on the Squamish corridor, with short approaches from the parking lot, which makes it popular with climbers short on time."},
    {"question": "Is fall a good time to visit Murrin Park?", "answer": "Often better than summer. Squamish-area granite can get too warm and greasy to climb well on in peak summer heat, so cooler fall temperatures tend to improve friction and conditions, along with smaller crowds."},
    {"question": "Can you camp at Murrin Provincial Park?", "answer": "No, Murrin is day-use only."}
  ]'::jsonb
);
```

---

## Facebook Post

Everyone on this stretch of Highway 99 is looking for Britannia Beach's mill building or the Stawamus Chief. Almost nobody notices the small park sitting right between them.

Murrin Provincial Park packs a real sport-climbing and bouldering crag and a calm little swimming lake into one easy-to-miss pullout — and if you've been waiting for peak summer to go climb it, you've actually got the season backwards. Cooler fall weather means better rock friction and way fewer people in the parking lot.

Full breakdown of what's there, whether you climb or not — link in the first comment.

📍 Murrin Provincial Park, Squamish

Anyone else just found out this park exists after driving past it a hundred times?

---

## Instagram Post

**Caption:**

The small pullout between Britannia Beach and Squamish that nobody stops at has a real climbing crag and a swimming lake hiding behind it. 🧗

Murrin Provincial Park wraps granite bluffs around Browning Lake — short approaches for climbers, a flat lakeside loop for everyone else, and way less traffic than the big lots further up Highway 99. And contrary to what you'd think, fall is actually the better season here: the rock holds less heat, friction improves, and the crowds thin right out.

No camping, no services on site — just bring a picnic and, if you climb, your shoes.

Full guide to what's actually at Murrin — link in our first comment.

Tag someone who's driven this stretch a hundred times and never once pulled in. 👇

First comment: Full guide to Murrin Park → bestseatosky.com/blog/murrin-park-climbing-swimming

📍 Murrin Provincial Park, Squamish

#murrinpark #browninglake #squamish #seatosky #climbingbc #explorebc #britishcolumbia #hellobc #bctravel #howesound

---

## Media Notes

Check `carousel-photos/Squamish/` and any Britannia Beach-area folders locally before defaulting to anything below — Rick's photo library may already have shots from this exact stretch of highway, even if not labeled "Murrin" specifically, since it's a short detour off a drive he's likely shot before.

If nothing usable turns up there, this is **Your media** — the whole hook depends on showing a specific, real place people don't recognize, so a generic climbing or lake stock image would undercut it:

1. The pullout/parking area from the highway side, showing how easy it is to miss — 5–8 sec
2. Walking shot along the Browning Lake loop trail, flat and calm — 8–10 sec
3. Wide shot of the lake with the granite bluffs behind it — 8–10 sec
4. If available: a climber on one of the crag routes, even a short clip from a distance — 6–10 sec (doesn't need to be a hard route, just needs to show real climbing happening)
5. Optional closer: a hand on the rock/chalk bag detail to signal "this is a real crag" — 5 sec

Total run time roughly 30–40 sec. On-screen text overlay works well for the "fall is actually the better season" line, since that's the counterintuitive hook most people will stop to read. If no climbing footage is available, cut that clip and keep the caption's "if you climb" framing honest rather than implying climbing footage that wasn't shot.

If Rick's library doesn't have Murrin or Browning Lake and a shoot isn't realistic before this posts, fall back to **Stock — search "Murrin Park Squamish"** or "Browning Lake Squamish" specifically (genuinely the real location, per brand book) rather than a generic granite-crag or forest-lake stock image.
