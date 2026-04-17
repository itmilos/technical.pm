# New Blog Post

Create a new blog post for technical.pm with full SEO, GEO, and LLM optimization scaffolding.

## Steps

1. Ask the user for:
   - Post title
   - Post topic / brief description
   - Primary keyword
   - Tags (suggest based on topic if not provided)

2. Generate a URL-friendly slug: lowercase, hyphenated, keyword-first, no stop words.

3. Create the file at `src/content/blog/{{slug}}.md` with this structure:

```markdown
---
title: "{{title}}"
description: "{{150-char meta description with primary keyword}}"
date: "{{today YYYY-MM-DD}}"
author: "Milos Mike Rujevic"
authorBio: "Technical Product Manager with 10+ years building financial systems and DeFi infrastructure."
authorImage: "/images/authors/itm.jpeg"
tags: [{{tags}}]
lastModified: "{{today YYYY-MM-DD}}"
image: "/seo/{{slug}}.png"
---

<!--
SEO Checklist (delete before publishing):
[ ] Title tag 50-60 chars, primary keyword present
[ ] Meta description 140-155 chars, complete sentence
[ ] H1 present, H2/H3 hierarchy clean
[ ] Answer-first opening on every major section
[ ] FAQ block (3-5 questions) at bottom
[ ] Entities named explicitly (no pronoun drift)
[ ] At least one original data point
[ ] Internal links to related posts
[ ] llms.txt updated after publish
-->

# {{title}}

{{Opening paragraph — state the problem or context directly. No fluff.}}

---

## {{Section 1 H2}}

{{Direct 1-2 sentence answer to what this section covers.}} Then elaborate.

## {{Section 2 H2}}

{{Direct 1-2 sentence answer.}} Then elaborate.

## {{Section 3 H2}}

{{Direct 1-2 sentence answer.}} Then elaborate.

---

## FAQ

**What is {{primary topic}}?**
{{Direct 2-3 sentence answer.}}

**How does {{related concept}} work?**
{{Direct 2-3 sentence answer.}}

**What should a {{target reader}} know about {{topic}}?**
{{Direct 2-3 sentence answer.}}

---

*{{Closing sentence inviting comments or discussion.}}*
```

4. After creating the file, remind the user to:
   - Add the post to `/public/llms.txt` (or run `/update-llms-txt`)
   - Run `/seo-audit` before publishing
   - Generate an OG image at `/public/seo/{{slug}}.png`
