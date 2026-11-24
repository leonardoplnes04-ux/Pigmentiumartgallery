import { test } from "node:test";
import assert from "node:assert/strict";
import { canZoom, clampView, zoomAt, MIN_ZOOM_SOURCE_PX } from "./zoom.ts";

// A 400×300 image fitted at (100, 150) inside an 600×600 screen.
const IMG = { x: 100, y: 150, w: 400, h: 300 };
const VW = 600;
const VH = 600;

test("canZoom needs a long side of at least 1000 px", () => {
  assert.equal(MIN_ZOOM_SOURCE_PX, 1000);
  assert.equal(canZoom(999, 500), false);
  assert.equal(canZoom(500, 999), false);
  assert.equal(canZoom(1000, 10), true);
  assert.equal(canZoom(10, 2200), true);
  assert.equal(canZoom(undefined, undefined), false);
});

test("zoomAt keeps the point under the cursor fixed", () => {
  const v = zoomAt({ scale: 1, x: 0, y: 0 }, 2, 300, 300, IMG, VW, VH, 4);
  assert.equal(v.scale, 2);
  // Screen point (300,300) maps to the same content point before and after.
  assert.equal((300 - v.x) / v.scale, 300);
  assert.equal((300 - v.y) / v.scale, 300);
});

test("zoomAt clamps the scale to [1, max]", () => {
  assert.equal(zoomAt({ scale: 1, x: 0, y: 0 }, 10, 300, 300, IMG, VW, VH, 3).scale, 3);
  assert.equal(zoomAt({ scale: 2, x: -300, y: -300 }, 0.2, 300, 300, IMG, VW, VH, 3).scale, 1);
});

test("clampView centres an axis where the scaled image is smaller than the screen", () => {
  // scale 1: image 400 wide in a 600 screen → centred: left edge at 100.
  const v = clampView({ scale: 1, x: 37, y: -20 }, IMG, VW, VH);
  assert.equal(v.x + v.scale * IMG.x, (VW - v.scale * IMG.w) / 2);
  assert.equal(v.y + v.scale * IMG.y, (VH - v.scale * IMG.h) / 2);
});

test("clampView keeps image edges outside the screen when it is larger", () => {
  // scale 3: image 1200×900, larger than 600×600 on both axes.
  const tooFarRight = clampView({ scale: 3, x: 500, y: 500 }, IMG, VW, VH);
  assert.equal(tooFarRight.x, -3 * IMG.x); // image left edge at screen left
  assert.equal(tooFarRight.y, -3 * IMG.y);
  const tooFarLeft = clampView({ scale: 3, x: -5000, y: -5000 }, IMG, VW, VH);
  assert.equal(tooFarLeft.x, VW - 3 * (IMG.x + IMG.w)); // right edge at screen right
  assert.equal(tooFarLeft.y, VH - 3 * (IMG.y + IMG.h));
});
