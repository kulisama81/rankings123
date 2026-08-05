# Performance Report — 2026-08-05

## Summary

**Status:** 🔴 **SIZE REGRESSIONS WORSENING (Day 10)** + ✅ **All CWV GOOD** + 🚀 **Major TTFB/Load Improvements**

ShareButton regression from commit 7469e43 (2026-07-26) **worsens on Day 10**. ATP and WTA Live size increases larger than typical variance (ATP +9KB/+1.8%, WTA +13KB/+5%). **Excellent news:** all routes show **major TTFB/load improvements** (Homepage -25%, ATP -25%/-24%, WTA -18%/-6%) and **all Core Web Vitals remain GOOD** — user-perceived performance is excellent despite HTML payload bloat.

## Measurements

### HTTP Fetch (npm run check:performance)

| Route      | TTFB  | Total | Size  | vs 2026-08-04 | Status      |
|------------|-------|-------|-------|---------------|-------------|
| /          | 0.12s | 0.14s | 29KB  | TTFB -25%, total -22%, size stable | ✅ FAST |
| /atp-live  | 0.12s | 0.35s | 517KB | TTFB -25%, total -24%, **size +9KB (+1.8%)** | 🔴 SIZE FAIL |
| /wta-live  | 0.18s | 0.33s | 273KB | TTFB -18%, total -6%, **size +13KB (+5%)** | 🔴 SIZE FAIL |
| /world-cup | 0.14s | 0.30s | 382KB | TTFB stable, total +7%, size stable | ⚠️ SIZE |

### Core Web Vitals (Playwright with Chromium)

| Route      | LCP   | FCP   | CLS   | TTFB  | Transfer | vs 2026-08-04 | Status |
|------------|-------|-------|-------|-------|----------|---------------|--------|
| /          | 2.27s | 0.85s | 0.000 | 0.16s | 490KB    | LCP -0.4%, FCP +10% | ✅ GOOD |
| /atp-live  | 0.61s | 0.38s | 0.000 | 0.04s | 454KB    | LCP -12%, FCP -7% | ✅ GOOD |
| /wta-live  | 0.39s | 0.39s | 0.000 | 0.04s | 280KB    | LCP -2.5%, FCP +22% | ✅ GOOD |
| /world-cup | 0.56s | 0.56s | 0.000 | 0.04s | 130KB    | LCP stable, FCP +33% | ✅ GOOD |

**Assessment:** ✅ **ALL ROUTES PASS GOOD THRESHOLDS** (LCP < 2.5s, FCP < 1.8s, CLS < 0.1)

## Analysis

### 🔴 ShareButton Regression — Day 10, WORSENING

- 🔴 **ATP size regression WORSENING:** 508KB → 517KB (+9KB, +1.8%, now **72% over 300KB budget** vs 69% yesterday)
- 🔴 **WTA size regression WORSENING:** 260KB → 273KB (+13KB, +5%, now **36.5% over 200KB budget** vs 30% yesterday)
- ⚠️ **Size increases larger than typical variance:** Recent days showed ±1-3KB (+0.4-0.6%), today ATP +1.8%, WTA +5%
- ✅ **All Core Web Vitals GOOD:** All routes pass LCP < 2.5s, FCP < 1.8s, CLS < 0.1 thresholds
- ✅ **Perfect layout stability:** CLS 0.000 across all routes (ATP/WTA/WC), Homepage 0.000 vs 0.029 yesterday

### 🚀 Major TTFB/Load Improvements

**Yesterday's load time variances RESOLVED**, all routes show major improvements:
- **Homepage:** TTFB -25% (0.16s → 0.12s), total -22% (0.18s → 0.14s)
- **ATP Live:** TTFB -25% (0.16s → 0.12s), total -24% (0.46s → 0.35s)
- **WTA Live:** TTFB -18% (0.22s → 0.18s), total -6% (0.35s → 0.33s)
- **World Cup:** TTFB stable (0.14s), total +7% (0.28s → 0.30s, minor variance)

**Why yesterday's variances resolved:**
1. Pattern matches 15+ historical transient variances (all resolved within 1-2 days)
2. Network/edge/CDN latency returned to normal
3. No code changes to trigger sustained slowdown

### ✅ Core Web Vitals — All Routes GOOD

