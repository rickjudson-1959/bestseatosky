import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { parseWeekendHtml } from '../../scripts/weekend-issue-from-html.mjs';
import {
  findIssueViolations,
  formatUpdated,
  formatWeekendRange,
  isIssueCurrent,
  pickArchive,
  pickLatest,
  validateIssue,
  vancouverDateISO,
} from './weekendCore.mjs';

const DATA_DIR = path.join(process.cwd(), 'src/data/weekend');
const ISSUE_FILE = path.join(DATA_DIR, '2026-11-06.json');

const WARNINGS = [
  'Time unconfirmed: venue lists 9:00 PM, allevents lists 7:00 PM',
  'Hours unconfirmed: organizer lists 10 AM–5 PM, allevents lists 10 AM–6 PM',
  'Time unconfirmed: source lists both 6:00–9:30 PM and 5:00–8:30 PM',
];

function readIssueFiles() {
  return fs.readdirSync(DATA_DIR).filter((name) => name.endsWith('.json'));
}

function sampleIssue() {
  return {
    slug: '2026-11-06',
    title: 'Sample weekend',
    description: 'A sample list.',
    masthead: 'Sea to Sky weekend: Nov 6–8',
    startDate: '2026-11-06',
    endDate: '2026-11-08',
    updated: '2026-11-04T13:38:00-07:00',
    intro: 'A sample list.',
    days: [
      {
        heading: 'Friday, November 6',
        countLabel: '1 happenings',
        towns: [
          {
            name: 'Squamish',
            entries: [
              {
                time: '7:00 PM',
                timeTone: 'clock',
                name: 'Sample show',
                venue: 'Town hall',
                blurb: 'Doors at 6:30 PM.',
                sources: [{ label: 'example.com', href: 'https://example.com/event' }],
              },
            ],
          },
        ],
      },
    ],
    notes: ['Confirm before you go.'],
  };
}

function vancouverWallClock(year, month, day, hour, minute) {
  const utcGuess = Date.UTC(year, month - 1, day, hour, minute);
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Vancouver',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date(utcGuess));
  const map = {};
  for (const part of parts) {
    if (part.type !== 'literal') map[part.type] = part.value;
  }
  const asUTC = Date.UTC(+map.year, +map.month - 1, +map.day, +map.hour, +map.minute, +map.second);
  return new Date(utcGuess - (asUTC - utcGuess));
}

test('issue files reject em dashes, Cheakamus, merge tags, and the site phone', () => {
  const files = readIssueFiles();
  assert.ok(files.length > 0, 'expected at least one weekend issue');
  for (const file of files) {
    const raw = fs.readFileSync(path.join(DATA_DIR, file), 'utf8');
    assert.deepEqual(findIssueViolations(raw), [], file);
    const issue = validateIssue(JSON.parse(raw), file);
    for (const day of issue.days) {
      for (const town of day.towns) {
        for (const entry of town.entries) {
          if (entry.photo) {
            assert.equal(typeof entry.photo.credit, 'string');
            assert.ok(entry.photo.credit.trim().length > 0);
          }
        }
      }
    }
  }
});

