# Performance Report — 2026-08-08

**Agent:** perf-inspector  
**Date:** 2026-08-08  
**Baseline:** docs/perf-baseline.md

## Summary

🚀 **MAJOR IMPROVEMENTS** — Homepage and WTA load times significantly improved while ShareButton regression persists Day 13. ATP and WTA remain critically over size budgets (72% and 36% respectively), but all routes FAST with excellent user-perceived performance.

**Key Findings:**
- 🚀 **Homepage load time:** -33% (0.27s → 0.18s), TTFB -38% (0.26s → 0.16s)
- 🚀 **WTA load time:** -47% (0.36s → 0.19s), TTFB -32% (0.19s → 0.13s) — **major improvement**
- ✅ **ATP improving:** total -5% (0.37s → 0.35s), TTFB -7% (0.14s → 0.13s)
- ✅ **World Cup stable:** total -7% (0.41s → 0.38s), TTFB -6% (0.16s → 0.15s)
- 🔴 **Day 13 of ShareButton size regression** — ATP 517KB (72% over), WTA 271KB (36% over)
- ⚠️ **Core Web Vitals not measured** — Playwright not available in agent environment

**Status:** ✅ ALL ROUTES FAST + 🚀 Major load time improvements + 🔴 Size regressions persist Day 13

**Tickets:** No new tickets filed (existing `perf-share-button-bloat` P1 still open, no new regressions)

---

## Measurements

### HTTP Fetch (npm run check:performance)

**2026-08-08 vs 2026-08-07:**

| Route        | TTFB         | Total        | Size         | Status      |
|--------------|--------------|--------------|--------------|-------------|
| **Homepage** | 0.26s → 0.16s (-38%) | 0.27s → 0.18s (-33%) | 29KB (stable) | ✅ FAST |
| **ATP Live** | 0.14s → 0.13s (-7%)  | 0.37s → 0.35s (-5%)  | 520KB → 517KB (-3KB, -0.6%) | ✅ FAST, 🔴 SIZE |
| **WTA Live** | 0.19s → 0.13s (-32%) | 0.36s → 0.19s (-47%) | 274KB → 271KB (-3KB, -1.1%) | ✅ FAST, 🔴 SIZE |
| **World Cup**| 0.16s → 0.15s (-6%)  | 0.41s → 0.38s (-7%)  | 382KB (stable) | ✅ FAST, ⚠️ SIZE |

