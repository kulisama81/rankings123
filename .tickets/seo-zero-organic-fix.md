---
id: seo-zero-organic-fix
status: closed
deps: []
links: []
created: 2026-08-04T13:51:05Z
type: feature
priority: 1
parent: rankings123
tags: [seo, traffic]
---
# SEO Foundation: Fix Zero Organic Traffic (2 impressions total)

Search Console shows 2 impressions total, position 29. Zero organic traffic = invisible to Google. Fix indexing, sitemap, internal linking.

## Acceptance Criteria

- [ ] Google Search Console verified + sitemap submitted
- [ ] Sitemap includes ALL pages (ATP/WTA live, World Cup, cycling, player pages when they exist)
- [ ] Internal linking: homepage → sport pages → player pages
- [ ] Meta titles optimized: "ATP Live Rankings August 2026 | Rankings123" not generic
- [ ] Structured data for rankings (BreadcrumbList, SportsEvent, etc.)
- [ ] After deploy: verify impressions increase within 7 days

## Notes

**2026-08-04T13:51:15Z**

## Context

**Search Console (July 6 - Aug 3):**
- Clicks: 0
- Impressions: 2 (only /atp-live)
- Position: 29

Site is basically invisible to Google. This is a CRITICAL growth blocker.

## Root Cause Analysis Needed

- [ ] Check Google Search Console: is site verified? sitemap submitted?
- [ ] Check robots.txt: are we blocking crawlers?
- [ ] Check sitemap.xml: does it exist? is it comprehensive (all pages)?
- [ ] Check internal linking: do pages link to each other?
- [ ] Check page titles/meta: are they SEO-optimized (keywords, uniqueness)?
- [ ] Check structured data: JSON-LD for rankings/players/tournaments?

## ROI: VERY HIGH

**Impact:** UNBLOCKS organic traffic growth (currently zero)  
**Effort:** 6-8 hours  
**First Principles:** Revenue = traffic × RPM. Traffic is ZERO. Fix traffic FIRST before optimizing RPM.

No traffic = no revenue, no matter how good monetization is.

## Closed in backlog triage 2026-08-10
dup: seo-zero-traffic-crisis
