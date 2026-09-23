# technical.pm — Claude Code Guide

## What This Project Is

Personal portfolio site for Milos Rujevic, Technical Product Manager. Built with Astro, deployed on Vercel. PM consulting/services showcase — the blog has been removed.

## Tech Stack

- **Framework:** Astro v5 (SSR, server output via @astrojs/node + @astrojs/vercel)
- **UI:** React 19 for interactive components, Tailwind CSS for styling, Three.js for 3D/WebGL animations
- **Email:** Brevo API via `/src/pages/api/send-email.ts`
- **Deploy:** Vercel (vercel.json at root)

## Running Locally

```bash
npm run dev       # dev server at localhost:4321
npm run build     # production build to dist/
npm run preview   # preview production build
```

## Key Files

| File | Purpose |
|------|---------|
| `src/layouts/Layout.astro` | Main layout — OG tags, Twitter Cards, SEO component |
| `public/robots.txt` | Crawler rules — AI bots explicitly allowed |
| `public/llms.txt` | LLM discoverability index — keep updated |
| `public/agents.md` | AI agent capabilities, permissions, and action schema |
| `defi.md` | Archived DeFi career plan + blog series drafts from the retired blog |

## Color System (Tailwind)

| Name | Hex | Use |
|------|-----|-----|
| primary | #6C3EA6 | Royal Purple — main brand |
| accent | #B57EDC | Electric Lavender — highlights |
| background | #1E1E1E | Deep Charcoal — dark bg |
| cta | #FF4F58 | Neon Coral — calls to action |
| teal | #0EC2A4 | Cyber Teal — secondary accent |
| blush | #F3E6F8 | Pale Blush — soft backgrounds |

## Environment Variables

```
PUBLIC_BREVO_API_KEY=     # Brevo email API key
PUBLIC_CONTACT_EMAIL=     # noreply@technical.pm
RECIPIENT_EMAIL=          # milosrujevic@gmail.com
```
