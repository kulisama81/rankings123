---
id: wc-player-stats-extended
status: open
deps: []
links: []
created: 2026-06-23T13:51:38Z
type: feature
priority: 2
parent: worldcup
tags: [worldcup, engagement, stats]
---
# World Cup player stats leaderboards (beyond golden boot)

Extended player statistics leaderboards beyond goals/assists: fastest sprint speed, most distance covered, most passes completed, most saves (GK), most tackles, most interceptions, etc. Uses ESPN player stats API data we already fetch. Engaging content that differentiates from basic standings. Low-medium effort (data available, just surface it in leaderboard tables).

**ROI:**
- **Impact:** MEDIUM (engaging content, shareable stats, differentiates from ESPN/FIFA basic tables)
- **Effort:** LOW-MEDIUM (ESPN API likely has this data; if not, defer until better source found)
- **Revenue:** Moderate (more pages = more ad inventory, but not primary traffic driver)
- **CX:** High (fans love detailed stats — "fastest player" / "most distance" are discussion fodder)

## Acceptance Criteria

1. Investigate ESPN API for extended player stats (speed, distance, passes, saves, tackles, interceptions, etc.)
2. If available: create /world-cup/stats page with leaderboard tables for 3-5 stat categories beyond goals/assists
3. If NOT available in ESPN: mark ticket blocked and document what's needed (alternative API, or defer)
4. No fabricated stats (CX FIRST principle)
5. Build/lint green, live-verified

## Notes

**2026-06-23 (autoresearch):** Verify ESPN API capabilities first. If stats unavailable, consider xG sources (xGscore, RealGM) or defer until post-tournament when FIFA releases full stats.