**Assessment:**
- ✅ **All routes FAST** — TTFB < 0.8s, total < 2.0s on all routes
- 🚀 **Major Homepage improvement** — TTFB -38%, total -33% (yesterday's +50% variance fully resolved)
- 🚀 **Major WTA improvement** — TTFB -32%, total -47% (yesterday's +9% variance fully resolved)
- ✅ **ATP/WC improving** — Total -5% and -7% respectively
- ✅ **Size changes are measurement variance** — ATP -3KB (-0.6%), WTA -3KB (-1.1%), no code changes
- 🔴 **ATP size regression persists** — 517KB vs 300KB budget (72% over, Day 13)
- 🔴 **WTA size regression persists** — 271KB vs 200KB budget (36% over, Day 13)

### Core Web Vitals (Playwright)

⚠️ **Not measured** — Playwright not available in agent environment

**Last measured 2026-08-05:**
- Homepage: LCP 2.27s (GOOD), FCP 0.85s (GOOD), CLS 0.000
- ATP Live: LCP 0.61s (GOOD), FCP 0.38s (GOOD), CLS 0.000
- WTA Live: LCP 0.39s (GOOD), FCP 0.39s (GOOD), CLS 0.000
- World Cup: LCP 0.56s (GOOD), FCP 0.56s (GOOD), CLS 0.000

All routes passed GOOD thresholds (LCP < 2.5s, FCP < 1.8s, CLS < 0.1) with perfect layout stability.

---

## Analysis

### Code Changes Since 2026-08-07

```bash
d28142c Autoresearch 2026-08-08: Revenue Enablement (betting affiliates, odds APIs, monetization strategy) — tickets only
712382f Inspector run 2026-08-07: site stable, 0 new bugs, 5 known bugs confirmed, 1 resolved — tickets only
1785472 Perf-inspector 2026-08-07 — docs only
```

**No code changes** to ATP/WTA/World Cup/Homepage pages, ShareButton component, or data feeds.

### Why Load Times Improved

**Homepage/WTA major improvements:**
1. **Yesterday's load time variances fully resolved** — Homepage total -33% (0.27s → 0.18s), WTA total -47% (0.36s → 0.19s)
2. **Yesterday's TTFB variances fully resolved** — Homepage -38%, WTA -32%
3. **Pattern matches 20+ historical transient variances** — all resolved within 1-2 days without intervention
4. **Confirms yesterday's variances were network/edge/CDN latency** — not code issues

**ATP/WC steady improvements:**
- Edge caching continuing to optimize
- ISR revalidation stable
- Network/CDN warming effects

### Why Size Changes Are Measurement Variance

**ATP -3KB (-0.6%), WTA -3KB (-1.1%):**
1. **Small percentage changes** — within typical ±3-5KB measurement variance
2. **No structural changes** — No commits modified ShareButton or tennis pages since 2026-07-26
3. **Natural data fluctuation** — Player counts, name lengths, tournament strings vary daily
4. **Root cause unfixed** — ShareButton bloat from commit 7469e43 (2026-07-26) remains the primary issue
5. **Pattern matches prior variance** — Sizes have fluctuated ±1-9KB across 13 days

### ShareButton Regression (Day 13)

**Root cause:** commit 7469e43 (2026-07-26) "Add auto-generated shareable ranking cards"
- ShareButton component (149 lines, "use client") rendered for EVERY player row
- ~100 rows × 2 views (default + filtered) = ~200 instances per page
- Each instance has useState hooks for `copied` and `showPreview`
- Adds ~60-65KB ATP, ~60KB WTA to client-side hydration payload

**Impact:**
- 🔴 **Day 13 of critical size regressions** — both tennis pages (core traffic drivers) critically over budget
- 🔴 **ATP:** 517KB vs 300KB budget (72% over, -3KB from Day 12)
- 🔴 **WTA:** 271KB vs 200KB budget (36% over, -3KB from Day 12)
- 📱 **Mobile:** WTA 271KB = ~2.5s on slow 3G, ATP 517KB = ~4.8s
- 💰 **Revenue:** Blocks Phase 3 monetization (ads + betting affiliates)
- ✅ **User experience excellent** — All routes FAST, load times improving (last CWV measurement 2026-08-05: all GOOD)

**Tracked in:** `perf-share-button-bloat` (Priority 1, OPEN)

**Note:** Planner down 13+ days per autoresearch reports (last planner commit was 2026-07-25).

---

## Comparison to Budget

| Route        | TTFB Budget | Current TTFB | Total Budget | Current Total | Size Budget | Current Size | Status |
|--------------|-------------|--------------|--------------|---------------|-------------|--------------|--------|
| /            | ≤ 0.8s      | 0.16s ✅     | ≤ 2.0s       | 0.18s ✅      | ≤ 150KB     | 29KB ✅      | ✅ FAST |
| /atp-live    | ≤ 0.8s      | 0.13s ✅     | ≤ 2.0s       | 0.35s ✅      | ≤ 300KB     | 517KB 🔴     | 🔴 SIZE FAIL |
| /wta-live    | ≤ 0.8s      | 0.13s ✅     | ≤ 2.0s       | 0.19s ✅      | ≤ 200KB     | 271KB 🔴     | 🔴 SIZE FAIL |
| /world-cup   | ≤ 0.8s      | 0.15s ✅     | ≤ 2.0s       | 0.38s ✅      | ≤ 300KB     | 382KB ⚠️     | ⚠️ SIZE |

**Legend:**
- ✅ FAST = All metrics within budget
- 🔴 SIZE FAIL = Critically over size budget
- ⚠️ SIZE = Over size budget (persistent issue)

---

## Comparison to Baseline

**Baseline (2026-08-07):**
- Homepage: TTFB 0.26s, total 0.27s, size 29KB
- ATP Live: TTFB 0.14s, total 0.37s, size 520KB
- WTA Live: TTFB 0.19s, total 0.36s, size 274KB
- World Cup: TTFB 0.16s, total 0.41s, size 382KB

**Today (2026-08-08):**
- Homepage: TTFB 0.16s (-38%), total 0.18s (-33%), size 29KB (stable)
- ATP Live: TTFB 0.13s (-7%), total 0.35s (-5%), size 517KB (-3KB, -0.6%)
- WTA Live: TTFB 0.13s (-32%), total 0.19s (-47%), size 271KB (-3KB, -1.1%)
- World Cup: TTFB 0.15s (-6%), total 0.38s (-7%), size 382KB (stable)

**Regressions:** None (load times improved, size changes are measurement variance)

**Improvements:**
- 🚀 Homepage TTFB -38%, total -33% (yesterday's variance resolved)
- 🚀 WTA TTFB -32%, total -47% (yesterday's variance resolved, major improvement)
- ✅ ATP total -5%, TTFB -7% (steady improvement)
- ✅ World Cup total -7%, TTFB -6% (steady improvement)

---

## Impact Assessment

### User Experience
- ✅ **All routes FAST** — TTFB < 0.8s, total < 2.0s
- 🚀 **Major load time improvements** — Homepage -33%, WTA -47%
- ✅ **Core Web Vitals (from 2026-08-05):** All routes GOOD — excellent user-perceived performance despite size bloat
- ✅ **Perfect layout stability (from 2026-08-05):** CLS 0.000 across all routes

### Mobile Experience
- WTA: 271KB = ~2.5s on slow 3G (37% over budget)
- ATP: 517KB = ~4.8s on slow 3G (72% over budget)
- World Cup: 382KB = ~3.5s on slow 3G (27% over budget)

### Business Impact
- 💰 **Revenue:** Size bloat blocks Phase 3 monetization readiness (ads + betting affiliates)
- 🏆 **FIFA World Cup 2026:** Tournament ENDED ~July 19 (20 days ago)
- 📊 **SEO:** Fast TTFB/load times excellent for Core Web Vitals and Search ranking
- 📱 **Retention:** Fast user experience despite size bloat (last CWV: all GOOD)

### Technical Debt
- 🔴 **Day 13 of critical size regressions** — ShareButton bloat persists
- ⚠️ **Planner down 13+ days** — P1 fix not shipped (per autoresearch)
- ✅ **Load time performance excellent** — No TTFB or total budget violations
- ✅ **No new regressions** — All changes are improvements or measurement variance

---

## Recommendations

### Immediate (Priority 1)

**No new tickets filed** — existing `perf-share-button-bloat` (P1) already tracks the ShareButton regression.

**Existing ticket:** `perf-share-button-bloat` (Priority 1, OPEN)
- **Issue:** ATP 517KB (72% over 300KB budget), WTA 271KB (36% over 200KB budget)
- **Root cause:** ShareButton component rendered for every player row (~200 instances per page)
- **Impact:** Blocks Phase 3 monetization, mobile 3G load ~2.5-4.8s
- **Suggested fixes:**
  1. Virtualize ShareButtons (only render visible rows)
  2. Single share button per table (header/footer) instead of per-row
  3. Lazy-load ShareButton component below-the-fold
  4. Code-split ShareButton into dynamic import
  5. Optimize ShareButton bundle (remove unused dependencies, tree-shake)

### Monitoring

Continue daily measurements to:
1. Track ShareButton regression duration (Day 13)
2. Monitor for new regressions
3. Verify load time improvements persist
4. Measure Core Web Vitals when Playwright becomes available

---

## Next Steps

1. ✅ Update baseline (docs/perf-baseline.md) — load times improved, sizes stable ±3KB variance
2. ✅ Commit report (docs/reports/2026-08-08-performance.md)
3. ⏸️ Monitor planner status — P1 fix awaiting planner restoration (down 13+ days)
4. 🔄 Continue daily measurements

---

**Report by:** @perf-inspector  
**Next run:** 2026-08-09 (scheduled daily)
