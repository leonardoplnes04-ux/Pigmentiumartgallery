"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { videos } from "@/data/videos";
import { exhibitionGalleries } from "@/data/exhibitionGalleries";
import { useLanguage } from "@/hooks/useLanguage";

export default function VideosPage() {
  const { t, pick } = useLanguage();

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14 md:py-16">
        <p className="text-xs uppercase tracking-widest text-muted">{t.videos.eyebrow}</p>
        <h1 className="mt-2 font-serif text-3xl sm:text-4xl">{t.videos.title}</h1>

        <ul className="mt-8 divide-y divide-line sm:mt-12">
          {videos.map((item) => {
            const hasGallery = Boolean(item.exhibitionId && exhibitionGalleries[item.exhibitionId]);
            return (
              <li key={item.id} className="grid grid-cols-1 gap-4 py-8 sm:py-10 md:grid-cols-[120px_1fr]">
                <p className="text-xs uppercase tracking-widest text-muted">{item.date}</p>
                <div>
                  {hasGallery ? (
                    <Link
                      href={`/exposiciones/${item.exhibitionId}`}
                      className="font-serif text-lg underline underline-offset-4"
                    >
                      {pick(item.title)}
                    </Link>
                  ) : (
                    <p className="font-serif text-lg">{pick(item.title)}</p>
                  )}
                  <p className="text-sm text-muted">{item.venue}</p>
                  <video
                    src={item.src}
                    controls
                    preload="metadata"
                    className="mt-4 w-full bg-ink sm:max-w-2xl"
                  >
                    {pick(item.title)}
                  </video>
                </div>
              </li>
            );
          })}
        </ul>
      </main>
      <Footer />
    </>
  );
}
