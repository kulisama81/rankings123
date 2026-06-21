# Performance Baseline — Rankings123

This baseline establishes performance budgets and target metrics for all routes. Use this to detect regressions during development.

**Last Updated:** 2026-06-21  
**Measurement Method:** `npm run check:performance` (TTFB/total/size via live fetch)

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
| /            | ≤ 0.8s      | ≤ 2.0s       | ≤ 150KB     | 0.23s        | 0.27s         | 93KB         | ✅ FAST |
| /atp-live    | ≤ 0.8s      | ≤ 2.0s       | ≤ 300KB     | 0.46s        | 0.73s         | 380KB        | ⚠️ SIZE |
| /wta-live    | ≤ 0.8s      | ≤ 2.0s       | ≤ 200KB     | 0.29s        | 0.47s         | 165KB        | ✅ FAST |
| /world-cup   | ≤ 0.8s      | ≤ 2.0s       | ≤ 300KB     | 0.35s        | 0.49s         | 341KB        | ⚠️ SIZE |

**Legend:**
- **TTFB** = Time to First Byte (server response start)
- **Total** = Full page load time (TTFB + network transfer)
- **Size** = Uncompressed response size

**Status:**
- ✅ **FAST** = All metrics within budget
- ⚠️ **SIZE** = Over size budget (affects mobile, metered connections)
- 🔴 **SLOW** = Over TTFB or total budget (user-perceived slowness)

---

## Known Performance Debt

### 1. `force-dynamic` Everywhere (High Impact)
**Impact:** Every page request blocks on upstream API calls (ESPN, WTA, UTS); no edge caching.

**Affected routes:** All data pages (`/atp-live`, `/wta-live`, `/world-cup`, etc.)

**Solution:** Migrate to ISR with short revalidation intervals:
```ts
export const revalidate = 60; // 1 minute ISR
```
Combined with client-side polling for "live" feel. This would:
- Serve cached pages at edge (near-instant TTFB)
- Revalidate every 60s in background
- Reduce upstream API load

---

### 2. Redundant ESPN Fetches on World Cup Page (Medium Impact)
**Impact:** `/world-cup` fetches ESPN's STANDINGS and SCOREBOARD APIs **twice** in parallel:
- `getWorldCupData()` in `worldCupFeed.ts` (lines 164-167)
- `getWorldCupBracket()` in `worldCupBracketFeed.ts` (lines 253-256)

**Solution:** Deduplicate via React `cache()` or shared cached fetch helper. Savings: ~100-200ms TTFB reduction.

---

### 3. Large Page Sizes (Medium Impact)
- **/atp-live**: 380KB (over 300KB budget) — ~1000 players hydrating at once
- **/world-cup**: 341KB (over 300KB budget) — 100 matches + 12 groups + bracket + stats

**Mobile impact:** 380KB on slow 3G = ~3s transfer alone.

**Solutions:**
- **Lazy-load below-the-fold sections** (e.g., bracket, stats) via `next/dynamic` + Suspense
- **Virtualize large tables** (ATP deep ranking ~1000 rows)
- **Bundle analysis** to identify large JS dependencies (`@next/bundle-analyzer`)

---

### 4. Multiple Font Families (Low-Medium Impact)
5 Google Fonts loaded: Geist, Geist_Mono, Archivo, Oswald, Source_Serif_4.

**Impact:** Additional render-blocking requests; font flash.

**Solution:** Audit font usage; reduce to 2-3 core families; ensure `display: 'swap'`.

---

### 5. Limited `next/image` Usage (Low Impact)
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
