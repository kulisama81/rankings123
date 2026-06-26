---
id: atp-table-regression
status: closed
deps: []
links: [atp-table-loading-failure]
created: 2026-06-26T20:00:00Z
type: bug
priority: 0
parent: rankings123
tags: [bug, atp, data, regression]
---
# REGRESSION: ATP Live ranking table loading failure - shows only one player

## Acceptance Criteria

1. ATP ranking table loads with full dataset (top 1000 players)
2. No "Loading table..." placeholder visible on page load
3. Country filter remains functional
4. **REGRESSION TEST REQUIRED** (critical - this is why the regression wasn't caught):
   - Add test in `tests/atp-ranking-table.test.js` (run via `npm test`)
   - Test must verify:
     - Ranking table renders with >1 player (not just the #1 player)
     - No "Loading table..." text appears in rendered output
     - Table has expected structure (columns for rank, player, points, etc.)
   - Test should FAIL on current code, PASS when fixed
   - This test should have been added per original ticket acceptance criteria but appears missing
5. Run `npm test` — all tests green
6. Run `npm run build` — succeeds
7. Run `npx eslint src --max-warnings=0` — clean
8. Verify on LIVE production (https://rankings123.com/atp-live) after deploy:
   - Full ranking table loads with 1000 players
   - No "Loading..." text visible
   - Country filter works
9. Commit includes the regression test so this doesn't happen again

## Bug Report

**URL:** https://rankings123.com/atp-live

**Severity:** CRITICAL (p0) - Core feature completely broken

**Type:** REGRESSION - Bug was fixed in commit 8ee5be4 but has returned

**Description:**
The ATP Live ranking table only displays a single player (Jannik Sinner #1, 13,460 points) followed by persistent "Loading table..." text. The page header promises "full ranking (top 1000)" but the table never completes loading.

**Reproduction Steps:**
1. Visit https://rankings123.com/atp-live (live production)
2. Observe the ranking table area
3. Only one player is visible with persistent "Loading table..." text below

**Expected Behavior:**
Full ATP ranking table with top 1000 players should load and display (as it did after commit 8ee5be4)

**Actual Behavior:**
Only 1 player shown, "Loading table..." text persists indefinitely

**Impact:**
- Primary ATP ranking feature is non-functional
- Users cannot browse rankings beyond #1
- Regression from previously working state (ticket atp-table-loading-failure was closed after fix)

**Root Cause Investigation Needed:**
- Original fix: commit 8ee5be4 "Fix ATP/WTA Live ranking table loading failure"
- Current HEAD: 269ffce (deployed successfully to production)
- Something between 8ee5be4 and 269ffce broke the table loading again
- The regression test required by the original ticket's acceptance criteria appears to be missing (or it would have caught this)
