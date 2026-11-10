#!/usr/bin/env python3
"""Generate the SVG illustrations for the DIY LLLT helmet guide."""
import math
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT = "font-family='Segoe UI,Roboto,Helvetica,Arial,sans-serif'"
INK = "#1f2430"
RED = "#d22f2f"
BLK = "#222"


class S:
    def __init__(self, w, h):
        self.w, self.h, self.items = w, h, []

    def add(self, s):
        self.items.append(s)

    def line(self, x1, y1, x2, y2, c=INK, w=2, dash=None):
        d = f" stroke-dasharray='{dash}'" if dash else ""
        self.add(f"<line x1='{x1}' y1='{y1}' x2='{x2}' y2='{y2}' stroke='{c}' stroke-width='{w}' stroke-linecap='round'{d}/>")

    def poly(self, pts, c=INK, w=2, fill="none"):
        p = " ".join(f"{x},{y}" for x, y in pts)
        self.add(f"<polyline points='{p}' fill='{fill}' stroke='{c}' stroke-width='{w}' stroke-linejoin='round' stroke-linecap='round'/>")

    def rect(self, x, y, w, h, fill="#fff", c=INK, sw=2, r=6, dash=None):
        d = f" stroke-dasharray='{dash}'" if dash else ""
        self.add(f"<rect x='{x}' y='{y}' width='{w}' height='{h}' rx='{r}' fill='{fill}' stroke='{c}' stroke-width='{sw}'{d}/>")

    def text(self, x, y, t, size=14, anchor="start", weight="normal", c=INK, italic=False):
        st = " font-style='italic'" if italic else ""
        t = t.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
        self.add(f"<text x='{x}' y='{y}' {FONT} font-size='{size}' text-anchor='{anchor}' font-weight='{weight}' fill='{c}'{st}>{t}</text>")

    def dot(self, x, y, r=4, c=INK):
        self.add(f"<circle cx='{x}' cy='{y}' r='{r}' fill='{c}'/>")

    def circle(self, x, y, r, c=INK, w=2, fill="#fff"):
        self.add(f"<circle cx='{x}' cy='{y}' r='{r}' fill='{fill}' stroke='{c}' stroke-width='{w}'/>")

    def path(self, d, c=INK, w=2, fill="none", extra=""):
        self.add(f"<path d='{d}' fill='{fill}' stroke='{c}' stroke-width='{w}' stroke-linejoin='round' stroke-linecap='round' {extra}/>")

    # ---- schematic symbols ----
    def res_h(self, x, y, l=50, label="", val=""):
        self.line(x, y, x + (l - 36) / 2, y)
        self.rect(x + (l - 36) / 2, y - 7, 36, 14, r=1)
        self.line(x + (l + 36) / 2, y, x + l, y)
        if label:
            self.text(x + l / 2, y - 12, label, 12, "middle", "bold")
        if val:
            self.text(x + l / 2, y + 24, val, 12, "middle")

    def res_v(self, x, y, l=50, label="", val="", side=1):
        self.line(x, y, x, y + (l - 36) / 2)
        self.rect(x - 7, y + (l - 36) / 2, 14, 36, r=1)
        self.line(x, y + (l + 36) / 2, x, y + l)
        a = "start" if side > 0 else "end"
        if label:
            self.text(x + 14 * side, y + l / 2 - 2, label, 12, a, "bold")
        if val:
            self.text(x + 14 * side, y + l / 2 + 13, val, 12, a)

    def cap_v(self, x, y, l=40, label="", val="", side=1, pol=False):
        m = y + l / 2
        self.line(x, y, x, m - 4)
        self.line(x - 13, m - 4, x + 13, m - 4, w=3)
        self.line(x - 13, m + 4, x + 13, m + 4, w=3)
        self.line(x, m + 4, x, y + l)
        if pol:
            self.text(x - 20, m - 6, "+", 13, "middle", "bold")
        a = "start" if side > 0 else "end"
        if label:
            self.text(x + 18 * side, m - 2, label, 12, a, "bold")
        if val:
            self.text(x + 18 * side, m + 13, val, 12, a)

    def gnd(self, x, y):
        self.line(x, y, x, y + 8)
        self.line(x - 12, y + 8, x + 12, y + 8)
        self.line(x - 7, y + 13, x + 7, y + 13)
        self.line(x - 3, y + 18, x + 3, y + 18)

    def net(self, x, y, name, anchor="start", fill="#e8eefc"):
        w = 9 * len(name) + 14
        x0 = x if anchor == "start" else x - w
        self.rect(x0, y - 11, w, 22, fill=fill, c="#5a6fae", sw=1.5, r=11)
        self.text(x0 + w / 2, y + 5, name, 12, "middle", "bold", "#2b3d7a")

    def switch_h(self, x, y, l=60, label="", val=""):
        self.line(x, y, x + 14, y)
        self.circle(x + 17, y, 3)
        self.circle(x + l - 17, y, 3)
        self.line(x + 19, y - 2, x + l - 16, y - 16)
        self.line(x + l - 14, y, x + l, y)
        if label:
            self.text(x + l / 2, y - 22, label, 12, "middle", "bold")
        if val:
            self.text(x + l / 2, y + 20, val, 12, "middle")

    def led_h(self, x, y, label=""):
        self.line(x, y, x + 12, y)
        self.path(f"M{x+12},{y-10} L{x+12},{y+10} L{x+30},{y} Z", fill="#fff")
        self.line(x + 30, y - 10, x + 30, y + 10)
        self.line(x + 30, y, x + 44, y)
        for k in (0, 7):
            self.line(x + 20 + k, y - 13, x + 27 + k, y - 21, w=1.5)
            self.path(f"M{x+27+k},{y-21} l-5,1 l3,3 z", w=1, fill=INK)
        if label:
            self.text(x + 22, y + 26, label, 12, "middle", "bold")

    def fuse_h(self, x, y, l=60, label=""):
        self.line(x, y, x + 10, y)
        self.rect(x + 10, y - 8, l - 20, 16, r=3)
        self.line(x + 10, y, x + l - 10, y, w=1.5)
        self.line(x + l - 10, y, x + l, y)
        if label:
            self.text(x + l / 2, y - 14, label, 12, "middle", "bold")

    def save(self, path, bg="#ffffff"):
        body = "\n".join(self.items)
        svg = (f"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 {self.w} {self.h}' "
               f"width='{self.w}' height='{self.h}' role='img'>\n"
               f"<rect width='100%' height='100%' fill='{bg}'/>\n{body}\n</svg>\n")
        with open(path, "w") as f:
            f.write(svg)
        print("wrote", path, len(svg), "bytes")


