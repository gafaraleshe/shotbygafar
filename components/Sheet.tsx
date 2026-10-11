"use client";

/*
 * The sheet layout shared by the home, services and FAQ pages, after
 * gafaraleshe.com (and pysavant.cv): one paper sheet over the graph-paper
 * grid holding quiet sections, each headed by a small label.
 */

import { useState } from "react";
import { motion, type MotionProps } from "framer-motion";
import { Reveal } from "@/components/motion";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { process } from "@/lib/services";

export const EMAIL = "contact@shotbygafar.com";
export const PHONE = "+44 788 265 5541";
export const PHONE_HREF = "tel:+447882655541";
export const WHATSAPP_URL = "https://wa.me/447882655541";
export const SHEET_WIDTH = "max-w-[760px]";

const DOTTED = {
  backgroundImage: "radial-gradient(var(--paper-dot) 1px, transparent 1px)",
  backgroundSize: "16px 16px",
} as const;

// pysavant's entrance: a short, soft rise rather than the card bounces.
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const softRise = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "tween", duration: 0.55, delay, ease: EASE_OUT },
  },
});

/** Page chrome plus the sheet itself, closed by the contact footer. */
export function Sheet({
  active,
  children,
}: {
  active: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen px-4 py-5 sm:px-8 sm:py-8">
      <SiteHeader active={active} width={SHEET_WIDTH} />

      <main
        className={`relative mx-auto ${SHEET_WIDTH} rounded-xl border border-ink/10 bg-paper px-5 pb-8 pt-12 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.6)] sm:px-12 sm:pb-10 sm:pt-16`}
        style={DOTTED}
      >
        <CornerMarks />
        {children}

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

      <SiteFooter width={SHEET_WIDTH} />
    </div>
  );
}

/** A page's own heading inside the sheet: a small label, a title, a lede. */
export function SheetIntro({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <motion.header {...softRise(0)}>
      <p className="font-mono text-[11.5px] tracking-[0.02em] text-ink-faint">
        {label}
      </p>
      <h1 className="mt-1 text-[26px] font-medium tracking-[-0.02em] text-ink sm:text-[30px]">
        {title}
      </h1>
      {children && (
        <div className="mt-4 space-y-3.5 text-[14.5px] leading-[1.75] text-ink-dim sm:text-[15.5px]">
          {children}
        </div>
      )}
    </motion.header>
  );
}

export function Section({
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

export function SectionLink({
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

export // The experience strip from gafaraleshe.com, as the four steps of a shoot:
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

