---
id: bug-atp-pagination-missing-deep-ranking
status: closed
deps: []
links: [fold-top1000]
created: 2026-08-11T00:00:00Z
type: bug
priority: 0
parent: rankings123
tags: [bug, atp, core-feature, regression, data]
---
# ATP Live: pagination missing, only 40 players shown (should be ~1000 with pagination)

## Acceptance Criteria

1. **Investigate data loading:**
   - Check if `getAtpDeepRankingData()` in `src/lib/atpDeepRanking.ts` is actually fetching ~1000 players
   - Check the `source` flag in the returned snapshot (should be `uts` or `uts+espn`, NOT `mock`)
   - Check browser Network tab / server logs for UTS fetch failures
   - Determine why only 40 players are reaching the UI

2. **Fix the data pipeline:**
   - Ensure `getAtpDeepRankingData()` successfully fetches ~1000 players from UTS
   - Ensure the full dataset is passed through to `LiveRankingTable`
   - If UTS is down, the mock should still have 100+ players (not 40) to test pagination

3. **Verify pagination renders:**
   - With ~1000 players, `filtered.length > 50` should be true
   - Pagination controls should appear: "← Prev  Page 1 / 20  Next →"
   - Status should show "1–50 of 1000"
   - Clicking Next should load page 2 (players 51–100)

4. **REGRESSION TEST REQUIRED** (per CLAUDE.md):
   - Add test in `tests/atp-deep-ranking.test.js` (run via `npm test`):
     ```js
     // Fetch ATP deep ranking data
     const { getAtpDeepRankingData } = require('../src/lib/atpDeepRanking');
     const snapshot = await getAtpDeepRankingData();
     
     // Verify we have deep ranking (not just top 40)
     assert(snapshot.players.length >= 500, 
       `ATP deep ranking should have 500+ players, got ${snapshot.players.length}`);
     
     // Verify source is not mock (unless UTS is down)
     if (snapshot.source === 'mock') {
       console.warn('UTS may be down, using mock data');
     }
     ```
   - Test should FAIL with current code (40 players < 500)
   - Test should PASS when deep ranking loads correctly

5. **Verify the fix locally:**
   - Visit http://localhost:3000/atp-live
   - Scroll to bottom — pagination controls visible
   - Should show "1–50 of 1000" (or similar)
   - Click "Next →" — should navigate to page 2 (players 51–100)
   - `npm test` — all tests green including new regression test
   - `npm run check:core-features` — MUST PASS (ATP pagination check)

6. **Standard checks:**
   - `npm run build` — succeeds
   - `npx eslint src --max-warnings=0` — clean
   - `npm run check:data-sanity` — passes
   - `npm run check:core-features` — passes (currently FAILING)

7. **Live verification after deploy:**
   - Visit https://rankings123.com/atp-live
   - Verify pagination controls visible
   - Verify can navigate through multiple pages
   - Verify total player count is 500+ (shown in pagination status)
   - `npm run check:core-features` passes in CI

## Bug Report

**URL:** https://rankings123.com/atp-live

**Inspection Date:** 2026-08-11

**Severity:** P0 (Critical) — Core feature regression, breaks user access to full ranking depth

**Type:** Regression — Related to closed ticket `fold-top1000` which was supposed to add ~1000 player depth with pagination

## Description

The ATP Live page only displays **40 players** with **NO pagination controls**. According to `docs/CORE-FEATURES.md`, this page MUST show "deep depth (~1000 players) with **pagination** (50/page)". The `scripts/check-core-features.mjs` check is **FAILING** on this requirement.

This is a critical regression from the `fold-top1000` ticket (closed), which was supposed to merge the full ATP ranking (~1000 players) into the `/atp-live` page with pagination.

## Reproduction Steps

1. Visit https://rankings123.com/atp-live
2. Scroll to bottom of ranking table
3. **Expected:** Pagination controls showing "Page 1 / 20" (for ~1000 players ÷ 50/page)
4. **Actual:** No pagination controls visible, only 40 rows shown

## Expected vs Actual

**Expected:**
- ATP Live shows ~1000 players (via `getAtpDeepRankingData()`)
- Pagination controls visible: "← Prev  Page 1 / 20  Next →"
- Status text: "1–50 of 1000"
- Users can navigate through all pages

**Actual:**
- Only 40 players shown (ranks 1-40)
- NO pagination controls
- No way to access players ranked 41+
- Core feature check FAILS: "no pagination control"

**Comparison:** WTA Live page works correctly (shows 100 players with "Page 1 / 2" pagination).

## Root Cause Analysis

From code inspection:

1. **`src/components/LiveRankingTable.tsx` line 562:** Pagination only renders when `filtered.length > PAGE_SIZE` (50)
2. **`src/app/atp-live/page.tsx`:** Calls `getLiveData("atp")` 
3. **`src/lib/liveFeed.ts`:** For ATP, calls `getAtpDeepRankingData()` which should return ~1000 players
4. **Problem:** The deep ranking data is either:
   - Not loading (fetch failure, falling back to mock with only 40 players)
   - Not being passed correctly to the component
   - Being filtered/sliced somewhere to only 40 players

The fact that only 40 players appear (not even 50) suggests a data source problem, not just a UI bug.

## Impact

- **Breaks core feature** (protected in `docs/CORE-FEATURES.md`)
- **Blocks `check-core-features` guard** (fails the build/deploy gate)
- **Major UX regression:** Users cannot access players ranked 41–1000
- **Competitive disadvantage:** live-tennis.eu shows full rankings; we only show top 40
- **Breaks the "fold-top1000" feature** that was supposedly completed

## Related Tickets

- `fold-top1000` (closed) — Original feature ticket to add full ranking depth
- `perf-atp-page-size` (open) — Performance optimization for ATP page (assumes pagination exists)
- `bug-wta-pagination-spacing` (open) — WTA pagination formatting (but WTA pagination works, ATP doesn't)

## Notes

WTA Live works correctly with 100 players and pagination. This suggests the pagination UI code is fine, but the ATP data source is broken or not integrated properly.
