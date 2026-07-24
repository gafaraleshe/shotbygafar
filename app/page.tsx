"use client";

/*
 * Home — SHOTBYGAFAR photography brand on the black graph-paper canvas.
 * Index-card / filing aesthetic: dotted paper cards, mono labels, display
 * headings. Identity card → what we shoot → services → Instagram → contact.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  NameReveal,
  Reveal,
  clipDrop,
  flipIn,
  heroRise,
  hoverLift,
  photoHover,
  hoverPop,
  rise,
  riseInView,
  tapePop,
} from "@/components/motion";
import {
  ArrowUpRight,
  Camera,
  Clapperboard,
  Film,
  Mail,
  MapPin,
  Paperclip,
  Phone,
} from "lucide-react";
import { InstagramIcon } from "@/components/LinkIcons";
import { InstagramFeed } from "@/components/InstagramFeed";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

const PROFILE_IMG = "/assets/gafar-profile.jpg";

const DOTTED = {
  backgroundImage: "radial-gradient(rgba(0,0,0,0.07) 1px, transparent 1px)",
  backgroundSize: "16px 16px",
} as const;

// ── Data (from shotbygafar.com) ──
const roles = [
  "Photography",
  "Videography",
  "Cinematography",
  "Wedding Films",
  "Brand Content",
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

const services = [
  {
    Icon: Camera,
    title: "Photography",
    description:
      "Portraits, products, weddings, and events with a cinematic, story-first approach — shot and retouched in-house.",
  },
  {
    Icon: Film,
    title: "Videography",
    description:
      "Brand films, event coverage, and social content — filmed and edited end to end, delivered ready to post.",
  },
  {
    Icon: Clapperboard,
    title: "Cinematography",
    description:
      "Cinematic direction, lighting, and colour grading for weddings, music videos, and creative films.",
  },
];

const stats = [
  { value: "25+", label: "Clients" },
  { value: "UK", label: "Based & Mobile" },
  { value: "7yr+", label: "Behind the Lens" },
];

// ── Typewriter ──
function TypewriterText({ words }: { words: string[] }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const timerRef = useRef<number | null>(null);

  const tick = useCallback(() => {
    const current = words[wordIndex];
    if (!isDeleting) {
      if (text.length < current.length) {
        setText(current.slice(0, text.length + 1));
      } else {
        timerRef.current = window.setTimeout(() => setIsDeleting(true), 2000);
        return;
      }
    } else if (text.length > 0) {
      setText(current.slice(0, text.length - 1));
    } else {
      setIsDeleting(false);
      setWordIndex(p => (p + 1) % words.length);
    }
  }, [text, isDeleting, wordIndex, words]);

  useEffect(() => {
    const speed = isDeleting ? 40 : 70;
    timerRef.current = window.setTimeout(tick, speed);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [tick, isDeleting]);

  return (
    <span>
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[2px] bg-neutral-900"
      />
    </span>
  );
}

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

// ── Page ──
export default function Home() {
  return (
    <div className="min-h-screen px-4 py-6 sm:px-8 sm:py-8">
      <SiteHeader active="/" />

      <main className="mx-auto max-w-2xl pb-14">
        {/* ── Identity card ── */}
        <motion.div
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
            {...tapePop(-12, 1.05)}
            className="pointer-events-none absolute -left-4 top-1/3 h-6 w-16 bg-emerald-300/30 shadow-sm"
          />
          <motion.span
            {...tapePop(6, 1.2)}
            className="pointer-events-none absolute -right-3 bottom-12 h-6 w-16 bg-amber-200/40 shadow-sm"
          />

          <div className="flex items-start justify-between gap-4">
            <motion.div {...rise(0.35)} className="pt-1">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
                Studio:
              </p>
              <h1 className="mt-1 font-display text-4xl font-extrabold uppercase leading-[0.9] tracking-tight text-neutral-900 sm:text-6xl">
                <NameReveal lines={["Shot", "By Gafar"]} />
              </h1>
              <p className="mt-3 font-mono text-[13px] text-neutral-600">
                <TypewriterText words={roles} />
              </p>
            </motion.div>

            <motion.div
              {...flipIn(0.7)}
              {...photoHover}
              className="group relative w-28 shrink-0 sm:w-36"
            >
              <motion.span
                {...clipDrop(1.35)}
                className="absolute -top-3 right-4 z-10"
              >
                <Paperclip
                  className="h-7 w-7 -rotate-[20deg] text-neutral-400"
                  strokeWidth={1.5}
                />
              </motion.span>
              <div className="overflow-hidden rounded-sm border border-neutral-900/10 bg-white shadow-sm">
                <img
                  src={PROFILE_IMG}
                  alt="Gafar Aleshe — SHOTBYGAFAR"
                  className="aspect-square w-full object-cover grayscale transition duration-500 group-hover:grayscale-0"
                />
                <div className="border-t border-neutral-900/10 px-2 py-1.5">
                  <p className="font-mono text-[9px] font-semibold uppercase leading-tight tracking-wide text-neutral-900">
                    Gafar Aleshe
                  </p>
                  <div className="mt-0.5 flex items-center justify-between gap-1">
                    <p className="font-mono text-[7.5px] uppercase leading-tight tracking-wide text-neutral-500">
                      Photographer
                    </p>
                    <p className="font-mono text-[9px] text-neutral-400">
                      UK
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.p
            {...rise(0.5)}
            className="mt-6 max-w-md font-mono text-[13px] leading-relaxed text-neutral-700"
          >
            Photography, videography, and cinematography — capturing moments
            that tell your story. Bold, authentic visuals for portraits,
            weddings, events, and brands across the UK.
          </motion.p>

          <motion.div {...rise(0.65)} className="mt-6 flex flex-wrap gap-2">
            <motion.a
              {...hoverPop}
              href="/portfolio"
              className="rounded-md bg-neutral-900 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
            >
              View Portfolio
            </motion.a>
            <motion.a
              {...hoverPop}
              href="mailto:contact@shotbygafar.com"
              className="rounded-md border border-neutral-900/20 bg-white px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-wide text-neutral-900 transition-colors hover:bg-neutral-50"
            >
              Book a Shoot
            </motion.a>
            <motion.a
              {...hoverPop}
              href="https://www.instagram.com/shot.by.gafar/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-md border border-neutral-900/20 bg-white px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-wide text-neutral-900 transition-colors hover:bg-neutral-50"
            >
              <InstagramIcon />
              @shot.by.gafar
            </motion.a>
          </motion.div>

          <div className="mt-8 grid grid-cols-3 gap-3 border-t border-dashed border-neutral-900/15 pt-5">
            {stats.map((s, i) => (
              <motion.div {...rise(0.8 + i * 0.1)} key={s.label}>
                <p className="font-display text-2xl font-extrabold tracking-tight text-neutral-900">
                  {s.value}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-500">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            {...rise(1)}
            className="mt-6 flex items-center justify-between border-t border-dashed border-neutral-900/15 pt-3"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Booking now · United Kingdom
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
              Est. Gaffy Studios
            </p>
          </motion.div>
        </motion.div>

        {/* ── What we shoot ── */}
        <SectionCard id="work" label="Work:" title="What we shoot">
          <div className="grid gap-3 sm:grid-cols-2">
            {shoots.map((s, i) => (
              <motion.div
                {...riseInView(i * 0.08)}
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
              </motion.div>
            ))}
          </div>
        </SectionCard>

        {/* ── Services ── */}
        <SectionCard id="services" label="Services:" title="What we do">
          <div className="space-y-6">
            {services.map((s, i) => (
              <motion.div
                {...riseInView(i * 0.12)}
                key={s.title}
                className={
                  i > 0
                    ? "border-t border-dashed border-neutral-900/15 pt-6"
                    : ""
                }
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-neutral-900 text-white">
                    <s.Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold uppercase tracking-tight text-neutral-900">
                      {s.title}
                    </h3>
                    <p className="mt-1 font-mono text-[12px] leading-relaxed text-neutral-600">
                      {s.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </SectionCard>

        {/* ── Instagram embed ── */}
        <Reveal>
          <InstagramFeed />
        </Reveal>

        {/* ── Contact ── */}
        <SectionCard id="contact" label="Contact:" title="Let's create something">
          <p className="font-mono text-[12px] leading-relaxed text-neutral-600">
            Booking portraits, weddings, events, and brand shoots across the UK.
            Reach out any time — we usually reply within a day.
          </p>

          <div className="mt-5 space-y-2.5 border-t border-dashed border-neutral-900/15 pt-5">
            <a
              href="mailto:contact@shotbygafar.com"
              className="flex items-center gap-3 font-mono text-[12px] text-neutral-700 transition-colors hover:text-neutral-900"
            >
              <Mail className="h-4 w-4 text-neutral-400" />
              contact@shotbygafar.com
            </a>
            <a
              href="tel:+447882655541"
              className="flex items-center gap-3 font-mono text-[12px] text-neutral-700 transition-colors hover:text-neutral-900"
            >
              <Phone className="h-4 w-4 text-neutral-400" />
              +44 788 265 5541
            </a>
            <p className="flex items-center gap-3 font-mono text-[12px] text-neutral-700">
              <MapPin className="h-4 w-4 text-neutral-400" />
              United Kingdom · Mobile & Studio
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <motion.a
              {...hoverPop}
              href="mailto:contact@shotbygafar.com"
              className="flex items-center gap-2 rounded-md bg-neutral-900 px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
            >
              <Mail className="h-4 w-4" />
              Email Us
            </motion.a>
            <motion.a
              {...hoverPop}
              href="https://wa.me/447882655541"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-md border border-neutral-900/20 bg-white px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-neutral-900 transition-colors hover:bg-neutral-50"
            >
              WhatsApp
            </motion.a>
            <motion.a
              {...hoverPop}
              href="https://www.instagram.com/shot.by.gafar/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-md border border-neutral-900/20 bg-white px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-neutral-900 transition-colors hover:bg-neutral-50"
            >
              <InstagramIcon />
              Instagram
            </motion.a>
          </div>
        </SectionCard>

        {/* ── Parent studio ── */}
        <Reveal>
          <motion.a
            {...hoverLift}
            href="https://gaffystudios.com"
            target="_blank"
            rel="noreferrer"
            className="group mt-4 flex items-center justify-between gap-3 rounded-md border border-white/15 bg-white/[0.03] px-6 py-5 transition-colors hover:bg-white/[0.06]"
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
                Part of
              </p>
              <p className="font-display text-lg font-bold uppercase tracking-tight text-white">
                Gaffy Studios
              </p>
              <p className="font-mono text-[11px] text-white/60">
                The creative studio behind SHOTBYGAFAR
              </p>
            </div>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/25 text-white transition-colors group-hover:bg-white group-hover:text-neutral-900">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </motion.a>
        </Reveal>

        <SiteFooter />
      </main>
    </div>
  );
}
