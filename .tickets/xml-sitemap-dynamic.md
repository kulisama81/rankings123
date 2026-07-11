---
id: xml-sitemap-dynamic
status: open
deps: []
links: []
created: 2026-07-11T13:51:18Z
type: feature
priority: 1
parent: rankings123
tags: [seo, technical]
---
# XML sitemap with dynamic player/team pages

Comprehensive XML sitemap including all dynamic pages - SEO crawlability

## Acceptance Criteria

sitemap.xml includes all static pages + all player pages (ATP/WTA/WC) + all team pages + all event/tournament pages, updated daily or on-demand, submit to Google Search Console, verify all pages indexed within 1 week, paginated sitemaps if >50k URLs

## Notes

**2026-07-11T13:51:24Z**

## SEO Crawlability - Currently Incomplete

**Current state:** sitemap.xml exists but likely doesn't include player pages (which don't exist yet) or all dynamic routes.

**Why critical:** Google won't index pages it doesn't know exist. Sitemap = discovery mechanism.

**Scale:** Will have ~500+ pages after player pages ship (400 tennis + 20 WC players + 8 teams + tournaments/events).

**First Principles:** Search engines crawl from sitemaps + links. Dynamic pages need explicit sitemap entries.
**Effort:** LOW (Next.js sitemap generation, update when player pages ship)
**Impact:** HIGH (enables indexing of ALL SEO pages)
**ROI:** VERY HIGH (blocker for player page SEO value)
**Dependency:** Should ship WITH or immediately after tennis-player-pages-seo
