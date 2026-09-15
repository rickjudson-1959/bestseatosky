# Draft batch — 2026-09-15

**Topic:** Porteau Cove Provincial Park — the Highway 99 stop between Vancouver and Squamish on Howe Sound itself, known for shore diving on its artificial reefs, walk-in oceanfront camping, and a pebble beach with some of the best water-level views on the whole corridor.

**Why this topic fits the rotation:** The last two batches (Whistler farmers market, 2026-09-08; Squamish post-hike patios, 2026-09-11) were both town-specific food/lifestyle posts. Before that, three batches in a row covered highway pull-offs and waterfalls (Britannia Beach, Brandywine Falls, Nairn Falls) — content-strategy.md calls out "the drive itself" as its own rotation slot alongside the four towns, and Porteau Cove keeps that slot going with a genuinely different angle: it's on the water, not a waterfall, and the diving/camping hook hasn't been touched by any prior draft (checked against all eight files currently in `marketing/drafts/`). It also sits at the Vancouver end of the corridor, which the existing drafts skew away from — everything so far clusters around Squamish, Whistler, and Pemberton.

---

## Blog Post (SQL)

```sql
-- Best Sea to Sky — new blog post
-- Paste into Supabase SQL Editor. Does NOT set status to 'published' —
-- left as 'draft' so Rick reviews and flips status before it goes live.
-- featured_image left NULL: Rick needs a real photo of the beach, the
-- campground, or a diver entering the water at Porteau Cove — brand book
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
  'porteau-cove-provincial-park',
  'Porteau Cove: The Highway 99 Stop for Diving, Camping, and the Best Ocean View on the Whole Drive',
  'Most of the Sea to Sky drive is about mountains. Porteau Cove Provincial Park is the stop that''s about the water — shore diving on artificial reefs, oceanfront camping, and a pebble beach looking straight down Howe Sound.',
  NULL, -- TODO(Rick): real photo of the beach/Howe Sound view, the campground, or a diver suiting up at the shore access — no stock
  'Between Vancouver and Squamish, Highway 99 runs right alongside Howe Sound, and Porteau Cove Provincial Park is where you can actually get down to the water instead of just glancing at it through the trees. It''s known among divers as one of the best shore-diving spots in the province, it has walk-in campsites close enough to hear the water, and the pebble beach gives you a view straight down the sound that most people only get from a boat.',
  '<p>Most of the Sea to Sky corridor sells itself on mountains — the Chief, Black Tusk, the peaks around Whistler Village. Porteau Cove Provincial Park is the stop that flips that, because the whole point of it is the water. It sits on Highway 99 between Horseshoe Bay and Squamish [VERIFY: exact km marker and drive time from both Vancouver and Squamish before publishing directions people will drive by], right on the shore of Howe Sound, and it works as a quick pull-off or a full afternoon depending on what you''re there for.</p>

<h2>Getting there</h2>

<p>The park has its own signed turnoff and a paved parking area close to the highway, so it''s an easy stop to build into a drive without backtracking. [VERIFY: current BC Parks day-use parking fee, lot size, and whether it fills up on summer weekends — worth confirming against BC Parks'' own listing before publishing]. Unlike a lot of stops on this stretch of highway, there''s no trail walk involved to get your first view — the beach and the water are right there from the lot.</p>

<h2>Why divers already know this spot</h2>

<p>Porteau Cove has a reputation among BC divers as one of the best accessible shore-dive sites on the coast, built around artificial reefs placed offshore specifically to create dive habitat. [VERIFY: current list of sunk vessels/structures and their names, depths, and whether all sites remain open and safe to dive, directly against BC Parks or a local dive shop before publishing anything more specific than "artificial reefs"]. You don''t need to dive to appreciate that this is a working dive site, not a swimming beach with a view — if you see gear bags and full wetsuits in the lot on a grey Tuesday morning, that''s why.</p>

<h2>Camping right on the water</h2>

<p>The park''s campground is walk-in, close enough to the shoreline that a lot of sites have a water view or something close to it. [VERIFY: current number of campsites, walk-in distance from the parking area, reservation system (Discover Camping), seasonal opening dates, and fees before publishing anything a visitor might plan a trip around]. It''s a different kind of Sea to Sky camping than a forested Provincial Park site further up the corridor — you fall asleep to the sound of the water instead of the trees.</p>

<h2>The beach itself</h2>

<p>It''s a pebble beach, not sand, with a view straight down Howe Sound toward Anvil Island and beyond. On a clear day it''s one of the best water-level viewpoints on the entire corridor, and locals watch for seals and, less often, orcas passing through the sound [VERIFY: how commonly wildlife is actually sighted here before stating it as something visitors should expect rather than a possibility]. It''s a good picnic stop — flat, easy walking, no hiking boots required — and it holds up in overcast weather better than a lot of mountain viewpoints do, since the water and the islands still read clearly under cloud.</p>

<h2>Good to know before you go</h2>

<p>[VERIFY: current washroom/picnic shelter facilities, whether there''s a day-use fee separate from camping fees, and cell coverage at the site before publishing anything visitors would rely on]. Bring layers — it''s exposed to the water and can be noticeably cooler and windier than Squamish or Vancouver even on a warm day.</p>

<h2>Pair it with</h2>

<p>Porteau Cove works well as the first stop heading north out of Vancouver, before the highway climbs into the more mountainous stretch toward Squamish, or as a last look at the water on the way back down. It''s a good complement to a Squamish day trip — mountains on the way up, water on the way home.</p>',
  'Best Sea to Sky Team',
  'draft',
  '[{"question":"Can you dive at Porteau Cove Provincial Park?","answer":"Yes — it''s known as one of the best shore-diving spots on the BC coast, built around artificial reefs offshore. [VERIFY: current dive site conditions and access details directly with BC Parks or a local dive shop before publishing specifics]."},{"question":"Is there camping at Porteau Cove?","answer":"Yes, walk-in oceanfront campsites. [VERIFY: current site count, fees, and reservation details via Discover Camping before publishing]."},{"question":"Where is Porteau Cove Provincial Park?","answer":"On Highway 99 between Horseshoe Bay and Squamish, right on Howe Sound. [VERIFY: exact km marker before publishing]."},{"question":"Is Porteau Cove a sandy beach?","answer":"No — it''s a pebble beach, with views down Howe Sound toward Anvil Island."}]'::jsonb
);
```

