"use client";

/*
 * Portfolio — a contact sheet on the black grid, after the SB CINE layout:
 * a sticky list of categories on the left (chips along the top on phones)
 * and the work on the right. Each set is a cover frame with its label (who,
 * where) and a strip of the frames behind it, laid out in uneven columns;
 * Birthdays are pinned up as large prints and the chosen nightlife frames
 * run as a film strip. Any frame opens the fullscreen viewer on itself.
 *
 * The page stays dark in both themes — the photos read best on black.
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import {
  framesOf,
  portfolio,
  type PortfolioCategory,
} from "@/lib/portfolio";
import { Viewer, buildSlides } from "@/components/portfolio/Viewer";
import {
  FilmStrip,
  SetCard,
  Spotlight,
  type OpenAt,
} from "@/components/portfolio/Sets";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

const WIDTH = "max-w-[1240px]";
const INSTAGRAM_URL = "https://www.instagram.com/shot.by.gafar/";
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Open = { slug: string; index: number } | null;

const totalFrames = portfolio.reduce(
  (n, c) => n + c.posts.reduce((m, p) => m + framesOf(p).length, 0),
  0
);
const pad = (n: number) => String(n).padStart(2, "0");

// Highlights the category whose section is crossing the middle of the screen.
function useActiveSection() {
  const [active, setActive] = useState(portfolio[0].slug);
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    portfolio.forEach(c => {
      const el = document.getElementById(c.slug);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}

export function PortfolioView() {
  const [open, setOpen] = useState<Open>(null);
  const active = useActiveSection();

  // Opens the viewer on this exact frame of this set.
  const openAt = (category: PortfolioCategory, code: string, n: number) => {
    const index = buildSlides(category).findIndex(
      s => s.code === code && s.n === n
    );
    setOpen({ slug: category.slug, index: Math.max(0, index) });
  };

  return (
    <div className="min-h-screen px-4 py-5 sm:px-8 sm:py-8">
      <SiteHeader active="/portfolio" width={WIDTH} />

      <div
        className={`mx-auto ${WIDTH} md:grid md:grid-cols-[190px_1fr] md:gap-14`}
      >
        {/* ── Sidebar (desktop) ── */}
        <aside className="hidden md:block">
          <div className="sticky top-10">
            <p className="font-serif text-[17px] uppercase text-white/45">
              Shot by Gafar
            </p>
            <p className="mt-8 font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-white">
              Work
            </p>
            <ul className="mt-4 space-y-2.5">
              {portfolio.map(c => (
                <li key={c.slug}>
                  <a
                    href={`#${c.slug}`}
                    aria-current={active === c.slug ? "true" : undefined}
                    className={`group flex items-baseline gap-2 font-serif text-[17px] uppercase transition-colors ${
                      active === c.slug
                        ? "text-white"
                        : "text-white/45 hover:text-white"
                    }`}
                  >
                    <span
                      className={`h-px bg-white transition-all duration-300 ${
                        active === c.slug ? "w-4" : "w-0 group-hover:w-2"
                      }`}
                    />
                    {c.title}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-10 space-y-2">
              <a
                href="/booking"
                className="block font-serif text-[17px] uppercase text-white/45 transition-colors hover:text-white"
              >
                Book a shoot
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="block font-serif text-[17px] uppercase text-white/45 transition-colors hover:text-white"
              >
                Instagram ↗
              </a>
            </div>
          </div>
        </aside>

        <main className="min-w-0 pb-10">
          {/* ── Intro ── */}
          <motion.header
            initial={{ opacity: 0, y: 14 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: EASE_OUT },
            }}
            className="border-b border-white/10 pb-8"
          >
            <p className="font-mono text-[10.5px] uppercase tracking-[0.25em] text-white/45">
              Portfolio · {totalFrames} frames · {portfolio.length} styles
            </p>
            <h1 className="mt-3 font-serif text-[clamp(48px,8vw,104px)] uppercase leading-[0.9] text-white">
              The work
            </h1>
            <div className="mt-5 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <p className="max-w-[46ch] text-[14.5px] leading-relaxed text-white/60">
                Concert stages to football pitches, birthdays to brand shoots.
                Tap any frame to see the whole set full screen, and keep going
                through every style.
              </p>
              <button
                type="button"
                onClick={() => setOpen({ slug: portfolio[0].slug, index: 0 })}
                className="flex shrink-0 items-center gap-2 self-start rounded-full bg-white px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-black transition-opacity hover:opacity-85"
              >
                <Maximize2 className="h-3.5 w-3.5" />
                View full screen
              </button>
            </div>
          </motion.header>

          {/* ── Category chips (phones) ── */}
          <nav
            aria-label="Categories"
            className="sticky top-0 z-20 -mx-4 flex gap-1.5 overflow-x-auto border-b border-white/10 bg-canvas/90 px-4 py-3 backdrop-blur [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden"
          >
            {portfolio.map(c => (
              <a
                key={c.slug}
                href={`#${c.slug}`}
                className={`shrink-0 rounded-full border px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.15em] transition-colors ${
                  active === c.slug
                    ? "border-white bg-white text-black"
                    : "border-white/20 text-white/70"
                }`}
              >
                {c.title}
              </a>
            ))}
          </nav>

          {portfolio.map((c, i) => (
            <CategorySection
              key={c.slug}
              category={c}
              number={i + 1}
              onOpen={(code, n) => openAt(c, code, n)}
            />
          ))}
        </main>
      </div>

      <SiteFooter width={WIDTH} />

      {open && <Viewer start={open} onClose={() => setOpen(null)} />}
    </div>
  );
}

function CategorySection({
  category,
  number,
  onOpen,
}: {
  category: PortfolioCategory;
  number: number;
  onOpen: OpenAt;
}) {
  const strips = category.posts.filter(p => p.strip);
  const sets = category.posts.filter(p => !p.strip);
  const first = category.posts[0];

  return (
    <section
      id={category.slug}
      className="scroll-mt-20 border-b border-white/10 py-12 md:scroll-mt-10"
    >
      <div className="mb-7 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div>
          <p className="font-mono text-[10.5px] tracking-[0.2em] text-white/40">
            {pad(number)}
          </p>
          <h2 className="mt-1 font-serif text-[34px] uppercase leading-none text-white sm:text-[40px]">
            {category.title}
          </h2>
          <p className="mt-2 max-w-[48ch] text-[14px] leading-relaxed text-white/55">
            {category.blurb}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onOpen(first.code, framesOf(first)[0]?.n ?? 1)}
          className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.15em] text-white/55 transition-colors hover:text-white"
        >
          Full screen <Maximize2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {category.spotlight ? (
        <Spotlight posts={sets} onOpen={onOpen} />
      ) : (
        sets.length > 0 && (
          <div
            className={`gap-6 [&>*]:mb-10 [&>*]:break-inside-avoid ${
              sets.length === 1
                ? "max-w-[520px]"
                : "columns-1 sm:columns-2 xl:columns-3"
            }`}
          >
            {sets.map((p, i) => (
              <SetCard
                key={p.code}
                post={p}
                index={i}
                // A drop on alternate sets keeps the columns uneven.
                offset={sets.length > 1 && i % 2 === 1}
                onOpen={onOpen}
              />
            ))}
          </div>
        )
      )}

      {strips.map(p => (
        <FilmStrip key={p.code} post={p} onOpen={onOpen} />
      ))}
    </section>
  );
}
