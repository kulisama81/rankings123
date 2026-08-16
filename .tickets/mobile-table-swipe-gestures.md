---
id: mobile-table-swipe-gestures
status: open
deps: []
links: []
created: 2026-08-16T13:50:47Z
type: feature
priority: 1
parent: rankings123
tags: [mobile, ux, engagement]
---
# Mobile Ranking Tables — Swipe Gestures + Progressive Disclosure

Mobile-native swipe gestures for ranking tables. Current: horizontal scroll (friction). New: swipe to reveal details, tap to expand.

Pattern from SofaScore/FlashScore: Default view (rank+player+points), swipe left (reveal tournaments/movement), tap (expand accordion).

## Acceptance Criteria

✅ Mobile-only (<768px): Swipe gestures on table rows
✅ Default: Rank, Player, Points visible
✅ Swipe left: Reveal Tournaments, Movement, Last Event
✅ Tap row: Expand full stats
✅ Visual swipe affordance
✅ Pull-to-refresh
✅ 60fps animations
✅ Works on ATP/WTA Live + Race tables
✅ Desktop unaffected
✅ Mobile Chrome + Safari tested
