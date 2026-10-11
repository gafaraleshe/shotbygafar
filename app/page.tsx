"use client";

/*
 * Home — laid out like gafaraleshe.com (after pysavant.cv), tuned for the
 * photography side: one narrow column on a paper sheet over the graph-paper
 * grid, with a name and profile row, a few plain paragraphs, then quiet
 * labelled sections. Where the code site shows commits and skills, this one
 * shows the Instagram grid, how a shoot runs, what's covered, the work and
 * the packages.
 */

import { useState } from "react";
import { motion, type MotionProps } from "framer-motion";
import {
  Aperture,
  CalendarCheck,
  Camera,
  Clapperboard,
  Film,
  Lightbulb,
  Megaphone,
  Package,
  Palette,
  PartyPopper,
  Smartphone,
  User,
  Video,
  type LucideIcon,
} from "lucide-react";
import { NameReveal, Reveal } from "@/components/motion";
import {
  InstagramGlyph,
  MailGlyph,
  TikTokGlyph,
  WhatsAppGlyph,
  YouTubeGlyph,
} from "@/components/BrandIcons";
import { INSTAGRAM_PROFILE, InstagramFeed } from "@/components/InstagramFeed";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

const PROFILE_IMG = "/assets/gafar-profile.jpg";
const EMAIL = "contact@shotbygafar.com";
const PHONE = "+44 788 265 5541";
const PHONE_HREF = "tel:+447882655541";
const WHATSAPP_URL = "https://wa.me/447882655541";
const WIDTH = "max-w-[760px]";

const DOTTED = {
  backgroundImage: "radial-gradient(var(--paper-dot) 1px, transparent 1px)",
  backgroundSize: "16px 16px",
} as const;

// pysavant's entrance: a short, soft rise rather than the card bounces.
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const softRise = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "tween", duration: 0.55, delay, ease: EASE_OUT },
  },
});

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

const process = [
  {
    title: "Enquire",
    detail: "Date, location and the idea. Availability confirmed within a day.",
  },
  {
    title: "Plan",
    detail: "Package, shot list and timeline agreed; a deposit locks it in.",
  },
  {
    title: "Shoot",
    detail: "Directed, lit and captured on the day — relaxed and hands-on.",
  },
  {
    title: "Deliver",
    detail: "Sneak peek within days, the full gallery or film soon after.",
  },
];

// Laid out like the Skills rows on gafaraleshe.com: discipline on the
// left, what it covers inline with a glyph each.
const disciplines: [string, [string, LucideIcon][]][] = [
  [
    "Photography",
    [
      ["Portraits", User],
      ["Products", Package],
      ["Weddings", Camera],
      ["Events", PartyPopper],
    ],
  ],
  [
    "Videography",
    [
      ["Brand films", Megaphone],
      ["Event coverage", Video],
      ["Social content", Smartphone],
    ],
  ],
  [
    "Cinematography",
    [
      ["Direction", Clapperboard],
      ["Lighting", Lightbulb],
      ["Colour grading", Palette],
    ],
  ],
  [
    "Delivery",
    [
      ["Online gallery", Aperture],
      ["Highlight reels", Film],
    ],
  ],
];

const work = [
  {
    name: "Portraits",
    detail: "Studio, on-location and lifestyle sessions that feel like you",
  },
  {
    name: "Weddings",
    detail: "Cinematic films and photography of the day as it felt",
  },
  {
    name: "Events",
    detail: "Parties, conferences and live shows, galleries and reels",
  },
  {
    name: "Brand content",
    detail: "Product films, promos and social-first content for brands",
  },
];

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

// ── Pieces ──

function Section({
  id,
  title,
  action,
  children,
}: {
  id?: string;
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Reveal y={16}>
      <section id={id} className="scroll-mt-16">
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <h2 className="text-[15px] font-medium tracking-[-0.01em] text-ink">
            {title}
          </h2>
          {action}
        </div>
        {children}
      </section>
    </Reveal>
  );
}

function SectionLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="group flex items-center gap-1.5 text-[13px] text-ink-muted transition-colors hover:text-ink sm:text-[13.5px]"
    >
      {children}
      <span
        aria-hidden
        className="text-ink-faint transition-transform duration-300 group-hover:translate-x-0.5"
      >
        →
      </span>
    </a>
  );
}

function CornerMarks() {
  const base = "pointer-events-none absolute h-3 w-3 border-ink/25";
  return (
    <>
      <span className={`${base} left-3 top-3 border-l border-t`} />
      <span className={`${base} right-3 top-3 border-r border-t`} />
      <span className={`${base} bottom-3 left-3 border-b border-l`} />
      <span className={`${base} bottom-3 right-3 border-b border-r`} />
    </>
  );
}

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

