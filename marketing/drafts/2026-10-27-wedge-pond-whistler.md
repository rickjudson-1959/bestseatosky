# Draft batch — 2026-10-27

**Topic:** Wedge Pond — the small, easy-to-miss pullout just south of Whistler Village where Wedge and Armchair Mountains mirror perfectly on a still morning, especially now with fall colour still hanging on.

**Why this topic fits the rotation:** Whistler already has four posts in this folder (Train Wreck, the farmers market, Lost Lake, Cheakamus Lake), so this keeps Whistler in rotation without repeating a lake, trail, or market angle — Wedge Pond is a roadside pullout, not a hike or a destination lake. It's also seasonally timed: late October is exactly when the remaining larch and aspen colour along the valley floor gives the reflection shot its payoff, before the pond glazes over for winter.

---

## Blog Post (SQL)

```sql
-- Best Sea to Sky — new blog post
-- Paste into Supabase SQL Editor. Does NOT set status to 'published' —
-- left as 'draft' so Rick reviews and flips status before it goes live.
-- featured_image left NULL: Rick needs a real photo of the Wedge Pond
-- reflection or the pullout itself — brand book rule is no stock imagery
-- standing in for a specific corridor location.

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
  'wedge-pond-whistler',
  'Wedge Pond: Whistler''s Quietest Postcard, and Almost Nobody Stops',
  'A small pullout a few minutes south of Whistler Village, Wedge Pond mirrors Wedge and Armchair Mountains on a still morning — no entry fee, no crowds, and late fall is exactly when it looks best.',
  NULL, -- TODO(Rick): real photo of the Wedge Pond reflection or the pullout, no stock
  'Everyone driving into Whistler is looking straight ahead at the village. Almost nobody glances left at the small pond a few minutes south of it, where on a calm morning the mountains show up twice — once in the sky, once in the water.',
  '<p>Wedge Pond doesn''t announce itself. There''s no parking lot banner, no icon on the tourist map that makes it look like a destination. It''s a modest body of water just off Highway 99, a few minutes south of Whistler Village, with a gravel pullout and a short grass verge between the road and the shore. Most people drive past it at highway speed without registering it''s there. That''s exactly why it''s worth five minutes of your drive.</p>

<h2>What makes it worth the stop</h2>

<p>On a still morning, with no wind disturbing the surface, Wedge Pond turns into a mirror. Wedge Mountain and the surrounding peaks show up twice — once rising into the sky, once sitting upside-down in the water — and there''s almost nothing in frame to break the illusion. No dock, no boats, no crowd of other photographers elbowing for the same angle. In late fall, with the last of the valley-floor larch and aspen colour still clinging to the shoreline before the first real cold snap strips it, the reflection shot gets a warm border it won''t have again until next October. [VERIFY: current state of fall colour and whether leaves are still on at time of posting — confirm with a recent drive-by before publishing]</p>

<p>It''s not a hike, it''s not a swimming lake, and it''s not going to anchor a full day out. It''s a two-to-five-minute stop that rewards people who actually pull over instead of just slowing down to look.</p>

<h2>How to actually get the shot</h2>

<p>Timing matters more than anything else here. Wind kills the reflection, so early morning — before the day''s thermal winds pick up — is reliably your best window. A grey, still morning works better than a bright, breezy afternoon, which makes this a good stop to build into a trip even on a day that otherwise looks like a washout. Bring a lens cloth; pond-side mornings mean dew and condensation on glass.</p>

<h2>Good to know before you go</h2>

<p>The pullout is on the west side of Highway 99, a short drive south of Whistler Village toward Function Junction. [VERIFY: exact kilometre marker or cross street for the pullout, and confirm current parking capacity — small pullouts like this can fill with just two or three cars]. There''s no fee and no facilities, so treat it as a quick roadside stop, not a picnic destination with amenities. Watch for highway traffic when pulling in and out; it''s a fast stretch of road and the shoulder is narrow.</p>

<p>Because the whole appeal is the reflection, a windy or rainy day can leave you looking at a choppy, unremarkable pond with nothing to show for the stop. If the forecast calls for wind, this is one to save for your next calm morning rather than forcing it on a bad-weather day.</p>

<p>The honest pitch: Wedge Pond will never be the reason you plan a trip to Whistler. But if you''re already driving the highway and the morning is still, it''s one of the easiest two-minute wins on the whole corridor — and almost nobody bothers to find out.</p>',
  'Best Sea to Sky',
  'draft',
  '[
    {"question": "Where is Wedge Pond located?", "answer": "Wedge Pond is a small roadside pullout on Highway 99 a few minutes south of Whistler Village, on the way toward Function Junction."},
    {"question": "Is Wedge Pond worth stopping for?", "answer": "If the morning is calm, yes. The pond mirrors Wedge Mountain and the surrounding peaks on a still surface, giving a reflection photo with almost no crowds. On a windy day the effect disappears, so it is worth timing your stop around the weather."},
    {"question": "What is the best time to photograph Wedge Pond?", "answer": "Early morning, before daily winds pick up, gives the calmest water and the best reflection. Late fall adds warm shoreline colour to the shot before winter sets in."},
    {"question": "Is there a fee to visit Wedge Pond?", "answer": "No. It is a free roadside pullout with no facilities, so it works best as a quick two-to-five-minute stop rather than a planned picnic destination."}
  ]'::jsonb
);
```

