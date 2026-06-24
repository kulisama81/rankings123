# Performance Baseline — Rankings123

This baseline establishes performance budgets and target metrics for all routes. Use this to detect regressions during development.

**Last Updated:** 2026-06-24 (post ISR restoration)
**Measurement Method:** `npm run check:performance` (TTFB/total/size via live fetch)

> ✅ **REGRESSION RESOLVED (2026-06-24):** ATP and WTA Live ISR caching restored (commit 6cfcae9). Performance fully recovered to baseline levels.

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
| /            | ≤ 0.8s      | ≤ 2.0s       | ≤ 150KB     | 0.30s        | 0.31s         | 24KB         | ✅ FAST |
| /atp-live    | ≤ 0.8s      | ≤ 2.0s       | ≤ 300KB     | 0.13s        | 0.25s         | 269KB        | ✅ FAST |
| /wta-live    | ≤ 0.8s      | ≤ 2.0s       | ≤ 200KB     | 0.16s        | 0.16s         | 48KB         | ✅ FAST |
| /world-cup   | ≤ 0.8s      | ≤ 2.0s       | ≤ 300KB     | 0.14s        | 0.29s         | 397KB        | ⚠️ SIZE |

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
**Impact:** Page size **increased 16%** (341KB → 394KB, now 31% over 300KB budget).

**Root cause:** Recent feature additions:
- Team statistics leaderboards (commit 853a068)
- Team rosters (commit 47afa40)
- Match page enhancements (commit ed88bce)

**Mobile impact:** 394KB on slow 3G = ~3.5s transfer time.

**Solution (ticket `perf-wc-page-size`):** Lazy-load below-the-fold sections:
- Knockout bracket (~50KB)
- Team statistics (~30KB)
- Selective roster loading

**Target:** < 300KB initial bundle (~100KB reduction needed)

**Why urgent:** World Cup 2026 is live (through ~July 19) — high mobile traffic NOW.

---

### 2. Large Page Sizes (Medium Impact)
- **/atp-live**: 269KB (now under 300KB budget, improved from 380KB) — still loads ~1000 players at once
  - **Target:** < 100KB via server-side pagination (ticket `perf-atp-page-size`)
- **/world-cup**: 394KB (**over 300KB budget**, regressed from 341KB) — 100 matches + 12 groups + bracket + stats + rosters
  - **Target:** < 300KB via lazy-loading (ticket `perf-wc-page-size`)

**Mobile impact:** 394KB on slow 3G = ~3.5s transfer alone.

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
