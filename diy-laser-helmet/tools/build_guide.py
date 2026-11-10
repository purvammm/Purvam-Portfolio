#!/usr/bin/env python3
"""Build the guide.

1. Fills the parts table in index.html from bom/bom_india.csv
   (between <!--BOM_TABLE--> and <!--/BOM_TABLE-->).
2. Writes DIY-LLLT-Helmet-Guide.html: the same page with every image
   embedded, so it works as one file (e.g. on a phone, offline).

Usage: python3 tools/build_guide.py      (standard library only)
"""
import base64
import csv
import html
import os
import re

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INDEX = os.path.join(HERE, "index.html")
BOM = os.path.join(HERE, "bom", "bom_india.csv")
OFFLINE = os.path.join(HERE, "DIY-LLLT-Helmet-Guide.html")


def bom_table():
    rows = list(csv.DictReader(open(BOM, encoding="utf-8")))
    out = ['<table class="bom">',
           "<tr><th>Item</th><th>What to search for</th><th class=\"num\">Qty</th>"
           "<th class=\"num\">Approx. &#8377;</th><th>Where (India)</th><th>Notes</th></tr>"]
    section = None
    for r in rows:
        if r["Section"] == "Total":
            out.append(f"<tr><th colspan=\"3\">Total (approx.)</th><th class=\"num\">&#8377;{int(r['Approx total (INR)']):,}</th>"
                       f"<th colspan=\"2\">{html.escape(r['Notes'])}</th></tr>")
            continue
        if r["Section"] != section:
            section = r["Section"]
            out.append(f"<tr><td colspan=\"6\" style=\"background:#fbfcfe;font-weight:600;color:#33405c\">{html.escape(section)}</td></tr>")
        tot = int(r["Approx total (INR)"])
        price = f"{tot:,}" if tot else f"({int(r['Approx unit price (INR)']):,})"
        out.append("<tr>" + "".join([
            f"<td>{html.escape(r['Item'])}</td>",
            f"<td>{html.escape(r['What to search for / spec'])}</td>",
            f"<td class=\"num\">{html.escape(r['Qty'])}</td>",
            f"<td class=\"num\">{price}</td>",
            f"<td>{html.escape(r['Where to buy in India'])}</td>",
            f"<td>{html.escape(r['Notes'])}</td>"]) + "</tr>")
    out.append("</table>")
    return "\n".join(out)


def fill_bom(page):
    table = "<!--BOM_TABLE-->\n" + bom_table() + "\n<!--/BOM_TABLE-->"
    if "<!--/BOM_TABLE-->" in page:
        return re.sub(r"<!--BOM_TABLE-->.*?<!--/BOM_TABLE-->", lambda m: table, page, flags=re.S)
    return page.replace("<!--BOM_TABLE-->", table)


def inline_images(page):
    def data_uri(rel):
        path = os.path.join(HERE, rel)
        mime = "image/svg+xml" if rel.endswith(".svg") else "image/png"
        with open(path, "rb") as f:
            return f"data:{mime};base64," + base64.b64encode(f.read()).decode()

    def repl(m):
        attr, rel = m.group(1), m.group(2)
        if rel.startswith(("http", "data:", "#")) or not rel.endswith((".png", ".svg")):
            return m.group(0)
        return f'{attr}="{data_uri(rel)}"'

    page = re.sub(r'(src)="([^"]+)"', repl, page)
    # links that open an image full size
    page = re.sub(r'(href)="((?:images|electronics)/[^"]+\.(?:svg|png))"', repl, page)
    return page


def main():
    page = open(INDEX, encoding="utf-8").read()
    page = fill_bom(page)
    open(INDEX, "w", encoding="utf-8").write(page)
    off = inline_images(page)
    off = off.replace("<title>", "<title>[offline] ", 1)
    open(OFFLINE, "w", encoding="utf-8").write(off)
    print("updated", INDEX)
    print("wrote", OFFLINE, f"{len(off) / 1024:.0f} KB")


if __name__ == "__main__":
    main()
