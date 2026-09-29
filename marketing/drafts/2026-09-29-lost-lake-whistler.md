# Draft batch — 2026-09-29

**Topic:** Lost Lake Park, Whistler — the warm, clean swimming lake a 10-minute walk from the Village, the dog beach, and the Valley Trail loop around it, with a note on catching it for fall colour before the water gets too cold.

**Why this topic fits the rotation:** Lost Lake has only ever been a passing mention in two earlier Whistler drafts (train wreck trail, farmers market) — it's never had its own post. Recent drafts have leaned on waterfalls, lakes further up the highway, and food stops; this keeps Whistler in rotation without repeating Train Wreck or the farmers market, and lands in late September while it's still genuinely swimmable and the maples around the lake are starting to turn, which gives the post a real seasonal hook instead of a generic "visit anytime" angle.

---

## Blog Post (SQL)

```sql
-- Best Sea to Sky — new blog post
-- Paste into Supabase SQL Editor. Does NOT set status to 'published' —
-- left as 'draft' so Rick reviews and flips status before it goes live.
-- featured_image left NULL: Rick needs a real photo of Lost Lake itself
-- (the dock, the beach, or the Valley Trail around it) — brand book rule
-- is no stock imagery of a generic lake standing in for this one.

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
  'lost-lake-whistler',
  'Lost Lake: Whistler''s Swimming Hole Ten Minutes From the Village',
  'A short walk or bike from Whistler Village, Lost Lake has a sandy beach, a dog beach, and a flat trail loop around it — and late September is one of the best times to go.',
  NULL, -- TODO(Rick): real photo of Lost Lake — the main beach/dock, the dog beach, or the Valley Trail loop, not a generic lake stock shot
  'Everyone drives past the Lost Lake turnoff on their way to the lifts. It''s a five-minute walk from the Village to a genuinely clean, warm lake with a sandy beach, a dedicated dog beach, and a flat trail loop that works for a stroller as easily as a mountain bike.',
  '<p>Whistler''s reputation is built on the mountains, which means a lot of visitors never clock that there''s a lake a short walk from the Village that locals actually swim in all summer. Lost Lake isn''t a hidden secret &mdash; Whistlerites have been going there for decades &mdash; but for anyone who''s only ever driven the highway or ridden the gondola, it''s worth knowing it''s there.</p>

<p>It sits just northeast of the Village core, reachable on foot, by bike on the paved Valley Trail, or on the free summer shuttle. No car needed, which on its own makes it stand out from most of the corridor''s swim spots.</p>

<h2>What''s actually there</h2>

<p>The main beach has sand, a floating dock people swim out to, and enough open grass to spread a blanket without feeling stacked on top of the next group. There''s a separate, dedicated dog beach around the shoreline, so if you''ve got a dog with you, you''re not negotiating space with families at the main swim area. [VERIFY: exact location of the dog beach relative to the main beach, and whether dogs are permitted off-leash there, before publishing].</p>

<p>A flat, wide gravel and paved trail loops the whole lake &mdash; roughly [VERIFY: loop distance in km] &mdash; easy enough for a stroller or a beginner rider, and it connects directly into Whistler''s larger Valley Trail network if you want to keep going toward the Village or out toward Whistler Cay.</p>

<h2>Why late September is a good window</h2>

<p>By late summer the lake has had all season to warm up, so this stretch of fall is often the last real swimming window before the water turns cold for good. It''s also quieter &mdash; the peak-summer crowds have thinned with the school year back in session, and the maples and cottonwoods around the lake start turning colour, which makes the trail loop worth doing even if you skip the swim. [VERIFY: typical water temperature and how late into fall it stays swimmer-comfortable, before publishing].</p>

<h2>Good to know before you go</h2>

<p>There are washrooms and change facilities at the main beach area, and a lifeguard presence during the main swim season &mdash; [VERIFY: exact lifeguard season end date and whether it''s still staffed in late September, before publishing]. Parking at the lake itself is limited, which is the real argument for walking, biking, or taking the shuttle from the Village instead of driving.</p>

<p>It pairs naturally with a bigger Whistler day &mdash; the Village is close enough for coffee before or a patio after, and it''s an easy add if you''re already planning a stop at the farmers market or the Train Wreck trail, both a short ride away on the Valley Trail.</p>',
  'Best Sea to Sky Team',
  'draft',
  '[{"question":"How far is Lost Lake from Whistler Village?","answer":"About a 10-minute walk, or a few minutes by bike on the paved Valley Trail. A free summer shuttle also runs there, so a car isn''t necessary."},{"question":"Is Lost Lake good for swimming?","answer":"Yes. It has a sandy main beach with a swimming dock, and the lake warms up through summer into early fall. [VERIFY: typical water temperature and how late in the season it stays comfortable]."},{"question":"Is there a dog beach at Lost Lake?","answer":"Yes, a separate dog beach area away from the main swim beach. [VERIFY: exact location and any off-leash rules before publishing]."},{"question":"Is the trail around Lost Lake stroller and beginner-bike friendly?","answer":"Yes, it''s a flat, wide gravel and paved loop around the lake that connects into Whistler''s larger Valley Trail network."}]'
);
```

