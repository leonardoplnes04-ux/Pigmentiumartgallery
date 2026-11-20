import type { LocalizedText } from "./types";

// Short interface strings added by the SEO/AI work (branch seo-ia-2026-11).
// Kept apart from data/translations.ts so that file stays untouched; every
// string here is only rendered with the preview flag on (lib/seoPreview.ts).

export const seoCopy = {
  aboutWork: { es: "Sobre la obra", en: "About the work" },
  draftBadge: { es: "Borrador", en: "Draft" },

  // /obra intro (C3) — two sentences before the grid.
  catalogIntro: {
    es: "Pintura contemporánea cubana de Segundo Planes, artista de la generación de los 80 formado en la Escuela Nacional de Arte y el Instituto Superior de Arte de La Habana. Cada ficha reúne técnica, medidas y año cuando están confirmados, y desde ella puedes solicitar información para adquirir la obra.",
    en: "Contemporary Cuban painting by Segundo Planes, an artist of the 1980s generation trained at the Escuela Nacional de Arte and the Instituto Superior de Arte in Havana. Each page lists technique, dimensions and year when confirmed, and from it you can request information to acquire the work.",
  },

  // Footer links to the new pages (C4).
  footerTopicsLabel: { es: "Sobre el artista", en: "About the artist" },
  footerPress: { es: "Prensa y bibliografía", en: "Press and bibliography" },
  footerCubanArt: { es: "Generación de los 80", en: "1980s generation" },
  footerAcquire: { es: "Cómo adquirir obra", en: "How to acquire artwork" },

  // "Get this image by email" (block D).
  imageRequest: {
    cta: { es: "Recibir imagen por correo", en: "Get this image by email" },
    nameLabel: { es: "Nombre o galería", en: "Name or gallery" },
    emailLabel: { es: "Correo electrónico", en: "Email" },
    submit: { es: "Enviar imagen", en: "Send image" },
    sending: { es: "Preparando…", en: "Preparing…" },
    done: { es: "Listo, revisa tu correo", en: "Done, check your inbox" },
    errorInvalid: {
      es: "Revisa tu nombre y tu correo.",
      en: "Please check your name and email.",
    },
    errorLimit: {
      es: "Ya enviamos varias imágenes a este correo. Inténtalo más tarde o escríbenos desde Contacto.",
      en: "We've already sent several images to this email. Try again later or write to us from Contact.",
    },
    errorGeneric: {
      es: "No se pudo enviar ahora. Inténtalo de nuevo o escríbenos desde Contacto.",
      en: "It couldn't be sent right now. Try again or write to us from Contact.",
    },
    cancel: { es: "Cancelar", en: "Cancel" },
  },
} satisfies Record<string, LocalizedText | Record<string, LocalizedText>>;
