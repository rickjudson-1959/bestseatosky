# Draft batch — 2026-10-23

**Topic:** Horseshoe Bay — the village at the literal start of the Sea-to-Sky drive, where most people just blow through on the way to the highway. Covers timing your departure around ferry traffic, the lookout above town, and the ten-minute marina stroll worth the stop.

**Why this topic fits the rotation:** The last three posts covered Squamish (West Coast Railway Heritage Park, 2026-10-13), Britannia Beach (Jane Camp Trail, 2026-10-16), and Whistler (Cheakamus Lake, 2026-10-20) — none were a "the drive itself" post, and that bucket hasn't had a fresh entry since Tantalus Lookout on 2026-09-25, almost a month ago. Horseshoe Bay is also a genuinely new angle: every prior Highway 99 post (Porteau Cove, Brandywine, Tantalus, Britannia Beach) references it only in passing as a landmark ("between Horseshoe Bay and Squamish"), and it's never been the subject of its own post despite being the actual southern starting point of the corridor.

---

## Blog Post (SQL)

```sql
-- Best Sea to Sky — new blog post
-- Paste into Supabase SQL Editor. Does NOT set status to 'published' —
-- left as 'draft' so Rick reviews and flips status before it goes live.
-- featured_image left NULL: Rick needs a real photo of Horseshoe Bay
-- itself (the lookout view over the marina and Howe Sound, or the village
-- street) — brand book rule is no stock imagery standing in for a
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
  'horseshoe-bay-start-of-the-drive',
  'Horseshoe Bay: Where the Sea-to-Sky Drive Actually Begins',
  'Most people drive straight through Horseshoe Bay on the way to the highway. Here''s why it''s worth ten minutes — the ferry-traffic timing trick, the lookout above town, and the marina stroll before you hit Highway 99.',
  NULL, -- TODO(Rick): real photo of the Horseshoe Bay lookout view or marina/village street, no stock
  'Everyone heading up the corridor drives through Horseshoe Bay without stopping — it''s just the last traffic light before the highway opens up. But it''s also where you can lose twenty minutes to ferry traffic without knowing it, or gain a view over Howe Sound for the price of a short detour up the hill. Here''s what locals know about the village most visitors never actually see.',
  '<p>If you''re driving up from Vancouver, Horseshoe Bay is the place where the city ends and the Sea-to-Sky corridor begins &mdash; the last set of traffic lights, the last gas station most people think of, and then the highway opens up along Howe Sound. Most people treat it as a pass-through. That''s a mistake, and not just for the view.</p>

<h2>The ferry traffic trick</h2>

<p>Horseshoe Bay is a working ferry terminal &mdash; BC Ferries runs routes to Bowen Island, the Sunshine Coast, and Vancouver Island out of here &mdash; and that matters to anyone driving through, not just the people getting on a boat. When a sailing is loading or just arrived, the village and the highway approach can back up fast, even if you have zero interest in the ferry itself. [VERIFY: current BC Ferries sailing schedule and typical loading/unloading windows before publishing, since knowing which times to avoid is the actual value here]. Locals time their drive north around this without really thinking about it; visitors usually don''t, and end up sitting in a line that has nothing to do with their own trip.</p>

<p>The fix is simple once you know it: check the sailing schedule before you leave, and if you can shift your departure by even fifteen minutes to miss a loading window, do it. It''s the single easiest way to shave real time off the start of a Sea-to-Sky day trip.</p>

<h2>The lookout above town</h2>

<p>Drive up the hill out of the village toward the highway and there''s a pullout with a clean view back down over the marina, the ferry terminal, and Howe Sound toward Bowen Island. [VERIFY: exact name and location of the lookout/viewpoint along the Nelson Avenue or highway approach before publishing directions]. It takes two minutes and most people drive past it with their eyes on the road ahead, not behind them. On a clear day it''s a genuinely good first look at the water that gives this corridor half its name &mdash; worth the stop before the highway swallows your attention for the next hour.</p>

<h2>The village itself</h2>

<p>Horseshoe Bay''s main strip is small enough to walk in ten minutes: a marina full of boats, a public dock, a little park right at the water, and a walk-up fish and chips window that''s been a stop for ferry travellers and locals alike for longer than most people visiting today have been alive. [VERIFY: current hours and whether the walk-up window is seasonal before sending people there]. It''s not a destination the way Squamish or Whistler are &mdash; it''s a ten-minute leg-stretch, a coffee, and a chance to let a toddler or a dog run around before three more hours in the car.</p>

<p>If you''re someone who always wants to beat the crowd, this is also the better time to see the water before the day''s traffic builds &mdash; the bay is at its calmest early, before the first ferry rush and before the highway gets busy with everyone else''s road trip.</p>

<h2>Good to know before you go</h2>

<p>Parking in Horseshoe Bay village is limited and shared with ferry traffic, so don''t expect to find a spot right at the water on a busy weekend. [VERIFY: current public parking lot locations and rates before publishing]. Public washrooms exist near the terminal. There''s no need to detour off Highway 99 to see any of this &mdash; the village sits right where the highway starts, so stopping costs you minutes, not a real detour.</p>

<p>The honest pitch: Horseshoe Bay isn''t a hike or a hidden gem, it''s the opening scene of every Sea-to-Sky trip, and most people skip it entirely. Check the ferry schedule, take the two-minute lookout detour, and you''ll start the drive north already ahead of the traffic instead of stuck in it.</p>',
  'Best Sea to Sky',
  'draft',
  '[
    {"question": "Do I need to worry about ferry traffic driving through Horseshoe Bay if I''m not taking a ferry?", "answer": "Yes — Horseshoe Bay is a working BC Ferries terminal, and the village and highway approach can back up when a sailing is loading or unloading, even for drivers just passing through on Highway 99. Checking the sailing schedule before you leave can save real time."},
    {"question": "Is Horseshoe Bay worth stopping at on the way to Squamish or Whistler?", "answer": "It's a short stop, not a destination — a lookout with a view over the marina and Howe Sound, a walkable village strip, and a fish and chips window. Worth ten minutes, not a planned detour."},
    {"question": "Where is the viewpoint over Horseshoe Bay?", "answer": "There's a pullout on the hill leaving the village toward the highway with a view back down over the marina and Howe Sound toward Bowen Island. [VERIFY: exact location before publishing directions]."},
    {"question": "How far is Horseshoe Bay from Squamish?", "answer": "It sits right at the start of Highway 99 heading north out of Vancouver — the first stretch of the Sea-to-Sky corridor drive before Squamish. [VERIFY: exact drive time before publishing]."}
  ]'::jsonb
);
```

