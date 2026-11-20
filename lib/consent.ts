// Cookie / analytics consent. The visitor's choice lives in localStorage on
// their own device (never sent to our servers). Analytics stays OFF for every
// visitor, in every country, until they accept (opt-in, GDPR/LGPD/LFPDPPP
// style). Components listen to CONSENT_EVENT to react to a change, and any
// "Preferencias de cookies" link calls openConsentSettings() to reopen the
// banner.

export const CONSENT_KEY = "dartgallery-consent";
export const CONSENT_EVENT = "dartgallery:consent";
export const OPEN_SETTINGS_EVENT = "dartgallery:open-consent";
// Bump when the categories change, so everyone is asked again.
const VERSION = 1;

export interface Consent {
  v: number;
  analytics: boolean;
  // ISO date of the decision (kept as proof of consent).
  at: string;
}

export function getConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Consent;
    if (data?.v !== VERSION || typeof data.analytics !== "boolean") return null;
    return data;
  } catch {
    return null;
  }
}

export function setConsent(analytics: boolean) {
  const consent: Consent = { v: VERSION, analytics, at: new Date().toISOString() };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  } catch {}
  window.dispatchEvent(new CustomEvent<Consent>(CONSENT_EVENT, { detail: consent }));
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}

// Removes Google Analytics cookies (_ga, _ga_<ID>) after consent is withdrawn.
export function clearAnalyticsCookies() {
  const names = document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((name) => name === "_ga" || name.startsWith("_ga_") || name === "_gid");
  const host = location.hostname;
  const domains = ["", host, `.${host}`, `.${host.replace(/^www\./, "")}`];
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}
