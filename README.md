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
| `/portfolio` | Photography & film work (portraits, weddings, events)     |
| `/faq`       | Bookings, pricing, delivery                               |
| `/links`     | Every link — socials, booking, portfolio, parent studio   |

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
