"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { privacyCopy } from "@/data/privacy";
import { useLanguage } from "@/hooks/useLanguage";
import { OPEN_SETTINGS_EVENT, getConsent, setConsent } from "@/lib/consent";

// Cookie banner (opt-in, every visitor). Shown until the visitor decides;
// "Aceptar" and "Rechazar" have the same weight, and "Configurar" lets them
// choose per category. Reopened from "Preferencias de cookies" in the footer.
// Rendered after mount only, so the server HTML never contains it and it never
// flashes for someone who already decided.
export default function CookieBanner() {
  const { pick, href } = useLanguage();
  const b = privacyCopy.banner;
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [detailed, setDetailed] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    if (!getConsent()) setOpen(true);
    function onOpen() {
      setAnalytics(Boolean(getConsent()?.analytics));
      setDetailed(true);
      setOpen(true);
    }
    window.addEventListener(OPEN_SETTINGS_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, onOpen);
  }, []);

  if (!open) return null;

  function decide(value: boolean) {
    setConsent(value);
    setOpen(false);
    setDetailed(false);
  }

  const btn =
    "inline-flex min-h-[40px] items-center justify-center border px-5 text-xs uppercase tracking-widest transition-colors";

  return (
    <div
      role="dialog"
      aria-labelledby={titleId}
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-line bg-background px-5 py-5 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] sm:px-6"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
        <div className="max-w-2xl">
          <p id={titleId} className="text-xs uppercase tracking-widest text-muted">
            {pick(b.title)}
          </p>
          <p className="mt-2 text-sm leading-relaxed">
            {pick(b.text)}{" "}
            <Link href={href("/privacidad#cookies")} className="underline underline-offset-4 hover:text-muted">
              {pick(b.more)}
            </Link>
          </p>

          {detailed && (
            <div className="mt-4 space-y-3 border-t border-line pt-4 text-sm">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p>{pick(b.necessaryLabel)}</p>
                  <p className="text-xs text-muted">{pick(b.necessaryHelp)}</p>
                </div>
                <span className="shrink-0 text-xs uppercase tracking-widest text-muted">{pick(b.alwaysOn)}</span>
              </div>
              <label className="flex cursor-pointer items-start justify-between gap-6">
                <span>
                  <span className="block">{pick(b.analyticsLabel)}</span>
                  <span className="block text-xs text-muted">{pick(b.analyticsHelp)}</span>
                </span>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 accent-current"
                />
              </label>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 md:shrink-0 md:justify-end">
          {detailed ? (
            <button type="button" onClick={() => decide(analytics)} className={`${btn} border-ink bg-ink text-background hover:opacity-90`}>
              {pick(b.save)}
            </button>
          ) : (
            <button type="button" onClick={() => setDetailed(true)} className={`${btn} border-line hover:border-ink`}>
              {pick(b.configure)}
            </button>
          )}
          <button type="button" onClick={() => decide(false)} className={`${btn} border-ink hover:bg-ink hover:text-background`}>
            {pick(b.reject)}
          </button>
          <button type="button" onClick={() => decide(true)} className={`${btn} border-ink hover:bg-ink hover:text-background`}>
            {pick(b.accept)}
          </button>
        </div>
      </div>
    </div>
  );
}
