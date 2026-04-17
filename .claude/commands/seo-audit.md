# SEO Audit

Audit a blog post against the full SEO, GEO (Generative Engine Optimization), and LLM discoverability checklist.

## Usage

Run `/seo-audit` then provide the post filename or slug. Example: `post-0-why-defi` or `src/content/blog/post-0-why-defi.md`

## Steps

1. Read the specified post file from `src/content/blog/`
2. Read `defi.md` to get the keyword map and per-post targets for this post

3. Audit against each category and report pass/fail with specific fix instructions:

### Traditional SEO
- [ ] **Title** — 50–60 chars? Primary keyword present?
- [ ] **Description** — 140–155 chars? Complete sentence? Keyword included?
- [ ] **Date** — present and valid YYYY-MM-DD format?
- [ ] **Tags** — at least 3 relevant tags?
- [ ] **H1** — exactly one H1 (the post title)?
- [ ] **H2/H3 hierarchy** — no skipped heading levels?
- [ ] **Word count** — 800–1200 words?
- [ ] **Internal links** — links to at least 1 other post in the series (once posts exist)?
- [ ] **Image field** — set in frontmatter?

### GEO — Generative Engine Optimization
- [ ] **Answer-first** — does each major H2 section open with a direct 1–2 sentence answer?
- [ ] **FAQ block** — 3–5 questions present at the bottom?
- [ ] **FAQ phrasing** — questions match how people type into AI search ("What is X?", "How does Y work?")?
- [ ] **Entity saturation** — are Centrifuge, Maple Finance, Ondo Finance, Orca named explicitly and not pronoun-replaced mid-article?
- [ ] **Factual claims** — at least 3 standalone factual sentences with numbers/dates/names?
- [ ] **Original insight** — is there at least one observation not available in generic DeFi content?

### LLM Discoverability
- [ ] **Author field** — full name "Milos Mike Rujevic" present in frontmatter?
- [ ] **authorBio** — present?
- [ ] **Series context** — does the post reference the series by name?
- [ ] **llms.txt** — does `/public/llms.txt` include this post? (check the file)

4. Output a scored report:

```
SEO Audit: {{post title}}
─────────────────────────
Traditional SEO:  X/9  ✓
GEO:              X/6  ✓
LLM:              X/4  ✓
─────────────────────────
Total:            X/19

FAILS:
- [field]: [what's wrong] → [how to fix]
```

5. If any item fails, offer to fix it immediately.