def panel(s, x, y, w, h, title):
    s.rect(x, y, w, h, fill="#fafbfd", c="#c9cfdb", sw=1.5, r=12)
    s.text(x + 16, y + 26, title, 15, weight="bold", c="#33405c")


# =====================================================================
def schematic():
    s = S(1200, 960)
    s.text(600, 34, "DIY LLLT helmet - controller schematic", 22, "middle", "bold")
    s.text(600, 56, "Net labels with the same name are connected. All GND symbols are one common ground.", 13, "middle", c="#555")

    # ---------------- Panel A: power ----------------
    panel(s, 20, 74, 690, 300, "A. Power input (recommended: USB-C PD trigger + buck converter)")
    s.rect(36, 130, 120, 92, fill="#f3f6ff")
    for i, t in enumerate(["Power bank", "USB-C PD", "18 W or more"]):
        s.text(96, 158 + 20 * i, t, 13, "middle", "bold" if i == 0 else "normal")
    s.line(156, 160, 190, 160); s.line(156, 192, 190, 192)
    s.text(173, 150, "USB-C", 10, "middle", c="#555")
    s.rect(190, 125, 130, 102, fill="#fff7e8")
    for i, t in enumerate(["PD trigger", "set to 9 V", "ZY12PDN/IP2721"]):
        s.text(255, 155 + 20 * i, t, 12.5, "middle", "bold" if i == 0 else "normal")
    s.text(328, 152, "+", 14, "middle", "bold"); s.text(328, 210, "-", 16, "middle", "bold")
    s.line(320, 160, 334, 160)
    s.fuse_h(334, 160, 60, "F1  3 A")
    s.line(394, 160, 410, 160)
    s.line(320, 192, 410, 192)
    s.rect(410, 125, 190, 102, fill="#eaf7ee")
    for i, t in enumerate(["Buck XL4015", "adjust to 5.0 V", "BEFORE connecting"]):
        s.text(505, 152 + 20 * i, t, 13, "middle", "bold" if i == 0 else "normal", c="#a01818" if i == 2 else INK)
    s.text(415, 178, "IN+", 9.5, c="#555"); s.text(415, 210, "IN-", 9.5, c="#555")
    s.text(596, 178, "OUT+", 9.5, "end", c="#555"); s.text(596, 210, "OUT-", 9.5, "end", c="#555")
    s.line(600, 160, 640, 160); s.line(600, 192, 640, 192)
    s.dot(620, 160); s.dot(620, 192)
    s.cap_v(620, 160, 32, "", "", pol=True)
    s.net(644, 160, "+5V")
    s.net(644, 192, "GND")
    s.text(690, 248, "C1 1000 uF 16 V across the buck output", 12, "end", "bold")
    s.text(40, 280, "Simple option: skip the PD trigger and buck. Use a USB-C 5 V breakout (with 5.1 kOhm CC resistors)", 12.5)
    s.text(40, 299, "straight from the power bank's 3 A port, keep F1. Use a short (<= 1 m) 3 A cable and make sure the", 12.5)
    s.text(40, 318, "helmet still gets >= 4.8 V under load (the firmware warns below 4.65 V). Long thin cables = dim lasers.", 12.5)
    s.text(40, 346, "Size F1 for your diode count: about 1.2 x total current (113 modules x 25 mA = 2.8 A -> 3 A fuse).", 12.5, c="#555")

    # ---------------- Panel B: laser switch ----------------
    panel(s, 730, 74, 450, 400, "B. Laser switch and current sense")
    s.net(750, 165, "+5V")
    s.line(795, 165, 1030, 165)
    s.rect(1030, 104, 132, 166, fill="#f3f6ff")
    s.text(1096, 124, "J1 to helmet", 13, "middle", "bold")
    s.text(1096, 140, "GX12 3-pin or similar", 10.5, "middle", c="#555")
    for i, nm in enumerate(["1  +5V bus", "2  LASER- bus", "3  HEAD"]):
        s.text(1040, 170 + 40 * i, nm, 12, weight="bold")
    # Q1
    qx, qy = 930, 300
    s.line(qx, 205, 1030, 205)
    s.line(qx, 205, qx, qy - 28)
    s.line(qx, qy - 28, qx - 14, qy - 28); s.line(qx - 14, qy - 34, qx - 14, qy + 34, w=3)
    s.line(qx - 14, qy + 28, qx, qy + 28); s.line(qx, qy + 28, qx, qy + 70)
    s.line(qx - 22, qy - 30, qx - 22, qy + 30, w=2)
    s.path(f"M{qx-14},{qy+28} l8,-5 l0,10 z", fill=INK, w=1)
    s.text(qx + 10, qy - 30, "D", 12, weight="bold"); s.text(qx + 10, qy + 40, "S", 12, weight="bold")
    s.text(qx + 12, qy - 2, "Q1 IRLZ44N", 13, weight="bold")
    s.text(qx + 12, qy + 14, "logic-level N-MOSFET", 11.5, c="#555")
    s.text(qx - 34, qy - 8, "G", 12, "end", "bold")
    # gate
    s.net(745, qy, "D9")
    s.res_h(785, qy, 60, "R1 100R")
    s.line(845, qy, qx - 22, qy)
    s.dot(860, qy)
    s.res_v(860, qy, 56, "R2", "10k", side=-1)
    s.gnd(860, qy + 56)
    # source / shunt
    s.dot(qx, qy + 70)
    s.res_v(qx, qy + 70, 56, "RS 0.05R", "2 x 0.1R 2W parallel", side=-1)
    s.gnd(qx, qy + 126)
    s.line(qx, qy + 70, 1000, qy + 70)
    s.res_h(1000, qy + 70, 56, "R5 1k")
    s.line(1056, qy + 70, 1080, qy + 70)
    s.dot(1080, qy + 70)
    s.cap_v(1080, qy + 70, 40, "C3", "100n", side=1)
    s.gnd(1080, qy + 110)
    s.net(1100, qy + 55, "A1")
    s.line(1080, qy + 70, 1100, qy + 62, w=1.5)
    s.line(1030, 245, 990, 245)
    s.net(990, 245, "HEAD", "end")

    # ---------------- Panel C: helmet ----------------
    panel(s, 20, 394, 690, 330, "C. Inside the helmet: every module in parallel")
    yp, ym = 470, 600
    s.line(60, yp, 600, yp, RED, 4)
    s.line(60, ym, 600, ym, BLK, 4)
    s.text(60, yp - 12, "+ bus (red)  -> J1.1  +5V", 12.5, weight="bold", c=RED)
    s.text(60, ym + 26, "- bus (black) -> J1.2  LASER-", 12.5, weight="bold")
    xs = [110, 185, 260, 335, 410, 560]
    for i, x in enumerate(xs):
        s.line(x, yp, x, yp + 28, RED, 2)
        s.rect(x - 9, yp + 28, 18, 50, fill="#e9c46a", c="#8a6d1c", sw=1.5, r=3)
        s.path(f"M{x-6},{yp+46} L{x+6},{yp+46} L{x},{yp+58} Z", w=1.2, fill="#fff")
        s.line(x - 6, yp + 59, x + 6, yp + 59, w=1.2)
        s.line(x, yp + 78, x, ym, BLK, 2)
        s.line(x + 10, yp + 70, x + 22, yp + 82, RED, 1.5)
        s.line(x + 14, yp + 70, x + 26, yp + 82, RED, 1.5)
        s.dot(x, yp, 3.5, RED); s.dot(x, ym, 3.5, BLK)
    s.text(485, yp + 62, ". . .", 22, "middle", "bold")
    s.text(330, ym - 4 + 34 + 26, "", 12)
    s.text(40, 660, "113 modules: 650 nm, 5 mW, 5 V type (resistor built in), about 25 mA each = about 2.8 A in total.", 12.5)
    s.text(40, 680, "Red lead to the + bus, black (or blue) lead to the - bus. One reversed module stays dark - check each one.", 12.5, c="#555")
    # interlock
    s.line(600, yp, 640, yp, RED, 4)
    s.line(640, yp, 640, 500)
    s.circle(640, 503, 3)
    s.circle(640, 547, 3)
    s.line(642, 506, 662, 543)
    s.line(640, 550, 640, 575)
    s.net(640, 588, "HEAD", "start")
    s.text(652, 520, "S2", 12, weight="bold")
    s.text(40, 704, "S2 = interlock micro switch (KW11-3Z): COM to the + bus, NO to the HEAD wire. Closed = helmet worn.", 12.5, weight="bold")

    # ---------------- Panel D: Nano ----------------
    panel(s, 730, 494, 450, 446, "D. Arduino Nano and controls")
    nx, ny = 770, 540
    s.rect(nx, ny, 120, 380, fill="#e7f0ff")
    s.text(nx + 60, ny + 22, "Arduino", 14, "middle", "bold")
    s.text(nx + 60, ny + 40, "Nano", 14, "middle", "bold")
    pins = [("D2", 590), ("D3", 640), ("D4", 690), ("D5", 740), ("D9", 790), ("A1", 830), ("A2", 875)]
    for nm, y in pins:
        s.text(nx + 112, y + 5, nm, 12, "end", "bold")
        s.line(nx + 120, y, nx + 140, y)
    s.text(nx + 8, 610, "5V", 12, weight="bold")
    s.text(nx + 8, 900, "GND", 12, weight="bold")
    s.line(nx, 605, nx - 6, 605)
    s.line(nx, 895, nx - 6, 895)
    s.net(nx - 6, 605, "+5V", "end")
    s.net(nx - 6, 895, "GND", "end")
    # D2 button
    s.switch_h(nx + 140, 590, 70, "S1 start button")
    s.line(nx + 210, 590, nx + 232, 590)
    s.gnd(nx + 232, 590)
    # D3 HEAD + pull-down
    s.line(nx + 140, 640, nx + 250, 640)
    s.dot(nx + 196, 640)
    s.line(nx + 196, 640, nx + 196, 650)
    s.rect(nx + 189, 650, 14, 22, r=1)
    s.line(nx + 196, 672, nx + 196, 674)
    s.gnd(nx + 196, 674)
    s.text(nx + 210, 668, "R4 10k", 11.5, weight="bold")
    s.net(nx + 250, 640, "HEAD")
    # D4 buzzer
    s.line(nx + 140, 690, nx + 236, 690)
    s.rect(nx + 236, 676, 150, 28, fill="#fff7e8", r=4)
    s.text(nx + 311, 695, "BZ1 active buzzer (IN)", 11.5, "middle", "bold")
    # D5 LED
    s.res_h(nx + 140, 740, 60, "R3 1k")
    s.led_h(nx + 200, 740, "")
    s.text(nx + 222, 766, "LED1 status", 11.5, "middle", "bold")
    s.line(nx + 244, 740, nx + 270, 740)
    s.gnd(nx + 270, 740)
    # D9
    s.line(nx + 140, 790, nx + 170, 790)
    s.net(nx + 170, 790, "D9")
    s.text(nx + 216, 795, "-> R1, panel B", 11.5)
    # A1
    s.line(nx + 140, 830, nx + 170, 830)
    s.net(nx + 170, 830, "A1")
    s.text(nx + 216, 835, "-> R5, panel B", 11.5)
    # A2 divider
    dx = nx + 250
    s.line(nx + 140, 875, dx, 875)
    s.dot(dx, 875)
    s.net(dx + 70, 820, "+5V")
    s.line(dx + 70, 831, dx + 70, 836)
    s.res_v(dx + 70, 836, 36, "", "")
    s.text(dx + 84, 856, "R6 10k", 11.5, weight="bold")
    s.line(dx + 70, 872, dx + 70, 875)
    s.line(dx, 875, dx + 70, 875)
    s.dot(dx + 70, 875)
    s.res_v(dx + 70, 875, 36, "", "")
    s.text(dx + 84, 897, "R7 2.2k", 11.5, weight="bold")
    s.gnd(dx + 70, 911)
    s.cap_v(dx, 875, 30, "", "")
    s.text(dx - 16, 905, "C4 100n", 11.5, "end", "bold")
    s.gnd(dx, 905)
    s.save(os.path.join(ROOT, "electronics", "schematic.svg"))


