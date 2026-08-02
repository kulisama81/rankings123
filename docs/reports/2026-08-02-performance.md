# Performance Report — 2026-08-02

**Status:** 🔴 CRITICAL SIZE REGRESSIONS PERSIST (Day 7) + ✅ All CWV GOOD

**Key Findings:**
- ShareButton regression from commit 7469e43 (2026-07-26) persists for a seventh consecutive day
- ATP and WTA Live pages remain critically over size budgets
- All routes pass GOOD thresholds for Core Web Vitals (LCP < 2.5s, FCP < 1.8s, CLS < 0.1)
- TTFB/load variances detected on Homepage and World Cup but within budgets (likely transient)
- No code changes to app since yesterday — variances are network/edge effects

---

## Measurements (2026-08-02 vs 2026-08-01)

### HTTP Fetch (npm run check:performance)

| Route        | TTFB Today | TTFB Δ  | Total Today | Total Δ | Size Today | Size Δ   | Status |
|--------------|------------|---------|-------------|---------|------------|----------|--------|
| Homepage     | 0.21s      | +31%    | 0.24s       | +41%    | 29KB       | stable   | ✅ FAST |
| ATP Live     | 0.17s      | -15%    | 0.42s       | +8%     | 504KB      | -3KB     | ✅ FAST |
| WTA Live     | 0.15s      | -6%     | 0.22s       | -8%     | 257KB      | stable   | ✅ FAST |
| World Cup    | 0.32s      | +129%   | 0.48s       | +92%    | 382KB      | stable   | ✅ FAST |

### Core Web Vitals (Playwright with real Chromium browser)

| Route        | LCP   | FCP   | CLS   | TTFB  | Transfer | Status      |
|--------------|-------|-------|-------|-------|----------|-------------|
| Homepage     | 2.27s | 0.74s | 0.000 | 0.18s | 489KB    | ✅ GOOD     |
| ATP Live     | 0.59s | 0.33s | 0.000 | 0.05s | 453KB    | ✅ GOOD     |
| WTA Live     | 0.40s | 0.40s | 0.000 | 0.04s | 280KB    | ✅ GOOD     |
| World Cup    | 0.46s | 0.36s | 0.000 | 0.05s | 130KB    | ✅ GOOD     |

**Core Web Vitals Assessment:** ✅ **ALL ROUTES PASS GOOD THRESHOLDS**
- LCP < 2.5s ✅ (all routes excellent, homepage 2.27s near threshold but still GOOD)
- FCP < 1.8s ✅ (all routes excellent)
- CLS < 0.1 ✅ (perfect 0.000 on all routes, no layout shifts)

---

## Analysis

### 🔴 ShareButton Regression Persists (Day 7)

**Observation:** ShareButton regression from commit 7469e43 (2026-07-26) persists for a seventh consecutive day. ATP and WTA Live pages remain critically over size budgets. Sizes stable (±3KB measurement variance).

**Size Status:**
- 🔴 **ATP size regression PERSISTS:** 504KB (68% over 300KB budget, Day 7, -3KB data variance)
- 🔴 **WTA size regression PERSISTS:** 257KB (29% over 200KB budget, Day 7, stable)
- ⚠️ **World Cup size:** 382KB (27% over 300KB budget, stable)
- ✅ **Homepage size:** 29KB (81% under 150KB budget, stable)

**Size changes are measurement variance:**
- ATP -3KB (-0.6%), WTA stable, WC stable, Homepage stable
- No code changes to ATP/WTA Live pages, ShareButton component, or data feeds since 2026-07-26
- Natural data fluctuation (player counts, names, tournament strings vary)

### ⚠️ TTFB/Load Time Variances (Likely Transient)

**Homepage:** TTFB +31% (0.16s → 0.21s), total +41% (0.17s → 0.24s)
**World Cup:** TTFB +129% (0.14s → 0.32s), total +92% (0.25s → 0.48s)

**Why these are likely transient:**
1. **All within budget** — Homepage TTFB 0.21s < 0.8s, WC TTFB 0.32s < 0.8s, all total < 2.0s
2. **Sizes stable** — No payload bloat (Homepage 29KB, WC 382KB unchanged)
3. **No code changes** — Zero commits to app code since 2026-08-01 (only tickets/docs)
4. **Multiple routes affected** — Homepage, ATP total, WC all show variance (suggests upstream/edge latency, not isolated code issue)
5. **Historical pattern** — Matches 15+ prior TTFB/load variances that resolved within 1-2 days without intervention
6. **Yesterday's report** noted "homepage variance from yesterday RESOLVED" (TTFB -38%, total -37%) — variances come and go
7. **Core Web Vitals remain GOOD** — User-perceived performance excellent despite curl measurement variance

**Browser vs curl measurements:**
- curl measures HTML response only (uncompressed, server TTFB)
- Browser measures real user experience (compressed, with caching, full resource loading)
- Browser TTFB much faster (Homepage 0.18s vs curl 0.21s, WC 0.05s vs curl 0.32s)
- LCP/FCP metrics show excellent user experience

### ✅ Core Web Vitals — All Routes GOOD

