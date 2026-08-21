# Draft batch — 2026-08-21

**Topic:** The Pemberton Farm-Stand Loop — a self-guided drive along Pemberton Meadows Road past the corridor's working farms, with Mount Currie as the backdrop.

**Why this topic fits the rotation:** Only one draft exists so far (2026-08-18, Britannia Beach/Highway 99). This one covers Pemberton — the corridor's most under-covered town relative to Squamish and Whistler — and it's a farm/agriculture angle distinct from waterfalls, mountains, or historic sites already used. It's also naturally carousel-shaped ("save this loop"), which content-strategy.md ranks above static photos.

---

## Blog Post (SQL)

```sql
-- Best Sea to Sky — new blog post
-- Paste into Supabase SQL Editor. Does NOT set status/published_at to 'published' —
-- left as 'draft' so Rick reviews and flips status before it goes live.
-- featured_image left NULL: Rick needs a real photo of Pemberton Meadows Road,
-- a farm stand, or the valley with Mount Currie behind it — brand book rule is
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
  'pemberton-farm-stand-loop',
  'The Pemberton Farm-Stand Loop: A Slow Afternoon Off Highway 99',
  'Pemberton Meadows Road runs past working farms, seed-potato fields, and honesty-box stands with Mount Currie behind them. Here''s how to spend an afternoon on the loop.',
  NULL, -- TODO(Rick): real photo of Pemberton Meadows Road, a farm stand, or the valley with Mount Currie behind it, no stock
  'Most people treat Pemberton as the last gas stop before the Duffey Lake Road. Turn off the highway onto Pemberton Meadows Road instead and you''re in one of the few places on the whole corridor still doing exactly what it''s always done: growing food. Here''s how to spend an afternoon on the loop.',
  '<p>Pemberton gets driven through more than it gets stopped in. Most Highway 99 traffic either turns around after Whistler or keeps going toward the Duffey Lake Road and Lillooet, and the village itself gets maybe a gas stop and a coffee. That skips the actual reason Pemberton is different from every other stop on the corridor: it''s a working agricultural valley, not a resort town, and you can drive right into that story on Pemberton Meadows Road.</p>

<h2>Why this valley grows food and Whistler doesn''t</h2>

<p>The Pemberton Valley sits in a rain shadow behind the Coast Mountains, with rich flood-plain soil from the Lillooet River and enough summer heat to actually ripen things. It''s Canada''s largest certified seed-potato growing region &mdash; the isolation that keeps it disease-free for seed stock is the same isolation that makes it feel like a different corridor entirely once you turn off the highway. Mount Currie sits at the head of the valley the whole time you''re out there, which is the view you came for even if the farms are the reason you stopped.</p>

<h2>The loop itself</h2>

<p>Pemberton Meadows Road runs northwest from the village, following the valley floor with the river on one side and farmland on the other. It''s paved the whole useful distance for a day-trip loop, narrow in places, shared with farm equipment &mdash; drive it like you would any rural road, not like the highway. Budget an hour and a half if you''re just driving it end to end and back; budget an afternoon if you''re stopping at stands along the way, which is the point.</p>

<h2>What to actually stop for</h2>

<p>Farm stands out here run on the honesty-box system more often than not &mdash; a cooler or a table, a price list, a lockbox for cash. Bring small bills. What''s available shifts with the season: berries and greens earlier in summer, corn and squash by late summer, potatoes and root vegetables into fall. [VERIFY: current farm-stand names, hours, and which ones are open this week &mdash; check with Pemberton Valley farms directly or the Pemberton & District Chamber of Commerce before publishing, since honesty stands open and close with the harvest]. North Arm Farm, closer to the village end of the road, is the most visitor-known stop on this stretch and runs a seasonal corn maze in early fall. [VERIFY: North Arm Farm''s current hours and corn maze dates before publishing].</p>

<h2>What to bring</h2>

<p>Cash, a cooler bag if you''re buying produce to take home, and time you''re not in a hurry to spend. This isn''t a stop with a gift shop or a patio &mdash; it''s fields, a farm stand, and a mountain. That''s the whole appeal.</p>

<h2>Pair it with</h2>

<p>The loop works well as a slow-down stop on the way back from a Duffey Lake Road day, or as a half-day out of Pemberton village on its own. It''s a good one for families &mdash; kids can see where food actually comes from, which is a harder thing to show them in Squamish or Whistler.</p>',
  'Best Sea to Sky Team',
  'draft',
  '[{"question":"Is Pemberton Meadows Road paved the whole way?","answer":"Yes for the stretch most day-trippers drive — it''s paved but narrow and rural, shared with farm vehicles, so drive it accordingly rather than at highway speed."},{"question":"Do the farm stands take cards?","answer":"Most run on an honesty-box cash system rather than card readers. Bring small bills. [VERIFY: confirm current payment options per stand before publishing]"},{"question":"When''s the best time to go?","answer":"Berries and greens earlier in summer, corn and squash by late summer, potatoes and root vegetables into fall. Check what''s actually in season the week you go — stands change with the harvest."}]'::jsonb
);
```

