import type { LocalizedText } from "./types";

// Aviso de privacidad integral + política de cookies (/privacidad, /en/privacy)
// and the cookie banner strings. Written to cover the Mexican LFPDPPP (2025),
// the EU/UK GDPR and similar laws (Brazil LGPD, US state laws). Describes ONLY
// what the site actually does (see lib/consent.ts, components/Analytics.tsx,
// convex/leads.ts, convex/subscribers.ts). If the site starts collecting
// something new, update this file and LAST_UPDATED.

export const PRIVACY_LAST_UPDATED = "2026-11-20";

// Responsible party. The address was given by the owner on 2026-11-20 without
// colonia, city or postal code: complete it here (see docs/privacidad).
export const controller = {
  name: "Segundo Planes",
  address: "Luis Arizpe 126",
  email: "segundoplanesobras@outlook.com",
};

export interface PrivacySection {
  id: string;
  heading: LocalizedText;
  paragraphs?: LocalizedText[];
  items?: LocalizedText[];
}

const E = controller.email;

export const privacyIntro: LocalizedText = {
  es: `${controller.name}, artista plástico, persona física con domicilio en ${controller.address}, es el responsable del tratamiento de los datos personales que nos proporcionas en segundoplanes.com. Este aviso explica qué datos recabamos, para qué, con quién los compartimos y cómo puedes ejercer tus derechos.`,
  en: `${controller.name}, visual artist, an individual with address at ${controller.address}, is the controller of the personal data you provide on segundoplanes.com. This notice explains what data we collect, why, who we share it with and how to exercise your rights.`,
};

