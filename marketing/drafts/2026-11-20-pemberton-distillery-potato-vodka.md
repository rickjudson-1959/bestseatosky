# Draft batch — 2026-11-20

**Topic:** Pemberton Distillery — the small craft distillery making vodka and other spirits from Pemberton Valley potatoes. An indoor, year-round stop that works especially well in late November, when alpine hikes and farm-stand loops are out of season but the valley itself is still worth the detour.

**Why this topic fits the rotation:** The last five posts cycled Pemberton (Joffre Lakes, 11-03) → Squamish (Brackendale eagles, 11-06) → the drive (winter driving, 11-10) → Britannia Beach (Minaty Bay, 11-13) → Whistler (Function Junction, 11-17), so Pemberton is next up in the town rotation. Every existing Pemberton post so far is outdoor and seasonal — the farm stand loop (summer produce), Nairn Falls, One Mile Lake, Keyhole Hot Springs, Joffre Lakes — none of them cover anything indoors or tied to the valley's actual working economy. Pemberton Distillery is a genuinely different angle: it's open and relevant in late November when the farm stands are closed and the alpine lakes are snowed in, and it ties the valley's potato farming (the thing Pemberton is actually known for agriculturally) to something visitors can taste and buy.

---

## Blog Post (SQL)

```sql
-- Best Sea to Sky — new blog post
-- Paste into Supabase SQL Editor. Does NOT set status to 'published' —
-- left as 'draft' so Rick reviews and flips status before it goes live.
-- featured_image left NULL: Rick needs a real photo of Pemberton Distillery
-- itself — the tasting room, the stills, or the bottles on the shelf — brand
-- book rule is no stock imagery standing in for a specific corridor business.

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
  'pemberton-distillery-potato-vodka',
  'Pemberton Distillery: The Vodka That Starts in a Potato Field',
  'A small craft distillery in the Pemberton Valley turns local potatoes into vodka and other spirits — one of the few Highway 99 stops that''s just as good on a grey November afternoon as it is in July. Here''s what it is and why it''s worth the detour.',
  NULL, -- TODO(Rick): real photo of the tasting room, the stills, or bottles on the shelf, no stock
  'Most of what Pemberton is known for growing ends up on a dinner plate. Some of it ends up in a glass instead. Pemberton Distillery takes the valley''s potatoes and turns them into vodka, gin, and a handful of other spirits — and unlike most of what we write up on this corridor, it doesn''t care what the weather''s doing outside.',
  '<p>Drive the Pemberton Valley in summer and you''ll see why the farm stand loop is worth a whole post of its own &mdash; fields of potatoes, carrots, and seed crops running right up to the mountains on both sides. Pemberton Distillery is what happens when someone decides the potatoes don''t all need to go to market as potatoes. It''s a small, working craft distillery that takes the valley''s own crop and turns it into vodka, along with a short lineup of other spirits. [VERIFY: confirm current spirit lineup &mdash; vodka plus which other products (gin, aquavit, etc.) are actually in production and for sale right now before publishing].</p>

<h2>Why potatoes, and why here</h2>

<p>Pemberton grows seed potatoes for a reason &mdash; the valley''s isolation and growing conditions make it good ground for disease-free seed stock, which is a big part of why the local farming economy looks the way it does. A potato-based vodka isn''t a gimmick layered on top of that; it''s a pretty direct use of what''s already coming out of the ground here. That''s the kind of story that''s easy to undersell with a straight ingredient list and much better told standing in the tasting room hearing it from someone who actually works there.</p>

<h2>What there is to do there</h2>

<p>This is a working distillery with a retail and tasting component, not a theme-park tour &mdash; expect a small tasting room rather than a big visitor centre. [VERIFY: confirm current tasting room hours, whether tastings require a reservation, whether a paid tour is offered, and current pricing for both before publishing &mdash; small distilleries often adjust hours seasonally]. Bottles are available to buy on site, and it''s the kind of stop that works well paired with a Pemberton Valley drive-through rather than as a destination on its own, at least the first time.</p>

<h2>Why late November is actually a good time for this one</h2>

<p>Most of what we''ve written up about Pemberton so far &mdash; the farm stands, One Mile Lake, Joffre Lakes &mdash; depends on the valley being green, dry, or at least not buried. Pemberton Distillery doesn''t. It''s indoors, it''s open on a schedule rather than a season, and a tasting room with the heat on is exactly the kind of stop that makes sense on a cold, grey corridor day when you don''t want to be standing in a field. If you''re driving up for a winter weekend and the trails are out of reach, this is a way to still bring something of the valley home with you.</p>

<h2>Getting there and what to know before you go</h2>

<p>[VERIFY: confirm current address, whether it''s reachable directly off Highway 99 or requires a short detour into Pemberton proper, and parking situation before publishing]. As with any distillery tasting room, plan for a designated driver if you''re trying more than one pour, and check ahead if you''re hoping to buy a specific bottle &mdash; small-batch runs sell out. [VERIFY: confirm whether bottles are also available through BC Liquor Stores or only on site, since that changes how firmly to tell readers "buy it here or not at all"].</p>',
  'Best Sea to Sky Team',
  'draft',
  '[{"question":"What is Pemberton Distillery known for?","answer":"A small craft distillery in the Pemberton Valley that makes vodka from locally grown potatoes, along with a short lineup of other spirits. [VERIFY: confirm current full product lineup before publishing]."},{"question":"Can you do tastings or tours at Pemberton Distillery?","answer":"It has a tasting room and retail shop on site. [VERIFY: confirm current tasting/tour format, whether reservations are required, and pricing before publishing]."},{"question":"Is Pemberton Distillery open in winter?","answer":"As an indoor, retail-based stop, it doesn''t depend on trail or weather conditions the way most other Pemberton Valley attractions do, which makes it a solid cold-weather option. [VERIFY: confirm current winter hours before publishing]."},{"question":"Where can you buy Pemberton Distillery spirits?","answer":"Bottles are available on site at the distillery. [VERIFY: confirm whether they are also stocked at BC Liquor Stores or other retailers before publishing]."}]'::jsonb
);
```

