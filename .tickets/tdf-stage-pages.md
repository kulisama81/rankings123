---
id: tdf-stage-pages
status: open
deps: []
links: []
created: 2026-07-05T13:51:21Z
type: feature
priority: 1
parent: rankings123
tags: [cycling, worldcup-priority, seo, traffic]
---
# Tour de France: Individual stage pages (/events/tdf-2026/stage-[N])

Create 21 individual stage pages: /events/tdf-2026/stage-1 through stage-21. Each page shows: stage profile, winner, GC impact, stage highlights, betting context. Captures 'tour de france stage N results' searches (thousands per stage). Time-sensitive: 21 more days.

## Acceptance Criteria

✓ 21 dynamic routes: /events/tdf-2026/stage-1 through /events/tdf-2026/stage-21
✓ Each stage page shows:
  - Stage info: number, date, route (city to city), distance, type (flat/hilly/mountain/ITT)
  - Elevation profile (if available)
  - Stage winner + finishing time (once completed)
  - Top 10 finishers for the stage
  - GC standings AFTER this stage (how it changed the race)
  - Yellow/green/polka-dot jersey leaders after stage
  - Stage highlights summary
  - Betting context (stage winner odds, if available)
✓ Pre-stage: shows preview, favorites, profile
✓ Post-stage: shows results, winner, GC impact
✓ SEO: unique title/meta per stage ("Tour de France 2026 Stage N Results"), structured data
✓ All 21 stages in sitemap
✓ Linked from main /cycling TdF page (stage list → individual pages)
✓ ISR: 5 min during race day, 12h after stage completes
✓ Mobile responsive

## Notes

**2026-07-05**

**ROI (First Principles):** Each TdF stage = discrete event with MASSIVE search volume the day-of and day-after. "tour de france stage N results" = 10K-100K searches per stage (bigger stages like mountains = 100K+). 21 stages × avg 20K searches = 420K total search opportunities over 3 weeks. TIME-SENSITIVE: TdF runs through July 26 (21 days left). Each day we delay = lost traffic. Effort: MEDIUM (templated pages, Wikipedia stage data). Impact: VERY HIGH (captures TdF search spike).
