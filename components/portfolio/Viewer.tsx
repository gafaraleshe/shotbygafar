"use client";

/*
 * Fullscreen portfolio viewer. Opens on a post and shows every post in that
 * category, with chips to jump between categories, so a visitor can walk
 * through all the styles without leaving the page.
 *
 *   Desktop  a side-by-side carousel: posts and frames sit in a row that
 *            snaps to the centre, with arrow buttons and ←/→ keys.
 *   Mobile   reels-style: one post per screen, swipe up for the next.
 *
 * A post the Graph API could resolve (lib/instagram.ts) shows its actual
 * slides as images, with the caption on the first; anything else shows the
 * captioned Instagram embed. Each category ends on a card to the next one.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import type { IgResolved } from "@/lib/instagram";
import { portfolio, postUrl, type PortfolioCategory } from "@/lib/portfolio";
import { InstagramEmbed } from "./InstagramEmbed";

export type Slide =
  | { key: string; code: string; kind: "embed"; note?: string; credit?: string }
  | {
      key: string;
      code: string;
      kind: "image";
      url: string;
      video: boolean;
      frame: number;
      total: number;
      caption?: string;
      credit?: string;
    };

/** The slides a category opens as, shared with the page so a click on any
    post can open the viewer right on it. */
export function buildSlides(
  category: PortfolioCategory,
  media: Record<string, IgResolved>
): Slide[] {
  return category.posts.flatMap((post): Slide[] => {
    const resolved = media[post.code];
    if (!resolved) {
      const note = post.frames
        ? `Swipe to frames ${post.frames[0]}–${post.frames[post.frames.length - 1]}`
        : undefined;
      return [
        { key: post.code, code: post.code, kind: "embed", note, credit: post.credit },
      ];
    }
    const picked = (post.frames ?? resolved.slides.map((_, i) => i + 1))
      .filter(n => resolved.slides[n - 1])
      .map(n => ({ n, slide: resolved.slides[n - 1] }));
    return picked.map(({ n, slide }, i) => ({
      key: `${post.code}-${n}`,
      code: post.code,
      kind: "image",
      url: slide.url,
      video: slide.video,
      frame: n,
      total: resolved.slides.length,
      caption: i === 0 ? resolved.caption : undefined,
      credit: post.credit,
    }));
  });
}

