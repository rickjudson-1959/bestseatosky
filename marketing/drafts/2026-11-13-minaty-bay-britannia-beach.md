# Draft batch — 2026-11-13

**Topic:** Minaty Bay — the small Howe Sound waterfront in Britannia Beach, past the museum, where the old ore-loading wharf pilings still stand in the water. A quiet, low-key stop that works especially well in November's grey, flat-light, storm-watching season.

**Why this topic fits the rotation:** Britannia Beach is tied with "the drive" for the fewest posts in this folder (3, vs. Squamish 6, Whistler 5, Pemberton 5), and its existing posts cover the museum (08-18 overview, 10-30 underground tour) and the Jane Camp hike above town (10-16) — none of them touch the waterfront itself. Minaty Bay is a genuinely different angle: flat, easy, no admission fee, and a good fit for mid-November when short, low-commitment stops beat alpine hikes. The last two posts (Joffre Lakes 11-03, Brackendale eagle viewing 11-06) were both Squamish/Pemberton-adjacent "nature" topics, and the one before that (winter driving, 11-10) was a highway-wide post — this brings the rotation back to a specific, underused town with a specific, underused place inside it.

---

## Blog Post (SQL)

```sql
-- Best Sea to Sky — new blog post
-- Paste into Supabase SQL Editor. Does NOT set status to 'published' —
-- left as 'draft' so Rick reviews and flips status before it goes live.
-- featured_image left NULL: Rick needs a real photo of Minaty Bay itself —
-- the old wharf pilings in the water, or the beach/picnic area looking out
-- at Howe Sound — brand book rule is no stock imagery standing in for a
-- specific corridor location, and this spot is specific enough that generic
-- "beach on the water" stock would be obviously wrong.

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
  'minaty-bay-britannia-beach',
  'Minaty Bay: The Quiet Side of Britannia Beach Nobody Stops For',
  'Past the mill and the museum, a short gravel road drops down to Minaty Bay — a flat little Howe Sound waterfront with old wharf pilings still standing in the water. Here''s why it''s worth five minutes, especially on a grey corridor day.',
  NULL, -- TODO(Rick): real photo of the wharf pilings in the water or the beach/picnic area, no stock
  'Everyone who stops at Britannia Beach heads for the big rust-red mill. Fewer people know there''s a second stop just past it — a flat waterfront with the remains of the old ore-loading wharf still standing in Howe Sound, and none of the parking-lot crowd.',
  '<p>Britannia Beach trains you to look up. The mill building pulls your eye the second you come around the bend on Highway 99, and most people who pull in are headed for the museum doors or the trailhead up to Jane Camp. Keep driving a little further into the townsite, down toward the water, and there''s a second stop that most of that same crowd never finds: Minaty Bay.</p>

<h2>What''s actually there</h2>

<p>Minaty Bay is a small, flat waterfront park on Howe Sound, a short drive past the museum through the Britannia Beach townsite. There''s a gravel boat launch, a bit of beach, and a handful of picnic tables &mdash; nothing built-up, nothing you need a ticket for. The thing that makes it worth the stop is in the water: a line of old wooden pilings, the remains of the ore-loading wharf the mine once used to ship copper concentrate out by barge. They stand right out of Howe Sound at low tide, which is about as direct a look at this town''s working history as you''ll get without paying museum admission. [VERIFY: confirm Minaty Bay''s current public access status, any seasonal closures, and whether the boat launch is still operating before publishing &mdash; small waterfront parks like this sometimes have maintenance closures or access changes that don''t show up until you check locally].</p>

<h2>Why November is actually a good time for this one</h2>

<p>Most of what we write up about this corridor is built for clear skies and long days. Minaty Bay doesn''t need either. It''s flat, it''s a two-minute walk from the car, and a grey, blown-out November sky over Howe Sound with those old pilings sticking out of the water is its own kind of photo &mdash; moodier than the postcard version, and arguably more honest about what this coastline actually looks like most of the year. If you''re already stopped at Britannia Beach for the museum and have ten spare minutes before getting back on the highway, this is where to spend them.</p>

<h2>Getting there</h2>

<p>From Highway 99, follow the signs into the Britannia Beach townsite rather than the museum''s main lot, and continue down toward the water. [VERIFY: confirm the current turn-off and exact driving directions from the highway, and whether there''s dedicated parking at Minaty Bay itself or whether it''s a walk-in from townsite parking &mdash; worth a quick local check or a look at the current Squamish-Lillooet Regional District park page before publishing]. It''s not signed the way the museum is, so don''t expect a big sign pointing you in &mdash; this is a locals''-route kind of stop.</p>

<h2>Worth knowing before you go</h2>

<p>There''s no food or washrooms at Minaty Bay itself &mdash; grab a coffee at the townsite first if you need one. The pilings are easiest to appreciate at lower tide, when more of them are visible above the water line. [VERIFY: confirm whether dogs are permitted off-leash or on-leash only, and whether there are any current signs restricting access to the pilings/old wharf structure for safety reasons &mdash; old industrial timber in salt water isn''t something to climb on even if nothing is posted]. Treat it as a quiet five-minute add-on to a Britannia Beach stop, not a destination on its own &mdash; that''s exactly what makes it worth knowing about.</p>',
  'Best Sea to Sky Team',
  'draft',
  '[{"question":"What is Minaty Bay in Britannia Beach?","answer":"A small, flat waterfront park on Howe Sound past the BC Museum of Mining, known for the remains of the old ore-loading wharf — wooden pilings still standing in the water — plus a gravel boat launch and a few picnic tables."},{"question":"Is there a fee to visit Minaty Bay?","answer":"No — unlike the museum, Minaty Bay is a public waterfront area with no admission fee. [VERIFY: confirm current access/fee status before publishing]."},{"question":"Is Minaty Bay good to visit in winter?","answer":"Yes — it is flat, close to parking, and doesn''t depend on clear weather the way a hike or lookout does, which makes it a good short stop on a grey or rainy corridor day."},{"question":"Can you swim at Minaty Bay?","answer":"It''s a Howe Sound waterfront, not a swimming beach — most visitors come for the view and the old wharf pilings rather than to get in the water, which stays cold year-round."}]'::jsonb
);
```

