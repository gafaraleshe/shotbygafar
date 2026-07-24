"use client";

/*
 * Booking — SHOTBYGAFAR enquiry form on the black graph-paper canvas.
 * Posts to /api/booking. If server-side email delivery is configured
 * (RESEND_API_KEY) the enquiry is emailed and a confirmation is shown;
 * otherwise the form falls back to a pre-filled mailto / WhatsApp so an
 * enquiry is never lost. A ?package= query param pre-selects a package.
 */

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CalendarCheck, Check, Mail } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import {
  FieldError,
  Input,
  Label,
  Select,
  Textarea,
} from "@/components/FormControls";

const DOTTED = {
  backgroundImage: "radial-gradient(rgba(0,0,0,0.07) 1px, transparent 1px)",
  backgroundSize: "16px 16px",
} as const;

const CONTACT_EMAIL = "contact@shotbygafar.com";
const WHATSAPP = "447882655541";

const SHOOT_TYPES = [
  "Portraits",
  "Wedding",
  "Event",
  "Brand Content",
  "Other",
];

const PACKAGES = [
  "Portrait Session",
  "Event Coverage",
  "Wedding Film & Photo",
  "Brand Content",
  "Not sure yet",
];

type Form = {
  name: string;
  email: string;
  phone: string;
  shootType: string;
  package: string;
  date: string;
  location: string;
  message: string;
};

const EMPTY: Form = {
  name: "",
  email: "",
  phone: "",
  shootType: "",
  package: "",
  date: "",
  location: "",
  message: "",
};

function buildSummary(f: Form) {
  return [
    `Booking enquiry — SHOTBYGAFAR`,
    ``,
    `Name: ${f.name}`,
    `Email: ${f.email}`,
    `Phone: ${f.phone || "—"}`,
    `Shoot: ${f.shootType}`,
    `Package: ${f.package || "—"}`,
    `Date: ${f.date || "—"}`,
    `Location: ${f.location || "—"}`,
    ``,
    `Details:`,
    f.message || "—",
  ].join("\n");
}

function BookingForm() {
  // Pre-select a package from ?package= (e.g. linked from /pricing).
  const searchParams = useSearchParams();
  const initialPackage = searchParams.get("package") ?? "";

  const [form, setForm] = useState<Form>(() => ({
    ...EMPTY,
    package: PACKAGES.includes(initialPackage) ? initialPackage : "",
  }));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "done" | "fallback" | "error"
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
    if (!f.shootType) e.shootType = "Please pick a shoot type.";
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
      const res = await fetch("/api/booking", {
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
    `Booking enquiry — ${form.shootType || "Shoot"} (${form.name})`,
  )}&body=${encodeURIComponent(buildSummary(form))}`;

  const whatsappHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    buildSummary(form),
  )}`;

  return (
    <div className="min-h-screen px-4 py-6 sm:px-8 sm:py-8">
      <SiteHeader active="/booking" />

      <main className="mx-auto max-w-2xl pb-14">
        {/* ── Hero ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-md border border-neutral-900/10 bg-[#f4f3ec] px-6 py-8 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.55)] sm:px-10 sm:py-10"
          style={DOTTED}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
            Booking:
          </p>
          <h1 className="mt-1 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-neutral-900 sm:text-5xl">
            Book a shoot
          </h1>
          <p className="mt-4 max-w-md font-mono text-[13px] leading-relaxed text-neutral-700">
            Tell us the date, location, and what you have in mind. We&apos;ll
            confirm availability and send a tailored quote — usually within a
            day.
          </p>
        </motion.section>

        {/* ── Form / confirmation ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative mt-4 rounded-md border border-neutral-900/10 bg-[#f4f3ec] px-6 py-7 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.45)] sm:px-8 sm:py-9"
          style={DOTTED}
        >
          {status === "done" ? (
            <div className="py-4 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-white">
                <Check className="h-6 w-6" />
              </span>
              <h2 className="mt-4 font-display text-2xl font-extrabold uppercase tracking-tight text-neutral-900">
                Request sent
              </h2>
              <p className="mx-auto mt-2 max-w-sm font-mono text-[12px] leading-relaxed text-neutral-600">
                Thanks {form.name.split(" ")[0] || "there"} — your enquiry is in.
                We&apos;ll reply to {form.email} within a day to confirm
                availability.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <a
                  href="/pricing"
                  className="rounded-md border border-neutral-900/20 bg-white px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-neutral-900 transition-colors hover:bg-neutral-50"
                >
                  View Pricing
                </a>
                <a
                  href="/portfolio"
                  className="rounded-md border border-neutral-900/20 bg-white px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-neutral-900 transition-colors hover:bg-neutral-50"
                >
                  See Portfolio
                </a>
              </div>
            </div>
          ) : status === "fallback" ? (
            <div className="py-4 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-white">
                <Mail className="h-6 w-6" />
              </span>
              <h2 className="mt-4 font-display text-2xl font-extrabold uppercase tracking-tight text-neutral-900">
                One last step
              </h2>
              <p className="mx-auto mt-2 max-w-sm font-mono text-[12px] leading-relaxed text-neutral-600">
                Your details are ready — send them straight to us by email or
                WhatsApp and we&apos;ll take it from there.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <a
                  href={mailtoHref}
                  className="rounded-md bg-neutral-900 px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
                >
                  Send by Email
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md border border-neutral-900/20 bg-white px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-neutral-900 transition-colors hover:bg-neutral-50"
                >
                  Send by WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
                Enquiry:
              </p>
              <h2 className="mb-6 mt-1 flex items-center gap-2 font-display text-2xl font-extrabold uppercase tracking-tight text-neutral-900 sm:text-3xl">
                <CalendarCheck className="h-6 w-6" />
                Your details
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
                <div>
                  <Label htmlFor="phone">Phone / WhatsApp</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={e => update("phone", e.target.value)}
                    placeholder="Optional"
                  />
                </div>
                <div>
                  <Label htmlFor="date">Preferred date</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={e => update("date", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="shootType" required>
                    Shoot type
                  </Label>
                  <Select
                    id="shootType"
                    name="shootType"
                    value={form.shootType}
                    invalid={!!errors.shootType}
                    onChange={e => update("shootType", e.target.value)}
                  >
                    <option value="" disabled>
                      Select…
                    </option>
                    {SHOOT_TYPES.map(t => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </Select>
                  <FieldError message={errors.shootType} />
                </div>
                <div>
                  <Label htmlFor="package">Package</Label>
                  <Select
                    id="package"
                    name="package"
                    value={form.package}
                    onChange={e => update("package", e.target.value)}
                  >
                    <option value="">Select…</option>
                    {PACKAGES.map(p => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={form.location}
                    onChange={e => update("location", e.target.value)}
                    placeholder="City / venue (optional)"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="message">Tell us more</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={e => update("message", e.target.value)}
                    placeholder="What are you looking to capture? Any references, timings, or must-haves."
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="rounded-md bg-neutral-900 px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {status === "submitting" ? "Sending…" : "Send Booking Request"}
                </button>
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-500">
                  Or email {CONTACT_EMAIL}
                </p>
              </div>
            </form>
          )}
        </motion.section>

        <SiteFooter />
      </main>
    </div>
  );
}

export default function Booking() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen px-4 py-6 sm:px-8 sm:py-8">
          <SiteHeader active="/booking" />
        </div>
      }
    >
      <BookingForm />
    </Suspense>
  );
}
