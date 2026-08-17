"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { artist } from "@/data/artist";

// How long the still image holds before the "painting comes to life"
// crossfade into the video begins.
const VIDEO_DELAY_MS = 1500;
const CROSSFADE_MS = 1500;

export default function Hero() {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowVideo(true), VIDEO_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showVideo || !videoRef.current) return;
    // Set muted imperatively too — some browsers only honor autoplay
    // when the property (not just the JSX attribute) is set before play().
    videoRef.current.muted = true;
    videoRef.current.play().catch(() => {
      // Autoplay can still be blocked (e.g. low-power mode); the still
      // image stays underneath, so nothing breaks visually.
    });
  }, [showVideo]);

  return (
    <section className="relative flex h-[90vh] min-h-[560px] items-end overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={artist.heroImage}
        alt={`Obra destacada de ${artist.name}`}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity ease-in-out ${
          showVideo ? "opacity-0" : "opacity-100"
        }`}
        style={{ transitionDuration: `${CROSSFADE_MS}ms` }}
      />
      <video
        ref={videoRef}
        src={artist.heroVideo}
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity ease-in-out ${
          showVideo ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDuration: `${CROSSFADE_MS}ms` }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 text-background">
        <p className="text-xs uppercase tracking-widest">{artist.tagline}</p>
        <h1 className="mt-2 font-serif text-5xl md:text-7xl">{artist.name}</h1>
        <Link
          href="/obra"
          className="mt-8 inline-block border border-background px-6 py-3 text-xs uppercase tracking-widest hover:bg-background hover:text-ink"
        >
          Ver obra
        </Link>
      </div>
    </section>
  );
}