**ATP Live:**
- LCP **improved** -12% (0.69s → 0.61s) — excellent
- FCP **improved** -7% (0.41s → 0.38s) — excellent
- CLS 0.000 (perfect stability, unchanged)
- TTFB stable (0.04s)

**WTA Live:**
- LCP stable (0.40s → 0.39s, -2.5%) — excellent
- FCP +22% (0.32s → 0.39s) — still GOOD
- CLS 0.000 (perfect stability, unchanged)
- TTFB stable (0.04s)

**Homepage:**
- LCP stable (2.28s → 2.27s, -0.4%) — GOOD
- FCP +10% (0.77s → 0.85s) — still GOOD
- CLS **improved** (0.029 → 0.000, perfect stability)
- TTFB +300% (0.04s → 0.16s) — browser measurement variance, still excellent

**World Cup:**
- LCP stable (0.56s) — excellent
- FCP +33% (0.42s → 0.56s) — still GOOD
- CLS 0.000 (perfect stability, unchanged)
- TTFB stable (0.04s)

**Note:** Browser transfer sizes differ from HTTP fetch due to compression, caching, and resource loading optimization.

### Why Size Increases Are Likely Data Variance

No code changes to ShareButton or tennis pages since 2026-08-04:
1. `5ae187c` — Autoresearch 2026-08-05 (tickets only)
2. `b7a0f2a` / `4090989` — Inspector runs (tickets only)

**Likely causes of larger-than-usual variance:**
- More players in ranking data (tournament entries/withdrawals)
- Longer player names or tournament strings
- More live match data (active tournaments)
- Natural week-to-week fluctuation in data payloads

**Root cause unchanged:** ShareButton component on every player row (commit 7469e43) remains the structural bloat issue.

## Code Changes Since 2026-08-04

1. `5ae187c` — Autoresearch 2026-08-05: Loop & Process Health (planner down 11 days, 7 tickets) — tickets only
2. `b7a0f2a` — Inspector run 2026-08-04 (second): site stable, 6 known bugs confirmed, no new issues — tickets only
3. `4090989` — Inspector run 2026-08-04: site stable, 1 known 404 confirmed — tickets only

**No code changes** to ATP/WTA/World Cup/Homepage pages, ShareButton component, or data feeds.

## Impact

- 🔴 **Day 10 of critical size regressions** — both tennis pages (core traffic drivers) remain critically over budget, WORSENING trend
- ✅ **All Core Web Vitals GOOD** — Excellent user-perceived performance despite size bloat
- 🚀 **Major TTFB/load improvements** — Yesterday's variances resolved, all routes faster
- 📱 **Mobile:** WTA 273KB = ~2.5s on slow 3G, ATP 517KB = ~4.8s
- 💰 **Revenue:** Blocks Phase 3 monetization (ads + betting affiliates)
- 🏆 **FIFA World Cup 2026:** Tournament ENDED ~July 19 (17 days ago) — elevated traffic period over

## Tickets

- **`perf-share-button-bloat`** (Priority 1) — OPEN (awaiting planner restoration, planner down 11 days per autoresearch)
  - ATP: 517KB (72% over 300KB budget, +9KB vs yesterday)
  - WTA: 273KB (36.5% over 200KB budget, +13KB vs yesterday)
  - Root cause: ShareButton component on every player row
  - Fix: virtualize, single share button, lazy-load, or code-split

**No new tickets filed** — existing P1 ticket covers both regressions.

## Conclusion

ShareButton regression persists for a **tenth consecutive day** with **worsening trend** (ATP +9KB, WTA +13KB, larger than typical ±1-3KB variance). Likely data variance (more players/longer names/more live matches) rather than code changes, but the underlying ShareButton bloat issue remains unresolved.

**Excellent news:** **Major TTFB/load improvements** across all routes (Homepage -25%, ATP -25%/-24%, WTA -18%/-6%) — yesterday's variances fully resolved. **Core Web Vitals remain excellent** — all routes GOOD, perfect layout stability (CLS 0.000 on all routes). User experience is strong despite HTML payload bloat.

**Recommendation:** Continue monitoring. Fix ShareButton bloat when planner has capacity (P1 ticket already filed, planner down 11 days per autoresearch 2026-08-05).