# =====================================================================
def wiring():
    s = S(1200, 760)
    s.text(600, 34, "Helmet wiring - top view (front at the top)", 22, "middle", "bold")
    s.text(600, 56, "Each rib gets its own red/black pair. All pairs meet the spine bus on the centre rib. One 3-wire cable goes to the controller.", 13, "middle", c="#555")
    cx, top = 330, 110
    xs_cor = [-80.5, -57.5, -34.5, -11.5, 11.5, 34.5, 57.5, 80.5]
    sc = 2.6
    half = {80.5: 70, 57.5: 92, 34.5: 103, 11.5: 108}
    # coronal ribs (horizontal lines here; x is up the page)
    for x in xs_cor:
        y = 380 - x * sc
        h = half[abs(x)] * 2.1
        s.rect(cx - h, y - 8, 2 * h, 16, fill="#4682b4", c="#2c5a80", sw=1, r=3)
    # sagittal ribs (vertical)
    s.rect(cx - 8, 380 - 98 * sc, 16, 2 * 98 * sc, fill="#f0962a", c="#b26b12", sw=1, r=3)
    for yy in (-40, 40):
        s.rect(cx + yy * 2.1 - 8, 380 - 73 * sc, 16, 2 * 73 * sc, fill="#f0962a", c="#b26b12", sw=1, r=3)
    # spine bus along the centre rib
    s.line(cx - 3, 380 - 92 * sc, cx - 3, 380 + 106 * sc, RED, 4)
    s.line(cx + 3, 380 - 92 * sc, cx + 3, 380 + 106 * sc, BLK, 4)
    # rib pairs (short ticks along each coronal rib)
    for x in xs_cor:
        y = 380 - x * sc
        h = half[abs(x)] * 2.1
        s.line(cx - h + 10, y - 3, cx + h - 10, y - 3, RED, 1.6)
        s.line(cx - h + 10, y + 3, cx + h - 10, y + 3, BLK, 1.6)
        s.dot(cx, y, 4.5, "#ffd34d")
    for yy in (-40, 40):
        X = cx + yy * 2.1
        s.line(X - 3, 380 - 70 * sc, X - 3, 380 + 70 * sc, RED, 1.6)
        s.line(X + 3, 380 - 70 * sc, X + 3, 380 + 70 * sc, BLK, 1.6)
        s.dot(X, 380 - 11.5 * sc, 4.5, "#ffd34d")
    s.text(cx, 104, "FRONT (forehead)", 13, "middle", "bold", c="#555")
    s.text(cx - 40, 380 + 106 * sc + 16, "BACK", 13, "end", "bold", c="#555")
    # cable to controller
    yb = 380 + 106 * sc
    s.line(cx - 3, yb, cx - 3, yb + 18, RED, 4); s.line(cx + 3, yb, cx + 3, yb + 18, BLK, 4)
    s.rect(cx + 30, yb - 4, 120, 40, fill="#f3f6ff", r=6)
    s.text(cx + 90, yb + 14, "J1 3-pin plug", 12, "middle", "bold")
    s.text(cx + 90, yb + 29, "18 AWG, <= 50 cm", 11, "middle")
    s.line(cx + 6, yb + 16, cx + 30, yb + 16, INK, 2)
    s.dot(cx, 380 - 11.5 * sc, 4.5, "#ffd34d")
    s.text(cx + 260, 140, "Legend", 15, weight="bold")
    items = [("#4682b4", "ear-to-ear (coronal) rib"), ("#f0962a", "front-to-back (sagittal) rib"),
             (RED, "+5 V wire"), (BLK, "LASER- wire"), ("#ffd34d", "solder joint: rib pair -> spine bus")]
    for i, (c, t) in enumerate(items):
        y = 168 + 26 * i
        if c in (RED, BLK):
            s.line(cx + 262, y - 4, cx + 300, y - 4, c, 4)
        elif c == "#ffd34d":
            s.dot(cx + 281, y - 4, 6, c)
        else:
            s.rect(cx + 262, y - 12, 38, 14, fill=c, c=c, sw=1, r=3)
        s.text(cx + 312, y, t, 13)
    # ---- ladder detail ----
    lx, ly = 760, 390
    s.rect(lx - 20, ly - 70, 440, 250, fill="#fafbfd", c="#c9cfdb", sw=1.5, r=12)
    s.text(lx, ly - 42, "One rib, seen from outside (wires on the outer face)", 14, weight="bold")
    s.rect(lx, ly - 18, 400, 84, fill="#4682b4", c="#2c5a80", sw=1.5, r=6)
    s.line(lx + 6, ly - 6, lx + 394, ly - 6, RED, 4)
    s.line(lx + 6, ly + 54, lx + 394, ly + 54, BLK, 4)
    for k in range(6):
        x = lx + 40 + 64 * k
        s.circle(x, ly + 24, 11, "#8a6d1c", 2, "#e9c46a")
        s.circle(x, ly + 24, 4, "#8a6d1c", 1, "#c49a2a")
        s.path(f"M{x-3},{ly+14} C{x-8},{ly+4} {x-6},{ly} {x-4},{ly-6}", RED, 2)
        s.path(f"M{x+3},{ly+34} C{x+8},{ly+44} {x+6},{ly+48} {x+4},{ly+54}", BLK, 2)
        s.dot(x - 4, ly - 6, 3.5, "#ffd34d"); s.dot(x + 4, ly + 54, 3.5, "#ffd34d")
    s.text(lx, ly + 94, "1. Push every module in from the outside until it stops.", 12.5)
    s.text(lx, ly + 112, "2. Run a red and a black 24 AWG wire along the outer face.", 12.5)
    s.text(lx, ly + 130, "3. Window-strip 5 mm at each module, twist the lead on, solder.", 12.5)
    s.text(lx, ly + 148, "4. Cut leads to ~3 cm first. Sleeve or tape every joint.", 12.5)
    # current table
    s.rect(lx - 20, ly + 196, 440, 130, fill="#fff", c="#c9cfdb", sw=1.5, r=12)
    s.text(lx, ly + 222, "Wire sizes", 14, weight="bold")
    rows = [("Rib pair (<= 12 modules, 0.3 A)", "24-26 AWG"), ("Spine bus (up to 2.8 A)", "18-20 AWG"),
            ("Helmet -> controller cable", "18 AWG, short"), ("HEAD wire (interlock)", "any thin wire")]
    for i, (a, b) in enumerate(rows):
        s.text(lx, ly + 246 + 20 * i, a, 12.5)
        s.text(lx + 400, ly + 246 + 20 * i, b, 12.5, "end", "bold")
    s.save(os.path.join(ROOT, "electronics", "wiring.svg"))


