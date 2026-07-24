import {
  parseEnquiry,
  sendEnquiry,
  type FieldSpec,
} from "@/lib/enquiries";

// Contact messages are personal data — never cache the response.
export const dynamic = "force-dynamic";

const FIELDS: FieldSpec[] = [
  { name: "name", label: "Name", required: true, maxLength: 120 },
  { name: "email", label: "Email", required: true, email: true, maxLength: 160 },
  { name: "subject", label: "Subject", maxLength: 160 },
  { name: "message", label: "Message", required: true, maxLength: 4000 },
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

  const text = [
    `New message via shotbygafar.com`,
    ``,
    `Name:    ${values.name}`,
    `Email:   ${values.email}`,
    `Subject: ${values.subject || "—"}`,
    ``,
    `Message:`,
    values.message,
  ].join("\n");

  const { delivered } = await sendEnquiry({
    subject: values.subject
      ? `Contact — ${values.subject} (${values.name})`
      : `Contact form — ${values.name}`,
    text,
    replyTo: values.email,
  });

  return Response.json({ ok: true, delivered });
}