export const privacySections: PrivacySection[] = [
  {
    id: "datos",
    heading: { es: "Datos que recabamos", en: "Data we collect" },
    items: [
      {
        es: "Formulario de contacto y consultas sobre obra: nombre, correo electrónico, teléfono o WhatsApp (opcional), motivo de tu mensaje, la obra de interés y el mensaje que escribas.",
        en: "Contact form and artwork inquiries: name, email address, phone or WhatsApp (optional), the reason for your message, the artwork of interest and the message you write.",
      },
      {
        es: "Boletín: tu correo electrónico y el idioma del sitio en que te suscribiste.",
        en: "Newsletter: your email address and the site language you subscribed in.",
      },
      {
        es: "Estadísticas de navegación, solo si las aceptas: páginas visitadas, clics en botones, tipo de dispositivo y navegador, idioma, país o ciudad aproximados e identificadores de cookies de Google Analytics.",
        en: "Browsing statistics, only if you accept them: pages visited, button clicks, device and browser type, language, approximate country or city and Google Analytics cookie identifiers.",
      },
    ],
    paragraphs: [
      {
        es: "No recabamos datos personales sensibles, ni datos financieros o de pago a través del sitio. El sitio no está dirigido a menores de edad; si eres menor, no nos envíes datos.",
        en: "We do not collect sensitive personal data, nor financial or payment data through the site. The site is not directed at minors; if you are a minor, please do not send us data.",
      },
    ],
  },
  {
    id: "finalidades",
    heading: { es: "Para qué usamos tus datos", en: "Why we use your data" },
    paragraphs: [
      {
        es: "Finalidades necesarias para atender tu solicitud:",
        en: "Purposes needed to handle your request:",
      },
    ],
    items: [
      {
        es: "Responder tus mensajes y consultas, y darte información sobre precio y disponibilidad de obra.",
        en: "Answering your messages and inquiries, and giving you information on price and availability of artwork.",
      },
      {
        es: "Dar seguimiento a la adquisición de obra, encargos, propuestas de exposición o colaboración y solicitudes de prensa.",
        en: "Following up on artwork acquisitions, commissions, exhibition or collaboration proposals and press requests.",
      },
      {
        es: "Enviarte el boletín, si te suscribiste.",
        en: "Sending you the newsletter, if you subscribed.",
      },
      {
        es: "Proteger el sitio contra envíos abusivos o automatizados.",
        en: "Protecting the site against abusive or automated submissions.",
      },
    ],
  },
  {
    id: "secundarias",
    heading: { es: "Finalidad secundaria: estadísticas", en: "Secondary purpose: statistics" },
    paragraphs: [
      {
        es: "Con tu consentimiento, usamos Google Analytics para saber cuántas personas visitan el sitio y qué obras y páginas les interesan, de forma agregada. No lo usamos para publicidad ni para crear perfiles individuales. Puedes negarte o retirar tu consentimiento en cualquier momento desde «Preferencias de cookies», al pie de cada página; negarte no afecta tu uso del sitio ni la atención a tus consultas.",
        en: "With your consent, we use Google Analytics to know how many people visit the site and which artworks and pages interest them, in aggregate. We do not use it for advertising or to build individual profiles. You can refuse or withdraw your consent at any time from “Cookie preferences” at the bottom of every page; refusing does not affect your use of the site or how we handle your inquiries.",
      },
    ],
  },
  {
    id: "bases",
    heading: { es: "Base legal", en: "Legal basis" },
    paragraphs: [
      {
        es: "Tratamos los datos de contacto porque tú nos los envías para que te respondamos (medidas precontractuales y tu consentimiento al enviar el formulario), el boletín y las estadísticas con base en tu consentimiento, y la protección contra abusos con base en nuestro interés legítimo en mantener el sitio seguro.",
        en: "We process contact data because you send it so we can reply (pre-contractual steps and your consent when you submit the form), the newsletter and statistics based on your consent, and abuse protection based on our legitimate interest in keeping the site secure.",
      },
    ],
  },
  {
    id: "encargados",
    heading: { es: "Con quién compartimos tus datos", en: "Who we share your data with" },
    paragraphs: [
      {
        es: "No vendemos ni rentamos tus datos, y no los transferimos a terceros para sus propios fines. Para operar el sitio nos apoyamos en proveedores que los tratan solo por nuestra cuenta y bajo nuestras instrucciones (encargados):",
        en: "We do not sell or rent your data, and we do not transfer it to third parties for their own purposes. To run the site we rely on providers that process it only on our behalf and under our instructions (processors):",
      },
    ],
    items: [
      {
        es: "Convex (Estados Unidos): base de datos donde se guardan los mensajes y las suscripciones.",
        en: "Convex (United States): database where messages and subscriptions are stored.",
      },
      {
        es: "Resend (Estados Unidos): envío de los avisos por correo de cada mensaje recibido.",
        en: "Resend (United States): delivery of the email notices for each message received.",
      },
      {
        es: "Vercel (Estados Unidos): alojamiento del sitio.",
        en: "Vercel (United States): website hosting.",
      },
      {
        es: "Google (Estados Unidos): Google Analytics, solo si aceptas las estadísticas.",
        en: "Google (United States): Google Analytics, only if you accept statistics.",
      },
    ],
  },
  {
    id: "transferencias",
    heading: { es: "Transferencias internacionales", en: "International transfers" },
    paragraphs: [
      {
        es: "Estos proveedores se encuentran en Estados Unidos, por lo que tus datos se tratan fuera de tu país. Usamos proveedores que ofrecen garantías contractuales de protección de datos, como las cláusulas contractuales tipo de la Comisión Europea. Solo podríamos comunicar tus datos a una autoridad cuando una ley o una orden judicial lo exija.",
        en: "These providers are located in the United States, so your data is processed outside your country. We use providers that offer contractual data protection safeguards, such as the European Commission's standard contractual clauses. We could only disclose your data to an authority when a law or court order requires it.",
      },
    ],
  },
  {
    id: "conservacion",
    heading: { es: "Cuánto tiempo los conservamos", en: "How long we keep it" },
    items: [
      {
        es: "Mensajes y consultas: hasta 2 años desde el último contacto, salvo que la relación continúe (por ejemplo, una adquisición) o una ley exija conservarlos más tiempo.",
        en: "Messages and inquiries: up to 2 years from the last contact, unless the relationship continues (for example, an acquisition) or a law requires keeping them longer.",
      },
      {
        es: "Boletín: hasta que te des de baja.",
        en: "Newsletter: until you unsubscribe.",
      },
      {
        es: "Estadísticas de Google Analytics: hasta 14 meses; las cookies de Google Analytics duran hasta 2 años en tu navegador, o hasta que retires tu consentimiento.",
        en: "Google Analytics statistics: up to 14 months; Google Analytics cookies last up to 2 years in your browser, or until you withdraw consent.",
      },
    ],
  },
  {
    id: "derechos",
    heading: { es: "Tus derechos", en: "Your rights" },
    paragraphs: [
      {
        es: `Puedes acceder a tus datos, rectificarlos, cancelarlos u oponerte a su tratamiento (derechos ARCO), así como revocar tu consentimiento, limitar su uso o divulgación y, si estás en la Unión Europea o el Reino Unido, pedir su supresión, la limitación del tratamiento y la portabilidad. También puedes darte de baja del boletín en cualquier momento.`,
        en: `You can access, rectify or delete your data, or object to its processing, as well as withdraw your consent, limit its use or disclosure and, if you are in the European Union or the United Kingdom, request erasure, restriction of processing and portability. You can also unsubscribe from the newsletter at any time.`,
      },
      {
        es: `Para hacerlo, escribe a ${E} indicando tu nombre, el correo con el que nos contactaste, el derecho que quieres ejercer y, si aplica, los datos que quieres corregir. Podremos pedirte información adicional para confirmar tu identidad. Te responderemos en un máximo de 20 días hábiles y, si procede, haremos efectiva tu solicitud dentro de los 15 días hábiles siguientes.`,
        en: `To do so, write to ${E} with your name, the email you contacted us with, the right you want to exercise and, if applicable, the data you want corrected. We may ask for additional information to confirm your identity. We will reply within 20 business days at most and, where applicable, carry out your request within the following 15 business days.`,
      },
      {
        es: "Si consideras que no atendimos tu solicitud correctamente, puedes acudir a la autoridad de protección de datos de tu país: en México, la Secretaría Anticorrupción y Buen Gobierno; en la Unión Europea, la autoridad de control de tu Estado miembro.",
        en: "If you believe we did not handle your request properly, you can contact the data protection authority in your country: in Mexico, the Secretaría Anticorrupción y Buen Gobierno; in the European Union, the supervisory authority of your Member State.",
      },
    ],
  },
  {
    id: "cookies",
    heading: { es: "Cookies y tecnologías similares", en: "Cookies and similar technologies" },
    paragraphs: [
      {
        es: "Las cookies y el almacenamiento local son pequeños archivos que el sitio guarda en tu navegador. Usamos solo los que se indican abajo. Los necesarios no requieren consentimiento porque sin ellos el sitio no recordaría tus elecciones; las cookies de estadísticas solo se activan si las aceptas. No usamos cookies de publicidad.",
        en: "Cookies and local storage are small files the site saves in your browser. We use only those listed below. Necessary ones do not require consent because without them the site would not remember your choices; statistics cookies are only activated if you accept them. We do not use advertising cookies.",
      },
      {
        es: "Puedes cambiar tu decisión en cualquier momento desde «Preferencias de cookies», al pie de cada página, o borrar las cookies desde la configuración de tu navegador.",
        en: "You can change your choice at any time from “Cookie preferences” at the bottom of every page, or delete cookies from your browser settings.",
      },
    ],
  },
  {
    id: "seguridad",
    heading: { es: "Seguridad", en: "Security" },
    paragraphs: [
      {
        es: "El sitio funciona solo con conexión cifrada (HTTPS), el acceso a la base de datos está restringido y limitamos el número de envíos por correo para evitar abusos. Ningún sistema es infalible; si detectamos una vulneración que afecte tus datos de forma significativa, te lo informaremos.",
        en: "The site only works over an encrypted connection (HTTPS), access to the database is restricted and we limit the number of submissions per email to prevent abuse. No system is infallible; if we detect a breach that significantly affects your data, we will inform you.",
      },
    ],
  },
  {
    id: "cambios",
    heading: { es: "Cambios a este aviso", en: "Changes to this notice" },
    paragraphs: [
      {
        es: "Si cambiamos este aviso, publicaremos la nueva versión en esta misma página con su fecha de actualización. Si el cambio afecta las estadísticas o las cookies, volveremos a pedirte tu consentimiento.",
        en: "If we change this notice, we will publish the new version on this same page with its update date. If the change affects statistics or cookies, we will ask for your consent again.",
      },
    ],
  },
];