---

## Facebook Post

Most of the Sea to Sky drive is about mountains. Porteau Cove is the stop that's about the water.

Right on Highway 99 between Horseshoe Bay and Squamish, this is one of the best shore-diving spots on the whole BC coast — divers come for the artificial reefs offshore. You don't need a tank to enjoy it though: there's a pebble beach with a straight-down view of Howe Sound, walk-in campsites close enough to fall asleep to the water, and an easy pull-off with no trail walk needed to get your first look.

We put together what to expect before you go — link in the first comment.

Ever pulled off here, or always driven straight past it? 👇

**First comment:** Porteau Cove, mapped 👉 bestseatosky.com/blog/porteau-cove-provincial-park

**Location tag:** Porteau Cove Provincial Park, BC

---

## Instagram Post

**Format:** Reel (10–20 sec) — content-strategy.md ranks Reels first for reaching non-followers, and this location has a strong visual contrast (highway pull-off → open water/Howe Sound view) that works better as a short reveal clip than a static photo.

**Caption:**

The Sea to Sky stop that's actually about the water. 🌊

Porteau Cove Provincial Park sits right on Highway 99 between Horseshoe Bay and Squamish — no trail walk needed, just pull off and you're at the shore. It's one of BC's best-known shore-diving spots, with a pebble beach looking straight down Howe Sound and walk-in campsites close enough to hear the tide.

Mountains get all the attention on this drive. This one's for the water. Full guide — link in our first comment.

**First comment:** Porteau Cove, mapped 👉 bestseatosky.com/blog/porteau-cove-provincial-park

**Location tag:** Porteau Cove Provincial Park, BC

**Hashtags:** #porteaucove #howesound #seatosky #highway99 #squamish #explorebc #britishcolumbia #hellobc #bctravel #vancouverisland

---

## Media Notes

**Check `carousel-photos/` locally first** — Rick's library is organized by town (`chief/`, `whistler/`, `pemberton/`, `Britannia Beach/`, `horseshoe bay/`). Porteau Cove sits just north of Horseshoe Bay on the drive, so the `horseshoe bay/` folder is the most likely place to check, though this may be the first time this specific park has been shot — confirm what's actually there before defaulting to a shot list.

If nothing usable exists yet, this is **Your media** (preferred):

- One 8–12 sec clip pulling into the parking area and walking down to the beach, phone vertical, natural audio or a trending audio track over it
- One 5–8 sec panning shot from the beach looking down Howe Sound toward Anvil Island, ideally on a clearer day
- One close detail shot of the pebble beach / water's edge, 3–5 sec, for the cold open or cover frame
- If a diver or dive group happens to be there that day, one respectful, non-intrusive clip of gear-up at the shore access — real activity, not staged — otherwise skip this shot rather than posing one
- One clip with a person at the shoreline for scale, mid-look rather than turned to camera, per the brand book's "not posed" rule

**Fallback if Rick has nothing current:** "Stock — search Porteau Cove Provincial Park" on a licensed source like Dreamstime as a last resort — real place only, never a generic coastline or lookalike sound standing in for it.
