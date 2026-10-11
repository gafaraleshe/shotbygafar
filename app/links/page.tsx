"use client";

/*
 * Links — index-card / filing aesthetic on the black graph-paper canvas.
 * Every SHOTBYGAFAR link in one place: socials, portfolio, booking, parent
 * studio, and referrals.
 */

import { motion } from "framer-motion";
import {
  NameReveal,
  chipPop,
  clipDrop,
  flipIn,
  heroRise,
  hoverLift,
  photoHover,
  rise,
  riseInView,
  tapePop,
} from "@/components/motion";
import { ArrowUpRight, Paperclip } from "lucide-react";
import {
  InstagramIcon,
  TikTokIcon,
  YouTubeIcon,
  FacebookIcon,
  CameraIcon,
  GlobeIcon,
  FilmIcon,
  PaletteIcon,
  MailIcon,
} from "@/components/LinkIcons";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

const PROFILE_IMG = "/assets/gafar-profile.jpg";

const socials = [
  {
    label: "Instagram",
    handle: "@shot.by.gafar",
    href: "https://www.instagram.com/shot.by.gafar/",
    Icon: InstagramIcon,
  },
  {
    label: "TikTok",
    handle: "@gafaraleshe",
    href: "https://tiktok.com/@gafaraleshe",
    Icon: TikTokIcon,
  },
  {
    label: "YouTube",
    handle: "@gafaraleshe",
    href: "https://www.youtube.com/@gafaraleshe",
    Icon: YouTubeIcon,
  },
  {
    label: "Facebook",
    handle: "Shot By Gafar",
    href: "https://www.facebook.com/p/Shotbya-100067890192787/",
    Icon: FacebookIcon,
  },
  {
    label: "Email",
    handle: "contact@shotbygafar.com",
    href: "mailto:contact@shotbygafar.com",
    Icon: MailIcon,
  },
];

const features = [
  {
    label: "Book a Shoot",
    description: "contact@shotbygafar.com · reply within a day",
    href: "mailto:contact@shotbygafar.com",
    Icon: MailIcon,
  },
  {
    label: "WhatsApp",
    description: "+44 788 265 5541 — quick enquiries",
    href: "https://wa.me/447882655541",
    Icon: GlobeIcon,
  },
  {
    label: "Instagram Feed",
    description: "Latest portraits, weddings & reels — @shot.by.gafar",
    href: "https://www.instagram.com/shot.by.gafar/",
    Icon: InstagramIcon,
  },
  {
    label: "Portfolio",
    description: "Photography & film — portraits, weddings, events",
    href: "/portfolio",
    Icon: CameraIcon,
  },
  {
    label: "Presets & Colour Grades",
    description: "Lightroom presets & LUTs via Gaffy Studios",
    href: "https://gaffystudios.com/shop",
    Icon: PaletteIcon,
  },
  {
    label: "Gaffy Studios",
    description: "The creative studio behind SHOTBYGAFAR",
    href: "https://gaffystudios.com",
    Icon: FilmIcon,
  },
  {
    label: "Gafar Aleshe",
    description: "Personal brand & dev portfolio — gafaraleshe.com",
    href: "https://www.gafaraleshe.com",
    Icon: GlobeIcon,
  },
  {
    label: "FAQ",
    description: "Bookings, pricing & delivery",
    href: "/faq",
    Icon: GlobeIcon,
  },
];

function CornerMarks() {
  const base = "pointer-events-none absolute h-4 w-4 border-ink/40";
  return (
    <>
      <span className={`${base} left-3 top-3 border-l border-t`} />
      <span className={`${base} right-3 top-3 border-r border-t`} />
      <span className={`${base} bottom-3 left-3 border-b border-l`} />
      <span className={`${base} bottom-3 right-3 border-b border-r`} />
    </>
  );
}

