"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Artwork } from "@/data/types";
import { useLanguage } from "@/hooks/useLanguage";

// PROVISIONAL. This is the grid for the "Obras disponibles" view
// (/obra?disponibles=1). A tap on a card opens its spec modal (onOpen); a
// drag rearranges the grid live. The chosen order is kept in that
// browser's localStorage only (handled by the parent) and never published
// until it's baked into data/availableExtra.ts by hand.
//
// Drag is implemented with raw pointer events, NOT the HTML5 drag API:
// the site's ImageGuard blocks image drags globally and framer-motion
// swallows onDragStart on its components. Pointer events sidestep both.
export default function DisponiblesReorder({
  items,
  onChange,
  onReset,
  onOpen,
}: {
  items: Artwork[];
  onChange: (ids: string[]) => void;
  onReset: () => void;
  onOpen: (artwork: Artwork) => void;
}) {
  const { pick } = useLanguage();
  const [order, setOrder] = useState<Artwork[]>(items);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => setOrder(items), [items]);

  const press = useRef<{ id: string; x: number; y: number; moved: boolean } | null>(
    null
  );

  const moveDraggedOver = (overId: string) => {
    const fromId = press.current?.id;
    if (!fromId || fromId === overId) return;
    setOrder((prev) => {
      const from = prev.findIndex((a) => a.id === fromId);
      const to = prev.findIndex((a) => a.id === overId);
      if (from === -1 || to === -1 || from === to) return prev;
      const next = prev.slice();
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      onChange(next.map((a) => a.id));
      return next;
    });
  };

  const idAtPoint = (clientX: number, clientY: number): string | null => {
    const el = document.elementFromPoint(clientX, clientY) as HTMLElement | null;
    return el?.closest<HTMLElement>("[data-reorder-id]")?.dataset.reorderId ?? null;
  };

  const onPointerDown = (e: React.PointerEvent, id: string) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    press.current = { id, x: e.clientX, y: e.clientY, moved: false };
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const p = press.current;
    if (!p) return;
    if (!p.moved) {
      if (Math.hypot(e.clientX - p.x, e.clientY - p.y) < 6) return;
      p.moved = true;
      setDraggingId(p.id);
    }
    e.preventDefault();
    const overId = idAtPoint(e.clientX, e.clientY);
    if (overId) moveDraggedOver(overId);
  };

  const endDrag = (e: React.PointerEvent) => {
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      /* ignore */
    }
    const p = press.current;
    press.current = null;
    setDraggingId(null);
    // A press that never moved = a tap → open the spec sheet.
    if (p && !p.moved) {
      const art = order.find((a) => a.id === p.id);
      if (art) onOpen(art);
    }
  };

  const copyOrder = async () => {
    const text = JSON.stringify(order.map((a) => a.id));
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.prompt("Copia este orden:", text);
    }
  };

  return (
    <>
      <div className="mt-6 flex flex-wrap items-center gap-3 rounded-lg border border-line bg-line/40 px-4 py-3 text-sm">
        <span className="text-ink/70">
          Arrastra las obras para reordenarlas · un toque abre su ficha.
        </span>
        <div className="ml-auto flex gap-2">
          <button
            type="button"
            onClick={copyOrder}
            className="border border-ink px-3 py-1.5 text-[11px] uppercase tracking-widest transition hover:bg-ink hover:text-background"
          >
            {copied ? "¡Copiado!" : "Copiar orden"}
          </button>
          <button
            type="button"
            onClick={() => {
              onReset();
              setOrder(items);
            }}
            className="border border-line px-3 py-1.5 text-[11px] uppercase tracking-widest transition hover:border-ink"
          >
            Reiniciar
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {order.map((a, i) => {
          const dragging = draggingId === a.id;
          return (
            <motion.div
              key={a.id}
              layout
              transition={{ type: "spring", stiffness: 520, damping: 42 }}
              data-reorder-id={a.id}
              onPointerDown={(e) => onPointerDown(e, a.id)}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              className={`touch-none select-none rounded-md ${
                dragging
                  ? "z-10 cursor-grabbing opacity-50 ring-2 ring-ink"
                  : "cursor-grab"
              }`}
            >
              <div className="relative aspect-square overflow-hidden rounded-md border border-line bg-line">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={a.image}
                  alt={pick(a.title)}
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                  className="pointer-events-none h-full w-full object-cover"
                />
                <span className="pointer-events-none absolute left-1 top-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium tabular-nums text-white">
                  {i + 1}
                </span>
              </div>
              <p className="pointer-events-none mt-1.5 truncate text-xs text-muted">
                {pick(a.title)}
              </p>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
