# Draft batch — 2026-11-27

**Topic:** Alice Lake Provincial Park in winter — the four-lake day-use park just off Highway 99 a few minutes north of Squamish, framed as the quiet off-season version of a stop that's one of the busiest on the whole corridor every summer.

**Why this topic fits the rotation:** The last seven posts cycled Pemberton (Joffre Lakes, 11-03) → Squamish (Brackendale eagles, 11-06) → the drive (winter driving, 11-10) → Britannia Beach (Minaty Bay, 11-13) → Whistler (Function Junction, 11-17) → Pemberton (Distillery, 11-20) → Squamish (Sea to Sky Gondola winter, 11-24), which puts "the drive" bucket next up — it was last used on 11-10 for general winter-driving advice, not a specific stop. Alice Lake Provincial Park sits right off Highway 99, has never had its own post despite being one of the corridor's most-visited pull-offs, and — like the gondola post — has a genuine winter angle: the campground and swim beach that make it chaotic every summer are completely empty right now, leaving an easy lake-loop walk that's a different experience in November than in July.

---

## Blog Post (SQL)

```sql
-- Best Sea to Sky — new blog post
-- Paste into Supabase SQL Editor. Does NOT set status to 'published' —
-- left as 'draft' so Rick reviews and flips status before it goes live.
-- featured_image left NULL: Rick needs a real photo of Alice Lake itself
-- (the lake, the loop trail, or the empty winter beach/day-use area) —
-- brand book rule is no stock mountain/lake imagery standing in for a
-- specific corridor location.

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
  'alice-lake-provincial-park-winter',
  'Alice Lake Provincial Park in Winter: The Highway 99 Stop Without the Crowds',
  'Alice Lake Provincial Park is one of the busiest pull-offs on the Sea to Sky corridor every summer. In winter the campground and swim beach empty out, leaving a quiet four-lake walk a few minutes off the highway.',
  NULL, -- TODO(Rick): real photo of Alice Lake, the loop trail, or the empty winter day-use area, no stock
  'A few minutes north of Squamish, just off Highway 99, Alice Lake Provincial Park runs one of the busiest campgrounds and swim beaches on the whole corridor every summer. In winter, the reservations stop, the beach empties out, and what''s left is an easy loop walk around four small lakes with almost nobody else on the trail — a genuinely different stop than the one most people drive past in July.',
  '<p>Drive north from Squamish on Highway 99 in summer and you''ll see the turnoff for Alice Lake Provincial Park backed up with cars by mid-morning &mdash; it''s one of the most reserved campgrounds on the corridor and the swim beach fills early most warm weekends. Drive the same stretch in late November and you''d barely know it was there. The turn is the same, a short few minutes off the highway, but almost everything that makes it busy in summer has shut down for the season, which turns it into something closer to a quiet neighbourhood walk than a destination.</p>

<h2>What''s actually there</h2>

<p>Alice Lake is the main lake the park is named for, but it''s really a small network of four lakes &mdash; Alice, Stump, Fawn, and Edith &mdash; connected by an easy, mostly flat walking loop through second-growth forest. [VERIFY: confirm current total loop distance and whether all four lakes remain fully accessible on the trail system year-round before publishing.] It''s the kind of trail that works for almost anyone: stroller-flat in sections, short enough for a half-day visit, long enough to feel like you went somewhere. In warmer months it also connects into the broader Squamish mountain bike trail network nearby. [VERIFY: confirm which specific bike trails connect directly from the park versus nearby trailheads before publishing.]</p>

<h2>What changes in winter</h2>

<p>The campground &mdash; the reason a lot of people know this park at all &mdash; closes for the season, so the busiest part of the whole property is simply gone. [VERIFY: confirm exact winter campground closure dates for the current season before publishing.] The swim beach that''s shoulder-to-shoulder on a July weekend sits empty, with no lifeguards and, depending on how cold the fall has been, a skim of ice forming at the shallow edges in the coldest stretches &mdash; worth keeping kids and dogs back from rather than testing. The parking lot that fills by 10 a.m. in summer has space to spare, and the fee booth that''s staffed in peak season typically isn''t running this time of year. [VERIFY: confirm current winter parking fee status and whether self-registration applies before publishing.]</p>

<h2>What to know before you go</h2>

<p>The loop trail is easy, but easy isn''t the same as groomed &mdash; expect mud in the low spots and the odd icy patch on shaded sections, so real shoes beat sneakers. Daylight is short in late November, so a midday visit beats trying to fit it in after work. [VERIFY: confirm current winter gate hours and whether washroom or concession facilities stay open through the off-season before publishing.] As with any day-use park in winter, check BC Parks'' own site or the posted signage for the current status before you make the drive out &mdash; off-season facilities can change year to year.</p>

<h2>Who this is actually good for</h2>

<p>This is a good stop for anyone who wants to get out of the car between Vancouver and Squamish (or Squamish and Whistler) without committing to a real hike or driving into Squamish proper. It''s an easy one for families who need kids to burn off energy on a flat trail, and for dog walkers who want somewhere quieter than the Chief or Shannon Falls pull-offs, which stay relatively busy even in the off-season. If you''ve already done the bigger-name Squamish stops on past visits, Alice Lake in winter is the low-key version &mdash; not a highlight, just a solid, easy leg-stretch that happens to be almost empty right now.</p>',
  'Best Sea to Sky Team',
  'draft',
  '[{"question":"Is Alice Lake Provincial Park open in winter?","answer":"The day-use area and trails stay open year-round, but the campground closes for the season and the swim beach has no lifeguards or services. [VERIFY: confirm exact current-season closure dates and any winter gate hours before publishing]."},{"question":"Can you still walk the loop trail around Alice Lake in winter?","answer":"Yes — the loop connecting Alice, Stump, Fawn, and Edith lakes stays open, though expect mud and occasional icy patches on shaded sections. [VERIFY: confirm current trail conditions and whether any sections close seasonally before publishing]."},{"question":"Is there a parking fee at Alice Lake Provincial Park in winter?","answer":"[VERIFY: confirm current off-season parking fee status and whether self-registration applies before publishing]."},{"question":"Where is Alice Lake Provincial Park on the Sea to Sky Highway?","answer":"It''s just off Highway 99 a few minutes north of Squamish, making it an easy stop on the drive toward Whistler without detouring into town."}]'::jsonb
);
```

