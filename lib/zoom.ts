// Pure zoom/pan math shared by the artwork magnifier and the full-screen
// viewer. No imports, so Node can run its tests directly (lib/zoom.test.mjs).
//
// Coordinate model (full-screen viewer): the whole screen is a "stage" that
// is transformed with `translate(x, y) scale(scale)` from its top-left
// corner. `img` is where the fitted image sits on the stage at scale 1.

// Photos whose long side is smaller than this get no zoom at all: there is
// not enough real detail in them to be worth magnifying.
export const MIN_ZOOM_SOURCE_PX = 1000;

export interface View {
  scale: number;
  x: number;
  y: number;
}

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export function canZoom(width?: number, height?: number): boolean {
  if (!width || !height) return false;
  return Math.max(width, height) >= MIN_ZOOM_SOURCE_PX;
}

// One axis: centre the image if it is narrower than the screen, otherwise
// keep its edges at or beyond the screen edges (no empty gap while panning).
function clampAxis(t: number, scale: number, start: number, size: number, screen: number) {
  const scaled = scale * size;
  if (scaled <= screen) return (screen - scaled) / 2 - scale * start;
  const min = screen - scale * (start + size);
  const max = -scale * start;
  return Math.min(max, Math.max(min, t));
}

export function clampView(v: View, img: Rect, vw: number, vh: number): View {
  return {
    scale: v.scale,
    x: clampAxis(v.x, v.scale, img.x, img.w, vw),
    y: clampAxis(v.y, v.scale, img.y, img.h, vh),
  };
}

// New view at `nextScale` (limited to [1, max]) that keeps the screen point
// (px, py) over the same spot of the picture, then clamped.
export function zoomAt(
  v: View,
  nextScale: number,
  px: number,
  py: number,
  img: Rect,
  vw: number,
  vh: number,
  max: number
): View {
  const scale = Math.min(max, Math.max(1, nextScale));
  const contentX = (px - v.x) / v.scale;
  const contentY = (py - v.y) / v.scale;
  return clampView({ scale, x: px - contentX * scale, y: py - contentY * scale }, img, vw, vh);
}
