# Draft batch — 2026-10-06

**Topic:** Keyhole Hot Springs — the natural soaking pools up a forest service road outside Pemberton, and the honest version of what it takes to get there.

**Why this topic fits the rotation:** Pemberton already has three posts (farm stand loop, Nairn Falls, One Mile Lake), but all three are easy, low-effort stops. This is a genuinely different angle for the same town — a backcountry reward-for-effort trip, which also happens to be exactly the kind of high-intrigue, highly-save-able topic Reels and carousels perform best with. Whistler and Squamish are both more heavily represented in the folder right now, so Pemberton is the right town to return to, and nothing in the existing drafts touches hot springs, forest service roads, or a trip that needs real pre-planning advice — all of which this post is built around.

---

## Blog Post (SQL)

```sql
-- Best Sea to Sky — new blog post
-- Paste into Supabase SQL Editor. Does NOT set status to 'published' —
-- left as 'draft' so Rick reviews and flips status before it goes live.
-- featured_image left NULL: Rick needs a real photo of the actual pools
-- or the Ryan River drainage approach — brand book rule is no stock
-- imagery standing in for a specific corridor location, and this is a
-- spot where a generic "hot springs" stock photo would be an easy and
-- obvious fake to a reader who's actually been there.

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
  'keyhole-hot-springs-pemberton',
  'Keyhole Hot Springs, Pemberton: What It Actually Takes to Get There',
  'Keyhole Hot Springs sits up a forest service road outside Pemberton — natural soaking pools with no services, no maintenance, and road access that changes year to year. Here''s what to know before you go.',
  NULL, -- TODO(Rick): real photo of the pools or the Ryan River approach trail, no stock
  'Keyhole Hot Springs shows up on every "secret BC hot springs" list, which means it isn''t actually a secret anymore. What most of those lists leave out is the part that matters: the road in changes condition every year, there''s nothing out there but the pools themselves, and showing up unprepared is how a good day turns into a long one.',
  '<p>Keyhole Hot Springs sits in the Ryan River drainage off the Lillooet River valley, north of Pemberton, and it''s become one of the most talked-about natural hot springs in the province over the last several years &mdash; for good reason. Unlike a developed spot with a parking lot and a boardwalk, these are genuinely natural soaker pools, built up over time by the people who visit them, fed by hot mineral water with a cold river running right alongside for the plunge-and-soak routine that makes this kind of hot spring worth the trip in the first place.</p>

<h2>Getting there is the actual trip</h2>

<p>This isn''t a stop you add to a highway day. It''s a forest service road drive followed by a hike, and both legs depend entirely on current conditions. [VERIFY: current FSR access point, road condition, and whether any bridges or washouts affect the route this season &mdash; this has changed multiple times in recent years and needs a fresh check immediately before publishing, ideally against a current trip report] High-clearance and often 4x4 has historically been the baseline for the drive itself, and the hike that follows is unmarked backcountry trail, not a maintained park path. [VERIFY: current one-way hiking distance and typical round-trip time] There is no cell service once you''re off the highway, so tell someone your plan and bring an offline map, not just a phone signal you''re assuming will be there.</p>

<h2>What''s actually at the pools</h2>

<p>Several small pools are tucked along the riverbank, built and rebuilt by visitors rather than maintained by any agency &mdash; water temperature varies pool to pool and can change with the season and the river level. There are no facilities of any kind: no outhouse, no garbage bins, no cell signal, no one checking on you. Everything you pack in, you pack out, including anything left behind by someone else, because this spot has a real history of getting loved to death and then getting access restricted as a result.</p>

<h2>Good to know before you go</h2>

<p>Go with proper backcountry basics: layers for a wet hike that ends in a hot pool, water, a headlamp if there''s any chance you''re timing it near dusk, and a real plan for the drive in case the road is rougher than you expected. Weekends in peak summer draw a crowd that doesn''t match the "hidden gem" reputation anymore &mdash; a weekday or shoulder-season trip is a genuinely different experience. [VERIFY: any current access restrictions, closures, or local land-use advisories before publishing, since this is Crown land without formal park management and conditions can change without much notice]</p>

<p>This is the one Pemberton-area trip on this corridor that rewards research over spontaneity. It''s not a stop you make on the way to somewhere else &mdash; it''s the whole day, and it''s worth doing right.</p>',
  'Best Sea to Sky',
  'draft',
  '[
    {"question": "Do you need a 4x4 to get to Keyhole Hot Springs?", "answer": "High-clearance has historically been the baseline for the forest service road, and 4x4 is often recommended depending on current road condition. Check current trip reports before you go, since conditions change."},
    {"question": "Is Keyhole Hot Springs free?", "answer": "Yes, there is no fee, but there are also no services of any kind — no facilities, no staff, and no cell service. Pack in everything you need and pack out everything you bring."},
    {"question": "How long is the hike to Keyhole Hot Springs?", "answer": "The hike follows the forest service road drive and covers real backcountry trail, not a maintained park path. Distance and time vary with current road access — confirm against a recent trip report before heading out."},
    {"question": "Is Keyhole Hot Springs crowded?", "answer": "It can be, especially on summer weekends, since it has become well known despite being off the beaten path. A weekday or shoulder-season visit is a quieter experience."}
  ]'::jsonb
);
```

