"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { artist } from "@/data/artist";
import { useLanguage } from "@/hooks/useLanguage";

// How long the still image holds before the "painting comes to life"
// crossfade into the video begins.
const VIDEO_DELAY_MS = 1500;
const CROSSFADE_MS = 1500;

export default function Hero() {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t, pick } = useLanguage();

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
    // Container matches the artwork's own aspect ratio (video is 1344×768,
    // i.e. 7:4) instead of a fixed 90vh — that mismatch was forcing
    // object-cover to crop hard on narrow screens, often landing on the
    // video's black background instead of the painting. object-contain
    // below is a second guarantee: the full piece always stays visible,
    // never cropped, even on the rare screen where max-h clamps in.
    // min-h keeps the title/tagline/button block from feeling cramped on
    // phones, where the 7:4 aspect alone would make the section quite
    // short — object-contain still guarantees no cropping if that floor
    // ever adds a sliver of letterboxing.
    <section className="relative flex aspect-[7/4] max-h-[85vh] min-h-[380px] w-full items-end overflow-hidden bg-background">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={artist.heroImage}
        alt={`${t.hero.altPrefix} ${artist.name}`}
        className={`absolute inset-0 h-full w-full object-contain transition-opacity ease-in-out ${
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
        className={`absolute inset-0 h-full w-full object-contain transition-opacity ease-in-out ${
          showVideo ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDuration: `${CROSSFADE_MS}ms` }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-8 text-background sm:px-6 sm:pb-12 md:pb-16">
        <p className="text-[10px] uppercase tracking-widest sm:text-xs">{pick(artist.tagline)}</p>
        <h1 className="mt-2 font-serif text-3xl leading-tight sm:text-5xl md:text-7xl">
          {artist.name}
        </h1>
        <Link
          href="/obra"
          className="mt-5 inline-block border border-background px-5 py-2.5 text-xs uppercase tracking-widest hover:bg-background hover:text-ink sm:mt-8 sm:px-6 sm:py-3"
        >
          {t.hero.cta}
        </Link>
      </div>
    </section>
  );
}
