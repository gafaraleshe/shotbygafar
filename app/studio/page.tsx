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
  backgroundImage: "radial-gradient(rgba(0,0,0,0.07) 1px, transparent 1px)",
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
    new: "bg-blue-100 text-blue-800 border-blue-300",
    contacted: "bg-amber-100 text-amber-800 border-amber-300",
    quoted: "bg-violet-100 text-violet-800 border-violet-300",
    confirmed: "bg-emerald-100 text-emerald-800 border-emerald-300",
    completed: "bg-neutral-900 text-white border-neutral-900",
    cancelled: "bg-neutral-100 text-neutral-500 border-neutral-300 line-through",
  };
  return map[s] ?? "bg-neutral-100 text-neutral-700 border-neutral-300";
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
          className="relative rounded-md border border-neutral-900/10 bg-[#f4f3ec] px-6 py-8 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.55)] sm:px-10 sm:py-10"
          style={DOTTED}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
            Studio:
          </p>
          <h1 className="mt-1 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-neutral-900 sm:text-5xl">
            Booking CRM
          </h1>
          <p className="mt-4 max-w-md font-mono text-[13px] leading-relaxed text-neutral-700">
            Every enquiry, quote and confirmed shoot — synced from Hermite Flow.
          </p>
          <a
            href="https://flow.hermitelabs.com"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-1 font-mono text-[11px] font-semibold uppercase tracking-wide text-neutral-900 underline decoration-neutral-400 underline-offset-4"
          >
            Manage in Hermite Flow
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </section>

        {!authed ? (
          <section
            className="relative mt-4 rounded-md border border-neutral-900/10 bg-[#f4f3ec] px-6 py-8 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.45)] sm:px-8"
            style={DOTTED}
          >
            <div className="mx-auto max-w-sm text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-white">
                <Lock className="h-6 w-6" />
              </span>
              <h2 className="mt-4 font-display text-2xl font-extrabold uppercase tracking-tight text-neutral-900">
                Studio access
              </h2>
              <p className="mx-auto mt-2 font-mono text-[12px] leading-relaxed text-neutral-600">
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
                  <p className="mt-2 font-mono text-[11px] text-red-600">{error}</p>
                ) : null}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 w-full rounded-md bg-neutral-900 px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90 disabled:opacity-60"
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
                  className="rounded-md border border-neutral-900/10 bg-[#f4f3ec] p-4"
                  style={DOTTED}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                    {s.label}
                  </p>
                  <p className="mt-1 font-display text-2xl font-extrabold text-neutral-900">
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
                      ? "border-neutral-900 bg-neutral-900 text-white"
                      : "border-neutral-900/20 bg-white text-neutral-700 hover:bg-neutral-50"
                  }`}
                >
                  {s}
                </button>
              ))}
              <button
                onClick={() => load(token, status)}
                className="ml-auto inline-flex items-center gap-1.5 rounded-md border border-neutral-900/20 bg-white px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-neutral-900 hover:bg-neutral-50"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </button>
            </div>

            {/* Table */}
            <section
              className="relative mt-4 overflow-hidden rounded-md border border-neutral-900/10 bg-[#f4f3ec]"
              style={DOTTED}
            >
              {error ? (
                <p className="p-6 text-center font-mono text-[12px] text-red-600">
                  {error}
                </p>
              ) : bookings.length === 0 ? (
                <div className="py-14 text-center text-neutral-500">
                  <CalendarCheck className="mx-auto mb-3 h-9 w-9 opacity-40" />
                  <p className="font-mono text-[12px] uppercase tracking-wide">
                    {loading ? "Loading…" : "No bookings yet"}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-neutral-900/10 bg-white/40">
                        {["Customer", "Service", "Date", "Amount", "Status"].map(
                          h => (
                            <th
                              key={h}
                              className="px-4 py-3 text-left font-mono text-[10px] font-semibold uppercase tracking-wider text-neutral-500"
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
                          className="border-b border-neutral-900/5 last:border-0"
                        >
                          <td className="px-4 py-3">
                            <p className="font-mono text-[13px] font-semibold text-neutral-900">
                              {b.name}
                            </p>
                            <p className="font-mono text-[11px] text-neutral-500">
                              {b.email}
                            </p>
                          </td>
                          <td className="px-4 py-3 font-mono text-[12px] text-neutral-700">
                            {b.packageName || b.serviceType || "—"}
                          </td>
                          <td className="px-4 py-3 font-mono text-[12px] text-neutral-600">
                            {b.eventDate || "—"}
                          </td>
                          <td className="px-4 py-3 font-mono text-[12px] text-neutral-900">
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
