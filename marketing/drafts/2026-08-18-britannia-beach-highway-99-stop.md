# Draft batch — 2026-08-18

**Topic:** Britannia Beach — the Highway 99 stop between Vancouver and Squamish that most road-trippers drive straight past.

**Why this topic fits the rotation:** No drafts exist yet in this folder, so this is the opening entry. Britannia Beach and the Highway 99 drive itself are both explicitly called out in the content strategy as under-covered relative to Whistler — this post covers both at once (a town *and* the drive) without touching Whistler at all.

---

## Blog Post (SQL)

```sql
-- Best Sea to Sky — new blog post
-- Paste into Supabase SQL Editor. Does NOT set status/published_at to 'published' —
-- left as 'draft' so Rick reviews and flips status before it goes live.
-- featured_image left NULL: Rick needs to shoot or source a real photo of the
-- Museum of Mining mill building or the Britannia Beach lookout — brand book
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
  'britannia-beach-highway-99-stop',
  'Britannia Beach: The Highway 99 Stop Most Drivers Blow Past',
  'Ten minutes off Highway 99 between Horseshoe Bay and Squamish, Britannia Beach has a National Historic mill, a Howe Sound lookout, and a coffee stop worth the pullout.',
  NULL, -- TODO(Rick): real photo of the mill building or the lookout, no stock
  'Most people treat Britannia Beach as scenery you pass at 90 km/h on the way to Squamish or Whistler. Slow down for ten minutes and you get a National Historic Site you can walk through, one of the better pullouts on the whole corridor, and a coffee stop that isn''t a gas station.',
  '<p>If you''ve driven the Sea to Sky highway more than once, you know Britannia Beach mostly as a landmark you clock without stopping &mdash; the enormous rust-red mill building on the water side of the road, gone in about four seconds. It''s easy to treat it as a marker that means "you''re getting close to Squamish now" rather than a place. That''s a mistake, and it''s a quick one to fix.</p>

<h2>What''s actually there</h2>

<p>That mill building is the BC Museum of Mining, a National Historic Site built on the site of what was, for a stretch of the 20th century, the largest copper mine in the British Empire. You can walk through the 20-storey concentrator mill on a self-guided route, and there''s an underground tour that takes you into the actual mine tunnel on a rail car &mdash; hard hat included. It''s the kind of stop that works for a genuinely curious adult and a restless nine-year-old at the same time, which is rarer than it sounds on this drive. [VERIFY: current admission pricing and whether the underground rail tour is running this season &mdash; check bcmuseumofmining.org before publishing]</p>

<p>Across the highway, the public dock and waterfront area give you one of the cleaner, less-crowded views of Howe Sound on the whole corridor &mdash; water, the Britannia range behind you, and none of the pullout traffic you get at the bigger viewpoints closer to Squamish. It''s a five-minute stop if you just want the photo, longer if you brought a lunch.</p>

<h2>How long to budget</h2>

<p>Ten minutes gets you the lookout and a stretch of the legs. An hour and a half gets you the surface museum and exhibits at a reasonable pace. Add the underground tour and you''re closer to two and a half hours, which makes Britannia Beach a legitimate half-stop on a Squamish day trip rather than a photo op &mdash; especially useful on a grey day when an outdoor hike isn''t the plan.</p>

<h2>Good to know before you go</h2>

<p>Parking is roadside and at the museum lot; on a busy long weekend, expect it to fill before noon. There''s a coffee stop right on the highway in Britannia Beach if you need a break before the last stretch into Squamish &mdash; check current hours before you build a stop around it, since roadside cafes on this corridor keep seasonal schedules. [VERIFY: current name/hours of the coffee shop in Britannia Beach &mdash; confirm it''s still operating before publishing]</p>

<p>The honest pitch here isn''t "hidden gem" &mdash; the mill building is about as visible as a building gets on this highway. The gap is that almost nobody actually pulls in. If you''ve got even fifteen minutes of slack in your drive north, it''s one of the easiest wins on the whole corridor.</p>',
  'Best Sea to Sky',
  'draft',
  '[
    {"question": "Is Britannia Beach worth stopping at on the way to Squamish or Whistler?", "answer": "Yes, if you have even fifteen minutes to spare. The BC Museum of Mining and the Howe Sound lookout are both right off the highway, so it does not require a detour."},
    {"question": "How long does the Britannia Beach stop take?", "answer": "Budget ten minutes for the lookout alone, about ninety minutes for the surface museum exhibits, or up to two and a half hours if you add the underground mine tour."},
    {"question": "Is the BC Museum of Mining good for kids?", "answer": "Yes. The self-guided mill route and the underground rail-car tour are built for a mixed-age group, and hard hats are provided for the tour."},
    {"question": "Where do you park in Britannia Beach?", "answer": "There is roadside parking near the lookout and a lot at the museum itself, though the museum lot can fill up by midday on busy long weekends."}
  ]'::jsonb
);
```

