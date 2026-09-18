# Draft batch — 2026-09-18

**Topic:** Shannon Falls Provincial Park and the Stawamus Chief — specifically the short walk that gets you a real view without committing to the full Chief summit hike.

**Why this topic fits the rotation:** Checked all nine existing files in `marketing/drafts/` before picking this. Squamish has two prior posts (swimming holes, post-hike patios) but neither touches the single most iconic landmark on the entire corridor — the Chief and Shannon Falls, which every road-tripper photographs from the highway and most never actually stop for. It's a genuinely different angle from both existing Squamish posts (neither is about hiking or waterfalls), it's distinct from the other highway-stop posts (Britannia Beach, Brandywine Falls, Nairn Falls, Porteau Cove) since none of those cover Squamish's own landmark, and it fills an obvious coverage gap rather than repeating a town or theme.

---

## Blog Post (SQL)

```sql
-- Best Sea to Sky — new blog post
-- Paste into Supabase SQL Editor. Does NOT set status to 'published' —
-- left as 'draft' so Rick reviews and flips status before it goes live.
-- featured_image left NULL: Rick needs a real photo of Shannon Falls or the
-- Chief viewpoint trail — brand book rule is no stock standing in for a
-- specific corridor location. Check carousel-photos/chief/ and
-- carousel-photos/Squamish/ locally first (gitignored, not visible to this
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
  'shannon-falls-stawamus-chief-viewpoint',
  'Shannon Falls and the Chief: The Short Walk That Gets You the View',
  'You don''t have to hike the whole Stawamus Chief to get a real Squamish view. Here''s the short walk to Shannon Falls, the shared trailhead, and what actually separates a 20-minute stop from a half-day summit.',
  NULL, -- TODO(Rick): real photo of Shannon Falls or the lower Chief trail, no stock
  'Every driver on Highway 99 photographs the Chief through the windshield and keeps going. What most people don''t realize is that the payoff view is a short, flat walk away at Shannon Falls — and that the full Chief summit and the easy version share the same parking lot, so the choice is yours to make once you''re already there.',
  '<p>The Stawamus Chief is the single most photographed thing on this entire corridor, and almost everyone photographs it from a moving car. That''s a shame, because the granite monolith you''re driving past has one of the easiest big-payoff stops on the whole highway sitting at its base, and most people never learn that until they''ve already driven past it a dozen times.</p>

<h2>Shannon Falls: the twenty-minute version</h2>

<p>Shannon Falls Provincial Park sits right off Highway 99, a couple of minutes south of downtown Squamish, and shares its parking area with the Stawamus Chief trailhead. The falls themselves are one of the tallest in the province [VERIFY: current official height figure for Shannon Falls before publishing], and the viewing trail from the parking lot is short, wide, and mostly flat &mdash; realistically ten to fifteen minutes round trip if you just want the classic shot from the lower viewing platform. It''s stroller-friendly as far as the main viewpoint, which is rare for anything with "Chief" in the same sentence.</p>

<h2>The Chief: know which peak you''re signing up for</h2>

<p>The Stawamus Chief hike leaves from the same lot and splits into three summits, and this is the part people get wrong most often. First Peak is the one most hikers mean when they say "I did the Chief" &mdash; a steep, sustained climb with sections of chain and ladder near the top, generally budgeted at half a day round trip for an average hiker. [VERIFY: current official distance/elevation gain and average round-trip time for First Peak &mdash; check BC Parks'' trail page before publishing] Second and Third Peak add more distance and more exposure, and aren''t the move if you''re short on time or daylight. None of the three peaks are a casual add-on to a Shannon Falls stop &mdash; budget the whole afternoon if you''re doing First Peak, full stop.</p>

<h2>If you want the view without the climb</h2>

<p>If what you actually want is height and a wide-open Howe Sound view without a multi-hour scramble, the Sea to Sky Gondola is the honest alternative &mdash; a separate entrance a short drive north on the highway, with a cable car up to a viewing platform and suspension bridge. It''s not free and it''s not the same experience as summiting under your own power, but it solves the "I want the photo, not the workout" problem in about fifteen minutes. [VERIFY: current gondola ticket pricing and operating season before publishing]</p>

<h2>Good to know before you go</h2>

<p>The Shannon Falls / Chief parking lot is one of the busiest on the corridor on a sunny weekend and routinely fills by mid-morning in summer &mdash; if First Peak is the plan, get there early or expect to park along the highway shoulder and walk in. Bring more water than you think you need for the Chief; there''s none on the trail. And if you''re only doing Shannon Falls, you genuinely don''t need hiking boots &mdash; that''s the whole point of this stop.</p>

<p>The honest version of this guide is simple: almost everyone who drives Highway 99 sees the Chief. Almost nobody stops to actually stand under Shannon Falls, and most people who do stop assume the only other option is a half-day summit push. It isn''t. Know which version you''re signing up for before you pull into the lot.</p>',
  'Best Sea to Sky',
  'draft',
  '[
    {"question": "Is Shannon Falls an easy walk?", "answer": "Yes. The trail from the parking lot to the main viewing platform is short, wide, and mostly flat, generally around ten to fifteen minutes round trip."},
    {"question": "Do I have to hike the whole Stawamus Chief to see a view?", "answer": "No. Shannon Falls gives you a payoff view from a short flat walk at the same parking lot, and the Sea to Sky Gondola nearby offers a cable-car alternative if you want height without a multi-hour hike."},
    {"question": "How long does the Stawamus Chief hike take?", "answer": "First Peak, the most commonly hiked summit, is generally budgeted at half a day round trip for an average hiker. Second and Third Peak add more distance and time on top of that."},
    {"question": "Where do you park for Shannon Falls and the Stawamus Chief?", "answer": "Both share one parking lot right off Highway 99 near Squamish. It is one of the busiest lots on the corridor and often fills by mid-morning on sunny weekends, so arrive early or be ready to park along the highway shoulder."}
  ]'::jsonb
);
```

