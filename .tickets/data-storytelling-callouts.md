---
id: data-storytelling-callouts
status: open
deps: []
links: []
created: 2026-06-21T12:00:00Z
type: feature
priority: 3
parent: rankings123
tags: [design, engagement, data]
---
# Data storytelling visual callouts (biggest movers, milestones, upsets)

Automatically highlight notable stories in the data: biggest climbers/fallers this week, players reaching career-high ranks, upset victories, milestone achievements. Display as visually distinct callout cards/badges within or above ranking tables. Turns raw rankings into narrative moments; boosts engagement. Per 2026 sports data viz trends: "data storytelling" over passive lists.

## Acceptance Criteria

- Callout system detects: biggest rank change (±10+ positions), career-high rank, milestone (100th week in top 10)
- Visual treatment: accent-colored card/banner above table or inline badge
- Content: icon + concise message ("🔥 Biggest climber: Sinner +12 spots")
- Per-sport accent theming (ATP lime, WTA magenta callouts)
- Max 2–3 callouts per page (avoid clutter)
- Applied to: LiveRankingTable, AtpDeepRankingTable, WorldCupTable
- Data-driven (not hardcoded) — refreshes with live data
- Mobile-friendly (stacks above table, not sidebar)

## References

- ESPN "Top Performers" module
- SofaScore "Hot Matches" callouts
- 2026 sports data viz trends: storytelling over raw data
- DESIGN-IDENTITY.md Phase 3: "Data storytelling — visual callouts for biggest movers, upsets, milestones"
