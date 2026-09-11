# Draft batch — 2026-09-11

**Topic:** Squamish's best post-hike patios — where to land after coming down off the Chief, the Sea to Sky Gondola, or the Squamish Estuary trails, told through the food and drink, not the trail stats.

**Why this topic fits the rotation:** Recent drafts (Aug 28 Train Wreck, Sept 1 Brandywine, Sept 4 Nairn Falls, Sept 8 Whistler Farmers Market) have leaned hard on Whistler and Pemberton nature stops. Squamish has had exactly one prior draft (Aug 25, swimming holes) and this is a different angle again — Eat category instead of Play/Visit, indoors-adjacent instead of trailhead. It also puts the brand's own calibration line to work directly: the brand book cites "the best post-trail patios" as an example of on-voice copy, so this is the guide that line was describing.

---

## Blog Post (SQL)

```sql
-- Best Sea to Sky — new blog post
-- Paste into Supabase SQL Editor. Does NOT set status/published_at to 'published' —
-- left as 'draft' so Rick reviews and flips status before it goes live.
-- featured_image left NULL: Rick needs a real photo of one of these patios
-- (shot mid-service, people at the table, not empty at 10am) — brand book
-- rule is no stock imagery standing in for a specific corridor location.

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
  'squamish-post-hike-patios',
  'Squamish''s Best Post-Hike Patios: Where to Land After You Come Down',
  'You came down off the Chief or the Gondola and you want a beer and something that isn''t a granola bar. Here''s where Squamish locals actually go afterward — patios, not podiums.',
  NULL, -- TODO(Rick): real photo of one of these patios mid-service, people at the table, natural light
  'Squamish has more vertical feet of hiking within twenty minutes of downtown than most towns have sidewalks, which means it also has a very specific kind of hungry, sweaty, slightly sunburned customer walking through its doors most afternoons. Here''s where that customer actually goes.',
  '<p>Everyone plans the hike. Almost nobody plans what happens after it, and that''s usually the part that decides whether the day felt complete or just tiring. Squamish has built an entire second economy around the moment you get back to the parking lot &mdash; the patios, the taprooms, the picnic tables in the sun &mdash; and most of it is a five-minute drive from wherever your trailhead was. Here''s where locals actually point people.</p>

<h2>If you just came down the Chief</h2>

<p>The Stawamus Chief is the one everyone drives up for, and it is also the one that leaves you the most wrecked by the time you''re back at the base. You don''t want a fifteen-minute drive after that &mdash; you want something close. Downtown Squamish is a short hop from the Chief parking lot, and this is exactly the crowd the patios there are built for: people in trail runners who haven''t showered yet and don''t care. Order something cold first, food second, and don''t feel bad about how much of the table is taken up by hiking poles.</p>

<h2>If you rode the Gondola instead</h2>
 
<p>The Sea to Sky Gondola crowd is a different kind of tired &mdash; less legs, more standing around at a viewpoint for an hour in the wind. That crowd wants a proper sit-down more than a quick pint, and there''s a base-area option right at the Gondola itself if you don''t want to get back in the car at all. It''s convenient rather than a hidden gem, and that''s fine &mdash; sometimes the honest answer is the one closest to where you already are.</p>

<h2>If you did the Estuary or the dyke trails</h2>

<p>The flatter walks &mdash; the Squamish Estuary boardwalk, the dyke trail out toward the water &mdash; end you up closer to the industrial side of downtown than the highway side, and that''s where the town''s breweries cluster. This is the low-key option: no crowds fighting for the same four parking spots the Chief trailhead has, a patio that isn''t trying to turn tables fast, and usually a mountain view over the fence instead of through it. For breweries specifically, look for the ones with a proper flight on the table and the actual tanks or mountains visible behind the bar &mdash; that''s the tell that it''s a working brewery, not a tap wall bolted onto a restaurant.</p>

<h2>What makes a patio a "post-hike" patio</h2>

<p>It isn''t the menu. It''s three things: dogs are welcome (most Squamish hikers have one), nobody looks at you sideways for trail dirt on your boots, and the beer selection includes at least one local brewery rather than just the national brands. [VERIFY: current dog-on-patio policy and specific local beers on tap before publishing &mdash; both change seasonally and by ownership, and this is exactly the kind of specific claim the brand book says never to guess at].</p>

<h2>The one thing to know before you go</h2>

<p>Squamish patios fill up fast on hot weekend afternoons, for the obvious reason &mdash; everyone comes down off the mountain around the same two-hour window. If you can shift your hike start time even 30 minutes earlier than the crowd, you land at the patio before the rush instead of after it. It''s a small trick, but it''s the difference between a table right away and a twenty-minute wait holding a growler bag.</p>

<h2>The bigger picture</h2>

<p>None of this is really about the food. It''s about the fact that a good day on the Chief or the Gondola or the Estuary doesn''t actually end at the trailhead sign &mdash; it ends at a table, with your legs up, looking back at whatever you just climbed. Squamish has enough of those tables now that you can pick the one that matches how tired you actually are.</p>',
  'Best Sea to Sky',
  'draft',
  '[{"question":"Are Squamish patios dog-friendly after a hike?","answer":"Most are, but policies vary by patio and season — check before you show up with a wet, sandy dog. [VERIFY before publishing]"},{"question":"What time should I plan to arrive to avoid a wait?","answer":"Weekend afternoons between roughly 2 and 5pm are the busiest, when most Chief and Gondola hikers are coming down at once. Arriving before or after that window gets you a table faster."},{"question":"Is it easy to get a patio table right at the Sea to Sky Gondola base?","answer":"There is a sit-down option right at the base area, which is the most convenient choice if you don''t want to drive anywhere after coming down."}]'
);
```

