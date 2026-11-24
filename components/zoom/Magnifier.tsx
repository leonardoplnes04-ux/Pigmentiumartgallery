"use client";

import { useRef, useState } from "react";
import { imageDimensions } from "@/data/imageDimensions";
import { useLanguage } from "@/hooks/useLanguage";
import { canZoom } from "@/lib/zoom";

// Artwork image with a magnifying lens (lupa).
// - Mouse: the lens follows the cursor while hovering; a click still opens
//   full screen (`onOpen`).
// - Touch: a lens button (only on devices without hover) turns lens mode on;
//   while on, dragging a finger moves the lens, drawn ABOVE the finger so the
//   finger never hides what is being magnified, and the page doesn't scroll.
//   With lens mode off, a tap opens full screen as before.
// The lens shows the photo at up to its real resolution (capped at
// LENS_MAX_MAGNIFICATION so the sampled area stays readable). Photos below
// MIN_ZOOM_SOURCE_PX get no lens.

const LENS_MAX_MAGNIFICATION = 4;
const LENS_MIN_MAGNIFICATION = 1.2;
const LENS_SIZE = { mouse: 180, touch: 140 };
const TOUCH_LIFT_PX = 110; // how far above the finger the lens is drawn

interface Lens {
  // Where the lens is drawn (viewport coords, centre) and which point of the
  // displayed image it magnifies (image-local coords).
  cx: number;
  cy: number;
  ix: number;
  iy: number;
  size: number;
}

export default function Magnifier({
  src,
  alt,
  className,
  loading,
  onOpen,
  buttonClassName = "absolute bottom-3 right-3",
}: {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  onOpen: () => void;
  buttonClassName?: string;
}) {
  const { t } = useLanguage();
  const known = imageDimensions[src];
  const [natural, setNatural] = useState(known ? { w: known.w, h: known.h } : null);
  const [lensMode, setLensMode] = useState(false);
  const [lens, setLens] = useState<Lens | null>(null);
  const [display, setDisplay] = useState({ w: 0, h: 0 });
  const imgRef = useRef<HTMLImageElement>(null);

  const eligible = Boolean(natural && canZoom(natural.w, natural.h));

  const place = (e: React.PointerEvent, touch: boolean) => {
    const el = imgRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ix = e.clientX - rect.left;
    const iy = e.clientY - rect.top;
    if (ix < 0 || iy < 0 || ix > rect.width || iy > rect.height) {
      setLens(null);
      return;
    }
    if (rect.width !== display.w || rect.height !== display.h) setDisplay({ w: rect.width, h: rect.height });
    const size = touch ? LENS_SIZE.touch : LENS_SIZE.mouse;
    setLens({ cx: e.clientX, cy: touch ? e.clientY - TOUCH_LIFT_PX : e.clientY, ix, iy, size });
  };

  const magnification =
    natural && display.w ? Math.min(natural.w / display.w, LENS_MAX_MAGNIFICATION) : 0;
  const showLens = eligible && lens && magnification >= LENS_MIN_MAGNIFICATION;

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        draggable={false}
        loading={loading}
        decoding="async"
        className={className}
        style={lensMode ? { touchAction: "none", cursor: "crosshair" } : undefined}
        onLoad={(e) => {
          if (!natural) setNatural({ w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight });
        }}
        onClick={() => {
          if (!lensMode) onOpen();
        }}
        onPointerMove={(e) => {
          if (!eligible) return;
          if (e.pointerType === "mouse") place(e, false);
          else if (lensMode) place(e, true);
        }}
        onPointerDown={(e) => {
          if (eligible && lensMode && e.pointerType !== "mouse") {
            try {
              e.currentTarget.setPointerCapture(e.pointerId);
            } catch {
              // Not capturable (rare); the lens still follows the finger over the image.
            }
            place(e, true);
          }
        }}
        onPointerUp={(e) => {
          if (e.pointerType !== "mouse") setLens(null);
        }}
        onPointerCancel={() => setLens(null)}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") setLens(null);
        }}
      />

      {eligible && (
        <button
          type="button"
          aria-label={lensMode ? t.detail.lensOffAria : t.detail.lensOnAria}
          aria-pressed={lensMode}
          onClick={() => {
            setLensMode((on) => !on);
            setLens(null);
          }}
          // Touch devices only: with a mouse the lens simply follows the cursor.
          className={`${buttonClassName} z-10 flex h-10 w-10 items-center justify-center rounded-full border shadow-md backdrop-blur-md transition [@media(hover:hover)]:hidden ${
            lensMode
              ? "border-ink bg-ink text-background"
              : "border-white/40 bg-white/25 text-neutral-900"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-[18px] w-[18px]"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
            <path d="M11 8v6M8 11h6" />
          </svg>
        </button>
      )}

      {showLens && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed z-[80] rounded-full border-2 border-white shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
          style={{
            width: lens.size,
            height: lens.size,
            left: lens.cx - lens.size / 2,
            top: lens.cy - lens.size / 2,
            backgroundImage: `url("${src}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${display.w * magnification}px ${display.h * magnification}px`,
            backgroundPosition: `${lens.size / 2 - lens.ix * magnification}px ${lens.size / 2 - lens.iy * magnification}px`,
          }}
        />
      )}
    </>
  );
}
