# Draft batch — 2026-11-10

**Topic:** Winter driving on the Sea-to-Sky Highway (Highway 99) — a practical, non-scary guide for people who've only ever driven this road in July. Covers winter tire rules, where the highway actually gets sketchy, chain-up/brake-check pullouts, and the checklist locals run through without thinking about it.

**Why this topic fits the rotation:** The last two posts were Joffre Lakes (Pemberton, 2026-11-03) and Brackendale eagle viewing (Squamish, 2026-11-06) — two town-specific posts in a row. This is a "the drive itself" post, a bucket that hasn't had a fresh entry since Horseshoe Bay on 2026-10-23, and it's genuinely new ground: every prior Highway 99 post (Horseshoe Bay, Brandywine Falls, Tantalus Lookout, Porteau Cove) is written for summer/shoulder-season driving — none address what the corridor is actually like once snow starts, which is exactly the question a first-time November/December visitor is asking right now. It's also the most town-balanced bucket to pick from: Britannia Beach and "the drive" are tied for fewest posts of any bucket.

---

## Blog Post (SQL)

```sql
-- Best Sea to Sky — new blog post
-- Paste into Supabase SQL Editor. Does NOT set status to 'published' —
-- left as 'draft' so Rick reviews and flips status before it goes live.
-- featured_image left NULL: Rick needs a real photo of Highway 99 itself
-- in winter conditions (a snowy stretch of the actual highway, a chain-up
-- pullout, or the view near Porteau Cove/Britannia with snow on the peaks)
-- — brand book rule is no stock imagery standing in for a specific
-- corridor location, and generic "snowy mountain road" stock would break
-- that rule here more than almost anywhere else on the site.

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
  'winter-driving-sea-to-sky-highway',
  'Driving the Sea-to-Sky Highway in Winter: What First-Timers Need to Know',
  'Highway 99 in winter isn''t the same road you''ve seen in the postcards. Here''s what locals actually check before they drive it — winter tires, where it gets dicey, and the pullouts worth knowing about.',
  NULL, -- TODO(Rick): real photo of Highway 99 in winter conditions — a snowy stretch of the actual highway, a chain-up pullout, or a snow-capped viewpoint near Porteau Cove or Britannia Beach. No generic snowy-mountain-road stock.
  'Every summer photo of this highway is blue water and green mountains. In winter it''s a different road — still beautiful, but one that deserves a bit of respect from anyone who''s only driven it in July. Here''s the non-scary version of what locals actually do before heading up Highway 99 between November and March.',
  '<p>If the only Highway 99 you''ve seen is the one in the postcards &mdash; Howe Sound glittering, mountains green, windows down &mdash; winter is going to surprise you. It''s still one of the best drives in the province. It''s also a mountain highway that climbs, winds along cliffside sections, and runs through at least two microclimates between Vancouver and Pemberton. None of that should scare you off. It should just change how you prepare.</p>

<h2>Winter tires aren''t optional here</h2>

<p>British Columbia requires winter tires or chains on designated mountain and resort-area highways through the winter season, and the Sea-to-Sky corridor is one of them. [VERIFY: current exact start/end dates and signage for the winter tire requirement on Highway 99 before publishing &mdash; historically this has run roughly October 1 through March 31, but confirm on DriveBC.ca before stating it as fact]. All-seasons that technically qualify are the bare minimum; locals who drive this road regularly in winter run proper winter tires, because the difference shows up exactly when you need it &mdash; on the climb out of Squamish or anywhere the road holds shade.</p>

<p>If you''re in a rental car, don''t assume it''s already equipped for this. Ask directly when you book.</p>

<h2>Where the highway actually gets dicey</h2>

<p>This isn''t one uniform road. The stretch along Howe Sound between Horseshoe Bay and Squamish runs close to the water and through a few avalanche-control zones; the climb from Squamish up toward Whistler gains real elevation and holds snow and ice longer, especially in shaded corners; and the Whistler-to-Pemberton leg can be clear while the section behind you is a different story entirely. [VERIFY: current named avalanche-control zones and typical closure history before citing specifics &mdash; this is exactly the kind of detail that changes and needs a DriveBC check, not a guess]. The practical takeaway: check conditions for the whole route, not just where you''re starting, because the corridor can be driving in rain at one end and snow at the other on the same afternoon.</p>

<h2>Chain-up and brake-check pullouts</h2>

<p>There are marked pullouts along the highway specifically for putting on or taking off chains, and commercial trucks use dedicated brake-check areas on the steeper grades. [VERIFY: exact current pullout locations and km markers before publishing &mdash; these matter enough to drivers that getting one wrong would actually mislead someone]. Even if you never touch a set of chains, knowing these exist &mdash; and that slower, cautious vehicles pulling off to let traffic pass is normal etiquette here, not a sign of a problem &mdash; makes the whole drive less stressful.</p>

<h2>What''s different about winter at each end</h2>

<p>A lot of first-timers don''t realize how much the temperature and road surface can vary between Vancouver and Pemberton on the same day. Sea level in Squamish can be a damp +4&deg;C rain while Whistler Village, a few hundred metres higher, is solidly below freezing with snow on the ground. Dress and plan for the colder end of the drive, not the one you left from.</p>

<p>Worth knowing too: several of the hikes and viewpoints we''ve written about on this corridor are seasonal or access-limited in winter &mdash; Garibaldi Park trails and the upper approach to Joffre Lakes among them. Check current trail and parking status before building a winter day around one.</p>

<h2>The non-scary checklist</h2>

<p>Before you leave: check DriveBC.ca for current conditions and any advisories on Highway 99, fuel up before you start the climb out of Squamish rather than assuming you''ll find a station exactly when you want one, top up washer fluid (road spray in winter goes through it fast), and build in slightly more time than the summer drive estimate &mdash; not because the road demands it on a clear day, but because it might, and rushing a mountain highway in winter is how good trips go sideways.</p>

<p>None of this is meant to talk you out of the drive. It''s one of the best winter roads in the province for a reason &mdash; snow-dusted peaks, far fewer cars, and viewpoints that look genuinely different from their summer selves. Just drive it like the mountain road it is, and it''ll treat you well.</p>',
  'Best Sea to Sky',
  'draft',
  '[
    {"question": "Do I need winter tires to drive the Sea-to-Sky Highway (Highway 99)?", "answer": "Yes — it falls under BC''s designated winter tire and chain requirement for mountain highways during the winter season. [VERIFY: exact current start/end dates on DriveBC.ca before publishing]. All-season tires that meet the legal minimum are fine on paper, but proper winter tires make a real difference on the climbs and shaded sections."},
    {"question": "Is Highway 99 ever closed in winter?", "answer": "Short closures for avalanche control or weather do happen on this corridor. Always check DriveBC.ca for current conditions and advisories before you leave, especially for the Squamish–Whistler and Whistler–Pemberton sections."},
    {"question": "Is the drive from Vancouver to Whistler in winter difficult for an inexperienced driver?", "answer": "It's manageable with the right prep — winter tires, checking conditions ahead of time, and building in extra time. It's a real mountain highway, not a casual city drive, but it's driven daily all winter by locals and visitors alike."},
    {"question": "How different is the weather between Squamish and Whistler in winter?", "answer": "Often significant — sea-level towns like Squamish can be a few degrees above freezing and rainy while Whistler Village, at higher elevation, holds snow and sub-zero temperatures. Plan and dress for the colder end of your trip."}
  ]'::jsonb
);
```

