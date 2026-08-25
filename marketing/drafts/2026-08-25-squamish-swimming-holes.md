# Draft batch — 2026-08-25

**Topic:** Squamish's swimming holes — Alice Lake Provincial Park, Cat Lake, and Browning Lake — a locals'-eye guide to where to cool off on a hot Squamish day.

**Why this topic fits the rotation:** Existing drafts cover Britannia Beach/Highway 99 (2026-08-18) and Pemberton's farm-stand loop (2026-08-21) — Squamish itself hasn't had a draft yet, and this is a genuinely different angle from waterfalls, farms, or historic sites. It's also seasonally timely (late August, still peak swimming weather) and naturally carousel-shaped ("save this list of lakes"), which content-strategy.md ranks above static photos.

---

## Blog Post (SQL)

```sql
-- Best Sea to Sky — new blog post
-- Paste into Supabase SQL Editor. Does NOT set status/published_at to 'published' —
-- left as 'draft' so Rick reviews and flips status before it goes live.
-- featured_image left NULL: Rick needs a real photo of one of these lakes
-- (Alice Lake, Cat Lake, or Browning Lake) — brand book rule is no stock
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
  'squamish-swimming-holes-guide',
  'Squamish''s Best Swimming Holes: Where Locals Actually Cool Off',
  'Skip the crowded beach parking lot. Here''s where Squamish locals actually swim — Alice Lake, Cat Lake, and Browning Lake — with parking, dog rules, and what the water''s really like.',
  NULL, -- TODO(Rick): real photo of Alice Lake, Cat Lake, or Browning Lake — no stock
  'Squamish sits between an ocean too cold to swim in and a river too fast to trust, so the actual swimming happens at a handful of lakes most visitors drive straight past. Here''s where locals go, and what to expect when you get there.',
  '<p>Squamish looks like it should be full of swimming spots &mdash; it''s sandwiched between Howe Sound and the Stawamus Chief, with the Squamish River running right through town. In practice, the ocean here is glacial runoff cold even in August and the river moves fast enough that locals don''t treat it as a swimming spot. The real swimming happens at a short list of lakes, most of them a five- to fifteen-minute drive from downtown, and most tourists never make it to any of them.</p>

<h2>Alice Lake Provincial Park</h2>

<p>This is the one everyone eventually finds, and it''s popular for a reason &mdash; a sandy beach, a roped-off swimming area, washrooms, and four connected lakes (Alice, Stump, Fawn, and Edith) if you want to walk further than the main beach and get some space. Alice Lake itself warms up through the summer in a way the ocean never will, and the loop trail around it is flat enough for kids. The tradeoff is the crowd: this is the best-known swimming spot on the corridor, so the parking lot fills early on hot weekends. [VERIFY: current BC Parks day-use pass/reservation requirements for Alice Lake before publishing &mdash; this has changed park to park and season to season in recent years, so confirm on the BC Parks site before telling people to just show up].</p>

<h2>Cat Lake</h2>

<p>Smaller, quieter, and known mostly to people who live here. Cat Lake sits up a forest road above town and doesn''t have Alice Lake''s facilities &mdash; no lifeguard, no snack stand, just a dock, a rope swing locals have maintained informally for years, and a lot fewer people. It''s the pick if Alice Lake''s parking lot is already full, or if the whole point of your afternoon is not sharing a beach with two hundred other people. [VERIFY: current road/access conditions to Cat Lake before publishing &mdash; forest service roads change condition season to season and it''s worth confirming it''s currently passable in a regular car].</p>

<h2>Browning Lake, Murrin Provincial Park</h2>

<p>Most people who pull into Murrin Provincial Park are there for the climbing &mdash; it''s one of the corridor''s best learn-to-climb crags. Fewer realize there''s a small, warm lake right at the base of it. Browning Lake is shallow enough to warm up fast, small enough to swim across in a few minutes, and it comes with the bonus of watching climbers work the rock above you while you float. Parking is limited and shared with the climbers, so it''s a weekday or early-morning spot more than a Saturday-afternoon one.</p>

<h2>What none of these have in common with the ocean</h2>

<p>If you''re used to swimming somewhere warm, the Squamish rule is simple: the lakes are for swimming, the ocean and the river are for looking at. Howe Sound stays cold enough that a quick dip is more bracing than relaxing even in August, and the Squamish River''s current is stronger and colder than it looks from the bank. None of that''s a warning against the water &mdash; it''s just why locals default to the lakes.</p>

<h2>Bring</h2>

<p>Cash or a card for park fees where they apply, a towel, water shoes if you''ve got sensitive feet (lake bottoms here are more rock and root than sand), and bug spray for the walk in. Dogs are welcome at some of these and restricted at others by season. [VERIFY: current dog rules per park &mdash; BC Parks changes on-leash/off-leash and seasonal dog restrictions at Alice Lake in particular, so confirm before publishing].</p>',
  'Best Sea to Sky Team',
  'draft',
  '[{"question":"Which Squamish lake is best for kids?","answer":"Alice Lake Provincial Park — it has a sandy beach, a roped-off shallow swimming area, washrooms, and a flat loop trail, which makes it the easiest option with young kids."},{"question":"Is the ocean in Squamish good for swimming?","answer":"Not really — Howe Sound stays cold even in summer. Locals swim in the lakes (Alice Lake, Cat Lake, Browning Lake) instead of the ocean or the Squamish River."},{"question":"Do I need a reservation for Alice Lake?","answer":"[VERIFY: confirm current BC Parks day-use pass/reservation requirements before publishing — this has changed in recent years and should be checked on the BC Parks site]."},{"question":"Are dogs allowed at these lakes?","answer":"Rules vary by park and season. [VERIFY: confirm current dog rules for each park before publishing]."}]'::jsonb
);
```

