---
id: bug-atp-wta-duplicate-table-regression
status: open
deps: []
links: []
created: 2026-08-01T05:08:34Z
type: bug
priority: 1
parent: rankings123
tags: [bug, atp, wta, performance, regression]
---
# ATP/WTA duplicate table rendering persists despite fix (regression)

## Bug Report

**URLs:**
- https://rankings123.com/atp-live
- https://rankings123.com/wta-live

**Severity:** P1 (High) — Performance regression affecting page weight and UX

**Type:** Regression — Commit 19712c8 (2026-07-18) "Optimize ATP/WTA Live page sizes by removing duplicate table rendering" claimed to fix this issue, but duplicate tables persist.

**Description:**
Both ATP Live and WTA Live ranking pages render TWO complete identical ranking tables with the same data:
1. A detailed table with full columns (rank, player, points, tournament, etc.)
2. A condensed/mobile-responsive version of the exact same data

This duplication doubles the page weight, wastes bandwidth, degrades performance, and creates a poor user experience with redundant content.

**Reproduction Steps:**
1. Visit https://rankings123.com/atp-live
2. Scroll down the page
3. Observe TWO complete ranking tables displaying identical data (top 50 players)
4. Same issue occurs on https://rankings123.com/wta-live

**Expected Behavior:**
Only ONE ranking table should be rendered. The table should be responsive (adapt to mobile/desktop) without duplicating all the data in the HTML.

**Actual Behavior:**
Two complete tables with identical content are rendered on both ATP and WTA pages.

**Impact:**
- **Performance:** Doubles the page weight, slower load times
- **UX:** Redundant content confuses users
- **Regression:** Contradicts the optimization that commit 19712c8 claimed to deliver
- **SEO/Crawling:** Duplicate content in the DOM

**Investigation Context:**
Commit 19712c8 (2026-07-18) was supposed to fix this by "removing duplicate table rendering" and optimizing page sizes. The commit is in the main branch history, but the bug persists. This suggests either:
- The fix was incomplete (didn't fully remove all duplicate rendering)
- A subsequent change re-introduced the duplicate tables

## Acceptance Criteria

1. **Only ONE ranking table** renders on both /atp-live and /wta-live
2. The single table is properly responsive (works on mobile/desktop without duplicating DOM content)
3. Page weight is reduced (no duplicate player data in HTML payload)
4. **REGRESSION TEST REQUIRED:**
   - Add test in `tests/ranking-table-rendering.test.js` (run via `npm test`)
   - Test must verify:
     - ATP Live page renders exactly ONE table element with ranking data
     - WTA Live page renders exactly ONE table element with ranking data
     - No duplicate tbody elements with identical player data
     - Use DOM queries to count table instances
   - Test should FAIL on current code (finds 2 tables), PASS when fixed (finds 1)
5. Run `npm test` — all tests green
6. Run `npm run build` — succeeds
7. Run `npx eslint src --max-warnings=0` — clean
8. Verify on LIVE production after deploy:
   - Visit https://rankings123.com/atp-live — only one table visible
   - Visit https://rankings123.com/wta-live — only one table visible
   - Test on both desktop and mobile viewports — responsive, no duplication
   - Check page weight is reduced from current baseline
