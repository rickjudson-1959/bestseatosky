/**
 * Turn Mark's sent weekend-list HTML into src/data/weekend/<start>.json.
 *
 * The email subject is not inside the HTML file. Pass it with --title.
 * --updated is the send time, shown as the Updated line (include the offset).
 *
 *   node scripts/weekend-issue-from-html.mjs \
 *     --html ./issue.html \
 *     --title "Email subject line" \
 *     --start 2026-11-06 \
 *     --end 2026-11-08 \
 *     --updated 2026-11-04T13:38:00-07:00
 *
 * Strips the Brevo unsubscribe link, email table chrome, and the Google Fonts
 * tag. Drops ?ref=eventlist-bluebar on allevents.in links. Keeps en dashes.
 */

import fs from 'node:fs';
import path from 'node:path';

const NAMED_ENTITIES = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: '\u00a0',
  ndash: '\u2013',
  mdash: '\u2014',
  rsquo: '\u2019',
  lsquo: '\u2018',
  rdquo: '\u201d',
  ldquo: '\u201c',
  sbquo: '\u201a',
  hellip: '\u2026',
  middot: '\u00b7',
  times: '\u00d7',
  bull: '\u2022',
  copy: '\u00a9',
  reg: '\u00ae',
  trade: '\u2122',
  eacute: '\u00e9',
  Eacute: '\u00c9',
  egrave: '\u00e8',
  Egrave: '\u00c8',
  ecirc: '\u00ea',
  euml: '\u00eb',
  aacute: '\u00e1',
  agrave: '\u00e0',
  acirc: '\u00e2',
  auml: '\u00e4',
  oacute: '\u00f3',
  ograve: '\u00f2',
  ocirc: '\u00f4',
  ouml: '\u00f6',
  uacute: '\u00fa',
  ugrave: '\u00f9',
  ucirc: '\u00fb',
  uuml: '\u00fc',
  iacute: '\u00ed',
  igrave: '\u00ec',
  icirc: '\u00ee',
  iuml: '\u00ef',
  ccedil: '\u00e7',
  Ccedil: '\u00c7',
  ntilde: '\u00f1',
  Ntilde: '\u00d1',
};

function decode(html) {
  return html
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, num) => String.fromCodePoint(Number(num)))
    .replace(/&([a-zA-Z]+);/g, (full, name) => {
      if (!Object.prototype.hasOwnProperty.call(NAMED_ENTITIES, name)) {
        throw new Error(`Unknown HTML entity &${name}; Add it to the converter or replace it in the HTML.`);
      }
      return NAMED_ENTITIES[name];
    });
}

function textOf(html) {
  return decode(html.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, ''))
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanHref(href) {
  const decoded = decode(href);
  let url;
  try {
    url = new URL(decoded);
  } catch {
    return decoded;
  }
  const host = url.hostname.toLowerCase();
  const isAllevents = host === 'allevents.in' || host.endsWith('.allevents.in');
  if (isAllevents && url.searchParams.get('ref') === 'eventlist-bluebar') {
    url.searchParams.delete('ref');
    return url.toString();
  }
  return decoded;
}

