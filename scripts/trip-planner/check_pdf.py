#!/usr/bin/env python3
"""Check the built trip planner PDF and the generator source against the house rules.

Usage:
    python3 scripts/trip-planner/check_pdf.py [path/to/sea-to-sky-trip-planner.pdf]

Needs pypdf and the poppler tools pdftotext and pdfinfo. Exits non-zero if any check fails.
"""
import glob
import json
import os
import re
import subprocess
import sys
from urllib.parse import urlparse

from pypdf import PdfReader

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import content as C  # noqa: E402

DEFAULT_PDF = os.path.normpath(os.path.join(HERE, "..", "..", "public", "downloads", "sea-to-sky-trip-planner.pdf"))
SNAPSHOT = os.path.join(HERE, "data", "listings-snapshot.json")
AFFILIATE = "https://canadiancoastal.com/a/best/sailing-tours"
DISCLOSURE = "We may earn a commission if you book through these links."

results = []


def check(name, ok, detail=""):
    results.append((name, ok))
    print("[%s] %s" % ("PASS" if ok else "FAIL", name))
    if detail:
        for line in detail.rstrip().splitlines():
            print("       " + line)


def pdftotext(pdf, *args):
    return subprocess.run(["pdftotext", *args, pdf, "-"], check=True, capture_output=True, text=True).stdout


