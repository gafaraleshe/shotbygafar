import type { Metadata } from "next";
import { PortfolioView } from "./PortfolioView";

export const metadata: Metadata = {
  title: "Portfolio — SHOTBYGAFAR",
  description:
    "Concert, event, birthday, football, lifestyle, nightlife and brand photography by SHOTBYGAFAR.",
};

export default function PortfolioPage() {
  return <PortfolioView />;
}
