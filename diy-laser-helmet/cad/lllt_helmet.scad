// =====================================================================
//  DIY LLLT (red-light) helmet  -  parametric "egg-crate" frame
//  Every part prints flat on the bed with NO supports (PETG recommended).
//
//  Coordinate system of the head model (used for the assembly view):
//    x = forwards (nose), y = left/right, z = up
//    z = 0 is the level of the TOP OF YOUR EARS.
//  The scalp is modelled as a half-ellipsoid (head_length/2, head_width/2,
//  head_height). The frame's inner face sits `standoff` mm outside it.
//
//  Open in OpenSCAD (2021.01 or newer), use the Customizer to pick `part`,
//  press F6 (Render) then F7 (Export STL).
//  Or run tools/export_all.sh to export every part at once.
// =====================================================================

/* [Part to render] */
part = "assembly"; // [assembly, coronal_1, coronal_2, coronal_3, coronal_4, sagittal_center, sagittal_side, fit_test, standoff_peg, interlock_clip, controller_box, controller_lid, tester_jig, check_interference, diodes_preview, head_preview]

/* [Your head - measure OVER your hair, see guide] */
// Front-to-back: between the eyebrows to the back of the head (mm)
head_length = 190;
// Side-to-side at the widest point above the ears (mm)
head_width = 150;
// Top-of-ear level to the top of the head (mm)
head_height = 100;

/* [Laser module] */
// Barrel diameter of your module (most are 6.0, some 6.5)
diode_d = 6.0;
// Extra bore clearance. Print fit_test first and pick the hole that grips best
diode_fit = 0.15;
// Beam window in the stop lip (must be smaller than diode_d)
aperture_d = 4.6;
// Thickness of the stop lip at the scalp side of every hole
lip = 1.2;

/* [Frame] */
// Gap between scalp and the frame's inner face (room for hair)
standoff = 12;
// Radial depth of each rib (must be > module length + lip)
depth = 14;
// Rib thickness (print height when lying flat)
thick = 11;
// Total clearance in the egg-crate slots
slot_clear = 0.4;
// Spacing of the ear-to-ear (coronal) ribs
coronal_pitch = 23;
// Number of coronal ribs on each half (front and back). Total = 2x
n_coronal_half = 4;
// Distance of the two side (front-to-back) ribs from the midline
side_rib_y = 40;
// Side ribs only cross coronal ribs with |x| up to this value
side_rib_max_x = 58;
// Side ribs are cut off (vertically) at this x, front and back. Must stay
// clear of the next coronal rib: < coronal_x - thick/2 - 1.5
side_end_x = 73;
// Centre rib ends where its inner face is this high (front and back)
center_end_z = 45;
// Maximum spacing of diodes along a rib
diode_pitch = 20;
// Minimum centre-to-centre spacing of two diodes
diode_min_gap = 9.5;
// Lowest diode on ribs that carry strap slots (above ear-top level)
z_treat_inner = 52;
// Lowest diode on the front/back ribs (covers temples and crown)
z_treat_outer = 32;
// Bottom of the coronal rib feet (above ear-top level)
z_foot = 15;
// Coronal ribs (counted from the middle, 1 = middle) that get strap slots
strap_ribs = [1, 2];
// Elastic strap width / thickness
strap_w = 25;
strap_t = 3;
// Fraction of the rib depth kept by the coronal rib at a crossing
split_frac = 0.58;

/* [Quality] */
// Smoothness of the rib curves (number of polygon points)
curve_pts = 360;

/* [Hidden] */
$fn = 40;
eps = 0.01;
BIG = 2000;

// ---------------------------------------------------------------------
// Derived dimensions
// ---------------------------------------------------------------------
A = head_length / 2 + standoff;   // inner-face ellipsoid semi-axes
B = head_width / 2 + standoff;
C = head_height + standoff;
bore_d = diode_d + diode_fit;
hole_wall = 1.5;
R_keep = bore_d / 2 + hole_wall;             // hole radius incl. wall
slot_w = thick + slot_clear;