function parseCard(tableHtml) {
  const tdMatch = tableHtml.match(/<td[^>]*>([\s\S]*)<\/td>\s*<\/tr>\s*<\/table>\s*$/);
  if (!tdMatch) throw new Error('Event card is missing its cell.');
  const td = tdMatch[1];
  const firstDiv = td.search(/<div/);
  if (firstDiv === -1) throw new Error('Event card is missing its text.');
  const head = td.slice(0, firstDiv);
  const spans = [...head.matchAll(/<span style="([^"]*)">([\s\S]*?)<\/span>/g)];
  if (spans.length === 0) throw new Error('Event card is missing a time.');

  const time = textOf(spans[0][2]);
  const timeTone = spans[0][1].includes('#c26716') ? 'span' : 'clock';
  const timeNote = spans.length > 1 ? textOf(spans[1][2]) : '';

  let name = '';
  let venue = '';
  let blurb = '';
  const badges = [];
  const warnings = [];
  const sources = [];

  for (const div of td.matchAll(/<div style="([^"]*)">([\s\S]*?)<\/div>/g)) {
    const style = div[1];
    const inner = div[2];
    if (style.includes('font-size:16px')) name = textOf(inner);
    else if (style.includes('font-size:13px')) venue = textOf(inner);
    else if (style.includes('font-size:14px')) blurb = textOf(inner);
    else if (style.includes('margin-top:8px')) {
      for (const badge of inner.matchAll(/<span style="([^"]*)">([\s\S]*?)<\/span>/g)) {
        const label = textOf(badge[2]);
        if (!label) continue;
        if (badge[1].includes('#f7e8d3') || /unconfirmed/i.test(label)) warnings.push(label);
        else badges.push(label);
      }
    } else if (style.includes('dashed') || /Source:/.test(inner)) {
      for (const link of inner.matchAll(/<a href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
        sources.push({ label: textOf(link[2]), href: cleanHref(link[1]) });
      }
    }
  }

  if (!name || !venue || !blurb || sources.length === 0) {
    throw new Error(`Incomplete event card${name ? `: ${name}` : ''}.`);
  }

  const entry = { time, timeTone, name, venue, blurb, sources };
  if (timeNote) entry.timeNote = timeNote;
  if (badges.length) entry.badges = badges;
  if (warnings.length) entry.warnings = warnings;
  return entry;
}

function parseDayHeading(inner) {
  const span = inner.match(/<span[^>]*>([\s\S]*?)<\/span>/);
  const heading = textOf(span ? inner.slice(0, span.index) : inner);
  const countLabel = span ? textOf(span[1]) : '';
  if (!heading || !/^\d+\s+happenings$/.test(countLabel)) {
    throw new Error(`Day heading is missing its happenings count: ${heading || inner}`);
  }
  return { heading, countLabel };
}

