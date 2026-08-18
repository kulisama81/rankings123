# Performance Report — 2026-08-18

## Summary

🔴 **CRITICAL ATP SIZE REGRESSION DETECTED** — ATP Live page size jumped from 273KB (within 300KB budget) to 557KB (+284KB, +104%), now **86% OVER BUDGET**. This is a NEW regression separate from the previously-resolved ShareButton bloat. WTA and World Cup show minor increases within normal variance. All routes remain FAST (within TTFB/total budgets).

## Measurements (2026-08-18 vs 2026-08-17 baseline)

**HTTP Fetch (`npm run check:performance`):**

| Route        | TTFB (baseline → current) | Total (baseline → current) | Size (baseline → current) | Status |
|--------------|---------------------------|----------------------------|---------------------------|--------|
| **Homepage** | 0.18s → 0.29s (+61%)      | 0.18s → 0.31s (+72%)       | 28KB → 29KB (+3.6%)       | ✅ FAST |
| **ATP Live** | 0.16s → 0.23s (+44%)      | 0.32s → 0.43s (+34%)       | 273KB → **557KB (+104%)** | 🔴 SIZE CRITICAL |
| **WTA Live** | 0.13s → 0.14s (+7.7%)     | 0.24s → 0.31s (+29%)       | 287KB → 313KB (+9%)       | 🔴 SIZE FAIL |
| **World Cup**| 0.12s → 0.13s (+8.3%)     | 0.22s → 0.29s (+32%)       | 344KB → 393KB (+14%)      | 🟡 SIZE |

**Core Web Vitals (Playwright):**
- ⚠️ **Not measured** — Requires user approval for automated browser testing
- **Last measured 2026-08-13:** All routes GOOD (FCP < 1.8s, CLS 0.000)

## Analysis

### 🔴 ATP Live — CRITICAL NEW REGRESSION

**Size: 557KB vs 300KB budget (86% over, +284KB vs baseline)**

This is a **NEW regression** separate from the ShareButton bloat that was successfully fixed on 2026-08-14 (commit a45a884 brought ATP from 504KB to 273KB). The ATP page held at ~273KB for 5 consecutive days (Day 18-22, 2026-08-13 to 2026-08-17) and has now jumped 104% in one day.

**Root cause investigation:**

1. **No code changes** to ATP Live page, ShareButton, or data feeds since 2026-08-17
2. **Code changes in period** are limited to:
   - Three new article pages (`/articles/jannik-sinner-ranking-2026`, etc.) — separate routes, shouldn't affect ATP bundle
   - New `playerData.ts` library — NOT imported by ATP Live page
   - Changelog and sitemap updates — minimal impact
3. **Likely data-driven** — Possible causes:
   - UTS deep ranking feed now returning more players (closer to DEEP_N = 1000 limit, vs ~500-700 previously)
   - Tournament data increased (more active tournaments, longer tournament names, more match data)
   - ESPN scoreboard returning more data
4. **Historical context**: ATP peaked at 521KB (Day 11, 2026-08-06) during ShareButton bloat, was optimized to 273KB, now at 557KB (higher than peak)

**Impact:**
- 📱 **Mobile UX degraded**: 557KB = ~5.2s on slow 3G (was ~2.5s at 273KB)
- 💰 **Revenue**: Blocks Phase 3 monetization (betting affiliates have strict page weight requirements)
- 🎯 **US Open 2026**: Starts Aug 27 (9 days away) — critical timing for tennis traffic

### 🔴 WTA Live — Existing regression worsening

**Size: 313KB vs 200KB budget (57% over, +9% vs baseline)**

WTA continues to trend upward:
- Day 20: 272KB (36% over)
- Day 21: 281KB (41% over)
- Day 22: 287KB (44% over)
- Day 23: 313KB (57% over, **+26KB worsening**)

ShareButton optimization (commit a45a884) helped WTA from 273KB to 266KB but regression resumed. Combination of ShareButton bloat + recent CSS additions + data variance.

### 🟡 World Cup — Minor increase

**Size: 393KB vs 300KB budget (31% over, +14% vs baseline)**

WC had improved to 344KB (15% over) after TBD removal fix (commit 67a5e71), now increased to 393KB (+49KB). Likely data variance (tournament ended ~30 days ago, historical data stable but possibly more detailed).

### ⚠️ Load time variances

All routes show TTFB/total increases (+8% to +72%) but **all remain within budgets** (TTFB < 0.8s, total < 2.0s). Likely transient network/edge latency, will monitor.