coronal_xs = [for (k = [0 : n_coronal_half - 1]) coronal_pitch * (k + 0.5)];
all_coronal_x = concat([for (k = [n_coronal_half - 1 : -1 : 0]) -coronal_xs[k]], coronal_xs);

function kx(x) = sqrt(max(0, 1 - x * x / (A * A)));
function ky(y) = sqrt(max(0, 1 - y * y / (B * B)));
function z_in(x, y) = C * sqrt(max(0, 1 - x * x / (A * A) - y * y / (B * B)));
function z_split(x, y) = z_in(x, y) + split_frac * depth;

// sagittal ribs that a coronal rib at x crosses (their y positions)
function cross_y(x) = abs(x) <= side_rib_max_x + eps ? [-side_rib_y, 0, side_rib_y] : [0];
// coronal ribs that a sagittal rib at y crosses (their x positions)
function cross_x(y) = y == 0 ? all_coronal_x
                    : [for (x = all_coronal_x) if (abs(x) <= side_rib_max_x + eps) x];

// ---------------------------------------------------------------------
// Ellipse helpers (angles in degrees, theta = 0 at +u, 90 at the top)
// ---------------------------------------------------------------------
NS = 720;  // samples for arc-length tables (theta from 0 to 180)
function ell_pt(p, q, th) = [p * cos(th), q * sin(th)];
function ell_nrm(p, q, th) = let(n = [cos(th) / p, sin(th) / q]) n / norm(n);  // outward
function ell_tan(p, q, th) = let(t = [-p * sin(th), q * cos(th)]) t / norm(t);  // towards +theta
function arc_table(p, q) =
    let(pts = [for (i = [0 : NS]) ell_pt(p, q, 180 * i / NS)])
    [for (i = 0, s = 0; i <= NS; s = s + (i < NS ? norm(pts[i + 1] - pts[i]) : 0), i = i + 1) s];
function s_of_th(tab, th) =
    let(f = th / 180 * NS, i = max(0, min(NS - 1, floor(f))), r = f - i)
    tab[i] + r * (tab[i + 1] - tab[i]);
function idx_le(tab, s) = let(c = [for (i = [0 : NS - 1]) if (tab[i] <= s) i]) len(c) == 0 ? 0 : c[len(c) - 1];
function th_of_s(tab, s) =
    let(i = idx_le(tab, s), d = tab[i + 1] - tab[i], r = d > 0 ? (s - tab[i]) / d : 0)
    180 * (i + max(0, min(1, r))) / NS;

// ---------------------------------------------------------------------
// Diode placement: allowed arc-length samples -> runs -> evenly spaced
// ---------------------------------------------------------------------
STEP = 0.5;
// Does a hole at theta collide with any obstacle?
// obstacles = [[u_centre, z_split, is_top_slot, half_width], ...]
//   is_top_slot = true  -> obstacle occupies v > z_split (slot cut from the top)
//   is_top_slot = false -> obstacle occupies v < z_split (slot cut from the bottom)
function hole_hits_slot(p, q, th, slots) =
    let(P = ell_pt(p, q, th), m = ell_nrm(p, q, th),
        probe = [for (f = [0, 0.25, 0.5, 0.75, 1]) P + f * depth * m])
    len([for (sl = slots, pt = probe)
            if (abs(pt[0] - sl[0]) < sl[3] + R_keep &&
                (sl[2] ? pt[1] > sl[1] - R_keep : pt[1] < sl[1] + R_keep)) 1]) > 0;

function runs(flags) =
    let(n = len(flags),
        st = [for (k = [0 : n - 1]) if (flags[k] && (k == 0 || !flags[k - 1])) k],
        en = [for (k = [0 : n - 1]) if (flags[k] && (k == n - 1 || !flags[k + 1])) k])
    [for (i = [0 : len(st) - 1]) [st[i], en[i]]];