# =====================================================================
def cross_section():
    """Diode in rib, beam to scalp."""
    s = S(900, 580)
    s.text(450, 34, "Cross-section: one laser module in a rib", 21, "middle", "bold")
    # scalp
    s.path("M40,470 Q450,420 860,470 L860,540 L40,540 Z", c="#b07a55", w=2, fill="#f2d2b6")
    s.text(820, 522, "scalp", 14, "end", "bold", c="#7a4a2a")
    for k in range(26):
        x = 60 + k * 31
        yb = 430 - 50 * (1 - ((x - 450) / 410) ** 2) * 0.0 - (430 - (430 - (1 - ((x - 450) / 410) ** 2) * 50 * 0.0))
        y0 = 440 + ((x - 450) / 410) ** 2 * 30 + 12
        s.path(f"M{x},{y0} q6,-40 -4,-70", c="#3b2a20", w=1.6)
    # rib band
    ry = 160
    s.rect(220, ry, 460, 120, fill="#4682b4", c="#2c5a80", sw=2, r=4)
    s.text(690, ry + 18, "rib (PETG)", 14, weight="bold", c="#2c5a80")
    s.text(690, ry + 36, "depth 14 mm", 12.5, c="#2c5a80")
    # bore
    bx = 450
    s.rect(bx - 33, ry - 2, 66, 104, fill="#ffffff", c="#2c5a80", sw=1.5, r=0)
    s.rect(bx - 24, ry + 102, 48, 20, fill="#ffffff", c="#2c5a80", sw=1.5, r=0)
    # module
    s.rect(bx - 30, ry + 12, 60, 90, fill="#e9c46a", c="#8a6d1c", sw=2, r=4)
    s.rect(bx - 18, ry + 90, 36, 10, fill="#cde8ff", c="#5a8fbf", sw=1.5, r=2)
    s.text(bx, ry + 60, "module", 13, "middle", "bold", c="#5c4710")
    s.text(bx + 48, ry + 52, "650 nm laser module", 12.5, weight="bold", c="#ffffff")
    s.text(bx + 48, ry + 68, "6 mm x 10.5 mm, brass", 12, c="#ffffff")
    # wires
    s.path(f"M{bx-8},{ry+12} C{bx-10},{ry-30} {bx-60},{ry-40} {bx-120},{ry-46}", RED, 3)
    s.path(f"M{bx+8},{ry+12} C{bx+10},{ry-30} {bx+60},{ry-40} {bx+120},{ry-46}", BLK, 3)
    s.text(bx - 128, ry - 52, "+ bus", 12.5, "end", "bold", c=RED)
    s.text(bx + 128, ry - 52, "- bus", 12.5, "start", "bold")
    # beam
    s.add(f"<polygon points='{bx-5},{ry+122} {bx+5},{ry+122} {bx+7},{445} {bx-7},{445}' fill='#ff2d2d' opacity='0.75'/>")
    s.add(f"<ellipse cx='{bx}' cy='447' rx='16' ry='5' fill='#ff4d4d' opacity='0.55'/>")
    # dimension: standoff
    s.line(bx + 90, ry + 122, bx + 90, 442, "#555", 1.5)
    s.path(f"M{bx+90},{ry+122} l-5,9 l10,0 z", "#555", 1, "#555")
    s.path(f"M{bx+90},442 l-5,-9 l10,0 z", "#555", 1, "#555")
    s.text(bx + 100, 340, "standoff 12 mm", 13, weight="bold", c="#333")
    s.text(bx + 100, 358, "(room for hair)", 12, c="#555")
    # lip callout
    s.line(bx - 24, ry + 112, bx - 140, ry + 160, "#555", 1.2)
    s.text(bx - 146, ry + 166, "stop lip 1.2 mm, 4.6 mm window", 12.5, "end", "bold", c="#333")
    s.text(bx - 146, ry + 184, "every module sits at the same depth", 12, "end", c="#555")
    s.line(bx - 33, ry + 4, bx - 150, ry - 26, "#555", 1.2)
    s.text(bx - 156, ry - 40, "bore 6.15 mm (press fit)", 12.5, "end", "bold", c="#333")
    s.text(bx - 156, ry - 24, "teardrop top: prints without support", 12, "end", c="#555")
    s.text(450, 566, "Insert from the OUTSIDE. Lens points at the scalp. A drop of hot glue at the back holds it.", 13, "middle", c="#333")
    s.save(os.path.join(ROOT, "images", "diode_section.svg"))


