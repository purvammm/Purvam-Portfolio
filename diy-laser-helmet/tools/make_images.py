#!/usr/bin/env python3
"""Regenerate the PNG renders used by index.html (images/*.png).

Usage:
  OPENSCAD=openscad python3 tools/make_images.py [-D head_length=200 ...]

Needs: OpenSCAD (any 2021+ build), numpy, trimesh, pillow, matplotlib (font).
"""
import os
import subprocess
import sys
import tempfile

import matplotlib
from PIL import Image, ImageDraw, ImageFont
import trimesh

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCAD = os.path.join(HERE, "cad", "lllt_helmet.scad")
IMG = os.path.join(HERE, "images")
sys.path.insert(0, os.path.join(HERE, "tools"))
from render_stl import COLORS, render  # noqa: E402

OPENSCAD = os.environ.get("OPENSCAD", "openscad")
EXTRA = sys.argv[1:]
FONT = os.path.join(os.path.dirname(matplotlib.__file__), "mpl-data", "fonts", "ttf", "DejaVuSans.ttf")
FONT_B = FONT.replace("DejaVuSans.ttf", "DejaVuSans-Bold.ttf")


def export(tmp, name, body=None, part=None):
    """Export either a named part or a custom snippet that includes the scad."""
    out = os.path.join(tmp, name + ".stl")
    if body is not None:
        src = os.path.join(tmp, name + ".scad")
        with open(src, "w") as f:
            f.write(f'include <{SCAD}>\npart="none";\n{body}\n')
        cmd = [OPENSCAD, "-o", out, src]
    else:
        cmd = [OPENSCAD, "-D", f'part="{part}"', "-o", out, SCAD]
    cmd[1:1] = ["--backend=manifold"] if "--backend" in HELP else []
    subprocess.run(cmd + EXTRA, check=True, capture_output=True)
    return trimesh.load(out, force="mesh")


def label(im, text, sub="", size=30):
    d = ImageDraw.Draw(im)
    d.text((18, 12), text, fill=(25, 25, 35), font=ImageFont.truetype(FONT_B, size))
    if sub:
        d.text((18, 16 + size), sub, fill=(90, 90, 100), font=ImageFont.truetype(FONT, int(size * 0.62)))
    return im


def main():
    global HELP
    HELP = subprocess.run([OPENSCAD, "--help"], capture_output=True, text=True).stderr + \
        subprocess.run([OPENSCAD, "--help"], capture_output=True, text=True).stdout
    os.makedirs(IMG, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        cor = export(tmp, "cor", body="all_coronal();")
        sag = export(tmp, "sag", body="all_sagittal();")
        dio = export(tmp, "dio", part="diodes_preview")
        head = export(tmp, "head", part="head_preview")
        B, O, Y, S = COLORS["blue"], COLORS["orange"], COLORS["brass"], COLORS["skin"]

        render([(cor, B), (sag, O), (dio, Y), (head, S)], 1000, 24, -38).save(
            os.path.join(IMG, "hero.png"), optimize=True)
        render([(cor, B), (sag, O), (dio, Y)], 900, 89.9, 180).save(
            os.path.join(IMG, "top_layout.png"), optimize=True)
        render([(cor, B), (sag, O), (dio, Y), (head, S)], 900, 2, -90).save(
            os.path.join(IMG, "side.png"), optimize=True)
        sag_up = sag.copy()
        sag_up.apply_translation([0, 0, 90])
        render([(cor, B), (sag_up, O)], 900, 28, -35).save(
            os.path.join(IMG, "exploded.png"), optimize=True)

        parts = [
            ("coronal_1", "x2", "ear-to-ear rib, middle"), ("coronal_2", "x2", "ear-to-ear rib"),
            ("coronal_3", "x2", "ear-to-ear rib"), ("coronal_4", "x2", "ear-to-ear rib, front/back"),
            ("sagittal_center", "x1", "front-to-back spine"), ("sagittal_side", "x2", "side spine"),
            ("fit_test", "x2", "print FIRST: hole + slot fit"), ("standoff_peg", "x4", "shaft + foot"),
            ("interlock_clip", "x1", "holds KW11 micro switch"), ("controller_box", "x1", "electronics box"),
            ("controller_lid", "x1", "button, LED, buzzer"), ("tester_jig", "x1", "diode tester (BPW34)"),
        ]
        tiles = []
        for name, qty, sub in parts:
            m = export(tmp, "p_" + name, part=name)
            col = B if name.startswith(("coronal", "fit")) else O if name.startswith("sagittal") else COLORS["green"]
            im = render([(m, col)], 420, 38, -60, margin=0.12)
            tiles.append(label(im, f"{name}  {qty}", sub, size=22))
        cols = 4
        rows = (len(tiles) + cols - 1) // cols
        sheet = Image.new("RGB", (cols * 420, rows * 420), "white")
        for i, t in enumerate(tiles):
            sheet.paste(t, ((i % cols) * 420, (i // cols) * 420))
        d = ImageDraw.Draw(sheet)
        for i in range(1, cols):
            d.line([(i * 420, 10), (i * 420, rows * 420 - 10)], fill=(225, 225, 230), width=2)
        for j in range(1, rows):
            d.line([(10, j * 420), (cols * 420 - 10, j * 420)], fill=(225, 225, 230), width=2)
        sheet.save(os.path.join(IMG, "parts_sheet.png"), optimize=True)
    print("images written to", IMG)


if __name__ == "__main__":
    main()
