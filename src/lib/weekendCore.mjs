/**
 * Pure weekend-list rules. Shared by the Next.js pages and the guard test.
 * Dates are calendar days in America/Vancouver, compared as YYYY-MM-DD.
 */

const MONTHS = [
  null,
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const ISSUE_KEYS = [
  'slug',
  'title',
  'description',
  'masthead',
  'startDate',
  'endDate',
  'updated',
  'intro',
  'days',
  'notes',
];

const DAY_KEYS = ['heading', 'countLabel', 'towns'];
const TOWN_KEYS = ['name', 'entries'];
const ENTRY_REQUIRED = ['time', 'timeTone', 'name', 'venue', 'blurb', 'sources'];
const ENTRY_OPTIONAL = ['timeNote', 'badges', 'warnings', 'photo'];
const SOURCE_KEYS = ['label', 'href'];
const PHOTO_KEYS = ['src', 'alt', 'credit'];

export function vancouverDateISO(now) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Vancouver',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  const get = (type) => parts.find((part) => part.type === type)?.value ?? '';
  return `${get('year')}-${get('month')}-${get('day')}`;
}

/** An issue stays current through the end date, Vancouver time. */
export function isIssueCurrent(endDate, today) {
  return today <= endDate;
}

export function pickLatest(issues) {
  return [...issues].sort((a, b) => {
    if (a.startDate !== b.startDate) return a.startDate < b.startDate ? 1 : -1;
    if (a.endDate !== b.endDate) return a.endDate < b.endDate ? 1 : -1;
    return 0;
  })[0] ?? null;
}

/** Past issues other than the one shown in full on /weekend. */
export function pickArchive(issues, today) {
  const latest = pickLatest(issues);
  return [...issues]
    .filter((issue) => issue.slug !== latest?.slug && issue.endDate < today)
    .sort((a, b) => (a.startDate < b.startDate ? 1 : -1));
}

export function formatWeekendRange(start, end) {
  const [sy, sm, sd] = start.split('-').map(Number);
  const [ey, em, ed] = end.split('-').map(Number);
  if (sy === ey && sm === em) return `${MONTHS[sm]} ${sd}–${ed}, ${sy}`;
  if (sy === ey) return `${MONTHS[sm]} ${sd}–${MONTHS[em]} ${ed}, ${sy}`;
  return `${MONTHS[sm]} ${sd}, ${sy}–${MONTHS[em]} ${ed}, ${ey}`;
}

export function formatUpdated(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return `Updated ${iso}`;
  const datePart = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Vancouver',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
  if (!String(iso).includes('T')) return `Updated ${datePart}`;
  const timePart = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Vancouver',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
  return `Updated ${datePart}, ${timePart} PT`;
}

export function findIssueViolations(text) {
  const violations = [];
  if (
    text.includes('\u2014')
    || text.includes('\\u2014')
    || /&mdash;|&#8212;|&#x2014;/i.test(text)
  ) {
    violations.push('em dash');
  }
  if (/cheakamus/i.test(text)) violations.push('Cheakamus');
  if (text.includes('{{')) violations.push('{{');
  if (text.replace(/\D/g, '').includes('7787702931')) violations.push('phone');
  return violations;
}

export function assertIssueTextClean(text, label) {
  const hits = findIssueViolations(text);
  if (hits.length > 0) {
    throw new Error(`${label} contains forbidden text: ${hits.join(', ')}`);
  }
}

function fail(message) {
  throw new Error(message);
}

function assertObject(value, label) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    fail(`${label} must be an object.`);
  }
}

function assertExactKeys(value, keys, label) {
  assertObject(value, label);
  for (const key of Object.keys(value)) {
    if (!keys.includes(key)) fail(`${label} has unknown field "${key}".`);
  }
  for (const key of keys) {
    if (!(key in value)) fail(`${label} is missing ${key}.`);
  }
}

function assertText(value, label) {
  if (typeof value !== 'string' || value.trim() === '') fail(`${label} must be text.`);
}

function assertStringList(value, label) {
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string' || item.trim() === '')) {
    fail(`${label} must be a list of text.`);
  }
}

function assertIsoDate(value, label) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    fail(`${label} must be YYYY-MM-DD.`);
  }
}

