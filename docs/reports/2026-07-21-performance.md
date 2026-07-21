# Performance Report — 2026-07-21

## Summary

✅ **NO REGRESSIONS** — All routes remain within TTFB (< 0.8s) and total (< 2.0s) budgets. ATP Live shows **major TTFB improvement** (-52%) with stable size, continuing the optimization trend.

## Measurements

**HTTP Fetch (npm run check:performance):**

| Route        | TTFB    | Total   | Size   | vs 2026-07-20       | Status    |
|--------------|---------|---------|--------|---------------------|-----------|
| /            | 0.12s   | 0.14s   | 28KB   | stable              | ✅ FAST   |
| /atp-live    | 0.16s   | 0.38s   | 440KB  | TTFB -52%, size +2KB | ✅ FAST   |
| /wta-live    | 0.15s   | 0.22s   | 185KB  | stable              | ✅ FAST   |
| /world-cup   | 0.14s   | 0.23s   | 381KB  | stable              | ✅ FAST   |

**Core Web Vitals:** Not measured (Playwright setup required)

## Analysis

### ✅ Homepage — Stable and Fast
- TTFB 0.12s, total 0.14s, size 28KB
- All metrics within budget
- No changes vs baseline

### 🎉 ATP Live — Major TTFB Improvement
- **TTFB improvement: 0.33s → 0.16s (-52%, -170ms)**
- **Total improvement: 0.44s → 0.38s (-14%, -60ms)**
- Size stable: 440KB vs 438KB baseline (+2KB, negligible variance)
- Still 47% over 300KB size budget, but **3-day improvement trend continues**:
  - 2026-07-18: 620KB
  - 2026-07-19: 446KB (-28%)
  - 2026-07-20: 438KB (-2%)
  - 2026-07-21: 440KB (+2KB variance, essentially stable)
- **Root cause (known):** GUID bloat from commit 91820bf (2026-07-05) — tracked by `perf-atp-guid-bloat` (P1)
- **User experience:** FAST — TTFB/total well within budgets despite size

### ✅ WTA Live — Stable Within Budget
- TTFB 0.15s, total 0.22s, size 185KB
- **7% under 200KB budget** — regression fully resolved since 2026-07-19
- All metrics within budget
- Stable vs baseline (186KB → 185KB, -1KB)

### ✅ World Cup — Stable Post-Tournament
- TTFB 0.14s, total 0.23s, size 381KB
- **FIFA World Cup 2026 ended ~July 19** (2 days ago)
- Still 27% over 300KB size budget (tracked by `perf-wc-page-size`)
- TTFB/total within budget
- Size stable: 380KB → 381KB (+1KB variance)

## Code Changes Since 2026-07-20

1. `2053653` — Autoresearch 2026-07-21 (tickets only)
2. `975c39c` — Inspector 2026-07-20 run 2 (tickets only)
3. `17a9058` — Auto: data-anomaly filed by data-sanity monitor (tickets only)
4. `54d411f` — Add post-event discovery module for retention (new feature, no perf impact)
5. `7c3a39a` — Close tdf-final-week-betting ticket (tickets only)

**No code changes to ATP/WTA/WC pages or data feeds** — ATP TTFB improvement likely due to edge caching stabilization after the 2026-07-18 duplicate table removal fix.

## Status

✅ **NO NEW REGRESSIONS DETECTED**

- All routes FAST (within TTFB/total budgets)
- ATP continuing improvement trend (3 consecutive days)
- WTA regression resolved and stable
- World Cup post-tournament, stable

## Tickets

**No new tickets filed** — all issues tracked by existing tickets:
- `perf-atp-guid-bloat` (Priority 1) — ATP still 47% over size budget, improving
- `perf-wc-page-size` (existing) — World Cup 27% over size budget

## Baseline Comparison

### vs 2026-07-20 Baseline

| Metric              | 2026-07-20 | 2026-07-21 | Change      |
|---------------------|------------|------------|-------------|
| **Homepage TTFB**   | 0.14s      | 0.12s      | -14% ✅     |
| **ATP TTFB**        | 0.33s      | 0.16s      | -52% 🎉     |
| **ATP Total**       | 0.44s      | 0.38s      | -14% ✅     |
| **ATP Size**        | 438KB      | 440KB      | +0.5% (stable) |
| **WTA**             | 186KB      | 185KB      | stable ✅   |
| **World Cup**       | 380KB      | 381KB      | stable ✅   |

### Key Improvements

1. **ATP TTFB -52%** — Major improvement from 0.33s → 0.16s
2. **ATP Total -14%** — Faster page load from 0.44s → 0.38s
3. **All routes FAST** — Within budgets despite size bloat on ATP/WC

## Recommendation

**Continue monitoring** — ATP optimization trend is positive. The duplicate table removal fix (commit 19712c8 on 2026-07-18) continues to compound with edge caching. No intervention needed today.

The `perf-atp-guid-bloat` ticket remains valid (virtualization needed to reach < 300KB), but **not urgent** — user experience is excellent despite size bloat.

---

**Measurement Method:** `npm run check:performance` (TTFB/total/size via live fetch)  
**Next Run:** 2026-07-22 (daily cadence)
