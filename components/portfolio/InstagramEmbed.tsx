"use client";

/*
 * A captioned Instagram post, embedded the way Instagram's embed.js does it
 * (an iframe on /p/<code>/embed/captioned/) but without the script, so the
 * card can sit in our own layouts and the fullscreen viewer. The iframe
 * reports its height with postMessage ({type: "MEASURE", details: {height}})
 * and we size it from that; until then a placeholder holds the space.
 *
 * The iframe needs the page's origin in its URL (rd), so it renders after
 * mount. Instagram draws the card in white whatever the site theme is.
 */

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { InstagramGlyph } from "@/components/BrandIcons";

const IG_ORIGIN = /^https:\/\/([\w-]+\.)*instagram\.com$/;
const noop = () => () => {};

export function InstagramEmbed({
  code,
  width = 480,
  lazy = true,
  className = "",
}: {
  code: string;
  /** Approximate rendered width, so Instagram picks a sensible image size. */
  width?: number;
  lazy?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState<number | null>(null);
  const mounted = useSyncExternalStore(
    noop,
    () => true,
    () => false
  );

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (!IG_ORIGIN.test(e.origin)) return;
      if (e.source !== ref.current?.contentWindow) return;
      let msg: { type?: string; details?: { height?: number } } | null = null;
      try {
        msg = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
      } catch {
        return;
      }
      const h = msg?.details?.height;
      if ((msg?.type === "MEASURE" || msg?.type === "MOUNTED") && h) {
        setHeight(h);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const src = mounted
    ? `https://www.instagram.com/p/${code}/embed/captioned/?cr=1&v=14&wp=${Math.round(
        width
      )}&rd=${encodeURIComponent(window.location.origin)}&rp=${encodeURIComponent(
        window.location.pathname
      )}`
    : undefined;

  return (
    <div
      className={`relative w-full overflow-hidden rounded-lg bg-white ${className}`}
    >
      {height === null && (
        <div
          aria-hidden
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-neutral-900 text-white/40"
        >
          <span className="animate-pulse">
            <InstagramGlyph size={22} />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
            Loading post
          </span>
        </div>
      )}
      {src && (
        <iframe
          ref={ref}
          src={src}
          title={`Instagram post ${code}`}
          loading={lazy ? "lazy" : "eager"}
          scrolling="no"
          allowFullScreen
          className="block w-full border-0"
          style={{ height: height ?? 620 }}
        />
      )}
      {!src && <div style={{ height: 620 }} />}
    </div>
  );
}