---

## Facebook Post

Everyone driving up the corridor passes through Horseshoe Bay without stopping. Here's what they're missing: a two-minute lookout over Howe Sound, and a traffic trick that can save you twenty minutes before you even hit the highway.

Horseshoe Bay is a working ferry terminal, so when a sailing is loading, the village and highway approach can back up — even if you're not getting on a boat. Check the schedule before you leave and shift your timing if you can. Then take the pullout on the hill out of town for the view before the highway swallows your attention for the next hour.

Full write-up — link in the first comment.

📍 Horseshoe Bay, West Vancouver, BC

What's your go-to trick for beating traffic at the start of a Sea-to-Sky trip?

---

## Instagram Post

**Caption:**

The Sea-to-Sky drive technically starts here — and almost nobody stops. 🌊

Horseshoe Bay is the last village before Highway 99 opens up, and it's also a working ferry terminal — which means traffic through here has nothing to do with you unless you know the trick. Check the sailing schedule before you leave, shift your departure if you can, and take the two-minute lookout pullout on the hill out of town for a view over the marina and Howe Sound before the highway takes over.

Full guide — including the exact traffic-timing trick — in our first comment.

Anyone else only just realized this is where the "sea to sky" actually starts? 👇

First comment: Full guide to Horseshoe Bay → bestseatosky.com/blog/horseshoe-bay-start-of-the-drive

📍 Horseshoe Bay, West Vancouver, BC

#horseshoebay #howesound #seatosky #westvancouver #roadtripbc #explorebc #britishcolumbia #hellobc #bctravel #pnw

---

## Media Notes

Check `carousel-photos/horseshoe bay/` locally first — Rick's library already has a town folder for this exact spot, so there's a real chance usable shots of the marina, lookout, or village already exist. Confirm what's there before shooting or building anything new.

If nothing from the lookout or marina exists yet, this needs **Your media** — the Howe Sound lookout view and the specific marina/village street are exactly the kind of real-location shots the brand book calls for, and generic stock would either misrepresent the spot or just not show it at all.

Shot list if new footage is needed (vertical, phone is fine):

1. The drive-up approach into the village — highway sign or the descent into Horseshoe Bay — 5–8 sec, sets the "this is the start of the trip" context
2. The lookout pullout view back over the marina, ferry terminal, and Howe Sound toward Bowen Island — hold this one longer, it's the hook shot — 10–12 sec
3. A walk through the village strip — marina, boats, the public dock — 8–10 sec
4. The fish and chips window or a coffee-in-hand shot at the water's edge — 5–8 sec
5. Optional: a ferry loading/departing in the background for the "traffic trick" context — 5–8 sec

Total run time roughly 35–45 sec. Text overlay should carry the "ferry traffic trick" hook since that's the practical, savable detail — a line like "the traffic jam that has nothing to do with you" over the lookout shot. Calm instrumental or light trending audio both work; no voiceover needed if overlay text does the work.
