#!/usr/bin/env python3
"""Build the Best Sea to Sky trip planner PDF (2026-27 edition, v3).

Reads listing data from data/listings-snapshot.json (a read-only export of the
Supabase listings table) and copy from content.py, then writes the PDF.

Usage (from the repo root):
    python3 scripts/trip-planner/build_trip_planner.py
    python3 scripts/trip-planner/build_trip_planner.py --out /tmp/planner.pdf

The output is deterministic: the same inputs give a byte-identical PDF.
"""
import argparse
import json
import os
import re
import sys
from xml.sax.saxutils import escape

from reportlab import rl_config

rl_config.invariant = 1  # fixed dates and document IDs for reproducible output

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.platypus import (KeepTogether, PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table,
                                TableStyle)

import content as C

HERE = os.path.dirname(os.path.abspath(__file__))
DEFAULT_DATA = os.path.join(HERE, "data", "listings-snapshot.json")
DEFAULT_OUT = os.path.normpath(os.path.join(HERE, "..", "..", "public", "downloads", "sea-to-sky-trip-planner.pdf"))

GREEN = colors.HexColor("#14805e")
DARK = colors.HexColor("#0f172a")
BODY = colors.HexColor("#334155")
MUTED = colors.HexColor("#64748b")
LINK = colors.HexColor("#1d4ed8")
MINT = colors.HexColor("#ecfdf5")
RULE = colors.HexColor("#cbd5e1")
TIPBG = colors.HexColor("#f0f9ff")

PAGE_W, PAGE_H = letter
MARGIN = 0.75 * inch
FRAME_W = PAGE_W - 2 * MARGIN

# Text that must never appear in the planner (checked before writing).
FORBIDDEN = [
    (re.compile(r"[\u2014\u2013]"), "em dash or en dash"),
    (re.compile(r"cheakamus\W*(centre|center)|cheakamuscentre", re.I), "Cheakamus Centre (owner asked for removal)"),
    (re.compile(r"\(?778\)?[\s.\-]?770[\s.\-]?2931"), "blocked phone number"),
]


class PlannerError(Exception):
    pass


def load_listings(path):
    with open(path, encoding="utf-8") as f:
        data = json.load(f)
    return data, {row["slug"]: row for row in data["listings"]}


