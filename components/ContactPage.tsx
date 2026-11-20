"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { api } from "@/convex/_generated/api";
import { getConvex } from "@/lib/convexClient";
import { track } from "@/lib/analytics";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { artist } from "@/data/artist";
import { site } from "@/data/site";
import { useLanguage } from "@/hooks/useLanguage";
import Link from "next/link";
import { privacyCopy } from "@/data/privacy";
import {
  CONTACT_INTERESTS,
  MESSAGE_MAX,
  buildLeadEmail,
  isArtworkImagePath,
  mailtoUrl,
  validateLead,
  type ContactErrors,
  type ContactField,
  type ContactLead,
} from "@/lib/contact";

type Status = "idle" | "sending" | "success" | "error";

const EMPTY: ContactLead = {
  name: "",
  email: "",
  phone: "",
  interest: "",
  artwork: "",
  artworkImage: "",
  message: "",
  website: "",
};

// Order matters: on submit, focus jumps to the first invalid field.
const FIELD_ORDER: ContactField[] = ["name", "email", "interest", "message"];

const errorText = "text-red-700 dark:text-red-400";
const fallbackBtn =
  "inline-flex min-h-[40px] items-center border border-line px-4 text-xs uppercase tracking-widest transition-colors hover:border-ink";

export default function ContactPage() {
  const { t, language, pick, href } = useLanguage();
  const c = t.contactPage;

  const [lead, setLead] = useState<ContactLead>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const successRef = useRef<HTMLHeadingElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  // Height of the form when it was submitted, so the success panel keeps the
  // same footprint instead of collapsing and jerking the page.
  const [panelHeight, setPanelHeight] = useState<number>();

  // Deep link from the "Consultar" buttons: /contacto?obra=<title>&img=<path>
  // preselects "Adquirir una obra", fills the artwork field and shows the
  // piece as a reference thumbnail.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const obra = params.get("obra");
    const img = params.get("img") ?? "";
    if (obra) {
      setLead((prev) => ({
        ...prev,
        interest: "purchase",
        artwork: obra.slice(0, 200),
        artworkImage: isArtworkImagePath(img) ? img : "",
      }));
    }
  }, []);

  useEffect(() => {
    if (status !== "success") return;
    panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    successRef.current?.focus({ preventScroll: true });
  }, [status]);

  const errors = validateLead(lead);
  const visibleErrors: ContactErrors = {};
  for (const field of FIELD_ORDER) {
    if (errors[field] && (touched[field] || submitAttempted)) visibleErrors[field] = true;
  }

  function update<K extends keyof ContactLead>(key: K, value: ContactLead[K]) {
    setLead((prev) => ({ ...prev, [key]: value }));
  }

  function touch(field: ContactField) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  const email = buildLeadEmail(lead, site.name);
  const mailtoHref = mailtoUrl(artist.email, email.subject, email.body);
  const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(artist.email)}&su=${encodeURIComponent(email.subject)}&body=${encodeURIComponent(email.body)}`;
  const outlookHref = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(artist.email)}&subject=${encodeURIComponent(email.subject)}&body=${encodeURIComponent(email.body)}`;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitAttempted(true);

    const firstInvalid = FIELD_ORDER.find((field) => errors[field]);
    if (firstInvalid) {
      const target =
        firstInvalid === "interest"
          ? document.querySelector<HTMLInputElement>('input[name="interest"]')
          : document.getElementById(`contact-${firstInvalid}`);
      target?.focus();
      return;
    }

    if (status === "sending") return;

    // Honeypot: a bot filled the hidden field. Pretend it worked, store nothing.
    if (lead.website.trim()) {
      setPanelHeight(panelRef.current?.offsetHeight);
      setStatus("success");
      return;
    }

    setStatus("sending");
    try {
      const convex = getConvex();
      if (!convex) throw new Error("convex_not_configured");
      await convex.mutation(api.leads.submit, {
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        interest: lead.interest,
        artwork: lead.artwork,
        artworkImage: isArtworkImagePath(lead.artworkImage) ? lead.artworkImage : "",
        message: lead.message,
        lang: language,
      });
      // No personal data: only the kind of lead and the artwork reference.
      const artworkId = lead.artwork.match(/ref\. ([\w-]+)/)?.[1];
      track("generate_lead", {
        method: "contact_form",
        interest: lead.interest,
        from_artwork: Boolean(lead.artwork),
        ...(artworkId ? { artwork_id: artworkId } : {}),
      });
      setPanelHeight(panelRef.current?.offsetHeight);
      setStatus("success");
    } catch {
      // Plan B: the visitor can still send the pre-written email themselves.
      setStatus("error");
    }
  }

  function reset() {
    setLead(EMPTY);
    setTouched({});
    setSubmitAttempted(false);
    setStatus("idle");
    setPanelHeight(undefined);
  }

  const showArtwork = lead.interest === "purchase" || lead.interest === "commission";
  const instagramHandle = artist.socials.instagram?.replace(/^https?:\/\/(www\.)?instagram\.com\//, "@").replace(/\/$/, "");

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16 lg:gap-24">
          {/* Left: pitch + existing direct channels */}
          <aside className="md:sticky md:top-28 md:self-start">
            <p className="text-xs uppercase tracking-widest text-muted">{c.eyebrow}</p>
            <h1 className="mt-2 font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">{c.title}</h1>
            <p className="mt-5 max-w-md leading-relaxed text-muted">{c.intro}</p>

            <p className="mt-10 text-xs uppercase tracking-widest text-muted">{c.directLabel}</p>
            <dl className="mt-3 divide-y divide-line border-y border-line">
              <ChannelRow label={c.emailLabel}>
                <div className="flex items-center justify-between gap-3">
                  <a
                    href={`mailto:${artist.email}`}
                    className="min-w-0 underline-offset-4 [overflow-wrap:anywhere] hover:underline"
                  >
                    {artist.email}
                  </a>
                  <CopyButton value={artist.email} label={c.copy} doneLabel={c.copied} />
                </div>
              </ChannelRow>
              {artist.socials.instagram && (
                <ChannelRow label={c.instagramLabel}>
                  <a
                    href={artist.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 underline-offset-4 hover:underline"
                  >
                    {instagramHandle}
                    <ArrowUpRight />
                  </a>
                </ChannelRow>
              )}
              <ChannelRow label={c.studioLabel}>{c.studioValue}</ChannelRow>
            </dl>

            <p className="mt-6 flex items-center gap-2 text-sm text-muted">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {c.responseNote}
            </p>
          </aside>

          {/* Right: lead form */}
          <section
            ref={panelRef}
            aria-labelledby="contact-form-title"
            className="flex scroll-mt-28 flex-col border border-line p-6 sm:p-10"
            style={status === "success" && panelHeight ? { minHeight: panelHeight } : undefined}
          >
            {status === "success" ? (
              <div className="flex min-h-[420px] flex-1 flex-col items-start justify-center" role="status">
                <span className="flex h-12 w-12 items-center justify-center border border-ink">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-6 w-6" aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h2 ref={successRef} tabIndex={-1} className="mt-6 font-serif text-2xl outline-none sm:text-3xl">
                  {c.successTitle}
                </h2>
                <p className="mt-3 max-w-md leading-relaxed text-muted">{c.successBody}</p>

                <button
                  type="button"
                  onClick={reset}
                  className="mt-8 text-xs uppercase tracking-widest underline underline-offset-4 hover:text-muted"
                >
                  {c.sendAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h2 id="contact-form-title" className="font-serif text-2xl">
                  {c.formTitle}
                </h2>

                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <TextField
                    id="contact-name"
                    label={c.nameLabel}
                    placeholder={c.namePlaceholder}
                    autoComplete="name"
                    value={lead.name}
                    onChange={(v) => update("name", v)}
                    onBlur={() => touch("name")}
                    error={visibleErrors.name ? c.errors.name : undefined}
                  />
                  <TextField
                    id="contact-email"
                    label={c.emailFieldLabel}
                    placeholder={c.emailPlaceholder}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={lead.email}
                    onChange={(v) => update("email", v)}
                    onBlur={() => touch("email")}
                    error={visibleErrors.email ? c.errors.email : undefined}
                  />
                  <TextField
                    id="contact-phone"
                    label={c.phoneLabel}
                    optionalLabel={c.optional}
                    placeholder={c.phonePlaceholder}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={lead.phone}
                    onChange={(v) => update("phone", v)}
                    className="sm:col-span-2"
                  />
                </div>

                <fieldset
                  className="mt-8"
                  aria-describedby={visibleErrors.interest ? "contact-interest-error" : undefined}
                >
                  <legend className="text-xs uppercase tracking-widest text-muted">{c.interestLabel}</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {CONTACT_INTERESTS.map((key) => {
                      const checked = lead.interest === key;
                      return (
                        <label key={key} className="cursor-pointer">
                          <input
                            type="radio"
                            name="interest"
                            value={key}
                            checked={checked}
                            onChange={() => {
                              update("interest", key);
                              touch("interest");
                            }}
                            className="peer sr-only"
                          />
                          <span
                            className={`inline-flex min-h-[44px] items-center border px-4 text-sm transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink ${
                              checked
                                ? "border-ink bg-ink text-background"
                                : visibleErrors.interest
                                  ? "border-red-700/60 hover:border-ink dark:border-red-400/60"
                                  : "border-line hover:border-ink"
                            }`}
                          >
                            {c.interests[key]}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  {visibleErrors.interest && (
                    <p id="contact-interest-error" className={`mt-2 text-sm ${errorText}`}>
                      {c.errors.interest}
                    </p>
                  )}
                </fieldset>

                {/* Progressive disclosure: only relevant when buying or commissioning */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
                    showArtwork ? "mt-6 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                  aria-hidden={!showArtwork}
                >
                  <div className="overflow-hidden">
                    <TextField
                      id="contact-artwork"
                      label={c.artworkLabel}
                      optionalLabel={c.optional}
                      placeholder={c.artworkPlaceholder}
                      value={lead.artwork}
                      onChange={(v) => {
                        update("artwork", v);
                        // Clearing the field drops the reference photo with it.
                        if (!v.trim()) update("artworkImage", "");
                      }}
                      tabIndex={showArtwork ? undefined : -1}
                      leading={
                        lead.artworkImage ? (
                          <div className="h-14 w-14 shrink-0 overflow-hidden border border-line bg-line">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={lead.artworkImage}
                              alt={lead.artwork}
                              decoding="async"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ) : undefined
                      }
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <label htmlFor="contact-message" className="text-xs uppercase tracking-widest text-muted">
                      {c.messageLabel}
                    </label>
                    <span className="text-xs tabular-nums text-muted" aria-hidden="true">
                      {lead.message.length} / {MESSAGE_MAX}
                    </span>
                  </div>
                  <textarea
                    id="contact-message"
                    rows={6}
                    maxLength={MESSAGE_MAX}
                    placeholder={c.messagePlaceholder}
                    value={lead.message}
                    onChange={(e) => update("message", e.target.value)}
                    onBlur={() => touch("message")}
                    aria-invalid={visibleErrors.message || undefined}
                    aria-describedby={visibleErrors.message ? "contact-message-error" : undefined}
                    className={`${inputClass(!!visibleErrors.message)} mt-2 min-h-[150px] resize-y leading-relaxed`}
                  />
                  {visibleErrors.message && (
                    <p id="contact-message-error" className={`mt-2 text-sm ${errorText}`}>
                      {c.errors.message}
                    </p>
                  )}
                </div>

                {/* Honeypot — invisible to people and screen readers */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor="contact-website">Website</label>
                  <input
                    id="contact-website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={lead.website}
                    onChange={(e) => update("website", e.target.value)}
                  />
                </div>

                <div aria-live="polite">
                  {submitAttempted && Object.keys(visibleErrors).length > 0 && (
                    <p className={`mt-6 text-sm ${errorText}`}>{c.errorSummary}</p>
                  )}
                </div>

                <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-xs text-xs leading-relaxed text-muted">
                    {c.privacy}{" "}
                    <Link href={href("/privacidad")} className="underline underline-offset-4 hover:text-ink">
                      {pick(privacyCopy.contactNote)}
                    </Link>
                  </p>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 bg-ink px-8 text-xs uppercase tracking-widest text-background transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-wait disabled:opacity-60"
                  >
                    {status === "sending" ? c.sending : c.submit}
                    <span aria-hidden="true">→</span>
                  </button>
                </div>

                {status === "error" && (
                  <div role="alert" className="mt-6 border-t border-line pt-6">
                    <p className={`text-sm ${errorText}`}>{c.sendError}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <a href={mailtoHref} className={fallbackBtn}>
                        {c.openMailApp}
                      </a>
                      <a href={gmailHref} target="_blank" rel="noopener noreferrer" className={fallbackBtn}>
                        Gmail
                      </a>
                      <a href={outlookHref} target="_blank" rel="noopener noreferrer" className={fallbackBtn}>
                        Outlook
                      </a>
                      <CopyTextButton
                        value={`${artist.email}

${email.subject}

${email.body}`}
                        label={c.copyMessage}
                        doneLabel={c.copiedMessage}
                      />
                    </div>
                  </div>
                )}
              </form>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

function inputClass(invalid: boolean) {
  return `block w-full border bg-transparent px-4 py-3 text-base text-ink placeholder:text-muted/60 outline-none transition-colors focus:border-ink focus:ring-1 focus:ring-ink sm:text-sm ${
    invalid ? "border-red-700/70 dark:border-red-400/70" : "border-line hover:border-muted"
  }`;
}

function TextField({
  id,
  label,
  optionalLabel,
  error,
  onChange,
  className = "",
  leading,
  ...input
}: {
  id: string;
  label: string;
  optionalLabel?: string;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  type?: string;
  inputMode?: "email" | "tel" | "text";
  autoComplete?: string;
  tabIndex?: number;
  className?: string;
  leading?: ReactNode;
}) {
  const errorId = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="flex items-baseline justify-between gap-4 text-xs uppercase tracking-widest text-muted">
        <span>{label}</span>
        {optionalLabel && <span className="normal-case tracking-normal text-muted/70">{optionalLabel}</span>}
      </label>
      <div className="mt-2 flex gap-3">
        {leading}
        <input
          id={id}
          {...input}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`${inputClass(!!error)} min-w-0 flex-1`}
        />
      </div>
      {error && (
        <p id={errorId} className={`mt-2 text-sm ${errorText}`}>
          {error}
        </p>
      )}
    </div>
  );
}

function ChannelRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-1.5 py-4 text-sm lg:grid-cols-[88px_1fr] lg:items-center lg:gap-4">
      <dt className="text-xs uppercase tracking-widest text-muted">{label}</dt>
      <dd className="min-w-0">{children}</dd>
    </div>
  );
}

function CopyButton({ value, label, doneLabel }: { value: string; label: string; doneLabel: string }) {
  const [done, setDone] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setDone(true);
      window.setTimeout(() => setDone(false), 1800);
    } catch {
      // Clipboard blocked (insecure context / permissions): mailto link still works.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={done ? doneLabel : label}
      title={done ? doneLabel : label}
      className="flex h-8 w-8 shrink-0 items-center justify-center border border-line text-muted transition-colors hover:border-ink hover:text-ink"
    >
      {done ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5" aria-hidden="true">
          <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-3.5 w-3.5" aria-hidden="true">
          <rect x="9" y="9" width="11" height="11" />
          <path d="M5 15V5a1 1 0 0 1 1-1h10" strokeLinecap="round" />
        </svg>
      )}
      <span className="sr-only" aria-live="polite">{done ? doneLabel : ""}</span>
    </button>
  );
}

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-3.5 w-3.5" aria-hidden="true">
      <path d="M7 17L17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CopyTextButton({ value, label, doneLabel }: { value: string; label: string; doneLabel: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setDone(true);
          window.setTimeout(() => setDone(false), 2000);
        } catch {
          // Clipboard blocked: the other options still work.
        }
      }}
      className={fallbackBtn}
      aria-live="polite"
    >
      {done ? doneLabel : label}
    </button>
  );
}