def measure():
    s = S(900, 520)
    s.text(450, 32, "Measure your head (over your hair, in mm)", 21, "middle", "bold")
    # side view head
    ox, oy = 230, 300
    s.path(f"M{ox-150},{oy} C{ox-160},{oy-120} {ox-90},{oy-200} {ox+10},{oy-200} "
           f"C{ox+110},{oy-200} {ox+160},{oy-120} {ox+150},{oy-40} "
           f"L{ox+160},{oy-10} C{ox+172},{oy+5} {ox+170},{oy+20} {ox+152},{oy+30} "
           f"L{ox+150},{oy+70} C{ox+120},{oy+110} {ox+60},{oy+120} {ox+20},{oy+120} "
           f"L{ox-60},{oy+120} C{ox-110},{oy+100} {ox-140},{oy+60} {ox-150},{oy}", "#8c6a52", 2.5, "#f2d2b6")
    s.add(f"<ellipse cx='{ox-20}' cy='{oy+30}' rx='17' ry='32' fill='#eec4a4' stroke='#8c6a52' stroke-width='2'/>")
    s.text(ox + 5, oy + 146, "side view", 13, "middle", c="#555")
    # length arrow
    yl = oy - 70
    s.line(ox - 150, yl, ox + 155, yl, "#c0392b", 2.5)
    s.path(f"M{ox-150},{yl} l10,-6 l0,12 z", "#c0392b", 1, "#c0392b")
    s.path(f"M{ox+155},{yl} l-10,-6 l0,12 z", "#c0392b", 1, "#c0392b")
    s.text(ox, yl - 10, "head_length (between the eyebrows to the back)", 13, "middle", "bold", c="#c0392b")
    # height
    s.line(ox + 215, oy - 2, ox + 215, oy - 200, "#1e6fb8", 2.5)
    s.path(f"M{ox+215},{oy-200} l-6,10 l12,0 z", "#1e6fb8", 1, "#1e6fb8")
    s.path(f"M{ox+215},{oy-2} l-6,-10 l12,0 z", "#1e6fb8", 1, "#1e6fb8")
    s.line(ox - 50, oy - 2, ox + 225, oy - 2, "#1e6fb8", 1.5, "6,5")
    s.line(ox + 10, oy - 200, ox + 225, oy - 200, "#1e6fb8", 1.5, "6,5")
    s.text(ox + 225, oy - 110, "head_height", 13, weight="bold", c="#1e6fb8")
    s.text(ox + 225, oy - 93, "top of ear -> top", 12, c="#1e6fb8")
    s.text(ox + 225, oy - 76, "of head", 12, c="#1e6fb8")
    # top view
    tx, ty = 700, 225
    s.add(f"<ellipse cx='{tx}' cy='{ty}' rx='95' ry='120' fill='#f2d2b6' stroke='#8c6a52' stroke-width='2.5'/>")
    s.path(f"M{tx-12},{ty-120} l12,-14 l12,14", "#8c6a52", 2.5, "#f2d2b6")
    s.add(f"<ellipse cx='{tx-97}' cy='{ty+5}' rx='8' ry='20' fill='#eec4a4' stroke='#8c6a52' stroke-width='2'/>")
    s.add(f"<ellipse cx='{tx+97}' cy='{ty+5}' rx='8' ry='20' fill='#eec4a4' stroke='#8c6a52' stroke-width='2'/>")
    s.line(tx - 95, ty - 10, tx + 95, ty - 10, "#2e8b57", 2.5)
    s.path(f"M{tx-95},{ty-10} l10,-6 l0,12 z", "#2e8b57", 1, "#2e8b57")
    s.path(f"M{tx+95},{ty-10} l-10,-6 l0,12 z", "#2e8b57", 1, "#2e8b57")
    s.text(tx, ty - 20, "head_width", 13, "middle", "bold", c="#2e8b57")
    s.text(tx, ty + 6, "(widest point)", 12, "middle", c="#2e8b57")
    s.text(tx, ty + 150, "top view (nose up)", 13, "middle", c="#555")
    s.text(450, 488, "Tip: press two hardcover books against your head and measure the gap with a ruler.", 13.5, "middle", c="#333")
    s.text(450, 508, "Defaults: length 190, width 150, height 100. Ten mm either way is fine - foam pads take up the rest.", 12.5, "middle", c="#555")
    s.save(os.path.join(ROOT, "images", "measure.svg"))


