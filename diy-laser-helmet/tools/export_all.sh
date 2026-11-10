#!/usr/bin/env bash
# Export every printable part of the DIY LLLT helmet to (binary) STL.
#
# Usage (run from anywhere):
#   tools/export_all.sh                 # default head size (from the .scad file)
#   tools/export_all.sh -D head_length=200 -D head_width=158 -D head_height=105
#   OPENSCAD=/path/to/openscad tools/export_all.sh
#
# Any extra arguments are passed straight to OpenSCAD (e.g. -D overrides).
# Output goes to ./stl (inside the diy-laser-helmet folder) or to $OUT.
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SCAD="$HERE/cad/lllt_helmet.scad"
OUT="${OUT:-$HERE/stl}"
OPENSCAD="${OPENSCAD:-openscad}"
mkdir -p "$OUT"

HELP="$($OPENSCAD --help 2>&1 || true)"
EXTRA=()
# Newer OpenSCAD builds (2023+) have the much faster Manifold backend.
if grep -q -- "--backend" <<<"$HELP"; then EXTRA+=(--backend=manifold); fi
# Binary STL is ~5x smaller than ASCII.
if grep -q -- "--export-format" <<<"$HELP"; then EXTRA+=(--export-format binstl); fi

# part name : how many to print
PARTS=(
  "coronal_1:2" "coronal_2:2" "coronal_3:2" "coronal_4:2"
  "sagittal_center:1" "sagittal_side:2"
  "fit_test:2" "standoff_peg:4" "interlock_clip:1"
  "controller_box:1" "controller_lid:1" "tester_jig:1"
)

first=1
for entry in "${PARTS[@]}"; do
  name="${entry%%:*}"; qty="${entry##*:}"
  echo ">> $name  (print x$qty)"
  log="$($OPENSCAD "${EXTRA[@]}" -D "part=\"$name\"" "$@" -o "$OUT/${name}.stl" "$SCAD" 2>&1 || true)"
  if [ $first -eq 1 ]; then grep -E "ECHO" <<<"$log" || true; first=0; fi
  grep -E "WARNING|ERROR" <<<"$log" || true
done
echo "Done. STL files are in $OUT"
