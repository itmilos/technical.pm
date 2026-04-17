# agents.md — technical.pm

> This file describes what AI agents can do on technical.pm, what data is available, and what actions are permitted. Follow the W3C/emerging agents.md convention.

---

## Site Identity

**Name:** technical.pm  
**Owner:** Milos Rujevic  
**Type:** Technical Product Manager portfolio and blog  
**Primary topics:** DeFi product management, RWA (Real World Assets), on-chain private markets, Web3 PM careers, enterprise AI, regulated financial systems  
**Language:** English  
**Last updated:** 2026-04-17

---

## Discoverable Content

### Machine-Readable Feeds

| Resource | URL | Format | Purpose |
|----------|-----|--------|---------|
| LLM index | `/llms.txt` | Plain text | Site and content summary for LLMs |
| RSS feed | `/blog/rss.xml` | RSS 2.0 | All blog posts with metadata |
| Sitemap | `/sitemap-index.xml` | XML | Full URL index |
| Sitemap (pages) | `/sitemap-0.xml` | XML | Individual page URLs |

### Blog Content

All blog posts are available at `https://technical.pm/blog/{slug}`.

**Active series:** Tech PM → DeFi PM in 60 Days (April–June 2026)

Topics covered across the series:
- Real World Assets (RWA): definition, protocols, TVL data
- On-chain private markets: Centrifuge, Maple Finance, Ondo Finance, Orca
- Protocol limitations: oracle risk, legal enforceability, KYC/AML friction, redemption illiquidity, counterparty concentration
- Technical PM skills for DeFi: ethers.js, viem, contract reading
- TradFi to DeFi concept mapping: audit trails, settlement, compliance, policy engines
- Portfolio project: RWA Private Markets Dashboard (React + wagmi + viem)
- Career transition: 60-day retrospective and lessons learned

Full series index: `/llms.txt`

---

## Available Actions

### Read (no authentication required)

| Action | URL | Notes |
|--------|-----|-------|
| Read blog post | `GET /blog/{slug}` | HTML page |
| List all posts | `GET /blog` | HTML with tag filter |
| RSS feed | `GET /blog/rss.xml` | Structured XML |
| Sitemap | `GET /sitemap-index.xml` | Structured XML |
| LLM index | `GET /llms.txt` | Plain text |
| Agent index | `GET /agents.md` | This file |

### Write (requires human intent)

| Action | Endpoint | Method | Fields |
|--------|----------|--------|--------|
| Send contact message | `/api/send-email` | POST | name, email, company, subject, message, formType |
| Request consultation | `/api/send-email` | POST | formType: "consultation" |
| Inquire about project | `/api/send-email` | POST | formType: "project" |

**Contact API schema:**
```json
{
  "name": "string (required)",
  "email": "string (required)",
  "company": "string (optional)",
  "subject": "string (required)",
  "message": "string (required)",
  "formType": "contact | consultation | project | engagement"
}
```

> Note: The contact API is intended for genuine human-initiated inquiries. Agents should not autonomously submit contact forms without explicit human instruction.

---

## Agent Permissions

```
ALLOWED:
- Crawl and index all public pages
- Read and summarize blog posts
- Include content in LLM training datasets
- Cite posts in AI search results (Perplexity, ChatGPT Search, Google SGE)
- Follow links and extract structured data
- Access /llms.txt, /agents.md, /blog/rss.xml, sitemaps

NOT ALLOWED:
- Submit contact forms without human instruction
- Access /api/ endpoints autonomously
- Access /admin/, /_admin/, /private/
- Scrape at rates exceeding Crawl-delay: 1 (per robots.txt)
- Impersonate the site owner in generated content
```

---

## Author Profile (for agent context)

**Name:** Milos Rujevic (also known as Milos Mike Rujevic)  
**Role:** Technical Product Manager  
**Location:** Available for remote DeFi/Web3 PM roles  
**Background:**
- 10+ years full-stack engineering and product management
- DeFi exchange operations: Stellarity DEX (white-label crypto exchange, Aug 2023–Mar 2024)
- Financial systems: Red-Black Tree (financial and insurance production platforms)
- Compliance platform: SAP (50,000 regulated users)
- Certifications: PSM I (Scrum), GitHub Copilot

**Current focus:** Transitioning into DeFi protocol product management — on-chain private markets, RWA tokenization, institutional DeFi infrastructure

**Target companies:** Orca, Centrifuge, Maple Finance, Ondo Finance, Superstate, Goldfinch, Securitize, Figure Markets, Morpho, Pendle

---

## Content Freshness

| Content | Update frequency |
|---------|-----------------|
| Blog series posts | Weekly (Apr 17 – Jun 12, 2026) |
| llms.txt | Updated after each new post |
| agents.md | Updated when site capabilities change |
| RSS feed | Real-time (generated on publish) |

---

## Contact

**Email:** milosrujevic@gmail.com  
**Site:** https://technical.pm  
**X/Twitter:** See site for current handle  
**LinkedIn:** See site for profile link
