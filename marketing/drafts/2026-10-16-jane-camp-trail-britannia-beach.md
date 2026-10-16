# Draft batch — 2026-10-16

**Topic:** Jane Camp Trail — the short historic hike above Britannia Beach, to the ruins of a mining camp with a view over Howe Sound.

**Why this topic fits the rotation:** Britannia Beach has only one prior post in this folder (the BC Museum of Mining / Highway 99 stop from 2026-08-18), making it the most under-covered town relative to Squamish (5 posts), Pemberton (4), and Whistler (3). This post covers Britannia Beach again but with a completely different angle — a hike, not the museum — and it's a low-elevation trail that stays accessible into fall after the alpine hikes we've already covered (Elfin Lakes) start losing their weather window.

---

## Blog Post (SQL)

```sql
-- Best Sea to Sky — new blog post
-- Paste into Supabase SQL Editor. Does NOT set status to 'published' —
-- left as 'draft' so Rick reviews and flips status before it goes live.
-- featured_image left NULL: Rick needs a real photo of the Jane Camp
-- ruins or the Howe Sound viewpoint from the trail — brand book rule is
-- no stock imagery standing in for a specific corridor location.

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
  'jane-camp-trail-britannia-beach',
  'Jane Camp Trail: Britannia Beach''s Hike Nobody Mentions',
  'A short, steep loop above Britannia Beach leads to the ruins of a century-old mining camp and a view over Howe Sound — and almost everyone who stops at the museum below has no idea it''s there.',
  NULL, -- TODO(Rick): real photo of the Jane Camp ruins or the Howe Sound viewpoint, no stock
  'Everyone who pulls off Highway 99 at Britannia Beach heads for the big rust-red mill building. Almost nobody looks up at the mountainside behind it, where a trail climbs to the actual camp the miners lived in — stone foundations, rusted equipment, and a view over Howe Sound that the museum parking lot doesn''t give you.',
  '<p>Britannia Beach gets treated as a one-stop town: pull in, see the mill building that is now the BC Museum of Mining, maybe grab a coffee, get back on the highway. Fair enough &mdash; that is the obvious stop. But the mine itself didn''t end at the mill. The people who worked it lived partway up the mountain behind the town, in a cluster of buildings called Jane Camp, and what''s left of it is still up there if you''re willing to put in some uphill walking.</p>

<h2>What the trail actually is</h2>

<p>The Jane Camp Trail is a loop that climbs out of Britannia Beach into the forest above the townsite, following part of the old mine access route before looping back down. It is short by Sea-to-Sky standards &mdash; nothing close to a full-day alpine hike &mdash; but it earns its distance in elevation. Expect a steady uphill grind on the way up and a knee-testing descent on the way back, with exposed roots and loose rock in sections. [VERIFY: exact trail length and elevation gain &mdash; confirm current figures with BC Parks or the Sea to Sky Trail map before publishing]</p>

<p>What you''re walking to is the point: the remains of Jane Camp itself. Concrete and stone foundations, rusted machinery left where it was abandoned, and interpretive signage that explains what you''re actually looking at, since none of it is self-explanatory from the ruins alone. It has the quiet, slightly eerie feel of a place that was a working neighbourhood a century ago and is now just forest reclaiming concrete.</p>

<h2>Why it''s worth the climb</h2>

<p>The payoff isn''t just the ruins &mdash; it''s the view. From sections of the trail and from the camp site itself, you get an elevated look back down over Britannia Beach and out across Howe Sound, a different angle than anything you get from the highway pullout or the museum grounds below. On a clear fall day, with the water that blue-grey it turns in October light, it is one of the better fifteen-minute photo stops on the whole corridor &mdash; except you have to earn it with forty-five minutes of uphill first.</p>

<h2>Good to know before you go</h2>

<p>The trailhead is in Britannia Beach itself, within walking distance of the museum &mdash; this is genuinely a bonus stop you can add to a museum visit, not a separate trip. [VERIFY: exact trailhead location and parking &mdash; confirm with current signage or the Squamish-Lillooet trail map before publishing]. Footwear matters more than the short distance suggests; this is a steep, sometimes loose trail, not a paved interpretive walk, so trail runners or hiking shoes beat sandals. Bring water even for a short hike &mdash; the climb is steady enough to work up a sweat regardless of the forecast.</p>

<p>Because it sits at low elevation right off the highway, Jane Camp stays hikeable later into fall and opens earlier in spring than the alpine trails we''ve covered on this blog, like Elfin Lakes. If the weather''s turned and you still want a legitimate uphill hike with a payoff view, this is the one that''s still open.</p>

<p>The honest pitch: this will never be the main reason you stop in Britannia Beach. But if you''re already pulling off the highway for the museum, an extra hour buys you a hike almost nobody doing the same stop ever bothers with.</p>',
  'Best Sea to Sky',
  'draft',
  '[
    {"question": "Where does the Jane Camp Trail start?", "answer": "The trailhead is in Britannia Beach, within walking distance of the BC Museum of Mining, which makes it an easy add-on to a museum stop rather than a separate trip."},
    {"question": "Is the Jane Camp Trail hard?", "answer": "It is short compared to other Sea-to-Sky hikes, but it is steep, with a steady climb up and a knee-testing descent. Proper footwear is recommended over sandals or flip-flops."},
    {"question": "What will I see at Jane Camp?", "answer": "The ruins of a historic mining camp — stone and concrete foundations, old equipment, and interpretive signage — plus an elevated view over Britannia Beach and Howe Sound."},
    {"question": "Can you hike Jane Camp Trail in the fall?", "answer": "Yes. Because it sits at low elevation right off the highway, it stays accessible later into fall than the corridor''s alpine hikes, which close earlier due to weather and snow."}
  ]'::jsonb
);
```

