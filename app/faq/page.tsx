"use client";

/*
 * FAQ — bookings, pricing, delivery for SHOTBYGAFAR. Same filing-card system.
 */

import { motion } from "framer-motion";
import { heroRise, riseInView } from "@/components/motion";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

const DOTTED = {
  backgroundImage: "radial-gradient(rgba(0,0,0,0.07) 1px, transparent 1px)",
  backgroundSize: "16px 16px",
} as const;

const faqs = [
  {
    q: "How do I book a shoot?",
    a: "Email contact@shotbygafar.com or message @shot.by.gafar on Instagram with your date, location, and what you have in mind. We'll confirm availability, agree a package, and lock in your session.",
  },
  {
    q: "What do you shoot?",
    a: "Portraits, weddings, events, and brand content — photography, videography, and cinematography. If it's a story worth telling, we can shoot it.",
  },
  {
    q: "Where are you based? Do you travel?",
    a: "We're based in the United Kingdom and shoot on-location or in-studio. Travel across the UK is available — just include your location when you enquire.",
  },
  {
    q: "How much does it cost?",
    a: "Pricing depends on the type of shoot, hours of coverage, and deliverables. Get in touch with your details and we'll send a tailored quote.",
  },
  {
    q: "When will I get my photos and videos?",
    a: "Turnaround varies by project. A sneak-peek selection is often shared within days, with the full gallery or edited film delivered soon after — timelines are confirmed at booking.",
  },
  {
    q: "Do you offer presets or digital products?",
    a: "Yes — Lightroom presets and digital products are available through the wider Gaffy Studios shop. Ask us for the latest links.",
  },
];

export default function FAQ() {
  return (
    <div className="min-h-screen px-4 py-6 sm:px-8 sm:py-8">
      <SiteHeader active="/faq" />

      <main className="mx-auto max-w-2xl pb-14">
        <motion.section
          {...heroRise}
          className="relative rounded-md border border-neutral-900/10 bg-[#f4f3ec] px-6 py-8 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.55)] sm:px-10 sm:py-10"
          style={DOTTED}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
            FAQ:
          </p>
          <h1 className="mt-1 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-neutral-900 sm:text-5xl">
            Good to know
          </h1>
          <p className="mt-4 max-w-md font-mono text-[13px] leading-relaxed text-neutral-700">
            Bookings, pricing, and delivery — the essentials. Still have a
            question? Email contact@shotbygafar.com.
          </p>
        </motion.section>

        <div className="mt-4 space-y-3">
          {faqs.map((f, i) => (
            <motion.div
              {...riseInView(Math.min(i * 0.06, 0.3))}
              key={f.q}
              className="rounded-md border border-neutral-900/10 bg-[#f4f3ec] px-6 py-5 shadow-sm"
              style={DOTTED}
            >
              <h2 className="font-display text-base font-bold uppercase tracking-tight text-neutral-900">
                {f.q}
              </h2>
              <p className="mt-2 font-mono text-[12px] leading-relaxed text-neutral-600">
                {f.a}
              </p>
            </motion.div>
          ))}
        </div>

        <section
          className="relative mt-4 rounded-md border border-neutral-900/10 bg-[#f4f3ec] px-6 py-7 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.45)] sm:px-8 sm:py-9"
          style={DOTTED}
        >
          <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight text-neutral-900">
            Still have a question?
          </h2>
          <p className="mt-3 font-mono text-[12px] leading-relaxed text-neutral-600">
            We usually reply within a day.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href="mailto:contact@shotbygafar.com"
              className="rounded-md bg-neutral-900 px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
            >
              Email Us
            </a>
            <a
              href="https://wa.me/447882655541"
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-neutral-900/20 bg-white px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-neutral-900 transition-colors hover:bg-neutral-50"
            >
              WhatsApp
            </a>
          </div>
        </section>

        <SiteFooter />
      </main>
    </div>
  );
}