---

## Facebook Post

Everyone driving into Whistler is looking straight ahead at the village. Almost nobody glances left at the small pond a few minutes south of it — where on a calm morning, the mountains show up twice.

Wedge Pond is a roadside pullout, not a destination. No fee, no crowd, no dock in the shot. On a still morning, Wedge Mountain mirrors perfectly in the water, and right now the last of the fall colour on the shoreline is giving it a warm border before winter strips it bare.

The catch: wind kills the reflection completely. This is a "check the forecast, then pull over" stop, not a plan-your-day-around-it one.

Full write-up — link in the first comment.

📍 Wedge Pond, Whistler, BC

Anyone else have a two-minute stop on this drive nobody else seems to know about?

---

## Instagram Post

**Caption:**

You're driving into Whistler, eyes on the village ahead. You just passed the best photo of the whole drive. 🏔️

Wedge Pond is a small roadside pullout a few minutes south of the village — no sign, no crowd, no entry fee. On a still morning, the mountains show up twice: once in the sky, once mirrored in the water. Right now, the last of the fall colour on the shoreline gives the shot a warm edge before winter takes it away.

One condition: wind kills the whole effect. Early, calm mornings only — we break down the timing in the first comment.

Tag someone who always drives past the "nothing" spots on this highway without stopping. 👇

First comment: Full guide to Wedge Pond → bestseatosky.com/blog/wedge-pond-whistler

📍 Wedge Pond, Whistler, BC

#wedgepond #whistler #whistlerbc #seatosky #explorebc #britishcolumbia #hellobc #bctravel #highway99 #fallcolours

---

## Media Notes

Check `carousel-photos/whistler/` locally for existing photos before defaulting to a shot list or stock search — Rick's library has a general Whistler folder, and any past drive-by shot of a calm morning near Function Junction may already cover this without needing a dedicated trip.

If nothing from Wedge Pond itself exists yet, this needs **Your media** — a reflection shot is the entire point of the post, and no stock photo is going to show this specific pond on a specific calm morning. Generic "mountain lake" stock would directly break the brand book's rule against standing in for a real corridor location.

Shot list if new footage is needed (vertical, phone is fine, shoot early on a calm morning):

1. Pulling off the highway and parking at the shoulder, pond coming into view through the windshield or on foot — 5–8 sec
2. The reflection itself, straight-on, mountain and its mirror image both fully in frame — 8–10 sec, this is the hero shot, worth a few tries for the calmest water
3. A slow pan across the shoreline showing any remaining fall colour — 6–8 sec
4. A wide shot including the highway pullout for context, so people can recognize where to stop — 5–8 sec
5. Optional: a phone or hand dipping toward the water to show stillness/no wind — 3–5 sec

Total run time roughly 30–35 sec. Text overlay should carry the "you've driven past this a hundred times" hook plus the wind-dependent timing tip, since that's the detail people will screenshot before their own drive. No voiceover needed if overlay text does the work; a quiet, calm-morning-feeling instrumental track fits better than upbeat trending audio here.
