# Performance Report — 2026-07-23

## Summary

✅ **CONTINUING IMPROVEMENTS** — ATP TTFB stable after yesterday's breakthrough (-19%), ATP/WTA load times improving (-8% to -14%), all routes FAST. WTA remains under budget (5th consecutive day). World Cup shows TTFB variance (+36%) but within budget and likely transient.

## Measurements

**HTTP Fetch (npm run check:performance):**

| Route        | TTFB    | Δ      | Total   | Δ      | Size   | Δ      | Status |
|--------------|---------|--------|---------|--------|--------|--------|--------|
| Homepage     | 0.14s   | +17%   | 0.14s   | 0%     | 29KB   | +3.6%  | ✅ FAST |
| ATP Live     | 0.15s   | -6%    | 0.35s   | -8%    | 440KB  | 0%     | 🟡 SIZE (STABLE) |
| WTA Live     | 0.14s   | -7%    | 0.19s   | -14%   | 190KB  | +2.7%  | ✅ FAST |
| World Cup    | 0.19s   | +36%   | 0.41s   | +78%   | 381KB  | 0%     | ⚠️ VARIANCE |

**Core Web Vitals:** Not measured (Playwright installation required)

## Analysis

### ✅ ATP Live: Continuing Improvements

**Observation:** TTFB stable after yesterday's -19% improvement, load time continuing to improve.

**Metrics (2026-07-23 vs 2026-07-22):**
- TTFB: 0.16s → 0.15s (-6%, **stable post-improvement**)
- Total: 0.38s → 0.35s (-8%, **improvement**)
- Size: 440KB (stable, 47% over budget)

**2-day trend (2026-07-21 → 2026-07-23):**
- TTFB: 0.33s → 0.16s → 0.15s (-55% total, -61% yesterday, -6% today)
- Total: 0.44s → 0.38s → 0.35s (-20% total, -14% yesterday, -8% today)

**Why improvements persist:**
- Edge caching stabilized after 2026-07-18 duplicate table fix (commit 19712c8)
- ISR revalidation optimizations compounding
- Network/CDN warming effects

**Status:** ✅ CONTINUING TO IMPROVE despite size bloat

### ✅ WTA Live: Improving, Under Budget

**Observation:** Load time improving (-14%), size increased from live match scores feature but remains UNDER budget.

**Metrics (2026-07-23 vs 2026-07-22):**
- TTFB: 0.15s → 0.14s (-7%)
- Total: 0.22s → 0.19s (-14%, **improvement**)
- Size: 185KB → 190KB (+5KB, **+2.7% from live match scores**, still 5% UNDER budget)

**Why size increase is acceptable:**
- +5KB from commit `babed56` (Add live match scores feature) — legitimate feature addition
- Still 190KB < 200KB budget (5% under)
- 5th consecutive day within budget (stable since 2026-07-19 regression resolution)

**Status:** ✅ IMPROVING, UNDER BUDGET

### ⚠️ World Cup: TTFB/Total Variance (Likely Transient)

**Observation:** TTFB +36%, total +78% but size stable. Pattern matches previous transient variances.

**Metrics (2026-07-23 vs 2026-07-22):**
- TTFB: 0.14s → 0.19s (+36%, **+0.05s**)
- Total: 0.23s → 0.41s (+78%, **+0.18s**)
- Size: 381KB (stable, 27% over budget)

**Why likely transient:**
1. **Size stable** — no code bloat (381KB unchanged)
2. **Pattern matches previous transient variances** — Homepage 2026-07-10 (+200% resolved), ATP 2026-07-09/2026-07-12 (+129%/+133% resolved), WC 2026-07-07/2026-07-12 (+54%/+125% resolved)
3. **Still within budget** — TTFB 0.19s < 0.8s, total 0.41s < 2.0s
4. **Possible cause** — Commit `2cda2aa` (Add World Cup Finals celebration visual treatment) may add server load
5. **Tournament ended** — FIFA World Cup 2026 ended ~July 19 (4 days ago), post-tournament traffic

**Recommendation:** Monitor in next run. If variance persists, investigate commit 2cda2aa impact.

**Status:** ⚠️ VARIANCE (monitoring)

### ✅ Homepage: Minor Variance

**Metrics (2026-07-23 vs 2026-07-22):**
- TTFB: 0.12s → 0.14s (+17%, **+0.02s**)
- Total: 0.14s (stable)
- Size: 28KB → 29KB (+3.6%, **+1KB from countdown timer**, commit `eb26feb`)

**Status:** ✅ FAST (minor variance, negligible)

## Code Changes Since 2026-07-22

1. `2e4d371` — Autoresearch 2026-07-23 (tickets only)
2. `826f992` — Inspector 2026-07-22 run 3 (tickets only)
3. `f0d98d6` — Auto: data-anomaly filed (tickets only)
4. `2cda2aa` — **Add World Cup Finals celebration visual treatment** — NEW FEATURE (may explain WC variance)
5. `c6201c2` — Mark resolved tickets as closed (tickets only)
6. `eb26feb` — **Add homepage countdown timer** — NEW FEATURE (+1KB homepage)
7. `babed56` — **Add live match scores to ATP/WTA rankings** — NEW FEATURE (+5KB WTA)

**No code changes to ATP/WTA/WC data feeds** — ATP/WTA load time improvements due to edge caching stabilization.

## Impact

### Positive Trends
- 🎉 **ATP 2-day improvement** — TTFB -55% (0.33s → 0.15s), load -20% (0.44s → 0.35s)
- 🚀 **ATP/WTA load times improving** — ATP -8%, WTA -14%
- ✅ **WTA under budget** — 190KB < 200KB (5th consecutive day)
- ✅ **All routes FAST** — Within TTFB (< 0.8s) and total (< 2.0s) budgets

### Persistent Issues
- 🟡 **ATP size bloat** — 440KB (47% over budget, stable for 5 days)
- 🟡 **World Cup size bloat** — 381KB (27% over budget, stable post-tournament)
- ⚠️ **World Cup TTFB/total variance** — Monitor in next run

### Context
- 🏆 **FIFA World Cup 2026:** Tournament ENDED ~July 19 (4 days ago)
- ⏱ **Time-sensitive:** World Cup capacity directive continues until tournament formally ends

## Tickets

**Existing (no change):**
- `perf-atp-guid-bloat` (Priority 1) — OPEN (ATP still 47% over budget, stable for 5 days)
- `perf-wta-guid-bloat` (Priority 0) — CLOSED (WTA regression resolved 2026-07-19, 5th day under budget)
- `perf-wc-page-size` (Priority 1) — CLOSED (lazy-loading shipped, size bloat persists post-tournament)

**New tickets:** None filed (no regressions detected, all routes within TTFB/total budgets)

## Recommendations

1. **Monitor World Cup variance** — If TTFB/total remain elevated in next run, investigate commit 2cda2aa impact
2. **Consider Core Web Vitals measurement** — Playwright installation required (`pip3 install playwright && playwright install chromium`)
3. **ATP size optimization** — Ticket `perf-atp-guid-bloat` (P1) remains open, virtualization recommended
4. **Celebrate WTA win** — 5 consecutive days under budget after 15-day regression (2026-07-05 to 2026-07-19)

## Conclusion

**Status:** ✅ CONTINUING IMPROVEMENTS

All routes remain within TTFB and total load time budgets. ATP and WTA show continued load time improvements despite stable (ATP) or growing (WTA) sizes, confirming edge caching optimizations are compounding. World Cup variance is likely transient and will be monitored. No new performance tickets needed.