function place_in_run(a, b) =
    let(L = b - a,
        n = L < 0.01 ? 1 : max(1, min(ceil(L / diode_pitch) + 1, floor(L / diode_min_gap) + 1)))
    n == 1 ? [(a + b) / 2] : [for (k = [0 : n - 1]) a + L * k / (n - 1)];

// returns list of theta values for diode holes
function diode_thetas(p, q, s_a, s_b, slots) =
    let(tab = arc_table(p, q),
        ns = floor((s_b - s_a) / STEP),
        ss = [for (k = [0 : ns]) s_a + k * STEP],
        flags = [for (s = ss) !hole_hits_slot(p, q, th_of_s(tab, s), slots)],
        rr = len([for (f = flags) if (f) 1]) == 0 ? [] : runs(flags),
        pos = [for (r = rr, s = place_in_run(ss[r[0]], ss[r[1]])) s])
    [for (s = pos) th_of_s(tab, s)];

// ---------------------------------------------------------------------
// Rib descriptions
// ---------------------------------------------------------------------
// coronal rib index i (0 = middle) -> [x, p, q]
function cor_dims(i) = let(x = coronal_xs[i]) [x, B * kx(x), C * kx(x)];
function cor_slots(i) = let(x = coronal_xs[i]) [for (y = cross_y(x)) [y, z_split(x, y), true, slot_w / 2]];
function cor_has_strap(i) = len([for (r = strap_ribs) if (r == i + 1) 1]) > 0;
function cor_zone(i) =   // arc-length interval that carries diodes
    let(d = cor_dims(i), p = d[1], q = d[2], tab = arc_table(p, q),
        zt = cor_has_strap(i) ? z_treat_inner : z_treat_outer,
        th0 = asin(min(1, zt / q)))
    [s_of_th(tab, th0), s_of_th(tab, 180 - th0)];
function cor_thetas(i) =
    let(d = cor_dims(i), z = cor_zone(i)) diode_thetas(d[1], d[2], z[0], z[1], cor_slots(i));

// sagittal rib: j = 0 centre, j = 1 side -> [y, p, q, theta_end]
function sag_dims(j) =
    let(y = j == 0 ? 0 : side_rib_y, p = A * ky(y), q = C * ky(y),
        th_end = j == 0 ? asin(min(1, center_end_z / q)) : acos(min(1, side_end_x / p)))
    [y, p, q, th_end];
function sag_slots(j) = let(y = sag_dims(j)[0]) [for (x = cross_x(y)) [x, z_split(x, y), false, slot_w / 2]];
// side ribs: their vertical end cuts act as obstacles for the holes
function sag_obstacles(j) = j == 0 ? sag_slots(j)
    : concat(sag_slots(j), [[side_end_x + BIG / 2, -BIG, true, BIG / 2],
                            [-side_end_x - BIG / 2, -BIG, true, BIG / 2]]);
function sag_thetas(j) =
    let(d = sag_dims(j), p = d[1], q = d[2], tab = arc_table(p, q),
        mg = j == 0 ? R_keep : 0,
        s0 = s_of_th(tab, d[3]) + mg, s1 = s_of_th(tab, 180 - d[3]) - mg)
    diode_thetas(p, q, s0, s1, sag_obstacles(j));

// ---------------------------------------------------------------------
// 2D building blocks
// ---------------------------------------------------------------------
module ell_poly(p, q) polygon([for (i = [0 : curve_pts - 1]) ell_pt(p, q, 360 * i / curve_pts)]);

module band2d(p, q) {
    difference() {
        offset(r = depth, $fn = 64) ell_poly(p, q);
        ell_poly(p, q);
    }
}

// keep the side of the line through P where (X - P) . dir >= 0
module half_plane(P, dir) {
    translate(P) rotate(atan2(dir[1], dir[0])) translate([0, -BIG / 2]) square([BIG, BIG]);
}

