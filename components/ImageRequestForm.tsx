"use client";

import { useId, useState, type FormEvent } from "react";
import { track } from "@/lib/analytics";
import { seoCopy } from "@/data/seoCopy";
import { useLanguage } from "@/hooks/useLanguage";

// "Recibir imagen por correo" — secondary action next to "Consultar" on the
// artwork page (only with the SEO preview flag on; see InquireBlock). Posts to
// /api/imagen-obra, which emails a watermarked copy prepared with the
// visitor's name and tells the artist. Same button/input styles as the
// contact page (components/ContactPage.tsx).

type Status = "closed" | "open" | "sending" | "done" | "invalid" | "limit" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const secondaryBtn =
  "inline-flex min-h-[40px] items-center border border-line px-4 text-xs uppercase tracking-widest transition-colors hover:border-ink";
const inputClass =
  "block w-full border border-line bg-transparent px-4 py-3 text-base text-ink placeholder:text-muted/60 outline-none transition-colors hover:border-muted focus:border-ink focus:ring-1 focus:ring-ink sm:text-sm";
const errorText = "text-red-700 dark:text-red-400";

export default function ImageRequestForm({ artworkId }: { artworkId: string }) {
  const { pick, language } = useLanguage();
  const c = seoCopy.imageRequest;
  const id = useId();
  const [status, setStatus] = useState<Status>("closed");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    if (name.trim().length < 2 || !EMAIL_RE.test(email.trim())) {
      setStatus("invalid");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/imagen-obra", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, artworkId, lang: language, website }),
      });
      if (res.ok) {
        // No personal data in analytics.
        track("generate_lead", { method: "image_request", artwork_id: artworkId });
        setStatus("done");
      } else {
        setStatus(res.status === 429 ? "limit" : res.status === 400 ? "invalid" : "error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "closed") {
    return (
      <button
        type="button"
        data-cta="image_request"
        onClick={() => setStatus("open")}
        className={`mt-4 ${secondaryBtn}`}
      >
        {pick(c.cta)}
      </button>
    );
  }

  if (status === "done") {
    return (
      <p role="status" className="mt-4 text-sm">
        {pick(c.done)}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-4 border-t border-line pt-4">
      <div>
        <label htmlFor={`${id}-name`} className="text-xs uppercase tracking-widest text-muted">
          {pick(c.nameLabel)}
        </label>
        <input
          id={`${id}-name`}
          autoComplete="name"
          maxLength={60}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`mt-2 ${inputClass}`}
        />
      </div>
      <div>
        <label htmlFor={`${id}-email`} className="text-xs uppercase tracking-widest text-muted">
          {pick(c.emailLabel)}
        </label>
        <input
          id={`${id}-email`}
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`mt-2 ${inputClass}`}
        />
      </div>

      {/* Honeypot — invisible to people and screen readers (same as /contacto). */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${id}-website`}>Website</label>
        <input
          id={`${id}-website`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div aria-live="polite">
        {status === "invalid" && <p className={`text-sm ${errorText}`}>{pick(c.errorInvalid)}</p>}
        {status === "limit" && <p className={`text-sm ${errorText}`}>{pick(c.errorLimit)}</p>}
        {status === "error" && <p className={`text-sm ${errorText}`}>{pick(c.errorGeneric)}</p>}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-[44px] items-center justify-center bg-ink px-6 text-xs uppercase tracking-widest text-background transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
        >
          {status === "sending" ? pick(c.sending) : pick(c.submit)}
        </button>
        <button
          type="button"
          onClick={() => setStatus("closed")}
          className="text-xs uppercase tracking-widest text-muted underline-offset-4 hover:text-ink hover:underline"
        >
          {pick(c.cancel)}
        </button>
      </div>
    </form>
  );
}
