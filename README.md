# SHOTBYGAFAR 📸

> Photography · Videography · Cinematography — capturing moments that tell
> your story. Portraits, weddings, events, and brand content across the UK.
> Part of **Gaffy Studios Ltd**.

Same index-card / graph-paper design language as
[gaffystudios.com](https://gaffystudios.com) and
[gafaraleshe.com](https://www.gafaraleshe.com), on a black canvas — tuned for
the SHOTBYGAFAR photography brand, with an embedded Instagram section for
[@shot.by.gafar](https://www.instagram.com/shot.by.gafar/).

## Pages

| Route        | Purpose                                                   |
| ------------ | --------------------------------------------------------- |
| `/`          | Home — identity, what we shoot, services, Instagram, contact |
| `/services`  | Disciplines, what we shoot, and how a shoot works         |
| `/pricing`   | Packages, add-ons, and rates (links through to booking)   |
| `/booking`   | Booking enquiry form (date, shoot type, package, details) |
| `/contact`   | Contact form + direct channels (email, phone, WhatsApp)   |
| `/portfolio` | Photography & film work (portraits, weddings, events)     |
| `/faq`       | Bookings, pricing, delivery                               |
| `/links`     | Every link — socials, booking, portfolio, parent studio   |

## Booking & contact forms

`/booking` and `/contact` post to the `/api/booking` and `/api/contact`
routes. Delivery is **best-effort and self-contained**:

- **With email configured** — set `RESEND_API_KEY` (and optionally
  `ENQUIRY_TO` / `ENQUIRY_FROM`) and enquiries are emailed via
  [Resend](https://resend.com); the visitor sees a confirmation.
- **Without it** — the route still validates and responds, and the form
  falls back to a pre-filled **mailto / WhatsApp** message so no enquiry is
  lost. Nothing is required to run the site.

| Env var          | Default                         | Purpose                    |
| ---------------- | ------------------------------- | -------------------------- |
| `RESEND_API_KEY` | —                               | Enables email delivery     |
| `ENQUIRY_TO`     | `contact@shotbygafar.com`       | Where enquiries are sent   |
| `ENQUIRY_FROM`   | `SHOTBYGAFAR <onboarding@resend.dev>` | Verified sender      |

Edit packages/rates in `app/pricing/page.tsx` and services in
`app/services/page.tsx`.

## Hermite Flow (bookings → invoices + CRM)

Booking enquiries are also forwarded to **Hermite Flow** (Gaffy Studios' CRM +
invoicing, at flow.hermitelabs.com). When configured, each booking creates a
CRM record, a client, and a draft invoice from the package price — and can email
it via Resend. Delivery is best-effort: if Hermite Flow is down, the enquiry
email still goes out. See `lib/hermite.ts`.

Manage the pipeline in-house at **`/studio`** (a read-only CRM backed by the
Hermite Flow API; the API key stays server-side behind `/api/studio`).

| Env var                 | Default | Purpose                                                    |
| ----------------------- | ------- | ---------------------------------------------------------- |
| `HERMITE_FLOW_API_URL`  | —       | Hermite Flow origin, e.g. `https://flow.hermitelabs.com`   |
| `HERMITE_FLOW_API_KEY`  | —       | Owner API key (`ifk_live_…`) from Settings → Integrations  |
| `HERMITE_FLOW_AUTO_SEND`| `false` | `true` to email the invoice on booking (else draft only)   |
| `STUDIO_TOKEN`          | —       | Access code that unlocks `/studio` (required to enable it) |

> Legacy `INVOICEFLOW_API_URL` / `INVOICEFLOW_API_KEY` are accepted as fallbacks.

## Instagram embed

The home page renders an Instagram section powered by
`components/InstagramFeed.tsx`:

- **Live embeds** — paste post / reel permalinks (e.g.
  `https://www.instagram.com/p/XXXXXXXXXXX/`) into the `POSTS` array and they
  render via Instagram's official `embed.js`.
- **Fallback grid** — while `POSTS` is empty, a branded gallery grid + follow
  CTA is shown, so the section never looks empty.

## Tech Stack

| Layer      | Tool                      |
| ---------- | ------------------------- |
| Framework  | Next.js 16 (App Router)   |
| Styling    | Tailwind CSS v4           |
| Animation  | Framer Motion             |
| Icons      | lucide-react + inline SVG |
| Deployment | Vercel                    |

## Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

This repo ships a `vercel.json` (framework `nextjs`). To deploy:

1. Push this branch to GitHub.
2. In [Vercel](https://vercel.com/new), import `gafaraleshe/shotbygafar`.
3. Framework preset auto-detects **Next.js** — no extra config needed.
4. Deploy, then point the `shotbygafar.com` domain at the project.

Or from the CLI:

```bash
npx vercel        # preview
npx vercel --prod # production
```

## Contact

- Email: contact@shotbygafar.com
- Phone / WhatsApp: +44 788 265 5541
- Instagram: [@shot.by.gafar](https://www.instagram.com/shot.by.gafar/)
