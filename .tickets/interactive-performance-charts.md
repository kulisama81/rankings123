---
id: interactive-performance-charts
status: open
deps: []
links: []
created: 2026-07-26T00:00:00Z
type: feature
priority: 3
parent: rankings123
tags: [design, engagement, data-viz]
---
# Interactive performance charts — Awwwards data viz pattern

Awwwards 2026 data viz winners: interactive, not static. "Hover/tap reveals context without cluttering the view." Apply to rankings123: player profile pages get interactive charts — rank over time, head-to-head records, tournament performance. Competitors (live-tennis.eu, FlashScore) show static tables; we show stories.

Gap: Rankings123 has rich live data but no historical visualization. Chart libraries (Recharts, Victory) enable this. Premium 2026 sites make data explorable, not just readable.

## Acceptance Criteria

- Chart library: Recharts (React, lightweight) or Visx (low-level, more control) — choose based on perf testing
- Rank history chart: line graph, last 52 weeks, hover tooltip shows date + rank + points
- Head-to-head: bar chart comparing stats (wins, sets won, surface breakdown)
- Tournament performance: donut chart — R16/QF/SF/W breakdown with segment hover
- Interactive: hover highlights data point, shows tooltip with context, mutes other data
- Mobile: tap interaction, tooltip positioned above finger (not obscured)
- Respect design tokens: accent colors for lines/bars, `text-muted` for axes, `border-edge` for grid
- Accessible: keyboard navigable (arrow keys move between data points), screen reader announces values
- Performance: < 100ms render, throttle hover events (16ms), lazy-load charts (Intersection Observer)
- Skeleton state: gray bars/lines pulse while data loads
- Export: "Share chart" button → generates static PNG (via Satori) for social
- Apply to: `/atp-live/[player]` profile pages, `/wta-live/[player]`, World Cup team pages
- Example: Alcaraz profile → rank history line shows climb from #30 to #1, hover July 20 → tooltip "Rank 1 | 9,675 pts | After Wimbledon W"
