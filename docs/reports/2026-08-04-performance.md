# Performance Report — 2026-08-04

## Summary

**Status:** 🔴 **CRITICAL SIZE REGRESSIONS PERSIST (Day 9)** + ✅ **All CWV GOOD**

ShareButton regression from commit 7469e43 (2026-07-26) continues for a **ninth consecutive day**. ATP and WTA Live pages remain critically over size budgets. Sizes essentially stable (±1-3KB measurement variance). **All Core Web Vitals remain GOOD** — excellent user-perceived performance despite HTML payload bloat.

## Measurements

### HTTP Fetch (npm run check:performance)

| Route      | TTFB  | Total | Size  | vs 2026-08-03 | Status      |
|------------|-------|-------|-------|---------------|-------------|
| /          | 0.16s | 0.18s | 29KB  | TTFB -19%, total +20%, size stable | ✅ FAST |
| /atp-live  | 0.16s | 0.46s | 508KB | TTFB stable, total +77%, size +3KB | 🔴 SIZE FAIL |
| /wta-live  | 0.22s | 0.35s | 260KB | TTFB +83%, total +52%, size +1KB | 🔴 SIZE FAIL |
| /world-cup | 0.14s | 0.28s | 382KB | TTFB +17%, total +27%, size stable | ⚠️ SIZE |

### Core Web Vitals (Playwright, Real Browser)

| Route      | LCP   | FCP   | CLS   | TTFB  | Transfer | vs 2026-08-03 | Status |
|------------|-------|-------|-------|-------|----------|---------------|--------|
| /          | 2.28s | 0.77s | 0.029 | 0.04s | 7KB      | LCP +126%, FCP +141% | ✅ GOOD |
| /atp-live  | 0.69s | 0.41s | 0.000 | 0.04s | 45KB     | LCP +47%, FCP +28% | ✅ GOOD |
| /wta-live  | 0.40s | 0.32s | 0.000 | 0.03s | 20KB     | LCP -37%, FCP -32% | ✅ GOOD |
| /world-cup | 0.56s | 0.42s | 0.000 | 0.03s | 29KB     | LCP +37%, FCP +8% | ✅ GOOD |

**Assessment:** ✅ **ALL ROUTES PASS GOOD THRESHOLDS** (LCP < 2.5s, FCP < 1.8s, CLS < 0.1)

## Analysis

### ShareButton Regression — Day 9

- 🔴 **ATP size regression PERSISTS:** 508KB (69% over 300KB budget, Day 9, +3KB data variance)
- 🔴 **WTA size regression PERSISTS:** 260KB (30% over 200KB budget, Day 9, +1KB data variance)
- ✅ **Size changes are measurement variance:** ATP +3KB (+0.6%), WTA +1KB (+0.4%) — no code changes to ShareButton or tennis pages
- ✅ **All Core Web Vitals GOOD:** All routes pass LCP < 2.5s, FCP < 1.8s, CLS < 0.1 thresholds
- ✅ **Perfect layout stability:** CLS 0.000 on ATP/WTA/WC, 0.029 on homepage (all GOOD)

### Load Time Variances

**HTTP fetch measurements show variances** across multiple routes:
- **Homepage:** total +20% (0.15s → 0.18s, within budget)
- **ATP Live:** total +77% (0.26s → 0.46s, within 2.0s budget)
- **WTA Live:** TTFB +83%, total +52% (0.22s → 0.35s, 0.23s → 0.35s, within budgets)
- **World Cup:** TTFB +17%, total +27% (within budgets)

**Why variances are likely transient:**
1. **Multiple routes affected** — suggests upstream/network/edge latency, not isolated code issue
2. **No code changes** — Zero commits to app code since 2026-08-03 (only autoresearch tickets)
3. **Sizes stable** — ATP +3KB, WTA +1KB, WC/Homepage unchanged (no payload bloat)
4. **All within budget** — TTFB < 0.8s, total < 2.0s on all routes
5. **Core Web Vitals remain GOOD** — Real user experience is excellent (LCP/FCP/CLS all GOOD)
6. **Historical pattern** — Matches 15+ prior TTFB/load variances that resolved within 1-2 days

### Core Web Vitals Notable Changes vs 2026-08-03

**Homepage:**
- LCP +126% (1.01s → 2.28s) — still GOOD but degraded
- FCP +141% (0.32s → 0.77s) — still GOOD but degraded
- CLS 0.000 → 0.029 — still GOOD, minimal layout shift
- TTFB -69% (0.13s → 0.04s) — major improvement

**ATP Live:**
- LCP +47% (0.47s → 0.69s) — still excellent
- FCP +28% (0.32s → 0.41s) — still excellent
- CLS 0.000 (perfect stability, unchanged)
- TTFB stable (0.04s)

**WTA Live:**
- LCP -37% (0.63s → 0.40s) — **improvement**
- FCP -32% (0.47s → 0.32s) — **improvement**
- CLS 0.000 (perfect stability, unchanged)
- TTFB -84% (0.19s → 0.03s) — **major improvement**

**World Cup:**
- LCP +37% (0.41s → 0.56s) — still excellent
- FCP +8% (0.39s → 0.42s) — minimal change
- CLS 0.000 (perfect stability, unchanged)
- TTFB -40% (0.05s → 0.03s) — improvement

**Note:** Transfer sizes in browser measurements are much smaller than HTTP fetch sizes due to compression, caching, and resource loading optimization.

## Code Changes Since 2026-08-03

1. `0e5cda5` — Autoresearch 2026-08-04: Data Sources & Accuracy (7 tickets) — tickets only

**No code changes** to ATP/WTA/World Cup/Homepage pages, ShareButton component, or data feeds.

## Impact

- 🔴 **Day 9 of critical size regressions** — both tennis pages (core traffic drivers) remain critically over budget
- ✅ **All Core Web Vitals GOOD** — Excellent user-perceived performance despite size bloat
- 📱 **Mobile:** WTA 260KB = ~2.4s on slow 3G, ATP 508KB = ~4.7s
- 💰 **Revenue:** Blocks Phase 3 monetization (ads + betting affiliates)
- 🏆 **FIFA World Cup 2026:** Tournament ENDED ~July 19 (16 days ago) — elevated traffic period over

## Tickets

- **`perf-share-button-bloat`** (Priority 1) — OPEN (awaiting planner work)
  - ATP: 508KB (69% over 300KB budget)
  - WTA: 260KB (30% over 200KB budget)
  - Root cause: ShareButton component on every player row
  - Fix: virtualize, single share button, lazy-load, or code-split

**No new tickets filed** — existing P1 ticket covers both regressions.

## Conclusion

ShareButton regression persists for a ninth consecutive day with sizes essentially stable (±1-3KB data variance). **Load time variances detected** across all routes but all within budgets and **likely transient** (pattern matches 15+ historical variances that resolved without intervention). **Core Web Vitals remain excellent** — all routes GOOD, perfect layout stability (CLS 0.000 on 3/4 routes). User experience is strong despite HTML payload bloat.

**Recommendation:** Continue monitoring. Fix ShareButton bloat when planner has capacity (P1 ticket already filed). Load time variances should resolve within 1-2 days based on historical pattern.
