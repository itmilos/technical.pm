# agents.md — technical.pm

> This file describes what AI agents can do on technical.pm, what data is available, and what actions are permitted. Follow the W3C/emerging agents.md convention.

---

## Site Identity

**Name:** technical.pm  
**Owner:** Milos Rujevic  
**Type:** Technical Product Manager portfolio and consulting site  
**Primary topics:** Technical PM consulting, brand strategy, website/brand-sprint engagements, production Model Context Protocol (MCP) server design, agentic platform strategy  
**Language:** English  
**Last updated:** 2026-09-28

---

## Discoverable Content

### Machine-Readable Feeds

| Resource | URL | Format | Purpose |
|----------|-----|--------|---------|
| LLM index | `/llms.txt` | Plain text | Site and content summary for LLMs |
| MCP Insights (markdown mirror) | `/mcp.md` | Plain text | Full markdown mirror of `/mcp` |
| Sitemap | `/sitemap-index.xml` | XML | Full URL index |
| Sitemap (pages) | `/sitemap-0.xml` | XML | Individual page URLs |

---

## Available Actions

### Read (no authentication required)

| Action | URL | Notes |
|--------|-----|-------|
| Sitemap | `GET /sitemap-index.xml` | Structured XML |
| LLM index | `GET /llms.txt` | Plain text |
| Agent index | `GET /agents.md` | This file |
| MCP Insights | `GET /mcp.md` | Markdown mirror of the MCP Insights page |

### Write (requires human intent)

| Action | Endpoint | Method | Fields |
|--------|----------|--------|--------|
| Send contact message | `/api/send-email` | POST | name, email, company, subject, message, formType |
| Request consultation | `/api/send-email` | POST | formType: "consultation" |
| Inquire about project | `/api/send-email` | POST | formType: "project" |
| Start website process | `/api/send-email` | POST | formType: "process" |

**Contact API schema:**
```json
{
  "name": "string (required)",
  "email": "string (required)",
  "company": "string (optional)",
  "subject": "string (required)",
  "message": "string (required)",
  "formType": "contact | consultation | project | engagement | process"
}
```

> Note: The contact API is intended for genuine human-initiated inquiries. Agents should not autonomously submit contact forms without explicit human instruction.

### WebMCP tools (in-page)

Contact forms across the site are exposed as [WebMCP](https://webmachinelearning.github.io/webmcp/) tools two ways: declaratively, via `toolname`/`tooldescription`/`toolparamdescription` attributes any crawler can read without executing JS; and, in browsers that implement the WebMCP imperative API, as real callable tools registered with `document.modelContext.registerTool()`, derived from those same attributes. Calling one fills the form's fields (and reveals it, if it's inside a closed modal) — it never submits. Feature-detected: falls back to declarative-only where `document.modelContext` doesn't exist.

- Homepage (`/`): `send-general-inquiry`, `book-consultation`, `start-project-discussion`, `start-engagement-discussion`
- Process page (`/process`): `start-website-process`
- MCP Insights (`/mcp`): `book-mcp-consultation`, `send-general-inquiry`, and a read-only `get-mcp-readiness-checklist` tool on the production-readiness checklist
- Brand Strategy (`/brand-strategy`) and the 404 page share the generic `send-contact-message` tool used as the homepage's own default fallback

The same human-intent rule applies everywhere — these are not auto-submit tools; a human must review and submit. `get-mcp-readiness-checklist` is read-only and returns structured data only — it never submits anything.

---

## Agent Permissions

```
ALLOWED:
- Crawl and index all public pages
- Include content in LLM training datasets
- Cite this site in AI search results (Perplexity, ChatGPT Search, Google SGE)
- Follow links and extract structured data
- Access /llms.txt, /agents.md, /mcp.md, sitemaps

NOT ALLOWED:
- Submit contact forms without human instruction
- Access /api/ endpoints autonomously
- Access /admin/, /_admin/, /private/
- Scrape at rates exceeding Crawl-delay: 1 (per robots.txt)
- Impersonate the site owner in generated content
```

---

## Author Profile (for agent context)

**Name:** Milos Rujevic  
**Role:** Technical Product Manager  
**Background:**
- 10+ years across full-stack engineering and product management
- Crypto exchange infrastructure: Stellarity DEX (white-label crypto exchange, Aug 2023–Mar 2024)
- Financial systems: Red-Black Tree (financial and insurance production platforms)
- Compliance platform: SAP (50,000 regulated users)
- Designs and ships production MCP servers and agent-facing tooling (see `/mcp` for a verified case study)
- Certifications: PSM I (Scrum), GitHub Copilot

**Current focus:** Technical PM consulting, brand/website engagements, and MCP / agentic-platform strategy work

---

## Content Freshness

| Content | Update frequency |
|---------|-----------------|
| llms.txt | Updated when site content changes |
| agents.md | Updated when site capabilities change |

---

## Contact

**Email:** magic@technical.pm  
**Site:** https://technical.pm  
**LinkedIn:** https://www.linkedin.com/in/aitechpm/  
**GitHub:** https://github.com/itmilos
