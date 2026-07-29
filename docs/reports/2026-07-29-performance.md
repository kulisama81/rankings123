# Performance Report — 2026-07-29

**Agent:** perf-inspector (daily run)  
**Status:** 🔴 CRITICAL SIZE REGRESSIONS PERSIST (Day 3) — ShareButton feature

---

## Summary

ShareButton regression from commit 7469e43 (2026-07-26) **persists for a third consecutive day**. ATP and WTA Live pages remain critically over size budgets. Sizes stable (+3KB, likely data variance). TTFB variances detected across multiple routes (+23-58%) but all within 0.8s budget and likely transient (matches historical pattern of network/edge latency fluctuations).

**Status:** 🔴 CRITICAL SIZE REGRESSIONS PERSIST (Day 3) + ⚠️ TTFB variance (monitoring)

---

## Measurements (2026-07-29 vs 2026-07-28)

### HTTP Fetch (`npm run check:performance`)

| Route        | TTFB (prev) | TTFB (today) | Change | Total (prev) | Total (today) | Change | Size (prev) | Size (today) | Change | Status |
|--------------|-------------|--------------|--------|--------------|---------------|--------|-------------|--------------|--------|--------|
| /            | 0.13s       | 0.16s        | +23%   | 0.14s        | 0.16s         | +14%   | 29KB        | 29KB         | stable | ✅ FAST |
| /atp-live    | 0.13s       | 0.20s        | +54%   | 0.40s        | 0.54s         | +35%   | 507KB       | 510KB        | +0.6%  | 🔴 SIZE FAIL |
| /wta-live    | 0.16s       | 0.16s        | stable | 0.32s        | 0.23s         | -28%   | 255KB       | 258KB        | +1.2%  | 🔴 SIZE FAIL |
| /world-cup   | 0.12s       | 0.19s        | +58%   | 0.32s        | 0.44s         | +38%   | 382KB       | 382KB        | stable | ⚠️ SIZE |

### Core Web Vitals

Not measured (agent lacks Skill tool for webapp-testing).

---

## Analysis

### 🔴 ShareButton Regression Persists (Day 3)

**Status vs Budget:**
- **ATP Live**: 510KB vs 300KB budget = **70% over** (was 69% yesterday, +1% worsening)
- **WTA Live**: 258KB vs 200KB budget = **29% over** (was 27.5% yesterday, +1.5% worsening)
- **World Cup**: 382KB vs 300KB budget = 27% over (stable)

**Size Changes (today vs yesterday):**
- ATP Live: 507KB → 510KB (+3KB, +0.6%)
- WTA Live: 255KB → 258KB (+3KB, +1.2%)

**Assessment:** Small size increases likely **data variance** (player counts, tournament strings, name lengths fluctuate week-to-week), not code regression. No commits changed ShareButton or tennis pages since 2026-07-28.

**Root Cause (unchanged):** Commit 7469e43 (2026-07-26) added ShareButton component (~149 lines "use client") rendered for every player row (~100 rows × 2 views = ~200 instances), adding ~60-65KB to client-side hydration payload.

**Impact:**
- 📱 **Mobile**: WTA 258KB = ~2.4s on slow 3G, ATP 510KB = ~4.7s
- 💰 **Revenue**: Blocks Phase 3 monetization (ads + betting affiliates)
- 🎯 **WTA critical**: Was within budget for 8 days, now over for 3 days
- 🎯 **ATP worsening**: Was 46% over, now 70% over budget

### ⚠️ TTFB Variance Detected (likely transient)

**Observation:** TTFB increases across Homepage/ATP/World Cup:
- Homepage: 0.13s → 0.16s (+23%, +0.03s)
- ATP Live: 0.13s → 0.20s (+54%, +0.07s)
- World Cup: 0.12s → 0.19s (+58%, +0.07s)
- WTA Live: 0.16s (stable)

**Assessment:** **Likely transient** — matches the 15+ historical pattern of TTFB variances that resolve within 1-2 days without intervention (Homepage 2026-07-10, ATP 2026-07-09/2026-07-12, WC 2026-07-07/2026-07-12, etc.). These are network/edge/CDN latency fluctuations, not code regressions.

