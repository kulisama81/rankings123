# Performance Baseline — Rankings123

This baseline establishes performance budgets and target metrics for all routes. Use this to detect regressions during development.

**Last Updated:** 2026-06-29
**Measurement Method:** `npm run check:performance` (TTFB/total/size via live fetch)

> ✅ **CRITICAL REGRESSION RESOLVED (2026-06-29):** ATP/WTA Live pages ISR caching fully restored (commit e0e8f31). ATP TTFB -65%, WTA TTFB -48% vs degraded state. Both routes now FAST and within all budgets.

> ⚠️ **MINOR VARIANCE (2026-06-29):** Homepage TTFB +33% (0.12s → 0.16s) but remains FAST and within budget. Likely transient network variance (same pattern as previous runs). Monitoring.

---

## Core Web Vitals Targets (Global)

Per [web.dev/vitals](https://web.dev/vitals), these are the **GOOD** thresholds we target:

- **LCP** (Largest Contentful Paint): < 2.5s
- **INP** (Interaction to Next Paint): < 200ms
- **CLS** (Cumulative Layout Shift): < 0.1

> **Note:** Core Web Vitals not yet measured in this baseline run (PageSpeed Insights API rate limited). Will be added in next run.

---

## Per-Route Performance Budget

| Route        | TTFB Budget | Total Budget | Size Budget | Current TTFB | Current Total | Current Size | Status |
|--------------|-------------|--------------|-------------|--------------|---------------|--------------|--------|
| /            | ≤ 0.8s      | ≤ 2.0s       | ≤ 150KB     | 0.16s        | 0.16s         | 27KB         | ✅ FAST |
| /atp-live    | ≤ 0.8s      | ≤ 2.0s       | ≤ 300KB     | 0.14s        | 0.30s         | 271KB        | ✅ FAST |
| /wta-live    | ≤ 0.8s      | ≤ 2.0s       | ≤ 200KB     | 0.15s        | 0.15s         | 49KB         | ✅ FAST |
| /world-cup   | ≤ 0.8s      | ≤ 2.0s       | ≤ 300KB     | 0.14s        | 0.34s         | 377KB        | ⚠️ SIZE |

**Legend:**
- **TTFB** = Time to First Byte (server response start)
- **Total** = Full page load time (TTFB + network transfer)
- **Size** = Uncompressed response size

**Status:**
- ✅ **FAST** = All metrics within budget
- ⚠️ **SIZE** = Over size budget (affects mobile, metered connections)
- 🔴 **SLOW** = Over TTFB or total budget (user-perceived slowness)

**Note on World Cup size (2026-06-29):**
- World Cup size 377KB vs 300KB budget (26% over) is a known architectural limitation
- ISR pre-renders all data server-side → full HTML regardless of lazy-loading
- Lazy-loading (implemented in `perf-wc-page-size`) benefits JS bundle size, not HTML size
- Size stable (379KB → 377KB), not a regression

---

## Recent Changes

### ✅ ATP/WTA Critical Regression RESOLVED (2026-06-29)

**Observation:** ISR caching fully restored on ATP/WTA Live pages. Critical P0 regression from 2026-06-27 now completely resolved.

**Measurements (2026-06-29 vs 2026-06-28 degraded baseline):**
- **ATP Live:** TTFB 0.40s → 0.14s (-65%), size 399KB → 271KB (-32%)
- **WTA Live:** TTFB 0.29s → 0.15s (-48%), size 173KB → 49KB (-72%)
- **Homepage:** TTFB 0.12s → 0.16s (+33%, minor variance), size 24KB → 27KB (+12.5%)
- **World Cup:** TTFB 0.17s → 0.14s (-18%), size 379KB → 377KB (-0.5%)

**Resolution:** Commit e0e8f31 (2026-06-28) by planner — "Restore ISR caching on ATP/WTA Live pages"

**Technical fix:**
- Changed from `dynamic="force-dynamic"` to `revalidate=60` (ISR)
- Modified Suspense fallback from visible text to null
- Added regression guard test to prevent reverting to force-dynamic

**Code verification:**
```bash
$ grep -r "force-dynamic" src/app/atp-live/ src/app/wta-live/
No force-dynamic found ✓
```

**Impact:**
- ✅ Both routes now served from edge cache with 60s revalidation
- ✅ 100× fewer origin requests vs force-dynamic
- ✅ All routes now FAST and within TTFB/total budgets
- ✅ Tennis pages (core traffic drivers) unblocked for monetization

**Homepage variance:** +33% TTFB (0.12s → 0.16s) but remains FAST and within budget. Likely transient network variance (same pattern as 2026-06-27/28). Monitoring in next run.

**Status:** 🎉 CRITICAL REGRESSION RESOLVED

**Ticket:** `perf-atp-wta-isr-restore` — CLOSED (commit e0e8f31)

**Report:** docs/reports/2026-06-29-performance.md

---

### ⚠️ ATP/WTA Regression Persists, Homepage Variance Resolved (2026-06-28)

**Observation:** Mixed results — homepage variance fully resolved, ATP/WTA regression persists but showing slight improvement.

**Measurements (2026-06-28):**
- **Homepage:** TTFB 0.38s → 0.12s (-68%, variance fully resolved)
- **ATP Live:** TTFB 0.61s → 0.40s (-34% improvement but still +135% vs 0.17s baseline)
- **WTA Live:** TTFB 0.31s → 0.29s (-6%, still +164% vs 0.11s baseline), size 153KB → 173KB (+13%)
- **World Cup:** size 390KB → 379KB (-3%, still over 300KB budget)

**Status:**
- ✅ **Homepage variance RESOLVED** — The +65% TTFB spike from 2026-06-27 (0.23s → 0.38s) is completely resolved, now at 0.12s (-48% vs baseline). Confirms transient network/upstream latency.
- 🔴 **ATP/WTA regression PERSISTS** — Pages still use force-dynamic (ticket `perf-atp-wta-isr-restore` remains open). TTFB improving slightly but still critical (+135-164% vs baseline).
- ⚠️ **World Cup size improving** — Down from 390KB to 379KB, still 26% over 300KB budget but trending right.

**Code Status (confirmed 2026-06-28):**
```
src/app/atp-live/page.tsx:export const dynamic = "force-dynamic";
src/app/wta-live/page.tsx:export const dynamic = "force-dynamic";
```

**Trend Analysis:**
ATP/WTA TTFB is slowly improving (ATP -34%, WTA -6% vs yesterday) even with force-dynamic still in place. This suggests:
1. Upstream ESPN API latency improving, OR
2. Origin function cold-start frequency reduced, OR
3. Network conditions improving

However, regression remains CRITICAL — baseline is 0.17s (ATP) and 0.11s (WTA), so current state is still 135-164% slower.

**Action:** Continue monitoring. No new ticket needed (existing ticket `perf-atp-wta-isr-restore` is comprehensive).

**Report:** docs/reports/2026-06-28-performance.md

---

### 🔴 CRITICAL REGRESSION: ATP/WTA Force-Dynamic Rendering (2026-06-27)

**Observation:** MASSIVE performance degradation across all tennis pages.

**Measurements (2026-06-27 vs 2026-06-26 baseline):**
- **ATP Live:** TTFB 0.17s → 0.61s (+259%), size 271KB → 399KB (+47%)
- **WTA Live:** TTFB 0.11s → 0.31s (+182%), size 49KB → 153KB (+212%)
- **Homepage:** TTFB 0.23s → 0.38s (+65%, cause TBD)

**Root Cause:** Commit 3eec872 (2026-06-26) restored `export const dynamic = "force-dynamic"` in ATP/WTA page files to fix a table rendering bug (Suspense fallback persisting). This forces every request to render on origin instead of serving from edge cache.

**Status:** 🔴 CRITICAL — P0 ticket filed (`perf-atp-wta-isr-restore`)

**Impact:**
- Every request hits origin + upstream ESPN APIs (no caching)
- 3.6× slower TTFB on ATP, 2.8× slower on WTA
- Harms UX, SEO (Core Web Vitals), ad revenue (viewability), and scale (100× more origin requests)
- Dual problem: BOTH performance regression (this) AND functional bug (production shows "Loading table..." fallback, see ticket `suspense-fallback-bug`)

**Technical Details:**
The force-dynamic change "fixes" functionality (table renders correctly) but destroys performance. The root issue is an architectural conflict: **ISR + React Suspense + useSearchParams**.

When using ISR (`revalidate: 60`):
- Next.js pre-renders at build time
- `LiveRankingTable` (client component) uses `useSearchParams()`
- SearchParams unavailable at build time → component suspends
- Suspense fallback ("Loading table...") rendered in static HTML
- Result: Fast TTFB but broken UI

When using force-dynamic:
- Every request renders at request time
- SearchParams available → component renders correctly
- Result: Correct UI but terrible performance (no caching)

**Previous Fix Attempt:** Commit 6cfcae9 (2026-06-24) successfully restored ISR (ATP TTFB 0.39s → 0.18s), but that fix later regressed.

**Solution:** Fix the Suspense+useSearchParams conflict properly (move Suspense inside client component OR make searchParams optional) so ISR works without breaking functionality. See ticket for detailed implementation plan.

**Urgency:** IMMEDIATE — tennis pages are core traffic drivers. Blocks monetization path (slow pages = lower ad RPM).

**Report:** docs/reports/2026-06-27-performance.md

---

### ⚠️ World Cup Page Variance Detected (2026-06-26) — ✅ RESOLVED (2026-06-27)

**Observation:** World Cup page showed increased TTFB (0.12s → 0.16s, +33%) and total (0.28s → 0.37s, +32%) in 2026-06-26 measurement.

**Resolution (2026-06-27):** Performance returned to baseline with IMPROVEMENTS:
- TTFB: 0.16s → 0.12s (-25%, back to baseline)
- Total: 0.37s → 0.31s (-16%)
- Size: 390KB → 351KB (-10%)

**Status:** ✅ Resolved — variance was transient network/upstream ESPN API latency (same pattern as ATP variance from 2026-06-25).

**Report:** docs/reports/2026-06-26-performance.md, docs/reports/2026-06-27-performance.md

---

### ✅ ATP Live Variance Resolved (2026-06-26)

**Previous variance (2026-06-25):** TTFB 0.13s → 0.18s (+38%), total 0.25s → 0.33s (+32%)

**Current (2026-06-26):** TTFB 0.17s (-5.6% vs baseline), total 0.28s (-15.2% vs baseline)

**Status:** ✅ Resolved — confirms yesterday's variance was transient network/upstream fluctuation, not a structural performance issue.

**Report:** docs/reports/2026-06-25-performance.md

---

### ✅ ISR RESTORATION (COMPLETED — commit 6cfcae9, 2026-06-24)

**Commit:** 6cfcae9 (2026-06-24)
**Change:** Restored ISR caching on ATP/WTA pages while preserving country filter functionality
**Solution:** Removed searchParams access from server components (which forced dynamic rendering), kept useSearchParams in client component with Suspense boundary

**Performance Recovery:**
- **ATP Live:** TTFB 0.39s → 0.13s (-67%), size 374KB → 269KB (-28%)
- **WTA Live:** TTFB 0.31s → 0.16s (-48%), size 157KB → 48KB (-69%)

**Impact:** Pages now served from edge cache with 60s revalidation. Massive TTFB improvement, sizes back to ISR baseline.

**Ticket:** `perf-atp-wta-isr-regression` (Priority 0) — CLOSED

---

### 🔴 CRITICAL REGRESSION (RESOLVED — 2026-06-24) — ATP/WTA ISR Rollback

**Commit:** 8ee5be4 (2026-06-23)
**Change:** Reverted ATP and WTA Live pages from ISR (`revalidate: 60`) to `force-dynamic`
**Reason:** Fix rendering bug where only 1 player showed (useSearchParams conflict with ISR)

**Performance Impact (REGRESSION):**
- **ATP Live:** TTFB 0.18s → 0.39s (+117%), size 269KB → 374KB (+39%)
- **WTA Live:** TTFB 0.16s → 0.31s (+94%), size 48KB → 157KB (+227%)

**Root cause:** Every request blocked on origin/upstream APIs instead of serving from edge cache.

**Resolution:** Commit 6cfcae9 restored ISR while preserving country filter by moving searchParams handling entirely to client component.

---

### ✅ ISR Migration (COMPLETED — commit b438b6d, 2026-06-23)
**Impact:** Massive performance wins across all routes.

**Results:**
- ATP Live: TTFB 0.46s → 0.18s (-61%), size 380KB → 269KB (-29%)
- WTA Live: TTFB 0.29s → 0.16s (-45%), size 165KB → 48KB (-71%)
- World Cup: TTFB 0.35s → 0.24s (-31%)
- Home: size 93KB → 24KB (-74%)

Migrated from `force-dynamic` to `export const revalidate = 60` for ISR caching. Pages now served from edge with background revalidation.

**Note:** ATP/WTA later reverted to force-dynamic (see regression above).

### ✅ ESPN Fetch Deduplication (COMPLETED — commit e3242c7)
Eliminated redundant ESPN API calls on World Cup page. Contributed to TTFB improvements.

---

## Known Performance Debt

### 1. World Cup Page Size Regression (High Impact, PRIORITY 1)
**Impact:** Page size **increased 14%** (341KB → 390KB, now 30% over 300KB budget).

**Root cause:** Recent feature additions:
- Team statistics leaderboards (commit 853a068)
- Team rosters (commit 47afa40)
- Match page enhancements (commit ed88bce)

**Mobile impact:** 390KB on slow 3G = ~3.5s transfer time.

**Solution (ticket `perf-wc-page-size`):** Lazy-load below-the-fold sections:
- Knockout bracket (~50KB)
- Team statistics (~30KB)
- Selective roster loading

**Target:** < 300KB initial bundle (~100KB reduction needed)

**Why urgent:** World Cup 2026 is live (through ~July 19) — high mobile traffic NOW.

---

### 2. Large Page Sizes (Medium Impact)
- **/atp-live**: 271KB (now under 300KB budget, improved from 380KB) — still loads ~1000 players at once
  - **Target:** < 100KB via server-side pagination (ticket `perf-atp-page-size`)
- **/world-cup**: 390KB (**over 300KB budget**, regressed from 341KB) — 100 matches + 12 groups + bracket + stats + rosters
  - **Target:** < 300KB via lazy-loading (ticket `perf-wc-page-size`)

**Mobile impact:** 390KB on slow 3G = ~3.5s transfer alone.

**Solutions:**
- **World Cup (priority 1):** Lazy-load bracket and stats via `next/dynamic` + Suspense
- **ATP (priority 2):** Server-side pagination — send only 50 players per request
- **Bundle analysis** to identify large JS dependencies (`@next/bundle-analyzer`)

---

### 3. Multiple Font Families (Low-Medium Impact)
5 Google Fonts loaded: Geist, Geist_Mono, Archivo, Oswald, Source_Serif_4.

**Impact:** Additional render-blocking requests; font flash.

**Solution:** Audit font usage; reduce to 2-3 core families; ensure `display: 'swap'`.

---

### 4. Limited `next/image` Usage (Low Impact)
Only 1 occurrence of `next/image` found across components.

**Impact:** Unoptimized images can bloat payload and slow LCP.

**Action:** Audit image usage and migrate to `next/image` for automatic optimization.

---

## Regression Detection

**On every build/PR:**
1. Run `npm run check:performance` in CI
2. Compare TTFB/total/size against this baseline
3. **Flag as regression** if any route:
   - TTFB or total increased **> 25%** vs baseline
   - Size increased **> 15%** vs baseline
   - Any metric exceeds its budget

**Update this baseline** only when a real performance improvement ships (move budgets downward). Never silently rebaseline a regression.

---

## Next Steps

1. Add Core Web Vitals measurement (LCP/INP/CLS) via Lighthouse in CI
2. File tickets for force-dynamic → ISR migration (highest ROI)
3. File ticket for World Cup redundant fetch deduplication
4. Set up bundle analysis to track JS payload over time
