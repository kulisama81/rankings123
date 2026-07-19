---
id: bug-atp-r32-zero-delta
status: closed
deps: []
links: []
created: 2026-07-18T00:00:00Z
type: bug
priority: 2
parent: rankings123
tags: [bug, atp, data, consistency]
---
# ATP Live: Players in R32 tournament rounds show Δ=0 despite active participation

**URL:** https://rankings123.com/atp-live

**Severity:** P2 (Medium) — Data consistency issue

**Type:** Data bug — incomplete point change calculation

**Description:**
Multiple players on the ATP Live rankings page show active tournament participation (specifically "R32" - Round of 32) but display Δ=0 (zero point change), suggesting their tournament results haven't been processed into the live points calculation.

**Affected Players (as of 2026-07-18):**
- Ignacio Buse (rank 35): Shows "Generali Open · R32" with Δ=0
- Jan Lennard Struff (rank 47): Shows "Generali Open · R32" with Δ=0
- Raphael Collignon (rank 49): Shows "Generali Open · R32" with Δ=0

**Reproduction Steps:**
1. Visit https://rankings123.com/atp-live
2. Scroll to ranks 35, 47, 49
3. Observe that all three players show "Generali Open · R32" in the tournament column
4. Note that all three show Δ=0 in the point change column
5. Compare with other players who show tournament activity AND non-zero Δ values

**Expected Behavior:**
- Players who reached R32 (Round of 32) in a tournament should show point gains in the Δ column
- Reaching R32 in ATP tournaments typically awards ranking points
- The Δ value should reflect these points, not show 0
- OR: If the tournament is still in progress and points haven't been awarded yet, the UI should indicate this (e.g., "R32 (in progress)" or similar)

**Actual Behavior:**
- Three players all show "Generali Open · R32" indicating they participated and reached that round
- All three show Δ=0, suggesting no points earned
- This creates a data inconsistency: tournament participation without point attribution

**Impact:**
- Undermines trust in the accuracy of the "live" rankings
- Users see tournament activity but no corresponding point changes, suggesting incomplete data
- May affect other tournaments/rounds beyond just R32

**Possible Root Causes:**
- Point change calculation may not be updating for R32 results
- Tournament results may be fetched but points calculation lags behind
- ESPN feed may provide tournament stage info but not yet update the points
- Feed merge logic may not be correctly calculating points for R32 rounds specifically

## Acceptance Criteria

1. Investigate the three affected players:
   - Check ESPN API response for Buse, Struff, and Collignon
   - Verify their actual R32 results in the Generali Open
   - Determine if they should have earned points for reaching R32

2. Investigate the Δ calculation for R32 participants:
   - Check `src/lib/liveFeed.ts` and ATP live point calculation logic
   - Verify how points are calculated for players at different tournament stages
   - Determine why R32 participants show Δ=0 when other rounds show point changes

3. Fix the root cause:
   - **If points should be awarded:** Fix the calculation to include R32 results in the Δ value
   - **If tournament is in progress:** Add UI indication that points are pending (e.g., "(live)" or "TBD")
   - **If this is a feed limitation:** Document the limitation and consider hiding Δ for unfinished matches

4. **REGRESSION TEST REQUIRED** (per CLAUDE.md):
   - Add data-sanity check in `scripts/check-data-sanity.mjs`:
     - For ATP live rankings, check that players with tournament stage info (R32, R16, QF, etc.) either:
       - Have non-zero Δ values (points awarded), OR
       - Have explicit "in progress" indicators, OR
       - Show no tournament info at all
     - Flag cases where tournament stage is shown but Δ=0 and tournament is marked as completed
   - Alternatively, add test in `tests/atp-tournament-delta-consistency.test.mjs`:
     - Mock a player with "R32" tournament status
     - Verify that if tournament is complete, Δ > 0 (R32 awards points)
     - Verify that if tournament is in progress, Δ is shown appropriately
   - Test should FAIL with current data (Buse/Struff/Collignon showing R32 with Δ=0)
   - Test should PASS after fix
   - Run via `npm test` or `npm run check:data-sanity`

5. Verify the fix locally:
   - Visit http://localhost:3000/atp-live
   - Check that players with R32 tournament stages show appropriate Δ values
   - Verify no players show tournament participation with inconsistent Δ=0
   - `npm test` — all tests green
   - `npm run build` — succeeds
   - `npx eslint src --max-warnings=0` — clean

6. Live verification after deploy:
   - Visit https://rankings123.com/atp-live
   - Verify Buse, Struff, and Collignon (or current R32 participants) show consistent tournament/Δ data
   - Spot-check other tournament rounds (R16, QF, etc.) for consistency
   - `npm run check:data-sanity` passes in production
   - Verify Vercel build succeeded: `gh api repos/kulisama81/rankings123/commits/HEAD/status`