module strap_slot2d(p, q, side) {   // side = +1 right foot, -1 left foot
    zc = z_foot + 3.5 + (strap_w + 1.5) / 2;
    th = asin(min(1, zc / q));
    t = side > 0 ? th : 180 - th;
    P = ell_pt(p, q, t);
    m = ell_nrm(p, q, t);
    tg = ell_tan(p, q, t);
    translate(P + m * depth / 2) rotate(atan2(tg[1], tg[0]))
        square([strap_w + 1.5, strap_t + 0.5], center = true);
}

module coronal2d(i) {
    d = cor_dims(i);
    x = d[0]; p = d[1]; q = d[2];
    difference() {
        intersection() {
            band2d(p, q);
            translate([-BIG / 2, z_foot]) square([BIG, BIG]);
        }
        for (sl = cor_slots(i)) translate([sl[0] - slot_w / 2, sl[1]]) square([slot_w, BIG]);
        if (cor_has_strap(i)) for (sd = [-1, 1]) strap_slot2d(p, q, sd);
    }
}

module sagittal2d(j) {
    d = sag_dims(j);
    p = d[1]; q = d[2]; te = d[3];
    difference() {
        intersection() {
            band2d(p, q);
            // NB: children of an `if` are unioned, so the two half planes
            // must be intersected explicitly.
            if (j == 0) intersection() {   // centre rib: ends cut square to the rib
                half_plane(ell_pt(p, q, te), ell_tan(p, q, te));
                half_plane(ell_pt(p, q, 180 - te), -ell_tan(p, q, 180 - te));
            } else {        // side ribs: vertical cuts so they clear the end coronal ribs
                translate([-side_end_x, -BIG / 2]) square([2 * side_end_x, BIG]);
            }
            translate([-BIG / 2, 0]) square([BIG, BIG]);
        }
        for (sl = sag_slots(j)) translate([sl[0] - slot_w / 2, -BIG]) square([slot_w, BIG + sl[1]]);
    }
}

// ---------------------------------------------------------------------
// Diode hole (3D). Axis lies in the rib plane; teardrop points to +Z
// (= print "up" when the rib lies flat) so it prints without support.
// ---------------------------------------------------------------------
module teardrop2d(r) {
    intersection() {
        hull() {
            circle(r = r);
            translate([0, r * sqrt(2) - 0.01]) square(0.02, center = true);
        }
        translate([-r - 1, -r - 1]) square([2 * r + 2, 2 * r + 1 + r * 0.3]);
    }
}

function hole_frame(P, m) = [[-m[1], 0, m[0], P[0]],
                             [ m[0], 0, m[1], P[1]],
                             [    0, 1,    0, thick / 2],
                             [    0, 0,    0, 1]];

// hole starting at 2D point P (inner face), going along outward normal m
module diode_hole_at(P, m, bore = bore_d) {
    multmatrix(hole_frame(P, m)) {
        translate([0, 0, -2]) linear_extrude(lip + 2 + eps) teardrop2d(aperture_d / 2);
        translate([0, 0, lip]) linear_extrude(depth + 6) teardrop2d(bore / 2);
        // small lead-in chamfer at the outer face
        translate([0, 0, depth - 0.8]) cylinder(d1 = bore, d2 = bore + 2.4, h = 1.2 + eps);
    }
}

module diode_hole(p, q, th) diode_hole_at(ell_pt(p, q, th), ell_nrm(p, q, th));

// part label: small engraved dots on the top face (1 dot = rib 1 ...)
module dot_marks(P, n) {
    for (k = [0 : n - 1]) translate([P[0] + (k - (n - 1) / 2) * 3, P[1], thick - 0.6])
        cylinder(d = 1.6, h = 1, $fn = 16);
}

