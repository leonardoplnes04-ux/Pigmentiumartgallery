"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { GA_ID, track } from "@/lib/analytics";
import { CONSENT_EVENT, clearAnalyticsCookies, getConsent, type Consent } from "@/lib/consent";

// Loads GA4 and measures the clicks that matter for selling work. Rendered once
// in lib/rootLayout.tsx; renders nothing unless NEXT_PUBLIC_GA_ID is set.
//
// Consent (opt-in, every country): Google's script is NOT loaded at all until
// the visitor accepts analytics in the cookie banner (components/
// CookieBanner.tsx). No cookies and no requests to Google before that. If the
// visitor later withdraws consent, GA is switched off, its cookies are
// deleted and nothing more is sent.
const bootstrap = `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
window.gtag=gtag;
gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
gtag('consent','update',{analytics_storage:'granted'});
gtag('js',new Date());
gtag('config','${GA_ID}',{anonymize_ip:true,allow_google_signals:false,allow_ad_personalization_signals:false});
`;

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void } & Record<string, unknown>;

export default function Analytics() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!GA_ID) return;
    setAllowed(Boolean(getConsent()?.analytics));
    function onConsent(event: Event) {
      const consent = (event as CustomEvent<Consent>).detail;
      const w = window as unknown as GtagWindow;
      if (consent.analytics) {
        w[`ga-disable-${GA_ID}`] = false;
        w.gtag?.("consent", "update", { analytics_storage: "granted" });
        setAllowed(true);
      } else {
        // Withdrawn: stop GA immediately and remove its cookies.
        w[`ga-disable-${GA_ID}`] = true;
        w.gtag?.("consent", "update", { analytics_storage: "denied" });
        clearAnalyticsCookies();
        setAllowed(false);
      }
    }
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  // Any element marked data-cta="<name>" reports a click as `cta_click`
  // (track() does nothing while GA is not loaded).
  useEffect(() => {
    if (!GA_ID) return;
    function onClick(e: MouseEvent) {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-cta]");
      if (!el) return;
      track("cta_click", { cta: el.dataset.cta ?? "" });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!GA_ID || !allowed) return null;
  return (
    <>
      <Script id="ga-bootstrap" strategy="afterInteractive">
        {bootstrap}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
