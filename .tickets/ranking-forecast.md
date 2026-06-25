---
id: ranking-forecast
status: open
deps: []
links: []
created: 2026-06-25T13:49:32Z
type: feature
priority: 1
parent: rankings123
tags: [tennis, parity, engagement, differentiation]
---
# Tennis ranking forecast: 5-week projection (ATP/WTA)

Add multi-week ranking projections showing how ATP/WTA standings will likely evolve based on upcoming tournament schedule and points dropping. Routes: /atp/forecast and /wta/forecast. Show current rank, projected rank in 1/2/3/4/5 weeks, change delta, and key tournaments affecting each player. Requires: tournament calendar with point distributions, points-to-defend data per player, and projection algorithm (assume current form or use historical performance). This is a MAJOR feature on live-tennis.eu (/forecast-atp-ranking) that we lack.

## Acceptance Criteria

✓ /atp/forecast and /wta/forecast routes exist
✓ Table shows: current rank, player name, current points, projected points (1-5 weeks), projected rank movement
✓ Projection algorithm accounts for:
  - Points dropping (defended points from same tournament last year)
  - Upcoming tournament schedule (with point distributions by round)
  - Conservative assumption: players maintain current form OR use recent performance
✓ Color-coded rank changes (green = up, red = down, gray = no change)
✓ Filterable by timeframe (1 week, 2 weeks, 3 weeks, 4 weeks, 5 weeks)
✓ Updates daily as tournament schedules evolve
✓ Mobile responsive, design system
✓ Source flag visible (projection = calculated, not official)
✓ SEO optimized (meta tags, structured data)
✓ Test: verify projections are reasonable (spot-check top 10 vs ATP/WTA official forecasts if available)

## Notes

**2026-06-25 — ROI Justification (First Principles):**

FUNDAMENTAL TRUTH: Users don't just want to know "who's #1 now" — they want to know "who will be #1 next week/next month". Rankings are PREDICTIVE, not just historical. Fantasy tennis, betting, coaching, and fan engagement all depend on forward-looking data.

COMPETITIVE GAP: live-tennis.eu has a FULL 5-WEEK RANKING FORECAST feature (/forecast-atp-ranking, /forecast-wta-ranking, /forecast-atp-doubles-ranking, /forecast-wta-doubles-ranking). We have NOTHING. This is a major parity gap.

WHAT IT SERVES:
- Betting/fantasy users: "Will Sinner hold #1 if he loses early at Wimbledon?"
- Coaches/analysts: "What does Alcaraz need to do to overtake Djokovic?"
- Fans: "Can [favorite player] break into top 10 this month?"
- Return-driver: Users check WEEKLY to see how projections change

SEARCH DEMAND:
- "ATP ranking forecast" - 5K/mo
- "WTA ranking projection" - 2K/mo
- "tennis ranking next week" - 10K/mo

IMPACT vs EFFORT:
- Impact: HIGH - major differentiator, high return frequency (users check weekly), SEO long-tail, establishes us as MORE comprehensive than basic ranking sites
- Effort: MEDIUM-HIGH - requires tournament calendar integration, points-to-defend data layer, projection algorithm
- ROI: HIGH - this is a feature that keeps users coming back repeatedly (not one-and-done)

DEPENDENCIES: Needs tournament schedule data (ESPN has this via /tennis/{atp|wta}/scoreboard) and points-to-defend calculation per player.

BLOCKING NONE: This is a standalone feature that can ship independently.