test('forbidden strings fail in any phone formatting, and en dashes do not', () => {
  for (const phone of [
    '778-770-2931',
    '(778) 770-2931',
    '778.770.2931',
    '+1 778 770 2931',
    '7787702931',
    '1-778-770-2931',
  ]) {
    assert.deepEqual(findIssueViolations(`Call ${phone} today`), ['phone'], phone);
  }
  assert.deepEqual(findIssueViolations('Open 10 AM–5 PM'), []);
  assert.ok(findIssueViolations('A real \u2014 dash').includes('em dash'));
  assert.ok(findIssueViolations('written as \\u2014').includes('em dash'));
  assert.ok(findIssueViolations('Cheakamus Centre').includes('Cheakamus'));
  assert.ok(findIssueViolations('{{ unsubscribe }}').includes('{{'));

  const broken = sampleIssue();
  broken.days[0].towns[0].entries[0].blurb = 'Call 778-770-2931';
  assert.throws(() => validateIssue(broken, '2026-11-06.json'), /phone/);

  const photo = sampleIssue();
  photo.days[0].towns[0].entries[0].photo = {
    src: '/images/market.jpg',
    alt: 'Market stall',
  };
  assert.throws(() => validateIssue(photo, '2026-11-06.json'), /credit/i);

  const credited = sampleIssue();
  credited.days[0].towns[0].entries[0].photo = {
    src: '/images/market.jpg',
    alt: 'Market stall',
    credit: 'Alex Lee',
  };
  assert.equal(validateIssue(credited, '2026-11-06.json').days[0].towns[0].entries[0].photo.credit, 'Alex Lee');
});

test('Nov 6-8 issue keeps the subject, the three warnings, and the email notes', () => {
  const raw = fs.readFileSync(ISSUE_FILE, 'utf8');
  const issue = validateIssue(JSON.parse(raw), '2026-11-06.json');
  assert.equal(issue.title, 'Writers festival, Cornucopia and live music: your Sea to Sky weekend');
  assert.equal(issue.masthead, 'Sea to Sky weekend: Nov 6–8');
  assert.equal(issue.updated, '2026-11-04T13:38:00-07:00');
  assert.equal(formatUpdated(issue.updated), 'Updated Nov 4, 2026, 1:38 p.m. PT');
  assert.equal(formatWeekendRange(issue.startDate, issue.endDate), 'November 6–8, 2026');
  assert.deepEqual(issue.days.map((day) => day.countLabel), ['12 happenings', '17 happenings', '8 happenings']);
  assert.equal(issue.notes[0].startsWith('Confirm before you go.'), true);
  assert.equal(raw.includes('unsubscribe'), false);
  assert.equal(raw.includes('eventlist-bluebar'), false);
  assert.equal(raw.includes('{{'), false);

  const warnings = issue.days.flatMap((day) => day.towns.flatMap((town) => town.entries.flatMap((entry) => entry.warnings ?? [])));
  assert.deepEqual(warnings, WARNINGS);
  const hrefs = issue.days.flatMap((day) => day.towns.flatMap((town) => town.entries.flatMap((entry) => entry.sources.map((source) => source.href))));
  assert.ok(hrefs.some((href) => href === 'https://allevents.in/whistler/this-weekend'));
  const zummers = issue.days[1].towns[1].entries.find((entry) => entry.name === 'The Zummers LIVE!');
  assert.equal(zummers.timeNote, 'doors 5, music 6');
});

test('a past weekend drops out of the current set, including Sunday night Pacific', () => {
  const issue = validateIssue(JSON.parse(fs.readFileSync(ISSUE_FILE, 'utf8')), '2026-11-06.json');
  assert.equal(isIssueCurrent(issue.endDate, '2026-11-05'), true);
  assert.equal(isIssueCurrent(issue.endDate, '2026-11-08'), true);
  assert.equal(isIssueCurrent(issue.endDate, '2026-11-09'), false);

  const sundayNight = vancouverWallClock(2026, 11, 8, 23, 30);
  assert.equal(vancouverDateISO(sundayNight), '2026-11-08');
  assert.equal(sundayNight.toISOString().slice(0, 10), '2026-11-09');
  assert.equal(isIssueCurrent(issue.endDate, vancouverDateISO(sundayNight)), true);

  const utcMonday = new Date('2026-11-09T00:00:00.000Z');
  assert.equal(vancouverDateISO(utcMonday), '2026-11-08');
  assert.equal(isIssueCurrent(issue.endDate, vancouverDateISO(utcMonday)), true);

  const mondayMorning = vancouverWallClock(2026, 11, 9, 0, 1);
  assert.equal(vancouverDateISO(mondayMorning), '2026-11-09');
  assert.equal(isIssueCurrent(issue.endDate, vancouverDateISO(mondayMorning)), false);

  assert.equal(pickLatest([issue]).slug, '2026-11-06');
  assert.deepEqual(pickArchive([issue], '2026-11-09'), []);
  const older = { ...issue, slug: '2026-10-30', startDate: '2026-10-30', endDate: '2026-11-01', title: 'Older list' };
  assert.deepEqual(pickArchive([older, issue], '2026-11-09').map((item) => item.slug), ['2026-10-30']);
  assert.equal(pickLatest([older, issue]).slug, '2026-11-06');
});

