import type { Metadata } from "next";
import { fetchPostsByShortcode } from "@/lib/instagram";
import { portfolio } from "@/lib/portfolio";
import { PortfolioView } from "./PortfolioView";

export const metadata: Metadata = {
  title: "Portfolio — SHOTBYGAFAR",
  description:
    "Concert, event, birthday, football, lifestyle, nightlife and brand photography by SHOTBYGAFAR.",
};

// Slides pulled from the Graph API are cached for an hour, like the feed.
export const revalidate = 3600;

export default async function PortfolioPage() {
  const media = await fetchPostsByShortcode(
    portfolio.flatMap(c => c.posts.map(p => p.code))
  );
  return <PortfolioView media={media} />;
}
