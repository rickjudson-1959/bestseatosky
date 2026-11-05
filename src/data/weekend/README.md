# Weekend list issues

Each file in this folder is one sent issue of the Sea to Sky weekend list. `/weekend` shows the issue with the latest start date, plus a signup box and links to earlier issues. `/weekend/2026-11-06` is that issue's own page. The filename is the start date.

Mark sends the week's final HTML after the email goes out. The email subject is not inside that file. Pass it in as the page title.

## Convert the HTML

From the repo root:

```sh
node scripts/weekend-issue-from-html.mjs \
  --html path/to/mark-issue.html \
  --title "Email subject line" \
  --start 2026-11-13 \
  --end 2026-11-15 \
  --updated 2026-11-11T13:38:00-07:00
```

- `--title` is the subject line. It becomes the H1, the archive link, and the page title.
- `--start` and `--end` are the weekend dates (`YYYY-MM-DD`). The file is named after `--start`.
- `--updated` is when the email was sent. Include the Pacific offset. This is the Updated line.

The script writes `src/data/weekend/<start>.json`. It keeps the events, times, prices, source links, and any "Time unconfirmed" or "Hours unconfirmed" lines word for word. En dashes in time ranges stay. It drops the Brevo `{{ unsubscribe }}` link, the email table chrome, and the Google Fonts tag. On allevents.in links it drops `?ref=eventlist-bluebar`.

Commit the JSON file only. Do not commit the HTML. Open a pull request. Rick merges.

Check the JSON before you commit: the title is the subject, the three fields `startDate`, `endDate`, and `updated` are right, and every unconfirmed warning from the email is still there. The happenings count on each day must match the number of events.

## If the script stops

The HTML Mark sends is one event card per table, with a day heading, a town heading, a time chip, a name, a venue, a blurb, optional badges, and a Source line. If a future file uses a different shape, the script exits with an error instead of writing a partial file. Fix the HTML only if a tag is broken, or extend the script. Do not hand-copy a partial conversion over a failed run without checking every event.

A hand-written file has to match `2026-11-06.json`:

- `slug` equals `startDate`, and the filename is `<startDate>.json`.
- `title` is the email subject. `masthead` and `intro` are the two lines from the green header.
- `description` is the meta description. The converter sets it to the intro.
- `days[].countLabel` is like `12 happenings` and must match the events under that day.
- Each event has `time`, `timeTone` (`clock` or `span`), `name`, `venue`, `blurb`, and at least one `sources` entry (`label`, `href`).
- Put unconfirmed lines in `warnings`, not in the blurb. Copy them exactly.
- `notes` are the "Confirm before you go" paragraphs. Leave the unsubscribe link out.

## Photos

The first issue has no photos. If you add one, the event needs all three fields:

```json
"photo": { "src": "/images/weekend/example.jpg", "alt": "What the photo shows", "credit": "Photographer name" }
```

`credit` is required. A photo with no photographer credit fails the check below and the production build.

## What the check rejects

`npm test` reads every JSON file here and fails if any issue text contains:

- an em dash (U+2014), including `&mdash;`
- the word Cheakamus
- `{{` (a Brevo merge tag)
- the phone number 778-770-2931, in any formatting

En dashes (U+2013) in ranges such as `10 AM–5 PM` are fine.

The same check runs when the site loads the files, so `npm run build` fails on a bad file too.

## After the weekend

Pages re-render about hourly. The comparison uses the calendar date in America/Vancouver, not UTC, so Sunday evening on the coast does not expire the issue early. The issue stays indexable through its end date. The next Vancouver morning it is `noindex, follow`, it leaves `sitemap.xml`, and it stays linked from Earlier weekends on `/weekend`. `/weekend` itself stays indexed and keeps showing the newest file, with the dates and the Updated line visible, until a newer file is merged. No extra pull request is required for that change.

Do not set `WEEKEND_AS_OF` in Vercel. That variable is only for checking the date flip locally.