---

## Facebook Post

Every "secret BC hot springs" list has Keyhole Hot Springs on it by now. What most of them skip is the part that actually matters.

This one isn't a highway stop — it's a forest service road drive followed by a real backcountry hike, with no cell service, no facilities, and road conditions that change year to year. The pools themselves are worth it: natural soaker pools built by the people who visit them, with a cold river running right alongside for the plunge-and-soak routine.

We put together what to actually know before you go — road access, what to pack, and why a weekday trip beats a summer weekend. Link in the first comment.

📍 Keyhole Hot Springs, Pemberton Valley

Have you made the trip out? Worth it, or overhyped?

---

## Instagram Post

**Caption:**

Natural hot springs, zero facilities, and a road that changes every year. 🏔️

Keyhole Hot Springs is real, it's worth the trip, and it is not a casual stop. Forest service road + backcountry hike to get there, no cell service once you're off the highway, and pack-in-pack-out for everything.

We've got the honest version of what to know before you go — current road access, what to pack, best time to go — link in our first comment.

Tag the friend who's always down for the long way to a good soak. 👇

First comment: Full guide to Keyhole Hot Springs → bestseatosky.com/blog/keyhole-hot-springs-pemberton

📍 Keyhole Hot Springs, Pemberton Valley

#keyholehotsprings #pembertonbc #seatosky #explorebc #britishcolumbia #hellobc #bctravel #hotsprings #bchiking #pembertonvalley

---

## Media Notes

**Check `carousel-photos/pemberton/` locally for existing photos before defaulting to a shot list or stock search** — if Rick or anyone on his behalf has actually made this trip and has footage of the pools, the drive in, or the river, that's far stronger than anything generated and should be used first.

If nothing usable exists yet, this is a case where original footage genuinely isn't realistic to get on short notice (it's a real backcountry trip, not a quick local errand), so:

**Blotato can build** — a carousel pulling from this post's own list content: road-access basics, what to pack, best time to go, and the "pack in, pack out" reminder, each as its own slide in brand colours, ending on a follow CTA. This avoids needing any photo of the pools at all and leans into the "practical guide" angle, which is also the most trustworthy way to cover a spot like this without implying footage that doesn't exist.

**Stock — search "Keyhole Hot Springs" or "Pebble Creek Hot Springs BC"** on Dreamstime as a fallback only if Rick wants a cover image for the carousel or blog post and can confirm a licensed photo is genuinely of this location, not a generic hot-springs or mountain stock shot standing in for it. If no verified photo of the actual pools can be found, skip the image entirely rather than use a lookalike — a texture shot (steam, river rock, forest canopy) is the safer fallback per the brand book's imagery rules.