---

## Facebook Post

**Format:** Static photo / short album (2–3 photos) — a tasting-room stop sells itself on the product and the place, not motion; no Reel needed here.

**Location tag:** Pemberton, BC

**Post text:**

Pemberton grows some of the best seed potatoes in the province. Some of them don't end up on a plate — they end up in a glass.

Pemberton Distillery takes the valley's own potato crop and turns it into vodka, right there in the Pemberton Valley. Small tasting room, small-batch spirits, and unlike pretty much everything else we've written up in Pemberton, it doesn't care if it's snowing outside.

If the trails are out of reach this time of year, this is still a reason to make the drive.

Full guide in the first comment. Have you tried the local potato vodka? 👇

**First comment (link):**
Full guide here → bestseatosky.com/eat/pemberton-distillery-potato-vodka [VERIFY: confirm correct live URL path/category for this guide before posting]

**Hashtags (~10):**
#pemberton #pembertonbc #pembertonvalley #seatosky #seatoskyhighway #explorebc #britishcolumbia #hellobc #bctravel #supportlocalbc

---

## Instagram Post

**Format:** Carousel (3–5 photos) — bottles, tasting room, the valley itself; a "here's what it is and why it's worth it" format that doesn't need Reel-level production.

**Caption:**

From the field to the glass. 🥔

Pemberton's known for growing seed potatoes — the kind of crop that doesn't usually get a second thought once it leaves the valley. Pemberton Distillery gives some of it a second life, turning local potatoes into small-batch vodka right there in town.

No hiking boots required for this one, and it's open when the alpine lakes aren't.

Full guide linked in the first comment 👇

**First comment (link):**
bestseatosky.com/eat/pemberton-distillery-potato-vodka [VERIFY: confirm correct live URL path before posting]

**Location tag:** Pemberton, BC

**Hashtags (~10):**
#pemberton #pembertonbc #pembertonvalley #seatosky #seatoskyhighway #explorebc #britishcolumbia #hellobc #bctravel #supportlocalbc

---

## Media Notes

**Check `carousel-photos/pemberton/` locally first** — Rick's photo library is gitignored and not visible to this routine, but per content-strategy.md this is exactly the kind of town folder that's likely to already have usable shots from past visits to the valley. Look there before shooting anything new or falling back to stock.

If nothing in that folder covers the distillery itself, this is a **"Your media"** post — it needs a short, low-effort shoot next time Rick is through Pemberton:

- 2–3 stills or 5–10 second clips inside the tasting room: the bottle lineup on the shelf, a pour being made, or the stills/equipment if visible from the retail area
- One shot of the exterior/signage so readers can recognize it from the road
- One detail shot of a bottle label in hand, natural light
- Vertical orientation for the Instagram carousel crop; no filter needed — tasting rooms often run warm/amber light, which is fine and on-brand
- No voiceover or trending audio needed for this static/carousel format; if reshot as a Reel later, a quick "from this field to this bottle" cut between a potato field shot and the tasting room would work well

**Fallback if no fresh footage is realistic soon:** Stock — search "Pemberton Distillery" specifically (per brand book: real-place stock only, never a generic distillery or liquor-bottle stock photo standing in for this one). Do not substitute generic bar/spirits stock.