test('the HTML converter drops the unsubscribe tag and keeps an unconfirmed warning', () => {
  const html = `<!DOCTYPE html><html><head>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans&display=swap" rel="stylesheet">
<title>Sea to Sky weekend: Nov 6–8</title></head><body>
<table><tr><td style="background-color:#17422e;padding:34px;">
<div style="font-size:30px;">Sea to Sky weekend: Nov 6&ndash;8</div>
<div style="font-size:14px;">What&rsquo;s on this weekend.</div>
</td></tr><tr><td>
<div style="font-size:22px;">Friday, November 6 <span>&nbsp;1 happenings</span></div>
<div style="text-transform:uppercase;">Squamish</div>
<table role="presentation" style="border-radius:14px;"><tr><td style="padding:16px;">
<span style="background:#17422e;padding:5px 10px;">9:00 PM</span>
<div style="font-size:16px;font-weight:700;">Coastal Distortion Vol. 2</div>
<div style="font-size:13px;">Trickster&rsquo;s Hideout</div>
<div style="font-size:14px;">A rock night. Open 8:00&ndash;11:00 PM.</div>
<div style="margin-top:8px;"><span style="background:#f7e8d3;">Time unconfirmed: venue lists 9:00 PM, allevents lists 7:00 PM</span></div>
<div style="border-top:1px dashed #e2dccc;">Source: <a href="https://allevents.in/squamish/this-weekend?ref=eventlist-bluebar">allevents.in</a></div>
</td></tr></table>
</td></tr>
<tr><td style="background-color:#f2eee4;"><!-- Footer -->
<div>Confirm before you go.</div>
<div>Best Sea to Sky &middot; <a href="https://bestseatosky.com">bestseatosky.com</a> &middot; <a href="{{ unsubscribe }}">Unsubscribe</a></div>
</td></tr></table></body></html>`;

  const issue = parseWeekendHtml(html, {
    title: 'Subject line',
    start: '2026-11-06',
    end: '2026-11-08',
    updated: '2026-11-04T13:38:00-07:00',
  });
  assert.equal(issue.title, 'Subject line');
  assert.equal(issue.days[0].towns[0].entries[0].sources[0].href, 'https://allevents.in/squamish/this-weekend');
  assert.deepEqual(issue.days[0].towns[0].entries[0].warnings, [
    'Time unconfirmed: venue lists 9:00 PM, allevents lists 7:00 PM',
  ]);
  assert.equal(JSON.stringify(issue).includes('{{'), false);
  assert.equal(JSON.stringify(issue).includes('unsubscribe'), false);
  assert.equal(JSON.stringify(issue).includes('fonts.googleapis'), false);
  assert.equal(issue.notes.length, 1);
  assert.equal(issue.days[0].towns[0].entries[0].blurb.includes('\u2013'), true);

  const unsent = parseWeekendHtml(html, {
    title: 'Subject line',
    start: '2026-11-06',
    end: '2026-11-08',
  });
  assert.equal('updated' in unsent, false);
  assert.equal(unsent.days[0].countLabel, '1 happenings');
});

test('an issue with no send time omits updated', () => {
  const issue = sampleIssue();
  delete issue.updated;
  const validated = validateIssue(issue, '2026-11-06.json');
  assert.equal('updated' in validated, false);
});

