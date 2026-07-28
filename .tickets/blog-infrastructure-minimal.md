---
id: blog-infrastructure-minimal
status: closed
deps: []
links: []
created: 2026-07-28T13:51:07Z
type: feature
priority: 1
parent: rankings123
tags: []
---
# Blog infrastructure + /articles section for prediction content

Minimal blog/articles section to host prediction content for AdSense. Needs article listing page, individual article pages with proper meta/schema, category support. Keep simple - focus on shipping content, not building a CMS.

## Acceptance Criteria

Route /articles with article listing, /articles/[slug] for individual articles, proper <head> meta (title, description, og tags), JSON-LD Article schema, responsive design matching site, navigation link in header. Can be markdown-based (simple). ROI: Unblocks tennis-prediction-articles ticket (AdSense requirement).
