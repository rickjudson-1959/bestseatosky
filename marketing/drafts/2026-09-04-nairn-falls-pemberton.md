# Draft batch — 2026-09-04

**Topic:** Nairn Falls Provincial Park, just south of Pemberton on Highway 99 — a short forested walk along the Green River to a powerful falls squeezed through a narrow rock chute, plus the safety note that actually matters here (the current, not the view).

**Why this topic fits the rotation:** Existing drafts cover Britannia Beach (2026-08-18), Pemberton's farm-stand loop (2026-08-21), Squamish's swimming holes (2026-08-25), Whistler's Train Wreck Trail (2026-08-28), and Brandywine Falls as a Highway 99 drive stop (2026-09-01). Pemberton has only had the farm-loop angle so far — this is a different reason to stop there (a short hike and a waterfall, not agriculture), and it keeps a second "quick pull-off on the 99" post in rotation without repeating Brandywine's stretch of highway (Nairn sits south of Pemberton, well past Whistler).

---

## Blog Post (SQL)

```sql
-- Best Sea to Sky — new blog post
-- Paste into Supabase SQL Editor. Does NOT set status to 'published' —
-- left as 'draft' so Rick reviews and flips status before it goes live.
-- featured_image left NULL: Rick needs a real photo of Nairn Falls itself
-- or the forested trail along the Green River — brand book rule is no
-- stock imagery standing in for a specific corridor location.

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
  'nairn-falls-pemberton',
  'Nairn Falls: The Short Walk Off Highway 99 South of Pemberton Worth the Detour',
  'A short forested trail along the Green River leads to Nairn Falls, one of the most powerful waterfalls on the Sea to Sky corridor — plus what to know before you get near the water.',
  NULL, -- TODO(Rick): real photo of Nairn Falls or the Green River trail — no stock
  'South of Pemberton, a well-marked turnoff on Highway 99 leads to Nairn Falls Provincial Park, where a flat, forested trail along the Green River ends at a viewpoint over one of the most forceful waterfalls on the whole corridor. It''s an easy add-on to a Pemberton day trip or a stop on the way north toward Joffre Lakes and the Duffey Lake Road — with one thing worth knowing before you go: the falls are more dangerous than they look.',
  '<p>Most of the roadside waterfalls between Squamish and Whistler get all the attention, which is part of why Nairn Falls Provincial Park, just south of Pemberton, stays quieter than it deserves to be. The turnoff is well signed off Highway 99 [VERIFY: exact km marker and whether the entrance is northbound- or southbound-only before publishing directions people will drive by], and from the parking area a forested trail follows the Green River to a viewing area above the falls.</p>

<h2>Getting there</h2>

<p>The trail runs along the riverbank through second-growth forest, mostly flat with a few gentle grades, and takes most people about twenty to thirty minutes each way at an easy pace [VERIFY: current BC Parks-listed trail distance and average time before publishing]. It''s a wider, well-used path rather than technical backcountry, so runners are fine and it works for most fitness levels — though the trail can get muddy and rooty after rain, which is often.</p>

<h2>What you''ll see — and the part that matters more</h2>

<p>The Green River narrows into a rock chute here and the water gets forced through at real speed, dropping into a churning pool below [VERIFY: exact drop height before publishing — cite BC Parks'' own figure rather than repeating secondhand numbers]. It''s a genuinely powerful sight, especially in spring runoff, and it photographs well from the designated viewpoints. The part that matters more than the photo: the current at Nairn Falls is strong and the rock around it is often wet and slick, and this stretch of river has a history of people getting into serious trouble by climbing down toward the water or swimming near the falls [VERIFY: current BC Parks safety signage wording and any recent incident history before publishing anything more specific than a general caution]. Stay on the marked viewing platforms and keep kids and dogs back from the edge — the falls are worth seeing exactly as they''re meant to be seen, from above.</p>

<h2>Good to know before you go</h2>

<p>There''s a campground in the park [VERIFY: current BC Parks reservation status and whether it''s first-come or reservation-only this season], and day-use parking is generally accessible without a campground booking. [VERIFY: current day-use parking fee status, if any, before publishing]. Washrooms are available near the trailhead [VERIFY: current facility status]. Cell service is patchy this far up the valley, so it''s worth downloading directions before you leave Pemberton or Whistler.</p>

<h2>Pair it with</h2>

<p>Nairn Falls sits close enough to Pemberton village to fold into a farm-stand loop or a coffee stop before continuing north, and it''s directly on the route if you''re continuing up toward Joffre Lakes and the Duffey Lake Road. For a corridor day trip, it''s a natural last stop heading north out of Pemberton or a first one heading back south — twenty minutes of walking for a waterfall most people driving Highway 99 never learn is there.</p>',
  'Best Sea to Sky Team',
  'draft',
  '[{"question":"Where is Nairn Falls Provincial Park?","answer":"It''s just south of Pemberton, off Highway 99. [VERIFY: exact km marker before publishing]."},{"question":"How long is the hike to Nairn Falls?","answer":"The trail along the Green River takes most people about twenty to thirty minutes each way at an easy pace on a mostly flat, forested path. [VERIFY: exact distance against BC Parks'' current listing before publishing]."},{"question":"Is it safe to swim at Nairn Falls?","answer":"No — the current is strong and the rocks are often slick. Stay on the marked viewing platforms and keep back from the edge; this stretch of river has a history of people getting into serious trouble near the water."},{"question":"Is there camping at Nairn Falls?","answer":"Yes, there is a campground in the park. [VERIFY: current reservation status and season before publishing]."}]'::jsonb
);
```