// ---------------------------------------------------------------------
// 3D parts (local frame: profile in XY, thickness along +Z = print up)
// ---------------------------------------------------------------------
module coronal_part(i) {
    d = cor_dims(i);
    p = d[1]; q = d[2];
    difference() {
        linear_extrude(thick) coronal2d(i);
        for (th = cor_thetas(i)) diode_hole(p, q, th);
        // index marks near both feet
        for (sd = [-1, 1]) let(t = sd > 0 ? asin(min(1, (z_foot + 2.5) / q)) : 180 - asin(min(1, (z_foot + 2.5) / q)))
            dot_marks(ell_pt(p, q, t) + ell_nrm(p, q, t) * depth * 0.5 + [0, 0], i + 1);
    }
}

module sagittal_part(j) {
    d = sag_dims(j);
    p = d[1]; q = d[2];
    difference() {
        linear_extrude(thick) sagittal2d(j);
        for (th = sag_thetas(j)) diode_hole(p, q, th);
        // "S" marks: 5 dots for centre rib, 6 for side rib, at the top
        dot_marks(ell_pt(p, q, 90) + [0, depth * 0.5] + [0, 0], j == 0 ? 5 : 6);
    }
}

// ---------------------------------------------------------------------
// World placement (assembly)
// ---------------------------------------------------------------------
function coronal_world(x) = [[0, 0, 1, x - thick / 2], [1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 0, 1]];
function sagittal_world(y) = [[1, 0, 0, 0], [0, 0, -1, y + thick / 2], [0, 1, 0, 0], [0, 0, 0, 1]];

module all_coronal() {
    for (i = [0 : n_coronal_half - 1], sg = [-1, 1])
        multmatrix(coronal_world(sg * coronal_xs[i])) coronal_part(i);
}
module all_sagittal() {
    multmatrix(sagittal_world(0)) sagittal_part(0);
    for (sg = [-1, 1]) multmatrix(sagittal_world(sg * side_rib_y)) sagittal_part(1);
}

// Visual only: laser modules sitting in every hole (for renders)
diode_len_preview = 10.5;
module diode_dummy() {
    translate([0, 0, lip]) cylinder(d = diode_d, h = diode_len_preview, $fn = 20);
    for (sx = [-1, 1]) translate([sx * 1.2, 0, lip + diode_len_preview - eps])
        cylinder(d = 1.2, h = 9, $fn = 8);
}
module diodes_preview() {
    for (i = [0 : n_coronal_half - 1], sg = [-1, 1]) {
        d = cor_dims(i);
        multmatrix(coronal_world(sg * coronal_xs[i]))
            for (th = cor_thetas(i))
                multmatrix(hole_frame(ell_pt(d[1], d[2], th), ell_nrm(d[1], d[2], th))) diode_dummy();
    }
    for (j = [0, 1], sg = j == 0 ? [1] : [-1, 1]) {
        d = sag_dims(j);
        multmatrix(sagittal_world(sg * d[0]))
            for (th = sag_thetas(j))
                multmatrix(hole_frame(ell_pt(d[1], d[2], th), ell_nrm(d[1], d[2], th))) diode_dummy();
    }
}

module head_ghost() {
    a = head_length / 2; b = head_width / 2; c = head_height;
    color([0.85, 0.7, 0.6, 0.5]) {
        intersection() {
            scale([a, b, c]) sphere(r = 1, $fn = 64);
            translate([-a - 1, -b - 1, 0]) cube([2 * a + 2, 2 * b + 2, c + 1]);
        }
        translate([0, 0, -70]) scale([a, b, 1]) cylinder(r = 1, h = 70 + eps, $fn = 64);
    }
}

// =====================================================================
//  Small parts
// =====================================================================

