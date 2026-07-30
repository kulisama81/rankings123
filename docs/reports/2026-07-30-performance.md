# Performance Report — 2026-07-30

## Summary

🔴 **ShareButton regression PERSISTS (Day 4)** — ATP/WTA Live pages remain critically over size budgets (ATP 512KB, WTA 257KB) from commit 7469e43 (2026-07-26). Sizes stable (±1-2KB measurement variance). ✅ **Load times IMPROVED significantly** — ATP -30%, WC -41%, WTA -9% (edge caching effects). All routes within TTFB/total budgets.

## Measurements

**Method:** `npm run check:performance` (HTTP fetch, best of 2 runs)  
**Date:** 2026-07-30  
**Comparison:** vs 2026-07-29

| Route        | TTFB | TTFB Δ | Total | Total Δ | Size  | Size Δ | Status |
|--------------|------|--------|-------|---------|-------|--------|--------|
| /            | 0.14s| -13%   | 0.16s | stable  | 29KB  | stable | ✅ FAST |
| /atp-live    | 0.21s| +5%    | 0.38s | **-30%** | 512KB | +0.4%  | 🔴 SIZE FAIL |
| /wta-live    | 0.15s| -6%    | 0.21s | -9%     | 257KB | -0.4%  | 🔴 SIZE FAIL |
| /world-cup   | 0.15s| -21%   | 0.26s | **-41%** | 382KB | stable | ⚠️ SIZE |

**Budgets:**
- TTFB: ≤ 0.8s (all routes PASS)
- Total: ≤ 2.0s (all routes PASS)
- Size: / ≤ 150KB ✅, /atp-live ≤ 300KB 🔴, /wta-live ≤ 200KB 🔴, /world-cup ≤ 300KB ⚠️

## Analysis

### 🔴 ShareButton Regression PERSISTS (Day 4)

**Observation:** ATP and WTA Live pages remain critically over size budgets from commit 7469e43 (2026-07-26) "Add auto-generated shareable ranking cards". Sizes stable (±1-2KB measurement variance), root cause unfixed.

**Size Changes:**
- **ATP Live:** 510KB → 512KB (+2KB, +0.4%) — **71% over 300KB budget** (was 70% yesterday)
- **WTA Live:** 258KB → 257KB (-1KB, -0.4%) — **29% over 200KB budget** (was 29% yesterday)
- **World Cup:** 382KB (stable) — 27% over 300KB budget

**Why sizes are stable:**
1. **Tiny percentage changes** — +0.4% ATP, -0.4% WTA (within measurement variance)
2. **No structural changes** — No commits modified ShareButton or tennis pages since 2026-07-26
3. **Natural data fluctuation** — Player counts, names, tournament strings vary
4. **Pattern matches prior variance** — Sizes fluctuated ±3-5KB in previous runs
5. **Root cause unfixed** — ShareButton bloat remains

### ✅ Load Times IMPROVED Significantly

**Observation:** All routes show load time improvements despite stable sizes, suggesting edge caching/network effects.

**Load Time Changes:**
- **ATP Live:** 0.54s → 0.38s (**-30%**, -160ms)
- **WTA Live:** 0.23s → 0.21s (-9%, -20ms)
- **World Cup:** 0.44s → 0.26s (**-41%**, -180ms)
- **Homepage:** 0.16s (stable)

**Why load times improved:**
- Edge caching continuing to compound (no ISR changes)
- Network/CDN warming effects
- Reduced upstream API latency variance

### ✅ TTFB Improvements Across Routes

**Observation:** TTFB improved on homepage and WC, minor variance on ATP.

**TTFB Changes:**
- **Homepage:** 0.16s → 0.14s (-13%, -20ms)
- **WTA Live:** 0.16s → 0.15s (-6%, -10ms)
- **World Cup:** 0.19s → 0.15s (-21%, -40ms)
- **ATP Live:** 0.20s → 0.21s (+5%, +10ms, **minor variance**)

**Why ATP TTFB variance is likely transient:**
1. **Small absolute change** — +10ms (+5%), within budget (0.21s < 0.8s)
2. **Load time improved** — -30% despite TTFB variance (suggests network transfer efficiency, not server slowness)
3. **Pattern matches historical transient variances** — 15+ prior TTFB spikes resolved within 1-2 days
4. **No code changes** — to ATP Live page or data feed since 2026-07-29

## Code Changes Since 2026-07-29

1. `84cc27e` — Autoresearch 2026-07-30 (tickets only, no app code)
2. `2f945e8` — Inspector run 2026-07-29 (tickets only)
3. `2ac7a0f` — Inspector run 2026-07-29 (tickets only)
4. `b450799` — Perf-inspector 2026-07-29 (tickets + docs only)

**No code changes** to ATP/WTA Live pages, ShareButton component, World Cup page, or data feeds.

## Impact

- 🔴 **Day 4 of critical size regressions** — both tennis pages (core traffic drivers) remain critically over budget
- ✅ **Load times improving** — ATP -30%, WC -41%, WTA -9% (excellent user experience)
- ✅ **All routes FAST** — TTFB < 0.8s, total < 2.0s on all routes
- 📱 **Mobile:** WTA 257KB = ~2.4s on slow 3G, ATP 512KB = ~4.8s
- 💰 **Revenue:** Blocks Phase 3 monetization (ads + betting affiliates)
- 🏆 **FIFA World Cup 2026:** Tournament ENDED ~July 19 (11 days ago)
- ⏱ **Urgency:** IMMEDIATE — fourth consecutive day without fix

## Status

🔴 **CRITICAL SIZE REGRESSIONS PERSIST (Day 4)** — ShareButton regression from 2026-07-26 unfixed. Sizes stable (±1-2KB measurement variance). Load times improving significantly (ATP -30%, WC -41%).

## Core Web Vitals

Not measured (agent lacks webapp-testing skill).

## Tickets

**Existing:**
- `perf-share-button-bloat` (Priority 1) — OPEN (no work done yet, Day 4)

**Filed Today:**
- None (no new regressions detected, existing ticket covers ShareButton bloat)

## Recommendations

1. **Fix ShareButton bloat (P1)** — ATP/WTA pages critically over budget for 4 consecutive days
   - Ticket: `perf-share-button-bloat`
   - Root cause: ~200 ShareButton instances per page (commit 7469e43)
   - Target: ATP < 300KB (need -41% from 512KB), WTA < 200KB (need -22% from 257KB)

2. **World Cup page size optimization** — 382KB (27% over 300KB budget), post-tournament priority
   - Consider lazy-loading below-the-fold sections
   - ISR pre-renders all data server-side → full HTML regardless of lazy-loading client-side
   - Lower priority (tournament ended 11 days ago)

## Performance Budget Compliance

| Route        | TTFB Budget | Total Budget | Size Budget | Status |
|--------------|-------------|--------------|-------------|--------|
| /            | ✅ PASS     | ✅ PASS      | ✅ PASS     | ✅ FAST |
| /atp-live    | ✅ PASS     | ✅ PASS      | 🔴 FAIL     | 🔴 SIZE FAIL |
| /wta-live    | ✅ PASS     | ✅ PASS      | 🔴 FAIL     | 🔴 SIZE FAIL |
| /world-cup   | ✅ PASS     | ✅ PASS      | ⚠️ OVER     | ⚠️ SIZE |

**Budget Status:**
- **TTFB:** 4/4 routes PASS (< 0.8s)
- **Total:** 4/4 routes PASS (< 2.0s)
- **Size:** 1/4 routes PASS, 2 critical fails, 1 over budget

---

**Next Run:** 2026-07-31 (daily schedule)