---

## Facebook Post

The lake everyone drives past on the way to the lifts. 🏔️

Lost Lake is a five-minute walk from Whistler Village — sandy beach, a swimming dock, a separate dog beach, and a flat trail loop around the whole lake that works for strollers and beginner bikes alike. No car needed; walk it, bike it, or catch the free summer shuttle.

Late September is actually one of the best times to go — the water's had all season to warm up, the crowds have thinned out, and the maples around the lake are starting to turn. Last real swim window before it gets cold.

Full details (plus what to pair it with on a Whistler day) linked in the first comment. 👇

First comment: bestseatosky.com/blog/lost-lake-whistler

📍 Lost Lake Park, Whistler, BC

#lostlake #whistlervillage #seatosky #whistler #explorebc #britishcolumbia #hellobc #bctravel #beyondvancouver #whistlerbc

---

## Instagram Post

**Caption:**

Ten minutes from the Village, and most people never find it. 🌲

Lost Lake — sandy beach, a swimming dock, a dog beach, and a flat trail loop around the whole thing. No car, no lift ticket, just a walk or a short ride from Whistler Village.

Late September is your window: the water's still warm from summer, the crowds have thinned, and the leaves around the lake are just starting to turn. One of the last good swim days before it's a fall-colours walk instead.

Full guide (and what to pair it with) is in our first comment. ⬇️

First comment: Link to the Lost Lake guide → bestseatosky.com/lost-lake-whistler

📍 Lost Lake Park, Whistler, BC

#lostlake #whistlervillage #seatosky #whistler #explorebc #britishcolumbia #hellobc #bctravel #beyondvancouver #whistlerbc

---

## Media Notes

**Your media (preferred):** Check `carousel-photos/whistler/` locally for existing Lost Lake shots — the main beach, the dock, the dog beach, or the Valley Trail loop — before defaulting to anything else below. Given how often Rick is in Whistler, there's a decent chance this is already covered.

If new footage is needed, this is a strong Reel candidate per content-strategy.md's format priority:
- One 10–15 sec vertical clip: walking from the Village onto the Valley Trail and arriving at the beach — the "closer than you think" reveal
- One 8–10 sec clip: someone swimming out to or standing on the dock, natural light, no posing
- One 5–8 sec clip: the dog beach in action if a dog is available, or the trail loop with a bike passing through
- One close-up: the turning maple leaves along the trail, to sell the fall-colour angle
- Audio: a calm/ambient trending track works well here; on-screen text overlay in the first 2 seconds — "10 min from Whistler Village" — as the hook, no voiceover needed

**Stock — search "Lost Lake Whistler" (fallback only):** If no usable footage turns up locally, licensed stock of Lost Lake itself (verify it's actually this lake, not a generic mountain lake) is an acceptable fallback per the brand book.

**Blotato can build:** A carousel version works as a secondary post — pull "What's actually there" and "Good to know before you go" into 3–4 slide cards in brand colours (Emerald/Slate), with a real photo swapped onto the cover slide once Rick has one, and a follow CTA on the last slide.
