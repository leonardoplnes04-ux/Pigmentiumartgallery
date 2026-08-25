import type { PerformanceGalleryImage } from "./types";

// Full photo set per performance, in the order the files were numbered in
// the source material. No per-photo captions survive from the original
// archive (unlike some exhibitionGalleries entries), so alt text is a
// consistent generic description rather than an invented one.
export const performanceGalleries: Record<string, PerformanceGalleryImage[]> = {
  "perf-01": [
    { src: "/images/performances/ensayo-sobre-el-sueno/01.jpg", alt: { es: "Documentación de la performance", en: "Performance documentation" } },
    { src: "/images/performances/ensayo-sobre-el-sueno/02.jpg", alt: { es: "Documentación de la performance", en: "Performance documentation" } },
    { src: "/images/performances/ensayo-sobre-el-sueno/03.jpg", alt: { es: "Vista general de la performance", en: "General view of the performance" } },
    { src: "/images/performances/ensayo-sobre-el-sueno/04.jpg", alt: { es: "Documentación de la performance", en: "Performance documentation" } },
    { src: "/images/performances/ensayo-sobre-el-sueno/05.jpg", alt: { es: "Documentación de la performance", en: "Performance documentation" } },
    { src: "/images/performances/ensayo-sobre-el-sueno/06.jpg", alt: { es: "Documentación de la performance", en: "Performance documentation" } },
    { src: "/images/performances/ensayo-sobre-el-sueno/07.jpg", alt: { es: "Vista general de la performance", en: "General view of the performance" } },
  ],
  "perf-02": [
    { src: "/images/performances/una-caja-de-cristal-encima-del-cielo/01.jpg", alt: { es: "Documentación de la performance", en: "Performance documentation" } },
    { src: "/images/performances/una-caja-de-cristal-encima-del-cielo/02.jpg", alt: { es: "Documentación de la performance", en: "Performance documentation" } },
    { src: "/images/performances/una-caja-de-cristal-encima-del-cielo/03.jpg", alt: { es: "Documentación de la performance", en: "Performance documentation" } },
    { src: "/images/performances/una-caja-de-cristal-encima-del-cielo/04.jpg", alt: { es: "Documentación de la performance", en: "Performance documentation" } },
    { src: "/images/performances/una-caja-de-cristal-encima-del-cielo/05.jpg", alt: { es: "Documentación de la performance", en: "Performance documentation" } },
    { src: "/images/performances/una-caja-de-cristal-encima-del-cielo/06.jpg", alt: { es: "Documentación de la performance", en: "Performance documentation" } },
    { src: "/images/performances/una-caja-de-cristal-encima-del-cielo/07.jpg", alt: { es: "Documentación de la performance", en: "Performance documentation" } },
  ],
  "perf-03": [
    { src: "/images/performances/la-vida-es-una-mierda-anti-tesis/01.jpg", alt: { es: "Lectura de manifiesto durante la performance", en: "Manifesto reading during the performance" } },
    { src: "/images/performances/la-vida-es-una-mierda-anti-tesis/02.jpg", alt: { es: "Documentación de la performance", en: "Performance documentation" } },
    { src: "/images/performances/la-vida-es-una-mierda-anti-tesis/03.jpg", alt: { es: "Documentación de la performance", en: "Performance documentation" } },
    { src: "/images/performances/la-vida-es-una-mierda-anti-tesis/04.jpg", alt: { es: "Documentación de la performance", en: "Performance documentation" } },
    { src: "/images/performances/la-vida-es-una-mierda-anti-tesis/05.jpg", alt: { es: "Documentación de la performance", en: "Performance documentation" } },
    { src: "/images/performances/la-vida-es-una-mierda-anti-tesis/06.jpg", alt: { es: "Documentación de la performance", en: "Performance documentation" } },
  ],
};
