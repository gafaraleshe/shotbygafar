"use client";

/*
 * Newsletter sign-up for the shop: an inline form and a popup, in the
 * sheet's style (theme tokens, so both themes work). The popup waits for a
 * sign of interest — a few seconds on the page, scrolling past the first
 * products, or (on desktop) the pointer heading for the tab bar. Closing
 * it snoozes it for a month and subscribing anywhere retires it for good
 * (lib/newsletter.ts). Escape, the close button or a click outside closes
 * it; focus moves in and comes back afterwards.
 */

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import { shouldPrompt, snooze, subscribe } from "@/lib/newsletter";

const DELAY_MS = 6000;
const SCROLL_SHARE = 0.45;
const PHOTO = "/portfolio/DA9VxJfgMkl/03-sm.webp";

type Status = "idle" | "loading" | "done" | "error";

function SignupForm({
  onDone,
  inputRef,
}: {
  onDone?: () => void;
  inputRef?: React.Ref<HTMLInputElement>;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    const result = await subscribe(email);
    if (result.ok) {
      setStatus("done");
      onDone?.();
    } else {
      setStatus("error");
      setMessage(result.error);
    }
  }

  if (status === "done") {
    return (
      <p className="flex items-center gap-2 text-[14px] text-emerald-700 dark:text-emerald-400">
        <Check className="h-4 w-4" />
        You&apos;re on the list. Check your inbox.
      </p>
    );
  }

  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row">
        <input
          ref={inputRef}
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          aria-label="Email address"
          className="min-w-0 flex-1 rounded-lg border border-ink/15 bg-tile px-3 py-2 text-[14px] text-ink outline-none placeholder:text-ink-faint focus:border-ink/40"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="flex items-center justify-center gap-1.5 rounded-lg bg-ink px-3.5 py-2 text-[14px] font-medium text-paper transition-opacity hover:opacity-85 disabled:opacity-60"
        >
          {status === "loading" ? "Joining…" : "Subscribe"}
          <ArrowRight className="h-[15px] w-[15px]" />
        </button>
      </form>
      {status === "error" && (
        <p className="mt-2 text-[13px] text-red-600 dark:text-red-400">
          {message}
        </p>
      )}
    </>
  );
}

export function NewsletterInline() {
  return (
    <div>
      <p className="mb-3 text-[14px] leading-relaxed text-ink-dim sm:text-[14.5px]">
        New LUTs and presets the day they land, plus the odd
        behind-the-scenes. No spam — unsubscribe any time.
      </p>
      <SignupForm />
    </div>
  );
}

export function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const shown = useRef(false);

  // Arm the triggers once, unless this visitor has subscribed or snoozed.
  useEffect(() => {
    if (!shouldPrompt()) return;
    const show = () => {
      if (shown.current) return;
      shown.current = true;
      setOpen(true);
      cleanup();
    };
    const timer = window.setTimeout(show, DELAY_MS);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max > SCROLL_SHARE) show();
    };
    // Pointer leaving through the top edge: heading for the tabs.
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget) show();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseout", onLeave);
    function cleanup() {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onLeave);
    }
    return cleanup;
  }, []);

  // While open: Escape closes, focus moves in and comes back on close.
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const raf = requestAnimationFrame(() => inputRef.current?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      previous?.focus?.();
    };
    // close only sets state and storage.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function close() {
    if (!done) snooze();
    setOpen(false);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="newsletter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onMouseDown={e => {
            if (e.target === e.currentTarget) close();
          }}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/65 p-3 backdrop-blur-sm sm:items-center sm:p-6"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="newsletter-title"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
            className="relative grid w-full max-w-[720px] overflow-hidden rounded-xl border border-ink/10 bg-paper text-ink shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] sm:grid-cols-[0.9fr_1.1fr]"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full border border-ink/15 bg-tile text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              <X className="h-4 w-4" />
            </button>

            {/* A frame from the portfolio, with a strip of film along it. */}
            <div className="relative hidden min-h-[360px] bg-black sm:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PHOTO}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span
                aria-hidden
                className="absolute inset-y-0 right-2 w-2.5 opacity-70"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(180deg, transparent 0 8px, rgb(0 0 0 / 0.85) 8px 16px, transparent 16px 22px)",
                }}
              />
              <span className="absolute bottom-4 left-4 font-hand text-[24px] leading-none text-white/90">
                new drops ✶
              </span>
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-8">
              <p className="font-mono text-[11.5px] tracking-[0.02em] text-ink-faint">
                Newsletter
              </p>
              <h2
                id="newsletter-title"
                className="mt-1 pr-8 text-[24px] font-medium tracking-[-0.02em] text-ink"
              >
                Get new drops first
              </h2>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-dim">
                New LUTs and presets the day they land, plus the odd
                behind-the-scenes from shoots. No spam — unsubscribe any time.
              </p>
              <div className="mt-5">
                <SignupForm
                  inputRef={inputRef}
                  onDone={() => {
                    setDone(true);
                    window.setTimeout(() => setOpen(false), 2800);
                  }}
                />
              </div>
              <button
                type="button"
                onClick={close}
                className="mt-4 self-start text-[12.5px] text-ink-faint underline-offset-2 hover:underline"
              >
                Not now
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
