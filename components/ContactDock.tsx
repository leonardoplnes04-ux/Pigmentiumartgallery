"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { artist } from "@/data/artist";
import { useLanguage } from "@/hooks/useLanguage";
import { isContactPath } from "@/lib/routes";

// Mobile-only contact bar fixed to the bottom edge, on every page except the
// contact page itself. Tapping it opens a sheet with two ways to write:
// WhatsApp (blank chat) and email (blank message). Hidden from `md` up, where
// the header already has a Contacto button.
//
// Layering: bar (40) sits under the site's full-screen modals (50: artwork
// specs, image viewer) and the cookie banner (60), so it never covers them;
// the sheet (69/70) sits above everything, since the visitor asked for it.
export default function ContactDock() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const c = t.contactDock;
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const barButton = useRef<HTMLButtonElement>(null);
  const firstOption = useRef<HTMLAnchorElement>(null);
  const wasOpen = useRef(false);

  // Esc closes; the page behind doesn't scroll while the sheet is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  // Focus goes into the sheet when it opens and back to the bar when it closes.
  useEffect(() => {
    if (open) firstOption.current?.focus();
    else if (wasOpen.current) barButton.current?.focus();
    wasOpen.current = open;
  }, [open]);

  // Navigating away (e.g. to the contact page) never leaves the sheet open.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (isContactPath(pathname)) return null;

  const optionBase = "flex w-full items-center gap-4 border border-ink px-4 py-4";

  return (
    <div className="md:hidden">
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-background px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-6px_20px_rgba(0,0,0,0.08)]">
        <button
          ref={barButton}
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          className="block w-full bg-ink px-4 py-3.5 text-xs uppercase tracking-widest text-background"
        >
          {c.bar}
        </button>
      </div>
      {/* Keeps the end of the page (footer) clear of the fixed bar. */}
      <div aria-hidden="true" className="h-[72px]" />

      {open && (
        <>
          <div
            aria-hidden="true"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[69] bg-black/45"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="fixed inset-x-0 bottom-0 z-[70] border-t border-line bg-background px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-6 text-ink"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted">{c.eyebrow}</p>
                <h2 id={titleId} className="mt-1.5 font-serif text-2xl leading-tight">
                  {c.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={c.closeAria}
                className="shrink-0 py-1 text-[11px] uppercase tracking-widest"
              >
                {c.close}
              </button>
            </div>

            <a
              ref={firstOption}
              href={`https://wa.me/${artist.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${optionBase} bg-ink text-background`}
            >
              <ChatIcon />
              <span>
                <span className="block text-[13px] font-medium uppercase tracking-widest">
                  {c.whatsapp}
                </span>
                <span className="mt-0.5 block text-xs opacity-70">{c.whatsappSub}</span>
              </span>
            </a>

            <a href={`mailto:${artist.email}`} className={`${optionBase} mt-2.5`}>
              <MailIcon />
              <span>
                <span className="block text-[13px] font-medium uppercase tracking-widest">
                  {c.email}
                </span>
                <span className="mt-0.5 block whitespace-nowrap text-[11.5px] opacity-75">
                  {artist.email}
                </span>
              </span>
            </a>
          </div>
        </>
      )}
    </div>
  );
}

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-[22px] w-[22px] shrink-0",
  "aria-hidden": true,
};

function ChatIcon() {
  return (
    <svg {...iconProps}>
      <path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.4L3 20.5l1.7-5.5A8.4 8.4 0 1 1 21 11.5z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}