export interface CookieRow {
  name: string;
  provider: string;
  purpose: LocalizedText;
  duration: LocalizedText;
  category: "necessary" | "analytics";
}

export const cookieTable: CookieRow[] = [
  {
    name: "dartgallery-consent",
    provider: "segundoplanes.com",
    purpose: { es: "Guarda tu decisión sobre cookies.", en: "Stores your cookie choice." },
    duration: { es: "Hasta que la borres (almacenamiento local)", en: "Until you delete it (local storage)" },
    category: "necessary",
  },
  {
    name: "dartgallery-theme",
    provider: "segundoplanes.com",
    purpose: { es: "Recuerda si elegiste modo claro u oscuro.", en: "Remembers whether you chose light or dark mode." },
    duration: { es: "Hasta que la borres (almacenamiento local)", en: "Until you delete it (local storage)" },
    category: "necessary",
  },
  {
    name: "dartgallery-featured-return",
    provider: "segundoplanes.com",
    purpose: {
      es: "Recuerda qué obra abriste del carrusel para regresarte a ella.",
      en: "Remembers which artwork you opened from the carousel to take you back to it.",
    },
    duration: { es: "Hasta cerrar la pestaña (sesión)", en: "Until you close the tab (session)" },
    category: "necessary",
  },
  {
    name: "_ga",
    provider: "Google Analytics",
    purpose: { es: "Distingue visitantes de forma anónima para las estadísticas.", en: "Distinguishes visitors anonymously for statistics." },
    duration: { es: "2 años", en: "2 years" },
    category: "analytics",
  },
  {
    name: "_ga_<ID>",
    provider: "Google Analytics",
    purpose: { es: "Mantiene el estado de la visita para las estadísticas.", en: "Keeps the state of the visit for statistics." },
    duration: { es: "2 años", en: "2 years" },
    category: "analytics",
  },
];