**Why transient:**
1. **All within budget** — TTFB < 0.8s on all routes (0.16-0.20s)
2. **Size changes minimal** — +3KB is 0.6-1.2% measurement variance
3. **No code changes** — Zero commits to app code since 2026-07-28
4. **Multiple routes affected** — Suggests upstream/network/edge latency, not isolated code issue
5. **Historical pattern** — All 15+ prior TTFB variances resolved without intervention

### ⚠️ Load Time Variance (within budget)

**Observation:** Mixed load time changes:
- ATP: +35% (0.40s → 0.54s)
- WTA: -28% (0.32s → 0.23s, **improvement**)
- World Cup: +38% (0.32s → 0.44s)

**Assessment:** All within 2.0s budget. WTA improved despite TTFB spike, ATP/WC increases likely network transfer latency (correlates with TTFB variance). Not a code regression.

---

## Code Changes Since 2026-07-28

1. `1a6fd6e` — Autoresearch 2026-07-29 (tickets only)
2. `4ddfea3` — Inspector run 2026-07-28 (tickets only)
3. `02f09f3` — Inspector run 2026-07-28 (tickets only)

**No code changes** to ATP/WTA Live pages, ShareButton component, World Cup page, or any data feeds since yesterday's perf run.

---

## Regressions vs Baseline

### Per-Route Budget Compliance

| Route        | Size Budget | Current Size | % Over Budget | Status |
|--------------|-------------|--------------|---------------|--------|
| /            | ≤ 150KB     | 29KB         | N/A           | ✅ FAST (81% under) |
| /atp-live    | ≤ 300KB     | 510KB        | **+70%**      | 🔴 SIZE FAIL |
| /wta-live    | ≤ 200KB     | 258KB        | **+29%**      | 🔴 SIZE FAIL |
| /world-cup   | ≤ 300KB     | 382KB        | +27%          | ⚠️ SIZE |

### Regression Timeline

- **2026-07-26 baseline**: WTA 189KB (5.5% under budget), ATP 439KB (46% over)
- **2026-07-26 evening**: Commit 7469e43 (shareable ranking cards) shipped
- **2026-07-27**: WTA 250KB (25% over), ATP 504KB (68% over) — CRITICAL REGRESSION detected (Day 1)
- **2026-07-28**: WTA 255KB (27.5% over), ATP 507KB (69% over) — regression persists (Day 2)
- **2026-07-29**: WTA 258KB (29% over), ATP 510KB (70% over) — regression persists (Day 3), sizes stable

---

## Impact

### Business Impact

- 🔴 **Blocks Phase 3 monetization**: Ads + betting affiliates require fast pages for viewability/engagement
- 📱 **Poor mobile UX**: ATP 510KB = ~4.7s transfer on slow 3G, WTA 258KB = ~2.4s
- 🏆 **Post-World Cup**: FIFA WC 2026 ended July 19 (10 days ago) — elevated traffic period over

### User Experience Impact

- ✅ **TTFB/total within budgets**: All routes fast (TTFB < 0.8s, total < 2.0s) despite variance
- 🔴 **HTML payload bloat**: Client-side hydration payload inflated, slower time-to-interactive
- 📊 **Core Web Vitals risk**: Can't measure today, but large hydration payloads degrade INP/TBT

---

## Ticket Status

**Existing Ticket:** `perf-share-button-bloat` (Priority 1) — **OPEN** (filed 2026-07-27)

**No new ticket filed** — regression already tracked, no new regressions detected.

---

## Recommendations

1. **Fix ShareButton bloat urgently** — Day 3 of critical regression, WTA went from within-budget to 29% over
2. **Priority 1 justification stands** — No improvement for 3 consecutive days
3. **TTFB variance monitoring** — Continue monitoring, but likely resolves within 1-2 days (historical pattern)
4. **Suggested fixes** (from ticket):
   - Virtualize ShareButtons (only render visible rows)
   - Single share button per table (top-right, modal to select player)
   - Lazy-load ShareButton (dynamic import on hover/click)
   - Code-split ShareButton to separate chunk
   - Optimize bundle (inline SVGs, remove preview preload)

---

## Next Steps

- [ ] Planner to prioritize `perf-share-button-bloat` (P1)
- [ ] Monitor TTFB variance tomorrow (expect resolution based on historical pattern)
- [ ] Re-measure after fix deployed
- [ ] Update baseline downward when regression resolved
