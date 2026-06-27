---
id: bug-atp-jodar-rank-jump
status: open
deps: []
links: []
created: 2026-06-27T18:05:42Z
type: bug
priority: 2
parent: rankings123
tags: [bug, atp, data]
---
# ATP Live: Rafael Jodar shows implausible +867 rank jump

## Bug Report

**URL:** https://rankings123.com/atp-live

**Severity:** P2 (Medium) — Data consistency issue affecting credibility

**Type:** Data bug — likely feed calculation or parsing error

**Description:**
Player Rafael Jodar (rank #29) displays a movement indicator of **▲867**, suggesting he jumped 867 positions in a single ranking period. This is statistically implausible for professional ATP rankings and indicates either:
1. Data processing error in live ranking calculation
2. Feed parsing issue from ESPN data
3. Incorrect handling of players entering rankings from unranked status

**Reproduction Steps:**
1. Visit https://rankings123.com/atp-live
2. Scroll to rank #29 (Rafael Jodar)
3. Observe the rank movement indicator shows "+867" or "▲867"
4. Compare with other players' movements (typically ±1-20 positions)

**Expected Behavior:**
- Rank movements should reflect realistic single-period changes (typically ±1-50 positions for most players)
- Exceptional movements (>100 positions) should be rare and verified against official ATP data
- If a player is newly ranked (entering from unranked), the movement indicator should show a special marker or "NEW" instead of a numeric jump

**Actual Behavior:**
- Rafael Jodar shows ▲867 movement alongside rank #29 and 1,859 live points
- This magnitude is an extreme outlier compared to all other displayed players
- No indication this is a special case (new entry, data error, etc.)

**Impact:**
- Damages site credibility as a reliable data source
- Users may question accuracy of all ranking data
- Undermines trust needed for monetization and growth

## Acceptance Criteria

1. Investigate Rafael Jodar's data in the feed:
   - Check ESPN API response for his ranking history
   - Verify how `src/lib/liveFeed.ts` calculates rank movement
   - Determine if he was previously unranked (not in top ~1000)

2. Fix the root cause:
   - If newly ranked: display "NEW" or "↑" instead of ▲867
   - If data error: correct the movement calculation logic
   - If feed issue: add validation/sanitization in feed parsing

3. **REGRESSION TEST REQUIRED** (per CLAUDE.md):
   - Add data-sanity invariant in `scripts/check-data-sanity.mjs`:
     - Check ATP/WTA live rankings for implausible single-period movements (e.g., >200 positions)
     - Flag movements >200 as anomalies requiring investigation
     - Allow exceptions for documented special cases (newly ranked players)
   - Test should FAIL with current Jodar data, PASS when fixed
   - Run via `npm run check:data-sanity`

4. Verify the fix:
   - Rafael Jodar's movement indicator shows realistic value or "NEW" marker
   - No other players show implausible jump values (>200)
   - `npm run check:data-sanity` passes

5. Standard checks:
   - `npm run build` — succeeds
   - `npm test` — all tests green
   - `npx eslint src --max-warnings=0` — clean

6. Live verification after deploy:
   - Visit https://rankings123.com/atp-live
   - Verify Rafael Jodar (or any player at #29) shows realistic movement
   - Spot-check other players' movements are plausible
   - `npm run check:data-sanity` passes in production data

## Related Tickets

Similar data consistency issues tracked via `data-anomaly` (automated monitor) and `data-sanity-validator` (infrastructure).