export function parseWeekendHtml(html, meta) {
  if (html.includes('{{')) {
    const withoutUnsubscribe = html.replace(/\{\{\s*unsubscribe\s*\}\}/gi, '');
    if (withoutUnsubscribe.includes('{{')) {
      throw new Error('HTML still has a {{ merge tag that is not the unsubscribe link.');
    }
  }

  const mastheadMatch = html.match(/<td style="background-color:#17422e[^"]*">([\s\S]*?)<\/td>/);
  if (!mastheadMatch) throw new Error('Masthead block not found.');
  const mastheadDivs = [...mastheadMatch[1].matchAll(/<div[^>]*>([\s\S]*?)<\/div>/g)];
  if (mastheadDivs.length < 2) throw new Error('Masthead is missing its title or intro.');
  const masthead = textOf(mastheadDivs[0][1]);
  const intro = textOf(mastheadDivs[1][1]);

  const footerMatch = html.match(/<!-- Footer -->([\s\S]*?)<\/tr>/);
  if (!footerMatch) throw new Error('Footer notes not found.');
  const footerHtml = footerMatch[1].replace(
    /\s*(?:&middot;|·|\u00b7)\s*<a href="\{\{\s*unsubscribe\s*\}\}"[\s\S]*?<\/a>/i,
    '',
  );
  const notes = [...footerHtml.matchAll(/<div[^>]*>([\s\S]*?)<\/div>/g)]
    .map((div) => textOf(div[1]))
    .filter((note) => note && !/bestseatosky\.com/i.test(note));
  if (notes.length === 0) throw new Error('Footer notes were empty after dropping the email signature.');

  const markers = [];
  for (const match of html.matchAll(/<div style="[^"]*font-size:22px[^"]*">([\s\S]*?)<\/div>/g)) {
    markers.push({ type: 'day', index: match.index, inner: match[1] });
  }
  for (const match of html.matchAll(/<div style="[^"]*text-transform:uppercase[^"]*">([\s\S]*?)<\/div>/g)) {
    markers.push({ type: 'town', index: match.index, inner: match[1] });
  }
  for (const match of html.matchAll(/<table role="presentation"[^>]*border-radius:14px[^>]*>[\s\S]*?<\/table>/g)) {
    markers.push({ type: 'card', index: match.index, html: match[0] });
  }
  markers.sort((a, b) => a.index - b.index);

  const days = [];
  let day = null;
  let town = null;
  for (const marker of markers) {
    if (marker.type === 'day') {
      const parsed = parseDayHeading(marker.inner);
      day = { ...parsed, towns: [] };
      days.push(day);
      town = null;
    } else if (marker.type === 'town') {
      if (!day) throw new Error(`Town "${textOf(marker.inner)}" appears before a day heading.`);
      town = { name: textOf(marker.inner), entries: [] };
      day.towns.push(town);
    } else if (!town) {
      throw new Error('An event card appears before its town heading.');
    } else {
      town.entries.push(parseCard(marker.html));
    }
  }

  if (days.length === 0) throw new Error('No day sections found.');
  for (const section of days) {
    const expected = Number(section.countLabel.split(/\s+/)[0]);
    const actual = section.towns.reduce((sum, item) => sum + item.entries.length, 0);
    if (actual !== expected) {
      throw new Error(`${section.heading} says ${section.countLabel} but ${actual} events were parsed.`);
    }
    if (section.towns.length === 0) throw new Error(`${section.heading} has no towns.`);
  }

  const issue = {
    slug: meta.start,
    title: meta.title,
    description: intro,
    masthead,
    startDate: meta.start,
    endDate: meta.end,
    updated: meta.updated,
    intro,
    days,
    notes,
  };

  const serialized = JSON.stringify(issue);
  if (serialized.includes('{{')) throw new Error('Converted issue still contains {{.');
  if (serialized.includes('eventlist-bluebar')) {
    throw new Error('Converted issue still contains an allevents ref=eventlist-bluebar link.');
  }
  if (serialized.includes('\u2014')) throw new Error('Converted issue contains an em dash.');
  return issue;
}

function arg(name) {
  const index = process.argv.indexOf(name);
  if (index === -1) return '';
  return process.argv[index + 1] || '';
}

function requireDate(value, flag) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(`${flag} must be YYYY-MM-DD.`);
  }
  return value;
}

function main() {
  const htmlPath = arg('--html');
  const title = arg('--title').trim();
  const start = requireDate(arg('--start'), '--start');
  const end = requireDate(arg('--end'), '--end');
  const updated = arg('--updated').trim();
  const outFlag = arg('--out');

  if (!htmlPath) throw new Error('Pass --html path/to/issue.html');
  if (!title) throw new Error('Pass --title with the email subject. It is not inside the HTML file.');
  if (end < start) throw new Error('--end is before --start.');
  if (!updated || Number.isNaN(new Date(updated).getTime())) {
    throw new Error('--updated must be a date or time the Updated line can format, such as 2026-11-04T13:38:00-07:00.');
  }

  const html = fs.readFileSync(htmlPath, 'utf8');
  const issue = parseWeekendHtml(html, { title, start, end, updated });
  const outPath = outFlag || path.join('src/data/weekend', `${start}.json`);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, `${JSON.stringify(issue, null, 2)}\n`);

  const warnings = issue.days.flatMap((day) => day.towns.flatMap((town) => town.entries.flatMap((entry) => entry.warnings || [])));
  const events = issue.days.reduce(
    (sum, day) => sum + day.towns.reduce((townSum, town) => townSum + town.entries.length, 0),
    0,
  );
  console.log(`Wrote ${outPath}`);
  console.log(`${issue.days.length} days, ${events} events, ${warnings.length} unconfirmed warnings`);
  for (const warning of warnings) console.log(`  - ${warning}`);
}

const invokedDirectly = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname);
if (invokedDirectly) {
  try {
    main();
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}
