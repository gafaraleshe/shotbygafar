"use client";

/*
 * Links — index-card / filing aesthetic on the black graph-paper canvas.
 * Every SHOTBYGAFAR link in one place: socials, portfolio, booking, parent
 * studio, and referrals.
 */

import { motion } from "framer-motion";
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

export default function Links() {
  return (
    <div className="min-h-screen px-4 py-6 sm:px-8 sm:py-8">
      <SiteHeader active="/links" />

      <main className="mx-auto max-w-2xl">
        {/* ── Index card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-md border border-neutral-900/10 bg-[#f4f3ec] px-6 py-8 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.55)] sm:px-10 sm:py-10"
          style={{
            backgroundImage:
              "radial-gradient(rgba(0,0,0,0.07) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        >
          <CornerMarks />

          <span className="pointer-events-none absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 -rotate-3 bg-stone-300/50 shadow-sm" />
          <span className="pointer-events-none absolute -left-4 top-1/3 h-6 w-16 -rotate-12 bg-emerald-300/30 shadow-sm" />
          <span className="pointer-events-none absolute -right-3 bottom-12 h-6 w-16 rotate-6 bg-amber-200/40 shadow-sm" />

          <div className="flex items-start justify-between gap-4">
            <div className="pt-1">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
                Studio:
              </p>
              <h1 className="mt-1 font-display text-4xl font-extrabold uppercase leading-[0.9] tracking-tight text-neutral-900 sm:text-6xl">
                Shot
                <br />
                By Gafar
              </h1>
            </div>

            <div className="relative w-28 shrink-0 sm:w-36">
              <Paperclip
                className="absolute -top-3 right-4 z-10 h-7 w-7 -rotate-[20deg] text-neutral-400"
                strokeWidth={1.5}
              />
              <div className="overflow-hidden rounded-sm border border-neutral-900/10 bg-white shadow-sm">
                <img
                  src={PROFILE_IMG}
                  alt="Gafar Aleshe — SHOTBYGAFAR"
                  className="aspect-square w-full object-cover"
                />
                <div className="border-t border-neutral-900/10 px-2 py-1.5">
                  <p className="font-mono text-[9px] font-semibold uppercase leading-tight tracking-wide text-neutral-900">
                    Gafar Aleshe
                  </p>
                  <div className="mt-0.5 flex items-center justify-between gap-1">
                    <p className="font-mono text-[7.5px] uppercase leading-tight tracking-wide text-neutral-500">
                      Photographer
                    </p>
                    <p className="font-mono text-[9px] text-neutral-400">UK</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-6 max-w-md font-mono text-[13px] leading-relaxed text-neutral-700">
            Photography · Videography · Cinematography. Capturing moments that
            tell your story across the UK. Every link, in one place.
          </p>

          <div className="mt-8 flex items-center justify-end border-t border-dashed border-neutral-900/15 pt-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
              Made with <span className="text-red-500">♥</span> in the UK
            </p>
          </div>
        </motion.div>

        {/* ── Social bar ── */}
        <div className="mt-4 grid grid-cols-5 overflow-hidden rounded-md border-l border-t border-neutral-900/10 bg-[#f4f3ec]">
          {socials.map(s => {
            const Icon = s.Icon;
            const isExternal =
              s.href.startsWith("http") || s.href.startsWith("mailto");
            return (
              <a
                key={s.label}
                href={s.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                title={`${s.label} — ${s.handle}`}
                className="flex aspect-square items-center justify-center border-b border-r border-neutral-900/10 text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
              >
                <Icon />
              </a>
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
                key={f.label}
                href={f.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.04 * i }}
                className="group flex items-stretch overflow-hidden rounded-md border border-neutral-900/10 bg-[#f4f3ec] shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex w-20 shrink-0 items-center justify-center bg-neutral-900 text-white sm:w-24">
                  <Icon />
                </div>
                <div className="flex min-w-0 flex-1 items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                      Link:
                    </p>
                    <p className="truncate font-display text-base font-bold uppercase tracking-tight text-neutral-900">
                      {f.label}
                    </p>
                    {f.description && (
                      <p className="truncate font-mono text-[11px] text-neutral-500">
                        {f.description}
                      </p>
                    )}
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-900/20 text-neutral-900 transition-colors group-hover:bg-neutral-900 group-hover:text-white">
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
