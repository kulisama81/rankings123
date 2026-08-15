---
id: bug-homepage-preview-still-broken
status: open
type: bug
priority: 1
parent: rankings123
tags: [bug, homepage, ui, regression, p1]
created: 2026-08-14T22:00:00Z
---
# Homepage Live Rankings Preview still stuck in loading state (fix 96597d2 failed)

## Bug Report

**URL:** https://rankings123.com/

**Severity:** P1 (High) - Core homepage feature non-functional, impacts bounce rate and UX goals

**Inspection Date:** 2026-08-14

**Status:** Regression/Incomplete Fix - Commit 96597d2 attempted to fix this but the issue persists in production

## Description

The homepage "Live Rankings Preview" section displays three skeleton loading cards (`animate-pulse`) that **never resolve to actual player data**. The loading state is baked into the SSR HTML and never updates after client-side hydration.

Despite commit 96597d2 "Fix homepage Live Rankings Preview stuck in loading state" being successfully deployed (Vercel deployment shows "success"), the skeleton loaders remain visible on the live site.

## Root Cause Analysis

**What's working:**
- ✅ API endpoints return valid data: `/api/atp-live` (100 players), `/api/wta-live` (100 players)
- ✅ Component code has proper error handling with `setIsLoading(false)` in `finally` block (line 145)
- ✅ Commit 96597d2 deployed successfully to production

**What's broken:**
- ❌ Client-side component hydration/data fetch not executing or failing silently
- ❌ `useEffect` hook in `HomepageRankingsPreview.tsx` either not running or fetch calls failing despite error handling
- ❌ SSR-rendered skeleton loaders never replaced with actual data

## Reproduction Steps

1. Visit https://rankings123.com/ (tested with cache-busting `?nocache=...`)
2. Scroll to "Live Rankings Preview" section
3. Observe: Three skeleton loading cards with `animate-pulse` class, showing gray placeholder bars
4. Wait 10+ seconds
5. **Expected:** Cards populate with ATP/WTA player data (names, ranks, points)
6. **Actual:** Skeleton loaders remain indefinitely, never resolve

## Evidence

**SSR HTML shows three skeleton cards:**
```html
<section class="mb-12">
  <h2>Live Rankings Preview</h2>
  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <div class="animate-pulse rounded-2xl ...">
      <!-- skeleton bars, no player data -->
    </div>
    <!-- 2 more identical skeleton cards -->
  </div>
</section>
```

**API endpoints confirmed working:**
- `curl https://rankings123.com/api/atp-live` → valid JSON, 100 players
- `curl https://rankings123.com/api/wta-live` → valid JSON, 100 players

## Impact

- **Bounce rate goal unmet:** Users see loading skeleton instead of preview data
- **Feature appears broken:** Gives impression of site malfunction
- **SEO/UX regression:** Homepage value proposition not delivered
- **Previous fix ineffective:** Commit 96597d2 didn't resolve the issue

## Likely Causes (Investigation Needed)

1. **Hydration mismatch:** React hydration failing, preventing client component from executing
2. **Client-side fetch failure:** CORS, network policy, or Next.js routing issue blocking `/api/*` calls from client
3. **JavaScript error:** Silent error in `useEffect` preventing fetch execution (check browser console)
4. **Race condition:** Component unmounting before `setIsLoading(false)` executes (though `finally` should prevent this)

## Acceptance Criteria

1. **Fix the client-side data loading:**
   - Homepage Live Rankings Preview section must show actual player data (ATP/WTA top 5) within 2 seconds of page load
   - Skeleton loaders should disappear once data loads
   - If APIs fail, section should hide gracefully (return `null`) per component logic line 190-192
   
2. **Diagnose the root cause:**
   - Determine why the client-side fetch in `HomepageRankingsPreview.tsx` isn't working despite proper error handling
   - Check browser console for JavaScript errors (use Playwright to capture console logs)
   - Verify `useEffect` hook is executing (add temporary console.log if needed during debugging)
   - Confirm client-side fetches to `/api/atp-live` and `/api/wta-live` succeed from the browser

3. **REGRESSION TEST REQUIRED** (per CLAUDE.md):
   - The test at `tests/homepage-live-preview.test.mjs` already exists (added in commit 96597d2)
   - **Verify the test actually catches this bug:**
     - Run test against a running dev server: `npm run dev` then `node --test tests/homepage-live-preview.test.mjs`
     - Test should FAIL on current broken state
     - Test should PASS after fix
   - **If the test doesn't catch this bug, update it to:**
     - Use a headless browser (Playwright) to render the homepage client-side (not just fetch SSR HTML)
     - Wait for skeletons to disappear (`animate-pulse` class removed or cards replaced)
     - Assert player names are visible in the preview cards (e.g., "Jannik Sinner", "Aryna Sabalenka")
     - Capture and assert no JavaScript console errors during load
   - Add test to CI/pre-commit to prevent future regressions

4. **Verify locally:**
   - Visit http://localhost:3000/
   - See actual ATP/WTA player data in Live Rankings Preview (names, ranks, points)
   - No skeleton loaders visible after 2 seconds
   - Data matches /atp-live and /wta-live pages (top 5 players)
   - `npm test` — all tests green including regression test

5. **Standard checks:**
   - `npm run build` — succeeds
   - `npx eslint src --max-warnings=0` — clean
   - `npm run check:data-sanity` — passes
   - `npm run check:core-features` — passes

6. **Live verification after deploy:**
   - Visit https://rankings123.com/ (test with hard refresh Cmd+Shift+R / incognito)
   - Confirm Live Rankings Preview shows real player data within 2 seconds
   - No skeleton loaders stuck in loading state
   - Data matches /atp-live and /wta-live pages
   - Test in multiple browsers (Chrome, Safari, Firefox)
   - Test on mobile viewport (skeleton issue might be device-specific)
   - Regression test passes when run against production
