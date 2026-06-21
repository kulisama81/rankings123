---
id: rank-change-animations
status: open
deps: []
links: []
created: 2026-06-21T12:00:00Z
type: feature
priority: 2
parent: rankings123
tags: [design, ui, engagement]
---
# Smooth rank change animations (live update micro-interactions)

When rankings refresh (20s auto-refresh), animate rank position changes smoothly instead of instant swap. Show old rank → new rank transition with slide/fade, plus flash highlight on the changed row. Helps viewers track movement in real-time; makes "live" feel tangible. Inspired by sports scoreboards and Awwwards data viz best practices.

## Acceptance Criteria

- Rank changes animate smoothly when data refreshes (200–300ms transition)
- Visual treatment: row flash (accent color bg fade), rank number count-up/down
- Movement indicators (▲▼) appear with animation, not instant pop
- Works on: LiveRankingTable (ATP/WTA), AtpDeepRankingTable, WorldCupTable
- GPU-efficient (transform/opacity only, no layout thrashing)
- Respects prefers-reduced-motion (instant update, no animation)
- Per-sport accent colors used for flash highlight
- Smooth even when multiple ranks change simultaneously (stagger if >5 changes)

## References

- Current count-up animation (expand to rank positions)
- Awwwards data viz: smooth state transitions (not jarring swaps)
- GSAP/Framer Motion patterns for list reordering
- ESPN/SofaScore live score animations