// Fit test coupon: 4 holes with bore = diode_d + 0.0/0.1/0.2/0.3 mm
// (1..4 dots) and one egg-crate slot. Print two, cross them at the slots.
module fit_test() {
    L = 64;
    difference() {
        cube([L, depth, thick]);
        for (k = [0 : 3]) {
            x = 8 + k * 12;
            diode_hole_at([x, 0], [0, 1], diode_d + 0.1 * k);
            dot_marks([x, depth - 2], k + 1);
        }
        translate([57 - slot_w / 2, depth / 2, -1]) cube([slot_w, depth, thick + 2]);
    }
}

// Standoff peg (2 pieces, printed side by side). The shaft goes into a
// diode hole from the OUTSIDE, exactly like a laser module, and pokes
// through the beam window. The foot is pressed onto the tip from the
// scalp side. The foot rests on your head and keeps the frame at the
// design distance. Use 3-4 near the crown instead of diodes.
peg_foot_d = 10;
peg_foot_t = 3;
peg_tip_d = aperture_d - 0.4;
module peg_shaft() {
    body_h = 8;
    tip_h = lip + standoff - (peg_foot_t - 2.5);
    cylinder(d = bore_d - 0.15, h = body_h, $fn = 40);
    translate([0, 0, body_h - eps]) cylinder(d = peg_tip_d, h = tip_h, $fn = 32);
}
module peg_foot() {
    difference() {
        union() {
            cylinder(d1 = peg_foot_d - 2, d2 = peg_foot_d, h = 1, $fn = 48);
            translate([0, 0, 1 - eps]) cylinder(d = peg_foot_d, h = peg_foot_t - 1, $fn = 48);
        }
        // socket for the tip (snug: 0.1 mm interference)
        translate([0, 0, peg_foot_t - 2.5]) cylinder(d = peg_tip_d - 0.1, h = 3, $fn = 32);
    }
}
module standoff_peg() {
    peg_shaft();
    translate([peg_foot_d + 4, 0, 0]) peg_foot();
}

// Interlock clip: snaps over a rib (open side at the rib's outer face) and
// carries a KW11-3Z lever micro switch beside the rib. Put it on a
// coronal_3 foot, between the foot end and the first diode (that stretch
// is diode-free). Slide the switch in its slots so the lever presses
// lightly on your head when the helmet is on.
clip_len = 15;
module interlock_clip() {
    w = 2;              // wall
    gi = thick + 0.4;   // inner gap across the rib thickness
    di = depth + 0.3;   // inner radial length
    ext = 7;            // how far the switch plate sticks out past the rib's inner face
    linear_extrude(clip_len) difference() {
        union() {
            // U around the rib: base at the scalp side (y < 0), arms along the flat faces
            translate([-w, -w]) square([gi + 2 * w, w]);                  // base
            translate([-w, -w - ext]) square([w, di + w + ext]);          // arm 1 + switch plate
            translate([gi, -w]) square([w, di + w]);                      // arm 2
            // snap hooks at the outer edge
            for (x = [0, gi - 0.8]) translate([x, di - 0.2]) square([0.8, 1.2]);
        }
        // nothing else
    }
}
module interlock_clip_holes() {
    // two radial slots through the switch plate, 9.5 mm apart along the rib
    w = 2; ext = 7;
    for (zc = [clip_len / 2 - 4.75, clip_len / 2 + 4.75])
        hull() for (yy = [-ext - w + 3.5, 4.5])
            translate([-w - 1, yy, zc]) rotate([0, 90, 0]) cylinder(d = 2.3, h = w + 2, $fn = 16);
}
module interlock_clip_part() difference() { interlock_clip(); interlock_clip_holes(); }