---

## Facebook Post

**Format:** Static photo / short album (2–3 photos) — a quieter, low-key stop like this doesn't need a Reel to make its case; the image of the old pilings in the water does the work.

**Location tag:** Britannia Beach, BC

**Post text:**

Most people who stop at Britannia Beach never make it past the big red mill building.

Keep driving a few minutes further into the townsite and you'll find Minaty Bay — a quiet little stretch of Howe Sound where the old ore-loading wharf still stands in the water. No ticket, no crowd, just a gravel boat launch, a couple of picnic tables, and a line of weathered pilings that have been standing there since this was a working mine.

On a grey November day, it might be the moodiest five-minute stop on the whole highway.

Link to the full guide in the first comment. Been to Minaty Bay? Tell us what the tide was doing when you were there. 👇

**First comment (link):**
Full guide here → bestseatosky.com/eat/.../minaty-bay-britannia-beach [VERIFY: confirm correct live URL path/category for this guide before posting — use /blog/ or whatever path the published post actually resolves to]

**Hashtags (~10):**
#britanniabeach #minatybay #howesound #seatosky #seatoskyhighway #explorebc #britishcolumbia #hellobc #bctravel #westcoastbc

---

## Instagram Post

**Format:** Carousel (3–5 photos/short clips) — this is a "save this" style stop, not an action shot, so a carousel outperforms a single static post and doesn't need the production lift of a Reel.

**Caption:**

Britannia Beach's quiet side. 🌊

Everyone stops for the mill building and the museum. Minaty Bay is the stop past it — a flat little Howe Sound waterfront where the old ore-loading wharf still stands in the water, pilings and all. No fee, no crowd, five minutes off the highway.

Grey sky days hit different here.

Full guide linked in the first comment 👇

**First comment (link):**
bestseatosky.com/eat/.../minaty-bay-britannia-beach [VERIFY: confirm correct live URL path before posting]

**Location tag:** Britannia Beach, BC

**Hashtags (~10):**
#britanniabeach #minatybay #howesound #seatosky #seatoskyhighway #explorebc #britishcolumbia #hellobc #bctravel #westcoastbc

---

## Media Notes

**Check `carousel-photos/Britannia Beach/` locally first** — Rick's photo library is gitignored and not visible to this routine, but per content-strategy.md this is exactly the kind of town folder that's likely to already have usable shots (the mill, the townsite, maybe the waterfront itself) from past visits. Look there before shooting anything new or falling back to stock.

If nothing in that folder covers Minaty Bay specifically, this is a **"Your media"** post — it needs a short, low-effort shoot next time Rick is through Britannia Beach:

- 3–4 stills or 5–10 second clips of the wharf pilings standing in the water at low tide, shot straight-on and from an angle down the shoreline
- One wide shot of the beach/picnic area with Howe Sound and the mountains behind it, for scale and context
- One shot of the gravel boat launch or access road, so the guide post can show people where to actually turn in
- Vertical orientation for the Instagram carousel/Reel crop; natural light, no filter needed — a flat grey sky is on-brand here, not a problem to avoid
- No voiceover or trending audio needed if this stays a Facebook static post, but if it gets reshot as a Reel later, a simple "most people drive past this" text overlay over 3–4 quick cuts would work well

**Fallback if no fresh footage is realistic soon:** Stock — search "Minaty Bay Britannia Beach" or "Britannia Beach wharf pilings" specifically (per brand book: real-place stock only, never a generic dock/pier standing in for this one). Do not substitute a generic BC coastline stock photo.
