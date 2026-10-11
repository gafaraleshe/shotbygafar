"use client";

/*
 * Services — what SHOTBYGAFAR shoots, built from the portfolio: each style
 * from lib/portfolio.ts with a frame from its work, what's included, and a
 * link to the sets. Then the disciplines, how a shoot runs, and packages.
 * Same sheet layout as the home page.
 */

import { motion } from "framer-motion";
import { CalendarCheck } from "lucide-react";
import {
  HowItWorks,
  Section,
  SectionLink,
  Sheet,
  SheetIntro,
  WHATSAPP_URL,
  softRise,
} from "@/components/Sheet";
import { WhatsAppGlyph } from "@/components/BrandIcons";
import { framesOf, portfolio } from "@/lib/portfolio";
import { disciplines, styleDetails } from "@/lib/services";

export default function Services() {
  return (
    <Sheet active="/services">
      <SheetIntro label="Services" title="What I shoot">
        <p>
          Everything here is something I&apos;ve shot — concerts, events,
          birthdays, football, lifestyle, nightlife and brand work. Each style
          below links to the sets, so you can see exactly what you&apos;d get.
        </p>
      </SheetIntro>

      <motion.div
        {...softRise(0.08)}
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
      </motion.div>

      <div className="mt-12 space-y-12">
        {/* ── Styles, from the portfolio ── */}
        <Section
          id="styles"
          title="Styles"
          action={<SectionLink href="/portfolio">Portfolio</SectionLink>}
        >
          <ol className="divide-y divide-ink/10 border-y border-ink/10">
            {portfolio.map((c, i) => {
              const cover = framesOf(c.posts[0])[0];
              const detail = styleDetails[c.slug];
              return (
                <li key={c.slug} id={c.slug} className="scroll-mt-16">
                  <a
                    href={`/portfolio#${c.slug}`}
                    className="group flex gap-4 py-5 sm:gap-5"
                  >
                    <span className="relative block w-20 shrink-0 overflow-hidden rounded-[3px] bg-[#0a0a0a] sm:w-24">
                      {cover && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={cover.sm}
                          alt=""
                          width={cover.w}
                          height={cover.h}
                          loading="lazy"
                          className="aspect-[4/5] h-auto w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                        />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="text-[15px] font-medium text-ink">
                          <span className="mr-2 font-mono text-[11.5px] text-ink-faint">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {c.title}
                        </span>
                        <span className="shrink-0 font-mono text-[12px] text-ink-dim">
                          {detail?.from ? (
                            <>
                              <span className="text-ink-faint">from </span>
                              {detail.from}
                            </>
                          ) : (
                            <span className="text-ink-faint">quoted</span>
                          )}
                        </span>
                      </span>
                      <span className="mt-1 block text-[13.5px] leading-relaxed text-ink-dim">
                        {c.blurb}
                      </span>
                      {detail && (
                        <span className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                          {detail.includes.map(item => (
                            <span
                              key={item}
                              className="font-mono text-[11px] tracking-[0.02em] text-ink-muted before:mr-1.5 before:text-ink-faint before:content-['–']"
                            >
                              {item}
                            </span>
                          ))}
                        </span>
                      )}
                      <span className="mt-2 inline-flex items-center gap-1 text-[12.5px] text-ink-muted transition-colors group-hover:text-ink">
                        See the work
                        <span
                          aria-hidden
                          className="transition-transform duration-300 group-hover:translate-x-0.5"
                        >
                          →
                        </span>
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </Section>

        {/* ── Disciplines ── */}
        <Section id="disciplines" title="Disciplines">
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

        <HowItWorks />

        {/* ── Next steps ── */}
        <Section
          id="next"
          title="Prices & questions"
          action={<SectionLink href="/faq">FAQ</SectionLink>}
        >
          <p className="text-[14px] leading-relaxed text-ink-dim sm:text-[14.5px]">
            Packages start at £150 for a portrait session, with add-ons like a
            second shooter, rush delivery and prints.{" "}
            <a href="/pricing" className="link">
              See full pricing
            </a>
            , or{" "}
            <a href="/booking" className="link">
              send an enquiry
            </a>{" "}
            and I&apos;ll come back with a quote within a day.
          </p>
        </Section>
      </div>
    </Sheet>
  );
}
