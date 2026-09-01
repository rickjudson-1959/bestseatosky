# Draft batch — 2026-09-01

**Topic:** Brandywine Falls Provincial Park — the highway pull-off between Squamish and Whistler where a short, mostly flat walk gets you to a waterfall dropping into a canyon, with Black Tusk visible in the distance from the viewing platform.

**Why this topic fits the rotation:** Existing drafts cover Britannia Beach (2026-08-18), Pemberton's farm-stand loop (2026-08-21), Squamish's swimming holes (2026-08-25), and Whistler's Train Wreck Trail (2026-08-28) — one post per town, but "the Highway 99 drive itself" hasn't had its own topic yet, even though content-strategy.md calls it out by name as part of the rotation. Brandywine sits right on the highway between Squamish and Whistler, so it's the drive, not a town — a different angle from the Britannia Beach post, which was about a stop at one specific site rather than the corridor as a route.

---

## Blog Post (SQL)

```sql
-- Best Sea to Sky — new blog post
-- Paste into Supabase SQL Editor. Does NOT set status to 'published' —
-- left as 'draft' so Rick reviews and flips status before it goes live.
-- featured_image left NULL: Rick needs a real photo of the falls or the
-- viewing platform — brand book rule is no stock imagery standing in for
-- a specific corridor location.

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
  'brandywine-falls-highway-99-stop',
  'Brandywine Falls: The Highway 99 Pull-Off Between Squamish and Whistler Worth Actually Stopping For',
  'Most people drive right past it. Here''s how to find Brandywine Falls Provincial Park, what the short walk to the viewing platform is really like, and why it''s one of the easiest wins on the whole Sea to Sky drive.',
  NULL, -- TODO(Rick): real photo of the falls from the viewing platform, or the canyon below — no stock
  'Somewhere between Squamish and Whistler, a green highway sign points to Brandywine Falls Provincial Park, and most drivers keep going. The ones who pull off get a ten-minute walk to a platform overlooking a waterfall dropping into a canyon, with Black Tusk visible on a clear day. No entry fee, no crowds most weekdays, and it fits into a road trip without adding an hour to your day.',
  '<p>The Sea to Sky Highway is full of pull-offs that blur together at 80 km/h, and Brandywine Falls Provincial Park is one of the easiest to miss and the easiest to actually stop for. It sits along Highway 99 between Squamish and Whistler [VERIFY: exact km marker and whether the turnoff is northbound-only or accessible from both directions before publishing directions people will drive by], and the whole detour — park, walk, look, walk back, drive on — takes less than half an hour.</p>

<h2>Getting there</h2>

<p>The parking lot is right off the highway, well signed, with a short trail leading from the lot to the falls viewing platform. [VERIFY: current parking lot capacity, whether BC Parks charges a day-use parking fee here, and whether the lot fills up on summer weekends — worth confirming with BC Parks before publishing]. The walk in is mostly flat and well maintained, closer to a wide path than a backcountry trail, which is part of why it works for almost anyone travelling the corridor — you don''t need hiking boots or a trail app to do this one.</p>

<h2>What you''ll actually see</h2>

<p>The falls drop into a narrow canyon in a single, dramatic sheet [VERIFY: exact drop height before publishing — commonly cited figures vary and should be confirmed against BC Parks'' own listing rather than repeated secondhand]. The viewing platform puts you above and across from the falls rather than at the base, so you''re looking into the canyon rather than up at it — a different angle than most waterfall stops on this stretch of highway. On a clear day, Black Tusk is visible in the distance beyond the falls, which is the detail that separates this from a generic roadside waterfall photo.</p>

<h2>The name, as the story goes</h2>

<p>Local lore has it that two railway surveyors laying out the line in the early 1900s bet a bottle of brandy on the height of the falls, and the name stuck. It''s the kind of story that gets repeated at every viewing platform on the corridor, worth telling for flavour, but [VERIFY: original source before stating it as settled fact rather than local legend].</p>

<h2>Good to know before you go</h2>

<p>The walk to the platform is short enough to do in runners, and there''s no fee to view the falls themselves. [VERIFY: current status of any BC Parks day-use fee, washroom facilities, and whether the campground portion of the park is open seasonally, before publishing]. It''s a stop that works in any weather — the canyon view holds up on a grey day as well as a sunny one, which matters on a corridor where you can''t always plan around the forecast.</p>

<h2>Pair it with</h2>

<p>Brandywine sits close enough to Whistler that it works as a first or last stop on a Whistler day trip, or as one of several quick highway pull-offs on a longer Squamish-to-Pemberton drive. It''s a good one to build into a road-trip itinerary precisely because it costs so little time — ten minutes well spent instead of another blur out the window.</p>',
  'Best Sea to Sky Team',
  'draft',
  '[{"question":"Is there a fee to see Brandywine Falls?","answer":"There is no fee to view the falls from the platform. [VERIFY: current BC Parks day-use parking fee status before publishing]."},{"question":"How long is the walk to Brandywine Falls?","answer":"The walk from the parking lot to the viewing platform takes about ten minutes each way on a flat, well-maintained path."},{"question":"Where is Brandywine Falls Provincial Park?","answer":"It''s along Highway 99 between Squamish and Whistler. [VERIFY: exact km marker before publishing]."},{"question":"Can you see Black Tusk from Brandywine Falls?","answer":"On a clear day, Black Tusk is visible in the distance from the viewing platform."}]'::jsonb
);
```

