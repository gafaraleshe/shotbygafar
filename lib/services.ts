/*
 * Shared service data for the home and services pages: the four steps of a
 * shoot, and the disciplines with what each covers.
 */

import {
  Aperture,
  Camera,
  Clapperboard,
  Film,
  Lightbulb,
  Megaphone,
  Music,
  Package,
  Palette,
  PartyPopper,
  Smartphone,
  Trophy,
  User,
  Video,
  type LucideIcon,
} from "lucide-react";

export const process = [
  {
    title: "Enquire",
    detail: "Date, location and the idea. Availability confirmed within a day.",
  },
  {
    title: "Plan",
    detail: "Package, shot list and timeline agreed; a deposit locks it in.",
  },
  {
    title: "Shoot",
    detail: "Directed, lit and captured on the day — relaxed and hands-on.",
  },
  {
    title: "Deliver",
    detail: "Sneak peek within days, the full gallery or film soon after.",
  },
];

// Laid out like the Skills rows on gafaraleshe.com: discipline on the
// left, what it covers inline with a glyph each.
export const disciplines: [string, [string, LucideIcon][]][] = [
  [
    "Photography",
    [
      ["Portraits", User],
      ["Concerts", Music],
      ["Sports", Trophy],
      ["Events", PartyPopper],
      ["Products", Package],
      ["Weddings", Camera],
    ],
  ],
  [
    "Videography",
    [
      ["Brand films", Megaphone],
      ["Event coverage", Video],
      ["Social content", Smartphone],
    ],
  ],
  [
    "Cinematography",
    [
      ["Direction", Clapperboard],
      ["Lighting", Lightbulb],
      ["Colour grading", Palette],
    ],
  ],
  [
    "Delivery",
    [
      ["Online gallery", Aperture],
      ["Highlight reels", Film],
    ],
  ],
];

// The categories on /portfolio (lib/portfolio.ts), one line each.

// What each portfolio style (lib/portfolio.ts) includes, for the services
// page. `from` only where a package on the pricing page covers it.
export const styleDetails: Record<
  string,
  { includes: string[]; from?: string }
> = {
  concerts: {
    includes: [
      "Stage, crowd and backstage frames",
      "Fast selects for socials",
      "Photo or short video clips",
    ],
  },
  events: {
    includes: [
      "Up to 4 hours of coverage",
      "80+ edited images + highlight reel",
      "48-hour sneak-peek selection",
    ],
    from: "£450",
  },
  birthdays: {
    includes: [
      "Portraits styled to the theme",
      "Party coverage, cake to last dance",
      "Retouched online gallery",
    ],
  },
  football: {
    includes: [
      "Training sessions and match days",
      "Action and player portraits",
      "Social-ready edits",
    ],
  },
  lifestyle: {
    includes: [
      "Up to 1 hour, on location",
      "15+ edited high-res images",
      "Personal usage rights",
    ],
    from: "£150",
  },
  nightlife: {
    includes: [
      "Flash and low-light coverage",
      "Clubs, venues and promoter nights",
      "Selects ready for the morning post",
    ],
  },
  brand: {
    includes: [
      "Half-day content session",
      "Photo + vertical video set",
      "Commercial usage licence",
    ],
    from: "£350",
  },
};
