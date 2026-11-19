// Google Analytics 4. The measurement ID lives in NEXT_PUBLIC_GA_ID (Vercel
// env var, Production only). With no ID — local dev, previews — nothing is
// loaded and track() does nothing, so the site never depends on analytics.
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

type GtagFn = (...args: unknown[]) => void;

// Custom events. Never pass personal data (name, email, message) as params.
// Every event also carries `page_language` ("es" | "en", taken from <html lang>)
// so Spanish and English visitors can be told apart in the same property. It is
// set last, so a caller's params can never overwrite it.
export function track(event: string, params?: Record<string, string | number | boolean>) {
  if (!GA_ID || typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: GtagFn }).gtag;
  gtag?.("event", event, {
    ...params,
    page_language: document.documentElement.lang || "es",
  });
}
