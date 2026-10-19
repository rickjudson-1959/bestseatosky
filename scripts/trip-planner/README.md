# Sea to Sky Trip Planner PDF generator

Builds `public/downloads/sea-to-sky-trip-planner.pdf` (served at
https://bestseatosky.com/downloads/sea-to-sky-trip-planner.pdf), the free
planner people get from the trip planner signup. This is v3, the 2026-27
edition. It replaces the old ReportLab script that made v2, which was never
committed.

## Files

| File | What it is |
| --- | --- |
| `build_trip_planner.py` | Builds the PDF. Validates every listing and link first. |
| `content.py` | All planner copy. Businesses are referenced by listing slug only. |
| `check_pdf.py` | Checks the built PDF against the house rules (see below). |
| `data/listings-snapshot.json` | Read-only export of the Supabase listings used, plus published guide and blog slugs. |
| `data/export.sql` | The read-only SQL that produced the snapshot. |
| `requirements.txt` | Python packages (ReportLab, pypdf). |

## How to run

From the repo root:

```bash
python3 -m venv .venv-trip-planner
.venv-trip-planner/bin/pip install -r scripts/trip-planner/requirements.txt
.venv-trip-planner/bin/python scripts/trip-planner/build_trip_planner.py
.venv-trip-planner/bin/python scripts/trip-planner/check_pdf.py
```

`build_trip_planner.py` writes to `public/downloads/sea-to-sky-trip-planner.pdf`
by default. Use `--out some/other.pdf` to write somewhere else, and
`--data` to point at a different snapshot. `check_pdf.py` takes the PDF path
as its only argument and needs the poppler tools `pdftotext` and `pdfinfo`.

No database access is needed to build. The output is deterministic: the same
inputs give a byte-identical PDF (ReportLab invariant mode plus a fixed
document date, `PDF_DATE` in the builder; bump it when the copy changes).

## Refreshing the listing data

1. Run the queries in `data/export.sql` (read-only) against the Best Sea to
   Sky Supabase project (ref `ntbedmwekuzpsvqubadb`).
2. Replace `listings`, `site_counts` and `site_pages` in
   `data/listings-snapshot.json` with the new rows and update `exported_at`.
3. Rebuild and run the checker.

The builder stops with an error if any listing used in `content.py` is missing
or not published. The two must-keep listings (The Locavore Bar & Grill and
Sunwolf Riverside Resort) are never dropped: if either is unpublished the
builder keeps it and prints a warning so someone can decide.

The snapshot also holds two listings that are not printed
(`handlebar-pizza-whistler`, `purebread-bakery-coffee-whistler-2`). They are
kept as the record of why v2's "Handlebar Cafe" was removed and which of the
two Whistler Purebread listings was used.

## House rules the builder and checker enforce

- No em dashes or en dashes anywhere, in the PDF or in these files.
- The blocked school property (Supabase `blocked_listings`; owner asked for
  removal) never appears. Pattern: `FORBIDDEN` in `build_trip_planner.py`.
- The blocked phone number never appears, in any format. Pattern: also in
  `FORBIDDEN`. (These docs avoid spelling either one out so the checker can
  scan them too.)
- Locavore and Sunwolf stay in the planner.
- Edition label is `2026-27`; no other year label.
- The Squamish activities block has the Canadian Coastal Sailing line, linked
  to its listing page https://bestseatosky.com/play/canadian-coastal-sailing-squamish,
  not the affiliate link. If the affiliate link is ever used, the PDF must also
  say "We may earn a commission if you book through these links."
- Every link is https and goes to a real bestseatosky.com page (published
  listing, guide, blog post, home, /guide or /chat) or to a website stored on
  a Supabase listing. Other resources (bcparks.ca, drivebc.ca,
  weather.gc.ca) are printed as plain text.
- No prices, phone numbers, hours or ratings for named businesses, and no
  unverifiable claims (rankings, superlatives, years in business).
