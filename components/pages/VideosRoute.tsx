import VideosPage from "@/components/pages/VideosPage";
import { videos } from "@/data/videos";
import type { Language } from "@/lib/routes";
import { toJsonLd, videosJsonLd } from "@/lib/structuredData";

// /videos and /en/videos: the client list plus its VideoObject structured data.
export default function VideosRoute({ lang }: { lang: Language }) {
  void lang;
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: toJsonLd(videosJsonLd(videos)) }}
      />
      <VideosPage />
    </>
  );
}
