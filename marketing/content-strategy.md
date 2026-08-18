# Best Sea to Sky — Content Strategy Notes

> Condensed from the active 14-day content plan (Aug 17–30, 2026, in
> `Best Sea to Sky Content/bestseatosky-content-plan.html` on Rick's local machine).
> These are the operating rules for any new blog post or social draft — apply them
> alongside `marketing/brand-book.md` (voice, colours, imagery rules).

## Why these rules exist

The account's last 5 posts got zero comments, one got exactly 1 view. The problem
wasn't the content, it was distribution — posts weren't reaching anyone outside
the existing (tiny) follower base. Every rule below optimizes for **reach before
conversion**: get in front of people who don't follow yet, ask for nothing yet.

## Format priority

1. **Reels lead.** Reels are the only Instagram format that reliably reaches
   non-followers. Aim for roughly half of any batch to be Reels.
2. **Carousels** are the second priority — good for "save this" list-style content
   (budget eats, hidden gems, itineraries).
3. **Static photos** are the lowest priority — reserve for things like intro/"who
   we are" posts.

## Caption rules

- **Link goes in the first comment, never the caption.** With a small audience,
  a link-out asks for a click that hasn't been earned yet, and link-heavy
  captions get algorithmically suppressed. Payoff lands in-feed; link sits in
  comment one, pointing to the matching bestseatosky.com blog/guide page.
- **Location tag on every post** — tag the specific place (e.g. "Shannon Falls
  Provincial Park," "Whistler Village"), not just "Squamish, BC." This is
  place-based discovery, which is where trip-planning readers actually look.
- **Hashtags:** ~10 per post, mix of specific place tags (#shannonfalls,
  #whistlervillage) and broader regional tags (#explorebc, #britishcolumbia,
  #seatosky, #hellobc, #bctravel). Avoid hashtags so broad they're invisible.
- **Lead with the specific place, not the category** — "The best post-trail
  patio in Squamish" beats "Check out our Eat section" (brand book rule).
- End on a light engagement prompt where it fits naturally (a question, "tag
  someone who...") — never forced, never stacked exclamation marks.

## Media source — flag this on every post

Every draft must be labeled with one of:

- **"Your media"** — needs Rick's own footage/photos. Describe exactly what to
  shoot: number of clips, length, angle, whether voiceover/text overlay/trending
  audio is needed. Keep the ask small (a phone, vertical, 10–15 sec clips).
- **"Blotato can build"** — no footage needed from Rick. Say what template/source
  material it pulls from (e.g. a carousel built from an existing blog guide's
  list content, in brand colours, with a follow CTA on the last slide). Note
  where swapping in one real photo would outperform a fully generated cover.

Never draft a post assuming footage exists that hasn't been shot. If a strong
idea needs media Rick doesn't have yet, mark it "Your media" and describe the
shot list — don't silently downgrade the idea to fit existing assets.

## Blog posts

New blog posts are written as SQL insert files matching the existing pattern in
`Blog Posts/insert-blog-post-N.sql` (see that folder on Rick's local machine, or
the `blog_posts` Supabase table: slug, title, meta_description, featured_image,
excerpt, content, author, faq_json). Every social batch should reference an
existing or newly-drafted blog/guide page as the "first comment" link target —
social content and blog content are written together, not independently.

## Corridor coverage

Territory is **Vancouver to Pemberton** (not "Vancouver to Whistler" — that's a
known site copy bug, see brand book "Known Deviations"). Rotate topics across
Squamish, Whistler, Pemberton, Britannia Beach, and the drive itself (Highway 99
stops) — don't over-index on Whistler just because it's the best-known name.

## Voice reminders (see brand-book.md for full detail)

- Canadian spelling always: neighbour, favourite, colour, centre.
- Short, plain, concrete nouns. No "experiences," no "offerings," no stacked
  exclamation marks, no tourism-board register.
- Never claim "the best" without review data backing it.