---

## Facebook Post

Everyone who stops at Britannia Beach heads for the big rust-red mill building. Almost nobody looks up at the mountain behind it — where the miners actually lived.

The Jane Camp Trail climbs from the townsite up to the ruins of the old mining camp: stone foundations, rusted equipment left where it sat, and a view over Howe Sound you don't get from the museum parking lot. It's short, but it's steep — budget about forty-five minutes up.

Bonus: because it's low elevation right off the highway, it stays hikeable later into fall than the alpine trails that are already closing for the season.

Full write-up — link in the first comment.

📍 Britannia Beach, BC

Anyone else just found out there's a real hike here, not just a museum?

---

## Instagram Post

**Caption:**

You've stopped at Britannia Beach for the museum. You've never looked up at the mountain behind it. 🏔️

That's where the miners actually lived — Jane Camp, a cluster of buildings now reduced to stone foundations and rusted equipment, reclaimed by forest. The trail up is short but steep, and the payoff is a view over Howe Sound you don't get from the highway.

It's low elevation, so it's one of the few hikes on the corridor still open once the alpine trails start closing for the season. Full details — including what to wear and what to expect from the climb — in our first comment.

Tag someone who thinks Britannia Beach is just "that museum place." 👇

First comment: Full guide to the Jane Camp Trail → bestseatosky.com/blog/jane-camp-trail-britannia-beach

📍 Britannia Beach, BC

#janecamp #britanniabeach #seatosky #howesound #explorebc #britishcolumbia #hellobc #hikingbc #bctravel #squamish

---

## Media Notes

Check `carousel-photos/Britannia Beach/` locally for existing photos before defaulting to a shot list or stock search — Rick's photo library already has images from the 2026-08-18 museum/lookout shoot, and some of those (especially anything shot from higher ground, or any from a weekend hike) may already cover this trail or the Howe Sound view from above. Confirm what's actually there before deciding whether new footage is needed.

If nothing from the trail itself exists yet, this needs **Your media** — the ruins and the elevated view are specific enough that stock or generic mountain imagery would break the brand book's "no stock standing in for a real corridor location" rule, and no stock photo is going to show the actual Jane Camp ruins anyway.

Shot list if new footage is needed (vertical, phone is fine):

1. Trailhead sign/start in Britannia Beach, with the museum or mill building visible in the background for context — 5–8 sec
2. A few steps of the uphill climb — roots, loose rock, the grade — so the "steep" claim is visually honest, not just text — 8–10 sec
3. First sight of the ruins — foundations or rusted equipment, with a person small in frame for scale — 8–10 sec
4. The Howe Sound view from the camp site or a clearing on the trail, wide shot — 8–10 sec
5. Optional: the descent, or a shot looking back down at the townsite from partway up — 5–8 sec

Total run time roughly 35–40 sec. Text overlay should carry the "steep climb, big payoff" contrast since that's the hook. No voiceover needed if the overlay text does the work; a steady instrumental or light trending audio both fit.