---

## Facebook Post

If the only Highway 99 you've seen is the summer postcard version — blue water, green mountains, windows down — winter is a different road. Still gorgeous. Still very driveable. Just one that deserves a bit of respect if you've never done it between November and March.

The short version: winter tires aren't optional on this corridor, check DriveBC before you leave (the weather at the Squamish end and the Whistler end can be completely different on the same day), and build in a bit more time than you'd budget in July. None of this is meant to scare anyone off — it's one of the best winter drives in the province once you know what you're doing.

Full checklist — link in the first comment.

📍 Sea-to-Sky Highway (Highway 99), BC

What's the one thing you wish someone had told you before your first winter drive up this road?

---

## Instagram Post

**Caption:**

The postcard version of this highway is summer. This is the version nobody warns first-timers about. ❄️🚗

Winter tires aren't optional on the Sea-to-Sky corridor, the weather at the Squamish end can be completely different from the Whistler end on the same afternoon, and the pullouts on the steeper grades aren't a sign something's wrong — that's just how this road works in winter. We put together the non-scary checklist locals actually run through before heading up Highway 99.

Full guide — link in our first comment.

Anyone else's first winter drive up this highway go very differently than they expected? 👇

First comment: Full winter driving guide → bestseatosky.com/blog/winter-driving-sea-to-sky-highway

📍 Sea-to-Sky Highway (Highway 99), BC

#seatosky #highway99 #winterdriving #explorebc #britishcolumbia #bctravel #hellobc #squamish #whistler #pnw

---

## Media Notes

**Blotato can build** — this is a tip-carousel topic (checklist-style, "save this before your winter drive"), which doesn't require Rick's own footage to work well. Build a 5–6 slide carousel in brand colours: title slide ("Winter Driving the Sea-to-Sky Highway: The Checklist"), then one tip per slide (winter tires, check DriveBC, chain-up pullouts, dress for the colder end, fuel/washer fluid/extra time), closing slide with the follow CTA. Pull from the blog post's checklist section for exact copy.

That said, swapping in one real photo for the title slide — an actual snowy stretch of Highway 99, a chain-up pullout, or a snow-dusted Howe Sound viewpoint — would outperform a fully generated/text-only cover. Check `carousel-photos/` locally for any winter driving or snow-on-the-highway shots from Squamish, Britannia Beach, or Whistler folders before defaulting to a text-only cover slide.

If Rick does have dashcam or drive-along footage from a winter trip, that upgrades this to **Your media** for a Reel instead: 4–5 short clips (5–8 sec each) of the actual drive in winter conditions — snow on the shoulders, a chain-up sign, the elevation change becoming visible — with text overlay carrying the checklist points, since a Reel built from real footage of this exact corridor would outperform the carousel for reach.
