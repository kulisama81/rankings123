---
id: bug-atp-inplay-count-regression
status: open
deps: []
links: []
created: 2026-07-26T05:06:01Z
type: bug
priority: 2
parent: rankings123
tags: [bug, atp, consistency, regression]
---
# ATP Live: 'In play' count shows 3 but only 1 player actively competing (regression)

## Bug Report

**URL:** https://rankings123.com/atp-live  
**Inspection Date:** 2026-07-25  
**Severity:** P2 (Medium) — Data consistency bug affecting credibility  
**Type:** Regression — Related to closed ticket `bug-atp-in-play-count-mismatch` (closed 2026-07-20)

## Description

The ATP Live rankings page header badge displays "3 In play overall" but only **1 player** in the entire ranking table is actually actively competing in a tournament (not eliminated). This is a classic consistency bug where a count badge contradicts the visible data.

This appears to be a regression or incomplete fix of the previously closed ticket `bug-atp-in-play-count-mismatch` which reported the same type of issue on July 20, 2026.

## Reproduction Steps

1. Visit https://rankings123.com/atp-live
2. Look at the header badge showing "3 In play overall"
3. Scan the entire ranking table across all pages/ranks
4. Count players with ACTIVE tournament status (not "out")
5. **Result:** Only Alexander Blockx (BEL, rank 35) shows "Millennium Estoril Open · F" (Finals) - all other players showing tournament references have "out" status

## Expected vs Actual

**Expected:** The "In play overall" badge count should match the number of players actively competing in tournaments (not eliminated).

**Actual:** Badge shows "3" but only 1 player is actually competing. The count is 300% inflated.

## Active Players Found

- **Alexander Blockx** (Rank 35, BEL): Millennium Estoril Open, Finals round

All other players either show no tournament info or show "out" (eliminated) status.

## Impact

- Damages credibility as a data source
- Creates user confusion when badge count doesn't match visible data
- Violates the consistency principle per CLAUDE.md (legend states that don't appear in data)
- Regression of a previously "fixed" issue suggests incomplete solution

## Root Cause Analysis Needed

The original ticket suggested the badge might be showing:
- A cached/stale count
- Count from a broader data set not filtered properly
- Count including eliminated ("out") players incorrectly

## Acceptance Criteria

1. **Investigate the root cause:**
   - Review the "In play" count calculation logic in the ATP live feed/component
   - Determine why the count shows 3 when only 1 player is actively competing
   - Check if this is counting "out" players incorrectly
   - Review the fix from `bug-atp-in-play-count-mismatch` to understand what was done

2. **Fix the count logic:**
   - Ensure "In play" count ONLY includes players actively competing (not eliminated)
   - Badge should show "1" when only 1 player is in an active tournament round
   - If the badge represents "across all pages", clarify this in the UI

3. **REGRESSION TEST REQUIRED** (per CLAUDE.md):
   - Add test in `tests/atp-inplay-count.test.js` (run via `npm test`):
     - Fetch ATP live data
     - Count players with active tournament status (not "out")
     - Verify badge count matches this number exactly
     - Test should FAIL on current code (3 ≠ 1), PASS when fixed
   - OR add invariant to `scripts/check-data-sanity.mjs`:
     - For ATP page, verify "In play" count matches number of players with active tournament participation
     - Should fail with current data, pass when fixed

4. **Verify the fix locally:**
   - Visit http://localhost:3000/atp-live
   - Check badge shows accurate count of actively competing players
   - Manually count players in tournament rounds vs badge
   - `npm test` — all tests green including new regression test

5. **Standard checks:**
   - `npm run build` — succeeds
   - `npx eslint src --max-warnings=0` — clean
   - `npm run check:data-sanity` — passes

6. **Live verification after deploy:**
   - Visit https://rankings123.com/atp-live
   - Verify "In play" badge count matches actual actively competing players
   - Check across multiple tournament days to ensure it stays accurate
   - Regression test passes in CI

## Related Tickets

- `bug-atp-in-play-count-mismatch` (closed 2026-07-20) — Original ticket for similar issue
- `bug-wta-inplay-delta-mismatch` (open) — Similar issue on WTA side