def main():
    pdf = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_PDF
    snap = json.load(open(SNAPSHOT, encoding="utf-8"))
    listings = {r["slug"]: r for r in snap["listings"]}
    raw = pdftotext(pdf, "-raw")
    layout = pdftotext(pdf, "-layout")
    text = raw + "\n" + layout
    reader = PdfReader(pdf)
    meta = reader.metadata or {}
    meta_text = " ".join(str(v) for v in meta.values())
    links = []
    for i, page in enumerate(reader.pages, 1):
        for a in page.get("/Annots") or []:
            a = a.get_object()
            if a.get("/Subtype") == "/Link":
                uri = a.get("/A", {}).get("/URI")
                links.append((i, str(uri), [float(x) for x in a["/Rect"]]))
    sources = sorted(glob.glob(os.path.join(HERE, "*.py")) + glob.glob(os.path.join(HERE, "*.md"))
                     + glob.glob(os.path.join(HERE, "*.txt")) + glob.glob(os.path.join(HERE, "data", "*")))
    src = {p: open(p, encoding="utf-8").read() for p in sources}
    everything = {"pdf text": text, "pdf metadata": meta_text, "pdf link URIs": "\n".join(u for _, u, _ in links)}
    everything.update({os.path.relpath(p, HERE): s for p, s in src.items()})

    # 1. dashes
    # Literal dash characters are banned everywhere (PDF, metadata, links, source, data, docs). The code
    # only names them as \\u escapes, so any literal hit is real. Spaced or doubled hyphens used as a dash
    # are checked in the PDF text only (code has "a - b" maths and SQL has "--" comments).
    dash_chars = re.compile("[\u2012\u2013\u2014\u2015\u2e3a\u2e3b]")
    fake_dash = re.compile(r"\w\s+-{1,2}\s+\w|\w--\w|\s--\s")
    hits = []
    for where, s in everything.items():
        for m in dash_chars.finditer(s):
            hits.append("%s: %r" % (where, s[max(0, m.start() - 20):m.end() + 20]))
    for m in fake_dash.finditer(raw + "\n" + layout.replace("  ", "\t")):
        hits.append("pdf text (hyphen used as dash): %r" % raw[max(0, m.start() - 20):m.end() + 20])
    check("1. No em dashes or en dashes anywhere; no spaced or double hyphen used as a dash in the PDF", not hits,
          "\n".join(hits[:20]) + ("\n" if hits else "") + "scanned: %s" % ", ".join(everything))

    # 2. Cheakamus Centre
    cc = re.compile(r"cheakamus\W*(centre|center)|cheakamuscentre", re.I)
    hits = ["%s: %r" % (w, m.group(0)) for w, s in everything.items() if w not in ("check_pdf.py", "build_trip_planner.py")
            for m in cc.finditer(s)]
    plain = sorted(set(re.findall(r"Cheakamus \w+", text)))
    check("2. Cheakamus Centre does not appear (PDF text, metadata, links, data, docs)", not hits,
          "\n".join(hits) + ("\ninfo: other 'Cheakamus' words in PDF (trail names, allowed): %s" % plain if plain else ""))

    # 3. blocked phone number in any format
    hits = []
    for w, s in everything.items():
        if w in ("check_pdf.py", "build_trip_planner.py"):
            continue
        if "7787702931" in re.sub(r"\D", "", s):
            hits.append(w + ": digits 7787702931 present")
        for m in re.finditer(r"\(?778\)?[\s.\-]*770[\s.\-]*2931", s):
            hits.append("%s: %r" % (w, m.group(0)))
    check("3. Phone 778-770-2931 absent in every format (digits-only scan too)", not hits, "\n".join(hits))

    # 4. Locavore and Sunwolf
    loc = "Locavore" in raw
    sun = "Sunwolf" in raw
    st = ", ".join("%s=%s" % (s, listings[s]["status"]) for s in C.MUST_KEEP)
    check("4. Locavore and Sunwolf both present", loc and sun, "Locavore in text: %s; Sunwolf in text: %s; Supabase: %s" % (loc, sun, st))

    # 5. edition label
    years = re.findall(r"\b(?:19|20)\d{2}(?:\s*[-/]\s*\d{2,4})?\b", text + " " + meta_text)
    bad = sorted({y for y in years if y.replace(" ", "") != "2026-27"})
    check("5. '2026-27' label present and no other year label", "2026-27" in raw and not bad,
          "years found: %s\nstale: %s\ntitle metadata: %s" % (sorted(set(years)), bad or "none", meta.get("/Title")))

    # 6. Canadian Coastal line and its link
    line = C.CANADIAN_COASTAL_LINE
    target = "%s/play/canadian-coastal-sailing-squamish" % C.SITE
    on_one_line = line in raw.splitlines()
    page_of_line = next((i for i, p in enumerate(reader.pages, 1) if line in (p.extract_text() or "").replace("\n", " ")), None)
    bbox = pdftotext(pdf, "-bbox", "-f", str(page_of_line or 1), "-l", str(page_of_line or 1))
    m = re.search(r'<word xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">Canadian</word>', bbox)
    page_h = float(reader.pages[(page_of_line or 1) - 1].mediabox.height)
    covering = []
    if m:
        x0, y0, x1, y1 = map(float, m.groups())
        ybot, ytop = page_h - y1, page_h - y0
        for pg, uri, r in links:
            if pg == page_of_line and r[0] <= x0 + 1 and r[2] >= x1 - 1 and r[1] <= ybot + 2 and r[3] >= ytop - 2:
                covering.append(uri)
    cc_links = [(pg, u) for pg, u, _ in links if "canadian-coastal" in u or "canadiancoastal" in u]
    affiliate_used = AFFILIATE in text or any(AFFILIATE in u for _, u, _ in links)
    ok6 = on_one_line and covering == [target] and cc_links == [(page_of_line, target)] and (not affiliate_used or DISCLOSURE in raw)
    check("6. Canadian Coastal line verbatim, linked to the listing page (not the affiliate link)", ok6,
          "verbatim on one extracted line: %s (page %s)\nlink annotation covering the line: %s\nall Canadian Coastal links: %s\n"
          "affiliate link used: %s (disclosure needed only if used)" % (on_one_line, page_of_line, covering, cc_links, affiliate_used))

    # 7. every link is https bestseatosky.com (to a real page) or a Supabase listing website
    sites = {r["website"] for r in snap["listings"] if r.get("website")}
    pages = snap["site_pages"]
    good_paths = set(pages["static"]) | {"/guide/" + s for s in pages["guide"]} | {"/blog/" + s for s in pages["blog"]}
    good_paths |= {"/%s/%s" % (r["category"], r["slug"]) for r in snap["listings"] if r["status"] == "published"}
    bad = []
    for pg, uri, _ in links:
        u = urlparse(uri)
        if u.scheme != "https":
            bad.append("p%d not https: %s" % (pg, uri))
        elif u.netloc == "bestseatosky.com":
            if (u.path or "/") not in good_paths:
                bad.append("p%d unknown bestseatosky.com page: %s" % (pg, uri))
        elif uri not in sites:
            bad.append("p%d not a Supabase listing website: %s" % (pg, uri))
    external = sorted({u for _, u, _ in links if urlparse(u).netloc != "bestseatosky.com"})
    check("7. All %d links are https bestseatosky.com pages that exist, or Supabase listing websites" % len(links), not bad,
          "\n".join(bad) + "\nnon-bestseatosky links: %s" % (external or "none"))

    # 8. claims scan (report every hit; only allowed contexts may remain)
    claim_rx = re.compile(r"\b(best|premier|only|ultimate|#1|number one|top[- ]rated|award\w*|legendary|world[- ]class|"
                          r"famous|iconic|institution|since \d{4}|years in business|largest|most \w+ed|renowned)\b", re.I)
    allowed = [r"Best Sea to Sky", r"Best (Restaurants|Hikes|Hotels|Breweries|Skiing) in \w+", r"Most impressive in spring",
               r"most trailheads", r"Most hiking trails",
               r"bestseatosky\.com/guide/best-[a-z-]+$"]
    flagged, okhits = [], []
    for ln in raw.splitlines():
        for m in claim_rx.finditer(ln):
            if any(re.search(a, ln) for a in allowed):
                okhits.append(ln.strip())
            else:
                flagged.append(ln.strip())
    check("8. No unverifiable claims (rankings, superlatives, years in business)", not flagged,
          "flagged: %s\nallowed (brand name, site guide titles, plain uses of 'most'): %d lines, e.g. %s"
          % (flagged or "none", len(okhits), sorted(set(okhits))[:6]))

    # 9. size and pages
    n = len(reader.pages)
    size = os.path.getsize(pdf)
    check("9. Page count and size sensible", 12 <= n <= 24 and 20_000 <= size <= 2_000_000, "pages=%d size=%d bytes" % (n, size))

    print("\n%d/%d checks passed" % (sum(ok for _, ok in results), len(results)))
    return 0 if all(ok for _, ok in results) else 1


if __name__ == "__main__":
    sys.exit(main())