---

## Facebook Post

Everyone on Highway 99 photographs the Chief through the windshield. Almost nobody actually stops.

Here's the part most drivers don't know: the payoff view is a fifteen-minute flat walk away at Shannon Falls, and it shares a parking lot with the full Stawamus Chief summit trail. Same lot, two completely different afternoons — one's a stroller-friendly stroll, the other's a half-day climb with ladders near the top.

We broke down which one you're actually signing up for (plus the gondola option if you want the view with zero climbing) — link in the first comment.

📍 Stawamus Chief Provincial Park, Squamish

Team Shannon Falls or team First Peak — which one's actually you?

---

## Instagram Post

**Caption:**

That granite wall you've photographed through your windshield a dozen times has a fifteen-minute flat walk to a real waterfall view at its base. Most people never stop long enough to find that out. 🏔️

Shannon Falls and the Stawamus Chief summit trail share one parking lot in Squamish — but they are not the same afternoon. One's a short, easy walk to a viewing platform. The other's a steep half-day climb with chains and ladders near the top. Know which one you're signing up for before you park.

Want the view with zero climbing? The Sea to Sky Gondola a few minutes up the highway gets you there by cable car instead.

Full breakdown of what to actually expect from each option — link in our first comment.

Tag someone who's driven past the Chief a hundred times and never once stopped. 👇

First comment: Full guide to Shannon Falls & the Chief → bestseatosky.com/blog/shannon-falls-stawamus-chief-viewpoint

📍 Stawamus Chief Provincial Park, Squamish

#stawamuschief #shannonfalls #squamish #seatosky #explorebc #britishcolumbia #hellobc #bctravel #hikingbc #howsound

---

## Media Notes

Check `carousel-photos/chief/` and `carousel-photos/Squamish/` locally before defaulting to anything below — Rick's photo library is organized by town/location and may already have real shots of Shannon Falls, the Chief trailhead, or the gondola area from a prior visit.

If nothing usable turns up there, this is **Your media** — the payoff of this post depends on showing, not describing, the difference between the two options, so a generic or stock shot would undercut the whole angle:

1. The classic drive-by shot of the Chief face from the highway (or the pullout near it) — 5–8 sec, this is the "everyone's seen this" opener
2. Walking shot on the Shannon Falls trail from the parking lot toward the falls, flat and easy underfoot, visibly stroller/casual-friendly — 8–10 sec
3. The falls themselves from the main viewing platform, wide shot — 8–10 sec
4. If available: a few seconds from the start of the Chief trail itself (the point where it turns from flat to steep/rooty) to visually set up the contrast — 6–8 sec, doesn't need to be the summit
5. Optional closer: gondola cabin or viewing platform if that footage exists — 5–8 sec

Total run time roughly 30–40 sec. On-screen text overlay works well here for the "15 minutes vs. half a day" contrast, since that's the line people will screenshot or save. If summit-trail or gondola footage isn't available, cut those clips and keep the caption honest about what's actually shown — don't imply footage from a hike that wasn't done.

If Rick's library doesn't have Shannon Falls or the Chief trailhead and a shoot isn't realistic before this posts, fall back to **Stock — search "Shannon Falls Squamish"** or "Stawamus Chief Squamish" specifically (genuinely the real location, per brand book) rather than a generic granite-cliff or waterfall stock image.
