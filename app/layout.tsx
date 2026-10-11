import type { Metadata, Viewport } from "next";
import {
  Archivo,
  Caveat,
  DM_Serif_Display,
  Geist,
  Geist_Mono,
  Inter,
} from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

// Body sans, after pysavant.cv (Geist + Geist Mono), as on gafaraleshe.com.
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

// Handwriting for the margin notes ("booking now").
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-caveat",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SHOTBYGAFAR — Photography · Videography · Cinematography",
  description:
    "SHOTBYGAFAR — professional photography, videography, and cinematography in the UK. Capturing moments that tell your story: portraits, weddings, events, and brand content. Part of Gaffy Studios Ltd.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "SHOTBYGAFAR — Photography · Videography · Cinematography",
    description:
      "Capturing moments that tell your story. Portraits, weddings, events, and brand content across the UK.",
    type: "website",
  },
  metadataBase: new URL("https://shotbygafar.com"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // next-themes sets the theme class on <html> before hydration.
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${archivo.variable} ${dmSerif.variable} ${geist.variable} ${caveat.variable} ${geistMono.variable}`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