/** Mounted only while open; `start` is the category and slide it opens on. */
export function Viewer({
  media,
  start,
  onClose,
}: {
  media: Record<string, IgResolved>;
  start: { slug: string; index: number };
  onClose: () => void;
}) {
  const [slug, setSlug] = useState(start.slug);
  const [current, setCurrent] = useState(start.index);
  const trackRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const startAt = useRef(start.index);

  const catIndex = Math.max(
    0,
    portfolio.findIndex(c => c.slug === slug)
  );
  const category = portfolio[catIndex];
  const nextCategory = portfolio[(catIndex + 1) % portfolio.length];
  const slides = useMemo(() => buildSlides(category, media), [category, media]);
  // The end card counts as a slide for the arrows and the observer.
  const count = slides.length + 1;

  // While open: lock the page behind, and hand focus back on close.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      previous?.focus?.();
    };
  }, []);

  const slideEls = () =>
    Array.from(
      trackRef.current?.querySelectorAll<HTMLElement>("[data-slide]") ?? []
    );

  const goTo = useCallback((i: number, behavior: ScrollBehavior = "smooth") => {
    const el = slideEls()[i];
    el?.scrollIntoView({ behavior, inline: "center", block: "start" });
  }, []);

  // New category (or first open): jump straight to the starting slide.
  useEffect(() => {
    const i = startAt.current;
    startAt.current = 0;
    requestAnimationFrame(() => goTo(i, "instant" as ScrollBehavior));
  }, [slug, goTo]);

  // Track which slide is in view.
  useEffect(() => {
    const root = trackRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setCurrent(Number((e.target as HTMLElement).dataset.slide));
          }
        }
      },
      { root, threshold: 0.55 }
    );
    slideEls().forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [slug, slides.length]);

  // Keys: arrows step through, Escape closes.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        goTo(Math.min(current + 1, count - 1));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goTo(Math.max(current - 1, 0));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, count, goTo, onClose]);

  const switchTo = (next: string) => {
    startAt.current = 0;
    setCurrent(0);
    setSlug(next);
    trackRef.current?.scrollTo({ left: 0, top: 0 });
  };

  const active = slides[current];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${category.title} — portfolio viewer`}
      className="fixed inset-0 z-50 flex flex-col bg-black/95 text-white backdrop-blur-sm"
    >
      {/* ── Top bar ── */}
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3 sm:px-6">
        <p className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.25em] text-white/50 lg:block">
          SHOTBYGAFAR · Portfolio
        </p>
        <nav
          aria-label="Categories"
          className="flex min-w-0 flex-1 gap-1.5 overflow-x-auto [scrollbar-width:none] lg:justify-center [&::-webkit-scrollbar]:hidden"
        >
          {portfolio.map(c => (
            <button
              key={c.slug}
              type="button"
              onClick={() => switchTo(c.slug)}
              aria-pressed={c.slug === slug}
              className={`shrink-0 rounded-full border px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.15em] transition-colors ${
                c.slug === slug
                  ? "border-white bg-white text-black"
                  : "border-white/20 text-white/70 hover:border-white/50 hover:text-white"
              }`}
            >
              {c.title}
            </button>
          ))}
        </nav>
        <span className="hidden shrink-0 font-mono text-[11px] tabular-nums text-white/50 sm:block">
          {String(Math.min(current + 1, slides.length)).padStart(2, "0")} /{" "}
          {String(slides.length).padStart(2, "0")}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close viewer"
          className="grid size-9 shrink-0 place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white hover:text-black"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* ── Track: a column of screens on phones, a row on desktop ── */}
      <div
        ref={trackRef}
        key={slug}
        className="flex min-h-0 flex-1 snap-y snap-mandatory flex-col overflow-y-auto overscroll-contain md:snap-x md:flex-row md:items-stretch md:gap-8 md:overflow-x-auto md:overflow-y-hidden md:px-[max(1.5rem,calc(50vw-230px))] md:[scrollbar-width:thin]"
      >
        {slides.map((s, i) => (
          <section
            key={s.key}
            data-slide={i}
            aria-label={`${category.title} ${i + 1} of ${slides.length}`}
            className="flex min-h-full w-full shrink-0 snap-start items-start justify-center px-4 py-6 md:h-full md:min-h-0 md:w-auto md:snap-center md:overflow-y-auto md:px-0 md:[scrollbar-width:none] md:[&::-webkit-scrollbar]:hidden"
          >
            {s.kind === "embed" ? (
              <div className="w-full max-w-[460px] md:w-[460px]">
                <SlideMeta slide={s} title={category.title} />
                <InstagramEmbed code={s.code} width={460} lazy={false} />
                {s.note && (
                  <p className="mt-3 font-hand text-[22px] leading-none text-white/70">
                    {s.note} →
                  </p>
                )}
              </div>
            ) : (
              <figure className="flex w-full max-w-[560px] flex-col md:h-full md:w-auto md:max-w-none">
                <SlideMeta slide={s} title={category.title} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.url}
                  alt={`${category.title} — frame ${s.frame}`}
                  className="w-full rounded-lg object-contain md:h-[calc(100%-5.5rem)] md:w-auto md:max-w-[min(70vw,900px)]"
                />
                {s.caption && (
                  <figcaption className="mt-3 line-clamp-4 max-w-[60ch] whitespace-pre-line text-[13px] leading-relaxed text-white/65">
                    {s.caption}
                  </figcaption>
                )}
              </figure>
            )}
          </section>
        ))}

        {/* End card: on to the next category. */}
        <section
          data-slide={slides.length}
          className="flex min-h-full w-full shrink-0 snap-start items-center justify-center px-6 py-10 md:h-full md:w-[360px] md:snap-center"
        >
          <button
            type="button"
            onClick={() => switchTo(nextCategory.slug)}
            className="group text-left"
          >
            <span className="font-mono text-[10.5px] uppercase tracking-[0.25em] text-white/45">
              Up next
            </span>
            <span className="mt-2 block font-serif text-[44px] uppercase leading-none text-white">
              {nextCategory.title}
            </span>
            <span className="mt-3 block max-w-[28ch] text-[13.5px] leading-relaxed text-white/60">
              {nextCategory.blurb}
            </span>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors group-hover:bg-white group-hover:text-black">
              Keep going <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </button>
        </section>
      </div>

      {/* ── Bottom bar: arrows on desktop, a swipe hint on phones ── */}
      <div className="flex items-center justify-between gap-4 border-t border-white/10 px-4 py-3 sm:px-6">
        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={() => goTo(Math.max(current - 1, 0))}
            disabled={current === 0}
            aria-label="Previous"
            className="grid size-9 place-items-center rounded-full border border-white/20 transition-colors hover:bg-white hover:text-black disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => goTo(Math.min(current + 1, count - 1))}
            disabled={current >= count - 1}
            aria-label="Next"
            className="grid size-9 place-items-center rounded-full border border-white/20 transition-colors hover:bg-white hover:text-black disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-white/45 md:hidden">
          Swipe up · {category.title}
        </p>
        <p className="hidden font-serif text-[18px] uppercase text-white/80 md:block">
          {category.title}
        </p>
        {active && (
          <a
            href={postUrl(active.code)}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.15em] text-white/60 transition-colors hover:text-white"
          >
            Instagram <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}

function SlideMeta({ slide, title }: { slide: Slide; title: string }) {
  return (
    <p className="mb-2 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
      <span>
        {title}
        {slide.kind === "image" &&
          ` · Frame ${String(slide.frame).padStart(2, "0")}/${String(slide.total).padStart(2, "0")}`}
        {slide.kind === "image" && slide.video && " · Video still"}
      </span>
      {slide.credit && <span>with {slide.credit}</span>}
    </p>
  );
}
