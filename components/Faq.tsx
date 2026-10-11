/*
 * FAQ content and its expanding list, shared by /faq and the home page.
 * Answers follow the pricing page and the process on the services page;
 * keep them in step when those change.
 */

import { EMAIL } from "@/components/Sheet";

export type QA = { q: string; a: React.ReactNode };

export const faqGroups: { title: string; items: QA[] }[] = [
  {
    title: "Booking",
    items: [
      {
        q: "How do I book a shoot?",
        a: (
          <>
            Send an enquiry through the{" "}
            <a href="/booking" className="link">
              booking form
            </a>
            , message me on WhatsApp, or email {EMAIL} with the date,
            location and what you have in mind. I&apos;ll confirm availability
            within a day.
          </>
        ),
      },
      {
        q: "How far ahead should I book?",
        a: "As early as you can for weddings, concerts and big events, since dates go first. Portraits, birthdays and brand shoots can often be turned around much sooner — just ask.",
      },
      {
        q: "Is there a deposit?",
        a: "Yes. Once we've agreed the package, shot list and timeline, a deposit locks in your date.",
      },
    ],
  },
  {
    title: "The shoot",
    items: [
      {
        q: "What do you shoot?",
        a: (
          <>
            Concerts, events, birthdays, football, lifestyle, nightlife and
            brand content — photo and video. You can see every style in the{" "}
            <a href="/portfolio" className="link">
              portfolio
            </a>
            .
          </>
        ),
      },
      {
        q: "Can you shoot concerts and club nights?",
        a: "Yes — live music and nightlife are a big part of my work. Tell me the venue and the artist or promoter when you enquire, and access is sorted before the night.",
      },
      {
        q: "Where are you based? Do you travel?",
        a: "I'm UK based and mobile. Travel within 30 miles is included; beyond that it's £0.45 a mile.",
      },
      {
        q: "Do you shoot video as well as photos?",
        a: "Yes. Highlight reels, short-form social clips and brand films, filmed and edited in-house.",
      },
      {
        q: "Can you bring a second shooter?",
        a: "Yes, for £200 — useful for weddings and bigger events where two angles matter.",
      },
    ],
  },
  {
    title: "Delivery",
    items: [
      {
        q: "When will I get my photos?",
        a: "A sneak-peek selection lands within days, with the full edited gallery or film soon after. Timelines are confirmed when you book, and rush 48-hour delivery is available for £120.",
      },
      {
        q: "How are photos delivered?",
        a: "Through an online gallery you can download from and share. Weddings also come on USB, and printed albums or prints start from £80.",
      },
      {
        q: "Can I use the photos commercially?",
        a: "Portrait and personal shoots come with personal usage rights. Brand shoots include a commercial usage licence — tell me how you'll use the images and I'll make sure the licence fits.",
      },
    ],
  },
  {
    title: "Pricing",
    items: [
      {
        q: "How much does a shoot cost?",
        a: (
          <>
            Portrait sessions start at £150, brand content at £350, event
            coverage at £450 and weddings at £1,200. Every shoot is quoted to
            fit — see{" "}
            <a href="/pricing" className="link">
              full pricing
            </a>{" "}
            and add-ons.
          </>
        ),
      },
      {
        q: "Can I add more images or time?",
        a: "Yes — an extra hour of coverage is £90 and every additional 10 edited images is £40.",
      },
      {
        q: "Do you sell presets or LUTs?",
        a: (
          <>
            Yes — the colour grades I use are in the{" "}
            <a
              href="https://www.gafaraleshe.com/cinema/shop"
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              LUT &amp; preset shop
            </a>
            .
          </>
        ),
      },
    ],
  },
];

export function FaqList({ items }: { items: QA[] }) {
  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map(item => (
        <details key={item.q} className="group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3 text-[14px] text-ink sm:text-[14.5px] [&::-webkit-details-marker]:hidden">
            {item.q}
            <span
              aria-hidden
              className="shrink-0 font-mono text-[15px] leading-none text-ink-faint transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="pb-4 pr-6 text-[13.5px] leading-relaxed text-ink-dim sm:text-[14px]">
            {item.a}
          </div>
        </details>
      ))}
    </div>
  );
}

