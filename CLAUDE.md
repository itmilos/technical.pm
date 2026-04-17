# technical.pm — Claude Code Guide

## What This Project Is

Personal portfolio and blog site for Milos Rujevic, Technical Product Manager. Built with Astro, deployed on Vercel. The site serves two purposes: PM consulting/services showcase and a technical blog (active series: "Tech PM → DeFi PM in 60 Days").

## Tech Stack

- **Framework:** Astro v5 (SSR, server output via @astrojs/node + @astrojs/vercel)
- **UI:** React 19 for interactive components, Tailwind CSS for styling, Three.js for 3D/WebGL animations
- **Content:** Astro Content Collections (Markdown in `src/content/blog/`)
- **Email:** Brevo API via `/src/pages/api/send-email.ts`
- **Deploy:** Vercel (vercel.json at root)

## Running Locally

```bash
npm run dev       # dev server at localhost:4321
npm run build     # production build to dist/
npm run preview   # preview production build
```

## Blog Content System

Posts live in `src/content/blog/` as `.md` files.

**Required frontmatter schema** (from `src/content/config.ts`):
```yaml
---
title: ""
description: ""
date: "YYYY-MM-DD"
author: "Milos Mike Rujevic"
authorBio: ""          # optional
authorImage: ""        # optional, path from public/
tags: []
lastModified: ""       # optional, YYYY-MM-DD
image: ""              # optional, path from public/
---
```

**Dynamic blog route:** `src/pages/blog/[slug].astro`
**Blog index:** `src/pages/blog/index.astro` (tag filtering built in)
**RSS feed:** `src/pages/blog/rss.xml.ts`

## Active Blog Series: Tech PM → DeFi PM in 60 Days

Full plan and all post drafts are in `defi.md` at the project root. Series schedule:

| Post | File to create | Publish |
|------|---------------|---------|
| 0 — Why I'm Betting 60 Days on DeFi | `post-0-why-defi.md` | Apr 17 |
| 1 — What the Hell is RWA? | `post-1-what-is-rwa.md` | Apr 24 |
| 2 — 5 Things Broken in On-Chain Private Markets | `post-2-rwa-limitations.md` | May 1 |
| 3 — Reading the Blockchain as a PM | `post-3-blockchain-for-pm.md` | May 8 |
| 4 — TradFi → DeFi Translation Guide | `post-4-tradfi-defi-translation.md` | May 15 |
| 5 — I Built an RWA Dashboard | `post-5-rwa-dashboard-launch.md` | May 29 |
| 6 — 60 Days In: What I Got Wrong | `post-6-retrospective.md` | Jun 12 |

## SEO / GEO / LLM Optimization Requirements

Every blog post must include:

1. **Frontmatter:** title, description, date, tags — all required
2. **JSON-LD:** BlogPosting structured data in the post template (already in `[slug].astro`)
3. **OG Image:** `/public/seo/og-image.png` is the fallback; post-specific images go in `/public/seo/`
4. **Answer-first writing:** Major sections open with a direct 1–2 sentence answer
5. **FAQ block:** 3–5 questions at the bottom of each post
6. **Entity naming:** Protocol/company names stated explicitly, not pronoun-replaced
7. **llms.txt:** Update `/public/llms.txt` after publishing any new post

Full SEO/GEO checklist is in `defi.md` under "SEO, GEO & LLM Optimization".

## Key Files

| File | Purpose |
|------|---------|
| `src/layouts/Layout.astro` | Main layout — OG tags, Twitter Cards, SEO component |
| `src/content/config.ts` | Blog collection schema (Zod) |
| `src/pages/blog/[slug].astro` | Blog post template — add JSON-LD here |
| `public/robots.txt` | Crawler rules — AI bots explicitly allowed |
| `public/llms.txt` | LLM discoverability index — keep updated |
| `public/agents.md` | AI agent capabilities, permissions, and action schema |
| `defi.md` | Full DeFi career plan + blog series drafts + SEO checklist |
| `.claude/commands/` | Custom Claude skills for this project |

## Custom Skills Available

| Skill | Usage |
|-------|-------|
| `/new-blog-post` | Scaffold a new post with full SEO/GEO frontmatter |
| `/defi-post` | Create the next DeFi series post from defi.md |
| `/seo-audit` | Audit a post against the SEO/GEO/LLM checklist |
| `/publish-checklist` | Run pre-publish validation on a post |
| `/update-llms-txt` | Sync llms.txt with all published posts |

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
