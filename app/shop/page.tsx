"use client";

/*
 * Shop — SHOTBYGAFAR's LUTs and presets (lib/shop.ts), in the sheet layout:
 * each pack as a frame of film in its colours, then the newsletter, with
 * the popup offering the same. Products without a Polar checkout link yet
 * show as "Coming soon".
 */

import { ArrowUpRight } from "lucide-react";
import { Section, Sheet, SheetIntro } from "@/components/Sheet";
import { NewsletterInline, NewsletterPopup } from "@/components/Newsletter";
import { isLive, products } from "@/lib/shop";

const SPROCKETS = {
  backgroundImage:
    "repeating-linear-gradient(90deg, transparent 0 6px, rgb(0 0 0 / 0.85) 6px 14px, transparent 14px 20px)",
} as const;

export default function Shop() {
  return (
    <Sheet active="/shop">
      <NewsletterPopup />

      <SheetIntro label="Shop" title="LUTs & presets">
        <p>
          The colour I use on my shoots, packed up for yours. Drop a LUT on
          your footage or a preset on your photos — instant download after
          checkout, for Premiere, DaVinci, Final Cut and Lightroom.
        </p>
      </SheetIntro>

      <div className="mt-12 space-y-12">
        <Section id="packs" title="Packs">
          <ul className="grid gap-5 sm:grid-cols-2">
            {products.map(p => {
              const live = isLive(p);
              return (
                <li
                  key={p.slug}
                  id={p.slug}
                  className="flex scroll-mt-16 flex-col overflow-hidden rounded-lg border border-ink/10 bg-tile"
                >
                  <div
                    className={`relative aspect-[16/9] bg-gradient-to-br ${p.accent}`}
                  >
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-1.5 h-2 opacity-70"
                      style={SPROCKETS}
                    />
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-1.5 h-2 opacity-70"
                      style={SPROCKETS}
                    />
                    <span className="absolute bottom-5 left-3 rounded-sm bg-black/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-white backdrop-blur-sm">
                      {p.kind}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-[15px] font-medium text-ink">
                        {p.name}
                      </h3>
                      <span className="shrink-0 font-mono text-[13px] text-ink-dim">
                        {p.price}
                      </span>
                    </div>
                    <p className="mt-1.5 flex-1 text-[13.5px] leading-relaxed text-ink-dim">
                      {p.description}
                    </p>
                    {live ? (
                      <a
                        href={p.checkoutUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 flex items-center justify-center gap-1.5 rounded-lg bg-ink px-3.5 py-2 text-[14px] font-medium text-paper transition-opacity hover:opacity-85"
                      >
                        Buy {p.price}
                        <ArrowUpRight className="h-[15px] w-[15px]" />
                      </a>
                    ) : (
                      <span className="mt-4 flex items-center justify-center rounded-lg border border-ink/15 px-3.5 py-2 text-[14px] text-ink-faint">
                        Coming soon
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </Section>

        <Section id="newsletter" title="Get new drops first">
          <NewsletterInline />
        </Section>
      </div>
    </Sheet>
  );
}
