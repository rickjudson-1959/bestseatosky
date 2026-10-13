# Draft batch — 2026-10-13

**Topic:** West Coast Railway Heritage Park, Squamish — the heritage railway museum on Government Road with dozens of historic rail cars (including the Royal Hudson steam locomotive) you can walk through, pitched as the corridor's best rainy-day, non-hike family stop.

**Why this topic fits the rotation:** Squamish already has five posts in this folder but every one of them is a trail, a swimming hole, a climbing crag, or a patio — all outdoor and all weather-dependent. This is the first indoor-leaning, museum/culture-type post in the whole batch, and it lands in mid-October when corridor weather turns wet and "what do we do if it rains" becomes a real question for weekend visitors. It's also a deliberate contrast to the existing Train Wreck Trail post — that one is a forest walk to graffiti-covered derailed boxcars; this is an actual heritage railway museum with cars you can board. No overlap in content, just a shared word ("train") that's worth calling out rather than hiding.

---

## Blog Post (SQL)

```sql
-- Best Sea to Sky — new blog post
-- Paste into Supabase SQL Editor. Does NOT set status to 'published' —
-- left as 'draft' so Rick reviews and flips status before it goes live.
-- featured_image left NULL: Rick needs a real photo of the Royal Hudson
-- locomotive or the rail car yard at West Coast Railway Heritage Park —
-- brand book rule is no stock imagery standing in for a specific corridor
-- location.

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
  'west-coast-railway-heritage-park-squamish',
  'West Coast Railway Heritage Park: Squamish''s Best Rainy-Day Stop',
  'A heritage railway museum on Government Road in Squamish with dozens of real rail cars you can walk through, including the Royal Hudson steam locomotive — the corridor''s best answer for a wet day when the trails are out.',
  NULL, -- TODO(Rick): real photo of the Royal Hudson locomotive or the rail car yard, no stock
  'Every other Squamish stop in this guide assumes good weather. This one doesn''t. West Coast Railway Heritage Park is a few dozen real rail cars you can walk through on Government Road, and it''s the move when the forecast turns and the Chief isn''t happening.',
  '<p>Most of what gets recommended in Squamish &mdash; the Chief, the swimming holes, the post-hike patios &mdash; only works if the weather cooperates. West Coast Railway Heritage Park doesn''t care what the sky is doing, which is exactly why it''s worth knowing about before you need it.</p>

<h2>What''s actually there</h2>

<p>This is a heritage railway museum, not a theme park: a yard of dozens of real historic rail cars &mdash; cabooses, sleeper cars, dining cars, and freight equipment &mdash; that visitors can walk alongside and, for many of them, board and walk through. The headline piece is the Royal Hudson, one of the iconic steam locomotives that used to run passenger excursions up this same corridor. [VERIFY: current status of the Royal Hudson &mdash; static display or operating, and which cars are open for walk-through access this season] There''s also a model railway room that's a reliable hit with kids, and enough open ground between the cars that even a restless eight-year-old has room to move.</p>

<p>Worth saying plainly, since the name invites confusion: this isn''t the Train Wreck Trail, the forest walk to the graffiti-covered derailed boxcars across the Cheakamus River that we''ve already covered. That one''s a 20-minute hike to an unofficial, free attraction. This one is a proper museum you drive to and pay admission for, with an entirely different kind of rail car and a roof over at least some of it. Different trip, different weather requirement, both worth doing on separate visits.</p>

<h2>Who it's actually for</h2>

<p>Train-obsessed kids are the obvious audience, but it holds up for anyone who likes old machinery and doesn''t need a trail under their feet to enjoy an afternoon. It''s also one of the only Squamish stops on this whole corridor that genuinely doesn''t care if it''s raining sideways &mdash; most of the appeal is walking alongside and through parked rail cars, not standing around waiting for a view.</p>

<h2>How long to budget</h2>

<p>An hour covers the highlights for an adult moving at a normal pace. Budget closer to two hours with kids, especially if the model railway room or any hands-on exhibits hold their attention. It pairs easily with lunch in downtown Squamish before or after, since it''s a short drive from the main strip rather than out at the highway''s edge. [VERIFY: current admission pricing, hours, and season of operation before publishing]</p>

<h2>Good to know before you go</h2>

<p>There''s a parking lot on site, so this isn''t a roadside pullout situation like a lot of what we cover on this corridor. Check the current admission price and hours before you build a day around it &mdash; heritage museums on this corridor tend to run shorter hours in the off-season, and some exhibits or cars may be closed for restoration work at any given time. [VERIFY: whether the Pacific Starlight Dinner Train or any seasonal excursion service is currently operating out of this location &mdash; confirm before referencing it as a bookable experience]</p>

<p>The honest pitch: this is the stop you save for the day the forecast doesn''t cooperate, not the one you plan the whole trip around. On a corridor built almost entirely around outdoor recommendations, having one solid answer for a wet Tuesday is worth more than it sounds.</p>',
  'Best Sea to Sky',
  'draft',
  '[
    {"question": "Is West Coast Railway Heritage Park the same as the Train Wreck Trail in Whistler?", "answer": "No, they are completely different attractions despite the shared train theme. The Train Wreck Trail is a free forest hike near Whistler to a set of derailed, graffiti-covered boxcars. West Coast Railway Heritage Park is a paid heritage railway museum in Squamish with dozens of restored rail cars, including the Royal Hudson steam locomotive."},
    {"question": "Is West Coast Railway Heritage Park good for a rainy day in Squamish?", "answer": "Yes. Much of the appeal is walking alongside and through parked rail cars rather than relying on an outdoor view, which makes it one of the more weather-proof stops on the corridor."},
    {"question": "How long should I plan to spend at West Coast Railway Heritage Park?", "answer": "About an hour for an adult moving at a normal pace, or closer to two hours with kids, especially if exhibits like the model railway room hold their attention."},
    {"question": "Is West Coast Railway Heritage Park good for kids?", "answer": "Yes. The combination of real rail cars to walk through, open space to move around in, and a model railway room makes it a solid option for families, especially on a day when outdoor plans are rained out."}
  ]'::jsonb
);
```

