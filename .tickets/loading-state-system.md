---
id: loading-state-system
status: open
deps: []
links: []
created: 2026-06-21T00:00:00Z
type: feature
priority: 3
parent: rankings123
tags: [design, ux]
---
# Branded loading states & skeleton screens

Design cohesive loading state system: skeleton screens for tables/cards, spinner for in-page refreshes, page transitions. Should use per-sport accent colors (pulsing lime for ATP, magenta for WTA, etc.) and match the site's premium aesthetic. Replace generic loading indicators with branded, recognizable patterns.

## Acceptance Criteria

- Skeleton loader components for: ranking tables, SportCards, HeroBanner
- In-page refresh spinner (20s auto-refresh on live tables) uses accent color pulse
- Loading skeletons match card/table structure (realistic layout preview)
- Smooth fade-in transition when data loads (no harsh pop-in)
- Respects prefers-reduced-motion (static placeholder, no pulse)
- Works across dark/light + all design variants
- Applied to: LiveRankingTable, AtpDeepRankingTable, WorldCupTable, homepage SportCards

## References

- Current pulse-dot animation (apply similar logic to loaders)
- Per-sport accent system (ATP lime, WTA magenta, etc.)
- Skeleton loaders: Linear, Vercel dashboard (content-aware shapes)