class Builder:
    def __init__(self, snapshot, listings):
        self.snapshot = snapshot
        self.listings = listings
        self.used = []
        self.warnings = []
        self.all_text = []
        self.links = []
        s = {}
        s["h1"] = ParagraphStyle("h1", fontName="Helvetica-Bold", fontSize=22, leading=27, textColor=DARK, spaceAfter=6)
        s["h2"] = ParagraphStyle("h2", fontName="Helvetica-Bold", fontSize=14, leading=18, textColor=GREEN,
                                 spaceBefore=12, spaceAfter=6)
        s["h3"] = ParagraphStyle("h3", fontName="Helvetica-Bold", fontSize=11.5, leading=14, textColor=DARK,
                                 spaceBefore=8, spaceAfter=1)
        s["body"] = ParagraphStyle("body", fontName="Helvetica", fontSize=9.5, leading=13, textColor=BODY, spaceAfter=4)
        s["small"] = ParagraphStyle("small", fontName="Helvetica", fontSize=8.5, leading=11, textColor=MUTED)
        s["more"] = ParagraphStyle("more", fontName="Helvetica", fontSize=8.5, leading=11, textColor=GREEN, spaceBefore=3)
        s["cell"] = ParagraphStyle("cell", fontName="Helvetica", fontSize=8.5, leading=11, textColor=BODY)
        s["cellb"] = ParagraphStyle("cellb", fontName="Helvetica-Bold", fontSize=8.5, leading=11, textColor=DARK)
        s["head"] = ParagraphStyle("head", fontName="Helvetica-Bold", fontSize=8.5, leading=11, textColor=DARK)
        s["tip"] = ParagraphStyle("tip", fontName="Helvetica", fontSize=9, leading=12.5, textColor=DARK)
        s["toc"] = ParagraphStyle("toc", fontName="Helvetica", fontSize=11, leading=15, textColor=BODY, spaceAfter=7)
        s["check"] = ParagraphStyle("check", fontName="Helvetica", fontSize=9.5, leading=13, textColor=BODY,
                                    leftIndent=14, firstLineIndent=-14, spaceAfter=2)
        s["activity"] = ParagraphStyle("activity", fontName="Helvetica", fontSize=9.5, leading=13, textColor=BODY,
                                       spaceAfter=4)
        for name, size, lead, col, font in [
            ("c_kicker", 11, 14, GREEN, "Helvetica-Bold"), ("c_t1", 40, 46, DARK, "Helvetica-Bold"),
            ("c_t2", 30, 36, GREEN, "Helvetica-Bold"), ("c_towns", 13, 18, BODY, "Helvetica"),
            ("c_tag", 11, 15, MUTED, "Helvetica"), ("c_site", 16, 20, GREEN, "Helvetica-Bold"),
            ("c_ed", 10, 13, MUTED, "Helvetica"),
        ]:
            s[name] = ParagraphStyle(name, fontName=font, fontSize=size, leading=lead, textColor=col, alignment=TA_CENTER)
        self.s = s

    # ---------- helpers ----------
    def listing(self, slug):
        row = self.listings.get(slug)
        if row is None:
            if slug in C.MUST_KEEP:
                raise PlannerError("must-keep listing %s is missing from the snapshot; re-export it" % slug)
            raise PlannerError("listing %s not found in snapshot" % slug)
        if row["status"] != "published":
            msg = "listing %s has status %r, not published" % (slug, row["status"])
            if slug in C.MUST_KEEP:
                self.warnings.append("KEPT BUT FLAG: " + msg)
            else:
                raise PlannerError(msg)
        if slug not in self.used:
            self.used.append(slug)
        return row

    def listing_url(self, slug):
        row = self.listing(slug)
        return "%s/%s/%s" % (C.SITE, row["category"], row["slug"])

    def a(self, url, text):
        self.links.append(url)
        return '<link href="%s" color="#1d4ed8">%s</link>' % (escape(url, {'"': "&quot;"}), escape(text))

    def rich(self, value, bold_listing=False):
        """Turn a content cell (str, ('listing', slug) or a list of those) into Paragraph markup."""
        if isinstance(value, str):
            self.all_text.append(value)
            return escape(value)
        if isinstance(value, tuple) and value[0] == "listing":
            row = self.listing(value[1])
            self.all_text.append(row["name"])
            m = self.a(self.listing_url(value[1]), row["name"])
            return "<b>%s</b>" % m if bold_listing else m
        if isinstance(value, tuple) and value[0] == "listing_website":
            row = self.listing(value[1])
            return row["website"]
        if isinstance(value, list):
            return "".join(self.rich(v, bold_listing) for v in value)
        raise PlannerError("bad content cell %r" % (value,))

    def p(self, text, style="body"):
        self.all_text.append(text)
        return Paragraph(escape(text), self.s[style])

    def more(self, label, url):
        self.all_text.append(label + url)
        short = url.replace("https://", "")
        return Paragraph(escape(label) + self.a(url, short), self.s["more"])

    def table(self, header, rows, widths, first_bold=True):
        data = []
        if header:
            data.append([Paragraph(escape(h), self.s["head"]) for h in header])
            self.all_text.extend(header)
        for r in rows:
            cells = []
            for i, v in enumerate(r):
                style = "cellb" if (first_bold and i == 0) else "cell"
                cells.append(Paragraph(self.rich(v), self.s[style]))
            data.append(cells)
        t = Table(data, colWidths=widths, hAlign="LEFT")
        ts = [
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("TOPPADDING", (0, 0), (-1, -1), 4),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ("LEFTPADDING", (0, 0), (-1, -1), 6),
            ("LINEBELOW", (0, 0), (-1, -1), 0.5, RULE),
        ]
        if header:
            ts.append(("BACKGROUND", (0, 0), (-1, 0), MINT))
        t.setStyle(TableStyle(ts))
        return t

    def tip(self, text):
        self.all_text.append(text)
        label, _, rest = text.partition(":")
        para = Paragraph("<b>%s:</b>%s" % (escape(label), escape(rest)), self.s["tip"])
        t = Table([[para]], colWidths=[FRAME_W])
        t.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), TIPBG),
            ("LINEBEFORE", (0, 0), (0, -1), 3, GREEN),
            ("TOPPADDING", (0, 0), (-1, -1), 7), ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ("LEFTPADDING", (0, 0), (-1, -1), 9), ("RIGHTPADDING", (0, 0), (-1, -1), 9),
        ]))
        return [Spacer(1, 6), t, Spacer(1, 4)]

    def listing_table(self, kind, rows):
        if kind == "eat":
            header = ["Restaurant", "Known For"]
        else:
            header = ["Option", "Type"]
        body = [[("listing", slug), desc] for slug, desc in rows]
        return self.table(header, body, [FRAME_W * 0.48, FRAME_W * 0.52])

    # ---------- sections ----------
    def cover(self):
        c = C.COVER
        for k in ("kicker", "title_1", "title_2", "towns", "tagline", "edition"):
            self.all_text.append(c[k])
        return [
            Spacer(1, 2.1 * inch),
            Paragraph(escape(c["kicker"].upper()), self.s["c_kicker"]), Spacer(1, 10),
            Paragraph(escape(c["title_1"]), self.s["c_t1"]),
            Paragraph(escape(c["title_2"]), self.s["c_t2"]), Spacer(1, 18),
            Paragraph(escape(c["towns"]), self.s["c_towns"]), Spacer(1, 12),
            Paragraph(escape(c["tagline"]), self.s["c_tag"]), Spacer(1, 1.6 * inch),
            Paragraph(self.a(C.SITE, "bestseatosky.com"), self.s["c_site"]), Spacer(1, 6),
            Paragraph(escape(c["edition"]), self.s["c_ed"]),
            PageBreak(),
        ]

    def toc(self):
        out = [self.p("What's Inside", "h1"), Spacer(1, 10)]
        out += [self.p(line, "toc") for line in C.TOC]
        return out + [PageBreak()]

    def at_a_glance(self):
        out = [self.p("1. At a Glance", "h1"), Spacer(1, 6)]
        out.append(self.table(None, [[k, v] for k, v in C.AT_A_GLANCE], [FRAME_W * 0.25, FRAME_W * 0.75]))
        return out + [PageBreak()]

    def budget(self):
        out = [self.p("2. Budget Breakdown", "h1"), self.p(C.BUDGET_INTRO)]
        out.append(self.p("Accommodation (per night)", "h2"))
        a = C.ACCOMMODATION
        out.append(self.table(a["header"], a["rows"], [FRAME_W * 0.34] + [FRAME_W * 0.22] * 3))
        out.append(self.p("Food & Drink", "h2"))
        out.append(self.table(["Item", "Typical Cost"], [list(r) for r in C.FOOD_DRINK], [FRAME_W * 0.6, FRAME_W * 0.4], False))
        out.append(self.p("Activities & Attractions", "h2"))
        out.append(self.table(["Activity", "Cost"], [list(r) for r in C.ACTIVITIES_COSTS], [FRAME_W * 0.6, FRAME_W * 0.4], False))
        out += self.tip(C.BUDGET_TIP)
        out.append(KeepTogether([self.p("Sample Daily Budgets", "h2"),
                                 self.table(["Style", "Per Person/Day", "Includes"], [list(r) for r in C.DAILY_BUDGETS],
                                            [FRAME_W * 0.22, FRAME_W * 0.22, FRAME_W * 0.56])]))
        return out + [PageBreak()]

    def seasons(self):
        out = [self.p("3. Seasonal Guide", "h1")]
        out += [self.p("Summer (June to September)", "h2"), self.p(C.SUMMER_INTRO)]
        out.append(self.table(["What's On", "Details"], [list(r) for r in C.SUMMER], [FRAME_W * 0.25, FRAME_W * 0.75]))
        out += self.tip(C.SUMMER_TIP)
        out += [self.p("Winter (December to March)", "h2"), self.p(C.WINTER_INTRO)]
        out.append(self.table(["What's On", "Details"], [list(r) for r in C.WINTER], [FRAME_W * 0.25, FRAME_W * 0.75]))
        out += self.tip(C.WINTER_TIP)
        out.append(self.p("Shoulder Seasons", "h2"))
        for label, text in C.SHOULDER:
            self.all_text.append(label + " " + text)
            out.append(Paragraph("<b>%s</b> %s" % (escape(label), escape(text)), self.s["body"]))
        return out + [PageBreak()]

    def highway(self):
        out = [self.p("4. Highway Stops: Vancouver to Pemberton", "h1"), self.p(C.HIGHWAY_INTRO)]
        for slug, where, desc, cost in C.HIGHWAY_STOPS:
            name = self.rich(("listing", slug))
            block = [Paragraph("<b>%s</b>" % name, self.s["h3"]),
                     self.p(where, "small"), self.p(desc),
                     Paragraph("<font color='#14805e'><b>Cost:</b></font> %s" % escape(cost), self.s["small"])]
            self.all_text.append("Cost: " + cost)
            out.append(KeepTogether(block))
        label, url = C.HIGHWAY_MORE
        out.append(Spacer(1, 6))
        out.append(self.more(label, url))
        return out + [PageBreak()]

    def town(self, t, with_activities=False):
        out = [self.p(t["title"], "h1"), self.p(t["intro"])]
        out += [self.p("Where to Eat", "h2"), self.listing_table("eat", t["eat"]),
                self.more("Full guide: ", t["eat_more"])]
        out += [self.p("Where to Stay", "h2"), self.listing_table("stay", t["stay"]),
                self.more("Full guide: ", t["stay_more"])]
        if with_activities:
            out += self.activities()
        return out + [PageBreak()]

    def activities(self):
        slug = C.CANADIAN_COASTAL_SLUG
        row = self.listing(slug)
        line = C.CANADIAN_COASTAL_LINE
        if not line.startswith(row["name"] + ":"):
            raise PlannerError("Canadian Coastal line does not start with the listing name")
        # The line must fit on one text line so it extracts verbatim.
        width = stringWidth(line, "Helvetica", self.s["activity"].fontSize)
        if width > FRAME_W - 2:
            raise PlannerError("Canadian Coastal line is too wide for one line (%.1f pt)" % width)
        self.all_text.append(line)
        url = self.listing_url(slug)
        self.links.append(url)
        name, _, rest = line.partition(":")
        markup = '<link href="%s" color="#1d4ed8"><b>%s</b>:%s</link>' % (url, escape(name), escape(rest))
        return [self.p("Things to Do", "h2"), Paragraph(markup, self.s["activity"]),
                self.more("More ideas: ", C.SQUAMISH["do_more"])]

    def trails(self, t):
        out = [self.p(t["title"], "h1")]
        if t["intro"]:
            out.append(self.p(t["intro"]))
        out.append(Spacer(1, 4))
        w = [FRAME_W * x for x in (0.21, 0.12, 0.12, 0.11, 0.44)]
        out.append(self.table(C.TRAIL_HEADER, t["rows"], w))
        out += self.tip(t["tip"])
        out.append(self.more("Full guide: ", t["more"]))
        return out + [PageBreak()]

    def packing(self):
        box = '<font name="ZapfDingbats" color="#14805e">o</font>&nbsp;&nbsp;'
        out = [self.p("11. Packing Checklist", "h1"), self.p("Summer Essentials", "h2")]
        for item in C.PACKING_SUMMER:
            self.all_text.append(item)
            out.append(Paragraph(box + escape(item), self.s["check"]))
        out.append(self.p("Winter Essentials", "h2"))
        for item in C.PACKING_WINTER:
            self.all_text.append(item)
            out.append(Paragraph(box + escape(item), self.s["check"]))
        return out + [PageBreak()]

    def resources(self):
        out = [self.p("12. Planning Resources", "h1"), self.p("Our Guides (Free)", "h2")]
        rows = []
        for label, slug in C.OUR_GUIDES:
            url = C.guide(slug)
            self.all_text.append(label)
            rows.append([label, url])
        rows.append(["All Guides", C.SITE + "/guide"])
        out.append(self.link_table(["Guide", "Link"], rows))
        out.append(self.p("Our Blog", "h2"))
        out.append(self.link_table(["Article", "Link"], [[l, C.blog(s)] for l, s in C.OUR_BLOG]))
        ai = C.AI_PLANNER
        out.append(KeepTogether([self.p("AI Trip Planner", "h2"), self.p(ai["intro"]),
                                 Paragraph(self.a(ai["url"], ai["url"].replace("https://", "")), self.s["body"]),
                                 self.p(ai["examples"])]))
        rows = []
        for label, shown, target in C.USEFUL_LINKS:
            self.all_text.append(label + " " + shown)
            if target is None:
                cell = Paragraph(escape(shown), self.s["cell"])
            else:
                cell = Paragraph(self.a(self.rich(target), shown), self.s["cell"])
            rows.append([Paragraph(escape(label), self.s["cellb"]), cell])
        out.append(KeepTogether([self.p("Useful Links", "h2"), self.raw_table(["Resource", "Link"], rows)]))
        return out + [PageBreak()]

    def link_table(self, header, rows):
        cells = [[Paragraph(escape(l), self.s["cellb"]), Paragraph(self.a(u, u.replace("https://", "")), self.s["cell"])]
                 for l, u in rows]
        return self.raw_table(header, cells)

    def raw_table(self, header, cells):
        data = [[Paragraph(escape(h), self.s["head"]) for h in header]] + cells
        self.all_text.extend(header)
        t = Table(data, colWidths=[FRAME_W * 0.42, FRAME_W * 0.58], hAlign="LEFT")
        t.setStyle(TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"), ("TOPPADDING", (0, 0), (-1, -1), 3.5),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 3.5), ("LINEBELOW", (0, 0), (-1, -1), 0.5, RULE),
            ("BACKGROUND", (0, 0), (-1, 0), MINT),
        ]))
        return t

    def back_cover(self):
        b = C.BACK_COVER
        published = self.snapshot["site_counts"]["published_listings"]
        if published < b["line_1_min_published"]:
            raise PlannerError("back cover says 850+ listings but snapshot has %d published" % published)
        for k in ("brand", "line_1", "line_2", "line_3"):
            self.all_text.append(b[k])
        return [
            Spacer(1, 3 * inch),
            Paragraph(escape(b["brand"]), self.s["c_t2"]), Spacer(1, 14),
            Paragraph(escape(b["line_1"]), self.s["c_towns"]),
            Paragraph(escape(b["line_2"]), self.s["c_tag"]), Spacer(1, 30),
            Paragraph(self.a(C.SITE, "bestseatosky.com"), self.s["c_site"]), Spacer(1, 6),
            Paragraph(escape(b["line_3"]), self.s["c_ed"]),
        ]

    def story(self):
        st = []
        st += self.cover()
        st += self.toc()
        st += self.at_a_glance()
        st += self.budget()
        st += self.seasons()
        st += self.highway()
        st += self.town(C.SQUAMISH, with_activities=True)
        st += self.trails(C.SQUAMISH_TRAILS)
        st += self.town(C.WHISTLER)
        st += self.trails(C.WHISTLER_TRAILS)
        st += self.town(C.PEMBERTON)
        st += self.trails(C.PEMBERTON_TRAILS)
        st += self.packing()
        st += self.resources()
        st += self.back_cover()
        for slug in C.MUST_KEEP:
            if slug not in self.used:
                raise PlannerError("must-keep listing %s is not used in the planner" % slug)
        return st

    def validate(self):
        blob = "\n".join(self.all_text + self.links)
        for rx, why in FORBIDDEN:
            m = rx.search(blob)
            if m:
                raise PlannerError("forbidden text (%s): %r" % (why, m.group(0)))
        allowed_sites = {self.listings[s]["website"] for s in self.used if self.listings[s]["website"]}
        for url in self.links:
            if not url.startswith("https://"):
                raise PlannerError("non-https link: %s" % url)
            if url == C.SITE or url.startswith(C.SITE + "/"):
                continue
            if url not in allowed_sites:
                raise PlannerError("link is not bestseatosky.com or a Supabase listing website: %s" % url)


