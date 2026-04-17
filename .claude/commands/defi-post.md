# DeFi Series Post

Create the next post in the "Tech PM → DeFi PM in 60 Days" blog series.

## Steps

1. Read `defi.md` at the project root to find:
   - Which posts have already been created in `src/content/blog/`
   - The draft content and angle for the next post in the series
   - The SEO keyword map and per-post guidance

2. Identify the next unpublished post by checking which files exist:
   - `post-0-why-defi.md`
   - `post-1-what-is-rwa.md`
   - `post-2-rwa-limitations.md`
   - `post-3-blockchain-for-pm.md`
   - `post-4-tradfi-defi-translation.md`
   - `post-5-rwa-dashboard-launch.md`
   - `post-6-retrospective.md`

3. Write the full post (800–1200 words) following the series format from defi.md:
   - **Tone:** Practitioner voice — "here's what I found", not "here's a tutorial"
   - **Structure:** Hook → what I learned → why it matters to a PM → one actionable takeaway
   - **Answer-first:** Every major section opens with a direct 1–2 sentence answer
   - **Entity saturation:** Name protocols explicitly (Centrifuge, Maple Finance, Ondo Finance, Orca) — no pronoun drift
   - **Original insight:** Include at least one observation not found in generic DeFi content
   - **End with:** A question inviting reader response

4. Apply the full frontmatter schema:
```yaml
---
title: ""
description: ""   # 140-155 chars, primary keyword included
date: "{{publish date from series schedule}}"
author: "Milos Mike Rujevic"
authorBio: "Technical Product Manager transitioning into DeFi — documenting the journey in real time."
authorImage: "/images/authors/itm.jpeg"
tags: ["DeFi", "RWA", "Product Management", "{{post-specific tags}}"]
lastModified: "{{today}}"
image: "/seo/{{slug}}.png"
---
```

5. Add FAQ block at bottom (3–5 questions using phrasing people type into AI search).

6. After creating the file, output:
   - File path created
   - Publish date
   - LinkedIn post hook (1–2 sentences for the cross-post)
   - X/Twitter thread opener
   - Which protocols to tag on X
