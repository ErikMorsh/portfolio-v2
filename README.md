# Portfolio — Erfan Morshedzadeh

Personal front-end developer portfolio built with **Next.js App Router**, **React**, **MUI**, and **Motion**. Includes a bilingual public site (Persian / English), resume viewer, contact form with spam protection, and a private admin inbox for messages.

Designed for deployment on [Vercel](https://vercel.com).

---

## Features

### Public site

| Route | Description |
|-------|-------------|
| `/` | Full portfolio: hero, about, skills, projects, experience, contact |
| `/jobs` | Work experience list |
| `/resume` | In-browser resume viewer with download |
| `/resume-file` | Streams the PDF (`public/resume.pdf`) as a download-friendly route |

**Home sections**

- **Hero** — portrait, typed taglines, stats, sticky nav, scroll indicator
- **About** — bio card + location map (Leaflet)
- **Skills** — skill showcase grid
- **Projects** — project cards with tech icons and links
- **Experience** — career timeline
- **Contact** — contact info + form (validated, rate-limited, honeypot, optional reCAPTCHA)

### Admin panel

| Route | Description |
|-------|-------------|
| `/admin/login` | Credentials login (single admin) |
| `/admin/messages` | Contact-message inbox |
| `/admin/messages/[id]` | Message detail (mark read / unread, delete) |

Unauthenticated visitors to `/admin/*` are redirected to login. Admin routes are `noindex`.

---

## Tech stack

| Area | Libraries |
|------|-----------|
| Framework | Next.js 15 (App Router), React 19, TypeScript |
| UI | MUI 9, Emotion, Sass, `@mui/icons-material`, `react-icons` |
| Motion | Motion (Framer Motion successor), `react-type-animation` |
| i18n | i18next, react-i18next (fa / en) |
| Auth | Auth.js / NextAuth v5 (Credentials), bcryptjs |
| Database | Drizzle ORM, libSQL / SQLite |
| Validation | Zod |
| Maps | Leaflet, react-leaflet |
| Analytics | Google Analytics 4 via `@next/third-parties` |
| Spam protection | Google reCAPTCHA v3 (optional) |
| Lint | Oxlint |

---

## Project structure

```
src/
  app/                 # App Router pages, API routes, SEO files
  features/
    portfolio/         # Public sections (hero, about, skills, …)
    panel/             # Admin auth + messages
  cv-data/             # Bilingual CV content + assets
  theme/               # MUI theme, light/dark CSS variables
  i18n/                # Locale config + fa/en dictionaries
  shared/              # Layout, motion, SEO helpers, analytics, styles
  db/                  # Drizzle schema, migrations, client
  layouts/             # Page shells (e.g. WelcomeLayout)
  auth.ts              # NextAuth (Node — bcrypt)
  auth.config.ts       # Edge-safe auth config for middleware
  middleware.ts        # Auth gate + guest locale cookie
public/
  favicon.svg          # Dev </> symbol favicon
  resume.pdf           # Resume PDF source
```

Path alias: `@/*` → `./src/*`

---

## Getting started

### Prerequisites

- Node.js 20+ recommended
- npm

### Install & run

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run db:push              # create / sync SQLite schema
npm run dev                  # http://localhost:3000
```

### Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Oxlint |
| `npm run db:generate` | Generate Drizzle migrations |
| `npm run db:push` | Push schema to SQLite |
| `npm run db:studio` | Drizzle Studio |

---

## Environment variables

Copy `.env.example` to `.env.local` and configure:

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | SQLite path (e.g. `file:./data/portfolio.db`) |
| `NEXT_PUBLIC_SITE_URL` | Public origin for canonical URLs, Open Graph, sitemap, robots |
| `AUTH_SECRET` | NextAuth secret |
| `AUTH_URL` | Auth base URL (e.g. `http://localhost:3000`) |
| `ADMIN_EMAIL` | Single admin email |
| `ADMIN_PASSWORD_HASH` | bcrypt hash — **escape every `$` as `\$`** so Next.js does not expand vars |
| `NEXT_PUBLIC_RECAPTCHA_ENABLED` | `true` / `false` — skip captcha locally |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA v3 site key |
| `RECAPTCHA_SECRET_KEY` | reCAPTCHA v3 secret |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 ID (`G-…`); loaded only in production |

Generate a password hash:

```bash
node -e "require('bcryptjs').hash('your-password',10).then(h => console.log(h.replaceAll('$', '\\$')))"
```

---

## Internationalization (fa / en)

- Default locale: **Persian (`fa`)**, RTL
- English (`en`), LTR
- Preference stored in the `portfolio-locale` cookie (and localStorage on the client)
- Middleware can set the cookie from geo headers (`x-vercel-ip-country` / `cf-ipcountry`) or `Accept-Language`
- UI strings: `src/i18n/locales/{fa,en}.json`
- CV / section copy: localized fields in `src/cv-data` and feature `data/` modules
- Document `lang` / `dir` updated in the root layout; SEO titles/descriptions follow the active locale

---

## Theme (light / dark)

- MUI theme via `AppThemeProvider`
- Mode persisted in `localStorage` (`portfolio-theme-mode`), with `prefers-color-scheme` fallback
- Shared CSS variables in `src/theme/config/appCssVars.ts`
- Fonts: **Vazirmatn** (fa), **Syne** (en)

---

## Contact & messaging

1. Visitor submits the contact form on the home page.
2. `POST /api/contact` validates with Zod, applies rate limiting + honeypot, optionally verifies reCAPTCHA.
3. Message is stored in SQLite (`messages` table) — no outbound SMTP mailer.
4. Admin reviews messages under `/admin/messages`.

---

## SEO & discoverability

Implemented under `src/app` and `src/shared/lib`:

| Piece | Details |
|-------|---------|
| Metadata | Locale-aware title, description, keywords, authors, canonical |
| Open Graph / Twitter | Card metadata + generated `opengraph-image` (1200×630) |
| JSON-LD | `Person`, `WebSite`, `ProfilePage` (name, job, social links, location) |
| Sitemap | `/`, `/jobs`, `/resume` → `/sitemap.xml` |
| Robots | Allow public routes; disallow `/admin` and `/api/` |
| Favicon | `public/favicon.svg` — developer `</>` symbol |
| Apple icon | Generated `apple-icon` |
| Manifest | Web app manifest (`manifest.ts`) |
| Viewport | Theme colors for light / dark |

Set `NEXT_PUBLIC_SITE_URL` to your production domain so absolute URLs resolve correctly. Fallbacks: `AUTH_URL`, then `VERCEL_URL`.

---

## Security notes

- Admin uses a single Credentials user (email + bcrypt hash).
- Contact endpoint: Zod validation, rate limit, honeypot, optional reCAPTCHA v3.
- Login can also run reCAPTCHA when enabled.
- Middleware protects `/admin` routes; Auth config is split so Edge middleware stays bcrypt-free.

---

## Deploy (Vercel)

1. Connect the repository to Vercel (Next.js preset; see `vercel.json`).
2. Set production env vars, especially:
   - `NEXT_PUBLIC_SITE_URL` → `https://your-domain.com`
   - `AUTH_SECRET`, `AUTH_URL`, admin credentials
   - reCAPTCHA + GA as needed
3. **SQLite on serverless:** a local `file:` database is fine for development. For production on Vercel, plan durable storage (e.g. hosted libSQL / Turso or another persistent DB) so messages survive redeploys.

---

## Architecture notes

- **Feature folders** — UI, styles, and data live together under `features/portfolio/*` and `features/panel/*`.
- **CV as data** — bilingual content is centralized in `cv-data/` and consumed by sections.
- **Thin routes** — App Router pages compose feature modules; server actions handle admin mutations.
- **Shared primitives** — `Page`, `AppLayout`, `Container`, `Reveal` motion helpers.
- **SEO helpers** — `src/shared/lib/site.ts`, `src/shared/lib/seo.ts`, `src/shared/seo/JsonLd.tsx`.

---

## License

Private portfolio project. All rights reserved unless otherwise noted.