# Fixed document date so rebuilds are byte-identical. Bump it when the copy changes.
PDF_DATE = "D:20261019000000-07'00'"


def footer(canvas, doc):
    page = canvas.getPageNumber()
    if page == 1:
        canvas._doc.setDateFormatter(lambda *_: PDF_DATE)
        return
    canvas.saveState()
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(MARGIN, 0.45 * inch, C.TITLE + "  \u2022  bestseatosky.com")
    canvas.drawRightString(PAGE_W - MARGIN, 0.45 * inch, str(page))
    canvas.restoreState()


def build(data_path, out_path):
    snapshot, listings = load_listings(data_path)
    b = Builder(snapshot, listings)
    story = b.story()
    b.validate()
    os.makedirs(os.path.dirname(os.path.abspath(out_path)), exist_ok=True)
    doc = SimpleDocTemplate(out_path, pagesize=letter, leftMargin=MARGIN, rightMargin=MARGIN,
                            topMargin=0.7 * inch, bottomMargin=0.75 * inch,
                            title=C.TITLE, author="Best Sea to Sky", subject="Free Sea to Sky trip planner",
                            creator="scripts/trip-planner/build_trip_planner.py", keywords="Squamish, Whistler, Pemberton")
    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    return b


def main():
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--data", default=DEFAULT_DATA, help="listing snapshot JSON (default: data/listings-snapshot.json)")
    ap.add_argument("--out", default=DEFAULT_OUT, help="output PDF (default: public/downloads/sea-to-sky-trip-planner.pdf)")
    args = ap.parse_args()
    try:
        b = build(args.data, args.out)
    except PlannerError as e:
        print("ERROR: %s" % e, file=sys.stderr)
        return 1
    for w in b.warnings:
        print("WARNING: %s" % w, file=sys.stderr)
    print("wrote %s (%d listings referenced, %d links)" % (args.out, len(b.used), len(b.links)))
    return 0


if __name__ == "__main__":
    sys.exit(main())
