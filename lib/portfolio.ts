/*
 * Portfolio — the Instagram posts shown on /portfolio, grouped by the kind
 * of shoot. Each post is an Instagram shortcode (the part after /p/ in its
 * link). Add a post by appending its code to a category; add a category by
 * appending an entry. Categories render in this order.
 *
 *   frames     show only these slides (1-based) of a carousel post. Needs the
 *              Instagram Graph API token (see lib/instagram.ts) to pull the
 *              slides; without it the full embed shows with a swipe note.
 *   credit     the account that posted it, when it isn't @shot.by.gafar.
 *   spotlight  a category shown big, as pinned prints, instead of the grid.
 */

export type PortfolioPost = {
  code: string;
  frames?: number[];
  credit?: string;
};

export type PortfolioCategory = {
  slug: string;
  title: string;
  blurb: string;
  spotlight?: boolean;
  posts: PortfolioPost[];
};

export const portfolio: PortfolioCategory[] = [
  {
    slug: "concerts",
    title: "Concerts",
    blurb: "Stage light, crowd noise and the second the artist looks up.",
    posts: [{ code: "Db3FcFIiMpQ" }, { code: "Db4GYgciKrP" }],
  },
  {
    slug: "events",
    title: "Events",
    blurb: "Full coverage, from the doors opening to the last dance.",
    posts: [{ code: "DDpX0smscfh" }],
  },
  {
    slug: "birthdays",
    title: "Birthdays",
    blurb: "Two favourites — milestones shot like the main event they are.",
    spotlight: true,
    posts: [{ code: "DPkEvCDCLcm" }, { code: "DGzF9k_oomt" }],
  },
  {
    slug: "football",
    title: "Football",
    blurb: "Training sessions and match days, shot at full speed.",
    posts: [
      { code: "DLSZZ6cIiWA", credit: "@trainer_tana" },
      { code: "DZF6OdRDhZp", credit: "@trainer_tana" },
    ],
  },
  {
    slug: "lifestyle",
    title: "Lifestyle",
    blurb: "Everyday places, real people, honest light.",
    posts: [
      { code: "DGytwyPgGXJ" },
      { code: "DHAcOyxojhL" },
      { code: "DHpozDLotIp" },
    ],
  },
  {
    slug: "nightlife",
    title: "Nightlife",
    blurb: "Flash, neon and whatever the night turns into.",
    posts: [{ code: "DA9YxEegKtb" }, { code: "DA9VxJfgMkl", frames: [3, 4, 5, 6] }],
  },
  {
    slug: "brand",
    title: "Brand & Lifestyle",
    blurb: "Campaign-style content for brands that want to look like themselves.",
    posts: [{ code: "DAzALV0AN7f" }],
  },
];

export const postUrl = (code: string) => `https://www.instagram.com/p/${code}/`;
