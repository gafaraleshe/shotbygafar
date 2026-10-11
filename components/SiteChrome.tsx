"use client";

/*
 * Shared top bar + footer for every page.
 * Same chrome as gafaraleshe.com, on the graph-paper canvas (near-black in
 * both themes, so the white type always reads) — tuned for SHOTBYGAFAR.
 */

import Link from "next/link";
import { motion } from "framer-motion";
import { NameReveal, fadeIn } from "@/components/motion";

const NAV = [
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
] as const;

// Inner pages sit in a 2xl column; the home sheet is a little wider.
export function SiteHeader({
  active,
  width = "max-w-2xl",
}: {
  active?: string;
  width?: string;
}) {
  return (
    <motion.header
      {...fadeIn(0.15)}
      className={`mx-auto mb-8 flex ${width} flex-wrap items-center justify-between gap-x-2 gap-y-2 px-1 sm:mb-10`}
    >
      <Link
        href="/"
        className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-white"
      >
        <NameReveal lines={["SHOTBYGAFAR"]} delay={1.3} stagger={0.04} blur={4} />
      </Link>
      <nav className="flex flex-wrap items-center justify-end gap-x-1 gap-y-1">
        {NAV.filter(n => n.href !== active).map(n => (
          <a
            key={n.href}
            href={n.href}
            className="rounded-full px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white/80 transition-colors hover:text-white"
          >
            {n.label}
          </a>
        ))}
        <a
          href="/booking"
          aria-current={active === "/booking" ? "page" : undefined}
          className="rounded-full border border-white/30 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white transition-colors hover:bg-white/10"
        >
          Book ↗
        </a>
      </nav>
    </motion.header>
  );
}

export function SiteFooter({ width = "max-w-2xl" }: { width?: string }) {
  const links = [
    { label: "Services", href: "/services" },
    { label: "Pricing", href: "/pricing" },
    { label: "Booking", href: "/booking" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "All Links →", href: "/links" },
  ];
  return (
    <div className={`mx-auto mt-6 flex ${width} flex-wrap items-center justify-between gap-2 px-1`}>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
        © {new Date().getFullYear()} SHOTBYGAFAR · Gaffy Studios Ltd
      </p>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        {links.map(l => (
          <a
            key={l.href}
            href={l.href}
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white"
          >
            {l.label}
          </a>
        ))}
      </div>
    </div>
  );
}
