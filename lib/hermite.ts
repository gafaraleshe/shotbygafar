/*
 * Hermite Flow integration for SHOTBYGAFAR.
 *
 * Hermite Flow (by Gaffy Studios) is the invoicing/CRM backend. When someone books a
 * shoot, we forward the enquiry to Hermite Flow's public REST API, which:
 *   1. records a booking in the CRM,
 *   2. creates/reuses a client, and
 *   3. (optionally) raises a draft invoice from the package price and emails it
 *      via Resend.
 *
 * Delivery is best-effort and never blocks the booking response — if Hermite Flow is
 * unreachable or unconfigured, the enquiry email still goes out.
 *
 * Env (all optional — integration is skipped if the first two are absent):
 *   HERMITE_FLOW_API_URL     Hermite Flow site origin, e.g. https://flow.hermitelabs.com
 *   HERMITE_FLOW_API_KEY     owner API key (ifk_live_…) from Settings → Integrations
 *   HERMITE_FLOW_AUTO_SEND   "true" to also EMAIL the invoice on booking (default: off —
 *                     a draft is created and you send it from the CRM once the
 *                     shoot is confirmed).
 *
 * Legacy INVOICEFLOW_API_URL / INVOICEFLOW_API_KEY are accepted as fallbacks.
 */

const HERMITE_FLOW_API_URL =
  process.env.HERMITE_FLOW_API_URL || process.env.INVOICEFLOW_API_URL || "";
const HERMITE_FLOW_API_KEY =
  process.env.HERMITE_FLOW_API_KEY || process.env.INVOICEFLOW_API_KEY || "";
const AUTO_SEND = process.env.HERMITE_FLOW_AUTO_SEND === "true";

/** Starting prices (£, ex-VAT) per package — mirrors /pricing. */
export const PACKAGE_PRICES: Record<string, number> = {
  "Portrait Session": 150,
  "Event Coverage": 450,
  "Wedding Film & Photo": 1200,
  "Brand Content": 350,
};

/** Fall back to a sensible base price by shoot type when no package is chosen. */
const SHOOT_TYPE_PRICES: Record<string, number> = {
  Portraits: 150,
  Wedding: 1200,
  Event: 450,
  "Brand Content": 350,
};

export function hermiteConfigured(): boolean {
  return Boolean(HERMITE_FLOW_API_URL && HERMITE_FLOW_API_KEY);
}

function apiBase(): string {
  const trimmed = HERMITE_FLOW_API_URL.replace(/\/+$/, "");
  return trimmed.endsWith("/api/v1") ? trimmed : `${trimmed}/api/v1`;
}

export type BookingEnquiry = {
  name: string;
  email: string;
  phone?: string;
  shootType?: string;
  package?: string;
  date?: string;
  location?: string;
  message?: string;
};

export type HermiteBookingResult = {
  ok: boolean;
  invoiceNumber?: string;
  emailed?: boolean;
  reason?: string;
};

/** Resolve the quoted amount for an enquiry, if we can. */
export function quoteFor(enquiry: BookingEnquiry): number | undefined {
  if (enquiry.package && PACKAGE_PRICES[enquiry.package] != null) {
    return PACKAGE_PRICES[enquiry.package];
  }
  if (enquiry.shootType && SHOOT_TYPE_PRICES[enquiry.shootType] != null) {
    return SHOOT_TYPE_PRICES[enquiry.shootType];
  }
  return undefined;
}

/**
 * Forward a booking enquiry to Hermite Flow. Best-effort: returns `{ ok: false, reason }`
 * on any failure rather than throwing, so the caller can respond regardless.
 */
export async function createHermiteBooking(
  enquiry: BookingEnquiry
): Promise<HermiteBookingResult> {
  if (!hermiteConfigured()) return { ok: false, reason: "not-configured" };

  const amount = quoteFor(enquiry);
  const payload = {
    name: enquiry.name,
    email: enquiry.email,
    phone: enquiry.phone || undefined,
    service_type: enquiry.shootType || undefined,
    package: enquiry.package || undefined,
    date: enquiry.date || undefined,
    location: enquiry.location || undefined,
    message: enquiry.message || undefined,
    amount,
    source: "shotbygafar",
    // Always capture the booking + a draft invoice when we have a price.
    auto_invoice: amount != null,
    // Only email the invoice automatically when explicitly enabled.
    auto_send: AUTO_SEND && amount != null,
  };

  try {
    const res = await fetch(`${apiBase()}/bookings`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HERMITE_FLOW_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { ok: false, reason: `hermite-${res.status}` };
    const data = (await res.json().catch(() => ({}))) as {
      invoice?: { number?: string } | null;
      emailed?: boolean;
    };
    return {
      ok: true,
      invoiceNumber: data.invoice?.number,
      emailed: data.emailed,
    };
  } catch {
    return { ok: false, reason: "request-failed" };
  }
}

/** Read the booking pipeline back for the studio CRM (server-side only). */
export async function listHermiteBookings(params?: {
  status?: string;
  search?: string;
}): Promise<{ data: unknown[]; total: number } | null> {
  if (!hermiteConfigured()) return null;
  const qs = new URLSearchParams({ limit: "100" });
  if (params?.status && params.status !== "all") qs.set("status", params.status);
  if (params?.search) qs.set("search", params.search);
  try {
    const res = await fetch(`${apiBase()}/bookings?${qs.toString()}`, {
      headers: { Authorization: `Bearer ${HERMITE_FLOW_API_KEY}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as { data: unknown[]; total: number };
  } catch {
    return null;
  }
}

export async function hermiteBookingStats(): Promise<Record<
  string,
  number
> | null> {
  if (!hermiteConfigured()) return null;
  try {
    const res = await fetch(`${apiBase()}/bookings/stats`, {
      headers: { Authorization: `Bearer ${HERMITE_FLOW_API_KEY}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as Record<string, number>;
  } catch {
    return null;
  }
}
