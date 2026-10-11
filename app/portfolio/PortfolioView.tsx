"use client";

/*
 * Portfolio — a contact sheet on the black grid, after the SB CINE layout:
 * a sticky list of categories on the left (chips along the top on phones)
 * and the work on the right. Posts are the captioned Instagram embeds,
 * dropped into uneven columns rather than a strict grid; Birthdays get
 * pinned up as large prints, and the nightlife frames run as a film strip.
 * Any post opens the fullscreen viewer.
 *
 * The page stays dark in both themes — the photos read best on black.
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Maximize2 } from "lucide-react";
import type { IgResolved } from "@/lib/instagram";
import {
  portfolio,
  type PortfolioCategory,
  type PortfolioPost,
} from "@/lib/portfolio";
import { InstagramEmbed } from "@/components/portfolio/InstagramEmbed";
import { Viewer, buildSlides } from "@/components/portfolio/Viewer";
import { InstagramGlyph } from "@/components/BrandIcons";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

const WIDTH = "max-w-[1240px]";
const INSTAGRAM_URL = "https://www.instagram.com/shot.by.gafar/";
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Open = { slug: string; index: number } | null;

const totalPosts = portfolio.reduce((n, c) => n + c.posts.length, 0);

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

export function PortfolioView({ media }: { media: Record<string, IgResolved> }) {
  const [open, setOpen] = useState<Open>(null);
  const active = useActiveSection();

  // Opens the viewer on the first slide that belongs to this post.
  const openAt = (category: PortfolioCategory, code: string, frame?: number) => {
    const slides = buildSlides(category, media);
    const index = slides.findIndex(
      s => s.code === code && (frame === undefined || (s.kind === "image" && s.frame === frame))
    );
    setOpen({ slug: category.slug, index: Math.max(0, index) });
  };

  return (
    <div className="min-h-screen px-4 py-5 sm:px-8 sm:py-8">
      <SiteHeader active="/portfolio" width={WIDTH} />

      <div className={`mx-auto ${WIDTH} md:grid md:grid-cols-[190px_1fr] md:gap-14`}>
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
                      active === c.slug ? "text-white" : "text-white/45 hover:text-white"
                    }`}
                  >
                    <span
                      className={`h-px bg-white transition-all duration-300 ${
                        active === c.slug ? "w-4" : "w-0 group-hover:w-2"
                      }`}
                    />
                    {c.title}
                    <sup className="font-mono text-[9px] text-white/35">
                      {c.posts.length}
                    </sup>
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
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } }}
            className="border-b border-white/10 pb-8"
          >
            <p className="font-mono text-[10.5px] uppercase tracking-[0.25em] text-white/45">
              Portfolio · {totalPosts} posts · {portfolio.length} styles
            </p>
            <h1 className="mt-3 font-serif text-[clamp(48px,8vw,104px)] uppercase leading-[0.9] text-white">
              The work
            </h1>
            <div className="mt-5 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <p className="max-w-[46ch] text-[14.5px] leading-relaxed text-white/60">
                Concerts to football pitches, birthdays to brand shoots — every
                post straight from @shot.by.gafar, captions and all. Open any
                of them to flick through every style full screen.
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
              media={media}
              onOpen={(code, frame) => openAt(c, code, frame)}
            />
          ))}
        </main>
      </div>

      <SiteFooter width={WIDTH} />

      {open && <Viewer media={media} start={open} onClose={() => setOpen(null)} />}
    </div>
  );
}

function CategorySection({
  category,
  number,
  media,
  onOpen,
}: {
  category: PortfolioCategory;
  number: number;
  media: Record<string, IgResolved>;
  onOpen: (code: string, frame?: number) => void;
}) {
  const framed = category.posts.filter(p => p.frames);
  const regular = category.posts.filter(p => !p.frames);

  return (
    <section id={category.slug} className="scroll-mt-20 border-b border-white/10 py-12 md:scroll-mt-10">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div>
          <p className="font-mono text-[10.5px] tracking-[0.2em] text-white/40">
            {String(number).padStart(2, "0")}
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
          onClick={() => onOpen(category.posts[0].code)}
          className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.15em] text-white/55 transition-colors hover:text-white"
        >
          Full screen <Maximize2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {category.spotlight ? (
        <Spotlight posts={regular} onOpen={onOpen} />
      ) : (
        regular.length > 0 && (
          <div
            className={`gap-6 [&>*]:mb-6 [&>*]:break-inside-avoid ${
              regular.length === 1 ? "max-w-[480px]" : "columns-1 sm:columns-2 xl:columns-3"
            }`}
          >
            {regular.map((p, i) => (
              <PostCard
                key={p.code}
                post={p}
                index={i}
                // A slight drop on alternate cards keeps the columns uneven.
                offset={regular.length > 1 && i % 2 === 1}
                onOpen={() => onOpen(p.code)}
              />
            ))}
          </div>
        )
      )}

      {framed.map(p => (
        <FilmStrip
          key={p.code}
          post={p}
          resolved={media[p.code]}
          onOpen={frame => onOpen(p.code, frame)}
        />
      ))}
    </section>
  );
}

function PostCard({
  post,
  index,
  offset,
  onOpen,
}: {
  post: PortfolioPost;
  index: number;
  offset?: boolean;
  onOpen: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.06, ease: EASE_OUT } }}
      viewport={{ once: true, margin: "-60px" }}
      className={`group ${offset ? "sm:pt-10" : ""}`}
    >
      <PostBar post={post} index={index} onOpen={onOpen} />
      <InstagramEmbed code={post.code} width={400} />
    </motion.article>
  );
}

function PostBar({
  post,
  index,
  onOpen,
}: {
  post: PortfolioPost;
  index: number;
  onOpen: () => void;
}) {
  return (
    <div className="mb-2 flex items-center justify-between gap-3">
      <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
        <InstagramGlyph size={11} />
        Post {String(index + 1).padStart(2, "0")}
        {post.credit && <span className="text-white/35">· with {post.credit}</span>}
      </span>
      <button
        type="button"
        onClick={onOpen}
        aria-label="Open full screen"
        className="flex items-center gap-1.5 rounded-full border border-white/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/60 transition-colors hover:border-white hover:bg-white hover:text-black"
      >
        <Maximize2 className="h-3 w-3" />
        Expand
      </button>
    </div>
  );
}

// Birthdays: two big prints pinned to the grid, slightly askew, with tape.
function Spotlight({
  posts,
  onOpen,
}: {
  posts: PortfolioPost[];
  onOpen: (code: string) => void;
}) {
  const tilt = ["md:-rotate-2", "md:rotate-[1.5deg] md:mt-12"];
  const tape = ["bg-amber-200/50 -rotate-6", "bg-emerald-200/40 rotate-3"];
  return (
    <div className="relative">
      <p
        aria-hidden
        className="pointer-events-none mb-4 -rotate-3 font-hand text-[26px] leading-none text-white/70 md:mb-6 md:ml-4"
      >
        the spotlight ✶
      </p>
      <div className="grid gap-10 md:grid-cols-2 md:gap-12 md:px-4">
        {posts.map((p, i) => (
          <motion.figure
            key={p.code}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.12, ease: EASE_OUT } }}
            viewport={{ once: true, margin: "-60px" }}
            className={`relative bg-[#f4f3ec] p-3 pb-12 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] transition-transform duration-500 md:hover:rotate-0 md:hover:scale-[1.01] ${tilt[i % 2]}`}
          >
            <span
              aria-hidden
              className={`absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 shadow-sm ${tape[i % 2]}`}
            />
            <InstagramEmbed code={p.code} width={460} />
            <figcaption className="absolute inset-x-3 bottom-3 flex items-center justify-between">
              <span className="font-hand text-[22px] leading-none text-neutral-700">
                spotlight 0{i + 1}
              </span>
              <button
                type="button"
                onClick={() => onOpen(p.code)}
                className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-600 transition-colors hover:text-black"
              >
                <Maximize2 className="h-3 w-3" />
                Expand
              </button>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  );
}

// Chosen frames from a carousel, run as a strip of film. Without the Graph
// API the frames can't be pulled out, so the whole post shows with a note.
function FilmStrip({
  post,
  resolved,
  onOpen,
}: {
  post: PortfolioPost;
  resolved?: IgResolved;
  onOpen: (frame?: number) => void;
}) {
  const frames = (post.frames ?? []).filter(n => resolved?.slides[n - 1]);
  const range = post.frames
    ? `${post.frames[0]}–${post.frames[post.frames.length - 1]}`
    : "";

  if (!frames.length) {
    return (
      <div className="mt-4 grid items-start gap-6 sm:grid-cols-[minmax(0,400px)_1fr]">
        <div>
          <PostBar post={post} index={0} onOpen={() => onOpen()} />
          <InstagramEmbed code={post.code} width={400} />
        </div>
        <p
          aria-hidden
          className="font-hand text-[24px] leading-tight text-white/70 sm:mt-40 sm:-rotate-3"
        >
          ← swipe to frames {range}
          <br />
          <span className="text-white/45">the night in four shots</span>
        </p>
      </div>
    );
  }

  const sprockets = {
    backgroundImage:
      "repeating-linear-gradient(90deg, transparent 0 8px, rgb(255 255 255 / 0.18) 8px 18px, transparent 18px 26px)",
  };

  return (
    <div className="mt-4">
      <p className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
        <span>Frames {range} · from one night</span>
        <a
          href={`https://www.instagram.com/p/${post.code}/`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 transition-colors hover:text-white"
        >
          Full post <ArrowUpRight className="h-3 w-3" />
        </a>
      </p>
      <div className="rounded-md bg-[#0c0c0c] px-2 py-5 ring-1 ring-white/10">
        <div aria-hidden className="mb-3 h-2.5" style={sprockets} />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {frames.map((n, i) => (
            <motion.button
              key={n}
              type="button"
              onClick={() => onOpen(n)}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08, ease: EASE_OUT } }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resolved!.slides[n - 1].url}
                alt={`Nightlife — frame ${n}`}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <span className="absolute left-2 top-2 font-mono text-[10px] tracking-[0.15em] text-white/80 mix-blend-difference">
                {String(n).padStart(2, "0")}
              </span>
            </motion.button>
          ))}
        </div>
        <div aria-hidden className="mt-3 h-2.5" style={sprockets} />
      </div>
    </div>
  );
}
