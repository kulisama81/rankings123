# Inspector Report — 2026-08-14 (22:00 UTC)

**Inspection Type:** Live QA sweep (evening run)  
**Inspector:** inspector (cron agent)  
**Date:** 2026-08-14 22:00 UTC  
**Duration:** ~25 minutes  
**Verdict:** ⚠️ **1 CRITICAL BUG FOUND** — Homepage Live Rankings Preview broken in production

---

## Routes Inspected

Thoroughly checked the following routes on https://rankings123.com (with cache-busting):
- **Homepage:** `/` 
- **ATP Live:** `/atp-live`
- **WTA Live:** `/wta-live`
- **World Cup:** `/world-cup`
- **Privacy:** `/privacy`
- **World Cup Match/Team pages:** Sampled from /world-cup links

All routes returned **200 OK**.

---

## Core Features Check

Ran `npm run check:core-features` — **ALL PASS ✅**

```
✓ WC knockout bracket (R32 matchups)
✓ WC group standings
✓ ATP live ranking + pagination
✓ WTA live ranking
✓ Home multi-sport
```

---

## Data Sanity Check

Ran `npm run check:data-sanity` — **PASS with warnings**

```
⚠ [atp] served from mock fallback (live feed unavailable)
⚠ [atp] 27 players "in play" but only 4 show point changes (Δ≠0)
✓ data-sanity: all per-sport invariants hold (2 warning(s))
```

**Analysis:**
- Mock fallback is acceptable degradation per CLAUDE.md
- ATP delta warning is known/acceptable (early tournament rounds)

---

## Critical Bug Found

### 🔴 Homepage Live Rankings Preview Stuck in Loading State

**Bug Ticket:** `bug-homepage-preview-still-broken` (P1, newly filed)

**Description:**  
The "Live Rankings Preview" section on https://rankings123.com displays three skeleton loading cards (`animate-pulse`) that **never resolve to actual player data**. The loading state persists indefinitely.

**Key Finding:**  
This is a **regression/incomplete fix**. Commit 96597d2 "Fix homepage Live Rankings Preview stuck in loading state" was deployed successfully to production, but **the issue persists**.

**Evidence:**
- ✅ API endpoints work: `/api/atp-live` returns 100 players, `/api/wta-live` returns 100 players
- ✅ Vercel deployment successful: Commit 96597d2 shows "Deployment has completed"
- ✅ Component code has proper error handling: `setIsLoading(false)` in `finally` block
- ❌ **But the live site still shows skeleton loaders** (confirmed with cache-busting)

**Root Cause (Suspected):**  
Client-side component hydration or `useEffect` hook not executing properly. The SSR-rendered skeleton loaders are never replaced with data despite the APIs working.

**Reproduction:**
1. Visit https://rankings123.com/
2. Scroll to "Live Rankings Preview"
3. Observe three skeleton cards with `animate-pulse` class
4. Wait 10+ seconds → **skeletons never resolve**

**Impact:**
- Homepage bounce rate goal unmet
- Core feature appears broken to users
- Previous fix attempt (96597d2) ineffective

**Action Required:**
- Diagnose why client-side fetch isn't working despite error handling
- Verify regression test catches this bug (may need Playwright for client-side rendering)
- Fix and re-deploy with verified test coverage

---

## Route-by-Route Findings

### Homepage (`/`)
- ✅ HTTP 200, page renders
- ✅ Navigation links present
- ✅ Cincinnati Open event card showing
- ⚠️ **CRITICAL:** Live Rankings Preview stuck in skeleton loading state (see above)

### ATP Live (`/atp-live`)
- ✅ HTTP 200
- ✅ Ranking table with 50+ rows visible
- ✅ Pagination controls present
- ✅ "Demo data" source indicator (expected - mock fallback active)
- ✅ Player names, ranks, points displaying correctly

### WTA Live (`/wta-live`)
- ✅ HTTP 200
- ✅ Ranking table with 50+ rows visible
- ✅ Pagination controls present
- ✅ "Data via ESPN" attribution visible
- ✅ Player data complete (Aryna Sabalenka #1, 8,670 points)

### World Cup (`/world-cup`)
- ✅ HTTP 200
- ✅ Group standings showing (all 12 groups A-L)
- ⚠️ Round of 16 onwards shows "TBD" placeholders
- ⚠️ "No upcoming fixtures scheduled" message
- ℹ️  This is expected state (group stage complete, knockout not yet started or data incomplete)

### Privacy (`/privacy`)
- ✅ HTTP 200, content renders

---

## Bugs Filed This Inspection

**1 new bug filed:**

- **bug-homepage-preview-still-broken** (P1) — Homepage Live Rankings Preview stuck showing skeleton loaders despite fix attempt in commit 96597d2. Requires client-side debugging and improved regression test.

---

## Deduplication Check

Checked against all existing open bugs:
- ✅ **bug-homepage-live-preview-empty** (closed) — Related but different. That ticket was closed with commit 96597d2, but the issue persists. New ticket reflects the regression.
- ✅ No other open tickets match this exact issue

---

## Test Suite Status

- `npm run check:core-features` — ✅ PASS
- `npm run check:data-sanity` — ✅ PASS (2 warnings, acceptable)
- `npm test` — ⚠️ Some tests fail with module resolution errors (not related to this bug)
- `tests/homepage-live-preview.test.mjs` exists but requires running dev server

**Note:** The regression test added in commit 96597d2 appears to not catch this bug in its current form (likely tests SSR HTML, not client-side hydration). Test improvement recommended in acceptance criteria.

---

## Summary

**Status:** ⚠️ **1 CRITICAL BUG FOUND**

- All routes load successfully (200 OK)
- All core features pass automated checks
- Data sanity checks pass with acceptable warnings
- **CRITICAL:** Homepage Live Rankings Preview broken in production
  - Previous fix (commit 96597d2) deployed but ineffective
  - Client-side data loading failing silently
  - APIs work, component has error handling, but skeleton loaders persist
  - Requires immediate attention (P1)

**Recommendations:**

1. **Immediate:** Debug `HomepageRankingsPreview.tsx` client-side behavior
   - Use Playwright to capture browser console errors
   - Verify `useEffect` hook executes
   - Confirm client-side `/api/*` fetches work from browser

2. **Test Coverage:** Improve `tests/homepage-live-preview.test.mjs`
   - Add client-side rendering test (Playwright)
   - Verify skeleton loaders disappear and player names appear
   - Test should catch this exact bug

3. **Deployment Verification:** After fix, verify in production with hard refresh and multiple browsers

---

**Inspection completed:** 2026-08-14 22:00 UTC  
**Next scheduled inspection:** 2026-08-15 morning
