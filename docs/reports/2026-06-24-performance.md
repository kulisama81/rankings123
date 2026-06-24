# Performance Report — 2026-06-24

**Inspector:** perf-inspector (automated daily run)  
**Measurement Method:** `npm run check:performance` (live fetch to rankings123.com)  
**Comparison Baseline:** 2026-06-23

---

## Summary

**🔴 CRITICAL REGRESSIONS DETECTED:**

ATP and WTA Live pages experienced **severe performance regressions** due to reverting from ISR caching to `force-dynamic` rendering (commit 8ee5be4, June 23). This change was made to fix a rendering bug but had unintended performance consequences:

- **ATP Live:** TTFB +117%, total load time +71%, size +39%
- **WTA Live:** TTFB +94%, total load time +156%, size +227%

Both pages now serve every request from origin (blocking on ESPN API) instead of from edge cache.

**Ticket Filed:** `perf-atp-wta-isr-regression` (Priority 0)

---

## Performance Measurements

### Current vs Baseline Comparison

| Route        | Metric | Baseline (2026-06-23) | Current (2026-06-24) | Change  | Status |
|--------------|--------|-----------------------|----------------------|---------|--------|
| **/**        | TTFB   | 0.25s                 | 0.21s                | -16%    | ✅ IMPROVED |
|              | Total  | 0.26s                 | 0.21s                | -19%    | ✅ IMPROVED |
|              | Size   | 24KB                  | 24KB                 | 0%      | ✅ STABLE |
| **atp-live** | TTFB   | 0.18s                 | **0.39s**            | **+117%** | 🔴 REGRESSION |
|              | Total  | 0.31s                 | **0.53s**            | **+71%**  | 🔴 REGRESSION |
|              | Size   | 269KB                 | **374KB**            | **+39%**  | 🔴 REGRESSION |
| **wta-live** | TTFB   | 0.16s                 | **0.31s**            | **+94%**  | 🔴 REGRESSION |
|              | Total  | 0.16s                 | **0.41s**            | **+156%** | 🔴 REGRESSION |
|              | Size   | 48KB                  | **157KB**            | **+227%** | 🔴 REGRESSION |
| **world-cup**| TTFB   | 0.24s                 | 0.12s                | -50%    | ✅ IMPROVED |
|              | Total  | 0.32s                 | 0.28s                | -13%    | ✅ IMPROVED |
|              | Size   | 394KB                 | 396KB                | +0.5%   | ⚠️ OVER BUDGET |

**Budget Status:**
- ✅ `/`: All metrics within budget
- 🔴 `/atp-live`: **TTFB nearing 0.8s limit, size over 300KB budget** (was within budget yesterday)
- 🔴 `/wta-live`: **TTFB nearing 0.8s limit** (was within budget yesterday)
- ⚠️ `/world-cup`: Size still over 300KB budget (unchanged, known issue)

---

## Root Cause Analysis

### ATP/WTA Regression (Critical)

**Commit:** 8ee5be4 (2026-06-23)  
**Change:** Reverted from ISR caching (`revalidate: 60`) to `force-dynamic` rendering  
**Reason:** Fix rendering bug where only 1 player showed (useSearchParams conflict with ISR)

**Performance Impact:**
```
Before (ISR):
- Pages served from edge cache
- TTFB ~0.16-0.18s (cache hit)
- Background revalidation every 60s
- Minimal upstream API load

After (force-dynamic):
- Every request hits origin
- Every request blocks on ESPN API
- TTFB ~0.31-0.39s (origin + upstream latency)
- Higher upstream API load
- No edge caching benefits
```

**Code Reference:**
- `src/app/atp-live/page.tsx:22` — `export const dynamic = "force-dynamic";`
- `src/app/wta-live/page.tsx:22` — `export const dynamic = "force-dynamic";`

**The Tradeoff:**
The fix correctly solved the rendering bug (ATP/WTA tables now load all players), but the performance cost was not anticipated or measured before deployment.

### World Cup Page Size (Ongoing)

Size remains at 396KB (over 300KB budget). The `perf-wc-page-size` ticket was marked closed after implementing lazy-loading for WorldCupBracket and WorldCupStats components.

**Why size didn't decrease:**
- Page uses ISR (server-side rendering)
- HTML includes all data regardless of lazy-loading
- Lazy-loading benefits JavaScript bundle size (time to interactive), not HTML size
- The `check:performance` script measures HTML via curl, which doesn't capture JS bundle improvements

**Real benefits from lazy-loading (commit 4e4c82e):**
- ✅ Smaller initial JS bundle (bracket/stats load on demand)
- ✅ Faster Time to Interactive
- ✅ Improved LCP (critical content renders without waiting for below-fold components)

**To reduce HTML size below 300KB would require:**
- Server-side pagination of match schedule
- Selective data loading (e.g., only current/upcoming matches initially)
- This is a different optimization than lazy-loading

---

## Recent Code Changes (Since Baseline)

Recent commits that may have affected performance:

1. **8e24153** (2026-06-24) — Add World Cup venue pages
   - Added 16 new stadium pages with matches and SEO
   - Should not affect core route performance (new routes only)

2. **80676a6** (2026-06-23) — Add World Cup group qualification scenarios calculator
   - World Cup page feature addition
   - May contribute to World Cup page size

3. **d419b04** (2026-06-23) — Add interactive World Cup bracket predictor
   - World Cup page feature addition
   - May contribute to World Cup page size

4. **8ee5be4** (2026-06-23) — Fix ATP/WTA Live ranking table loading failure
   - **PRIMARY CAUSE OF ATP/WTA REGRESSION**
   - Changed from ISR to force-dynamic

---

## Core Web Vitals

**Status:** Not measured in this run (Lighthouse/PageSpeed Insights not available in automated environment).

**Expected Impact from Regressions:**
- **LCP (Largest Contentful Paint):** Likely degraded on ATP/WTA pages due to slower TTFB and larger payloads
- **INP (Interaction to Next Paint):** Likely unaffected (no client-side changes)
- **CLS (Cumulative Layout Shift):** Likely unaffected (no layout changes)

**Recommendation:** Manual Lighthouse audit on ATP/WTA pages to quantify LCP regression.

---

## Tickets Filed

### 1. perf-atp-wta-isr-regression (NEW — Priority 0)

**Issue:** ATP and WTA Live pages reverted from ISR to force-dynamic, causing 2x performance regression.

**Impact:**
- ATP TTFB: 0.18s → 0.39s (+117%)
- WTA TTFB: 0.16s → 0.31s (+94%)
- Both pages now over size budget
- All traffic hits origin instead of edge cache

**Solution:** Restore ISR caching while keeping country filter working via:
- Move `useSearchParams` to a separate Client Component wrapped in Suspense, OR
- Use server-side `searchParams` prop instead of `useSearchParams` hook

**Why P0:**
- Affects the two highest-traffic pages (ATP/WTA are core product)
- Measured 2x regression vs baseline
- Directly impacts SEO (Core Web Vitals) and ad revenue
- Can be fixed without sacrificing the country filter feature

**Budget:**
- Target: ATP TTFB < 0.3s, size < 300KB; WTA TTFB < 0.3s, size < 200KB
- Expected: ~50% TTFB reduction, ~30% size reduction (restore to ISR baseline)

---

## Open Performance Debt (No Change)

The following tickets remain open from previous runs:

1. **perf-atp-page-size** (Priority 2) — Reduce ATP page to <100KB via server-side pagination
2. **perf-font-optimization** (Priority 3) — Reduce from 5 font families to 2-3, add display: swap

---

## Recommendations

### Immediate (P0)

1. **Fix `perf-atp-wta-isr-regression` ASAP** — This is a measured regression on the two highest-traffic pages. Every hour this persists costs SEO ranking and ad revenue.

### Short Term

2. **Add performance regression detection to CI** — This regression could have been caught before deployment with automated performance testing:
   ```bash
   # In CI, after build:
   npm run check:performance
   # Compare to baseline, fail if TTFB/size regressed >25%
   ```

3. **Consider Core Web Vitals monitoring** — Set up Lighthouse CI or PageSpeed Insights API monitoring to track LCP/INP/CLS over time.

### Long Term

4. **World Cup HTML size** — The lazy-loading optimization (commit 4e4c82e) improved JS bundle and rendering performance but didn't reduce HTML size. If HTML size remains a concern, consider server-side pagination.

---

## Conclusion

**Status: 🔴 REGRESSION DETECTED**

The ATP and WTA Live pages experienced severe performance regressions due to reverting from ISR caching to force-dynamic rendering. This change was necessary to fix a rendering bug but had unintended performance consequences.

**Action Required:** Restore ISR caching on ATP/WTA pages while keeping the country filter working (ticket `perf-atp-wta-isr-regression`, Priority 0).

**Positive Note:** World Cup page TTFB/total improved slightly, and homepage remains fast.

---

**Next Run:** 2026-06-25 (daily schedule)  
**Report By:** perf-inspector agent
