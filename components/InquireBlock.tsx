"use client";

import Link from "next/link";
import type { Artwork } from "@/data/types";
import { useLanguage } from "@/hooks/useLanguage";

// Primary call to action of every artwork page (full page and the "disponibles"
// modal). Opens /contacto with the piece already loaded (title, year, ref and
// image), so the visitor never has to describe which work they mean.
//
// The note under the button explains, in a positive tone, why there is no
// public price: each piece is handled personally. Never mention taxes here
// (explicit request from the owner, 2026-11-18).
export default function InquireBlock({
  artwork,
  title,
}: {
  artwork: Artwork;
  title: string;
}) {
  const { t, href: localize } = useLanguage();
  const href = localize(`/contacto?obra=${encodeURIComponent(
    `${artwork.year ? `${title} (${artwork.year})` : title} · ref. ${artwork.id}`
  )}&img=${encodeURIComponent(artwork.image)}`);

  return (
    <div>
      <Link
        href={href}
        data-cta="inquire-artwork"
        className="inline-block bg-ink px-7 py-3.5 text-xs uppercase tracking-widest text-background transition hover:opacity-85"
      >
        {t.detail.inquireCta}
      </Link>
      <p className="mt-3 text-sm text-muted">{t.detail.inquireNote}</p>
    </div>
  );
}
