---
id: wta-missing-tournament-data
status: open
deps: []
links: []
created: 2026-07-06T18:00:00Z
type: bug
priority: 2
parent: rankings123
tags: [bug, wta, data]
---
# WTA Live: Missing tournament data for some players (shows "—")

## Bug Report

**URL:** https://rankings123.com/wta-live

**Severity:** MEDIUM (p2) - Data inconsistency affecting user experience

**Description:**
Several WTA players show "—" (em dash) for tournament status instead of proper tournament information (e.g., "Wimbledon · out"). Some players also show "——" (double em dash) where tournament details should appear, suggesting incomplete data.

**Examples:**
- Victoria Mboko (#11): Shows "—" for tournament status
- Hailey Baptiste (#33): Shows "——" for tournament details
- Emma Raducanu (#34): Shows "——" for tournament details
- Victoria Mboko (#11): Shows "▼1" ranking movement but "—" for point changes (Δ), which is contradictory

**Reproduction Steps:**
1. Visit https://rankings123.com/wta-live
2. Scroll through the ranking table
3. Observe players with "—" or "——" in tournament status column
4. Note inconsistent data presentation vs. other players who show proper tournament info

**Expected Behavior:**
All players should have consistent tournament data:
- Either show tournament name and status (e.g., "Wimbledon · out")
- OR show a consistent "no tournament" indicator for all players not in a tournament
- Point deltas should be consistent with ranking movement arrows

**Actual Behavior:**
Inconsistent display with "—" and "——" mixed with proper tournament data

**Impact:**
- Data inconsistency confuses users
- Unclear whether "—" means "no data," "not playing," or something else
- Contradictory ranking movement vs. point changes

## Acceptance Criteria

1. All WTA players show consistent tournament status:
   - Either proper tournament name + status
   - OR a consistent indicator for "not in tournament" (applied to ALL such players)
2. No "—" or "——" placeholders in the table
3. Ranking movement arrows (▲/▼) consistent with point deltas
4. Data source properly handles missing/null tournament data
5. **REGRESSION TEST REQUIRED:**
   - Add test in `tests/wta-tournament-data.test.js` (run via `npm test`)
   - Test must verify:
     - WTA ranking data structure has consistent tournament fields
     - No "—" or "——" strings in rendered tournament status
     - Ranking movement direction matches point delta sign
   - Include `scripts/check-data-sanity.mjs` invariant:
     - Check WTA data for "—" placeholders
     - Verify movement/delta consistency
   - Test should FAIL on current data, PASS when fixed
6. Run `npm test` — all tests green
7. Run `npm run check:data-sanity` — passes
8. Run `npm run build` — succeeds
9. Verify on LIVE production after deploy:
   - Visit https://rankings123.com/wta-live
   - All players show consistent tournament data
   - No "—" placeholders visible
