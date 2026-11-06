# Draft batch — 2026-11-06

**Topic:** Brackendale eagle viewing — the winter bald eagle gathering on the Squamish River in Brackendale (a Squamish neighbourhood), where eagles come to feed on the chum salmon run from roughly November through February.

**Why this topic fits the rotation:** Checked all 22 existing files in `marketing/drafts/`. Squamish is covered (swimming holes, post-hike patios, Murrin Park, West Coast Railway Heritage Park, Shannon Falls/Stawamus Chief, Tantalus lookout) but nothing touches Brackendale or eagle viewing, and the last Squamish-led post was Murrin Park on 2026-10-09 — the two posts since then (Britannia Beach mine tour, Joffre Lakes day pass) kept the rotation off Whistler/Pemberton overload but also off Squamish for a month. This is also a genuinely timely pick: eagle season is starting right now in early November, so this is useful to publish this week rather than being evergreen filler, and it's a distinctly local, insider angle — most visitors drive past Brackendale entirely, which fits the "insider knowledge you won't find in a brochure" brand line.

---

## Blog Post (SQL)

```sql
-- Best Sea to Sky — new blog post
-- Paste into Supabase SQL Editor. Does NOT set status to 'published' —
-- left as 'draft' so Rick reviews and flips status before it goes live.
-- featured_image left NULL: Rick needs a real photo of eagles on the
-- Squamish River at Brackendale or the dyke trail itself — brand book rule
-- is no stock standing in for a specific corridor location. Check
-- carousel-photos/Squamish/ locally first (gitignored, not visible to this
-- routine) before defaulting to a stock search.

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
  'brackendale-eagle-viewing-squamish',
  'Brackendale Eagle Viewing: Squamish''s Winter Spectacle Most Visitors Miss',
  'Every winter, bald eagles gather by the hundreds along the Squamish River in Brackendale to feed on the salmon run. Here''s where to actually see them, when to go, and why most people driving through Squamish have no idea this is happening a few minutes off the highway.',
  NULL, -- TODO(Rick): real photo of eagles on the Squamish River at Brackendale, no stock
  'While most Highway 99 traffic is focused on the Chief and the gondola, a quieter wildlife event is unfolding a few minutes off the highway in Brackendale, where bald eagles gather on the Squamish River every winter in numbers most visitors never hear about.',
  '<p>Squamish gets talked about for the Chief, the gondola, and the mountain biking, and almost none of that talk mentions what happens on the Squamish River every winter a few minutes north of downtown. In Brackendale, bald eagles gather along the river by the hundreds to feed on the late-season chum salmon run &mdash; one of the largest seasonal eagle gatherings anywhere on the coast [VERIFY: current comparative ranking/record claim for Brackendale''s eagle count &mdash; the often-cited "world record" count and year should be confirmed against a current, credible source before publishing]. It happens every year, it''s free to watch, and most people driving through Squamish on their way to Whistler have no idea it''s there.</p>

<h2>Why the eagles come to Brackendale specifically</h2>

<p>Bald eagles follow the salmon, and the Squamish River''s chum run draws them in from up and down the coast once the fish start dying off after spawning, which makes for easy feeding in shallow water and on gravel bars. Brackendale''s stretch of river &mdash; with its braided channels, gravel bars, and big cottonwoods for roosting &mdash; happens to be an especially good setup for this, which is why the gathering concentrates here rather than spreading thinly along the whole river system.</p>

<h2>Where to actually go</h2>

<p>The easiest public viewing spot is the dyke trail along the Squamish River in Brackendale, often called the Eagle Run &mdash; a flat walking path with viewing areas set back from the riverbank so you''re watching without crowding the birds. [VERIFY: current official viewing platform location, trail access point, and parking details for Brackendale Eagle Run before publishing] Bring binoculars if you have them; the birds are often perched well back in the trees along the far bank or down on the gravel bars, and a long lens or a decent pair of binoculars makes a real difference versus the naked eye.</p>

<h2>When to go</h2>

<p>The season runs roughly from November through February, with numbers building through the winter [VERIFY: current peak-month window and typical count trend for this season before publishing]. Go on a grey, quiet weekday morning if you can &mdash; overcast days are honestly fine for this, since the birds are out feeding regardless of sun, and a quiet morning on the dyke beats a busier weekend afternoon for actually spotting them settled in the trees. Dress like you''re going to stand still outside in winter on a river: layers, a warm hat, and boots that handle a muddy trail.</p>

<h2>The annual eagle count</h2>

<p>Locals have run an organized eagle count on the river for years, with volunteers tallying birds along set stretches on a single January morning &mdash; it''s become its own small community tradition, not just a wildlife statistic. [VERIFY: current organizing group, exact count date, and how visitors can join or view results before publishing, since this has changed hands over the years.] If your trip lines up with it, it''s worth checking whether the public can tag along.</p>

<h2>Good to know before you go</h2>

<p>This is a wild, free-roaming gathering, not a managed attraction &mdash; there''s no fee, no gate, and no guarantee of exact numbers on any given day, so treat a Brackendale stop as a genuine wildlife-watching outing rather than a sure thing. Keep a respectful distance, keep dogs leashed and ideally at home, and don''t approach birds on the gravel bars for a closer photo &mdash; the whole point is that they keep coming back because the river stays undisturbed. Pair it with a coffee stop in Squamish on either end of the drive, since there''s nothing at the dyke itself beyond the trail.</p>

<p>The honest version of this one: Squamish''s biggest winter draw isn''t on the mountain at all, it''s on the river, and it costs nothing to go stand on a dyke trail and watch it happen. If you''re driving the corridor between November and February, it''s worth the short detour off the highway.</p>',
  'Best Sea to Sky',
  'draft',
  '[
    {"question": "Where can you see eagles in Squamish?", "answer": "In Brackendale, a neighbourhood of Squamish, along the Squamish River. The dyke trail known as the Eagle Run is the main public viewing area."},
    {"question": "When is eagle viewing season in Brackendale?", "answer": "Roughly November through February, when bald eagles gather to feed on the late-season chum salmon run."},
    {"question": "Why do eagles gather in Brackendale?", "answer": "They follow the Squamish River''s chum salmon run, which provides easy feeding on shallow gravel bars, and the braided river channel and large trees for roosting make Brackendale an especially strong spot for the gathering to concentrate."},
    {"question": "Is there a fee to see the Brackendale eagles?", "answer": "No. It is a wild, free-roaming gathering viewed from a public dyke trail, with no gate or admission fee."},
    {"question": "What should I bring to view eagles at Brackendale?", "answer": "Binoculars or a long lens if you have them, warm layers and good footwear for a muddy winter trail, and patience, since numbers vary day to day."}
  ]'::jsonb
);
```

