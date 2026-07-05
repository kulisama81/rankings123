---
id: tennis-live-streak-badges
status: open
deps: []
links: []
created: 2026-07-05T13:51:23Z
type: feature
priority: 2
parent: rankings123
tags: [tennis, engagement, differentiation]
---
# Tennis: Win/loss streak badges on ranking tables

Add visual streak indicators to ATP/WTA live ranking tables: green 🔥 badges for win streaks, red ❄️ for loss streaks (e.g., 'W5', 'L3'). Differentiates from competitors; drives engagement. Source: last 5-10 match results from ESPN.

## Acceptance Criteria

✓ Streak indicator column added to ATP/WTA live ranking tables
✓ Shows current win/loss streak: "W5", "L3", etc.
✓ Visual treatment: green 🔥 for wins, red/gray for losses
✓ Hover tooltip: "5-match win streak" or "Last 5: W-W-L-W-W"
✓ Source: ESPN player recent results (last 5-10 matches)
✓ Mobile: condensed view (icon + number)
✓ Updates in real-time as tournaments progress

## Notes

**2026-07-05**

**ROI (First Principles):** Engagement driver. World Cup golden-boot page has 281.9s avg session + 0% bounce because it's a LIVE, DYNAMIC leaderboard users return to. Streak badges add similar "living data" to tennis rankings — users can see who's hot/cold at a glance. Differentiates from live-tennis.eu (they don't have this). ESPN/Sofascore have form indicators; we should match. Effort: MEDIUM (need to fetch/parse recent match results). Impact: MEDIUM-HIGH (engagement, distinctiveness).
