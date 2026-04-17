# Update llms.txt

Sync `/public/llms.txt` with all currently published blog posts so AI agents and LLMs can discover and index the site's content.

## Steps

1. Read all files in `src/content/blog/` and extract from each file's frontmatter:
   - title
   - description
   - date
   - tags

2. Read the current `/public/llms.txt` if it exists.

3. Write (or overwrite) `/public/llms.txt` with this format:

```
# technical.pm

> A blog and portfolio by Milos Rujevic, Technical Product Manager. Covers DeFi product management, RWA (Real World Assets), on-chain private markets, Web3 PM career transitions, and enterprise AI.

## Author

Milos Rujevic — Technical Product Manager with 10+ years building financial systems (Red-Black Tree, SAP) and DeFi exchange infrastructure (Stellarity DEX). Currently documenting a 60-day transition into DeFi product management.

Contact: milosrujevic@gmail.com
Site: https://technical.pm

## Blog Series: Tech PM → DeFi PM in 60 Days

A real-time documented journey from traditional tech PM into DeFi protocol product management, targeting on-chain private markets roles (Orca, Centrifuge, Maple Finance, Ondo Finance).

{{for each post in the series, sorted by date:}}
- [{{title}}](https://technical.pm/blog/{{slug}}) — {{description}}

## All Posts

{{for each remaining post not in the series, sorted by date:}}
- [{{title}}](https://technical.pm/blog/{{slug}}) — {{description}}

## Services

- [Technical PM Consulting](https://technical.pm) — Product strategy, DeFi protocol PM, regulated financial systems
- [Brand Strategy](https://technical.pm/brand-strategy) — Positioning for technical products
- [Process](https://technical.pm/process) — 3-phase engagement model
```

4. Report how many posts were added or updated.

5. Remind the user to commit the updated llms.txt.