function assertEntry(entry, label) {
  assertObject(entry, label);
  const allowed = [...ENTRY_REQUIRED, ...ENTRY_OPTIONAL];
  for (const key of Object.keys(entry)) {
    if (!allowed.includes(key)) fail(`${label} has unknown field "${key}".`);
  }
  for (const key of ENTRY_REQUIRED) {
    if (!(key in entry)) fail(`${label} is missing ${key}.`);
  }
  assertText(entry.time, `${label} time`);
  if (entry.timeTone !== 'clock' && entry.timeTone !== 'span') {
    fail(`${label} timeTone must be clock or span.`);
  }
  assertText(entry.name, `${label} name`);
  assertText(entry.venue, `${label} venue`);
  assertText(entry.blurb, `${label} blurb`);
  if ('timeNote' in entry) assertText(entry.timeNote, `${label} timeNote`);
  if ('badges' in entry) assertStringList(entry.badges, `${label} badges`);
  if ('warnings' in entry) assertStringList(entry.warnings, `${label} warnings`);
  if (!Array.isArray(entry.sources) || entry.sources.length === 0) {
    fail(`${label} needs at least one source.`);
  }
  for (const source of entry.sources) {
    assertExactKeys(source, SOURCE_KEYS, `${label} source`);
    assertText(source.label, `${label} source label`);
    assertText(source.href, `${label} source href`);
    if (!/^https?:\/\//i.test(source.href)) fail(`${label} source href must be an http(s) URL.`);
  }
  if ('photo' in entry) {
    assertExactKeys(entry.photo, PHOTO_KEYS, `${label} photo`);
    assertText(entry.photo.src, `${label} photo src`);
    assertText(entry.photo.alt, `${label} photo alt`);
    if (typeof entry.photo.credit !== 'string' || entry.photo.credit.trim() === '') {
      fail(`${label} photo.credit is required.`);
    }
  }
}

export function validateIssue(issue, filename = 'issue') {
  assertExactKeys(issue, ISSUE_KEYS, filename);
  assertIsoDate(issue.slug, `${filename} slug`);
  assertIsoDate(issue.startDate, `${filename} startDate`);
  assertIsoDate(issue.endDate, `${filename} endDate`);
  if (issue.slug !== issue.startDate) fail(`${filename} slug must match startDate.`);
  if (filename.endsWith('.json') && filename !== `${issue.slug}.json`) {
    fail(`${filename} must be named ${issue.slug}.json.`);
  }
  if (issue.endDate < issue.startDate) fail(`${filename} endDate is before startDate.`);
  if (Number.isNaN(new Date(issue.updated).getTime())) fail(`${filename} updated is not a date.`);
  assertText(issue.title, `${filename} title`);
  assertText(issue.description, `${filename} description`);
  assertText(issue.masthead, `${filename} masthead`);
  assertText(issue.intro, `${filename} intro`);
  assertStringList(issue.notes, `${filename} notes`);
  if (issue.notes.length === 0) fail(`${filename} notes are empty.`);
  if (!Array.isArray(issue.days) || issue.days.length === 0) fail(`${filename} has no days.`);

  for (const day of issue.days) {
    assertExactKeys(day, DAY_KEYS, `${filename} day`);
    assertText(day.heading, `${filename} day heading`);
    if (typeof day.countLabel !== 'string' || !/^\d+\s+happenings$/.test(day.countLabel)) {
      fail(`${day.heading || filename} countLabel must look like "12 happenings".`);
    }
    if (!Array.isArray(day.towns) || day.towns.length === 0) fail(`${day.heading} has no towns.`);
    let count = 0;
    for (const town of day.towns) {
      assertExactKeys(town, TOWN_KEYS, `${day.heading} town`);
      assertText(town.name, `${day.heading} town name`);
      if (!Array.isArray(town.entries) || town.entries.length === 0) {
        fail(`${day.heading} / ${town.name} has no events.`);
      }
      town.entries.forEach((entry, index) => assertEntry(entry, `${day.heading} / ${town.name} / ${index + 1}`));
      count += town.entries.length;
    }
    const expected = Number(day.countLabel.split(/\s+/)[0]);
    if (count !== expected) {
      fail(`${day.heading} says ${day.countLabel} but has ${count} events.`);
    }
  }

  assertIssueTextClean(JSON.stringify(issue), filename);
  return issue;
}
