"use client";

/*
 * The opening carousel on the home page: standout frames from the
 * portfolio as a 3D coverflow on the black grid. The centre frame is lit,
 * its neighbours fan out behind it dimmed, and a blurred copy of the centre
 * glows underneath. It loops, autoplays (the progress bar's animation ends
 * a slide, so pausing the bar pauses the carousel), pauses on hover, focus
 * or a hidden tab, swipes on touch and steps with the arrow keys. Tapping
 * the centre frame opens its whole set in the fullscreen viewer; tapping a
 * neighbour brings it to the centre.
 */

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Maximize2 } from "lucide-react";
import { media } from "@/lib/portfolio-media";
import { portfolio, type PortfolioCategory } from "@/lib/portfolio";

// The frames it cycles through, as [post, frame number].
const PICKS: [string, number][] = [
  ["Db3FcFIiMpQ", 5],
  ["DGzF9k_oomt", 1],
  ["DA9VxJfgMkl", 3],
  ["DAzALV0AN7f", 2],
  ["DLSZZ6cIiWA", 3],
  ["Db4GYgciKrP", 1],
  ["DHpozDLotIp", 1],
  ["DPkEvCDCLcm", 1],
  ["DHAcOyxojhL", 7],
  ["Db3FcFIiMpQ", 9],
  ["DA9YxEegKtb", 1],
  ["DDpX0smscfh", 4],
];

const SLIDE_MS = 5000;
const CARD_W = "w-[62vw] max-w-[340px] sm:w-[34vw] lg:w-[24vw]";

type Slide = {
  code: string;
  n: number;
  src: string;
  sm: string;
  w: number;
  h: number;
  title: string;
  context?: string;
  category: PortfolioCategory;
};

const slides: Slide[] = PICKS.flatMap(([code, n]) => {
  const frame = media[code]?.[n - 1];
  const category = portfolio.find(c => c.posts.some(p => p.code === code));
  const post = category?.posts.find(p => p.code === code);
  if (!frame || !category || !post) return [];
  return [{ code, n, ...frame, title: post.title, context: post.context, category }];
});

const pad = (n: number) => String(n).padStart(2, "0");

// Where a card sits relative to the centre, wrapping round so it loops.
function offsetOf(i: number, index: number, count: number) {
  let d = i - index;
  if (d > count / 2) d -= count;
  if (d < -count / 2) d += count;
  return d;
}