---

## Facebook Post

The rust-red mill building you''ve driven past a hundred times on the way to Squamish? That's the BC Museum of Mining — and it's about ten minutes off the highway if you actually pull in.

We're not calling this a hidden gem. It's about as visible as a building gets on Highway 99. The gap is that almost nobody stops.

Walk the 20-storey mill on your own, take the underground tour into the actual mine tunnel (hard hat included), or just hit the lookout across the road for one of the cleaner views of Howe Sound on the whole corridor. Ten minutes for the view, ninety for the full museum, two and a half hours if you do the underground tour too.

Full write-up with the details — link in the first comment.

📍 Britannia Beach, BC

What's the Highway 99 landmark you've driven past thirty times and never actually stopped at?

---

## Instagram Post

**Caption:**

That rust-red building you've driven past a hundred times on the way to Squamish. You've never stopped. Today's the day. 🏔️

It's the BC Museum of Mining — a National Historic Site built on what used to be the largest copper mine in the British Empire. Walk the mill yourself, or go underground on the mine rail tour (hard hat included). Across the highway: one of the quieter Howe Sound lookouts on the whole corridor.

Ten minutes for the view. Ninety for the full museum. We break down what to actually budget for in the guide — link in our first comment.

Tag someone who's driven past this a dozen times and never pulled in. 👇

First comment: Full guide to Britannia Beach → bestseatosky.com/blog/britannia-beach-highway-99-stop

📍 Britannia Beach, BC

#britanniabeach #seatosky #highway99 #explorebc #britishcolumbia #hellobc #howesound #squamish #roadtripbc #bcmuseumofmining

---

## Media Notes

**Update (2026-08-18):** Rick has added 3 real photos to `~/bestseatosky/carousel-photos/Britannia Beach/` — `Howe Sound Lookout.jpg`, `BB Mine.jpg`, `BB Cafe's.jpg` — genuinely the location, so these clear the brand book's stock-photo rule and can be used for the static/carousel version of this post right away (attach directly in Blotato; this folder is local-only, not in the repo). He's also shooting his own photo/video at Britannia Beach this coming weekend, which should replace or supplement these for the Reel below once available.

Until that footage exists, the Reel shot list stays open below — **Your media** (or hold the Reel until after the weekend shoot and post the carousel/photo version first using the 3 photos already on hand).

Shot list for the Reel (vertical, phone is fine):

1. Driving shot approaching the mill building from the highway, mill filling the windshield as you slow down — 5–8 sec, natural dash-cam-style angle, no need for gimbal
2. Walking shot into the museum grounds, mill towering overhead, looking up — 8–10 sec
3. One interior shot from the self-guided mill walk (whatever's visually strongest — old machinery, the scale of the structure) — 6–10 sec
4. The Howe Sound lookout across the highway — wide shot, water and mountains, a person small in frame for scale — 8–10 sec
5. Optional closer: coffee cup in hand at the roadside stop, mountains behind — 5 sec

Total run time roughly 30–40 sec. Add on-screen text overlay for the "ten minutes vs. ninety minutes vs. two and a half hours" budget breakdown since that's the payoff line people will screenshot. Trending audio or a simple voiceover both work — no music-only cut, since the overlay text needs a beat to land.

If underground-tour footage isn't available, cut it from the Reel and note in the caption that details are in the blog post instead — don't imply the tour based on footage that doesn't exist.
