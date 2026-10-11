"use client";

/*
 * FAQ — bookings, shoots, delivery and pricing for SHOTBYGAFAR, grouped
 * and opened one at a time (content in components/Faq.tsx). Same sheet
 * layout as the home page.
 */

import { CalendarCheck } from "lucide-react";
import { FaqList, faqGroups } from "@/components/Faq";
import {
  Section,
  Sheet,
  SheetIntro,
  WHATSAPP_URL,
} from "@/components/Sheet";
import { WhatsAppGlyph } from "@/components/BrandIcons";

export default function FAQ() {
  return (
    <Sheet active="/faq">
      <SheetIntro label="FAQ" title="Good to know">
        <p>
          Bookings, shoots, delivery and pricing. Anything not covered here,
          just ask — I usually reply within a day.
        </p>
      </SheetIntro>

      <div className="mt-12 space-y-12">
        {faqGroups.map(g => (
          <Section key={g.title} title={g.title}>
            <FaqList items={g.items} />
          </Section>
        ))}

        <Section title="Still wondering?">
          <div className="flex flex-wrap items-center gap-2">
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
              Ask on WhatsApp
            </a>
          </div>
        </Section>
      </div>
    </Sheet>
  );
}