export function HeroCarousel({
  onOpen,
}: {
  /** Opens the viewer on a frame: the category, post and frame number. */
  onOpen: (slug: string, code: string, n: number) => void;
}) {
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const paused = hovered || focused || hidden;

  const go = useCallback(
    (step: number) => setIndex(i => (i + step + count) % count),
    [count]
  );

  // Pause while the tab is in the background.
  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  if (!count) return null;
  const current = slides[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Selected frames"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === "ArrowRight") go(1);
        else if (e.key === "ArrowLeft") go(-1);
        else if (e.key === "Enter")
          onOpen(current.category.slug, current.code, current.n);
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={e => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false);
      }}
      className="relative mx-auto mb-10 max-w-[1240px] overflow-hidden rounded-2xl bg-black outline-none ring-1 ring-white/10 focus-visible:ring-white/40 sm:mb-14"
    >
      {/* Ambient glow: the centre frame, blurred, behind everything. */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current.code + current.n}
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="pointer-events-none absolute inset-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.sm}
            alt=""
            className="h-full w-full scale-125 object-cover blur-3xl saturate-150"
          />
        </motion.div>
      </AnimatePresence>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgb(0_0_0/0.55)_70%)]"
      />

      {/* ── Stage ── */}
      <motion.div
        onPanEnd={(_, info) => {
          if (info.offset.x < -40) go(1);
          else if (info.offset.x > 40) go(-1);
        }}
        className="relative touch-pan-y select-none px-5 pb-6 pt-16 [perspective:1400px] sm:pt-20"
      >
        {/* Holds the stage open at exactly one card's size; the cards
            themselves are positioned over it. */}
        <div aria-hidden className={`invisible mx-auto aspect-[4/5] ${CARD_W}`} />
        {slides.map((s, i) => {
          const d = offsetOf(i, index, count);
          const far = Math.abs(d);
          const centre = d === 0;
          return (
            <motion.button
              key={`${s.code}-${s.n}`}
              type="button"
              tabIndex={centre ? 0 : -1}
              aria-hidden={!centre}
              aria-label={
                centre
                  ? `${s.title} — open the set`
                  : `Show ${s.title}`
              }
              onClick={() =>
                centre ? onOpen(s.category.slug, s.code, s.n) : go(d)
              }
              initial={false}
              animate={{
                x: `${d * 62}%`,
                scale: centre ? 1 : far === 1 ? 0.8 : 0.66,
                rotateY: d * -18,
                opacity: far > 3 ? 0 : 1,
                filter: centre
                  ? "brightness(1) saturate(1)"
                  : `brightness(${far === 1 ? 0.5 : 0.32}) saturate(0.7)`,
              }}
              transition={{ type: "spring", stiffness: 140, damping: 22 }}
              style={{ zIndex: 20 - far }}
              className={`group absolute left-1/2 top-16 -translate-x-1/2 sm:top-20 ${CARD_W} ${
                far > 3 ? "pointer-events-none" : ""
              }`}
            >
              <span className="block overflow-hidden rounded-[4px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] ring-1 ring-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={far <= 1 ? s.src : s.sm}
                  alt={centre ? `${s.title}, ${s.category.title}` : ""}
                  width={s.w}
                  height={s.h}
                  loading={far <= 2 ? "eager" : "lazy"}
                  draggable={false}
                  className="aspect-[4/5] h-auto w-full object-cover"
                />
              </span>
              {centre && (
                <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between rounded-b-[4px] bg-gradient-to-t from-black/70 to-transparent px-3 pb-3 pt-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/85">
                    Open the set
                  </span>
                  <Maximize2 className="h-4 w-4 text-white" />
                </span>
              )}
            </motion.button>
          );
        })}
      </motion.div>

      {/* ── Caption, counter, progress and arrows ── */}
      <div className="relative z-30 flex items-end justify-between gap-4 px-5 pb-6 sm:px-8 sm:pb-8">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous frame"
          className="hidden size-10 shrink-0 place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white hover:text-black sm:grid"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        <div aria-live="polite" className="min-w-0 flex-1 text-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.code + current.n}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/55">
                {current.category.title}
              </p>
              <p className="mt-1.5 font-serif text-[26px] uppercase leading-none text-white sm:text-[32px]">
                {current.title}
              </p>
              {current.context && (
                <p className="mt-1.5 truncate font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
                  {current.context}
                </p>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mx-auto mt-4 flex max-w-[260px] items-center gap-3">
            <span className="font-mono text-[10px] tabular-nums text-white/55">
              {pad(index + 1)}
            </span>
            <span className="relative h-px flex-1 overflow-hidden bg-white/20">
              <span
                key={index}
                onAnimationEnd={() => go(1)}
                className="hero-progress absolute inset-0 bg-white"
                style={{
                  animationDuration: `${SLIDE_MS}ms`,
                  animationPlayState: paused ? "paused" : "running",
                }}
              />
            </span>
            <span className="font-mono text-[10px] tabular-nums text-white/55">
              {pad(count)}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next frame"
          className="hidden size-10 shrink-0 place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white hover:text-black sm:grid"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <a
        href="/portfolio"
        className="absolute right-5 top-5 z-30 rounded-full border border-white/25 bg-black/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/80 backdrop-blur transition-colors hover:bg-white hover:text-black sm:right-8 sm:top-7"
      >
        Portfolio ↗
      </a>
      <p className="absolute left-5 top-5 z-30 font-hand text-[22px] leading-none text-white/75 sm:left-8 sm:top-6">
        shot by gafar ✶
      </p>
    </section>
  );
}
