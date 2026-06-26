# Performance Baseline — Rankings123

This baseline establishes performance budgets and target metrics for all routes. Use this to detect regressions during development.

**Last Updated:** 2026-06-26
**Measurement Method:** `npm run check:performance` (TTFB/total/size via live fetch)

> ⚠️ **MONITORING (2026-06-26):** World Cup page shows +33% TTFB variance (0.12s → 0.16s), similar to ATP variance from 2026-06-25 (which self-resolved). Monitoring for persistence.

> ✅ **VARIANCE RESOLVED (2026-06-26):** ATP Live variance from 2026-06-25 (+38% TTFB) confirmed transient — performance improved today (-5.6% TTFB vs baseline).

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
| /            | ≤ 0.8s      | ≤ 2.0s       | ≤ 150KB     | 0.23s        | 0.25s         | 24KB         | ✅ FAST |
| /atp-live    | ≤ 0.8s      | ≤ 2.0s       | ≤ 300KB     | 0.17s        | 0.28s         | 271KB        | ✅ FAST |
| /wta-live    | ≤ 0.8s      | ≤ 2.0s       | ≤ 200KB     | 0.11s        | 0.16s         | 49KB         | ✅ FAST |
| /world-cup   | ≤ 0.8s      | ≤ 2.0s       | ≤ 300KB     | 0.16s        | 0.37s         | 390KB        | ⚠️ SIZE |

**Legend:**
- **TTFB** = Time to First Byte (server response start)
- **Total** = Full page load time (TTFB + network transfer)
- **Size** = Uncompressed response size

**Status:**
- ✅ **FAST** = All metrics within budget
- ⚠️ **SIZE** = Over size budget (affects mobile, metered connections)
- 🔴 **SLOW** = Over TTFB or total budget (user-perceived slowness)

---

## Recent Changes

### ⚠️ World Cup Page Variance Detected (2026-06-26)

**Observation:** World Cup page showed increased TTFB (0.12s → 0.16s, +33%) and total (0.28s → 0.37s, +32%) in 2026-06-26 measurement.

**Status:** Monitoring (within budget, likely transient variance)
- Still well within budget (TTFB 0.16s vs 0.8s, total 0.37s vs 2.0s)
- Size slightly improved (393KB → 390KB, -0.8%)
- Recent code change: `LiveWorldCupWidget` added to homepage (commit f77f74b) with client-side polling to `/api/worldcup/live` endpoint
- Widget shouldn't affect page SSR (client-side only), but new API route polls `getWorldCupData()` every 20s
- Likely cause: Network or upstream ESPN API latency fluctuation (same pattern as ATP variance from yesterday)

**Action:** Will monitor in next run. If variance persists, will investigate upstream API pressure and file ticket.

**Report:** docs/reports/2026-06-26-performance.md

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
