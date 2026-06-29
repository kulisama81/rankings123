---
id: wta-live-table-truncated
status: closed
deps: []
links: []
created: 2026-06-29T05:08:09Z
type: bug
priority: 0
parent: rankings123
tags: [bug, wta, ui]
---
# WTA Live table only shows 1 player instead of full rankings

**URL:** https://rankings123.com/wta-live

**Repro steps:**
1. Navigate to https://rankings123.com/wta-live
2. Observe the ranking table

**Expected:**
- Full WTA rankings table with many players
- Multiple rows of data visible

**Actual:**
- Only 1 player visible (Aryna Sabalenka at #1)
- No other players shown in the table
- Table lacks the multi-row structure expected from a comprehensive rankings display

**Severity:** P0 - Core feature is broken. The live ranking page is unusable as it only shows 1 player instead of the full leaderboard.

## Acceptance Criteria

- [ ] WTA Live page displays multiple players (at minimum top 100)
- [ ] Table shows full rankings data
- [ ] Regression test added in `tests/` that verifies the table has > 1 row of data (run via `npm test`)
