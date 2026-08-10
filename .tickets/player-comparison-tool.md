---
id: player-comparison-tool
status: closed
deps: []
links: []
created: 2026-07-05T07:33:00Z
type: feature
priority: 3
parent: rankings123
tags: [design, interactive]
---
# Interactive player comparison tool (head-to-head)

## Acceptance Criteria

- [ ] Player search with autocomplete (top 100 ATP/WTA)
- [ ] Select 2 players to compare
- [ ] Display side-by-side: rank, points, age, nationality, current tournament, tournaments won this year, head-to-head record (if available)
- [ ] Visual comparison bars (e.g., points as horizontal bars, scaled to max)
- [ ] Shareable URL with query params (`?compare=player1,player2`)
- [ ] Works on mobile (stacks vertically on small screens)
- [ ] Accessible (keyboard navigation, screen reader friendly)
- [ ] Uses design tokens (accent colors for active player, per-sport accent)
- [ ] Fast (<200ms to render comparison after selection)

## Problem

2026 sports viz trend: "interactive over linear" — fans want to actively explore data, not just passively scroll. Current site is 100% static tables. No interactive tools to engage users or encourage repeat visits. Competitor sites (SofaScore, FlashScore) have H2H comparisons.

## Solution

Add an **interactive player comparison tool** for ATP/WTA:
- Select 2 players (autocomplete search)
- Side-by-side stat comparison: rank, points, tournaments won, current form, head-to-head record
- Visual bars/charts for quick comparison (e.g., points bar graph)
- Shareable comparison link (query params: `?compare=djokovic,alcaraz`)

## Design Notes

- Modal or dedicated `/compare` page (decide based on UX flow)
- Use accent color for visual bars (ATP lime, WTA magenta)
- Clear "Reset" and "Share" buttons
- Fallback for missing data (e.g., no H2H if players never met)

## ROI

Medium-high effort (~5-6h) for high engagement and differentiation. Competitors have this; we don't. Interactive tools drive repeat visits and social sharing (users share comparisons). Aligns with 2026 "interactive over linear" trend.

## Closed in backlog triage 2026-08-10
dup: tennis-h2h-tool