---

## Facebook Post

Chief's socked in and the trails are a write-off? Here's the Squamish stop that doesn't care what the weather's doing.

West Coast Railway Heritage Park, right on Government Road, is a yard of real historic rail cars you can walk alongside — and through — including the Royal Hudson, one of the old steam locomotives that used to run passenger trips up this same stretch of coast. Not to be confused with the Train Wreck Trail out toward Whistler — that's a free forest hike to graffiti-covered derailed boxcars. This is a proper museum, with a parking lot and a model railway room that'll buy you a solid hour of peace with restless kids.

An hour covers it at a normal pace, two with kids in tow. Full write-up — link in the first comment.

📍 West Coast Railway Heritage Park, Squamish, BC

What's your go-to Squamish plan when the forecast falls apart?

---

## Instagram Post

**Caption:**

Rain in the forecast? This is the Squamish stop that doesn't care. 🚂

West Coast Railway Heritage Park is a yard of real historic rail cars on Government Road — walk alongside them, walk through a lot of them, and find the Royal Hudson, one of the steam locomotives that used to run passenger trips up this exact coastline.

Not the Train Wreck Trail (that's the free forest hike to the graffiti boxcars out near Whistler) — this one's an actual museum, with a parking lot and a model railway room that'll buy you a solid hour of quiet with the kids.

An hour at a normal pace, closer to two with kids. We break down what to see first in the guide — link in our first comment.

Tag the person in your group who still won't shut up about trains. 👇

First comment: Full guide to West Coast Railway Heritage Park → bestseatosky.com/blog/west-coast-railway-heritage-park-squamish

📍 West Coast Railway Heritage Park, Squamish, BC

#squamish #seatosky #explorebc #britishcolumbia #hellobc #bctravel #westcoastrailway #royalhudson #familytravelbc #raindayactivities

---

## Media Notes

**Check `carousel-photos/chief/` or any other Squamish subfolder in `carousel-photos/` locally before shooting anything new** — per the content strategy, this routine can't see inside that gitignored folder, but Rick may already have shots from a past visit to the railway park specifically, or general Squamish footage that could cover the B-roll below (downtown drive-by, Government Road signage) even if the rail-yard shots themselves still need to be new.

For the rail-yard and locomotive shots specifically, this is very likely **Your media** — it's a specific, staffed attraction and there's no reliable stock substitute that would actually be this location per the brand book's no-lookalike rule.

Shot list if new footage is needed (vertical, phone is fine):

1. Wide walking shot entering the rail yard, cars lined up on both sides — 8–10 sec
2. The Royal Hudson locomotive, straight-on hero shot, then a slow pan up to show scale — 8–10 sec
3. Walking through the interior of one open rail car (a dining car or sleeper car, whichever is open) — 6–8 sec
4. A kid or adult looking into the model railway room, reaction shot — 5–8 sec
5. Optional closing shot: exterior sign/entrance, for context and so people can find it — 4–5 sec

Total run time roughly 30–40 sec. Text overlay should carry the "not the Train Wreck Trail" clarification since that's the detail people will ask about in comments — put it on screen early rather than relying on the caption alone. A simple voiceover or on-screen text with ambient audio both work; skip trending audio if it would talk over the voiceover.

Before publishing, flag the three [VERIFY] items in the blog content to Rick directly: current status/access to the Royal Hudson (static vs. walk-through), current admission pricing and seasonal hours, and whether any dinner-train or excursion service is still operating out of this location. None of these should go live as written.