// Page chrome and the cookie banner.
export const privacyCopy = {
  eyebrow: { es: "Legal", en: "Legal" },
  title: { es: "Aviso de privacidad y cookies", en: "Privacy and cookie notice" },
  updated: { es: "Última actualización", en: "Last updated" },
  cookieTable: {
    name: { es: "Nombre", en: "Name" },
    provider: { es: "Proveedor", en: "Provider" },
    purpose: { es: "Para qué sirve", en: "Purpose" },
    duration: { es: "Duración", en: "Duration" },
    necessary: { es: "Necesarias", en: "Necessary" },
    analytics: { es: "Estadísticas (solo con tu consentimiento)", en: "Statistics (only with your consent)" },
  },
  footerPrivacy: { es: "Aviso de privacidad", en: "Privacy notice" },
  footerCookies: { es: "Preferencias de cookies", en: "Cookie preferences" },
  newsletterNote: {
    es: "Al suscribirte aceptas el",
    en: "By subscribing you accept the",
  },
  contactNote: { es: "Consulta el aviso de privacidad.", en: "Read the privacy notice." },
  banner: {
    title: { es: "Cookies", en: "Cookies" },
    text: {
      es: "Usamos almacenamiento necesario para que el sitio funcione y, solo si lo aceptas, cookies de Google Analytics para medir visitas de forma agregada. No usamos publicidad.",
      en: "We use necessary storage to make the site work and, only if you accept, Google Analytics cookies to measure visits in aggregate. We use no advertising.",
    },
    more: { es: "Aviso de privacidad", en: "Privacy notice" },
    accept: { es: "Aceptar", en: "Accept" },
    reject: { es: "Rechazar", en: "Reject" },
    configure: { es: "Configurar", en: "Settings" },
    save: { es: "Guardar preferencias", en: "Save preferences" },
    necessaryLabel: { es: "Necesarias", en: "Necessary" },
    necessaryHelp: {
      es: "Recuerdan tu tema y esta decisión. Siempre activas.",
      en: "Remember your theme and this choice. Always on.",
    },
    analyticsLabel: { es: "Estadísticas", en: "Statistics" },
    analyticsHelp: {
      es: "Google Analytics, para saber qué páginas y obras se visitan.",
      en: "Google Analytics, to know which pages and artworks are visited.",
    },
    alwaysOn: { es: "Siempre activas", en: "Always on" },
  },
} satisfies Record<string, LocalizedText | Record<string, LocalizedText>>;
