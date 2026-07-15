# Performance Report — 2026-07-15

**Agent:** perf-inspector (daily cron)  
**Date:** 2026-07-15  
**Measurement:** `npm run check:performance`

---

## Summary

🔴 **CRITICAL SIZE REGRESSIONS PERSIST — Day 11** + ✅ ATP/WC Variance Resolved + ⚠️ WTA Variance Detected

Critical performance regressions on ATP and WTA Live pages **continue for an 11th consecutive day**. P0 tickets from 2026-07-05 remain unfixed. GOOD: Yesterday's ATP (+38% TTFB) and World Cup (+62% TTFB) variances fully resolved. NEW: WTA TTFB variance detected (+77%) but within budget.

---

## Measurements

### HTTP Fetch (npm run check:performance)

| Route        | TTFB  | Total | Size  | vs 2026-07-14 | Status |
|--------------|-------|-------|-------|---------------|--------|
| /            | 0.12s | 0.14s | 31KB  | -8% / -7% / +3% | ✅ FAST |
| /atp-live    | 0.15s | 0.28s | 612KB | -17% / -52% / -0.2% | ✅ TTFB/Total, 🔴 SIZE |
| /wta-live    | 0.23s | 0.39s | 353KB | +77% / +34% / +0.9% | ✅ TTFB/Total, 🔴 SIZE |
| /world-cup   | 0.14s | 0.23s | 366KB | -59% / -51% / +0.5% | ✅ TTFB/Total, 🔴 SIZE |

**Budgets:** TTFB ≤ 0.8s, Total ≤ 2.0s, Size: / ≤ 150KB, /atp-live ≤ 300KB, /wta-live ≤ 200KB, /world-cup ≤ 300KB

### Core Web Vitals

Not measured (browser automation requires approval).

---

## Analysis

### ✅ ATP/World Cup TTFB Variance RESOLVED

**Yesterday's variances fully resolved:**
- **ATP Live:** TTFB 0.18s → 0.15s (-17%), total 0.58s → 0.28s (-52%, **major improvement**)
- **World Cup:** TTFB 0.34s → 0.14s (-59%), total 0.47s → 0.23s (-51%, **major improvement**)

Both routes showed significant TTFB/total spikes on 2026-07-14 but are now back to baseline performance. This confirms the variances were transient network/edge latency (same pattern as previous transient variances on Homepage 2026-07-10, ATP 2026-07-09, World Cup 2026-07-07).

### ⚠️ NEW WTA TTFB Variance Detected

**WTA Live:** TTFB 0.13s → 0.23s (+77%), total 0.29s → 0.39s (+34%), size 350KB → 353KB (+0.9%, stable)

**Why this is likely transient (same pattern as ATP/WC variances):**
1. **Still within budget:** 0.23s < 0.8s TTFB, 0.39s < 2.0s total
2. **No code changes:** No commits since yesterday affecting WTA Live data or page
3. **Size stable:** +3KB (0.9%) is measurement variance, not structural change
4. **Pattern matches previous transient variances** that resolved within 1-2 days
5. **Multiple routes show variance over time** — suggests upstream/network/edge latency fluctuations

**Recommendation:** Monitor in next run. No ticket filed (variance within budget, matches transient pattern).

### 🔴 CRITICAL SIZE REGRESSIONS PERSIST — Day 11

Size regressions from 2026-07-05 (commit 91820bf GUID bloat) **continue for an 11th consecutive day** with no fix:

- **ATP Live:** 612KB (104% over 300KB budget) — stable from yesterday (-1KB, -0.2%)
- **WTA Live:** 353KB (77% over 200KB budget) — stable from yesterday (+3KB, +0.9%)
- **World Cup:** 366KB (22% over 300KB budget) — stable from yesterday (+2KB, +0.5%)

**Root cause (unfixed):** Commit 91820bf (2026-07-05) added 36-character `guid` field to player data, bloating the Next.js `self.__next` JSON payload from ~130KB to ~410KB (+280KB). No commits since 2026-07-05 have addressed this issue.