export default function Links() {
  return (
    <div className="min-h-screen px-4 py-6 sm:px-8 sm:py-8">
      <SiteHeader active="/links" />

      <main className="mx-auto max-w-2xl">
        {/* ── Index card ── */}
        <motion.div
          {...heroRise}
          className="relative rounded-md border border-ink/10 bg-paper px-6 py-8 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.55)] sm:px-10 sm:py-10"
          style={{
            backgroundImage:
              "radial-gradient(var(--paper-dot) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        >
          <CornerMarks />

          <motion.span
            {...tapePop(-3, 0.9)}
            className="pointer-events-none absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 bg-stone-300/50 shadow-sm dark:bg-stone-300/30"
          />
          <motion.span
            {...tapePop(-12, 1.05)}
            className="pointer-events-none absolute -left-4 top-1/3 h-6 w-16 bg-emerald-300/30 shadow-sm dark:bg-emerald-300/20"
          />
          <motion.span
            {...tapePop(6, 1.2)}
            className="pointer-events-none absolute -right-3 bottom-12 h-6 w-16 bg-amber-200/40 shadow-sm dark:bg-amber-200/25"
          />

          <div className="flex items-start justify-between gap-4">
            <motion.div {...rise(0.35)} className="pt-1">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-muted">
                Studio:
              </p>
              <h1 className="mt-1 font-display text-4xl font-extrabold uppercase leading-[0.9] tracking-tight text-ink sm:text-6xl">
                <NameReveal lines={["Shot", "By Gafar"]} />
              </h1>
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
                  className="h-7 w-7 -rotate-[20deg] text-ink-faint"
                  strokeWidth={1.5}
                />
              </motion.span>
              <div className="overflow-hidden rounded-sm border border-ink/10 bg-tile shadow-sm">
                <img
                  src={PROFILE_IMG}
                  alt="Gafar Aleshe — SHOTBYGAFAR"
                  className="aspect-square w-full object-cover grayscale transition duration-500 group-hover:grayscale-0"
                />
                <div className="border-t border-ink/10 px-2 py-1.5">
                  <p className="font-mono text-[9px] font-semibold uppercase leading-tight tracking-wide text-ink">
                    Gafar Aleshe
                  </p>
                  <div className="mt-0.5 flex items-center justify-between gap-1">
                    <p className="font-mono text-[7.5px] uppercase leading-tight tracking-wide text-ink-muted">
                      Photographer
                    </p>
                    <p className="font-mono text-[9px] text-ink-faint">UK</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.p
            {...rise(0.5)}
            className="mt-6 max-w-md font-mono text-[13px] leading-relaxed text-ink-soft"
          >
            Photography · Videography · Cinematography. Capturing moments that
            tell your story across the UK. Every link, in one place.
          </motion.p>

          <motion.div
            {...rise(0.65)}
            className="mt-8 flex items-center justify-end border-t border-dashed border-ink/15 pt-3"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
              Made with <span className="text-red-500">♥</span> in the UK
            </p>
          </motion.div>
        </motion.div>

        {/* ── Social bar ── */}
        <div className="mt-4 grid grid-cols-5 overflow-hidden rounded-md border-l border-t border-ink/10 bg-paper">
          {socials.map((s, i) => {
            const Icon = s.Icon;
            const isExternal =
              s.href.startsWith("http") || s.href.startsWith("mailto");
            return (
              <motion.a
                {...chipPop(0.4 + i * 0.05)}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
                key={s.label}
                href={s.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                title={`${s.label} — ${s.handle}`}
                className="flex aspect-square items-center justify-center border-b border-r border-ink/10 text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                <Icon />
              </motion.a>
            );
          })}
        </div>

        {/* ── Link cards ── */}
        <div className="mt-4 space-y-3">
          {features.map((f, i) => {
            const Icon = f.Icon;
            const isExternal =
              f.href.startsWith("http") || f.href.startsWith("mailto");
            return (
              <motion.a
                {...riseInView(Math.min(i * 0.07, 0.35))}
                {...hoverLift}
                key={f.label}
                href={f.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                className="group flex items-stretch overflow-hidden rounded-md border border-ink/10 bg-paper shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex w-20 shrink-0 items-center justify-center bg-ink text-paper sm:w-24">
                  <Icon />
                </div>
                <div className="flex min-w-0 flex-1 items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                      Link:
                    </p>
                    <p className="truncate font-display text-base font-bold uppercase tracking-tight text-ink">
                      {f.label}
                    </p>
                    {f.description && (
                      <p className="truncate font-mono text-[11px] text-ink-muted">
                        {f.description}
                      </p>
                    )}
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors group-hover:bg-ink group-hover:text-paper">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>

        <div className="pb-14">
          <SiteFooter />
        </div>
      </main>
    </div>
  );
}