---

## Facebook Post

The Stawamus Chief will humble you. Your legs know it by the parking lot.

Here's the part nobody plans: what happens *after*. Squamish has built a whole second economy around the moment hikers get back down — patios, taprooms, picnic tables in the sun, all a five-minute drive from wherever you started.

Coming down the Chief? Stay close to downtown, you don't want a long drive after that. Rode the Gondola instead? There's a sit-down option right at the base if you don't want to get back in the car at all. Did the flatter Estuary or dyke trails? That's brewery territory — fewer crowds, a proper flight on the table, mountains over the fence instead of through it.

The tell of a real post-hike patio: dogs welcome, nobody blinks at trail dirt on your boots, and at least one local beer on tap alongside the national brands.

One trick that actually works — shift your hike start time 30 minutes earlier than everyone else, and you beat the 2-5pm rush down the mountain. Table right away instead of a 20-minute wait holding a growler bag.

Full guide (with the "if you did X trail, go here" breakdown) linked in the first comment 👇

What's your go-to patio after coming down off the Chief? Tag someone who always orders food before you've even sat down.

📍 Squamish, BC

---

## Instagram Post

**Format:** Carousel (5–6 slides) — list-style "save this" content, which content-strategy.md ranks above static for non-Reel formats.

**Caption:**

You did the Chief. Your legs are done. Now what? 🍽️

Squamish has a whole second economy built around the moment hikers get back to the parking lot — and most of it's five minutes from wherever your trail started.

Swipe for the locals' answer to "where do I go after ___":
→ Came down the Chief? Stay close to downtown — you don't want a long drive after that
→ Rode the Gondola? There's a sit-down spot right at the base
→ Did the Estuary or dyke trails? That's brewery territory — quieter, mountain views over the fence

The real tell of a post-hike patio: dogs welcome, nobody cares about trail dirt, at least one local beer on tap.

Pro tip: start your hike 30 min earlier than everyone else and you beat the 2-5pm rush down the mountain. Table right away, no growler-bag wait.

Full guide → link in first comment 👇

Tag your post-hike patio crew 👇

📍 Squamish, BC

#squamish #stawamuschief #seatoskygondola #squamishestuary #explorebc #britishcolumbia #seatosky #hellobc #bctravel #squamishbc

---

## Media Notes

**Your media (preferred) — check `carousel-photos/` locally first.** Rick keeps a real, growing photo library at `carousel-photos/chief/` and likely other Squamish-tagged folders on his machine, gitignored and not visible to this routine. Before shooting anything new, check `carousel-photos/chief/` and any Squamish-town folder for existing patio, Chief, or Gondola shots — there may already be usable material.

If new footage is needed, exact shot list for the carousel (5–6 slides, vertical 4:5 or 9:16):

1. **Cover slide** — a patio table shot from the diner's-eye view: legs up, hiking boots visible in frame, drink on the table, mountain or trees in the background. This is the hook shot — needs to read "I just finished a hike and I'm about to sit down" instantly.
2. **The Chief** — a wide shot of the Chief itself (can reuse existing corridor photography) as a section-break slide, with text overlay "Came down the Chief?"
3. **Downtown patio, mid-service** — people at tables, natural light, not empty. 1 photo or a 5-8 sec clip panning across occupied tables.
4. **Gondola base area** — the sit-down spot at the base, exterior or patio shot with the Gondola line visible if possible.
5. **Brewery/Estuary-area patio** — the flight-on-the-table shot brand book calls for: a beer flight with tanks or a mountain view behind it.
6. **Closing slide** — text-only, brand colours (Emerald 700 on Emerald 50 or Forest Deep background), "Full guide — link in comments," Best Sea to Sky logo watermark bottom-right.

If Rick doesn't have current shots of all five, **Blotato can build** the text-overlay cover and closing slides (slides 1 header text and 6) using brand colours and DM Serif Display, once real photos are dropped in for slides 2–5. Swapping in one real photo for the cover (slide 1) would outperform a fully generated one — that's the slide most likely to stop the scroll.
