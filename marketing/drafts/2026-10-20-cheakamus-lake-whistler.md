# Draft batch — 2026-10-20

**Topic:** Cheakamus Lake — Whistler's turquoise alpine lake that stays quiet while Joffre Lakes and Lost Lake get all the crowds.

**Why this topic fits the rotation:** Whistler hasn't had a dedicated post since Lost Lake (2026-09-29) and the Farmers Market (2026-09-08) — the last three posts covered Squamish (West Coast Railway Heritage Park) and Britannia Beach (Jane Camp Trail) twice, so Whistler was due. Cheakamus Lake is also a genuinely fresh angle: the Train Wreck Trail post already covers the Cheakamus River/Crossing area, but the lake itself — a flat, forested walk-in to turquoise water inside Garibaldi Park — hasn't been written up, and it gives us a "quiet alternative to the Instagram-famous lakes" angle we haven't used yet.

---

## Blog Post (SQL)

```sql
-- Best Sea to Sky — new blog post
-- Paste into Supabase SQL Editor. Does NOT set status to 'published' —
-- left as 'draft' so Rick reviews and flips status before it goes live.
-- featured_image left NULL: Rick needs a real photo of Cheakamus Lake
-- itself (the turquoise water and the forested shoreline) — brand book
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
  'cheakamus-lake-whistler',
  'Cheakamus Lake: Whistler''s Turquoise Lake Nobody Lines Up For',
  'A flat, forested walk inside Garibaldi Park leads to a glacier-fed turquoise lake near Whistler — with none of the parking lot chaos or sunrise lineups that Joffre Lakes has turned into.',
  NULL, -- TODO(Rick): real photo of Cheakamus Lake's turquoise water and shoreline, no stock
  'Joffre Lakes needs a day-use permit and a 4am alarm to beat the crowds. Cheakamus Lake is the same glacier-fed turquoise water, a short drive from Whistler Village, and most visitors to the resort have never heard of it. Here''s what the walk in actually looks like, and why locals quietly prefer it.',
  '<p>Whistler''s lake reputation runs almost entirely through two names: Lost Lake, because it''s a ten-minute walk from the Village, and Joffre Lakes, because it''s all over Instagram. Cheakamus Lake sits between those two in distance and effort, and it gets a fraction of the attention either one does &mdash; which, if you''ve ever tried to find parking at Joffre on a August Saturday, is exactly the point.</p>

<h2>What the walk in actually is</h2>

<p>The trail to Cheakamus Lake starts inside Garibaldi Provincial Park, a short drive south of Whistler Village near the Cheakamus Lake Road turnoff. Unlike most of the corridor''s alpine payoffs, this one doesn''t ask for a grinding climb &mdash; the trail runs mostly flat through old-growth forest alongside the Cheakamus River before opening up at the lake itself. [VERIFY: current trail distance and estimated hiking time &mdash; confirm with BC Parks or the current trailhead signage before publishing]</p>

<p>That flat profile is the whole appeal. It''s a hike that rewards you with genuine alpine scenery &mdash; glacier-fed water in that unmistakable turquoise, framed by the peaks around Castle Towers and the Cheakamus valley &mdash; without the knee-punishing elevation gain that guards most of the corridor''s best views. It''s a half-day outing for most people, not an all-day commitment.</p>

<h2>Why it stays quiet</h2>

<p>Cheakamus Lake doesn''t show up in the same viral photo rotation as Joffre, so it hasn''t attracted the same volume of day-trippers or the same parking-lot gridlock. There''s also no permit system to navigate and no pressure to arrive before sunrise just to get a spot &mdash; you can show up mid-morning on a weekend and still get a reasonable parking situation. [VERIFY: current parking lot size and whether it fills up on peak summer weekends before publishing]. It''s the kind of place that rewards people willing to drive five extra minutes past the famous name.</p>

<p>The lake itself is large enough that there''s real shoreline to spread out along, rather than one viewpoint everyone crowds into for the same photo. Bring a lunch and you can find your own stretch of rock or gravel beach without elbowing anyone out of frame.</p>

<h2>Good to know before you go</h2>

<p>This is still a BC Parks backcountry trail, not a paved path, so proper footwear matters even without serious elevation gain &mdash; expect roots, some mud in wetter months, and river crossings on bridges that can be slick. Bug spray earns its weight in the forested sections in early summer. [VERIFY: current trailhead parking fees, trail conditions, and whether camping is available at the lake before publishing, since Garibaldi Park sometimes requires separate camping permits].</p>

<p>Because it sits inside Garibaldi Park at a lower elevation than the park''s alpine destinations like Elfin Lakes, Cheakamus Lake tends to be accessible earlier in the season and stays walkable later into fall &mdash; useful to know if an early snowfall has already closed the higher trails.</p>

<p>The honest pitch: Cheakamus Lake will never trend the way Joffre does, and that''s exactly why it''s worth the extra attention. Same glacier-blue water, same Coast Mountains backdrop, none of the crowd management required to actually enjoy it.</p>',
  'Best Sea to Sky',
  'draft',
  '[
    {"question": "Is Cheakamus Lake hard to hike to?", "answer": "No — unlike most of the corridor''s alpine lakes, the trail to Cheakamus Lake is mostly flat, running through old-growth forest alongside the Cheakamus River rather than climbing steeply."},
    {"question": "Do you need a permit for Cheakamus Lake like Joffre Lakes?", "answer": "No day-use permit is required for the hike to Cheakamus Lake, which is one of the main reasons it stays quieter than Joffre Lakes."},
    {"question": "How far is Cheakamus Lake from Whistler Village?", "answer": "The trailhead is a short drive south of Whistler Village, inside Garibaldi Provincial Park near the Cheakamus Lake Road turnoff."},
    {"question": "Can you camp at Cheakamus Lake?", "answer": "Camping options exist within Garibaldi Provincial Park, but check current BC Parks permit requirements before planning an overnight trip."}
  ]'::jsonb
);
```

