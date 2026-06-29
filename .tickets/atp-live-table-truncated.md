---
id: atp-live-table-truncated
status: in_progress
deps: []
links: []
created: 2026-06-29T05:08:05Z
type: bug
priority: 0
parent: rankings123
tags: [bug, atp, ui]
---
# ATP Live table only shows 1 player instead of full rankings

**URL:** https://rankings123.com/atp-live

**Repro steps:**
1. Navigate to https://rankings123.com/atp-live
2. Observe the ranking table

**Expected:**
- Full ATP rankings table with 1000+ players
- Pagination controls to navigate through the rankings
- Multiple rows of data visible

**Actual:**
- Only 1 player visible (Jannik Sinner at #1 with 13,460 points)
- No other players shown despite page claiming "full ranking (top 1000)"
- No pagination controls visible

**Severity:** P0 - Core feature is broken. The live ranking page is unusable as it only shows 1 player instead of the full leaderboard.

## Acceptance Criteria

- [ ] ATP Live page displays multiple players (at minimum top 100, ideally all 1000+)
- [ ] Pagination controls are visible and functional
- [ ] Regression test added in `tests/` that verifies the table has > 1 row of data (run via `npm test`)
