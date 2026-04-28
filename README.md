# FLSLPN Web Portal

Official web portal for the **Female Law Students & Legal Professionals Network (FLSLPN)** at Haramaya University.

Built with Next.js 14+ (App Router), TypeScript, Tailwind CSS, Framer Motion, and Sanity v3.

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Sanity](https://sanity.io) project (free tier is sufficient)
- A [Resend](https://resend.com) account for email notifications (optional for local dev)

### 1. Clone and install

```bash
git clone <repo-url>
cd flslpn-web-portal
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID (from sanity.io/manage) |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset name (default: `production`) |
| `SANITY_API_TOKEN` | Sanity API token with write access (for migration script) |
| `RESEND_API_KEY` | Resend API key for email notifications |
| `NOTIFICATION_EMAIL` | Email address to receive form submissions |

> **Never commit `.env.local`** — it is gitignored.

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The embedded Sanity Studio is available at [http://localhost:3000/studio](http://localhost:3000/studio).

---

## Uploading Images to Sanity

A one-time migration script uploads all images from `Resource/image/` to Sanity (converting `.HEIC` files to `.webp`):

```bash
npx tsx scripts/upload-images.ts
```

Requires `SANITY_API_TOKEN` to be set in `.env.local`.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests (vitest --run) |

---

## Project Structure

```
flslpn-web-portal/
├── app/                    # Next.js App Router pages and API routes
│   ├── (site)/             # Public-facing pages
│   │   ├── page.tsx        # Home
│   │   ├── about/          # About
│   │   ├── events/         # Events list + [slug] detail
│   │   ├── team/           # Team
│   │   ├── join/           # Join form
│   │   └── contact/        # Contact form
│   ├── studio/             # Embedded Sanity Studio
│   └── api/                # API routes (join, contact)
├── src/
│   ├── components/         # React components
│   ├── hooks/              # Custom hooks
│   ├── lib/                # Sanity client, queries, utils, schemas
│   ├── styles/             # Font configuration
│   └── types/              # TypeScript interfaces
├── sanity/                 # Sanity schema definitions and config
├── scripts/                # One-time migration scripts
└── Resource/               # Source image assets (read-only)
```

---

## Deployment (Vercel)

### Production

- The `main` branch is mapped to the **production** environment on Vercel.
- Every push to `main` triggers an automatic production deployment.
- If a deployment fails, Vercel automatically rolls back to the last successful deployment.

### Preview deployments

- Pull requests targeting `main` automatically get a **Preview Deployment** URL.

### Git branching convention

| Branch pattern | Purpose |
|---|---|
| `main` | Production — never commit directly |
| `feature/*` | New features (e.g. `feature/hero-carousel`) |
| `fix/*` | Bug fixes (e.g. `fix/mobile-nav-close`) |

### Required Vercel Environment Variables

Set these in your Vercel project settings under **Settings → Environment Variables**:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_TOKEN`
- `RESEND_API_KEY`
- `NOTIFICATION_EMAIL`

See `.env.example` for descriptions of each variable.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14+ (App Router, TypeScript) |
| Styling | Tailwind CSS v4 (class-based dark mode) |
| Animations | Framer Motion |
| CMS | Sanity v3 (headless) |
| Forms | react-hook-form + zod |
| Email | Resend |
| Deployment | Vercel |
| Testing | Vitest + fast-check |
