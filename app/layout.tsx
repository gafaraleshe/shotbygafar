import type { Metadata, Viewport } from "next";
import { Archivo, DM_Serif_Display, Geist_Mono, Inter } from "next/font/google";
import { MotionProvider } from "@/components/motion";
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
    <html lang="en">
      <body
        className={`${inter.variable} ${archivo.variable} ${dmSerif.variable} ${geistMono.variable}`}
      >
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