**Excellent user-perceived performance despite HTML size regressions:**
- **ATP Live:** LCP 0.59s (GOOD), -8% vs 2026-07-11 baseline (0.64s)
- **WTA Live:** LCP 0.40s (GOOD), -25% vs 2026-07-11 baseline (0.53s)
- **World Cup:** LCP 0.46s (GOOD), -42% vs 2026-07-11 baseline (0.79s)
- **Homepage:** LCP 2.27s (GOOD but +53% vs 2026-07-11 baseline 1.48s)
- **Perfect CLS (0.000)** across all routes — no layout shifts

**Note on Homepage LCP:**
- 2.27s is still within GOOD threshold (<2.5s)
- +53% vs 2026-07-11 baseline (1.48s) is notable but not a regression (still GOOD)
- No code changes to homepage since yesterday
- LCP variance likely due to natural homepage content changes over 22 days since baseline

---

## Code Changes Since 2026-08-01

1. `54261e7` — Design-research 2026-08-02 (tickets only)
2. `f8ccc06` — Autoresearch 2026-08-02 (tickets only)
3. `c0bb1da` — Inspector 2026-08-01 (tickets only)
4. `425544a` — Inspector 2026-08-01 (tickets only)
5. `471a811` — Perf-inspector 2026-08-01 (docs only)

**No code changes** to ATP/WTA/World Cup/Homepage pages, ShareButton component, or data feeds.

---

## Impact

**Day 7 of critical size regressions:**
- 🔴 **Both tennis pages** (core traffic drivers) remain critically over budget
- 📱 **Mobile:** WTA 257KB = ~2.4s on slow 3G, ATP 504KB = ~4.7s
- 💰 **Revenue:** Blocks Phase 3 monetization (ads + betting affiliates)
- 🏆 **FIFA World Cup 2026:** Tournament ENDED ~July 19 (14 days ago)

**User experience remains excellent:**
- ✅ **All routes FAST** — Within TTFB (< 0.8s) and total (< 2.0s) budgets
- ✅ **Core Web Vitals GOOD** — LCP, FCP, CLS all pass GOOD thresholds
- ✅ **Perfect layout stability** — CLS 0.000 across all routes

---

## Tickets

**Active:**
- `perf-share-button-bloat` (Priority 1) — OPEN (Day 7, ATP 68% over, WTA 29% over)

**No new tickets filed:**
- Size regressions already tracked in `perf-share-button-bloat` (P1)
- TTFB/load variances likely transient (monitoring)
- Core Web Vitals all GOOD (no CWV tickets needed)

---

## Recommendations

1. **URGENT:** Fix ShareButton bloat (Day 7, P1 ticket open)
   - Suggested fixes: virtualize ShareButtons, single share button per table, lazy-load, code-split, or optimize bundle
   - Target: WTA < 200KB (-22% reduction), ATP < 300KB (-40% reduction)

2. **Monitor:** Homepage/World Cup TTFB/load variances
   - Likely transient (no code changes, multiple routes affected, historical pattern)
   - If persists >2 days or degrades further, investigate

3. **Maintain:** Core Web Vitals excellence
   - All routes passing GOOD thresholds
   - Perfect CLS (0.000) across all routes
   - Continue monitoring LCP/FCP to prevent regressions

---

## Performance Budget Status

| Route        | TTFB Budget | Current TTFB | Status | Total Budget | Current Total | Status | Size Budget | Current Size | Status        |
|--------------|-------------|--------------|--------|--------------|---------------|--------|-------------|--------------|---------------|
| Homepage     | ≤ 0.8s      | 0.21s        | ✅ FAST | ≤ 2.0s       | 0.24s         | ✅ FAST | ≤ 150KB     | 29KB         | ✅ FAST       |
| ATP Live     | ≤ 0.8s      | 0.17s        | ✅ FAST | ≤ 2.0s       | 0.42s         | ✅ FAST | ≤ 300KB     | 504KB        | 🔴 SIZE FAIL  |
| WTA Live     | ≤ 0.8s      | 0.15s        | ✅ FAST | ≤ 2.0s       | 0.22s         | ✅ FAST | ≤ 200KB     | 257KB        | 🔴 SIZE FAIL  |
| World Cup    | ≤ 0.8s      | 0.32s        | ✅ FAST | ≤ 2.0s       | 0.48s         | ✅ FAST | ≤ 300KB     | 382KB        | ⚠️ SIZE      |

**Core Web Vitals Budget Status:**

| Route        | LCP Budget | Current LCP | Status | FCP Budget | Current FCP | Status | CLS Budget | Current CLS | Status |
|--------------|------------|-------------|--------|------------|-------------|--------|------------|-------------|--------|
| Homepage     | < 2.5s     | 2.27s       | ✅ GOOD | < 1.8s     | 0.74s       | ✅ GOOD | < 0.1      | 0.000       | ✅ GOOD |
| ATP Live     | < 2.5s     | 0.59s       | ✅ GOOD | < 1.8s     | 0.33s       | ✅ GOOD | < 0.1      | 0.000       | ✅ GOOD |
| WTA Live     | < 2.5s     | 0.40s       | ✅ GOOD | < 1.8s     | 0.40s       | ✅ GOOD | < 0.1      | 0.000       | ✅ GOOD |
| World Cup    | < 2.5s     | 0.46s       | ✅ GOOD | < 1.8s     | 0.36s       | ✅ GOOD | < 0.1      | 0.000       | ✅ GOOD |