test('Nov 13-15 issue keeps the send time, HTML counts, and warnings', () => {
  const file = path.join(DATA_DIR, '2026-11-13.json');
  const raw = fs.readFileSync(file, 'utf8');
  const issue = validateIssue(JSON.parse(raw), '2026-11-13.json');
  assert.equal(issue.title, "Cornucopia's closing gala, Lions Bay blues and Anything Goes: your Sea to Sky weekend");
  assert.equal(issue.slug, '2026-11-13');
  assert.equal(issue.startDate, '2026-11-13');
  assert.equal(issue.endDate, '2026-11-15');
  assert.equal(issue.masthead, 'Sea to Sky weekend: Nov 13-15');
  assert.equal(issue.updated, '2026-11-11T16:59:14-07:00');
  assert.equal(formatUpdated(issue.updated), 'Updated Nov 11, 2026, 4:59 p.m. PT');
  assert.deepEqual(issue.days.map((day) => day.countLabel), ['7 happenings', '12 happenings', '2 happenings']);
  const warnings = issue.days.flatMap((day) => day.towns.flatMap((town) => town.entries.flatMap((entry) => entry.warnings ?? [])));
  assert.deepEqual(warnings, [
    'Sold out as of Nov 10',
    'Hours not listed on the source page',
    'Show time not listed on the source pages',
  ]);
  assert.equal(raw.includes('unsubscribe'), false);
  assert.equal(raw.includes('{{'), false);
  assert.equal(raw.includes('eventlist-bluebar'), false);
  assert.equal(issue.notes[0].startsWith('Confirm before you go.'), true);
  assert.equal(issue.notes.some((note) => /bestseatosky\.com/i.test(note)), false);

  const issues = [issue, validateIssue(JSON.parse(fs.readFileSync(ISSUE_FILE, 'utf8')), '2026-11-06.json')];
  assert.equal(pickLatest(issues).slug, '2026-11-13');
  assert.deepEqual(pickArchive(issues, '2026-11-11').map((item) => item.slug), ['2026-11-06']);
  assert.equal(isIssueCurrent(issue.endDate, '2026-11-15'), true);
  assert.equal(isIssueCurrent(issue.endDate, '2026-11-16'), false);
});

test('weekend signup copy asks for the list and leaves the planner defaults in place', () => {
  const page = fs.readFileSync(path.join(process.cwd(), 'src/app/weekend/page.tsx'), 'utf8');
  const issuePage = fs.readFileSync(path.join(process.cwd(), 'src/app/weekend/[slug]/page.tsx'), 'utf8');
  const signup = fs.readFileSync(path.join(process.cwd(), 'src/components/NewsletterSignup.tsx'), 'utf8');
  const success = "You're in. Check your inbox for a welcome email.";

  assert.equal(page.includes('source="weekend-page"'), true);
  assert.equal(page.includes('leadType="newsletter"'), true);
  assert.equal(page.includes('buttonLabel="Get the weekend list"'), true);
  assert.equal(page.includes(success), true);
  assert.equal(page.includes('trip planner'), false);
  assert.equal(page.includes('Wednesday'), false);
  assert.equal(page.includes('download'), false);
  assert.equal(page.includes('\u2014'), false);
  assert.equal(issuePage.includes('\u2014'), false);
  assert.equal(issuePage.includes('canonicalPath: `/weekend/${issue.slug}`'), true);
  assert.equal(page.includes("canonicalPath: '/weekend'"), true);

  assert.equal(signup.includes('Get the Planner'), true);
  assert.equal(signup.includes('Get the Free Planner'), true);
  assert.equal(signup.includes('Check your inbox for your Sea to Sky trip planner.'), true);
  assert.equal(signup.includes('successMessage ??'), true);
  assert.equal(signup.includes('buttonLabel ??'), true);
});
