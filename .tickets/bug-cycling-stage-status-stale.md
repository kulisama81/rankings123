---
id: bug-cycling-stage-status-stale
status: closed
deps: []
links: []
created: 2026-07-16T18:05:18Z
type: bug
priority: 2
parent: rankings123
tags: [bug, cycling, data, consistency]
---
# Tour de France: Stage status stale (shows 'Stage 11 in progress' when Stage 12 completed)

## Acceptance Criteria

1. Identify where the "Stage X in progress" status is determined
2. Fix logic to:
   - Show the most recently completed stage if no stage is currently in progress
   - OR show "Stage X in progress" for the current day's stage
   - Ensure it updates daily as stages complete
3. Verify the status matches the actual race progress (stages table + timestamp)
4. **REGRESSION TEST REQUIRED:**
   - Add test in `tests/cycling-stage-status.test.js` (run via `npm test`)
   - Test must verify:
     - Fetch Tour de France data
     - Extract current stage status from header
     - Extract most recent completed stage from results table
     - Assert the status reflects the correct stage (current or most recent)
   - Test should FAIL on current code, PASS when fixed
5. Run `npm test` — all tests green
6. Run `npm run build` — succeeds
7. Verify on LIVE production:
   - Visit https://rankings123.com/cycling
   - Stage status matches actual race progress
   - Test on multiple days to ensure it updates properly

## Bug Report

**URL:** https://rankings123.com/cycling

**Severity:** p2 - Data consistency issue, misleading users about current race progress

**Description:**
The Tour de France page header displays "Stage 11 in progress" but Stage 12 (scheduled for July 16, 2026) has already been completed with Tim Merlier listed as the winner. The stage status indicator is stale and not reflecting the actual race progress.

**Reproduction Steps:**
1. Visit https://rankings123.com/cycling
2. Check the page header/subtitle - it says "Stage 11 in progress"
3. Look at the stages table
4. Stage 12 (July 16) shows a completed result with Tim Merlier as winner
5. The timestamp shows "Jul 16, 6:00 PM UTC"

**Expected Behavior:**
The page should show "Stage 12" as the current/most recently completed stage, OR show "Stage 13 in progress" if Stage 13 has started.

**Actual Behavior:**
Header says "Stage 11 in progress" despite Stage 12 being completed.

**Impact:**
- Users are misled about which stage of the race is currently happening
- Data appears stale/not updated
- Undermines trust in live race tracking

**Root Cause:**
The stage status logic is not updating properly when a new stage completes. Likely the status is only updated on initial page load with cached race data, not reflecting the most recent completed stage from the results table.