## Code Changes Since 2026-08-17

1. `e8a2bca` — Update changelog: player ranking articles — **changelog only**
2. `522475e` — Add player ranking articles MVP (3 of 10): Sinner, Alcaraz, Sabalenka — **new article pages + playerData.ts**
3. `ebb8e44` — Autoresearch 2026-08-18 — **tickets only**
4. `975f547` — Inspector 2026-08-17 evening — **tickets only**
5. `d18ce21` — Close data-anomaly — **tickets only**

**No code changes** to ATP/WTA/World Cup pages, LiveRankingTable, ShareButton, or core data feeds.

## Impact Summary

- 🔴 **ATP CRITICAL**: New regression (+284KB, +104%) requires immediate investigation
- 🔴 **WTA WORSENING**: +26KB from yesterday, now 57% over budget
- 🟡 **WC increasing**: +49KB from optimized baseline
- ✅ **All routes FAST**: Within TTFB (< 0.8s) and total (< 2.0s) budgets
- ⚠️ **US Open 2026**: 9 days away — critical window for tennis traffic
- 💰 **Revenue**: All three size regressions block Phase 3 monetization

## Budget Status

| Route        | Size Budget | Current Size | Over/Under | Status |
|--------------|-------------|--------------|------------|--------|
| Homepage     | ≤ 150KB     | 29KB         | -81%       | ✅ FAST |
| **ATP Live** | ≤ 300KB     | **557KB**    | **+86%**   | 🔴 CRITICAL |
| **WTA Live** | ≤ 200KB     | **313KB**    | **+57%**   | 🔴 FAIL |
| World Cup    | ≤ 300KB     | 393KB        | +31%       | 🟡 OVER |

## Recommendations

1. **ATP (P0 — URGENT)**: Investigate data source changes:
   - Check UTS deep ranking player count (expected ~500-700, possibly now ~1000)
   - Check ESPN scoreboard tournament data size
   - Consider implementing pagination or virtualization if player count increased
   - Consider lazy-loading below-the-fold players
   - Add data-size monitoring to catch regressions early

2. **WTA (P1 — URGENT)**: Continue ShareButton optimization per existing ticket
   - Virtualize ShareButtons (react-window/react-virtual)
   - Or single share button per table with modal
   - Target: -113KB reduction to reach 200KB budget

3. **World Cup (P2)**: Investigate +49KB increase
   - Check if historical tournament data changed
   - Consider lazy-loading bracket or stats sections
   - Target: -93KB reduction to reach 300KB budget

4. **Core Web Vitals**: Request user approval to enable automated Playwright measurement for comprehensive monitoring

## Next Steps

- [ ] File P0 ticket: ATP size regression investigation (557KB → < 300KB target)
- [ ] Update existing WTA ticket with worsening trend (+26KB)
- [ ] Update baseline with current measurements
- [ ] Commit and push docs + tickets only (no app code)

## Baseline Comparison

**Per-route performance (2026-08-17 → 2026-08-18):**

```
Homepage:   TTFB 0.18s → 0.29s (+61%), total 0.18s → 0.31s (+72%), size 28KB → 29KB (+4%)
ATP Live:   TTFB 0.16s → 0.23s (+44%), total 0.32s → 0.43s (+34%), size 273KB → 557KB (+104%)  🔴
WTA Live:   TTFB 0.13s → 0.14s (+8%),  total 0.24s → 0.31s (+29%), size 287KB → 313KB (+9%)   🔴
World Cup:  TTFB 0.12s → 0.13s (+8%),  total 0.22s → 0.29s (+32%), size 344KB → 393KB (+14%)  🟡
```

**Historical ATP size trend:**
- 2026-07-26 (pre-ShareButton): 439KB
- 2026-07-27 (Day 1 regression): 504KB (peak before opt)
- 2026-08-06 (Day 11 peak): 521KB
- 2026-08-12 (Day 17 mock): 258KB (mock fallback, 100 players)
- 2026-08-13 (Day 18 restored): 271KB
- 2026-08-14 (Day 19 optimized): 272KB ✅ **BUDGET ACHIEVED**
- 2026-08-15-17 (Days 20-22): 272-273KB ✅ **BUDGET MAINTAINED**
- 2026-08-18 (Day 23): **557KB** 🔴 **NEW REGRESSION**

This represents a **reversion beyond the original ShareButton regression**, suggesting a data-source change rather than a code regression.
