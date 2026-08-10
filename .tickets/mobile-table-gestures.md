---
id: mobile-table-gestures
status: closed
deps: []
links: []
created: 2026-07-19T14:35:36Z
type: feature
priority: 2
parent: rankings123
tags: [design, mobile, ux, tables]
---
# Mobile table interaction patterns — beyond horizontal scroll

Mobile = 42% traffic (analytics). Current WC bracket + large tables require horizontal scroll (noted on /world-cup page). 2026 mobile patterns: swipe gestures, collapsible columns, tap-to-expand details. Rankings tables have 6-8 columns (rank, name, country, points, delta, status) — too wide for mobile. Need smart responsive patterns.

## Acceptance Criteria

- Identify tables > 480px width (ATP deep, WTA full, WC bracket) | - Mobile patterns: Hide less-critical columns (collapse icon), tap row for detail drawer | - Swipe gesture: left = show more columns, right = hide | - Sticky first column (rank + name) during horizontal scroll | - Visual affordance: fade-out edge gradient when more columns exist | - Tap-to-expand: player row opens drawer with full stats (no navigation) | - Haptic feedback on swipe (if haptic-feedback ticket shipped) | - Test on iOS Safari + Android Chrome, 375px to 768px | - No horizontal scroll on < 600px for primary tables

## Closed in backlog triage 2026-08-10
dup: mobile-table-scroll-system
