# Draft batch — 2026-10-30

**Topic:** The BC Museum of Mining's underground tour in Britannia Beach — what actually happens on the rail-car ride into the old mine tunnel, and why it's one of the better rainy-day stops on the whole corridor.

**Why this topic fits the rotation:** Britannia Beach has the fewest prior posts in this folder (2: the general highway-stop overview from 2026-08-18, and the Jane Camp Trail hike from 2026-10-16) against Squamish (5), Whistler (6 after last week's Wedge Pond post), and Pemberton (4). The 08-18 post only mentions the underground tour in passing as one bullet in a whole-town overview — this is the first post to actually go deep on what the tour itself is like, which is a genuinely different piece of content, not a rehash. It's also a deliberate shoulder-season pick: late October is exactly when rainy-day, indoor-adjacent activities start outperforming trailhead content.

---

## Blog Post (SQL)

```sql
-- Best Sea to Sky — new blog post
-- Paste into Supabase SQL Editor. Does NOT set status to 'published' —
-- left as 'draft' so Rick reviews and flips status before it goes live.
-- featured_image left NULL: Rick needs a real photo from inside the mine
-- tunnel or of the rail car at the portal — brand book rule is no stock
-- imagery standing in for a specific corridor location, and generic mine
-- stock would not show the actual Britannia Beach tunnel anyway.

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
  'britannia-beach-mine-tour-what-to-expect',
  'The Britannia Beach Mine Tour: What Actually Happens Underground',
  'The BC Museum of Mining''s underground tour puts you on a rail car into a real tunnel from the largest copper mine in the British Empire. Here''s what it''s actually like, and why it''s a solid plan B on a rainy Sea-to-Sky day.',
  NULL, -- TODO(Rick): real photo from inside the tunnel or the rail car at the portal, no stock
  'Everyone who stops at Britannia Beach sees the giant mill building from the highway. Fewer people realize there''s an actual mine tunnel you can ride into on a rail car, hard hat and all — and on a grey corridor day, it beats standing around getting rained on at a lookout.',
  '<p>The mill building at Britannia Beach is hard to miss from Highway 99 &mdash; twenty storeys of rust-red timber, the kind of landmark you clock every time you drive this road whether you stop or not. What that building doesn''t tell you is that the mine itself goes back into the mountain, and part of it is still open for anyone willing to put on a hard hat and get on a rail car.</p>

<h2>What the tour actually is</h2>

<p>The underground tour at the BC Museum of Mining takes you into a real tunnel from what was, for decades, the largest copper mine in the British Empire. You ride in on an electric rail car &mdash; the same basic idea the miners used to get in and out, scaled for visitors &mdash; and a guide walks the group through sections of the tunnel on foot, explaining how the ore actually came out of the rock and what the working conditions were like for the men who did it. [VERIFY: current tour length, schedule/frequency, and whether it still runs on the rail car year-round or is seasonal &mdash; confirm with bcmuseumofmining.org before publishing]</p>

<p>It is genuinely underground, which means it is genuinely cool and genuinely dark in sections, with hard hats provided and required. [VERIFY: approximate underground temperature and whether a jacket is recommended even in summer] If you''ve been imagining a lit-up, polished visitor tunnel, recalibrate &mdash; part of what makes it worth doing is that it still feels like a mine, not a theme-park version of one.</p>

<h2>Who it''s actually good for</h2>

<p>This is one of the rare corridor activities that works for a genuinely curious adult and a nine-year-old at the same time, and it does it without requiring anyone to be fit, hike anything, or deal with weather once you''re underground. [VERIFY: minimum age or height requirement for the rail car and walking section] That makes it a legitimate rainy-day plan, not just a backup &mdash; if the forecast between Horseshoe Bay and Squamish has turned, this is one of the few things on the whole drive that doesn''t care.</p>

<p>It is not a quick five-minute add-on the way some museum stops are. Budget real time for it: getting hard hats on, the ride in, the walking portion, and getting back out takes a while, and you''ll want time in the surface exhibits and the mill building before or after. [VERIFY: current adult/child admission pricing and total time to budget for museum plus underground tour]</p>

<h2>Good to know before you go</h2>

<p>The underground tour is a separate, timed component of a museum visit, not something you just wander into whenever you arrive &mdash; check the current schedule and consider arriving early enough to catch a specific departure time rather than planning your whole stop around a tour that might already be full. [VERIFY: whether tours require advance booking or are first-come, first-served at the ticket counter] Closed-toe shoes are a sensible call given the terrain underground, even though the walking sections are maintained for visitors.</p>

<p>Pair it with the rest of a Britannia Beach stop &mdash; the surface exhibits in the mill building, and if the weather clears up afterward, the Jane Camp Trail climbs out of the same townsite to the ruins of the old mining camp above. One trip, indoor plan and outdoor plan both covered, which is about as efficient as a Highway 99 pullout gets.</p>

<p>The honest pitch: most people treat the mine tunnel as a footnote to the big mill building out front. It''s the other way around &mdash; the building is the gift shop; the tunnel is the mine.</p>',
  'Best Sea to Sky',
  'draft',
  '[
    {"question": "What is the underground tour at the BC Museum of Mining?", "answer": "A guided tour into a real tunnel from the former Britannia Mine, which was once the largest copper mine in the British Empire. Visitors ride in on an electric rail car and walk part of the tunnel on foot with a guide, wearing a provided hard hat."},
    {"question": "Is the Britannia Beach mine tour good for kids?", "answer": "It works well for a wide age range and doesn't require any hiking fitness, which makes it one of the more reliably kid-friendly stops on the Sea to Sky corridor. Check current minimum age or height requirements before you go."},
    {"question": "Is the underground tour a good rainy-day activity?", "answer": "Yes — once you're underground, weather on the surface is irrelevant, which makes it one of the better plan-B stops on the drive between Horseshoe Bay and Squamish when the forecast turns."},
    {"question": "How long should I budget for the Britannia Beach mine tour?", "answer": "More than a quick stop — between hard hats, the rail car ride in, the walking portion, and getting back out, plus time for the surface exhibits, it's worth planning as the main activity for that part of your drive rather than a brief add-on."}
  ]'::jsonb
);
```

---

## Facebook Post

Everyone who drives Highway 99 past Britannia Beach has seen the giant rust-red mill building. Almost nobody realizes there's an actual mine tunnel you can ride into.

The underground tour at the BC Museum of Mining puts you on an electric rail car into a real tunnel from what was once the largest copper mine in the British Empire — hard hat on, guide walking you through how the ore actually came out of the rock. It's dark, it's cool, and it still feels like a working mine, not a polished visitor attraction.

Best part: once you're underground, the weather outside doesn't matter. On a grey corridor day, this beats standing in the rain at a lookout.

Full write-up — link in the first comment.

📍 Britannia Beach, BC

Anyone else had no idea you could actually go into the tunnel, not just look at the mill building?

---

## Instagram Post

**Caption:**

That giant rust-red building at Britannia Beach isn't the mine. It's the gift shop. ⛏️

The actual mine is behind it — a real tunnel from what was once the largest copper mine in the British Empire, and you can ride into it on an electric rail car, hard hat and all, with a guide who walks you through how the ore came out of the rock. Dark, cool, and it still feels like a mine, not a theme park version of one.

It's also one of the few genuinely weatherproof things to do on the whole corridor, which makes it a solid plan when the forecast between Horseshoe Bay and Squamish turns. Full details on what to expect and how to plan your visit — first comment.

Tag someone who's driven past Britannia Beach a hundred times and never gone underground. 👇

First comment: What actually happens on the Britannia Beach mine tour → bestseatosky.com/blog/britannia-beach-mine-tour-what-to-expect

📍 Britannia Beach, BC

#britanniabeach #bcmuseumofmining #seatosky #howesound #explorebc #britishcolumbia #hellobc #bctravel #familytravelbc #rainydayactivities

---

## Media Notes

Check `carousel-photos/Britannia Beach/` locally for existing photos before defaulting to a shot list or stock search — Rick's photo library may already have shots from the 2026-08-18 museum visit, including anything from inside the mill building or near the tunnel portal, that could cover this post without new footage.

If nothing from inside the tunnel or rail car exists yet, this needs **Your media** — the tunnel interior and rail car are specific enough that stock imagery would break the brand book's "no stock standing in for a real corridor location" rule, and generic mine-shaft stock wouldn't show the actual Britannia tunnel anyway. If a tour can be shot:

1. Hard hats going on / the group boarding the rail car at the portal — 5–8 sec
2. The rail car moving into the tunnel entrance (the darkness-to-light contrast as you enter reads well on camera) — 8–10 sec
3. A walking section inside the tunnel, guide gesturing at a wall or feature, with a person for scale — 8–10 sec
4. A detail shot: old equipment, timber supports, or rail track inside the tunnel — 5–8 sec
5. Coming back out into daylight at the portal — 5–8 sec

Total run time roughly 35–40 sec. If filming underground isn't practical on a given visit (low light, moving tour group), **Blotato can build** a fallback: a carousel pulling 4–5 stills from this blog post's text points (the rail car, "largest copper mine in the British Empire," "hard hat required," "weatherproof rainy-day plan") over a dark, textured mine/industrial background in brand colours, with a follow CTA on the last slide — but swapping in even one real photo from inside the tunnel would outperform the fully generated version.
