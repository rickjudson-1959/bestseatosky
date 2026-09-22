# Draft batch — 2026-09-22

**Topic:** One Mile Lake Park, Pemberton — the easy loop-trail-and-swim spot right at the edge of the village, distinct from the farm stand loop and Nairn Falls posts already covered.

**Why this topic fits the rotation:** Pemberton has two posts in the folder already (farm stand loop, Nairn Falls) but neither is a flat, family-friendly walk-and-swim spot — this fills that gap without repeating either angle. Britannia Beach, Squamish, and Whistler are all more recently or more heavily covered (see folder listing), so Pemberton is the right pick to keep the rotation balanced, and this is a genuinely different activity (an easy lake loop, not a farm route or a waterfall hike).

---

## Blog Post (SQL)

```sql
-- Best Sea to Sky — new blog post
-- Paste into Supabase SQL Editor. Does NOT set status to 'published' —
-- left as 'draft' so Rick reviews and flips status before it goes live.
-- featured_image left NULL: Rick needs a real photo of the One Mile Lake
-- boardwalk or swimming dock — brand book rule is no stock imagery
-- standing in for a specific corridor location.

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
  'one-mile-lake-pemberton',
  'One Mile Lake, Pemberton: The Easy Walk-and-Swim Loop Right in the Village',
  'One Mile Lake Park in Pemberton has a flat boardwalk loop, a swimming dock, and a dog off-leash area — all a five-minute walk from the village centre, no trailhead drive required.',
  NULL, -- TODO(Rick): real photo of the boardwalk or swimming dock at One Mile Lake, no stock
  'Most Pemberton day trips point you toward Nairn Falls or a farm stand loop out in the valley. One Mile Lake is the one you can do without getting back in the car — a flat loop trail and a swimming dock a few minutes on foot from the middle of the village.',
  '<p>If you''ve already done the drive up to Nairn Falls or spent an afternoon working through the farm stands out along the valley road, One Mile Lake is the Pemberton stop that doesn''t ask you to get back in the car. It sits right at the edge of the village &mdash; close enough that you can walk there from most of downtown Pemberton &mdash; and it''s built for exactly the kind of low-effort afternoon that a road trip needs between the bigger hikes.</p>

<h2>What''s actually there</h2>

<p>The loop around the lake is flat and mostly boardwalk through the wetland sections, which makes it one of the few trails on this corridor that genuinely works for strollers, small kids, and anyone who doesn''t want an elevation gain conversation before they commit. [VERIFY: current loop distance and whether the full boardwalk is open this season &mdash; check the Squamish-Lillooet Regional District park page before publishing] Partway around, there''s a swimming dock and a gravel beach area where locals actually swim in summer &mdash; it doesn''t have the postcard drama of a glacier-fed lake, but the water warms up more than most lakes on the highway side of the corridor, which is exactly why it''s a local favourite rather than a tourist stop.</p>

<p>There''s also a fenced off-leash dog area near the parking lot, which makes this one of the easier stops on the corridor if you''re travelling with a dog and need somewhere it can actually run.</p>

<h2>How long to budget</h2>

<p>The full loop is a 30 to 45 minute walk at an easy pace. Add another 30 minutes if you brought towels and the kids want to swim. It''s a good afternoon stop after a bigger morning hike, or a stretch-the-legs break if you''re passing through Pemberton on the way further up the highway.</p>

<h2>Good to know before you go</h2>

<p>There''s a parking lot right at the park with direct access to the trail and the swimming area, and it''s an easy walk from most of the village if you''re already staying or eating in town. [VERIFY: current parking lot size and whether it fills on summer weekends &mdash; confirm before publishing] Bring your own water and snacks; there''s no concession at the lake itself, though the farm stands and cafes in the village are a short walk or drive away.</p>

<p>This isn''t a hidden gem in the sense of being unknown &mdash; it''s where Pemberton locals actually go on a hot afternoon. The gap is that most visitors don''t know it''s there because it never makes the "must-see waterfall" list. If you''ve got 45 minutes in Pemberton and don''t want to drive anywhere, this is it.</p>',
  'Best Sea to Sky',
  'draft',
  '[
    {"question": "Is One Mile Lake Park good for kids?", "answer": "Yes. The loop trail is flat and mostly boardwalk, which makes it manageable for strollers and small children, and there is a swimming dock and gravel beach for hot afternoons."},
    {"question": "How long does the One Mile Lake loop take?", "answer": "The full loop takes about 30 to 45 minutes at an easy walking pace, longer if you stop to swim."},
    {"question": "Can you swim at One Mile Lake?", "answer": "Yes, there is a swimming dock and beach area that locals use in summer. The water tends to warm up more than the glacier-fed lakes elsewhere on the corridor."},
    {"question": "Is One Mile Lake close to Pemberton village?", "answer": "Yes, it is at the edge of the village and walkable from most of downtown Pemberton, with a parking lot at the park for anyone driving in."}
  ]'::jsonb
);
```

---

## Facebook Post

Nairn Falls gets all the attention, but One Mile Lake is the Pemberton stop you don't need to drive to.

Flat boardwalk loop, a swimming dock the locals actually use, and a dog off-leash area — all a five-minute walk from the village centre. No trailhead, no parking lot search, no elevation gain.

30 to 45 minutes for the loop. Longer if you brought towels. It's the easy afternoon stop between the bigger hikes, not the postcard shot — and that's exactly why it works.

Full write-up with what to expect — link in the first comment.

📍 One Mile Lake Park, Pemberton

What's your go-to easy stop when you don't feel like driving anywhere?

---

## Instagram Post

**Caption:**

Everyone drives to Nairn Falls. Locals walk to One Mile Lake. 🌲

Flat boardwalk loop right at the edge of Pemberton village, a swimming dock that actually warms up in summer, and a dog off-leash area — no trailhead drive required.

30 to 45 minutes for the full loop, longer if you swim. We've got the details on parking and the trail in the guide — link in our first comment.

Tag your dog-walking, easy-afternoon travel buddy. 👇

First comment: Full guide to One Mile Lake → bestseatosky.com/blog/one-mile-lake-pemberton

📍 One Mile Lake Park, Pemberton

#onemilelake #pemberton #pembertonbc #seatosky #explorebc #britishcolumbia #hellobc #bctravel #familytravelbc #dogfriendlybc

---

## Media Notes

**Check `carousel-photos/pemberton/` locally for existing photos before defaulting to a shot list or stock search** — Rick's photo library is gitignored and not visible from this repo, so confirm what's already there for One Mile Lake or general Pemberton village shots before shooting anything new.

If nothing usable exists yet: **Your media** — shot list for the Reel (vertical, phone is fine):

1. Walking onto the boardwalk section, lake visible through the trees — 6–8 sec
2. Wide shot of the lake from the swimming dock, mountains behind — 8–10 sec
3. Feet-first shot stepping off the dock into the water, or a hand trailing in the water from the dock edge — 5–8 sec
4. The off-leash dog area if a dog is available to feature — 5–8 sec, genuinely mid-activity, not posed
5. Closing shot: walking back toward the village with a building or storefront visible, signalling "five minutes from downtown" — 6–8 sec

Total run time roughly 30–40 sec. Text overlay on the opening shot should carry the "5 minutes from the village, no trailhead" payoff line since that's the surprising fact people will screenshot or save. Trending audio works fine here; no voiceover needed.

If no swimming footage is available in season, cut that shot and lean the caption on the boardwalk-and-dog-park angle instead — don't imply water footage that wasn't actually shot.
