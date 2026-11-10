#!/usr/bin/env python3
"""Render STL files to shaded PNG images (no OpenGL needed).

Usage:
  python3 render_stl.py out.png part1.stl[:color] [part2.stl[:color] ...]
         [--view elev,azim] [--size 900] [--title "text"]

Requires: numpy, matplotlib, trimesh  (pip install numpy matplotlib trimesh)
A tiny numpy z-buffer rasteriser is used, so overlapping parts render correctly.
"""
import argparse
import numpy as np
import trimesh
from PIL import Image, ImageDraw, ImageFont

COLORS = {
    "blue": (70, 130, 180), "orange": (240, 150, 40), "grey": (150, 150, 150),
    "red": (200, 40, 40), "skin": (225, 190, 160), "green": (60, 160, 90),
    "white": (235, 235, 235), "dark": (60, 60, 70), "brass": (200, 160, 60),
}


def rot_matrix(elev, azim):
    e, a = np.radians(elev), np.radians(azim)
    # camera looks from direction (azim, elev); build world->view rotation
    rz = np.array([[np.cos(-a), -np.sin(-a), 0], [np.sin(-a), np.cos(-a), 0], [0, 0, 1]])
    # after rz the camera is on +x; rotate so camera looks along -x... map to view
    rx = np.array([[1, 0, 0], [0, np.cos(e), -np.sin(e)], [0, np.sin(e), np.cos(e)]])
    # view axes: X right, Y up, Z towards viewer
    to_view = np.array([[0, 1, 0], [0, 0, 1], [1, 0, 0]])
    return rx @ to_view @ rz


def render(meshes, size=900, elev=25, azim=-60, bg=(255, 255, 255), margin=0.06):
    R = rot_matrix(elev, azim)
    allv = np.vstack([m[0].vertices for m in meshes])
    vv = allv @ R.T
    lo, hi = vv.min(0), vv.max(0)
    span = max(hi[0] - lo[0], hi[1] - lo[1])
    scale = size * (1 - 2 * margin) / span
    cx, cy = (lo[0] + hi[0]) / 2, (lo[1] + hi[1]) / 2
    W = H = size
    zbuf = np.full((H, W), -np.inf)
    img = np.zeros((H, W, 3), dtype=np.float64)
    img[:] = bg
    light = np.array([-0.4, 0.6, 0.7])
    light /= np.linalg.norm(light)
    for mesh, color in meshes:
        v = mesh.vertices @ R.T
        sx = (v[:, 0] - cx) * scale + W / 2
        sy = H / 2 - (v[:, 1] - cy) * scale
        sz = v[:, 2]
        f = mesh.faces
        n = mesh.face_normals @ R.T
        shade = np.clip(np.abs(n @ light), 0, 1)
        col = np.array(color, dtype=np.float64)
        tri_x, tri_y, tri_z = sx[f], sy[f], sz[f]
        x0 = np.clip(np.floor(tri_x.min(1)).astype(int), 0, W - 1)
        x1 = np.clip(np.ceil(tri_x.max(1)).astype(int), 0, W - 1)
        y0 = np.clip(np.floor(tri_y.min(1)).astype(int), 0, H - 1)
        y1 = np.clip(np.ceil(tri_y.max(1)).astype(int), 0, H - 1)
        for t in range(len(f)):
            if x1[t] < x0[t] or y1[t] < y0[t]:
                continue
            xs = np.arange(x0[t], x1[t] + 1)
            ys = np.arange(y0[t], y1[t] + 1)
            X, Y = np.meshgrid(xs + 0.5, ys + 0.5)
            (ax, bx, cx_), (ay, by, cy_) = tri_x[t], tri_y[t]
            den = (by - cy_) * (ax - cx_) + (cx_ - bx) * (ay - cy_)
            if abs(den) < 1e-12:
                continue
            w1 = ((by - cy_) * (X - cx_) + (cx_ - bx) * (Y - cy_)) / den
            w2 = ((cy_ - ay) * (X - cx_) + (ax - cx_) * (Y - cy_)) / den
            w3 = 1 - w1 - w2
            inside = (w1 >= -1e-6) & (w2 >= -1e-6) & (w3 >= -1e-6)
            if not inside.any():
                continue
            z = w1 * tri_z[t, 0] + w2 * tri_z[t, 1] + w3 * tri_z[t, 2]
            sub = zbuf[y0[t]:y1[t] + 1, x0[t]:x1[t] + 1]
            upd = inside & (z > sub)
            if not upd.any():
                continue
            sub[upd] = z[upd]
            s = 0.35 + 0.65 * shade[t]
            img[y0[t]:y1[t] + 1, x0[t]:x1[t] + 1][upd] = col * s
    # simple edge darkening (outline) from depth discontinuities
    zb = np.where(np.isfinite(zbuf), zbuf, np.nan)
    edge = np.zeros((H, W), bool)
    for dy, dx in ((0, 1), (1, 0)):
        a = zb[: H - dy, : W - dx]
        b = zb[dy:, dx:]
        d = np.abs(a - b)
        e = (np.isnan(a) != np.isnan(b)) | (d > 3.0)
        edge[: H - dy, : W - dx] |= e
    img[edge] *= 0.35
    return Image.fromarray(np.clip(img, 0, 255).astype(np.uint8))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("out")
    ap.add_argument("parts", nargs="+")
    ap.add_argument("--view", default="25,-60")
    ap.add_argument("--size", type=int, default=900)
    ap.add_argument("--title", default="")
    a = ap.parse_args()
    meshes = []
    for p in a.parts:
        # path[:color[:dx,dy,dz]]
        bits = p.split(":")
        path = bits[0]
        cname = bits[1] if len(bits) > 1 and bits[1] else "blue"
        m = trimesh.load(path, force="mesh")
        if len(bits) > 2 and bits[2]:
            m.apply_translation([float(x) for x in bits[2].split(",")])
        meshes.append((m, COLORS.get(cname, COLORS["blue"])))
    elev, azim = (float(x) for x in a.view.split(","))
    im = render(meshes, a.size, elev, azim)
    if a.title:
        d = ImageDraw.Draw(im)
        try:
            font = ImageFont.truetype("DejaVuSans.ttf", 26)
        except OSError:
            font = ImageFont.load_default()
        d.text((20, 16), a.title, fill=(30, 30, 30), font=font)
    im.save(a.out, optimize=True)
    print("wrote", a.out, im.size)


if __name__ == "__main__":
    main()