// Controller box: holds a 50x70 mm perfboard (Nano, MOSFET, fuse) and the
// optional buck converter / USB-C PD trigger. Zip-tie slots in the floor
// let you strap it to the centre rib at the back of the helmet.
box_in = [122, 62, 30];  // inner size: 70x50 perfboard + buck converter beside it
box_wall = 2.2;
box_floor = 2;
box_r = 3;
post_d = 6.5;
post_hole = 2.6;          // M3 self-tapping
board_holes = [66, 46];   // 5x7 cm perfboard hole spacing
module rounded_box(size, r) {
    linear_extrude(size[2]) offset(r = r) offset(delta = -r) square([size[0], size[1]]);
}
module controller_box() {
    o = [box_in[0] + 2 * box_wall, box_in[1] + 2 * box_wall, box_in[2] + box_floor];
    difference() {
        union() {
            difference() {
                rounded_box(o, box_r + box_wall);
                translate([box_wall, box_wall, box_floor]) rounded_box([box_in[0], box_in[1], BIG], box_r);
            }
            // lid screw posts in the corners
            for (x = [box_wall + post_d / 2, o[0] - box_wall - post_d / 2],
                 y = [box_wall + post_d / 2, o[1] - box_wall - post_d / 2])
                translate([x, y, 0]) cylinder(d = post_d, h = o[2], $fn = 32);
            // perfboard standoffs (board sits 5 mm above the floor)
            for (x = [0, board_holes[0]], y = [0, board_holes[1]])
                translate([box_wall + 8 + x, box_wall + 8 + y, 0]) cylinder(d = 6, h = box_floor + 5, $fn = 32);
        }
        // post / standoff pilot holes
        for (x = [box_wall + post_d / 2, o[0] - box_wall - post_d / 2],
             y = [box_wall + post_d / 2, o[1] - box_wall - post_d / 2])
            translate([x, y, box_floor]) cylinder(d = post_hole, h = BIG, $fn = 16);
        for (x = [0, board_holes[0]], y = [0, board_holes[1]])
            translate([box_wall + 8 + x, box_wall + 8 + y, 1]) cylinder(d = 2.4, h = BIG, $fn = 16);
        // end wall at x = max: USB-C power input (from power bank)
        translate([o[0] - box_wall - 1, o[1] / 2 - 6.5, box_floor + 2]) cube([box_wall + 2, 13, 7]);
        // end wall at x = 0: Nano USB (programming) + harness to the helmet
        translate([-1, box_wall + 8 + board_holes[1] / 2 - 7, box_floor + 7]) cube([box_wall + 2, 14, 15]);
        translate([-1, o[1] - box_wall - 9, box_floor + 15]) rotate([0, 90, 0]) cylinder(d = 8, h = box_wall + 2);
        // side vents near the buck converter end
        for (k = [0 : 6], y = [-1, o[1] - box_wall - 1])
            translate([o[0] - 46 + k * 5, y, box_floor + 10]) cube([2.2, box_wall + 2, 14]);
        // zip-tie slot pairs in the floor (strap the box to a rib)
        for (x = [18, o[0] - 18], dy = [-6.5, 6.5])
            translate([x - 2, o[1] / 2 + dy - 1.5, -1]) cube([4, 3, box_floor + 2]);
    }
}

module controller_lid() {
    o = [box_in[0] + 2 * box_wall, box_in[1] + 2 * box_wall];
    t = 2;
    difference() {
        union() {
            rounded_box([o[0], o[1], t], box_r + box_wall);
            // locating lip that drops inside the box walls
            translate([box_wall + 0.35, box_wall + 0.35, t - eps]) difference() {
                rounded_box([box_in[0] - 0.7, box_in[1] - 0.7, 3], box_r);
                translate([1.6, 1.6, -1]) rounded_box([box_in[0] - 3.9, box_in[1] - 3.9, 5], max(0.5, box_r - 1.6));
                // notches for the corner posts
                for (x = [post_d / 2 - 0.35, box_in[0] - post_d / 2 - 0.35],
                     y = [post_d / 2 - 0.35, box_in[1] - post_d / 2 - 0.35])
                    translate([x, y, -1]) cylinder(d = post_d + 1, h = 5, $fn = 32);
            }
        }
        // screw holes (M3) with countersink on the outside (z = 0 face)
        for (x = [box_wall + post_d / 2, o[0] - box_wall - post_d / 2],
             y = [box_wall + post_d / 2, o[1] - box_wall - post_d / 2])
            translate([x, y, -1]) {
                cylinder(d = 3.3, h = 10, $fn = 20);
                cylinder(d1 = 6.6, d2 = 3.3, h = 1 + 1.6, $fn = 20);
            }
        // 12 mm push button, 5 mm LED, buzzer grille
        translate([o[0] * 0.30, o[1] / 2, -1]) cylinder(d = 12.3, h = 10, $fn = 48);
        translate([o[0] * 0.30, o[1] / 2 + 15, -1]) cylinder(d = 5.2, h = 10, $fn = 24);
        for (dx = [-4 : 2 : 4], dy = [-4 : 2 : 4])
            if (dx * dx + dy * dy <= 16)
                translate([o[0] * 0.62 + dx * 1.4, o[1] / 2 + dy * 1.4, -1]) cylinder(d = 1.8, h = 10, $fn = 12);
    }
}

