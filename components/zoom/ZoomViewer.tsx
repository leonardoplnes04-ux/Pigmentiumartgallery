"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { imageDimensions } from "@/data/imageDimensions";
import { useLanguage } from "@/hooks/useLanguage";
import { canZoom, clampView, zoomAt, type Rect, type View } from "@/lib/zoom";

// Full-screen artwork viewer with real zoom: wheel or pinch to zoom at a
// point, double-click / double-tap to toggle fit ↔ maximum, drag to pan,
// [−] % [+] Fit controls and the + − 0 keys. The maximum is the photo's real
// resolution (1 photo pixel = 1 CSS pixel), so it never shows pixelation.
// Photos below MIN_ZOOM_SOURCE_PX render exactly as before (no zoom).
//
// Fills its (fixed, full-screen) parent. A click on the empty background
// calls `onClose`; a click on the picture or at the end of a drag does not.

const FIT_PADDING = { phone: 16, wide: 32 };
const DOUBLE_TAP_MS = 300;
const TAP_SLOP_PX = 6;
const STEP = 1.6;

interface Size {
  w: number;
  h: number;
}

export default function ZoomViewer({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const known = imageDimensions[src];
  const [natural, setNatural] = useState<Size | null>(known ? { w: known.w, h: known.h } : null);
  const [screen, setScreen] = useState<Size | null>(null);
  const [view, setView] = useState<View>({ scale: 1, x: 0, y: 0 });
  const [animate, setAnimate] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  // Track the viewer's size (rotation, resize).
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const update = () => setScreen({ w: el.clientWidth, h: el.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Where the fitted (scale 1) picture sits, and how far it can zoom.
  let fit = 1;
  let img: Rect | null = null;
  if (natural && screen) {
    const pad = screen.w < 640 ? FIT_PADDING.phone : FIT_PADDING.wide;
    fit = Math.min((screen.w - pad * 2) / natural.w, (screen.h - pad * 2) / natural.h, 1);
    const w = natural.w * fit;
    const h = natural.h * fit;
    img = { x: (screen.w - w) / 2, y: (screen.h - h) / 2, w, h };
  }
  const max = 1 / fit;
  const zoomable = Boolean(natural && canZoom(natural.w, natural.h) && max > 1.1);

  // Keep the view valid when the screen size changes.
  useEffect(() => {
    if (!img || !screen) return;
    setView((v) => clampView(v, img!, screen.w, screen.h));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen?.w, screen?.h, natural?.w]);

  const zoomTo = useCallback(
    (nextScale: number, px?: number, py?: number, smooth = false) => {
      if (!img || !screen) return;
      setAnimate(smooth);
      setView((v) =>
        zoomAt(v, nextScale, px ?? screen.w / 2, py ?? screen.h / 2, img!, screen.w, screen.h, max)
      );
    },
    [img, screen, max]
  );

  // Wheel zoom (native listener: React's onWheel is passive, can't cancel
  // the page scroll behind).
  useEffect(() => {
    const el = boxRef.current;
    if (!el || !zoomable) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const factor = Math.exp(-e.deltaY * 0.0015);
      setAnimate(false);
      setView((v) =>
        img && screen
          ? zoomAt(v, v.scale * factor, e.clientX - rect.left, e.clientY - rect.top, img, screen.w, screen.h, max)
          : v
      );
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [zoomable, img, screen, max]);

  // Keyboard: + / − / 0.
  useEffect(() => {
    if (!zoomable) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "+" || e.key === "=") zoomTo(view.scale * STEP, undefined, undefined, true);
      else if (e.key === "-" || e.key === "_") zoomTo(view.scale / STEP, undefined, undefined, true);
      else if (e.key === "0") zoomTo(1, undefined, undefined, true);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [zoomable, zoomTo, view.scale]);

  // Pointer gestures: one pointer drags (when zoomed), two pointers pinch.
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef({ moved: false, startX: 0, startY: 0, pinchDist: 0, pinchMidX: 0, pinchMidY: 0 });
  const lastTap = useRef({ time: 0, x: 0, y: 0 });

  const local = (e: React.PointerEvent) => {
    const rect = boxRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const pinchState = () => {
    const [a, b] = [...pointers.current.values()];
    return { dist: Math.hypot(a.x - b.x, a.y - b.y), midX: (a.x + b.x) / 2, midY: (a.y + b.y) / 2 };
  };

  const onPointerDown = (e: React.PointerEvent) => {
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Capture is a nicety (keeps the drag when leaving the box); never block the gesture.
    }
    const p = local(e);
    pointers.current.set(e.pointerId, p);
    if (pointers.current.size === 1) {
      gesture.current = { ...gesture.current, moved: false, startX: p.x, startY: p.y };
    } else if (pointers.current.size === 2) {
      const s = pinchState();
      gesture.current = { ...gesture.current, moved: true, pinchDist: s.dist, pinchMidX: s.midX, pinchMidY: s.midY };
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId) || !img || !screen) return;
    const prev = pointers.current.get(e.pointerId)!;
    const p = local(e);
    pointers.current.set(e.pointerId, p);
    setAnimate(false);

    if (pointers.current.size >= 2) {
      const s = pinchState();
      const g = gesture.current;
      const ratio = g.pinchDist > 0 ? s.dist / g.pinchDist : 1;
      setView((v) => {
        const zoomed = zoomAt(v, v.scale * ratio, g.pinchMidX, g.pinchMidY, img, screen.w, screen.h, max);
        return clampView(
          { ...zoomed, x: zoomed.x + (s.midX - g.pinchMidX), y: zoomed.y + (s.midY - g.pinchMidY) },
          img,
          screen.w,
          screen.h
        );
      });
      gesture.current = { ...g, pinchDist: s.dist, pinchMidX: s.midX, pinchMidY: s.midY };
      return;
    }

    const g = gesture.current;
    if (Math.hypot(p.x - g.startX, p.y - g.startY) > TAP_SLOP_PX) g.moved = true;
    if (view.scale > 1) {
      setView((v) => clampView({ ...v, x: v.x + (p.x - prev.x), y: v.y + (p.y - prev.y) }, img, screen.w, screen.h));
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return;
    const p = local(e);
    pointers.current.delete(e.pointerId);
    if (pointers.current.size > 0 || gesture.current.moved || !img) return;

    // A tap / click that did not move.
    const onPicture =
      p.x >= view.x + view.scale * img.x &&
      p.x <= view.x + view.scale * (img.x + img.w) &&
      p.y >= view.y + view.scale * img.y &&
      p.y <= view.y + view.scale * (img.y + img.h);
    if (!onPicture) {
      onClose();
      return;
    }
    const now = performance.now();
    const last = lastTap.current;
    if (now - last.time < DOUBLE_TAP_MS && Math.hypot(p.x - last.x, p.y - last.y) < 30) {
      zoomTo(view.scale > 1.01 ? 1 : max, p.x, p.y, true);
      lastTap.current = { time: 0, x: 0, y: 0 };
    } else {
      lastTap.current = { time: now, x: p.x, y: p.y };
    }
  };

  const onPointerCancel = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
  };

  // Not zoomable (small photo, or not loaded yet): the old plain view.
  if (!zoomable || !img) {
    return (
      <div
        ref={boxRef}
        className="absolute inset-0 flex items-center justify-center p-4 sm:p-8"
        onClick={onClose}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          draggable={false}
          decoding="async"
          onLoad={(e) => {
            if (!natural) setNatural({ w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight });
          }}
          onClick={(e) => e.stopPropagation()}
          className="max-h-full max-w-full object-contain"
        />
      </div>
    );
  }

  const percent = Math.round(view.scale * 100);
  const control =
    "flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm transition hover:bg-white/20 disabled:opacity-40";

  return (
    <>
      <div
        ref={boxRef}
        className="absolute inset-0 select-none overflow-hidden"
        style={{ touchAction: "none", cursor: view.scale > 1 ? "grab" : "zoom-in" }}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        {/* The picture is laid out at its natural size and scaled down, so
            zooming reveals real pixels instead of an upscaled thumbnail. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          draggable={false}
          decoding="async"
          className="pointer-events-none absolute left-0 top-0 max-w-none origin-top-left"
          style={{
            width: natural!.w,
            height: natural!.h,
            transform: `translate(${view.x + view.scale * img.x}px, ${view.y + view.scale * img.y}px) scale(${view.scale * fit})`,
            transition: animate ? "transform 220ms ease-out" : "none",
          }}
        />
      </div>

      <div
        className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full bg-black/60 p-1 text-white shadow-lg backdrop-blur-md"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label={t.detail.zoomOutAria}
          disabled={view.scale <= 1.001}
          onClick={() => zoomTo(view.scale / STEP, undefined, undefined, true)}
          className={control}
        >
          −
        </button>
        <span className="w-14 text-center text-xs tabular-nums">{percent}%</span>
        <button
          type="button"
          aria-label={t.detail.zoomInAria}
          disabled={view.scale >= max - 0.001}
          onClick={() => zoomTo(view.scale * STEP, undefined, undefined, true)}
          className={control}
        >
          +
        </button>
        <button
          type="button"
          aria-label={t.detail.zoomFitAria}
          disabled={view.scale <= 1.001}
          onClick={() => zoomTo(1, undefined, undefined, true)}
          className={`${control} text-xs uppercase tracking-widest`}
        >
          {t.detail.zoomFit}
        </button>
      </div>
    </>
  );
}