---

## Facebook Post

There's a waterfall south of Pemberton that most people driving Highway 99 have never heard of — because the trail to it doesn't look like much from the road.

Twenty minutes along the Green River through the forest gets you to Nairn Falls: the river forced through a narrow rock chute at real speed, dropping hard into the pool below. It's one of the most powerful stretches of water on the whole corridor. One thing worth knowing before you go: stay on the viewing platforms. The current here is stronger than it looks, and the rock around it is often wet.

We mapped the trail, the parking, and what to actually expect — link in the first comment.

Anyone else discover this one by accident on the way to Joffre Lakes? 👇

**First comment:** Nairn Falls, mapped 👉 bestseatosky.com/blog/nairn-falls-pemberton

**Location tag:** Nairn Falls Provincial Park, BC

---

## Instagram Post

**Format:** Reel (10–20 sec) — content-strategy.md ranks Reels first for reaching non-followers, and this is a walk-and-reveal location (forest trail → river → falls) that suits a short vertical clip better than a static carousel.

**Caption:**

The waterfall south of Pemberton nobody talks about. 🌲

Twenty minutes along the Green River through the forest gets you to Nairn Falls — the river squeezed through a narrow rock chute and dropping hard into the pool below. One of the most powerful stretches of water on the whole corridor.

One thing before you go: stay on the platforms. The current is stronger than it looks. Full guide — link in our first comment.

**First comment:** Nairn Falls, mapped 👉 bestseatosky.com/blog/nairn-falls-pemberton

**Location tag:** Nairn Falls Provincial Park, BC

**Hashtags:** #nairnfalls #pembertonbc #seatosky #highway99 #greenriver #explorebc #britishcolumbia #hellobc #bctravel #pembertonvalley

---

## Media Notes

**Check `carousel-photos/pemberton/` locally first** — Rick's local photo library is organized by town, and Nairn Falls sits close enough to the Pemberton folder that footage may already exist there from a farm-stand or valley shoot. Confirm what's there before shooting or building anything new.

If nothing usable exists yet, this is **Your media** (preferred):

- One 10–15 sec walking POV clip on the forested trail along the Green River, phone vertical, natural forest audio or a trending audio track over it
- One 5–8 sec clip of the falls themselves from the viewing platform, close enough to show the water forced through the chute — this is the payoff shot, worth getting right
- One close detail shot of the river/rock texture, 3–5 sec, for the cold open or cover frame
- One clip showing the "stay back" safety signage at the platform, 3–5 sec — doubles as the safety-note beat in the caption and is genuinely useful information

**Fallback if Rick has nothing current:** "Stock — search Nairn Falls Provincial Park" on a licensed source like Dreamstime as a last resort — real place only, never a generic waterfall or forest trail standing in for it.
