---
id: player-pages-v1
status: open
deps: []
links: []
created: 2026-07-24T13:50:45Z
type: feature
priority: 1
parent: rankings123
tags: [tennis, seo, parity]
---
# Tennis Player Pages (SEO Long-Tail Engine)

Build player profile pages for top ATP/WTA players (top 50 each as MVP). Each page = ranking history, career stats, current tournaments, H2H vs top rivals. This is the SEO long-tail engine (1000s of 'player name ranking' searches) AND a parity gap (live-tennis.eu has player pages).

## Acceptance Criteria

- Dynamic route /tennis/players/[slug] (e.g., /tennis/players/jannik-sinner)
- Player data: name, country, ranking (current + career high), points, age, recent results
- Ranking history chart (last 52 weeks)
- Link to H2H tool for head-to-head vs other players
- Current tournament status (if playing this week)
- Generate pages for ATP/WTA top 50 (100 total)
- SEO: player name in title/meta, canonical URLs
- Sitemap generation for all player pages
- Builds green, ESLint clean, data-integrity pass

## Notes

**2026-07-24T13:50:50Z**

ROI (First Principles - Traffic): Traffic driver = 'jannik sinner ranking', 'iga swiatek ranking' searched millions of times (each top player = 10K-1M monthly searches). Parity = live-tennis.eu has player pages; we need them to compete. SEO = 100 player pages × 10K searches each = 1M+ monthly search opportunity. Engagement = player pages link to rankings, H2H, tournaments (session depth). Revenue = massive page inventory for ads. Effort = Medium (dynamic routing, ESPN player endpoints exist). ROI = VERY HIGH (SEO foundation, traffic multiplier).
