"use client";

import { useEffect } from "react";
import Script from "next/script";
import { GA_ID, track } from "@/lib/analytics";

// Loads GA4 and measures the clicks that matter for selling work. Rendered once
// in app/layout.tsx; renders nothing unless NEXT_PUBLIC_GA_ID is set.
//
// Consent: visitors from the EEA, UK and Switzerland start with analytics
// storage denied (GA then only receives cookieless pings). The rest of the
// world is measured normally. There is no banner, so in those regions the data
// stays anonymous and partial — add a banner later if exact EU numbers matter.
const EEA_UK_CH = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IS",
  "IE", "IT", "LV", "LI", "LT", "LU", "MT", "NL", "NO", "PL", "PT", "RO", "SK", "SI",
  "ES", "SE", "GB", "CH",
];

const bootstrap = `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',region:${JSON.stringify(EEA_UK_CH)}});
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
gtag('js',new Date());
gtag('config','${GA_ID}');
`;

export default function Analytics() {
  // Any element marked data-cta="<name>" reports a click as `cta_click`.
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

  if (!GA_ID) return null;
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
