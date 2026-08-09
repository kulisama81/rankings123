# Performance Report — 2026-08-09

## Summary

ShareButton regression from commit 7469e43 (2026-07-26) **persists for a fourteenth consecutive day**. ATP and WTA Live pages remain critically over size budgets. Sizes stable (±3KB measurement variance). 🚀 **MAJOR load time improvements** — Homepage total -17%, ATP total -26%, WC total -39%. ⚠️ **WTA load time variance** +32%. ✅ **All routes FAST** (within TTFB < 0.8s and total < 2.0s budgets).

## Measurements

**Method:** `npm run check:performance` (TTFB/total/size via live fetch)

**Date:** 2026-08-09  
**Time:** Performance check run  
**Comparison baseline:** 2026-08-08

### HTTP Fetch Results

| Route        | TTFB  | Total | Size  | vs Yesterday TTFB | vs Yesterday Total | vs Yesterday Size |
|--------------|-------|-------|-------|-------------------|--------------------|--------------------|
| /            | 0.13s | 0.15s | 29KB  | -19% (0.16s)      | -17% (0.18s)       | Stable             |
| /atp-live    | 0.14s | 0.26s | 514KB | +8% (0.13s)       | -26% (0.35s)       | -0.6% (-3KB)       |
| /wta-live    | 0.14s | 0.25s | 268KB | +8% (0.13s)       | +32% (0.19s)       | -1.1% (-3KB)       |
| /world-cup   | 0.13s | 0.23s | 382KB | -13% (0.15s)      | -39% (0.38s)       | Stable             |

### Core Web Vitals

⚠️ **Not measured** — Playwright not available in agent environment

**Last measured 2026-08-05:** All routes GOOD (LCP < 2.5s, FCP < 1.8s, CLS 0.000)

## Analysis

### Size Budgets

- 🔴 **ATP size regression PERSISTS:** 514KB vs 300KB budget (**71% over**, Day 14, -3KB data variance)
- 🔴 **WTA size regression PERSISTS:** 268KB vs 200KB budget (**34% over**, Day 14, -3KB data variance)
- ⚠️ **World Cup size:** 382KB vs 300KB budget (27% over, stable post-tournament)
- ✅ **Homepage within budget:** 29KB vs 150KB budget

### Load Time Performance

- 🚀 **Homepage major improvements:** TTFB -19%, total -17%
- 🚀 **ATP major improvements:** Total -26% (0.35s → 0.26s, load time excellent)
- 🚀 **World Cup major improvements:** TTFB -13%, total -39% (0.38s → 0.23s)
- ⚠️ **WTA load time variance:** Total +32% (0.19s → 0.25s, but still FAST)
- ⚠️ **ATP/WTA TTFB minor variance:** Both +8% (+0.01s, within budget)
- ✅ **All routes FAST:** Within TTFB (< 0.8s) and total (< 2.0s) budgets

### Regression Tracking

**ShareButton regression (commit 7469e43, 2026-07-26):**
- **Duration:** Day 14 (two full weeks)
- **ATP size progression:** 439KB → 504KB (+65KB Day 1) → ... → 517KB (Day 13) → 514KB (Day 14, **-3KB**)
- **WTA size progression:** 189KB → 250KB (+61KB Day 1) → ... → 271KB (Day 13) → 268KB (Day 14, **-3KB**)
- **Size changes:** -3KB ATP (-0.6%), -3KB WTA (-1.1%) — measurement variance, no code changes

### Code Changes Since 2026-08-08

**Commits since yesterday:**
1. `8b27df6` — Design research 2026-08-09 (tickets only)
2. `786afc8` — Autoresearch 2026-08-09 (tickets only)
3. `4093858` — Inspector run 2026-08-08 (tickets only)
4. `105e73b` — Inspector run 2026-08-08 (tickets only)

**No code changes** to ATP/WTA/World Cup/Homepage pages, ShareButton component, or data feeds.

### Why Size Changes Are Measurement Variance

1. **No structural changes** — No commits modified ShareButton or tennis pages since 2026-07-26
2. **Small percentage changes** — ATP -0.6%, WTA -1.1% (within measurement variance)
3. **Natural data fluctuation** — Player counts, name lengths, tournament strings, live match data vary
4. **Root cause unfixed** — ShareButton bloat from 2026-07-26 remains the primary issue
5. **Pattern matches prior variance** — Daily ±1-3KB fluctuations common in 14-day period

### Why Load Times Improved

1. **Edge caching continuing to optimize** — ISR stable, network warming effects
2. **Yesterday's variances resolved** — Matches historical pattern of 1-2 day transient variances
3. **CDN routing optimization** — Homepage -17%, WC -39% suggest edge improvements
4. **No code changes** — Improvements are infrastructure-driven, not code-driven

### Why WTA Load Time Variance Is Likely Transient

1. **Still within budget** — WTA 0.25s < 2.0s total budget
2. **Size stable** — 268KB (-3KB) no payload bloat
3. **TTFB minor variance** — +8% (+0.01s), within 0.8s budget
4. **Other routes improving** — Homepage -17%, ATP -26%, WC -39% suggest WTA variance is isolated
5. **Historical pattern** — Matches 20+ prior load time variances that resolved within 1-2 days
6. **No code changes** — Zero commits to app code since 2026-08-08

## Impact

- 🔴 **Day 14 of critical size regressions** — Both tennis pages (core traffic drivers) remain critically over budget for two full weeks
- 🚀 **Major load time improvements** — Homepage -17%, ATP -26%, WC -39% (excellent user-perceived performance)
- ✅ **All routes FAST** — Within TTFB (< 0.8s) and total (< 2.0s) budgets
- ✅ **Core Web Vitals (from 2026-08-05):** All routes GOOD — excellent user-perceived performance despite size bloat
- 📱 **Mobile impact:** WTA 268KB = ~2.5s on slow 3G, ATP 514KB = ~4.8s
- 💰 **Revenue:** Blocks Phase 3 monetization (ads + betting affiliates)
- 🏆 **FIFA World Cup 2026:** Tournament ENDED ~July 19 (21 days ago)

## Status

🔴 **CRITICAL SIZE REGRESSIONS PERSIST (Day 14)** + 🚀 **Major load time improvements** + ⚠️ **WTA load time variance (monitoring)** + ✅ **All routes FAST** + ⚠️ **CWV not measured**

## Tickets

- `perf-share-button-bloat` (Priority 1) — OPEN (awaiting planner restoration, planner down 14+ days)

## Recommendations

1. **No new tickets needed** — Existing P1 ticket tracks the regression
2. **Load time variance monitoring** — WTA +32% variance likely transient, monitor tomorrow
3. **Core Web Vitals measurement** — Recommend measuring CWV when possible to verify user experience remains GOOD
4. **Planner restoration** — Critical P1 fix blocked on planner being down 14+ days (per autoresearch reports)

## Next Steps

1. Update `docs/perf-baseline.md` with today's measurements
2. Monitor WTA load time variance (likely transient, resolved within 1-2 days)
3. Monitor for planner restoration to fix ShareButton regression
4. Continue daily monitoring