def eggcrate():
    s = S(900, 420)
    s.text(450, 32, "How the ribs lock together (egg-crate joint)", 21, "middle", "bold")
    # coronal rib piece (blue) with slot from top
    s.path("M80,300 L80,170 L230,170 L230,230 L262,230 L262,170 L420,170 L420,300 Z", "#2c5a80", 2, "#4682b4")
    s.text(250, 330, "ear-to-ear rib: slot from the OUTER edge", 14, "middle", "bold", c="#2c5a80")
    # sagittal piece (orange) with slot from bottom
    s.path("M480,120 L840,120 L840,240 L676,240 L676,185 L644,185 L644,240 L480,240 Z", "#b26b12", 2, "#f0962a")
    s.text(660, 270, "front-to-back rib: slot from the INNER edge", 14, "middle", "bold", c="#b26b12")
    # arrow
    s.text(450, 380, "Slide them together vertically. Each joint keeps 58 % of the ear-to-ear rib and 42 % of the", 13.5, "middle")
    s.text(450, 400, "other rib, so both stay strong. 0.4 mm clearance: snug by hand, add a drop of glue when happy.", 13.5, "middle")
    s.save(os.path.join(ROOT, "images", "eggcrate.svg"))


def mechanism():
    s = S(900, 360)
    s.text(450, 32, "What the red light does (simplified)", 21, "middle", "bold")
    steps = [("650 nm light", "passes a few mm into\nthe scalp", "#ff4d4d"),
             ("Mitochondria", "cytochrome c oxidase\nabsorbs red light", "#f0962a"),
             ("More ATP, NO", "short ROS burst,\ncell signalling", "#e9c46a"),
             ("Follicle", "longer growth (anagen)\nphase, thicker hair", "#2e8b57")]
    for i, (a, b, c) in enumerate(steps):
        x = 40 + i * 215
        s.rect(x, 80, 180, 150, fill="#fff", c=c, sw=3, r=14)
        s.text(x + 90, 118, a, 16, "middle", "bold", c=INK)
        for k, ln in enumerate(b.split("\n")):
            s.text(x + 90, 150 + 20 * k, ln, 13, "middle", c="#444")
        if i < 3:
            s.path(f"M{x+186},155 L{x+208},155", "#555", 3)
            s.path(f"M{x+208},155 l-9,-6 l0,12 z", "#555", 1, "#555")
    s.text(450, 280, "Effects follow a bell-shaped (biphasic) dose curve: too little does nothing, too much can", 13.5, "middle")
    s.text(450, 300, "cancel the benefit. That is why sessions are timed and capped - longer is NOT better.", 13.5, "middle")
    s.text(450, 330, "Mechanism summary based on Avci et al. 2014 (Lasers Surg Med) and later reviews.", 12, "middle", c="#666")
    s.save(os.path.join(ROOT, "images", "mechanism.svg"))


if __name__ == "__main__":
    schematic()
    wiring()
    cross_section()
    measure()
    eggcrate()
    mechanism()