---

## Facebook Post

Everyone driving through Squamish is looking up at the Chief or lining up for the gondola. Almost nobody's looking down at the river.

Every winter, bald eagles gather by the hundreds along the Squamish River in Brackendale to feed on the salmon run — a genuine wildlife spectacle happening a few minutes off the highway, for free, that most people driving the corridor have never heard of. Season's starting right now.

Where to actually go, when to go, and what to bring — link in the first comment.

📍 Brackendale, Squamish

Anyone else had no idea this was happening every winter a few minutes off Highway 99?

---

## Instagram Post

**Caption:**

Squamish's biggest winter wildlife event isn't on the mountain. It's on the river. 🦅

Every year from November through February, bald eagles gather by the hundreds along the Squamish River in Brackendale to feed on the salmon run — and most people driving through Squamish on their way to Whistler have no idea it's happening a few minutes off the highway.

It's free, it's wild (not managed), and a quiet grey weekday morning on the dyke trail is honestly the best time to go. Bring binoculars if you've got them.

Full guide to where to go and what to know before you drive up — link in our first comment.

Tag someone who'd actually get up early for this. 👇

First comment: Full guide to Brackendale eagle viewing → bestseatosky.com/blog/brackendale-eagle-viewing-squamish

📍 Brackendale, Squamish

#brackendale #squamish #baldeagle #seatosky #explorebc #britishcolumbia #hellobc #bctravel #wildlifephotography #highway99

---

## Media Notes

Check `carousel-photos/Squamish/` locally first — Rick's library may already have shots from Brackendale or the Squamish River dyke trail from a past winter, even if not filed under "eagles" specifically, since it's a known local spot he's likely driven past or shot before.

If nothing usable turns up there, this is **Your media** — the whole hook depends on showing the real river and real birds, not a generic eagle-in-flight stock shot that could be anywhere:

1. Wide establishing shot of the Squamish River and gravel bars from the dyke trail — 8–10 sec
2. The dyke trail itself, walking shot, showing it's an easy, flat public path — 6–8 sec
3. Eagles in the trees or on the gravel bars, even at a distance with a zoom — 8–12 sec (this is the payoff shot; worth the patience to get it)
4. A close-ish detail shot if possible: an eagle perched, wings folded, river behind it — 5–8 sec
5. Optional closer: binoculars/camera in hand, pointed toward the river, to signal "this is a real viewing spot" — 5 sec

Total run time roughly 30–40 sec. Text overlay works well for "free, wild, a few minutes off the highway" since that's the surprise most people will stop to read. If no eagle footage is available on a given shoot day (the birds are wild — no guarantee), it's honest to caption around "numbers vary day to day" rather than implying a guaranteed sighting. If Rick's library has nothing from Brackendale and a shoot isn't realistic before this posts, fall back to **Stock — search "Brackendale eagles Squamish"** or "bald eagle Squamish River" specifically (genuinely the real location, per brand book) rather than a generic bald-eagle stock image that could be anywhere in North America.
