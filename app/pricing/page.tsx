"use client";

/*
 * Pricing — SHOTBYGAFAR packages, add-ons, and a note. Same filing-card
 * system. Prices are starting points; edit the `packages` / `addOns` arrays
 * to adjust. Every card routes to /booking with the package pre-selected.
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

const DOTTED = {
  backgroundImage: "radial-gradient(rgba(0,0,0,0.07) 1px, transparent 1px)",
  backgroundSize: "16px 16px",
} as const;

type Pkg = {
  name: string;
  tagline: string;
  price: string;
  unit: string;
  features: string[];
  featured?: boolean;
};

const packages: Pkg[] = [
  {
    name: "Portrait Session",
    tagline: "Individuals · Creatives · Brands",
    price: "£150",
    unit: "from · per session",
    features: [
      "Up to 1 hour, studio or on-location",
      "1 outfit / look",
      "15+ edited high-res images",
      "Online gallery delivery",
      "Personal usage rights",
    ],
  },
  {
    name: "Event Coverage",
    tagline: "Parties · Corporate · Live",
    price: "£450",
    unit: "from · per event",
    featured: true,
    features: [
      "Up to 4 hours of coverage",
      "Photography + highlight reel",
      "80+ edited high-res images",
      "1–2 min social highlight video",
      "48-hour sneak-peek selection",
    ],
  },
  {
    name: "Wedding Film & Photo",
    tagline: "Full day · Cinematic",
    price: "£1,200",
    unit: "from · per wedding",
    features: [
      "Up to 8 hours of coverage",
      "Cinematic highlight film",
      "250+ edited high-res images",
      "Second shooter available",
      "USB + online gallery delivery",
    ],
  },
  {
    name: "Brand Content",
    tagline: "Product · Promo · Social",
    price: "£350",
    unit: "from · per shoot",
    features: [
      "Half-day content session",
      "Photo + vertical video set",
      "30+ edited images",
      "3–5 short-form social clips",
      "Commercial usage licence",
    ],
  },
];

const addOns = [
  { name: "Extra hour of coverage", price: "£90" },
  { name: "Second shooter", price: "£200" },
  { name: "Rush 48-hour delivery", price: "£120" },
  { name: "Additional edited images (per 10)", price: "£40" },
  { name: "Printed album / prints", price: "from £80" },
  { name: "Travel beyond 30 miles", price: "£0.45 / mile" },
];

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function bookingHref(pkg: string) {
  return `/booking?package=${encodeURIComponent(pkg)}`;
}

export default function Pricing() {
  return (
    <div className="min-h-screen px-4 py-6 sm:px-8 sm:py-8">
      <SiteHeader active="/pricing" />

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
            Pricing:
          </p>
          <h1 className="mt-1 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-neutral-900 sm:text-5xl">
            Packages &amp; rates
          </h1>
          <p className="mt-4 max-w-md font-mono text-[13px] leading-relaxed text-neutral-700">
            Transparent starting prices for the most-booked shoots. Every
            project is tailored — tell us what you have in mind and we&apos;ll
            send a quote to match.
          </p>
        </motion.section>

        {/* ── Packages ── */}
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {packages.map((p, i) => (
            <Reveal key={p.name} delay={0.05 * i}>
              <div
                className={`relative flex h-full flex-col rounded-md border bg-[#f4f3ec] px-6 py-6 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.45)] ${
                  p.featured
                    ? "border-neutral-900/40 ring-1 ring-neutral-900/20"
                    : "border-neutral-900/10"
                }`}
                style={DOTTED}
              >
                {p.featured && (
                  <span className="absolute -top-2.5 left-6 rounded bg-neutral-900 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-white">
                    Popular
                  </span>
                )}
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                  {p.tagline}
                </p>
                <h2 className="mt-1 font-display text-xl font-extrabold uppercase tracking-tight text-neutral-900">
                  {p.name}
                </h2>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-display text-3xl font-extrabold tracking-tight text-neutral-900">
                    {p.price}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-500">
                    {p.unit}
                  </span>
                </div>
                <ul className="mt-4 flex-1 space-y-2 border-t border-dashed border-neutral-900/15 pt-4">
                  {p.features.map(f => (
                    <li
                      key={f}
                      className="flex items-start gap-2 font-mono text-[12px] leading-relaxed text-neutral-700"
                    >
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-900" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={bookingHref(p.name)}
                  className={`mt-5 inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-wide transition-colors ${
                    p.featured
                      ? "bg-neutral-900 text-white hover:opacity-90"
                      : "border border-neutral-900/20 bg-white text-neutral-900 hover:bg-neutral-50"
                  }`}
                >
                  Book {p.name.split(" ")[0]}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Add-ons ── */}
        <Reveal>
          <section
            className="relative mt-4 rounded-md border border-neutral-900/10 bg-[#f4f3ec] px-6 py-7 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.45)] sm:px-8 sm:py-9"
            style={DOTTED}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
              Extras:
            </p>
            <h2 className="mb-5 mt-1 font-display text-2xl font-extrabold uppercase tracking-tight text-neutral-900 sm:text-3xl">
              Add-ons
            </h2>
            <ul className="divide-y divide-dashed divide-neutral-900/15">
              {addOns.map(a => (
                <li
                  key={a.name}
                  className="flex items-center justify-between gap-4 py-2.5"
                >
                  <span className="font-mono text-[12px] text-neutral-700">
                    {a.name}
                  </span>
                  <span className="font-mono text-[12px] font-semibold text-neutral-900">
                    {a.price}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        {/* ── Note ── */}
        <Reveal>
          <section
            className="relative mt-4 rounded-md border border-neutral-900/10 bg-[#f4f3ec] px-6 py-7 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.45)] sm:px-8 sm:py-9"
            style={DOTTED}
          >
            <h2 className="font-display text-lg font-bold uppercase tracking-tight text-neutral-900">
              Good to know
            </h2>
            <ul className="mt-3 space-y-2 font-mono text-[12px] leading-relaxed text-neutral-600">
              <li>· Prices are starting points, excl. VAT where applicable.</li>
              <li>· A 30% deposit secures your date; balance due on delivery.</li>
              <li>· Custom and multi-day packages are quoted on request.</li>
              <li>· UK-wide travel available — first 30 miles included.</li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href="/booking"
                className="rounded-md bg-neutral-900 px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
              >
                Book a Shoot
              </a>
              <a
                href="/contact"
                className="rounded-md border border-neutral-900/20 bg-white px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-neutral-900 transition-colors hover:bg-neutral-50"
              >
                Ask for a Quote
              </a>
            </div>
          </section>
        </Reveal>

        <SiteFooter />
      </main>
    </div>
  );
}