---

## Facebook Post

**Format:** Carousel (4–5 slides) — this is a "here's an easy stop you've been driving past" piece, which fits the carousel/save-this format content-strategy.md ranks second, better than a Reel since there's no single strong motion moment.

**Location tag:** Alice Lake Provincial Park, Squamish, BC

**Post text:**

You've probably driven past this turnoff a dozen times without stopping.

Alice Lake Provincial Park is one of the busiest campgrounds on the whole corridor every summer — reserved months out, beach packed by 10 a.m. Right now, in late November, the campground's closed and the beach is empty. What's left is an easy loop around four small lakes with almost nobody else on it.

Good leg-stretch stop between Squamish and Whistler. Full guide in the first comment.

Anyone else only know this place as "that campground you can never book"? 👇

**First comment (link):**
Full guide here → bestseatosky.com/play/alice-lake-provincial-park-winter [VERIFY: confirm correct live URL path/category for this guide before posting]

**Hashtags (~10):**
#alicelake #squamish #squamishbc #seatosky #seatoskyhighway #highway99 #bcparks #explorebc #britishcolumbia #hellobc

---

## Instagram Post

**Format:** Carousel (4–5 slides) — same slide set as Facebook: the highway turnoff sign, the lake/loop trail in winter light, the empty beach and day-use area, a closing "quiet stop between Squamish and Whistler" text slide. Carousels are the second-priority format per content-strategy.md and this is list/save-style content rather than a single motion clip.

**Caption:**

That turnoff you've driven past a hundred times. 🌲

Alice Lake Provincial Park is reserved solid all summer — campground booked out, beach packed by mid-morning. Right now the campground's closed for the season and the beach is empty. What's left: an easy loop around four small lakes, a few minutes off Highway 99, with almost nobody on it.

Full guide linked in the first comment 👇

**First comment (link):**
bestseatosky.com/play/alice-lake-provincial-park-winter [VERIFY: confirm correct live URL path before posting]

**Location tag:** Alice Lake Provincial Park, Squamish, BC

**Hashtags (~10):**
#alicelake #squamish #squamishbc #seatosky #seatoskyhighway #highway99 #bcparks #explorebc #britishcolumbia #hellobc

---

## Media Notes

**Check `carousel-photos/Squamish/` and `carousel-photos/chief/` locally first** — Rick's photo library is gitignored and not visible to this routine, but per content-strategy.md this is exactly the kind of folder that may already hold a shot of Alice Lake or the drive north of Squamish from a past visit. Look there before shooting anything new.

If nothing in those folders covers Alice Lake specifically, this is a **"Your media"** post:

- One still or 5–8 second clip of the Highway 99 turnoff sign for Alice Lake Provincial Park, shot from the car or roadside (safely, not from the travel lane)
- One still or short clip of the lake itself in winter light — flat water or light ice at the edge, bare trees, nobody in frame
- One still of the empty day-use area / beach / picnic tables, to make the "nobody's here right now" point visually
- One 5–8 second clip walking the loop trail, phone vertical, showing the packed-dirt-and-leaves winter trail surface
- No voiceover needed; light text overlay ("The campground everyone fights to book — empty right now") works well over the beach or trail shot, calm instrumental track for a carousel's auto-advance pacing

**Fallback if no fresh footage is realistic soon:** Stock — search "Alice Lake Provincial Park Squamish" specifically (per brand book: real-place stock only, never a generic lake-in-the-woods stock photo standing in for this one).
