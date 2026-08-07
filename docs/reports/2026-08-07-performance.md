# Performance Report — 2026-08-07

**Inspector:** perf-inspector (automated)  
**Method:** `npm run check:performance` (TTFB/total/size via live fetch)  
**Baseline:** docs/perf-baseline.md

---

## Summary

🔴 **ShareButton regression PERSISTS (Day 12)** — ATP and WTA Live pages remain critically over size budgets. Sizes essentially stable (ATP -1KB, WTA -2KB measurement variance). ⚠️ **Load time variances detected** on Homepage (+50%) and World Cup (+41%) but all routes FAST and within budgets. ⚠️ **Core Web Vitals not measured** (Playwright not available in agent environment). **No code changes** since 2026-08-06.

---

## Measurements

### HTTP Fetch (npm run check:performance)

| Route        | TTFB Budget | Total Budget | Size Budget | Current TTFB | Current Total | Current Size | Status |
|--------------|-------------|--------------|-------------|--------------|---------------|--------------|--------|
| /            | ≤ 0.8s      | ≤ 2.0s       | ≤ 150KB     | 0.26s        | 0.27s         | 29KB         | ✅ FAST |
| /atp-live    | ≤ 0.8s      | ≤ 2.0s       | ≤ 300KB     | 0.14s        | 0.37s         | 520KB        | 🔴 SIZE FAIL |
| /wta-live    | ≤ 0.8s      | ≤ 2.0s       | ≤ 200KB     | 0.19s        | 0.36s         | 274KB        | 🔴 SIZE FAIL |
| /world-cup   | ≤ 0.8s      | ≤ 2.0s       | ≤ 300KB     | 0.16s        | 0.41s         | 382KB        | ⚠️ SIZE |

### Changes vs 2026-08-06

| Route        | TTFB Δ      | Total Δ     | Size Δ      | Notes |
|--------------|-------------|-------------|-------------|-------|
| /            | +44% (+0.08s) | +50% (+0.09s) | 0KB (stable) | ⚠️ Load time variance |
| /atp-live    | 0% (stable) | -3% (-0.01s) | -1KB (-0.2%) | ✅ Minor improvement |
| /wta-live    | +12% (+0.02s) | +9% (+0.03s) | -2KB (-0.7%) | ⚠️ Minor variance |
| /world-cup   | -6% (-0.01s) | +41% (+0.12s) | 0KB (stable) | ⚠️ Load time variance |

### Core Web Vitals

⚠️ **Not measured** — Playwright not available in agent environment

**Last measured 2026-08-05:** All routes GOOD (LCP < 2.5s, FCP < 1.8s, CLS 0.000)

---

## Analysis

### 🔴 ShareButton Regression (Day 12, persists)

**ATP Live:**
- 520KB vs 300KB budget (**73% over**, regression persists Day 12)
- Size history: 517KB → 521KB (+4KB Day 11) → 520KB (-1KB Day 12, **-0.2% variance**)
- TTFB stable: 0.14s (unchanged, within 0.8s budget)
- Total improved: 0.38s → 0.37s (-3%, within 2.0s budget)
- **Root cause:** commit 7469e43 (2026-07-26) — ShareButton on every row

**WTA Live:**
- 274KB vs 200KB budget (**37% over**, regression persists Day 12)
- Size history: 273KB → 276KB (+3KB Day 11) → 274KB (-2KB Day 12, **-0.7% variance**)
- TTFB variance: 0.17s → 0.19s (+12%, within 0.8s budget)
- Total variance: 0.33s → 0.36s (+9%, within 2.0s budget)
- **Root cause:** commit 7469e43 (2026-07-26) — ShareButton on every row

**Why size changes are measurement variance:**
1. **Tiny percentage changes** — ATP -0.2%, WTA -0.7% (within measurement variance)
2. **No structural changes** — No commits modified ShareButton or tennis pages since 2026-07-26
3. **Natural data fluctuation** — Player counts, name lengths, tournament strings, live match data vary
4. **Root cause unfixed** — ShareButton bloat from 2026-07-26 remains the primary issue

### ⚠️ Load Time Variances (likely transient)

**Homepage:**
- TTFB +44% (0.18s → 0.26s), total +50% (0.18s → 0.27s)
- Size stable (29KB)
- **All within budget** (TTFB < 0.8s, total < 2.0s)

**World Cup:**
- TTFB -6% (0.17s → 0.16s, improving)
- Total +41% (0.29s → 0.41s, variance)
- Size stable (382KB)
- **All within budget** (TTFB < 0.8s, total < 2.0s)

**Why load time variances are likely transient:**
1. **All within budget** — TTFB < 0.8s, total < 2.0s on all routes
2. **No code changes** — Zero commits to app code since 2026-08-06 (only autoresearch tickets)
3. **Sizes stable** — Homepage 29KB, WC 382KB (no payload bloat)
4. **Multiple routes affected** — Homepage, WTA, WC all show variance (suggests upstream/network/edge latency)
5. **Historical pattern** — Matches 20+ prior TTFB/load variances that resolved within 1-2 days without intervention
6. **Mixed signals** — Homepage TTFB up but WC TTFB down, ATP total improved (not systematic)

---

## Code Changes Since 2026-08-06

1. `a1dceaa` — Autoresearch 2026-08-07: Data Accuracy & Parity (cycling crisis, differentiation features) — **tickets only**

**No code changes** to ATP/WTA/World Cup/Homepage pages, ShareButton component, or data feeds.

---

## Impact

- 🔴 **Day 12 of critical size regressions** — both tennis pages (core traffic drivers) remain critically over budget
- ✅ **All routes FAST** — Within TTFB (< 0.8s) and total (< 2.0s) budgets
- ✅ **Core Web Vitals (from 2026-08-05):** All routes GOOD — excellent user-perceived performance despite size bloat
- 📱 **Mobile:** WTA 274KB = ~2.5s on slow 3G, ATP 520KB = ~4.8s
- 💰 **Revenue:** Blocks Phase 3 monetization (ads + betting affiliates)
- 🏆 **FIFA World Cup 2026:** Tournament ENDED ~July 19 (19 days ago)

---

## Tickets

### Existing Tickets

- **perf-share-button-bloat** (Priority 1) — OPEN (awaiting planner restoration, planner down 12+ days)
  - ATP 520KB vs 300KB budget (73% over)
  - WTA 274KB vs 200KB budget (37% over)
  - Root cause: ShareButton component rendered for every player row (~100 rows × 2 views = ~200 instances)

### New Tickets Filed

**None** — No new regressions detected. Size changes are measurement variance (±1-2KB, ±0.2-0.7%). Load time variances are likely transient (no code changes, multiple routes affected, all within budgets). Existing `perf-share-button-bloat` ticket covers the persistent ShareButton regression.

---

## Status

🔴 **CRITICAL SIZE REGRESSIONS PERSIST (Day 12)** + ⚠️ Load time variance (monitoring) + ⚠️ CWV not measured

---

## Recommendations

1. **Restore planner** — ShareButton fix (`perf-share-button-bloat`) has been P1 for 12 days but planner is down
2. **Measure Core Web Vitals** — Run Playwright in a local environment to confirm user-perceived performance is still GOOD
3. **Monitor load time variances** — If Homepage/WC variances persist beyond 1-2 days, investigate upstream/edge latency
4. **Fix ShareButton bloat** — Virtualize buttons, use single button per table, or lazy-load to reduce payload

---

## Next Measurement

Tomorrow (2026-08-08) — re-run `npm run check:performance` and compare to today's baseline