// Diode tester jig: holds one laser module pointing down at a BPW34
// photodiode, light-tight. Used with firmware/diode_tester.
module tester_jig() {
    s = 28; h = 24;
    pd = [9.6, 4.7, 3.5];   // BPW34 pocket incl. lead clearance (body 5.4 x 4.3 x 3.2)
    gap_top = pd[2] + 4.2;  // module front face height above the jig bottom
    difference() {
        translate([-s / 2, -s / 2, 0]) cube([s, s, h]);
        // photodiode pocket, open at the bottom
        translate([-pd[0] / 2, -pd[1] / 2, -1]) cube([pd[0], pd[1], pd[2] + 1]);
        // beam channel
        translate([0, 0, pd[2] - eps]) cylinder(d = aperture_d, h = gap_top - pd[2] + 2 * eps, $fn = 32);
        // module bore + lead-in
        translate([0, 0, gap_top]) cylinder(d = bore_d, h = h, $fn = 40);
        translate([0, 0, h - 1]) cylinder(d1 = bore_d, d2 = bore_d + 2, h = 1 + eps, $fn = 40);
        // wire channel for the photodiode leads along the bottom
        translate([-1.5, -s / 2 - 1, -1]) cube([3, s / 2, 2.5]);
    }
}

// ---------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------
n_cor = [for (i = [0 : n_coronal_half - 1]) len(cor_thetas(i))];
n_sag = [len(sag_thetas(0)), len(sag_thetas(1))];
n_total = 2 * [for (v = n_cor) 1] * n_cor + n_sag[0] + 2 * n_sag[1];
echo(str("DIODES per coronal rib (middle->front): ", n_cor, "  (each printed twice)"));
echo(str("DIODES centre rib: ", n_sag[0], "  side rib: ", n_sag[1], " (printed twice)"));
echo(str("DIODES TOTAL: ", n_total));

// ---------------------------------------------------------------------
// Part selector
// ---------------------------------------------------------------------
if (part == "assembly") {
    color("SteelBlue") all_coronal();
    color("Orange") all_sagittal();
    %head_ghost();
} else if (part == "coronal_1") coronal_part(0);
else if (part == "coronal_2") coronal_part(1);
else if (part == "coronal_3") coronal_part(2);
else if (part == "coronal_4") coronal_part(3);
else if (part == "sagittal_center") sagittal_part(0);
else if (part == "sagittal_side") sagittal_part(1);
else if (part == "fit_test") fit_test();
else if (part == "standoff_peg") standoff_peg();
else if (part == "interlock_clip") interlock_clip_part();
else if (part == "controller_box") controller_box();
else if (part == "controller_lid") controller_lid();
else if (part == "tester_jig") tester_jig();
else if (part == "check_interference") intersection() { all_coronal(); all_sagittal(); }
else if (part == "diodes_preview") diodes_preview();
else if (part == "head_preview") head_ghost();
