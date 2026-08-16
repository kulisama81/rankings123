---
id: bug-wta-live-10-rows
status: closed
deps: []
links: []
created: 2026-08-16T18:04:54Z
type: bug
priority: 0
parent: rankings123
tags: [bug, wta, data, p0, regression]
---
# WTA Live: Ranking table truncated to 10 rows (core feature regression)

**URL:** https://rankings123.com/wta-live

**Severity:** P0 — Core feature failure (fails `npm run check:core-features`)

**Type:** Data regression

## Acceptance Criteria

1. **Fix the WTA feed:** Investigate why `fetchLiveSnapshot("wta")` is throwing an error and fix it so WTA uses live ESPN data like ATP does
2. **Pagination restored:** WTA live page shows 50+ players with working pagination
3. **Source badge:** Page shows "espn" source badge, not "mock"
4. **Core features check passes:** `npm run check:core-features` succeeds
5. **Regression test added:** Add a test in `tests/` (run via `npm test`) that verifies:
   - WTA snapshot has >10 players
   - Source is not "mock" (or if mock, it's a fallback with >50 players)
   - Example test location: `tests/wta-ranking-coverage.test.js`
6. **Verified on production:** After deploy, confirm https://rankings123.com/wta-live shows 50+ rows with pagination

## Description

The WTA Live rankings page shows only 10 players with no pagination, while ATP shows 50+ players with working pagination. The core-features check fails with "WTA live ranking: too few ranking rows (11)".

## Repro Steps

1. Visit https://rankings123.com/wta-live
2. Observe the ranking table
3. Compare with https://rankings123.com/atp-live

**Expected:**
- WTA table shows 50+ ranking rows (similar to ATP)
- Pagination controls present ("Page 1 / 2", showing "1-50 of 100")
- Live data from ESPN API

**Actual:**
- WTA table shows only 10 rows (ranks 1-10)
- No pagination controls
- Page shows "WTA Tour · demo data" (mock fallback)
- Source badge shows "mock" instead of "espn"

## Root Cause Analysis

Investigation reveals:

1. **Code path:** `getLiveData("wta")` in `src/lib/liveFeed.ts:349-353` calls `fetchLiveSnapshot(tour)` and catches errors by returning `wtaMockSnapshot()`
2. **Mock data:** `wtaMockSnapshot()` at line 305-337 only contains 10 hardcoded players
3. **Feed failure:** The ESPN WTA API is accessible (verified via curl), but `fetchLiveSnapshot("wta")` is throwing an error and falling back to mock
4. **Comparison:** ATP doesn't use this code path — it calls `getAtpDeepRankingData()` which has its own handling

## Verification

```bash
# Core features check FAILS
npm run check:core-features
# Output: ✗ WTA live ranking: too few ranking rows (11)

# Data sanity check PASSES (doesn't catch this specific issue)
npm run check:data-sanity

# ESPN WTA API is accessible
curl -s "https://site.api.espn.com/apis/site/v2/sports/tennis/wta/rankings" | head -100
# Returns valid JSON with full rankings data
```

## Related Tickets

This is a regression of previously-fixed bugs:
- `.tickets/wta-live-table-truncated.md` (closed)
- `.tickets/wta-table-regression.md` (closed)
- `.tickets/wta-table-loading-failure.md` (closed)

All three were marked closed with fixes, but the issue has regressed.
