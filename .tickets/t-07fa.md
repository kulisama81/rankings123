---
id: t-07fa
status: open
deps: []
links: []
created: 2026-07-21T13:51:25Z
type: feature
priority: 1
parent: rankings123
tags: []
---
# blog-article-infrastructure

Blog/article infrastructure for SEO content (AdSense requirement)

AdSense requires 10-15 quality articles (800-1200 words each). Currently we have live ranking PAGES but no ARTICLE/BLOG section. Need infrastructure to publish SEO-driven articles.

Requirements:
- /articles/[slug] route pattern
- Markdown or MDX support for easy authoring
- Article list page /articles
- SEO meta tags per article (title, description, OG tags)
- Published date + author
- Footer link to Articles section

First articles to publish (once infrastructure exists):
- Tour de France 2026 betting guide
- US Open 2026 preview
- Tennis ranking explained
- World Cup 2026 Final recap
- How live tennis rankings work
- ATP vs WTA ranking systems compared

Acceptance Criteria:
✓ /articles route working
✓ Article authoring pattern documented
✓ Example article published and rendering correctly
✓ Linked from site footer
✓ Sitemap includes article URLs

ROI: BLOCKER for AdSense approval (need 10-15 articles). Also: SEO long-tail traffic (millions search tennis/sports explainers). Impact: CRITICAL, Effort: MEDIUM

## Notes

**2026-07-21T13:52:26Z**

**Revenue gate:** AdSense requires 10-15 articles. We have 0 infrastructure. Gates entire ad revenue. **Also:** SEO long-tail multiplier ('how do ATP rankings work' = 10K+/mo searches). **Dual ROI:** (1) Unblocks AdSense, (2) Opens SEO traffic channel. **Impact:** CRITICAL, **Effort:** MEDIUM.
