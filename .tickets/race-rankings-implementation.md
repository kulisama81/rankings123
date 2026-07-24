---
id: race-rankings-implementation
status: open
deps: []
links: []
created: 2026-07-24T13:49:20Z
type: feature
priority: 0
parent: rankings123
tags: [tennis, parity]
---
# Tennis Race Rankings (ATP + WTA YTD) — parity gap

Implement ATP Race to Turin and WTA Race to Finals (year-to-date points) rankings pages. This is a TOP parity gap vs live-tennis.eu — they have Race, we don't. Race = points earned in current season only (resets Jan 1), crucial for year-end finals qualification tracking.

## Acceptance Criteria

- /atp-race page with Race to Turin (YTD points) ranking
- /wta-race page with Race to Finals (YTD points) ranking
- Data sources: ESPN or ATP/WTA APIs with YTD filter
- Mock fallback + source flag
- Clear explainer: 'Race = current season points only'
- Link from ATP/WTA live pages
- SEO: meta, OG, sitemap
- Builds green, ESLint clean, data-integrity pass

## Notes

**2026-07-24T13:49:22Z**

ROI (First Principles - Parity): User need = track year-end finals qualification race. Traffic = race rankings searched heavily Aug-Nov (finals season). Credibility = live-tennis.eu has this; we must match to be viable alternative. Engagement = race changes faster than official ranking → more return visits. Revenue = more pages = more sessions = more ad impressions. Effort = Medium (ESPN race endpoint exists). ROI = CRITICAL (Phase 1 parity blocker).
