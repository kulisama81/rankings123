---
id: table-hover-premium
status: open
deps: []
links: []
created: 2026-06-28T14:32:29Z
type: feature
priority: 3
parent: rankings123
tags: [design]
---
# Premium table row hover micro-interactions

Elevate table hover states with smooth, premium micro-interactions. Currently rows have basic hover; need subtle scale/translate/glow that feels expensive.

## Acceptance Criteria

- Table rows (LiveRankingTable, WorldCupTable, etc.) have 150-200ms smooth transitions
- Hover effect: subtle bg change + 1px translate-x OR subtle accent-colored left border glow
- Respects prefers-reduced-motion
- GPU-cheap (transform/opacity only, no width/height)
- Consistent across all table components
- Feels smoother than competitors (live-tennis.eu, FlashScore)
