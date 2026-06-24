# Abhishek Banerji Website

A content-rich marketing and portfolio website for Abhishek Banerji, built with Next.js. The site presents his work across four service verticals:

- **Corporates** — leadership, wellness, and culture programs
- **Classrooms** — future-ready skills, mental health, and teacher training
- **Communities** — orphanages, senior citizens, queer communities, women shelters, and juvenile justice
- **Clinical** — special needs, psychiatric care, and geriatric services

Supporting pages cover About, Theatre, Contact, and a placeholder Blog section.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| UI | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Email | [Resend](https://resend.com/) (contact form) |
| Hosting | [Vercel](https://vercel.com/) |

## Architecture

This is **not** a pure static HTML site. Pages are **pre-rendered at build time** (static generation), but the app still runs on a Next.js server:

- **23 routes** are statically generated from TypeScript components and data files — no CMS or database
- **Client components** (`'use client'`) power interactivity: navigation, carousels, scroll animations, and the contact form
- **One API route** (`/api/contact`) handles form submissions server-side via Resend

Content lives in `src/app/**/data/programsData.ts` and related component files. Images and fonts are served from `public/`.

## Main Site Areas

### Top-level routes

| Route | Description |
|-------|-------------|
| `/` | Home |
| `/about` | Biography, awards, and media |
| `/corporate` | Corporate services overview |
| `/classrooms` | Classroom programs overview |
| `/communities` | Community services overview |
| `/clinical` | Clinical services overview |
| `/theatre` | Theatre work |
| `/contact` | Contact form |
| `/blog` | Placeholder |

### Service detail pages

**Corporate**

- `/corporate/services/leadership`
- `/corporate/services/wellness`
- `/corporate/services/culture`

**Classrooms**

- `/classrooms/services/future-ready-skills`
- `/classrooms/services/mental-health`
- `/classrooms/services/teacher-training`

**Communities**

- `/communities/services/orphanages`
- `/communities/services/senior-citizens`
- `/communities/services/queer-communities`
- `/communities/services/women-shelters`
- `/communities/services/juvenile-justice`

**Clinical**

- `/clinical/services/special-needs`
- `/clinical/services/psychiatric-care`
- `/clinical/services/geriatric`

Legacy LGBTQIA URLs redirect to `/communities/services/queer-communities` (see `next.config.ts`).

## Project Structure

```text
src/
  app/                          App Router pages, layouts, and API routes
    about/                      About page and biography content
    api/contact/                Contact form email handler
    classrooms/                 Classroom vertical + sub-services
    clinical/                   Clinical vertical + sub-services
    communities/                Communities vertical + sub-services
    corporate/                  Corporate vertical + sub-services
    contact/                    Contact form UI
    theatre/                    Theatre page
  components/
    layout/                     Navbar, Footer, BackgroundLayout, WhatsApp button
    sections/                   Shared home page sections (Hero, Services, SDGs, etc.)
    corporate/                  Corporate-specific sections (Modalities, HowWeDoIt, etc.)
  hooks/                        Reusable client hooks (e.g. scroll animation)
public/                         Images, fonts, and static assets (~950 MB)
next.config.ts                  Redirect rules
vercel.json                     Vercel build config and security headers
```

Key files:

- `src/app/layout.tsx` — root layout, fonts, and metadata
- `src/app/page.tsx` — home page
- `src/components/layout/Navbar.tsx` — global navigation with nested service menus
- `src/app/contact/page.tsx` — contact form UI
- `src/app/api/contact/route.ts` — Resend email handler

## Prerequisites

- Node.js 20+
- npm

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env.local` file in the project root:

```bash
RESEND_API_KEY=your_resend_api_key
```

The contact form API uses Resend to send submissions to `abhishekbanerji04@gmail.com`. If `RESEND_API_KEY` is missing or invalid, `/api/contact` will fail to send mail.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

## Build Size

Approximate sizes on disk:

| Component | Size |
|-----------|------|
| Compiled Next.js output (JS/CSS/server) | ~6 MB |
| Static assets (`public/`) | ~950 MB |
| Deployable total (build + `public/`) | ~955 MB |

Most of the deployable weight comes from images in `public/` (corporate, theatre, classroom, clinical, and communities galleries). `node_modules` and `.next/cache` are dev/build artifacts and are not deployed.

## Deployment

The repo includes `vercel.json` configured for Next.js on Vercel with basic security headers and the `iad1` region.

1. Push the repo to GitHub
2. Import the project in Vercel
3. Set `RESEND_API_KEY` in the Vercel environment variables
4. Deploy

## Notes

- The Blog page is currently a placeholder.
- To update service content, edit the relevant `programsData.ts` files and page components under `src/app/`.
- To add or replace images, update files under `public/` and reference paths in the corresponding components or data files.
