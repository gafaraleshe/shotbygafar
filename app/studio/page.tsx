"use client";

/*
 * Studio — SHOTBYGAFAR's booking CRM, backed by Hermite Flow.
 *
 * A lightweight admin view of the booking pipeline. It never holds the Hermite
 * Flow API key: it calls the server proxy at /api/studio with a STUDIO_TOKEN
 * (entered once, kept in localStorage). Full invoicing/CRM management lives in
 * Hermite Flow itself (flow.hermitelabs.com).
 */

import { useCallback, useEffect, useState } from "react";
import { CalendarCheck, RefreshCw, Lock, ArrowUpRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { Input, Label } from "@/components/FormControls";

const DOTTED = {
  backgroundImage: "radial-gradient(var(--paper-dot) 1px, transparent 1px)",
  backgroundSize: "16px 16px",
} as const;

const STATUSES = [
  "all",
  "new",
  "contacted",
  "quoted",
  "confirmed",
  "completed",
  "cancelled",
] as const;
type StatusFilter = (typeof STATUSES)[number];

type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  serviceType: string | null;
  packageName: string | null;
  eventDate: string | null;
  amount: string | null;
  currency: string;
  status: string;
  source: string;
  invoiceId: string | null;
  createdAt: string;
};

type Stats = {
  total?: number;
  newCount?: number;
  confirmedCount?: number;
  pipelineValue?: number;
};

const TOKEN_KEY = "sbg-studio-token";

function money(v: string | null, currency = "GBP") {
  if (!v) return "—";
  const n = parseFloat(v);
  if (Number.isNaN(n)) return "—";
  return new Intl.NumberFormat("en-GB", { style: "currency", currency }).format(n);
}

function statusColor(s: string): string {
  const map: Record<string, string> = {
    new: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-400/15 dark:text-blue-300 dark:border-blue-400/30",
    contacted: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-400/15 dark:text-amber-300 dark:border-amber-400/30",
    quoted: "bg-violet-100 text-violet-800 border-violet-300 dark:bg-violet-400/15 dark:text-violet-300 dark:border-violet-400/30",
    confirmed: "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-400/15 dark:text-emerald-300 dark:border-emerald-400/30",
    completed: "bg-ink text-paper border-ink",
    cancelled: "bg-ink/5 text-ink-muted border-ink/20 line-through",
  };
  return map[s] ?? "bg-ink/5 text-ink-soft border-ink/20";
}

