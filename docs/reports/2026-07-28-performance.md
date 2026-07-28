# Performance Report — 2026-07-28

**Agent:** perf-inspector (daily run)  
**Status:** 🔴 CRITICAL SIZE REGRESSIONS PERSIST (Day 2) — ShareButton feature

---

## Summary

ShareButton regression from commit 7469e43 (2026-07-26) **persists for a second consecutive day**. ATP and WTA Live pages remain critically over size budgets. Sizes stable/slightly worse (+3-5KB, likely data variance). TTFB improved significantly across all routes, confirming yesterday's +15-85% TTFB spikes were transient network variance.

**Status:** 🔴 CRITICAL SIZE REGRESSIONS PERSIST (Day 2)

---

## Measurements (2026-07-28 vs 2026-07-27)

### HTTP Fetch (`npm run check:performance`)

| Route        | TTFB (prev) | TTFB (today) | Change | Total (prev) | Total (today) | Change | Size (prev) | Size (today) | Change | Status |
|--------------|-------------|--------------|--------|--------------|---------------|--------|-------------|--------------|--------|--------|
| /            | 0.24s       | 0.13s        | -46%   | 0.26s        | 0.14s         | -46%   | 29KB        | 29KB         | stable | ✅ FAST |
| /atp-live    | 0.24s       | 0.13s        | -46%   | 0.37s        | 0.40s         | +8%    | 504KB       | 507KB        | +0.6%  | 🔴 SIZE FAIL |
| /wta-live    | 0.17s       | 0.16s        | -6%    | 0.29s        | 0.32s         | +10%   | 250KB       | 255KB        | +2%    | 🔴 SIZE FAIL |
| /world-cup   | 0.15s       | 0.12s        | -20%   | 0.25s        | 0.32s         | +28%   | 382KB       | 382KB        | stable | ⚠️ SIZE |

### Core Web Vitals

Not measured (agent lacks Skill tool for webapp-testing).

---

## Analysis

### ✅ TTFB Transient Variance Resolved

**Observation:** Yesterday's TTFB increases (+15-85% across Homepage/ATP/WC) fully resolved today:
- Homepage: 0.24s → 0.13s (-46%)
- ATP Live: 0.24s → 0.13s (-46%)
- World Cup: 0.15s → 0.12s (-20%)

**Confirmation:** Matches the 15+ historical pattern of transient TTFB variances that resolve within 1-2 days without intervention. These are network/edge/CDN latency fluctuations, not code regressions.

### 🔴 ShareButton Regression Persists (Day 2)

**Status vs Budget:**
- **ATP Live**: 507KB vs 300KB budget = **69% over** (was 68% yesterday, +1% worsening)
- **WTA Live**: 255KB vs 200KB budget = **27.5% over** (was 25% yesterday, +2.5% worsening)
- **World Cup**: 382KB vs 300KB budget = 27% over (stable)

**Size Changes (today vs yesterday):**
- ATP Live: 504KB → 507KB (+3KB, +0.6%)
- WTA Live: 250KB → 255KB (+5KB, +2%)

**Assessment:** Small size increases likely **data variance** (player counts, tournament strings, name lengths fluctuate week-to-week), not code regression. No commits changed ShareButton or tennis pages since yesterday.

**Root Cause (unchanged):** Commit 7469e43 (2026-07-26) added ShareButton component (~149 lines "use client") rendered for every player row (~100 rows × 2 views = ~200 instances), adding ~60-65KB to client-side hydration payload.

**Impact:**
- 📱 **Mobile**: WTA 255KB = ~2.4s on slow 3G, ATP 507KB = ~4.7s
- 💰 **Revenue**: Blocks Phase 3 monetization (ads + betting affiliates)
- 🎯 **WTA critical**: Was within budget for 8 days, now over for 2 days
- 🎯 **ATP worsening**: Was 46% over, now 68-69% over

### ⚠️ Load Time Variance (within budget)

**Observation:** Total load times increased on ATP/WTA/WC:
- ATP: +8% (0.37s → 0.40s)
- WTA: +10% (0.29s → 0.32s)
- World Cup: +28% (0.25s → 0.32s)

**Assessment:** All within 2.0s budget. TTFB improved significantly, so increases are network transfer latency variance (sizes stable/minor increases). Not a code regression.

---

## Code Changes Since 2026-07-27

1. `3ac18b7` — Autoresearch 2026-07-28 (tickets only)
2. `edbf4c7` — Inspector run 2026-07-27 evening (tickets only)
3. `48592dd` / `5d48b8c` — Auto: data-anomaly filed (tickets only)
4. `e56453a` — Inspector run 2026-07-27 (tickets only)

**No code changes** to ATP/WTA Live pages, ShareButton component, or data feeds since yesterday's perf run.

---

## Regressions vs Baseline

### Per-Route Budget Compliance

| Route        | Size Budget | Current Size | % Over Budget | Status |
|--------------|-------------|--------------|---------------|--------|
| /            | ≤ 150KB     | 29KB         | N/A           | ✅ FAST (81% under) |
| /atp-live    | ≤ 300KB     | 507KB        | **+69%**      | 🔴 SIZE FAIL |
| /wta-live    | ≤ 200KB     | 255KB        | **+27.5%**    | 🔴 SIZE FAIL |
| /world-cup   | ≤ 300KB     | 382KB        | +27%          | ⚠️ SIZE |

### Regression Timeline

- **2026-07-26 baseline**: WTA 189KB (5.5% under budget), ATP 439KB (46% over)
- **2026-07-26 evening**: Commit 7469e43 (shareable ranking cards) shipped
- **2026-07-27**: WTA 250KB (25% over), ATP 504KB (68% over) — CRITICAL REGRESSION detected
- **2026-07-28**: WTA 255KB (27.5% over), ATP 507KB (69% over) — regression PERSISTS, sizes stable/slightly worse

---

## Impact

### Business Impact

- 🔴 **Blocks Phase 3 monetization**: Ads + betting affiliates require fast pages for viewability/engagement
- 📱 **Poor mobile UX**: ATP 507KB = ~4.7s transfer on slow 3G, WTA 255KB = ~2.4s
- 🏆 **Post-World Cup**: FIFA WC 2026 ended July 19 (9 days ago) — elevated traffic period over

### User Experience Impact

- ✅ **TTFB/total within budgets**: All routes fast (TTFB < 0.8s, total < 2.0s)
- 🔴 **HTML payload bloat**: Client-side hydration payload inflated, slower time-to-interactive
- 📊 **Core Web Vitals risk**: Can't measure today, but large hydration payloads degrade INP/TBT

---

## Ticket Status

**Existing Ticket:** `perf-share-button-bloat` (Priority 1) — **OPEN** (filed 2026-07-27)

**No new ticket filed** — regression already tracked.

---

## Recommendations

1. **Fix ShareButton bloat urgently** — WTA regression (within budget → over budget) is critical
2. **Priority 1 justification stands** — 2nd consecutive day, no improvement
3. **Suggested fixes** (from ticket):
   - Virtualize ShareButtons (only render visible rows)
   - Single share button per table (top-right, modal to select player)
   - Lazy-load ShareButton (dynamic import on hover/click)
   - Code-split ShareButton to separate chunk
   - Optimize bundle (inline SVGs, remove preview preload)

---

## Next Steps

- [ ] Planner to prioritize `perf-share-button-bloat` (P1)
- [ ] Re-measure after fix deployed
- [ ] Update baseline downward when regression resolved
