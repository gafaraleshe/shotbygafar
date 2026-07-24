"use client";

/*
 * Services — SHOTBYGAFAR photography / videography / cinematography, detailed.
 * Same filing-card system: dotted paper cards, mono labels, display headings.
 * Core disciplines → what we shoot → how it works → CTA.
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowUpRight,
  Camera,
  Clapperboard,
  Film,
  Sparkles,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

const DOTTED = {
  backgroundImage: "radial-gradient(rgba(0,0,0,0.07) 1px, transparent 1px)",
  backgroundSize: "16px 16px",
} as const;

const disciplines = [
  {
    Icon: Camera,
    title: "Photography",
    blurb:
      "Portraits, products, weddings, and events with a cinematic, story-first eye — shot and retouched in-house.",
    includes: [
      "Studio & on-location sessions",
      "Colour grading + retouching",
      "High-res gallery delivery",
    ],
  },
  {
    Icon: Film,
    title: "Videography",
    blurb:
      "Brand films, event coverage, and social content — filmed and edited end to end, delivered ready to post.",
    includes: [
      "Brand & promo films",
      "Event & highlight coverage",
      "Vertical social edits",
    ],
  },
  {
    Icon: Clapperboard,
    title: "Cinematography",
    blurb:
      "Cinematic direction, lighting, and colour grading for weddings, music videos, and creative films.",
    includes: [
      "Wedding films",
      "Music videos",
      "Creative direction + grade",
    ],
  },
];

const shoots = [
  {
    name: "Portraits",
    subtitle: "People · Studio · Lifestyle",
    description:
      "Bold, authentic portraits that feel like you — studio, on-location, and lifestyle sessions for individuals, creatives, and brands.",
    tags: ["Studio", "On-Location", "Editorial"],
  },
  {
    name: "Weddings",
    subtitle: "Cinematic Films · Photography",
    description:
      "Cinematic wedding films and photography that capture the day as it felt — vows, first dances, and the in-between moments, edited to a story.",
    tags: ["Films", "Photography", "Highlights"],
  },
  {
    name: "Events",
    subtitle: "Coverage · Highlight Reels",
    description:
      "Full coverage for parties, conferences, and live shows — delivered as photo galleries and highlight reels built to relive the night.",
    tags: ["Live Shows", "Parties", "Corporate"],
  },
  {
    name: "Brand Content",
    subtitle: "Product · Promo · Social",
    description:
      "Product films, promos, and social-first content for brands and small businesses — striking visuals built to convert.",
    tags: ["Product", "Promo", "Social"],
  },
];

const process = [
  {
    step: "01",
    title: "Enquire",
    detail:
      "Tell us the date, location, and what you have in mind. We confirm availability within a day.",
  },
  {
    step: "02",
    title: "Plan",
    detail:
      "We agree a package, shot list, and timeline — and lock in your session with a deposit.",
  },
  {
    step: "03",
    title: "Shoot",
    detail:
      "On the day we direct, light, and capture — relaxed, efficient, and fully hands-on.",
  },
  {
    step: "04",
    title: "Deliver",
    detail:
      "A sneak-peek lands within days, with the full edited gallery or film delivered soon after.",
  },
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

function SectionCard({
  id,
  label,
  title,
  children,
}: {
  id?: string;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <section
        id={id}
        className="relative mt-4 scroll-mt-6 rounded-md border border-neutral-900/10 bg-[#f4f3ec] px-6 py-7 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.45)] sm:px-8 sm:py-9"
        style={DOTTED}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
          {label}
        </p>
        <h2 className="mb-6 mt-1 font-display text-2xl font-extrabold uppercase tracking-tight text-neutral-900 sm:text-3xl">
          {title}
        </h2>
        {children}
      </section>
    </Reveal>
  );
}

export default function Services() {
  return (
    <div className="min-h-screen px-4 py-6 sm:px-8 sm:py-8">
      <SiteHeader active="/services" />

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
            Services:
          </p>
          <h1 className="mt-1 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-neutral-900 sm:text-5xl">
            What we do
          </h1>
          <p className="mt-4 max-w-md font-mono text-[13px] leading-relaxed text-neutral-700">
            Photography, videography, and cinematography for portraits,
            weddings, events, and brands across the UK — from the first frame
            to the final grade, handled in-house.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href="/booking"
              className="rounded-md bg-neutral-900 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
            >
              Book a Shoot
            </a>
            <a
              href="/pricing"
              className="rounded-md border border-neutral-900/20 bg-white px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-wide text-neutral-900 transition-colors hover:bg-neutral-50"
            >
              View Pricing
            </a>
          </div>
        </motion.section>

        {/* ── Core disciplines ── */}
        <SectionCard id="disciplines" label="Core:" title="Disciplines">
          <div className="space-y-6">
            {disciplines.map((d, i) => (
              <div
                key={d.title}
                className={
                  i > 0
                    ? "border-t border-dashed border-neutral-900/15 pt-6"
                    : ""
                }
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-neutral-900 text-white">
                    <d.Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-bold uppercase tracking-tight text-neutral-900">
                      {d.title}
                    </h3>
                    <p className="mt-1 font-mono text-[12px] leading-relaxed text-neutral-600">
                      {d.blurb}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {d.includes.map(item => (
                        <li
                          key={item}
                          className="rounded border border-neutral-900/15 px-2 py-0.5 font-mono text-[10px] text-neutral-600"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ── What we shoot ── */}
        <SectionCard id="shoots" label="Work:" title="What we shoot">
          <div className="grid gap-3 sm:grid-cols-2">
            {shoots.map(s => (
              <div
                key={s.name}
                className="rounded-md border border-neutral-900/10 bg-white p-5 shadow-sm"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                  {s.subtitle}
                </p>
                <h3 className="font-display text-lg font-bold uppercase tracking-tight text-neutral-900">
                  {s.name}
                </h3>
                <p className="mt-2 font-mono text-[12px] leading-relaxed text-neutral-600">
                  {s.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {s.tags.map(tag => (
                    <span
                      key={tag}
                      className="rounded border border-neutral-900/15 px-2 py-0.5 font-mono text-[10px] text-neutral-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ── How it works ── */}
        <SectionCard id="process" label="Process:" title="How it works">
          <div className="grid gap-3 sm:grid-cols-2">
            {process.map(p => (
              <div
                key={p.step}
                className="rounded-md border border-neutral-900/10 bg-white p-5 shadow-sm"
              >
                <p className="font-display text-2xl font-extrabold tracking-tight text-neutral-300">
                  {p.step}
                </p>
                <h3 className="mt-1 font-display text-base font-bold uppercase tracking-tight text-neutral-900">
                  {p.title}
                </h3>
                <p className="mt-1.5 font-mono text-[12px] leading-relaxed text-neutral-600">
                  {p.detail}
                </p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ── CTA ── */}
        <Reveal>
          <a
            href="/booking"
            className="group mt-4 flex items-center justify-between gap-3 rounded-md border border-neutral-900/10 bg-[#f4f3ec] px-6 py-6 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.45)] transition-colors hover:bg-[#efeee6]"
            style={DOTTED}
          >
            <div>
              <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                <Sparkles className="h-3.5 w-3.5" />
                Ready when you are
              </p>
              <p className="mt-1 font-display text-xl font-extrabold uppercase tracking-tight text-neutral-900">
                Book your shoot
              </p>
              <p className="font-mono text-[11px] text-neutral-600">
                Tell us the date and vision — we reply within a day.
              </p>
            </div>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-900/25 text-neutral-900 transition-colors group-hover:bg-neutral-900 group-hover:text-white">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>
        </Reveal>

        <SiteFooter />
      </main>
    </div>
  );
}