---

## Facebook Post

Squamish looks like it should be full of swimming spots — ocean on one side, a river running through town — but the ocean's glacial-runoff cold even in August and the river's faster than it looks. The actual swimming happens at three lakes most visitors never find.

Alice Lake is the one everyone eventually discovers — sandy beach, four connected lakes if you want to walk further, but the parking lot fills fast on hot weekends. Cat Lake is the quieter backup locals use instead. And Browning Lake, right at the base of Murrin's climbing walls, is small enough to warm up fast and comes with a free show of climbers working the rock above you.

We mapped all three — where to park, what the water's actually like, and what to bring. Link in the first comment.

Which one's your go-to? 👇

**First comment:** Squamish's swimming holes, mapped 👉 bestseatosky.com/blog/squamish-swimming-holes-guide

**Location tag:** Alice Lake Provincial Park, Squamish, BC

---

## Instagram Post

**Format:** Carousel (5–7 slides) — list/loop content, ranked above static per content-strategy.md.

**Caption:**

The ocean here is glacial-runoff cold even in August. This is where Squamish actually swims. 🏊

Three lakes, all a short drive from downtown: Alice Lake (the popular one — sandy beach, room to spread out if you walk to the back lakes), Cat Lake (locals' quiet backup when Alice Lake's lot is full), and Browning Lake (warm, small, and right at the base of Murrin's climbing walls).

Full guide — parking, crowds, what to bring — link in our first comment 💧

**First comment:** Squamish's swimming holes, mapped 👉 bestseatosky.com/blog/squamish-swimming-holes-guide

**Location tag:** Alice Lake Provincial Park, Squamish, BC

**Hashtags:** #squamish #alicelake #squamishbc #murrinpark #seatosky #explorebc #britishcolumbia #hellobc #bctravel #vancitynow

---

## Media Notes

**Check `carousel-photos/chief/` and any Squamish-labeled folders locally first** — Rick's local photo library is organized by town/landmark and may already have shots from Alice Lake, Cat Lake, or Murrin Park (the Chief folder in particular sits right next to Murrin). Confirm what's actually there before shooting or building anything new.

If nothing usable exists yet, this is **Your media** (preferred — real water and real people at these specific lakes is the whole appeal):

- 4–6 vertical stills or short (5–10 sec) clips: a wide shot of Alice Lake's beach with people in frame for scale, a close-up of the rope swing or dock at Cat Lake, a shot from Browning Lake with a climber visible on the rock above, and one "in the water" POV shot (phone in a waterproof case or shot from the shore looking out)
- Natural light, no filter needed — a bright midday shot works better here than golden hour since the whole point is "hot day, cool water"
- If any clip includes kids or other visitors, keep them un-posed and at a distance rather than identifiable close-ups, per the brand book's "not posed" imagery rule

**Fallback if Rick has nothing current:** "Blotato can build" a text-forward map/cover slide (three pins in brand colours, DM Serif Display headline: "3 Squamish swimming holes") to open the carousel, with Rick's real photos filling slides 2 onward once available — do not fabricate lake or beach photos to fill gaps.
