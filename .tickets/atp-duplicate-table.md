---
id: atp-duplicate-table
status: closed
deps: []
links: []
created: 2026-07-06T18:00:00Z
type: bug
priority: 1
parent: rankings123
tags: [bug, atp, ui, rendering]
---
# ATP Live ranking table renders twice (duplicate content)

## Acceptance Criteria

1. ATP ranking table renders only once on the page
2. No duplicate player lists appear
3. Page maintains full functionality (pagination, filters, live updates)
4. **REGRESSION TEST REQUIRED:**
   - Add test in `tests/atp-ranking-table.test.js` (run via `npm test`)
   - Test must verify:
     - Ranking table component renders exactly once in the DOM
     - No duplicate table elements with same content
     - Use querySelector/querySelectorAll to count table instances
   - Test should FAIL on current code (finds 2 tables), PASS when fixed (finds 1)
5. Run `npm test` — all tests green
6. Run `npm run build` — succeeds
7. Run `npx eslint src --max-warnings=0` — clean
8. Verify on LIVE production after deploy:
   - Visit https://rankings123.com/atp-live
   - Only one ranking table visible
   - No duplicate player listings

## Bug Report

**URL:** https://rankings123.com/atp-live

**Severity:** HIGH (p1) - Visual bug affecting user experience

**Description:**
The ATP Live ranking table is rendered twice on the page with identical data (players 1-50). Both tables display the same content, creating redundancy and confusion about whether the page loaded correctly.

**Reproduction Steps:**
1. Visit https://rankings123.com/atp-live
2. Scroll down the page
3. Observe two identical ranking tables showing players 1-50
4. The duplication includes both the main table and a summary chart listing the same players

**Expected Behavior:**
Ranking table should appear once on the page

**Actual Behavior:**
Table content is duplicated, showing the same 50 players twice

**Impact:**
- Poor user experience
- Wasted screen space
- May confuse users about data correctness
- Page appears longer than necessary