---

## Facebook Post

Most people treat Pemberton as the last gas stop before the Duffey Lake Road. Turn onto Pemberton Meadows Road instead and you're driving through one of the only working agricultural valleys left on the whole corridor — seed-potato fields, honesty-box farm stands, and Mount Currie at the head of the valley the entire time.

It's not a stop with a gift shop or a patio. It's fields, a cooler full of whatever's in season, and a mountain. Bring small bills — most stands run on the honesty system.

We mapped the loop and what to stop for on the blog — link in the first comment.

Tag someone who still thinks Pemberton is just a gas station on the way to Whistler. 👇

**First comment:** The full Pemberton Farm-Stand Loop, mapped 👉 bestseatosky.com/blog/pemberton-farm-stand-loop

**Location tag:** Pemberton Meadows Road, Pemberton, BC

---

## Instagram Post

**Format:** Carousel (5–7 slides) — list/loop content, ranked above static per content-strategy.md.

**Caption:**

The last gas stop before the Duffey Lake Road is actually a working farm valley, if you turn off the highway.

Pemberton Meadows Road runs past seed-potato fields and honesty-box farm stands with Mount Currie at the end of the valley the whole drive. No gift shop, no patio — just fields, whatever's in season, and cash in small bills for the lockbox.

Full loop + what to stop for: link in our first comment 🌽🥔

**First comment:** The full Pemberton Farm-Stand Loop, mapped 👉 bestseatosky.com/blog/pemberton-farm-stand-loop

**Location tag:** Pemberton Meadows Road, Pemberton, BC

**Hashtags:** #pembertonbc #pembertonvalley #mountcurrie #seatosky #explorebc #britishcolumbia #hellobc #bctravel #farmtotable #pembertonmeadows

---

## Media Notes

**Check `carousel-photos/pemberton/` locally first** — Rick's local photo library is organized by town and this is exactly the kind of stop it likely already covers (farm stands, valley shots, Mount Currie). Confirm what's actually in there before shooting or building anything new.

If nothing usable exists yet, this is **Your media** (preferred over a generated carousel — real farm stands are the whole point of this post):

- 4–6 vertical stills or short (5–10 sec) clips shot along Pemberton Meadows Road: a wide shot of the valley with Mount Currie in frame, a farm stand/honesty-box close-up, a field row (potatoes or corn depending on season), and one shot of hands picking up produce or paying into the lockbox
- Natural light, no styling — a grey-sky shot is fine and on-brand
- If any clips are shot handheld while driving (passenger side, window down), keep them short and clearly labeled b-roll — don't use as the cover slide

**Fallback if Rick has nothing current:** "Blotato can build" a text-forward cover slide (loop map graphic in brand colours, DM Serif Display headline) to open the carousel, with Rick's real photos filling slides 2 onward once available — do not fabricate farm-stand or field photos to fill gaps.
