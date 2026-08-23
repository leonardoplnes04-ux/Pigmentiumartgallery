"use client";

import { useEffect } from "react";

// Best-effort deterrents against casual right-click-save / drag-save of
// images, site-wide. IMPORTANT — see PROYECTO.md 2026-08-23 entries: this
// cannot block screenshots, screen recordings, or a photo of the screen
// (those happen at the OS/hardware level, outside any web page's reach),
// and anyone with devtools open can still grab image URLs regardless.
// This only raises friction for the average visitor. (`Watermark` used
// to pair with this on artwork photos for a deterrent that survives a
// screenshot too — removed from all artwork views 2026-08-23 per the
// user; the component still exists at components/Watermark.tsx if it's
// wanted back later.)
export default function ImageGuard() {
  useEffect(() => {
    const blockImageContextMenu = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && e.target.closest("img")) {
        e.preventDefault();
      }
    };
    const blockImageDrag = (e: DragEvent) => {
      if (e.target instanceof HTMLElement && e.target.closest("img")) {
        e.preventDefault();
      }
    };
    // Ctrl/Cmd+S (save page) — a courtesy speed bump, not a real barrier.
    const blockSaveShortcut = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", blockImageContextMenu);
    document.addEventListener("dragstart", blockImageDrag);
    document.addEventListener("keydown", blockSaveShortcut);
    return () => {
      document.removeEventListener("contextmenu", blockImageContextMenu);
      document.removeEventListener("dragstart", blockImageDrag);
      document.removeEventListener("keydown", blockSaveShortcut);
    };
  }, []);

  return null;
}
