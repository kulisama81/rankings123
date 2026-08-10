---
id: bug-wc-match-count-mismatch
status: closed
deps: []
links: []
created: 2026-07-04T18:30:00Z
type: bug
priority: 2
parent: rankings123
tags: [bug, worldcup, data, consistency]
---
# World Cup page: match count mismatch (header shows 100, schedule shows 99)

## Acceptance Criteria

1. Investigate the mismatch:
   - Check World Cup data source (`src/lib/worldCupFeed.ts`) for total match count
   - Verify the header calculation logic
   - Verify the schedule filtering/display logic (upcoming vs completed)
   - Determine if there's truly a missing match or if the header count is wrong

2. Fix the root cause:
   - If 100 matches exist: ensure all 100 appear in the schedule (find the missing match)
   - If 99 matches exist: correct the header to show "99 Matches"
   - Ensure header count = upcoming count + results count at all times

3. **REGRESSION TEST REQUIRED** (per CLAUDE.md):
   - Add data-sanity invariant in `scripts/check-data-sanity.mjs`:
     - For World Cup page, verify header match count equals sum of upcoming + completed matches
     - Check: totalMatches === upcomingMatches + completedMatches
   - Test should FAIL with current data (100 ≠ 99), PASS when fixed
   - Run via `npm run check:data-sanity`

4. Verify the fix:
   - Visit https://rankings123.com/world-cup
   - Header match count matches schedule breakdown exactly
   - Manual calculation confirms: total = upcoming + results
   - `npm run check:data-sanity` passes

5. Standard checks:
   - `npm run build` — succeeds
   - `npm test` — all tests green
   - `npx eslint src --max-warnings=0` — clean

6. Live verification after deploy:
   - Visit https://rankings123.com/world-cup
   - Verify header count matches schedule count
   - Spot-check that no matches are missing from schedule
   - `npm run check:data-sanity` passes in production

## Bug Report

**URL:** https://rankings123.com/world-cup

**Severity:** P2 (Medium) — Data consistency issue affecting credibility

**Type:** Data consistency bug — count mismatch between header and schedule

**Description:**
The World Cup page header displays "100 Matches" but the schedule section shows "Upcoming 9 Results 90" which totals only 99 matches. This is a numerical inconsistency that suggests either:
1. A counting bug in the header calculation
2. A missing match in the schedule display
3. Incorrect aggregation of upcoming vs completed matches

**Reproduction Steps:**
1. Visit https://rankings123.com/world-cup
2. Look at the header that displays total match count (shows "100 Matches")
3. Look at the schedule section showing "Upcoming 9 Results 90"
4. Calculate: 9 + 90 = 99, not 100

**Expected Behavior:**
- Header match count should equal the sum of upcoming + completed matches shown in the schedule
- All counts should be consistent across the page
- If there are truly 100 matches in the tournament, all 100 should appear in the schedule

**Actual Behavior:**
- Header claims 100 matches exist
- Schedule only shows 99 matches total (9 upcoming + 90 results)
- Off-by-one error creates inconsistency

**Impact:**
- Damages credibility as a data source
- Users may notice the mismatch and question data accuracy
- Violates the consistency check principle (counts must match content)

## Closed in backlog triage 2026-08-10
obsolete: WC over
