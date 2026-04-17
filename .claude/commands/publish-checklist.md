# Publish Checklist

Run the full pre-publish validation on a blog post before it goes live.

## Usage

`/publish-checklist {{slug or filename}}`

## Steps

1. Run `/seo-audit` on the post and surface any fails.

2. Check the post file exists at the correct path: `src/content/blog/{{slug}}.md`

3. Verify the frontmatter fields are all populated (no empty strings):
   - title, description, date, author, tags — all required, none empty

4. Check that `public/llms.txt` exists and contains an entry for this post. If missing, prompt to run `/update-llms-txt`.

5. Check `public/robots.txt` allows AI crawlers (GPTBot, PerplexityBot, ClaudeBot). If missing, output the lines to add.

6. Verify the `astro.config.mjs` sitemap config will include the new post (no exclusion rules blocking it).

7. Cross-post reminders — output ready-to-use copy for:
   - **LinkedIn:** 2–3 sentence teaser + link placeholder
   - **X thread:** Opening tweet (280 chars max) + 2 follow-up tweets + protocols to tag
   - **Mirror.xyz / dev.to** (for posts 2 and 5 only): note to cross-post

8. Final output:

```
Pre-Publish Checklist: {{post title}}
══════════════════════════════════════
✓ SEO audit passed (X/19)
✓ Frontmatter complete
✓ llms.txt updated
✓ robots.txt allows AI crawlers
✓ Sitemap will include post

READY TO PUBLISH ✓

Cross-post copy:
─────────────────
LinkedIn: {{teaser}}

X: {{opening tweet}}
   {{tweet 2}}
   {{tweet 3}}
   Tag: {{@protocols}}
```
