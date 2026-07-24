---
id: data-tooltip-overlays
status: closed
deps: []
links: []
created: 2026-07-12T07:35:00Z
type: feature
priority: 2
parent: rankings123
tags: [design, engagement, ux]
---
# Interactive data tooltip overlays (hover/tap context)

Add interactive tooltips on hover (desktop) / tap (mobile) for key data points — rankings, points, movement deltas, player stats. Provides context without cluttering the view. Award-winning 2026 data viz pattern (Awwwards: Cleo AI, People's Audit).

## Acceptance Criteria

- Tooltips appear on hover (desktop) or tap (mobile) for:
  - Rank numbers → "Current rank, up from #X last week"
  - Points → "Total points: breakdown by tournament tier"
  - Movement badges (▲▼) → "Up 3 spots since last update"
  - Player names → Quick stats (age, country, recent form)
- Tooltip styling: rounded card, subtle shadow, per-sport accent border, dark/light theme support
- Smooth fade-in animation (150ms)
- Accessible: keyboard-navigable (focus visible), screen-reader friendly
- Mobile: tap to show, tap outside to dismiss (no hover conflict)
- Works on: LiveRankingTable, AtpDeepRankingTable, WorldCupTable
- Performance: no layout shift, GPU-efficient

## ROI

Award-winning data viz sites (2026 Awwwards winners) all use interactive tooltips — table-stakes for premium data products. Adds context without clutter, increases engagement (users explore vs passive scroll), quick implementation (~3-4h). Differentiates from competitors (live-tennis.eu has static data).

## References

- Awwwards 2026 data viz winners: Cleo AI, People's Audit (interactive tooltips standard)
- Abstract Sports 2026: "raw data isn't enough" — need context and storytelling
- Existing AnimatedNumber component (extend hover/tap interactions)
