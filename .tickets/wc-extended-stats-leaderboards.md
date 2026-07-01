---
id: wc-extended-stats-leaderboards
status: open
deps: []
links: []
created: 2026-07-01T13:50:23Z
type: feature
priority: 2
parent: rankings123
tags: [worldcup, stats, engagement]
---
# World Cup: Extended stats leaderboards (clean sheets, saves, tackles, distance)

Add 8+ stat leaderboards beyond goals/assists: clean sheets, saves, tackles, distance covered, sprint count, pass accuracy, shots on target, fouls. Competitors (SofaScore, FotMob, ESPN) all have these. Stat enthusiasts drive repeat visits.

## Acceptance Criteria

✓ New stats pages at /world-cup/stats/[category]
✓ Clean sheets leaderboard (goalkeepers)
✓ Saves leaderboard (goalkeepers)
✓ Tackles leaderboard
✓ Distance covered leaderboard
✓ Pass accuracy leaderboard
✓ Shots on target leaderboard
✓ Yellow/red cards leaderboard
✓ Data from ESPN or similar source (with mock fallback)
✓ Each leaderboard: player name, team, stat value, games played
✓ Mobile responsive tables
✓ Link from main World Cup page
✓ SEO: metadata for each stat page

**Impact:** MEDIUM-HIGH — closes parity gap, drives repeat visits from stat enthusiasts
**Effort:** MEDIUM — extend worldCupFeed with additional stats
**ROI:** HIGH — differentiation + engagement depth
