"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Link from "next/link";
import type { Artwork } from "@/data/types";
import { useLanguage } from "@/hooks/useLanguage";

const INITIAL_WIDTH_PCT = 35;
const MIN_WIDTH_PCT = 8;
const MAX_WIDTH_PCT = 90;

interface OverlayRect {
  xPct: number; // left, % of container width
  yPct: number; // top, % of container height
  widthPct: number; // % of container width
}

// An artwork whose real-world size is confirmed — the only kind this
// component ever receives (the page gates on this before rendering it).
type MeasuredArtwork = Artwork & { realDimensionsCm: { width: number; height: number } };

export default function WallSimulator({ artwork }: { artwork: MeasuredArtwork }) {
  const { t, pick } = useLanguage();
  const title = pick(artwork.title);
  // Used only to keep the drag/resize bounds sane — the actual on-screen
  // and exported size follow the photographed artwork's own intrinsic
  // ratio (see handleDownload), which should closely match this.
  const artworkAspect = artwork.realDimensionsCm.width / artwork.realDimensionsCm.height;

  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoSize, setPhotoSize] = useState<{ width: number; height: number } | null>(null);
  const [overlay, setOverlay] = useState<OverlayRect>({ xPct: 0, yPct: 0, widthPct: INITIAL_WIDTH_PCT });

  const containerRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{
    mode: "move" | "resize";
    startX: number;
    startY: number;
    startOverlay: OverlayRect;
  } | null>(null);

  // Revoke the previous object URL whenever it's replaced or the
  // component unmounts, so we don't leak the uploaded photo in memory.
  useEffect(() => {
    return () => {
      if (photoUrl) URL.revokeObjectURL(photoUrl);
    };
  }, [photoUrl]);

  const clampOverlay = useCallback(
    (next: OverlayRect, containerAspect: number): OverlayRect => {
      const widthPct = Math.min(MAX_WIDTH_PCT, Math.max(MIN_WIDTH_PCT, next.widthPct));
      const heightPct = (widthPct / artworkAspect) * containerAspect;
      const xPct = Math.min(100 - widthPct, Math.max(0, next.xPct));
      const yPct = Math.min(100 - heightPct, Math.max(0, next.yPct));
      return { xPct, yPct, widthPct };
    },
    [artworkAspect]
  );

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const size = { width: img.naturalWidth, height: img.naturalHeight };
      const containerAspect = size.width / size.height;
      setPhotoSize(size);
      setPhotoUrl((previous) => {
        if (previous) URL.revokeObjectURL(previous);
        return url;
      });
      setOverlay(
        clampOverlay(
          { xPct: (100 - INITIAL_WIDTH_PCT) / 2, yPct: 30, widthPct: INITIAL_WIDTH_PCT },
          containerAspect
        )
      );
    };
    img.src = url;
    // Allow re-selecting the same file later (e.g. after "change photo").
    event.target.value = "";
  }

  function handlePointerDown(mode: "move" | "resize") {
    return (event: ReactPointerEvent) => {
      event.preventDefault();
      event.currentTarget.setPointerCapture(event.pointerId);
      dragState.current = { mode, startX: event.clientX, startY: event.clientY, startOverlay: overlay };
    };
  }

  function handlePointerMove(event: ReactPointerEvent) {
    if (!dragState.current || !containerRef.current || !photoSize) return;
    const { mode, startX, startY, startOverlay } = dragState.current;
    const rect = containerRef.current.getBoundingClientRect();
    const dxPct = ((event.clientX - startX) / rect.width) * 100;
    const dyPct = ((event.clientY - startY) / rect.height) * 100;
    const containerAspect = photoSize.width / photoSize.height;

    if (mode === "move") {
      setOverlay(
        clampOverlay(
          { ...startOverlay, xPct: startOverlay.xPct + dxPct, yPct: startOverlay.yPct + dyPct },
          containerAspect
        )
      );
    } else {
      setOverlay(clampOverlay({ ...startOverlay, widthPct: startOverlay.widthPct + dxPct }, containerAspect));
    }
  }

  function handlePointerUp() {
    dragState.current = null;
  }

  async function handleDownload() {
    if (!photoUrl || !photoSize) return;
    const canvas = document.createElement("canvas");
    canvas.width = photoSize.width;
    canvas.height = photoSize.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const [photoImg, artworkImg] = await Promise.all([loadImage(photoUrl), loadImage(artwork.image)]);
    ctx.drawImage(photoImg, 0, 0, canvas.width, canvas.height);

    const x = (overlay.xPct / 100) * canvas.width;
    const y = (overlay.yPct / 100) * canvas.height;
    const width = (overlay.widthPct / 100) * canvas.width;
    // Match the on-screen rendering: height follows the artwork photo's
    // own intrinsic ratio, not the (approximate) reported cm ratio.
    const height = width * (artworkImg.naturalHeight / artworkImg.naturalWidth);
    ctx.drawImage(artworkImg, x, y, width, height);

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/jpeg", 0.92);
    link.download = `${artwork.id}-en-tu-pared.jpg`;
    link.click();
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-10 sm:px-6 sm:py-14 md:py-16">
      <Link href={`/obra/${artwork.id}`} className="text-xs uppercase tracking-widest text-muted hover:text-ink">
        {t.simulator.back}
      </Link>

      <h1 className="mt-4 font-serif text-3xl sm:text-4xl">{t.simulator.pageTitle}</h1>
      <p className="mt-2 text-sm text-muted">{title}</p>

      {!photoUrl ? (
        <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-line px-6 py-16 text-center">
          <p className="max-w-sm text-sm text-muted">{t.simulator.uploadPrompt}</p>
          <label className="inline-block cursor-pointer border border-ink px-6 py-3 text-xs uppercase tracking-widest hover:bg-ink hover:text-background">
            {t.simulator.uploadCta}
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      ) : (
        <div className="mt-8">
          <p className="text-xs uppercase tracking-widest text-muted">{t.simulator.dragHint}</p>

          <div
            ref={containerRef}
            className="relative mt-4 w-full touch-none select-none overflow-hidden rounded-2xl bg-line"
            style={photoSize ? { aspectRatio: `${photoSize.width} / ${photoSize.height}` } : undefined}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoUrl}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            />

            <div
              className="absolute cursor-move touch-none"
              style={{ left: `${overlay.xPct}%`, top: `${overlay.yPct}%`, width: `${overlay.widthPct}%` }}
              onPointerDown={handlePointerDown("move")}
            >
              <span className="absolute -top-6 left-0 whitespace-nowrap rounded bg-ink px-2 py-0.5 text-[10px] uppercase tracking-widest text-background">
                {artwork.realDimensionsCm.width} × {artwork.realDimensionsCm.height} cm
              </span>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={artwork.image}
                alt={title}
                draggable={false}
                className="pointer-events-none w-full shadow-lg"
              />

              <button
                type="button"
                aria-label={t.simulator.resizeHandleAria}
                onPointerDown={(event) => {
                  event.stopPropagation();
                  handlePointerDown("resize")(event);
                }}
                className="absolute -bottom-2 -right-2 h-6 w-6 cursor-nwse-resize touch-none rounded-full border-2 border-background bg-ink"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <label className="inline-block cursor-pointer border border-line px-5 py-2.5 text-xs uppercase tracking-widest hover:border-ink">
              {t.simulator.changePhotoCta}
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <button
              type="button"
              onClick={handleDownload}
              className="border border-ink px-5 py-2.5 text-xs uppercase tracking-widest hover:bg-ink hover:text-background"
            >
              {t.simulator.downloadCta}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