---

## Facebook Post

Joffre Lakes needs a day-use permit and a 4am alarm to beat the crowds. Cheakamus Lake is the same glacier-fed turquoise water, a short drive from Whistler Village — and most visitors to the resort have never heard of it.

No permit, no sunrise lineup, and the walk in is mostly flat through old-growth forest along the Cheakamus River — no knee-punishing climb required for the payoff view. Show up mid-morning and you'll still find parking.

Full write-up — link in the first comment.

📍 Cheakamus Lake, Garibaldi Provincial Park

Anyone else think the quiet lake always beats the Instagram-famous one?

---

## Instagram Post

**Caption:**

Everyone knows Joffre Lakes. Almost nobody talks about the one twenty minutes from Whistler Village that looks just as good. 💎

Cheakamus Lake is the same glacier-fed turquoise water and Coast Mountains backdrop — minus the day-use permit, the 4am alarm, and the parking lot chaos. The walk in is mostly flat, through old-growth forest beside the Cheakamus River, so the payoff doesn't cost you a brutal climb either.

Full guide — including what the trail actually looks like and what to bring — in our first comment.

Tag the person you'd actually want to find this with. 👇

First comment: Full guide to Cheakamus Lake → bestseatosky.com/blog/cheakamus-lake-whistler

📍 Cheakamus Lake, Garibaldi Provincial Park

#cheakamuslake #whistler #garibaldipark #seatosky #hiddengembc #explorebc #britishcolumbia #hellobc #hikingbc #bctravel

---

## Media Notes

Check `carousel-photos/whistler/` locally for existing photos before defaulting to a shot list or stock search — Rick's library is organized by town, and Whistler-area hikes may already have usable shots from a prior visit. Confirm what's actually there before deciding whether new footage is needed.

If nothing from the lake itself exists yet, this needs **Your media** — the turquoise water and old-growth forest walk-in are specific enough that generic stock would break the brand book's "no stock standing in for a real corridor location" rule, and stock won't actually show Cheakamus Lake anyway.

Shot list if new footage is needed (vertical, phone is fine):

1. Trailhead sign/start near Cheakamus Lake Road, with forest behind it for context — 5–8 sec
2. A stretch of the flat forest walk — roots, old-growth trunks, river glimpsed alongside — to sell the "easy walk, big payoff" contrast — 8–10 sec
3. First reveal of the turquoise water opening up through the trees — this is the hook shot, hold it longer — 10–12 sec
4. Wide shot of the lake with the peaks behind it, person small in frame for scale — 8–10 sec
5. Optional: a shoreline detail shot (gravel beach, driftwood, the water's edge) to contrast with a crowded Joffre-style photo — 5–8 sec

Total run time roughly 35–45 sec. Text overlay should carry the "same view, zero permit, zero lineup" contrast since that's the hook people will save or share. Light trending audio or a calm instrumental both fit; no voiceover needed if the overlay text does the work.