---

## Facebook Post

There's a green sign on Highway 99 between Squamish and Whistler that most people drive right past. Ten minutes off the road gets you to a canyon with a waterfall dropping into it — and on a clear day, Black Tusk sitting in the distance behind it.

Brandywine Falls Provincial Park is one of the easiest wins on the whole Sea to Sky drive: flat path, no entry fee, no hiking boots required, back in the car in under half an hour. It's the kind of stop that turns a highway drive into an actual road trip.

We mapped out exactly where to pull off and what to expect — link in the first comment.

Ever actually stopped here, or is it always a drive-by? 👇

**First comment:** Brandywine Falls, mapped 👉 bestseatosky.com/blog/brandywine-falls-highway-99-stop

**Location tag:** Brandywine Falls Provincial Park, BC

---

## Instagram Post

**Format:** Reel (10–20 sec) — content-strategy.md ranks Reels first for reaching non-followers, and this is a walk-and-reveal location (path → platform → falls + Black Tusk) that suits a short vertical clip better than a static carousel.

**Caption:**

The highway sign you've driven past a hundred times. 🌲

Brandywine Falls Provincial Park sits right on Highway 99 between Squamish and Whistler — a flat, ten-minute walk from the parking lot to a platform looking into a canyon with a waterfall dropping through it. Clear day, and you'll catch Black Tusk in the distance too.

No entry fee, no hiking boots needed. One of the easiest stops on the whole corridor. Full guide — link in our first comment.

**First comment:** Brandywine Falls, mapped 👉 bestseatosky.com/blog/brandywine-falls-highway-99-stop

**Location tag:** Brandywine Falls Provincial Park, BC

**Hashtags:** #brandywinefalls #seatosky #highway99 #squamish #whistlerbc #blacktusk #explorebc #britishcolumbia #hellobc #bctravel

---

## Media Notes

**Check `carousel-photos/` locally first** — Rick's local photo library is organized by town (`chief/`, `whistler/`, `pemberton/`, `Britannia Beach/`, `horseshoe bay/`); Brandywine sits between Squamish and Whistler so it may be filed under either folder, or not yet covered since this is the first "drive itself" topic in the rotation. Confirm what's there before shooting or building anything new.

If nothing usable exists yet, this is **Your media** (preferred):

- One 10–15 sec walking POV clip on the path from the parking lot to the viewing platform, phone vertical, natural audio or a trending audio track over it
- One 5–8 sec clip standing at the platform panning from the falls toward Black Tusk (only if visible that day — skip the pan if it's socked in, don't fake the view)
- One close detail shot of the canyon/falls drop, 3–5 sec, to use as the cold open or cover frame
- One clip with a person at the railing for scale, per the brand book's "not posed" rule — mid-look, not turned to camera

**Fallback if Rick has nothing current:** "Stock — search Brandywine Falls Provincial Park" on a licensed source like Dreamstime as a last resort — real place only, never a generic waterfall or lookalike canyon standing in for it. Original footage is strongly preferred here since the Black Tusk sightline is the detail that makes this post distinct from a generic waterfall photo.
