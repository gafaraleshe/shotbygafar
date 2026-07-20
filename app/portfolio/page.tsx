"use client";

/*
 * Portfolio — SHOTBYGAFAR photography & film work on the black graph-paper
 * canvas. Same filing-card system: dotted paper, mono labels, display
 * headings. Edit the `works` array to point each project at a real gallery
 * or reel link.
 */

import { motion } from "framer-motion";
import {
  Reveal,
  heroRise,
  hoverLift,
  hoverPop,
  rise,
  riseInView,
  tapePop,
} from "@/components/motion";
import { ArrowUpRight, Camera } from "lucide-react";
import { InstagramIcon } from "@/components/LinkIcons";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

const INSTAGRAM_URL = "https://www.instagram.com/shot.by.gafar/";

const DOTTED = {
  backgroundImage: "radial-gradient(rgba(0,0,0,0.07) 1px, transparent 1px)",
  backgroundSize: "16px 16px",
} as const;

// Edit these — point `link` at each project's gallery, reel, or post.
const works = [
  {
    title: "Portraits",
    category: "Photography",
    year: "2024–26",
    description:
      "Studio, on-location, and lifestyle portraits — bold, authentic, and edited to feel like you.",
    link: INSTAGRAM_URL,
    accent: "from-neutral-700 to-neutral-900",
  },
  {
    title: "Weddings",
    category: "Cinematography",
    year: "2024–26",
    description:
      "Cinematic wedding films and photography that capture the day as it felt — vows, first dances, and the moments in between.",
    link: INSTAGRAM_URL,
    accent: "from-rose-700 to-neutral-900",
  },
  {
    title: "Events",
    category: "Event Coverage",
    year: "2024–26",
    description:
      "Full coverage for parties, conferences, and live shows — photo galleries and highlight reels delivered fast.",
    link: INSTAGRAM_URL,
    accent: "from-amber-500 to-neutral-900",
  },
  {
    title: "Brand Content",
    category: "Commercial",
    year: "2024–26",
    description:
      "Product films, promos, and social-first content for brands and small businesses — striking visuals built to convert.",
    link: INSTAGRAM_URL,
    accent: "from-emerald-600 to-neutral-900",
  },
];

const stats = [
  { value: "25+", label: "Clients" },
  { value: "UK", label: "Based & Mobile" },
  { value: "7yr+", label: "Behind the Lens" },
];

function CornerMarks() {
  const base = "pointer-events-none absolute h-4 w-4 border-neutral-900/40";
  return (
    <>
      <span className={`${base} left-3 top-3 border-l border-t`} />
      <span className={`${base} right-3 top-3 border-r border-t`} />
      <span className={`${base} bottom-3 left-3 border-b border-l`} />
      <span className={`${base} bottom-3 right-3 border-b border-r`} />
    </>
  );
}

export default function Portfolio() {
  return (
    <div className="min-h-screen px-4 py-6 sm:px-8 sm:py-8">
      <SiteHeader active="/portfolio" />

      <main className="mx-auto max-w-2xl pb-14">
        {/* ── Intro card ── */}
        <motion.section
          {...heroRise}
          className="relative rounded-md border border-neutral-900/10 bg-[#f4f3ec] px-6 py-8 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.55)] sm:px-10 sm:py-10"
          style={DOTTED}
        >
          <CornerMarks />
          <motion.span
            {...tapePop(-3, 0.9)}
            className="pointer-events-none absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 bg-stone-300/50 shadow-sm"
          />
          <motion.span
            {...tapePop(6, 1.05)}
            className="pointer-events-none absolute -right-3 bottom-12 h-6 w-16 bg-amber-200/40 shadow-sm"
          />

          <motion.div {...rise(0.35)}>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
              Portfolio:
            </p>
            <h1 className="mt-1 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-neutral-900 sm:text-5xl">
              Photography
              <br />& Film
            </h1>
            <p className="mt-4 max-w-md font-mono text-[13px] leading-relaxed text-neutral-700">
              Portraits, weddings, events, and brand content — shot, graded,
              and edited in-house by SHOTBYGAFAR. Bold, authentic storytelling
              from first frame to final cut.
            </p>
          </motion.div>

          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-dashed border-neutral-900/15 pt-5">
            {stats.map((s, i) => (
              <motion.div {...rise(0.5 + i * 0.12)} key={s.label}>
                <p className="font-display text-2xl font-extrabold tracking-tight text-neutral-900">
                  {s.value}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-500">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Work cards ── */}
        <div className="mt-4 space-y-3">
          {works.map((w, i) => (
            <motion.a
              {...riseInView(Math.min(i * 0.08, 0.32))}
              {...hoverLift}
              key={w.title}
              href={w.link}
              target="_blank"
              rel="noreferrer"
              className="group block overflow-hidden rounded-md border border-neutral-900/10 bg-[#f4f3ec] shadow-sm transition-shadow hover:shadow-md"
              style={DOTTED}
            >
              <div
                className={`flex h-32 items-center justify-center bg-gradient-to-br ${w.accent}`}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 text-white transition-transform group-hover:scale-110">
                  <Camera className="h-5 w-5" />
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                      {w.category} · {w.year}
                    </p>
                    <h2 className="font-display text-lg font-bold uppercase tracking-tight text-neutral-900">
                      {w.title}
                    </h2>
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-900/20 text-neutral-900 transition-colors group-hover:bg-neutral-900 group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-2 font-mono text-[12px] leading-relaxed text-neutral-600">
                  {w.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* ── CTA card ── */}
        <Reveal>
        <section
          className="relative mt-4 rounded-md border border-neutral-900/10 bg-[#f4f3ec] px-6 py-7 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.45)] sm:px-8 sm:py-9"
          style={DOTTED}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
            More:
          </p>
          <h2 className="mt-1 font-display text-2xl font-extrabold uppercase tracking-tight text-neutral-900">
            See the latest work
          </h2>
          <p className="mt-3 font-mono text-[12px] leading-relaxed text-neutral-600">
            New shoots and reels go up on Instagram first. Ready to book? Get in
            touch and let&apos;s plan your shoot.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <motion.a
              {...hoverPop}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-md bg-neutral-900 px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
            >
              <InstagramIcon />
              @shot.by.gafar
            </motion.a>
            <motion.a
              {...hoverPop}
              href="mailto:contact@shotbygafar.com"
              className="flex items-center gap-2 rounded-md border border-neutral-900/20 bg-white px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-neutral-900 transition-colors hover:bg-neutral-50"
            >
              Book a Shoot
            </motion.a>
          </div>
        </section>
        </Reveal>

        <SiteFooter />
      </main>
    </div>
  );
}