export default function Studio() {
  const [token, setToken] = useState("");
  const [authed, setAuthed] = useState(false);
  const [status, setStatus] = useState<StatusFilter>("all");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Restore a saved token on mount.
  useEffect(() => {
    const saved = localStorage.getItem(TOKEN_KEY);
    if (saved) {
      setToken(saved);
      setAuthed(true);
    }
  }, []);

  const load = useCallback(
    async (tok: string, statusFilter: StatusFilter) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/studio?status=${statusFilter}`, {
          headers: { "x-studio-token": tok },
          cache: "no-store",
        });
        const data = await res.json().catch(() => ({}));
        if (res.status === 401) {
          setError("That access code didn't work.");
          setAuthed(false);
          localStorage.removeItem(TOKEN_KEY);
          return;
        }
        if (!res.ok || !data.ok) {
          setError(data.error || "Couldn't load bookings.");
          return;
        }
        setBookings(data.bookings ?? []);
        setStats(data.stats ?? null);
        localStorage.setItem(TOKEN_KEY, tok);
        setAuthed(true);
      } catch {
        setError("Network error — try again.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Reload when authed or the filter changes.
  useEffect(() => {
    if (authed && token) load(token, status);
  }, [authed, status, token, load]);

  return (
    <div className="min-h-screen px-4 py-6 sm:px-8 sm:py-8">
      <SiteHeader />

      <main className="mx-auto max-w-5xl pb-14">
        {/* Hero */}
        <section
          className="relative rounded-md border border-ink/10 bg-paper px-6 py-8 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.55)] sm:px-10 sm:py-10"
          style={DOTTED}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-muted">
            Studio:
          </p>
          <h1 className="mt-1 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-ink sm:text-5xl">
            Booking CRM
          </h1>
          <p className="mt-4 max-w-md font-mono text-[13px] leading-relaxed text-ink-soft">
            Every enquiry, quote and confirmed shoot — synced from Hermite Flow.
          </p>
          <a
            href="https://flow.hermitelabs.com"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-1 font-mono text-[11px] font-semibold uppercase tracking-wide text-ink underline decoration-ink-faint underline-offset-4"
          >
            Manage in Hermite Flow
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </section>

        {!authed ? (
          <section
            className="relative mt-4 rounded-md border border-ink/10 bg-paper px-6 py-8 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.45)] sm:px-8"
            style={DOTTED}
          >
            <div className="mx-auto max-w-sm text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper">
                <Lock className="h-6 w-6" />
              </span>
              <h2 className="mt-4 font-display text-2xl font-extrabold uppercase tracking-tight text-ink">
                Studio access
              </h2>
              <p className="mx-auto mt-2 font-mono text-[12px] leading-relaxed text-ink-dim">
                Enter your studio access code to view bookings.
              </p>
              <form
                className="mt-5 text-left"
                onSubmit={e => {
                  e.preventDefault();
                  if (token.trim()) load(token.trim(), status);
                }}
              >
                <Label htmlFor="token">Access code</Label>
                <Input
                  id="token"
                  type="password"
                  value={token}
                  onChange={e => setToken(e.target.value)}
                  placeholder="STUDIO_TOKEN"
                />
                {error ? (
                  <p className="mt-2 font-mono text-[11px] text-red-600 dark:text-red-400">{error}</p>
                ) : null}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 w-full rounded-md bg-ink px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-paper transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {loading ? "Checking…" : "Unlock"}
                </button>
              </form>
            </div>
          </section>
        ) : (
          <>
            {/* Stats */}
            <section className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Total", value: String(stats?.total ?? 0) },
                { label: "New", value: String(stats?.newCount ?? 0) },
                { label: "Confirmed", value: String(stats?.confirmedCount ?? 0) },
                {
                  label: "Pipeline",
                  value: money(String(stats?.pipelineValue ?? 0)),
                },
              ].map(s => (
                <div
                  key={s.label}
                  className="rounded-md border border-ink/10 bg-paper p-4"
                  style={DOTTED}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                    {s.label}
                  </p>
                  <p className="mt-1 font-display text-2xl font-extrabold text-ink">
                    {s.value}
                  </p>
                </div>
              ))}
            </section>

            {/* Filters */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {STATUSES.map(s => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`rounded-full border px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide transition-colors ${
                    status === s
                      ? "border-ink bg-ink text-paper"
                      : "border-ink/20 bg-tile text-ink-soft hover:bg-tile-hover"
                  }`}
                >
                  {s}
                </button>
              ))}
              <button
                onClick={() => load(token, status)}
                className="ml-auto inline-flex items-center gap-1.5 rounded-md border border-ink/20 bg-tile px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-ink hover:bg-tile-hover"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </button>
            </div>

            {/* Table */}
            <section
              className="relative mt-4 overflow-hidden rounded-md border border-ink/10 bg-paper"
              style={DOTTED}
            >
              {error ? (
                <p className="p-6 text-center font-mono text-[12px] text-red-600 dark:text-red-400">
                  {error}
                </p>
              ) : bookings.length === 0 ? (
                <div className="py-14 text-center text-ink-muted">
                  <CalendarCheck className="mx-auto mb-3 h-9 w-9 opacity-40" />
                  <p className="font-mono text-[12px] uppercase tracking-wide">
                    {loading ? "Loading…" : "No bookings yet"}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-ink/10 bg-white/40">
                        {["Customer", "Service", "Date", "Amount", "Status"].map(
                          h => (
                            <th
                              key={h}
                              className="px-4 py-3 text-left font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-muted"
                            >
                              {h}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map(b => (
                        <tr
                          key={b.id}
                          className="border-b border-ink/5 last:border-0"
                        >
                          <td className="px-4 py-3">
                            <p className="font-mono text-[13px] font-semibold text-ink">
                              {b.name}
                            </p>
                            <p className="font-mono text-[11px] text-ink-muted">
                              {b.email}
                            </p>
                          </td>
                          <td className="px-4 py-3 font-mono text-[12px] text-ink-soft">
                            {b.packageName || b.serviceType || "—"}
                          </td>
                          <td className="px-4 py-3 font-mono text-[12px] text-ink-dim">
                            {b.eventDate || "—"}
                          </td>
                          <td className="px-4 py-3 font-mono text-[12px] text-ink">
                            {money(b.amount, b.currency)}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-block rounded border px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide ${statusColor(
                                b.status
                              )}`}
                            >
                              {b.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}

        <SiteFooter />
      </main>
    </div>
  );
}
