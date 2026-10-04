#!/usr/bin/env node
/*
 * scrape-loc.js — pull every theory from the Landscape of Consciousness
 * (https://loc.closertotruth.com) into data/loc-theories.json.
 *
 * The LOC pages are Next.js pages whose structured CMS data (title,
 * category, key takeaways, verification status, theorists, …) is embedded
 * in the streamed page payload. This script reads that payload straight
 * from the public pages — no invented content, no quiz data, nothing
 * added beyond the pull dates.
 *
 * Usage:  node tools/scrape-loc.js
 * Output: data/loc-theories.json (overwritten)
 */
'use strict';

const fs = require('fs');
const path = require('path');

const SITE = 'https://loc.closertotruth.com';
const OUT = path.join(__dirname, '..', 'data', 'loc-theories.json');
const CONCURRENCY = 6;

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'consciousness-map LOC pull (personal research)' }
  });
  if (!res.ok) throw new Error('HTTP ' + res.status + ' for ' + url);
  return res.text();
}

/* Collect the slugs of every /theory/<slug> page: sitemap + homepage links. */
async function collectSlugs() {
  const slugs = new Set();
  const sitemap = await fetchText(SITE + '/sitemap.xml');
  for (const m of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const mm = m[1].match(/\/theory\/([^/?#]+)/);
    if (mm) slugs.add(decodeURIComponent(mm[1]));
  }
  const home = await fetchText(SITE + '/');
  for (const m of home.matchAll(/href="\/theory\/([^"?#]+)"/g)) {
    slugs.add(decodeURIComponent(m[1]));
  }
  return [...slugs].sort();
}

/* Join the streamed Next.js payload chunks into one searchable text,
 * plus a map of Flight row ids. Values in the payload can be "$<id>"
 * references to a row elsewhere in the stream (long text is often
 * shipped as its own `T<len>,<text>` blob row); entry fields must be
 * resolved through this map or they come out as literal "$1d". */
function payloadText(html) {
  const parts = [];
  const re = /self\.__next_f\.push\(\[1,("(?:[^"\\]|\\.)*")\]\)/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    try { parts.push(JSON.parse(m[1])); } catch (e) { /* skip bad chunk */ }
  }
  const text = parts.join('\n');
  const rows = {};
  const rowRe = /(?:^|\n)([0-9a-f]+):/g;
  const starts = [];
  while ((m = rowRe.exec(text)) !== null) {
    starts.push({ id: m[1], contentStart: rowRe.lastIndex, end: m.index });
  }
  for (let i = 0; i < starts.length; i++) {
    const s = starts[i];
    const limit = i + 1 < starts.length ? starts[i + 1].end : text.length;
    let raw = text.slice(s.contentStart, limit).replace(/\n$/, '');
    const tm = raw.match(/^T([0-9a-f]+),/i);
    if (tm) {
      /* Flight text rows declare their length in hex BYTES. */
      const bytes = Buffer.from(raw, 'utf8');
      const head = tm[0].length;
      raw = bytes.slice(head, head + parseInt(tm[1], 16)).toString('utf8');
    }
    rows[s.id] = raw;
  }
  return { text, rows };
}

function resolveRefs(value, rows) {
  if (typeof value === 'string') {
    const m = value.match(/^\$([0-9a-f]+)$/);
    if (m && Object.prototype.hasOwnProperty.call(rows, m[1])) {
      const raw = rows[m[1]];
      try { return JSON.parse(raw); } catch (e) { return raw; }
    }
    return value;
  }
  if (Array.isArray(value)) return value.map(v => resolveRefs(v, rows));
  if (value && typeof value === 'object') {
    const out = {};
    for (const k of Object.keys(value)) out[k] = resolveRefs(value[k], rows);
    return out;
  }
  return value;
}

/* Index of the '{' that opens the object containing position `idx`. */
function enclosingStart(text, idx) {
  let depth = 0;
  for (let i = idx; i >= 0; i--) {
    const c = text[i];
    if (c === '}') depth++;
    else if (c === '{') {
      if (depth === 0) return i;
      depth--;
    }
  }
  return -1;
}

/* Index of the '}' closing the object that starts at `start`. */
function objectEnd(text, start) {
  let depth = 0;
  let inStr = false;
  let esc = false;
  for (let i = start; i < text.length; i++) {
    const c = text[i];
    if (inStr) {
      if (esc) esc = false;
      else if (c === '\\') esc = true;
      else if (c === '"') inStr = false;
    } else if (c === '"') inStr = true;
    else if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function extractTheory(html) {
  const { text, rows } = payloadText(html);
  const idx = text.indexOf('"verificationStatus"');
  if (idx === -1) return null;
  const start = enclosingStart(text, idx);
  const end = objectEnd(text, start);
  if (start === -1 || end === -1) return null;
  return resolveRefs(JSON.parse(text.slice(start, end + 1)), rows);
}

function slugOf(ref) {
  return ref && ref.slug ? ref.slug.current : null;
}

function clean(str) {
  return typeof str === 'string' ? str.replace(/\s+/g, ' ').trim() : null;
}

function toEntry(t, pulledAt) {
  const slug = slugOf(t);
  const shortcode = clean(t.shortcode);
  return {
    name: clean(t.title),
    slug: slug,
    url: SITE + '/theory/' + slug,
    kind: shortcode === 'Overview' ? 'overview' : 'theory',
    category: t.category ? clean(t.category.name) : null,
    categorySlug: slugOf(t.category),
    subcategory: t.subCategory ? clean(t.subCategory.name) : null,
    subcategorySlug: slugOf(t.subCategory),
    shortcode: shortcode,
    summary: clean(t.summary),
    claims: (t.keyTakeaways || []).map(k => ({
      title: clean(k.title),
      text: clean(k.description)
    })),
    theorists: (t.multipleTheorists || []).map(p => ({
      name: clean(p.name),
      role: clean(p.title),
      verified: p.verified === true
    })),
    verified: t.verificationStatus === 'verified',
    verificationStatus: t.verificationStatus || null,
    verifiedAt: t.verifiedAt || null,
    verifiedBy: t.verifiedBy || null,
    publicationDate: t.publicationDate || null,
    externalUrl: t.externalLink || null,
    sourceUpdatedAt: t._updatedAt || null,
    pulledAt: pulledAt
  };
}

async function main() {
  const now = new Date();
  const pulledDate = now.toISOString().slice(0, 10);
  const slugs = await collectSlugs();
  console.log('Found ' + slugs.length + ' theory pages to pull.');

  const entries = [];
  const failures = [];
  let done = 0;

  async function worker(queue) {
    while (queue.length) {
      const slug = queue.shift();
      try {
        const html = await fetchText(SITE + '/theory/' + encodeURIComponent(slug));
        const t = extractTheory(html);
        if (!t) throw new Error('no theory data in page payload');
        entries.push(toEntry(t, pulledDate));
      } catch (e) {
        failures.push(slug + ': ' + e.message);
      }
      done++;
      if (done % 50 === 0) console.log('  ' + done + '/' + slugs.length);
    }
  }

  const queue = slugs.slice();
  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker(queue)));

  const missing = failures
    .filter(f => f.indexOf('HTTP 404') !== -1)
    .map(f => f.split(': ')[0]);
  missing.sort();

  entries.sort((a, b) =>
    (a.category || '').localeCompare(b.category || '') ||
    (a.subcategory || '').localeCompare(b.subcategory || '') ||
    (a.name || '').localeCompare(b.name || ''));

  const out = {
    description: 'Every theory listed on the Landscape of Consciousness ' +
      '(loc.closertotruth.com), pulled verbatim from the structured data on ' +
      'each theory page: name, category, subcategory, summary, the page\'s ' +
      'key takeaways (its claims), theorists, and LOC verification status. ' +
      'No quiz content and no categorisation of our own — see README.md.',
    source: SITE,
    lastPull: now.toISOString(),
    count: entries.length,
    unavailable: missing.map(slug => ({
      slug: slug,
      url: SITE + '/theory/' + slug,
      note: 'Linked from the LOC sitemap/homepage but the page returned 404 at pull time.',
      pulledAt: pulledDate
    })),
    theories: entries
  };
  fs.writeFileSync(OUT, JSON.stringify(out, null, 2) + '\n');
  console.log('Wrote ' + entries.length + ' entries to ' + path.relative(process.cwd(), OUT));
  if (failures.length) {
    console.log('FAILURES (' + failures.length + '):');
    failures.forEach(f => console.log('  ' + f));
    process.exitCode = 1;
  }
}

main().catch(e => { console.error(e); process.exit(1); });
