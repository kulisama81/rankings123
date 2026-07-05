---
id: live-match-tracker-widget
title: Live match tracker widget (gamification & urgency)
status: open
type: feature
priority: 2
tags:
  - design
  - worldcup
parent: rankings123
created: 2026-07-05
---

## Problem
2026 sports viz trend (Beyond Sports): "interactive over linear" + "gamified experiences" are key to engaging modern fans. Current site shows static rankings; no sense of urgency or real-time match activity. During World Cup 2026 (LIVE NOW through ~July 19), we need to capture attention and create FOMO.

## Solution
Add a **sticky live match tracker widget** (top or sidebar) that shows:
- **Matches in progress RIGHT NOW** (live scores, minute marker, pulsing live dot)
- **Countdown to next match** (creates urgency: "Next match in 1h 23m")
- Click to expand for more detail or navigate to match page

Widget appears ONLY when matches are live or upcoming within 3 hours (not always-on clutter).

## Acceptance Criteria
- [ ] Sticky widget (top bar or floating sidebar, doesn't obscure main content)
- [ ] Shows 1-3 matches currently in progress (live scores, minute, pulsing dot)
- [ ] Countdown timer to next match (updates every second, formatted "Xh Ym")
- [ ] Only visible when matches live OR next match < 3h away
- [ ] Click to navigate to World Cup match page or expand details
- [ ] Dismissible (close X, preference saved to localStorage for 24h)
- [ ] Respects `prefers-reduced-motion` (no pulsing dot, instant timer updates)
- [ ] Mobile-friendly (collapses to compact view, swipeable if multiple matches)
- [ ] Works for World Cup initially; extensible to ATP/WTA tournaments later

## Design Notes
- Use accent color (World Cup green) for live indicators
- Compact layout: `[LIVE] ARG 2-1 BRA 67' | Next: FRA vs GER in 1h 23m [×]`
- Subtle entrance animation (slide down from top)
- Test with `check:core-features` to ensure it doesn't cover rankings

## ROI
Medium effort (~4-5h) for high engagement impact during World Cup. Creates urgency, gamification, and real-time feel. Aligns with 2026 trend toward interactive sports experiences. Could significantly boost time-on-site during tournament.