// The experience strip from gafaraleshe.com, as the four steps of a shoot:
// a hairline with a dot per step, the first pulsing, detail on demand.
function HowItWorks() {
  const [open, setOpen] = useState(false);
  const cols = process.length;

  return (
    <Section
      id="process"
      title="How a shoot works"
      action={
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          className="flex items-center gap-1 text-[13px] text-ink-muted transition-colors hover:text-ink sm:text-[13.5px]"
        >
          {open ? "Less" : "Details"}
          <span
            aria-hidden
            className={`inline-block transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          >
            ⌄
          </span>
        </button>
      }
    >
      <div aria-hidden className="relative mb-3.5 hidden h-2 sm:block">
        <div
          className="absolute left-0 top-1/2 h-px -translate-y-1/2"
          style={{
            right: `${100 / cols}%`,
            backgroundImage:
              "linear-gradient(to right, var(--ink) 0%, color-mix(in oklab, var(--ink) 18%, transparent) 70%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-1/2 grid -translate-y-1/2"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {process.map((step, i) => (
            <div key={step.title} className="flex justify-start">
              <span className="relative flex size-1.5 items-center justify-center">
                {i === 0 && (
                  <span className="absolute -inset-1 animate-ping rounded-full bg-ink/15 [animation-duration:2.8s]" />
                )}
                <span
                  className={`relative size-1.5 rounded-full ${i === 0 ? "bg-ink" : "bg-ink/30"}`}
                />
              </span>
            </div>
          ))}
        </div>
      </div>

      <ol className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4">
        {process.map((step, i) => (
          <li key={step.title} className="sm:pr-3">
            <p className="text-[14px] font-medium text-ink sm:text-[14.5px]">
              {step.title}
            </p>
            <p className="mt-1 font-mono text-[11.5px] tracking-[0.02em] text-ink-faint">
              Step {String(i + 1).padStart(2, "0")}
            </p>
            {open && (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05, ease: EASE_OUT }}
                className="mt-2 text-[13px] leading-relaxed text-ink-dim"
              >
                {step.detail}
              </motion.p>
            )}
          </li>
        ))}
      </ol>
    </Section>
  );
}

// ── Page ──
export default function Home() {
  return (
    <div className="min-h-screen px-4 py-5 sm:px-8 sm:py-8">
      <SiteHeader active="/" width={WIDTH} />

      <main
        className={`relative mx-auto ${WIDTH} rounded-xl border border-ink/10 bg-paper px-5 pb-8 pt-12 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.6)] sm:px-12 sm:pb-10 sm:pt-16`}
        style={DOTTED}
      >
        <CornerMarks />

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
              Most of my work is for couples, creatives and small businesses who
              want visuals that feel like them — bold{" "}
              <a className="link" href="/services#shoots">
                portraits
              </a>
              , cinematic{" "}
              <a className="link" href="/portfolio">
                wedding films
              </a>{" "}
              and{" "}
              <a className="link" href="/services">
                brand content
              </a>{" "}
              built for social.
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
                href="https://www.gafaraleshe.com/cinema/shop"
                target="_blank"
                rel="noreferrer"
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
              <div key={s.label} className="flex items-baseline gap-1.5">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-mono text-[11.5px] tracking-[0.02em] text-ink-faint">
                  <span className="text-ink-dim">{s.value}</span> {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </header>

        <div className="mt-12 space-y-12">
          {/* ── Latest: the Instagram grid ── */}
          <Section
            id="latest"
            title="Latest"
            action={
              <SectionLink href={INSTAGRAM_PROFILE.url} external>
                {INSTAGRAM_PROFILE.handle}
              </SectionLink>
            }
          >
            <InstagramFeed />
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

          {/* ── Work ── */}
          <Section
            id="work"
            title="What I shoot"
            action={<SectionLink href="/portfolio">Portfolio</SectionLink>}
          >
            <ol className="space-y-3">
              {work.map((w, i) => (
                <li key={w.name} className="flex items-baseline gap-3">
                  <span className="w-4 shrink-0 font-mono text-[11.5px] tracking-[0.02em] text-ink-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[14px] leading-relaxed text-ink-muted sm:text-[14.5px]">
                    <a href="/portfolio" className="link">
                      {w.name}
                    </a>{" "}
                    <span className="text-ink-faint">—</span> {w.detail}
                  </p>
                </li>
              ))}
            </ol>
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
        </div>

        {/* ── Footer ── */}
        <footer className="mt-20 flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 pt-5">
          <p className="font-mono text-[11.5px] tracking-[0.02em] text-ink-faint">
            © {new Date().getFullYear()} SHOTBYGAFAR
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <a
              href={PHONE_HREF}
              className="font-mono text-[11.5px] tracking-[0.02em] text-ink-muted transition-colors hover:text-ink"
            >
              {PHONE}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="font-mono text-[11.5px] tracking-[0.02em] text-ink-muted transition-colors hover:text-ink"
            >
              {EMAIL}
            </a>
          </div>
        </footer>
      </main>

      <SiteFooter width={WIDTH} />
    </div>
  );
}
