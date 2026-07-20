"use client";

/*
 * Shared top bar + footer for every page.
 * Same filing-card chrome as gaffystudios.com / gafaraleshe.com, on the
 * black graph-paper canvas — tuned for the SHOTBYGAFAR photography brand.
 */

import { motion } from "framer-motion";
import { fadeIn } from "@/components/motion";

const NAV = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "FAQ", href: "/faq" },
] as const;

export function SiteHeader({ active }: { active?: string }) {
  return (
    <motion.header
      {...fadeIn(0.15)}
      className="mx-auto mb-8 flex max-w-2xl items-center justify-between sm:mb-10"
    >
      <a
        href="/"
        className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-white"
      >
        SHOTBYGAFAR
      </a>
      <div className="flex items-center gap-1">
        {NAV.filter(n => n.href !== active).map(n => (
          <a
            key={n.href}
            href={n.href}
            className="rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white/80 transition-colors hover:text-white"
          >
            {n.label}
          </a>
        ))}
        <a
          href="/links"
          className="rounded-full border border-white/30 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white transition-colors hover:bg-white/10"
        >
          Links ↗
        </a>
      </div>
    </motion.header>
  );
}

export function SiteFooter() {
  return (
    <div className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-between gap-2 px-1">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
        © {new Date().getFullYear()} SHOTBYGAFAR · Gaffy Studios Ltd
      </p>
      <div className="flex items-center gap-4">
        <a
          href="/faq"
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white"
        >
          FAQ
        </a>
        <a
          href="/portfolio"
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white"
        >
          Portfolio
        </a>
        <a
          href="/links"
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white"
        >
          All Links →
        </a>
      </div>
    </div>
  );
}
