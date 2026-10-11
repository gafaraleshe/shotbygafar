"use client";

/*
 * Home — laid out like gafaraleshe.com (after pysavant.cv), tuned for the
 * photography side: one narrow sheet over the graph-paper grid with a name
 * and profile row, a few plain paragraphs, then quiet labelled sections.
 * It opens on a coverflow carousel of standout frames above the sheet; the
 * work sits in a dark lightbox inside the sheet, styled like the portfolio,
 * and both open the same fullscreen viewer.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarCheck } from "lucide-react";
import { NameReveal } from "@/components/motion";
import {
  InstagramGlyph,
  MailGlyph,
  TikTokGlyph,
  WhatsAppGlyph,
  YouTubeGlyph,
} from "@/components/BrandIcons";
import {
  EASE_OUT,
  EMAIL,
  HowItWorks,
  Section,
  SectionLink,
  Sheet,
  WHATSAPP_URL,
  softRise,
} from "@/components/Sheet";
import { FaqList, faqGroups } from "@/components/Faq";
import { HeroCarousel } from "@/components/HeroCarousel";
import { SetCard } from "@/components/portfolio/Sets";
import { Viewer, buildSlides } from "@/components/portfolio/Viewer";
import { disciplines } from "@/lib/services";
import { framesOf, portfolio } from "@/lib/portfolio";

const PROFILE_IMG = "/assets/gafar-profile.jpg";

// ── Data ──

const profiles = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/shot.by.gafar/",
    Icon: InstagramGlyph,
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@gafaraleshe",
    Icon: TikTokGlyph,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@gafaraleshe",
    Icon: YouTubeGlyph,
  },
  { label: "WhatsApp", href: WHATSAPP_URL, Icon: WhatsAppGlyph },
  { label: "Email", href: `mailto:${EMAIL}`, Icon: MailGlyph },
];

const stats = [
  { value: "25+", label: "clients" },
  { value: "UK", label: "based & mobile" },
  { value: "7yr+", label: "behind the lens" },
];

// The first set of each style, in portfolio order, for the lightbox.
const featured = portfolio
  .filter(c => !c.spotlight)
  .map(c => ({ category: c, post: c.posts.find(p => !p.strip) ?? c.posts[0] }))
  .slice(0, 6);
const spotlight = portfolio.find(c => c.spotlight);

// From app/pricing/page.tsx.
const packages = [
  { name: "Portrait Session", note: "Up to 1 hour · 15+ images", price: "£150" },
  { name: "Brand Content", note: "Half day · photo + video set", price: "£350" },
  {
    name: "Event Coverage",
    note: "Up to 4 hours · photos + highlight reel",
    price: "£450",
  },
  {
    name: "Wedding Film & Photo",
    note: "Up to 8 hours · film + 250+ images",
    price: "£1,200",
  },
];

// Three quick answers; the rest are on /faq.
const quickFaqs = faqGroups.flatMap(g => g.items).filter(i =>
  [
    "How do I book a shoot?",
    "Can you shoot concerts and club nights?",
    "When will I get my photos?",
  ].includes(i.q)
);

// Hand-written margin note with a drawn arrow pointing back at the buttons.
function BookingNow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none ml-3 hidden items-center gap-1 sm:flex"
    >
      <svg
        viewBox="0 0 64 32"
        fill="none"
        className="doodle h-7 w-14 overflow-visible text-ink-muted"
      >
        <path
          d="M60 22C46 30 22 28 6 12"
          pathLength={1}
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <path
          d="M5 22L5 11L16 10"
          pathLength={1}
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ "--doodle-delay": "1.6s" } as React.CSSProperties}
        />
      </svg>
      <motion.span
        initial={{ opacity: 0, rotate: -8, y: 4 }}
        animate={{
          opacity: 1,
          rotate: -6,
          y: 0,
          transition: { delay: 1.1, duration: 0.6, ease: EASE_OUT },
        }}
        className="-mt-5 whitespace-nowrap font-hand text-[21px] leading-none text-ink-muted"
      >
        booking now
      </motion.span>
    </div>
  );
}

// ── Page ──
export default function Home() {
  const [open, setOpen] = useState<{ slug: string; index: number } | null>(
    null
  );

  const openAt = (slug: string, code: string, n: number) => {
    const category = portfolio.find(c => c.slug === slug);
    if (!category) return;
    const index = buildSlides(category).findIndex(
      s => s.code === code && s.n === n
    );
    setOpen({ slug, index: Math.max(0, index) });
  };

  return (
    <Sheet active="/" hero={<HeroCarousel onOpen={openAt} />}>
      {/* ── Header ── */}
      <header>
        <motion.div
          {...softRise(0)}
          className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
        >
          <div className="flex items-center gap-3.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PROFILE_IMG}
              alt=""
              width={44}
              height={44}
              className="size-11 shrink-0 rounded-full border border-ink/10 object-cover grayscale transition duration-500 hover:grayscale-0"
            />
            <div>
              <h1 className="text-[17px] font-medium tracking-[-0.015em] text-ink sm:text-[18px]">
                <NameReveal
                  lines={["SHOTBYGAFAR"]}
                  delay={0.2}
                  stagger={0.03}
                  blur={4}
                />
              </h1>
              <p className="mt-0.5 text-[14px] text-ink-muted sm:text-[14.5px]">
                Photography &amp; film{" "}
                <span className="whitespace-nowrap text-ink-faint">
                  / @shot.by.gafar
                </span>
              </p>
            </div>
          </div>

          <nav
            aria-label="Profiles"
            className="-ml-1.5 flex shrink-0 flex-wrap items-center gap-0.5 sm:ml-0 sm:gap-1 sm:pt-1"
          >
            {profiles.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                {...(href.startsWith("http")
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
                aria-label={label}
                title={label}
                className="grid size-8 place-items-center rounded-md text-ink-muted transition-colors hover:bg-tile hover:text-ink focus-visible:outline-2 focus-visible:outline-ink"
              >
                <Icon />
              </a>
            ))}
          </nav>
        </motion.div>

        <motion.div
          {...softRise(0.05)}
          className="mt-6 space-y-3.5 text-[14.5px] leading-[1.75] text-ink-dim sm:text-[15.5px]"
        >
          <p>
            Hey, I&apos;m Gafar — the photographer and filmmaker behind{" "}
            <span className="text-ink">SHOTBYGAFAR</span>, based in the{" "}
            <span className="text-ink">UK</span> and happy to travel. I shoot,
            edit and grade everything in-house, so what you book is what you
            get back.
          </p>
          <p>
            You&apos;ll find me side of stage at{" "}
            <a className="link" href="/portfolio#concerts">
              concerts
            </a>
            , pitchside at{" "}
            <a className="link" href="/portfolio#football">
              football
            </a>
            , in the middle of{" "}
            <a className="link" href="/portfolio#birthdays">
              birthdays
            </a>{" "}
            and{" "}
            <a className="link" href="/portfolio#nightlife">
              nights out
            </a>
            , and on set for{" "}
            <a className="link" href="/portfolio#brand">
              brands
            </a>{" "}
            that want to look like themselves.
          </p>
          <p>
            SHOTBYGAFAR is part of{" "}
            <a
              className="link"
              href="https://gaffystudios.com"
              target="_blank"
              rel="noreferrer"
            >
              Gaffy Studios
            </a>
            . The grades I use are in the{" "}
            <a
              className="link"
              href="/shop"
            >
              LUT &amp; preset shop
            </a>
            , and the code side of me lives at{" "}
            <a
              className="link"
              href="https://www.gafaraleshe.com"
              target="_blank"
              rel="noreferrer"
            >
              gafaraleshe.com
            </a>
            .
          </p>
        </motion.div>

        <motion.div
          {...softRise(0.1)}
          className="mt-7 flex flex-wrap items-center gap-2"
        >
          <a
            href="/booking"
            className="flex items-center gap-1.5 rounded-lg bg-ink px-3.5 py-2 text-[13.5px] font-medium text-paper transition-opacity hover:opacity-85 sm:text-[14px]"
          >
            <CalendarCheck aria-hidden className="h-[15px] w-[15px]" />
            Book a shoot
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-ink/15 bg-tile px-3.5 py-2 text-[13.5px] font-medium text-ink transition-colors hover:bg-tile-hover sm:text-[14px]"
          >
            <WhatsAppGlyph size={15} />
            WhatsApp
          </a>
          <BookingNow />
        </motion.div>

        <motion.dl
          {...softRise(0.15)}
          className="mt-6 flex flex-wrap gap-x-6 gap-y-1"
        >
          {stats.map(s => (
            <div key={s.label} className="flex flex-col-reverse">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-mono text-[11.5px] tracking-[0.02em] text-ink-faint">
                <span className="text-ink-dim">{s.value}</span> {s.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </header>

      <div className="mt-12 space-y-12">
        {/* ── Work: a dark lightbox inside the sheet, like the portfolio ── */}
        <Section
          id="work"
          title="Selected work"
          action={<SectionLink href="/portfolio">Full portfolio</SectionLink>}
        >
          <div className="-mx-2 rounded-lg bg-[#070707] px-4 pb-2 pt-5 ring-1 ring-black/40 sm:-mx-4 sm:px-6 sm:pt-6">
            <div className="columns-1 gap-5 sm:columns-2 [&>*]:mb-8 [&>*]:break-inside-avoid">
              {featured.map(({ category, post }, i) => (
                <div key={post.code}>
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                    {category.title}
                  </p>
                  <SetCard
                    post={post}
                    index={i}
                    offset={i % 2 === 1}
                    thumbs={4}
                    onOpen={(code, n) => openAt(category.slug, code, n)}
                  />
                </div>
              ))}
            </div>
            {spotlight && (
              <a
                href={`/portfolio#${spotlight.slug}`}
                className="group mb-5 flex items-center gap-4 border-t border-white/10 pt-5"
              >
                <span className="flex -space-x-3">
                  {spotlight.posts.map(p => {
                    const f = framesOf(p)[0];
                    return f ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={p.code}
                        src={f.sm}
                        alt=""
                        width={f.w}
                        height={f.h}
                        loading="lazy"
                        className="size-12 rounded-full object-cover ring-2 ring-[#070707]"
                      />
                    ) : null;
                  })}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-hand text-[22px] leading-none text-white/80">
                    the spotlight ✶ {spotlight.title.toLowerCase()}
                  </span>
                  <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                    {spotlight.blurb}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="text-white/50 transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </a>
            )}
          </div>
        </Section>

        <HowItWorks />

        {/* ── Services ── */}
        <Section
          id="services"
          title="Services"
          action={<SectionLink href="/services">All services</SectionLink>}
        >
          <dl className="space-y-3">
            {disciplines.map(([discipline, items]) => (
              <div
                key={discipline}
                className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-5"
              >
                <dt className="w-28 shrink-0 text-[13px] text-ink-muted sm:text-[13.5px]">
                  {discipline}
                </dt>
                <dd className="flex flex-wrap gap-x-3 gap-y-2">
                  {items.map(([item, Icon]) => (
                    <span
                      key={item}
                      className="flex items-center gap-1.5 text-[13px] text-ink-dim sm:text-[14px]"
                    >
                      <Icon
                        aria-hidden
                        strokeWidth={2}
                        className="size-[15px] shrink-0 text-ink-muted"
                      />
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        {/* ── Packages ── */}
        <Section
          id="packages"
          title="Packages"
          action={<SectionLink href="/pricing">Full pricing</SectionLink>}
        >
          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            {packages.map(p => (
              <li key={p.name}>
                <a
                  href="/pricing"
                  className="group flex items-baseline justify-between gap-4 py-3"
                >
                  <span>
                    <span className="text-[14px] text-ink sm:text-[14.5px]">
                      {p.name}
                    </span>
                    <span className="mt-0.5 block font-mono text-[11.5px] tracking-[0.02em] text-ink-faint sm:ml-3 sm:mt-0 sm:inline">
                      {p.note}
                    </span>
                  </span>
                  <span className="shrink-0 font-mono text-[12.5px] text-ink-dim transition-colors group-hover:text-ink">
                    <span className="text-ink-faint">from </span>
                    {p.price}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[13px] text-ink-muted">
            Every shoot is quoted to fit.{" "}
            <a href="/booking" className="link">
              Send an enquiry
            </a>{" "}
            and I&apos;ll come back within a day.
          </p>
        </Section>

        {/* ── Questions ── */}
        <Section
          id="faq"
          title="Questions"
          action={<SectionLink href="/faq">All questions</SectionLink>}
        >
          <FaqList items={quickFaqs} />
        </Section>
      </div>

      {open && <Viewer start={open} onClose={() => setOpen(null)} />}
    </Sheet>
  );
}
