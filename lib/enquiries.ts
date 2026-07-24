/*
 * Enquiry delivery + validation shared by the /api/booking and /api/contact
 * routes.
 *
 * Delivery is best-effort and self-contained: if a RESEND_API_KEY is present
 * in the environment the enquiry is emailed via Resend's HTTP API (no SDK
 * dependency). When no key is configured — e.g. a fresh preview deploy — the
 * route still validates and responds `delivered: false`, and the client falls
 * back to a pre-filled mailto so an enquiry is never silently lost.
 *
 * Env vars (all optional):
 *   RESEND_API_KEY   — enables email delivery
 *   ENQUIRY_TO       — recipient (default contact@shotbygafar.com)
 *   ENQUIRY_FROM     — verified sender (default onboarding@resend.dev)
 */

export const ENQUIRY_TO =
  process.env.ENQUIRY_TO || "contact@shotbygafar.com";

const ENQUIRY_FROM =
  process.env.ENQUIRY_FROM || "SHOTBYGAFAR <onboarding@resend.dev>";

export type FieldSpec = {
  name: string;
  label: string;
  required?: boolean;
  email?: boolean;
  maxLength?: number;
};

export type ParsedEnquiry = {
  values: Record<string, string>;
  errors: Record<string, string>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Validate + normalise an incoming JSON body against a field spec. */
export function parseEnquiry(
  body: unknown,
  fields: FieldSpec[],
): ParsedEnquiry {
  const values: Record<string, string> = {};
  const errors: Record<string, string> = {};
  const src = (body && typeof body === "object" ? body : {}) as Record<
    string,
    unknown
  >;

  for (const f of fields) {
    const raw = src[f.name];
    const value = typeof raw === "string" ? raw.trim() : "";

    if (f.required && !value) {
      errors[f.name] = `${f.label} is required.`;
      continue;
    }
    if (value && f.maxLength && value.length > f.maxLength) {
      errors[f.name] = `${f.label} is too long.`;
      continue;
    }
    if (value && f.email && !EMAIL_RE.test(value)) {
      errors[f.name] = `Please enter a valid email address.`;
      continue;
    }
    values[f.name] = value;
  }

  return { values, errors };
}

/**
 * Send an enquiry email if delivery is configured.
 * Returns `{ delivered: true }` on a successful send, otherwise
 * `{ delivered: false }` (with an optional reason) so the caller can respond
 * honestly and the client can fall back to mailto.
 */
export async function sendEnquiry(input: {
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<{ delivered: boolean; reason?: string }> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { delivered: false, reason: "email-not-configured" };

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: ENQUIRY_FROM,
        to: [ENQUIRY_TO],
        subject: input.subject,
        text: input.text,
        ...(input.replyTo ? { reply_to: input.replyTo } : {}),
      }),
    });

    if (!res.ok) {
      return { delivered: false, reason: `resend-${res.status}` };
    }
    return { delivered: true };
  } catch {
    return { delivered: false, reason: "send-failed" };
  }
}
