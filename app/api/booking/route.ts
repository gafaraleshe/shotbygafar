import {
  parseEnquiry,
  sendEnquiry,
  type FieldSpec,
} from "@/lib/enquiries";
import { createHermiteBooking } from "@/lib/hermite";

// Booking enquiries are personal data — never cache the response.
export const dynamic = "force-dynamic";

const FIELDS: FieldSpec[] = [
  { name: "name", label: "Name", required: true, maxLength: 120 },
  { name: "email", label: "Email", required: true, email: true, maxLength: 160 },
  { name: "phone", label: "Phone", maxLength: 40 },
  { name: "shootType", label: "Shoot type", required: true, maxLength: 80 },
  { name: "package", label: "Package", maxLength: 80 },
  { name: "date", label: "Preferred date", maxLength: 40 },
  { name: "location", label: "Location", maxLength: 160 },
  { name: "message", label: "Details", maxLength: 4000 },
];

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const { values, errors } = parseEnquiry(body, FIELDS);
  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  const lines = [
    `New booking enquiry — SHOTBYGAFAR`,
    ``,
    `Name:      ${values.name}`,
    `Email:     ${values.email}`,
    `Phone:     ${values.phone || "—"}`,
    `Shoot:     ${values.shootType}`,
    `Package:   ${values.package || "—"}`,
    `Date:      ${values.date || "—"}`,
    `Location:  ${values.location || "—"}`,
    ``,
    `Details:`,
    values.message || "—",
  ];
  const text = lines.join("\n");

  // Fire the enquiry email and the Hermite Flow CRM/invoice sync together. Hermite Flow is
  // best-effort — a booking is never lost if the billing backend is down.
  const [{ delivered }, hermite] = await Promise.all([
    sendEnquiry({
      subject: `Booking enquiry — ${values.shootType} (${values.name})`,
      text,
      replyTo: values.email,
    }),
    createHermiteBooking({
      name: values.name,
      email: values.email,
      phone: values.phone,
      shootType: values.shootType,
      package: values.package,
      date: values.date,
      location: values.location,
      message: values.message,
    }),
  ]);

  return Response.json({
    ok: true,
    delivered,
    // Surface (non-sensitive) CRM outcome for observability.
    booked: hermite.ok,
    invoiced: Boolean(hermite.invoiceNumber),
  });
}
