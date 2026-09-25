# Draft batch — 2026-09-25

**Topic:** Tantalus Lookout — the Highway 99 pull-out between Squamish and Whistler with the postcard view of the Tantalus Range, and why it's worth the two-minute stop most people drive past.

**Why this topic fits the rotation:** Recent drafts have leaned hard on waterfalls and lakes (Shannon Falls, Porteau Cove, One Mile Lake, Nairn Falls) and food stops (farmers markets, patios, farm stands). Nothing yet covers the drive itself as its own topic, which content-strategy.md flags directly — "rotate topics across Squamish, Whistler, Pemberton, Britannia Beach, and the drive itself." Tantalus Lookout is a genuinely different angle: no trail, no admission, just a pull-out most visitors blow past doing 100 km/h, which fits the brand's "insider knowledge you won't find in a brochure" positioning.

---

## Blog Post (SQL)

```sql
-- Best Sea to Sky — new blog post
-- Paste into Supabase SQL Editor. Does NOT set status to 'published' —
-- left as 'draft' so Rick reviews and flips status before it goes live.
-- featured_image left NULL: Rick needs a real photo of the Tantalus Range
-- from the actual lookout — brand book rule is no stock imagery of generic
-- mountains standing in for a specific corridor location.

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
  'tantalus-lookout-highway-99',
  'Tantalus Lookout: The Highway 99 Pull-Out Everyone Speeds Past',
  'Between Squamish and Whistler, a small pull-out on Highway 99 has one of the best mountain views on the whole drive. Here''s why it''s worth the two-minute stop.',
  NULL, -- TODO(Rick): real photo of the Tantalus Range from the lookout itself — no stock/generic mountain shots
  'You''ve driven past it a dozen times without knowing it was there. Tantalus Lookout is a small paved pull-out on Highway 99 with a view of glaciers and jagged peaks that most people only ever see in a blur through the windshield.',
  '<p>The Sea to Sky Highway has a way of making every view feel like backdrop &mdash; you''re watching for merge lanes and logging trucks, not scenery, even when the scenery is doing something spectacular off to the side. Tantalus Lookout is the one spot on the whole drive built specifically so you can stop being distracted and just look.</p>

<p>It''s a small paved pull-out on the west side of Highway 99, a short drive north of Squamish, facing directly across the valley at the Tantalus Range &mdash; a wall of jagged granite peaks and hanging glaciers that most visitors assume is somewhere far more remote. It isn''t. It''s right there, visible from your car, and on a clear day it''s one of the most dramatic mountain views you''ll get anywhere on the corridor without lacing up boots.</p>

<h2>What you''re actually looking at</h2>

<p>The Tantalus Range sits across the Squamish River valley, unreached by any road, which is exactly why it still looks the way it did a century ago. The named peaks visible from the lookout include Alpha Mountain, Serratus Mountain, and Mount Tantalus itself, along with the glaciers that feed the valley below. [VERIFY: exact peak labelling and elevations before publishing &mdash; confirm which summits are visible and identifiable from this specific pull-out, since sightlines shift with foliage and season].</p>

<p>There''s an interpretive sign at the lookout with some of this mapped out, which is worth the thirty seconds it takes to read before you get back in the car.</p>

<h2>Why it''s worth the stop</h2>

<p>Most of Highway 99''s famous viewpoints ask something of you first &mdash; a hike to Shannon Falls'' upper viewpoint, a gondola ticket, a scramble up the Chief. Tantalus Lookout asks nothing. Pull off, park, walk twenty feet, and you''re looking at glaciated peaks with zero elevation gain. That makes it one of the only stops on the corridor that works for absolutely everyone in the car &mdash; kids who won''t hike, grandparents who can''t, anyone on a tight schedule who still wants the "we saw real mountains" photo.</p>

<p>It''s also one of the few spots where you can actually see glacier ice from pavement. On a clear morning, especially early before the day''s clouds build up over the peaks, the ice fields are unmistakable even from across the valley.</p>

<h2>When to go</h2>

<p>Morning is generally your best bet for clear peaks &mdash; cloud tends to build over the Tantalus Range as the day warms up, especially in summer. If you''re driving up from Vancouver for the day, this is worth treating as your first stop rather than something to catch on the way home, when the view''s more likely to be socked in. [VERIFY: parking lot capacity and whether it fills up on summer long weekends &mdash; if it''s a small lot, worth flagging that in the post].</p>

<h2>Getting there</h2>

<p>Tantalus Lookout is a marked pull-out directly off Highway 99, on the west side heading north, [VERIFY: exact kilometre marker / distance north of Squamish town centre before publishing]. There''s no fee, no gate, and no facilities beyond the lookout itself and the interpretive sign &mdash; bring your own water if you''re making a longer stop of it.</p>

<p>It pairs naturally with a Highway 99 day &mdash; Shannon Falls and the Stawamus Chief viewpoint are a few minutes south, Brandywine Falls a bit further north toward Whistler. None of them need more than the time it takes to park, which is the whole point of a corridor built around a highway: the good stuff doesn''t require a detour, just a willingness to actually pull over.</p>',
  'Best Sea to Sky Team',
  'draft',
  '[{"question":"Where exactly is Tantalus Lookout on Highway 99?","answer":"It''s a marked pull-out on the west side of Highway 99, a short drive north of Squamish, before you reach Brandywine Falls or Whistler. [VERIFY: exact kilometre marker before publishing]."},{"question":"Is there a fee to stop at Tantalus Lookout?","answer":"No. It''s a free public highway pull-out with no gate and no facilities beyond the viewpoint and an interpretive sign."},{"question":"What mountains can you see from Tantalus Lookout?","answer":"The view faces the Tantalus Range across the Squamish River valley, including peaks like Alpha Mountain, Serratus Mountain, and Mount Tantalus, along with the glaciers that feed the valley. [VERIFY: exact peak visibility before publishing]."},{"question":"Is Tantalus Lookout wheelchair or stroller accessible?","answer":"[VERIFY: surface type and accessibility of the pull-out and viewpoint area before publishing]."}]'
);
```

