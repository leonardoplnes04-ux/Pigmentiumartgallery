import type { Language } from "./types";

export interface UiStrings {
  nav: {
    obra: string;
    sobreMi: string;
    exposiciones: string;
    contacto: string;
  };
  menu: {
    open: string;
    close: string;
    openAria: string;
    closeAria: string;
  };
  hero: {
    cta: string;
    ctaSecondary: string;
    ctaTertiary: string;
    altPrefix: string; // "<altPrefix> <artist name>"
  };
  featured: {
    eyebrow: string;
    title: string;
  };
  statement: {
    eyebrow: string;
    readMore: string;
    portraitAltPrefix: string; // "<portraitAltPrefix> <artist name>"
  };
  series: {
    eyebrow: string;
    title: string;
  };
  exhibitions: {
    eyebrow: string;
    title: string;
    filterAll: string; // "All artists" tab, only shown when the gallery has more than one
  };
  exhibitionDetail: {
    back: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
  };
  status: {
    available: string;
    sold: string;
    inquire: string;
  };
  catalog: {
    eyebrow: string;
    title: string;
  };
  detail: {
    back: string;
    year: string;
    technique: string;
    dimensions: string;
    status: string;
    statusEyebrow: {
      available: string;
      sold: string;
      inquire: string;
    };
    inquireCta: string;
    inquireSubjectPrefix: string; // `<inquireSubjectPrefix> "<title>"`
    criticEyebrow: string;
    detailAltSuffix: string; // "<title> — <detailAltSuffix> N"
  };
  footer: {
    newsletterLabel: string;
    emailPlaceholder: string;
    submit: string;
    thanks: string;
    rights: string;
  };
  comingSoon: {
    title: string;
  };
  carousel: {
    prevAria: string;
    nextAria: string;
    goToAriaPrefix: string; // "<goToAriaPrefix> <title>"
  };
  simulator: {
    cta: string; // button on the artwork detail page
    pageTitle: string;
    uploadPrompt: string;
    uploadCta: string;
    changePhotoCta: string;
    dragHint: string;
    resizeHandleAria: string;
    downloadCta: string;
    back: string;
  };
}

export const translations: Record<Language, UiStrings> = {
  es: {
    nav: {
      obra: "Obra",
      sobreMi: "Biografía",
      exposiciones: "Exposiciones",
      contacto: "Contacto",
    },
    menu: {
      open: "Menú",
      close: "Cerrar",
      openAria: "Abrir menú",
      closeAria: "Cerrar menú",
    },
    hero: {
      cta: "Ver obra",
      ctaSecondary: "Exposiciones",
      ctaTertiary: "Obras disponibles",
      altPrefix: "Obra destacada de",
    },
    featured: {
      eyebrow: "Obra",
      title: "Obra destacada",
    },
    statement: {
      eyebrow: "Biografía",
      readMore: "Leer más",
      portraitAltPrefix: "Retrato de",
    },
    series: {
      eyebrow: "Series",
      title: "Cuerpos de obra",
    },
    exhibitions: {
      eyebrow: "Exposiciones y prensa",
      title: "Trayectoria",
      filterAll: "Todos",
    },
    exhibitionDetail: {
      back: "← Volver a exposiciones",
    },
    contact: {
      eyebrow: "Contacto",
      title: "¿Te interesa una pieza?",
      body: "Escríbeme para consultar disponibilidad, precio o encargos a medida.",
      cta: "Escribir",
    },
    status: {
      available: "Disponible",
      sold: "Vendida",
      inquire: "Consultar",
    },
    catalog: {
      eyebrow: "Obra",
      title: "Catálogo",
    },
    detail: {
      back: "← Volver a obra",
      year: "Año",
      technique: "Técnica",
      dimensions: "Dimensiones",
      status: "Estado",
      statusEyebrow: {
        available: "Disponible",
        sold: "Vendida",
        inquire: "Consultar disponibilidad",
      },
      inquireCta: "Consultar disponibilidad",
      inquireSubjectPrefix: "Consulta sobre",
      criticEyebrow: "Crítica",
      detailAltSuffix: "detalle",
    },
    footer: {
      newsletterLabel: "Newsletter",
      emailPlaceholder: "Tu correo",
      submit: "Enviar",
      thanks: "Gracias por suscribirte.",
      rights: "Todos los derechos reservados.",
    },
    comingSoon: {
      title: "Próximamente",
    },
    carousel: {
      prevAria: "Obra anterior",
      nextAria: "Obra siguiente",
      goToAriaPrefix: "Ir a",
    },
    simulator: {
      cta: "Ver en tu pared",
      pageTitle: "Vista en tu pared",
      uploadPrompt: "Subí o tomá una foto de tu espacio para ver cómo se vería la obra ahí.",
      uploadCta: "Subir foto",
      changePhotoCta: "Cambiar foto",
      dragHint: "Arrastrá la obra para ubicarla, y usá la esquina para agrandarla o achicarla.",
      resizeHandleAria: "Agrandar o achicar la obra",
      downloadCta: "Descargar",
      back: "← Volver a la obra",
    },
  },
  en: {
    nav: {
      obra: "Work",
      sobreMi: "Biography",
      exposiciones: "Exhibitions",
      contacto: "Contact",
    },
    menu: {
      open: "Menu",
      close: "Close",
      openAria: "Open menu",
      closeAria: "Close menu",
    },
    hero: {
      cta: "View work",
      ctaSecondary: "Exhibitions",
      ctaTertiary: "Available works",
      altPrefix: "Featured artwork by",
    },
    featured: {
      eyebrow: "Work",
      title: "Featured work",
    },
    statement: {
      eyebrow: "Biography",
      readMore: "Read more",
      portraitAltPrefix: "Portrait of",
    },
    series: {
      eyebrow: "Series",
      title: "Bodies of work",
    },
    exhibitions: {
      eyebrow: "Exhibitions & press",
      title: "Trajectory",
      filterAll: "All",
    },
    exhibitionDetail: {
      back: "← Back to exhibitions",
    },
    contact: {
      eyebrow: "Contact",
      title: "Interested in a piece?",
      body: "Write to me to ask about availability, price, or custom commissions.",
      cta: "Write",
    },
    status: {
      available: "Available",
      sold: "Sold",
      inquire: "Inquire",
    },
    catalog: {
      eyebrow: "Work",
      title: "Catalog",
    },
    detail: {
      back: "← Back to work",
      year: "Year",
      technique: "Technique",
      dimensions: "Dimensions",
      status: "Status",
      statusEyebrow: {
        available: "Available",
        sold: "Sold",
        inquire: "Inquire about availability",
      },
      inquireCta: "Inquire about availability",
      inquireSubjectPrefix: "Inquiry about",
      criticEyebrow: "Critical reception",
      detailAltSuffix: "detail",
    },
    footer: {
      newsletterLabel: "Newsletter",
      emailPlaceholder: "Your email",
      submit: "Submit",
      thanks: "Thanks for subscribing.",
      rights: "All rights reserved.",
    },
    comingSoon: {
      title: "Coming soon",
    },
    carousel: {
      prevAria: "Previous artwork",
      nextAria: "Next artwork",
      goToAriaPrefix: "Go to",
    },
    simulator: {
      cta: "View on your wall",
      pageTitle: "View on your wall",
      uploadPrompt: "Upload or take a photo of your space to see how the piece would look there.",
      uploadCta: "Upload photo",
      changePhotoCta: "Change photo",
      dragHint: "Drag the artwork to place it, and use the corner to resize it.",
      resizeHandleAria: "Resize the artwork",
      downloadCta: "Download",
      back: "← Back to artwork",
    },
  },
};
