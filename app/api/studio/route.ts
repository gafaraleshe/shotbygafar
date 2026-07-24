/*
 * Studio CRM proxy.
 *
 * Reads the booking pipeline back from Hermite Flow for the /studio admin page. The
 * Hermite Flow API key never reaches the browser — this route holds it and gates
 * access with STUDIO_TOKEN (sent as `x-studio-token`).
 *
 * Env:
 *   STUDIO_TOKEN   shared secret to view the CRM (required to enable /studio)
 *   HERMITE_FLOW_API_URL / HERMITE_FLOW_API_KEY   (see lib/hermite.ts)
 */
import { listHermiteBookings, hermiteBookingStats, hermiteConfigured } from "@/lib/hermite";

export const dynamic = "force-dynamic";

function authorized(request: Request): boolean {
  const expected = process.env.STUDIO_TOKEN;
  if (!expected) return false; // CRM disabled until a token is set
  const provided =
    request.headers.get("x-studio-token") ||
    new URL(request.url).searchParams.get("token");
  return provided === expected;
}

export async function GET(request: Request) {
  if (!process.env.STUDIO_TOKEN) {
    return Response.json(
      { ok: false, error: "Studio is not configured (set STUDIO_TOKEN)." },
      { status: 503 }
    );
  }
  if (!authorized(request)) {
    return Response.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }
  if (!hermiteConfigured()) {
    return Response.json(
      { ok: false, error: "Hermite Flow is not connected (set HERMITE_FLOW_API_URL/KEY)." },
      { status: 503 }
    );
  }

  const url = new URL(request.url);
  const status = url.searchParams.get("status") || "all";
  const search = url.searchParams.get("search") || undefined;

  const [bookings, stats] = await Promise.all([
    listHermiteBookings({ status, search }),
    hermiteBookingStats(),
  ]);

  if (!bookings) {
    return Response.json(
      { ok: false, error: "Couldn't reach Hermite Flow." },
      { status: 502 }
    );
  }

  return Response.json({
    ok: true,
    bookings: bookings.data ?? [],
    total: bookings.total ?? 0,
    stats: stats ?? null,
  });
}
