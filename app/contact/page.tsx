"use client";

/*
 * Contact — SHOTBYGAFAR message form + direct channels on the black
 * graph-paper canvas. Posts to /api/contact with the same email/mailto
 * fallback pattern as the booking form.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Mail, MapPin, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/LinkIcons";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import {
  FieldError,
  Input,
  Label,
  Textarea,
} from "@/components/FormControls";

const DOTTED = {
  backgroundImage: "radial-gradient(var(--paper-dot) 1px, transparent 1px)",
  backgroundSize: "16px 16px",
} as const;

const CONTACT_EMAIL = "contact@shotbygafar.com";
const WHATSAPP = "447882655541";

type Form = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const EMPTY: Form = { name: "", email: "", subject: "", message: "" };

function buildSummary(f: Form) {
  return [
    `Message via shotbygafar.com`,
    ``,
    `Name: ${f.name}`,
    `Email: ${f.email}`,
    `Subject: ${f.subject || "—"}`,
    ``,
    f.message,
  ].join("\n");
}

export default function Contact() {
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "done" | "fallback"
  >("idle");

  function update<K extends keyof Form>(key: K, value: Form[K]) {
    setForm(f => ({ ...f, [key]: value }));
    setErrors(e => (e[key] ? { ...e, [key]: "" } : e));
  }

  function validate(f: Form) {
    const e: Record<string, string> = {};
    if (!f.name.trim()) e.name = "Name is required.";
    if (!f.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim()))
      e.email = "Please enter a valid email address.";
    if (!f.message.trim()) e.message = "Please add a short message.";
    return e;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate(form);
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));

      if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        return;
      }
      if (!res.ok || !data.ok) {
        setStatus("fallback");
        return;
      }
      setStatus(data.delivered ? "done" : "fallback");
    } catch {
      setStatus("fallback");
    }
  }

  const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    form.subject ? `${form.subject} (${form.name})` : `Message from ${form.name}`,
  )}&body=${encodeURIComponent(buildSummary(form))}`;

  const whatsappHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    buildSummary(form),
  )}`;

  return (
    <div className="min-h-screen px-4 py-6 sm:px-8 sm:py-8">
      <SiteHeader active="/contact" />

      <main className="mx-auto max-w-2xl pb-14">
        {/* ── Hero ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-md border border-ink/10 bg-paper px-6 py-8 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.55)] sm:px-10 sm:py-10"
          style={DOTTED}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-muted">
            Contact:
          </p>
          <h1 className="mt-1 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-ink sm:text-5xl">
            Get in touch
          </h1>
          <p className="mt-4 max-w-md font-mono text-[13px] leading-relaxed text-ink-soft">
            Questions, collaborations, or just saying hi — drop us a line and
            we&apos;ll get back to you, usually within a day.
          </p>

          <div className="mt-6 space-y-2.5 border-t border-dashed border-ink/15 pt-5">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-3 font-mono text-[12px] text-ink-soft transition-colors hover:text-ink"
            >
              <Mail className="h-4 w-4 text-ink-faint" />
              {CONTACT_EMAIL}
            </a>
            <a
              href="tel:+447882655541"
              className="flex items-center gap-3 font-mono text-[12px] text-ink-soft transition-colors hover:text-ink"
            >
              <Phone className="h-4 w-4 text-ink-faint" />
              +44 788 265 5541
            </a>
            <p className="flex items-center gap-3 font-mono text-[12px] text-ink-soft">
              <MapPin className="h-4 w-4 text-ink-faint" />
              United Kingdom · Mobile &amp; Studio
            </p>
          </div>
        </motion.section>

        {/* ── Form / confirmation ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative mt-4 rounded-md border border-ink/10 bg-paper px-6 py-7 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.45)] sm:px-8 sm:py-9"
          style={DOTTED}
        >
          {status === "done" ? (
            <div className="py-4 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper">
                <Check className="h-6 w-6" />
              </span>
              <h2 className="mt-4 font-display text-2xl font-extrabold uppercase tracking-tight text-ink">
                Message sent
              </h2>
              <p className="mx-auto mt-2 max-w-sm font-mono text-[12px] leading-relaxed text-ink-dim">
                Thanks {form.name.split(" ")[0] || "there"} — we&apos;ve got your
                message and will reply to {form.email} soon.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <a
                  href="/booking"
                  className="rounded-md bg-ink px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-paper transition-opacity hover:opacity-90"
                >
                  Book a Shoot
                </a>
                <a
                  href="/portfolio"
                  className="rounded-md border border-ink/20 bg-tile px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-ink transition-colors hover:bg-tile-hover"
                >
                  See Portfolio
                </a>
              </div>
            </div>
          ) : status === "fallback" ? (
            <div className="py-4 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper">
                <Mail className="h-6 w-6" />
              </span>
              <h2 className="mt-4 font-display text-2xl font-extrabold uppercase tracking-tight text-ink">
                Almost there
              </h2>
              <p className="mx-auto mt-2 max-w-sm font-mono text-[12px] leading-relaxed text-ink-dim">
                Send your message straight to us by email or WhatsApp and
                we&apos;ll reply as soon as we can.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <a
                  href={mailtoHref}
                  className="rounded-md bg-ink px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-paper transition-opacity hover:opacity-90"
                >
                  Send by Email
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md border border-ink/20 bg-tile px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-ink transition-colors hover:bg-tile-hover"
                >
                  Send by WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-muted">
                Message:
              </p>
              <h2 className="mb-6 mt-1 font-display text-2xl font-extrabold uppercase tracking-tight text-ink sm:text-3xl">
                Send a message
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name" required>
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={form.name}
                    invalid={!!errors.name}
                    onChange={e => update("name", e.target.value)}
                    placeholder="Your name"
                  />
                  <FieldError message={errors.name} />
                </div>
                <div>
                  <Label htmlFor="email" required>
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    invalid={!!errors.email}
                    onChange={e => update("email", e.target.value)}
                    placeholder="you@email.com"
                  />
                  <FieldError message={errors.email} />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={e => update("subject", e.target.value)}
                    placeholder="What's this about? (optional)"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="message" required>
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    invalid={!!errors.message}
                    onChange={e => update("message", e.target.value)}
                    placeholder="Tell us what you're thinking…"
                  />
                  <FieldError message={errors.message} />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="rounded-md bg-ink px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-paper transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {status === "submitting" ? "Sending…" : "Send Message"}
                </button>
                <a
                  href="https://www.instagram.com/shot.by.gafar/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted transition-colors hover:text-ink"
                >
                  <InstagramIcon />
                  @shot.by.gafar
                </a>
              </div>
            </form>
          )}
        </motion.section>

        <SiteFooter />
      </main>
    </div>
  );
}