---

## Facebook Post

The view everyone in this valley drives past at 100 km/h. 🌲

Tantalus Lookout is a small pull-out on Highway 99 just north of Squamish — no hike, no ticket, no gate. You park, walk twenty feet, and you're looking straight across the valley at the Tantalus Range: jagged granite peaks and glaciers that most people assume you'd need a multi-day trip to see.

It's one of the only stops on the whole corridor that works for everyone in the car, including the kid who won't hike and the grandparent who can't. Go in the morning if you can — cloud tends to build over the peaks as the day warms up.

Full stop details (and what else to pair it with on a Highway 99 day) linked in the first comment. 👇

First comment: [link to bestseatosky.com/eat/... wait — this is a Visit/drive post, so: link to bestseatosky.com/visit/tantalus-lookout-highway-99 or the actual blog URL once slug is live: bestseatosky.com/blog/tantalus-lookout-highway-99]

📍 Tantalus Lookout, Highway 99, Squamish, BC

#tantalusrange #highway99 #seatosky #squamish #explorebc #britishcolumbia #hellobc #bctravel #roadtripbc #beyondvancouver

---

## Instagram Post

**Caption:**

The mountains you've driven past without ever pulling over. 🏔️

Tantalus Lookout, Highway 99 — a small pull-out just north of Squamish with zero elevation gain and one of the best views on the whole corridor. No hike, no gondola, no fee. Just glaciers and granite peaks across the valley, right from the parking lot.

Go early if you can — the peaks tend to cloud over as the day heats up.

Link to the full guide (plus what to pair it with on a Highway 99 day) is in our first comment. ⬇️

First comment: Link to the Tantalus Lookout guide → [bestseatosky.com/tantalus-lookout-highway-99]

📍 Tantalus Lookout, Highway 99, Squamish, BC

#tantalusrange #highway99 #seatosky #squamish #explorebc #britishcolumbia #hellobc #bctravel #roadtripbc #beyondvancouver

---

## Media Notes

**Your media (preferred):** Check `carousel-photos/` locally — particularly a Squamish- or Highway 99-labelled subfolder (e.g. `carousel-photos/chief/` or a Squamish/highway folder) — for existing shots of the Tantalus Range before defaulting to anything else below. Rick likely already has drive-by or pull-out shots from this stretch of highway.

If new footage is needed, this is a strong Reel candidate per content-strategy.md's format priority:
- One 10–15 sec vertical clip: pulling into the lookout and the reveal of the mountain view as you get out of the car (handheld, natural motion, no need for gimbal)
- One 8–10 sec clip: a slow phone pan across the Tantalus Range peaks, steady hand, held at the railing/interpretive sign
- One close-up: the interpretive sign itself (useful as a text-overlay source for peak names once labelling is verified)
- Optional 5 sec clip: a car passing on the highway behind, to sell the "you drive right past this" hook
- Audio: trending instrumental/ambient track works fine here — no voiceover needed, let the reveal do the work; add on-screen text like "you've driven past this a hundred times" as the hook overlay in the first 2 seconds

**Stock — search "Tantalus Range" (fallback only):** If no usable footage turns up locally, licensed stock of the actual Tantalus Range (verify it's shot from or near the real lookout, not a lookalike range) is an acceptable fallback per the brand book — never a generic/unrelated mountain image.

**Blotato can build:** A carousel version could work as a secondary post — pull the "why it's worth the stop" and "when to go" sections from the blog into 3–4 slide cards in brand colours (Emerald/Slate), with a real photo swapped onto the cover slide once Rick has one, and a follow CTA on the last slide.
