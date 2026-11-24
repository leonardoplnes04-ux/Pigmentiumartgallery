import type { Language } from "./types";

export interface UiStrings {
  nav: {
    obra: string;
    sobreMi: string;
    exposiciones: string;
    contacto: string;
    tiendaAria: string;
  };
  // Language names, written in the language of the page they appear on.
  langNames: { es: string; en: string };
  // Floating contact bar (mobile) and the sheet it opens.
  contactDock: {
    bar: string;
    eyebrow: string;
    title: string;
    whatsapp: string;
    whatsappSub: string;
    email: string;
    close: string;
    closeAria: string;
  };
  menu: {
    open: string;
    close: string;
    openAria: string;
    closeAria: string;
  };
  theme: {
    toDarkAria: string;
    toLightAria: string;
  };
  hero: {
    cta: string;
    ctaSecondary: string;
    ctaTertiary: string;
    ctaVideos: string;
    ctaPerformance: string;
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
    viewAll: string;
  };
  exhibitions: {
    eyebrow: string;
    title: string;
    filterAll: string; // "All artists" tab, only shown when the gallery has more than one
    viewAll: string;
  };
  exhibitionDetail: {
    back: string;
  };
  videos: {
    eyebrow: string;
    title: string;
    intro: string;
    watch: string;
    playAriaPrefix: string; // "<playAriaPrefix> <title>"
    close: string;
    prevAria: string;
    nextAria: string;
  };
  performances: {
    eyebrow: string;
    title: string;
  };
  performanceDetail: {
    back: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
  };
  contactPage: {
    eyebrow: string;
    title: string;
    intro: string;
    directLabel: string;
    emailLabel: string;
    copy: string;
    copied: string;
    instagramLabel: string;
    studioLabel: string;
    studioValue: string;
    responseNote: string;
    formTitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailFieldLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    optional: string;
    interestLabel: string;
    interests: { purchase: string; commission: string; exhibition: string; press: string; other: string };
    artworkLabel: string;
    artworkPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    privacy: string;
    submit: string;
    errors: { name: string; email: string; message: string; interest: string };
    errorSummary: string;
    successTitle: string;
    successBody: string;
    sendAnother: string;
    notOpened: string;
    sending: string;
    sendError: string;
    openMailApp: string;
    copyMessage: string;
    copiedMessage: string;
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
    // Shown instead of `back` when the visitor came from the home carousel.
    backToFeatured: string;
    year: string;
    yearTBD: string;
    technique: string;
    dimensions: string;
    status: string;
    statusEyebrow: {
      available: string;
      sold: string;
      inquire: string;
    };
    inquireCta: string;
    inquireNote: string; // shown under the CTA; explains why there is no public price
    priceLabel: string;
    priceOnRequest: string;
    inquireSubjectPrefix: string; // `<inquireSubjectPrefix> "<title>"`
    criticEyebrow: string;
    detailAltSuffix: string; // "<title> — <detailAltSuffix> N"
    viewFullscreenAria: string;
    closeFullscreenAria: string;
    // Magnifier (lupa) and full-screen zoom controls.
    lensOnAria: string;
    lensOffAria: string;
    zoomInAria: string;
    zoomOutAria: string;
    zoomFitAria: string;
    zoomFit: string;
  };
  footer: {
    navLabel: string;
    connectLabel: string;
    newsletterLabel: string;
    emailPlaceholder: string;
    submit: string;
    thanks: string;
    sending: string;
    error: string;
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
      tiendaAria: "Tienda",
    },
    langNames: { es: "Español", en: "Inglés" },
    contactDock: {
      bar: "Contacto",
      eyebrow: "Contacto",
      title: "¿Cómo prefieres escribirnos?",
      whatsapp: "WhatsApp",
      whatsappSub: "Chat directo",
      email: "Correo electrónico",
      close: "Cerrar",
      closeAria: "Cerrar opciones de contacto",
    },
    menu: {
      open: "Menú",
      close: "Cerrar",
      openAria: "Abrir menú",
      closeAria: "Cerrar menú",
    },
    theme: {
      toDarkAria: "Activar modo oscuro",
      toLightAria: "Activar modo claro",
    },
    hero: {
      cta: "Ver obra",
      ctaSecondary: "Exposiciones",
      ctaTertiary: "Obras disponibles",
      ctaVideos: "Videos",
      ctaPerformance: "Performance",
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
      viewAll: "Ver toda la obra",
    },
    exhibitions: {
      eyebrow: "Exposiciones y prensa",
      title: "Trayectoria",
      filterAll: "Todos",
      viewAll: "Ver todas las exposiciones",
    },
    exhibitionDetail: {
      back: "← Volver a exposiciones",
    },
    videos: {
      eyebrow: "Videos",
      title: "Videos",
      intro: "Inauguraciones y recorridos por las exposiciones de Segundo Planes.",
      watch: "Ver video",
      playAriaPrefix: "Reproducir",
      close: "Cerrar",
      prevAria: "Video anterior",
      nextAria: "Video siguiente",
    },
    performances: {
      eyebrow: "Performance",
      title: "Performance",
    },
    performanceDetail: {
      back: "← Volver a performance",
    },
    contact: {
      eyebrow: "Contacto",
      title: "¿Te interesa una pieza?",
      body: "Escríbeme para consultar disponibilidad, precio o encargos a medida.",
      cta: "Escribir",
    },
    contactPage: {
      eyebrow: "Contacto",
      title: "Conversemos sobre la obra",
      intro: "Para adquirir una pieza, solicitar un encargo, proponer una exposición o una entrevista, déjanos tus datos y te responderemos personalmente.",
      directLabel: "Contacto directo",
      emailLabel: "Correo",
      copy: "Copiar",
      copied: "Copiado",
      instagramLabel: "Instagram",
      studioLabel: "Estudio",
      studioValue: "Monterrey, México · La Habana, Cuba",
      responseNote: "Respondemos en un plazo de 48 horas hábiles.",
      formTitle: "Envíanos un mensaje",
      nameLabel: "Nombre",
      namePlaceholder: "Tu nombre completo",
      emailFieldLabel: "Correo electrónico",
      emailPlaceholder: "nombre@correo.com",
      phoneLabel: "Teléfono o WhatsApp",
      phonePlaceholder: "+52 81 0000 0000",
      optional: "Opcional",
      interestLabel: "¿Qué te interesa?",
      interests: {
        purchase: "Adquirir una obra",
        commission: "Encargo",
        exhibition: "Exposición o colaboración",
        press: "Prensa",
        other: "Otro",
      },
      artworkLabel: "Obra de interés",
      artworkPlaceholder: "Título o serie, si ya tienes una en mente",
      messageLabel: "Mensaje",
      messagePlaceholder: "Cuéntanos qué buscas: espacio, medidas, plazos…",
      privacy: "Usaremos tus datos únicamente para responder a tu mensaje. No los compartimos con terceros.",
      submit: "Enviar mensaje",
      errors: {
        name: "Escribe tu nombre.",
        email: "Escribe un correo válido.",
        message: "Cuéntanos un poco más (mínimo 10 caracteres).",
        interest: "Elige una opción.",
      },
      errorSummary: "Revisa los campos marcados.",
      successTitle: "Tu mensaje está listo",
      successBody: "Recibimos tu mensaje. Te responderemos al correo que nos dejaste.",
      sendAnother: "Volver al formulario",
      notOpened: "¿No se abrió tu correo? Envíalo desde",
      sending: "Enviando…",
      sendError: "No pudimos enviar tu mensaje. Inténtalo de nuevo o envíalo desde tu correo:",
      openMailApp: "App de correo",
      copyMessage: "Copiar mensaje",
      copiedMessage: "Copiado",
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
      backToFeatured: "← Volver a obra destacada",
      year: "Año",
      yearTBD: "Por confirmar",
      technique: "Técnica",
      dimensions: "Dimensiones",
      status: "Estado",
      statusEyebrow: {
        available: "Disponible",
        sold: "Vendida",
        inquire: "Consultar disponibilidad",
      },
      inquireCta: "Solicitar información y precio",
      inquireNote: "Para recibir atención personalizada.",
      priceLabel: "Precio",
      priceOnRequest: "Bajo consulta",
      inquireSubjectPrefix: "Consulta sobre",
      criticEyebrow: "Crítica",
      detailAltSuffix: "detalle",
      viewFullscreenAria: "Ver en pantalla completa",
      closeFullscreenAria: "Cerrar pantalla completa",
      lensOnAria: "Activar lupa",
      lensOffAria: "Desactivar lupa",
      zoomInAria: "Acercar",
      zoomOutAria: "Alejar",
      zoomFitAria: "Ajustar a la pantalla",
      zoomFit: "Ajustar",
    },
    footer: {
      navLabel: "Navegar",
      connectLabel: "Conectar",
      newsletterLabel: "Newsletter",
      emailPlaceholder: "Tu correo",
      submit: "Enviar",
      thanks: "Gracias por suscribirte.",
      sending: "Enviando…",
      error: "No pudimos suscribirte. Inténtalo de nuevo.",
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
      tiendaAria: "Store",
    },
    langNames: { es: "Spanish", en: "English" },
    contactDock: {
      bar: "Contact",
      eyebrow: "Contact",
      title: "How would you like to reach us?",
      whatsapp: "WhatsApp",
      whatsappSub: "Direct chat",
      email: "Email",
      close: "Close",
      closeAria: "Close contact options",
    },
    menu: {
      open: "Menu",
      close: "Close",
      openAria: "Open menu",
      closeAria: "Close menu",
    },
    theme: {
      toDarkAria: "Switch to dark mode",
      toLightAria: "Switch to light mode",
    },
    hero: {
      cta: "View work",
      ctaSecondary: "Exhibitions",
      ctaTertiary: "Available works",
      ctaVideos: "Videos",
      ctaPerformance: "Performance",
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
      viewAll: "See all work",
    },
    exhibitions: {
      eyebrow: "Exhibitions & press",
      title: "Trajectory",
      filterAll: "All",
      viewAll: "See all exhibitions",
    },
    exhibitionDetail: {
      back: "← Back to exhibitions",
    },
    videos: {
      eyebrow: "Videos",
      title: "Videos",
      intro: "Openings and walkthroughs of Segundo Planes’s exhibitions.",
      watch: "Watch video",
      playAriaPrefix: "Play",
      close: "Close",
      prevAria: "Previous video",
      nextAria: "Next video",
    },
    performances: {
      eyebrow: "Performance",
      title: "Performance",
    },
    performanceDetail: {
      back: "← Back to performance",
    },
    contact: {
      eyebrow: "Contact",
      title: "Interested in a piece?",
      body: "Write to me to ask about availability, price, or custom commissions.",
      cta: "Write",
    },
    contactPage: {
      eyebrow: "Contact",
      title: "Let’s talk about the work",
      intro: "To acquire a piece, request a commission, propose an exhibition or an interview, leave your details and we’ll get back to you personally.",
      directLabel: "Direct contact",
      emailLabel: "Email",
      copy: "Copy",
      copied: "Copied",
      instagramLabel: "Instagram",
      studioLabel: "Studio",
      studioValue: "Monterrey, Mexico · Havana, Cuba",
      responseNote: "We reply within 48 business hours.",
      formTitle: "Send us a message",
      nameLabel: "Name",
      namePlaceholder: "Your full name",
      emailFieldLabel: "Email",
      emailPlaceholder: "name@email.com",
      phoneLabel: "Phone or WhatsApp",
      phonePlaceholder: "+1 555 000 0000",
      optional: "Optional",
      interestLabel: "What are you interested in?",
      interests: {
        purchase: "Acquiring a work",
        commission: "Commission",
        exhibition: "Exhibition or collaboration",
        press: "Press",
        other: "Other",
      },
      artworkLabel: "Work of interest",
      artworkPlaceholder: "Title or series, if you already have one in mind",
      messageLabel: "Message",
      messagePlaceholder: "Tell us what you’re looking for: space, size, timing…",
      privacy: "We’ll only use your details to reply to your message. We never share them with third parties.",
      submit: "Send message",
      errors: {
        name: "Please enter your name.",
        email: "Please enter a valid email.",
        message: "Tell us a bit more (at least 10 characters).",
        interest: "Please choose an option.",
      },
      errorSummary: "Please check the highlighted fields.",
      successTitle: "Your message is ready",
      successBody: "We got your message. We’ll reply to the email you gave us.",
      sendAnother: "Back to the form",
      notOpened: "Email app didn’t open? Send it from",
      sending: "Sending…",
      sendError: "We couldn’t send your message. Try again or send it from your email:",
      openMailApp: "Email app",
      copyMessage: "Copy message",
      copiedMessage: "Copied",
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
      backToFeatured: "← Back to featured work",
      year: "Year",
      yearTBD: "To be confirmed",
      technique: "Technique",
      dimensions: "Dimensions",
      status: "Status",
      statusEyebrow: {
        available: "Available",
        sold: "Sold",
        inquire: "Inquire about availability",
      },
      inquireCta: "Request information and price",
      inquireNote: "To receive personalised attention.",
      priceLabel: "Price",
      priceOnRequest: "On request",
      inquireSubjectPrefix: "Inquiry about",
      criticEyebrow: "Critical reception",
      detailAltSuffix: "detail",
      viewFullscreenAria: "View fullscreen",
      closeFullscreenAria: "Close fullscreen",
      lensOnAria: "Turn on magnifier",
      lensOffAria: "Turn off magnifier",
      zoomInAria: "Zoom in",
      zoomOutAria: "Zoom out",
      zoomFitAria: "Fit to screen",
      zoomFit: "Fit",
    },
    footer: {
      navLabel: "Browse",
      connectLabel: "Connect",
      newsletterLabel: "Newsletter",
      emailPlaceholder: "Your email",
      submit: "Submit",
      thanks: "Thanks for subscribing.",
      sending: "Sending…",
      error: "We couldn’t subscribe you. Please try again.",
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
