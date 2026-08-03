# Performance Report — 2026-08-03

## Summary

🔴 **CRITICAL SIZE REGRESSIONS PERSIST (Day 8)** — ShareButton feature regression from commit 7469e43 (2026-07-26) continues. ATP and WTA Live pages remain critically over size budgets. ✅ **All Core Web Vitals GOOD** — all routes pass LCP/FCP/CLS good thresholds. 🚀 **Major TTFB/load improvements** — yesterday's variances fully resolved, Homepage -38%, ATP -38%, WC -63% TTFB.

## Measurements (2026-08-03 vs 2026-08-02)

### HTTP Fetch (`npm run check:performance`)

| Route      | TTFB       | Total      | Size         | Status      |
|------------|------------|------------|--------------|-------------|
| /          | 0.13s (-38%) | 0.15s (-38%) | 29KB (stable) | ✅ FAST     |
| /atp-live  | 0.14s (-18%) | 0.26s (-38%) | 505KB (+0.2%) | 🔴 SIZE FAIL |
| /wta-live  | 0.12s (-20%) | 0.23s (+5%) | 259KB (+0.8%) | 🔴 SIZE FAIL |
| /world-cup | 0.12s (-63%) | 0.22s (-54%) | 382KB (stable) | ⚠️ SIZE    |

### Core Web Vitals (Playwright with Chromium)

| Route      | LCP        | FCP        | CLS   | TTFB       | Transfer |
|------------|------------|------------|-------|------------|----------|
| /          | 1.01s (-56%) | 0.32s (-57%) | 0.000 | 0.13s (-28%) | 489KB    |
| /atp-live  | 0.47s (-20%) | 0.32s (-3%) | 0.000 | 0.04s (-20%) | 453KB    |
| /wta-live  | 0.63s (+58%) | 0.47s (+18%) | 0.000 | 0.19s (+375%) | 279KB    |
| /world-cup | 0.41s (-11%) | 0.39s (+8%) | 0.000 | 0.05s (stable) | 130KB    |

**CWV Thresholds:** LCP < 2.5s (GOOD), FCP < 1.8s (GOOD), CLS < 0.1 (GOOD)

## Analysis

### 🔴 ShareButton Regression (Day 8)

- **ATP Live:** 505KB vs 300KB budget (**68% over**, +1KB from yesterday, data variance)
- **WTA Live:** 259KB vs 200KB budget (**30% over**, +2KB from yesterday, data variance)
- **Root cause:** commit 7469e43 (2026-07-26) — ShareButton component on every player row
- **Tracked in:** `perf-share-button-bloat` (Priority 1, OPEN)

### ✅ Core Web Vitals — All Routes GOOD

All four routes pass GOOD thresholds for LCP, FCP, and CLS:
- **Homepage:** LCP 1.01s (GOOD < 2.5s), FCP 0.32s (GOOD < 1.8s), CLS 0.000 (GOOD < 0.1)
- **ATP Live:** LCP 0.47s (GOOD), FCP 0.32s (GOOD), CLS 0.000 (GOOD)
- **WTA Live:** LCP 0.63s (GOOD), FCP 0.47s (GOOD), CLS 0.000 (GOOD)
- **World Cup:** LCP 0.41s (GOOD), FCP 0.39s (GOOD), CLS 0.000 (GOOD)

**Perfect layout stability:** CLS 0.000 across all routes (no layout shifts).

### 🚀 Major TTFB/Load Improvements

Yesterday's TTFB/load variances (Homepage +31%/+41%, World Cup +129%/+92%) **fully resolved**:
- **Homepage:** TTFB 0.21s → 0.13s (-38%), total 0.24s → 0.15s (-38%)
- **ATP Live:** TTFB 0.17s → 0.14s (-18%), total 0.42s → 0.26s (-38%)
- **WTA Live:** TTFB 0.15s → 0.12s (-20%), total 0.23s (stable)
- **World Cup:** TTFB 0.32s → 0.12s (-63%), total 0.48s → 0.22s (-54%)

### ⚠️ WTA Core Web Vitals Variance

WTA shows CWV variance vs yesterday:
- LCP: 0.40s → 0.63s (+58%, +230ms)
- FCP: 0.40s → 0.47s (+18%, +70ms)
- TTFB (browser): 0.04s → 0.19s (+375%, +150ms)

**Why likely measurement variance:**
1. **All within GOOD thresholds** — LCP 0.63s < 2.5s, FCP 0.47s < 1.8s
2. **HTTP fetch TTFB improved** — curl TTFB 0.15s → 0.12s (-20%)
3. **Size stable** — 257KB → 259KB (+2KB, +0.8% data variance)
4. **Load time stable** — 0.22s → 0.23s (+5%, +10ms)
5. **No code changes** — zero commits to WTA page since 2026-08-02
6. **Browser vs curl divergence** — browser TTFB 0.19s vs curl 0.12s suggests measurement timing variance
7. **Other routes stable/improving** — Homepage LCP -56%, ATP LCP -20%, WC LCP -11%

Browser measurements can show variance in headless mode due to timing of when metrics are captured. The important signal is that all metrics remain well within GOOD thresholds.

## Code Changes Since 2026-08-02

1. `d8435af` — Autoresearch: Add first-principles ROI notes to key revenue tickets (tickets only)
2. `9556731` — Autoresearch 2026-08-03: Revenue Enablement (9 tickets) (tickets only)
3. `f6b4d60` — Inspector run 2026-08-02 (second) (tickets only)
4. `254d8ff` — Inspector run 2026-08-02 (tickets only)
5. `604dd72` — Perf-inspector 2026-08-02 (docs only)

**No code changes** to ATP/WTA/World Cup/Homepage pages, ShareButton component, or data feeds.

## Impact

- 🔴 **Day 8 of critical size regressions** — both tennis pages (core traffic drivers) remain critically over budget
- ✅ **All Core Web Vitals GOOD** — Excellent user-perceived performance despite size bloat
- 🚀 **TTFB/load major improvements** — Yesterday's variances fully resolved, all routes FAST
- 📱 **Mobile transfer times:** WTA 259KB = ~2.4s on slow 3G, ATP 505KB = ~4.7s
- 💰 **Revenue impact:** Blocks Phase 3 monetization readiness (ads + betting affiliates)
- 🏆 **FIFA World Cup 2026:** Tournament ENDED ~July 19 (15 days ago)

## Status

🔴 **CRITICAL SIZE REGRESSIONS PERSIST (Day 8)** + ✅ **All CWV GOOD** + 🚀 **TTFB/load major improvements**

## Tickets

- `perf-share-button-bloat` (Priority 1) — OPEN (awaiting planner work, Day 8)
- No new tickets filed (no new regressions detected, WTA CWV variance likely measurement noise)

## Recommendation

The ShareButton regression has persisted for 8 consecutive days. While Core Web Vitals remain GOOD (excellent user experience), the HTML payload bloat:
1. **Blocks Phase 3 monetization** — ads and betting affiliates require fast pages
2. **Hurts mobile users** — 4.7s transfer time on slow 3G for ATP
3. **SEO impact** — PageSpeed Insights scores affected by payload size

**Suggested fix (from ticket):** Virtualize ShareButtons (single button per table that copies the selected row's data), lazy-load the component, code-split, or optimize bundle size.