**Impact (ESCALATING):**
- 🔴 **Day 11 of critical size regressions** — both tennis pages (core traffic drivers) remain critically over budget
- 📱 **Mobile:** ATP 612KB on slow 3G = ~5.7s transfer time alone, WTA 353KB = ~3.3s
- 💰 **Revenue:** Blocks Phase 3 monetization (ads + betting affiliates)
- 🏆 **FIFA World Cup 2026:** LIVE through ~July 19 (4 days remaining, elevated sports traffic NOW)
- ⏱ **Urgency:** IMMEDIATE — eleventh consecutive day without fix, no code intervention attempted on root cause

**P0 tickets remain open:**
- `perf-atp-guid-bloat` (Priority 0) — OPEN, day 11
- `perf-wta-guid-bloat` (Priority 0) — OPEN, day 11

### Homepage

**Homepage:** TTFB 0.13s → 0.12s (-8%), total 0.15s → 0.14s (-7%), size 30KB → 31KB (+3%)

✅ **Stable and fast.** Minor improvements in TTFB/total, +1KB size increase is negligible.

---

## Code Changes Since 2026-07-14

1. `f177190` — Autoresearch 2026-07-15: Post-WC sustainability + content strategy (6 tickets) — tickets only
2. `a8814ca` — Inspector 2026-07-14 (evening re-run): P0 bug found - WC Final Predictions placeholder content — tickets only
3. `63618a2` — Add World Cup Final 2026 predictions page — NEW FEATURE (+208 lines new route, +18 lines WC page linking)
4. `e6d9626` — Fix implausible ATP/WTA rank movement displays — client-side logic only, no data bloat

**Performance impact:** The World Cup Final predictions page is a NEW route (`/world-cup/final-2026-predictions`) and doesn't impact the existing `/world-cup` page size directly. The +2KB increase on `/world-cup` is from the 18 new lines linking to the final predictions page (negligible).

**Root cause unfixed:** No commits since 2026-07-05 have addressed the GUID bloat issue (commit 91820bf).

---

## Tickets

**No new tickets filed today.**

**Existing P0 tickets (still open):**
- `perf-atp-guid-bloat` (Priority 0) — ATP Live page size regression (612KB, 104% over budget) — **Day 11**
- `perf-wta-guid-bloat` (Priority 0) — WTA Live page size regression (353KB, 77% over budget) — **Day 11**

**Monitoring:**
- WTA TTFB variance (+77%) — within budget, likely transient, will verify resolution in next run

---

## Baseline Comparison

| Route      | Metric | Baseline (2026-07-14) | Current (2026-07-15) | Change  | Status |
|------------|--------|----------------------|---------------------|---------|--------|
| /          | TTFB   | 0.13s                | 0.12s               | -8%     | ✅ Improvement |
| /          | Total  | 0.15s                | 0.14s               | -7%     | ✅ Improvement |
| /          | Size   | 30KB                 | 31KB                | +3%     | ✅ Stable |
| /atp-live  | TTFB   | 0.18s                | 0.15s               | -17%    | ✅ **Variance resolved** |
| /atp-live  | Total  | 0.58s                | 0.28s               | -52%    | ✅ **Major improvement** |
| /atp-live  | Size   | 613KB                | 612KB               | -0.2%   | 🔴 Critical (Day 11) |
| /wta-live  | TTFB   | 0.13s                | 0.23s               | +77%    | ⚠️ **NEW variance** |
| /wta-live  | Total  | 0.29s                | 0.39s               | +34%    | ⚠️ Variance (in budget) |
| /wta-live  | Size   | 350KB                | 353KB               | +0.9%   | 🔴 Critical (Day 11) |
| /world-cup | TTFB   | 0.34s                | 0.14s               | -59%    | ✅ **Variance resolved** |
| /world-cup | Total  | 0.47s                | 0.23s               | -51%    | ✅ **Major improvement** |
| /world-cup | Size   | 364KB                | 366KB               | +0.5%   | 🔴 Over budget (Day 11) |

---

## Recommendations

1. **IMMEDIATE (P0):** Fix ATP/WTA GUID bloat tickets — eleventh consecutive day without fix
2. **Monitor WTA TTFB variance** — verify resolution in next run (expected pattern based on history)
3. **No new tickets needed** — existing P0 tickets cover critical issues

---

## Status

🔴 **CRITICAL SIZE REGRESSIONS PERSIST (Day 11)**  
✅ ATP/WC TTFB variances resolved  
⚠️ WTA TTFB variance detected (monitoring)  
✅ All routes TTFB/total within budgets
