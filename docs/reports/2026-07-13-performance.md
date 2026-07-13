# Performance Report — 2026-07-13

**Run Date:** 2026-07-13  
**Method:** `npm run check:performance` (HTTP fetch, best of 2 runs)  
**Compared to:** 2026-07-12 baseline

---

## Summary

✅ **GOOD:** Yesterday's TTFB variance on Homepage/ATP/World Cup fully RESOLVED — confirms transient network/edge latency pattern.

⚠️ **NEW:** WTA Live TTFB variance detected (+114%) but within budget — same pattern as previous transient variances.

🔴 **CRITICAL:** Size regressions persist for **NINTH consecutive day** — both tennis pages remain critically over budget.

---

## Measurements

| Route        | TTFB    | Δ TTFB  | Total   | Δ Total | Size   | Δ Size  | Status |
|--------------|---------|---------|---------|---------|--------|---------|--------|
| /            | 0.17s   | -11%    | 0.22s   | +16%    | 30KB   | -9%     | ✅ FAST |
| /atp-live    | 0.13s   | -54%    | 0.27s   | -34%    | 588KB  | -2%     | 🔴 SIZE FAIL |
| /wta-live    | 0.30s   | +114%   | 0.40s   | +82%    | 329KB  | -6%     | 🔴 SIZE FAIL |
| /world-cup   | 0.21s   | -22%    | 0.39s   | -25%    | 359KB  | -0.3%   | 🔴 SIZE FAIL |

**vs 2026-07-12:**
- **Homepage:** TTFB 0.19s → 0.17s, total 0.19s → 0.22s, size 33KB → 30KB
- **ATP Live:** TTFB 0.28s → 0.13s, total 0.41s → 0.27s, size 600KB → 588KB
- **WTA Live:** TTFB 0.14s → 0.30s, total 0.22s → 0.40s, size 349KB → 329KB
- **World Cup:** TTFB 0.27s → 0.21s, total 0.52s → 0.39s, size 360KB → 359KB

---

## Analysis

### ✅ Yesterday's TTFB Variance RESOLVED

**Pattern:** Homepage (+46%), ATP (+133%), World Cup (+125%) TTFB spikes from 2026-07-12 **fully resolved** today.

**Evidence:**
- **Homepage:** 0.19s → 0.17s (-11%, back to baseline)
- **ATP Live:** 0.28s → 0.13s (-54%, back to baseline)
- **World Cup:** 0.27s → 0.21s (-22%, back to baseline)

**Conclusion:** Confirms transient network/edge latency (same pattern as ATP variance 2026-07-09, Homepage variance 2026-07-10, World Cup variance 2026-07-07/08). No code intervention needed.

### ⚠️ NEW: WTA Live TTFB Variance

**Observation:** WTA TTFB increased 0.14s → 0.30s (+114%), total 0.22s → 0.40s (+82%).

**Why This Is Likely Transient:**
1. **Still within budget** (0.30s < 0.8s TTFB budget, 0.40s < 2.0s total budget)
2. **Matches previous transient variance patterns** (Homepage, ATP, World Cup all resolved within 1-2 days)
3. **Size decreased -6%** (349KB → 329KB) — not a code regression
4. **No code changes** to WTA Live page since 2026-07-12
5. **Multiple routes improved** (Homepage, ATP, World Cup all faster) — not a systemic problem

**Action:** Monitor in next run. No ticket needed unless persists or breaches budget.

### ✅ Size Improvements Across All Routes

**Positive trend despite ongoing bloat:**
- **Homepage:** 33KB → 30KB (-9%)
- **ATP Live:** 600KB → 588KB (-2%)
- **WTA Live:** 349KB → 329KB (-6%)
- **World Cup:** 360KB → 359KB (-0.3%)

**Note:** These improvements do NOT resolve the critical size regressions — pages remain far over budget, but the trend is positive.

### 🔴 CRITICAL SIZE REGRESSIONS PERSIST — Day 9

**ATP Live:** 588KB vs 300KB budget (96% over)
- **Baseline:** 271KB (2026-07-04, before GUID bloat)
- **Regression:** +317KB (+117% vs baseline)
- **Mobile impact:** 588KB on slow 3G = ~5.5s transfer time alone
- **Ticket:** `perf-atp-guid-bloat` (Priority 0) — OPEN since 2026-07-05

**WTA Live:** 329KB vs 200KB budget (65% over)
- **Baseline:** 49KB (2026-07-04, before GUID bloat)
- **Regression:** +280KB (+571% vs baseline)
- **Mobile impact:** 329KB on slow 3G = ~3.1s transfer time alone
- **Ticket:** `perf-wta-guid-bloat` (Priority 0) — OPEN since 2026-07-05

**Root cause (unchanged since 2026-07-05):**
Commit 91820bf added `guid` field to player data for profile page linking. This 36-character UUID is embedded in the Next.js `self.__next` JSON payload for client-side hydration, bloating it from ~130KB to ~410KB (+280KB).

### Code Changes Since 2026-07-12

```
39f96dd — autoresearch 2026-07-13 (tickets only)
b067204 — Inspector 2026-07-12 evening: World Cup countdown widget bug fix
7cf946e — World Cup finals countdown urgency widget (NEW FEATURE)
3494912 — Ticket update: cycling-stage-profiles blocked
1c52570 — Tennis player pages: SEO-friendly slug URLs for top 200 (NEW FEATURE)
```

**Performance impact:** None detected. New features (World Cup countdown widget, tennis player pages) did not cause measurable regressions. All metrics improved or stayed within budget.

---

## Budget Compliance

| Route        | TTFB Budget | TTFB Status | Total Budget | Total Status | Size Budget | Size Status |
|--------------|-------------|-------------|--------------|--------------|-------------|-------------|
| /            | ≤ 0.8s      | ✅ 0.17s    | ≤ 2.0s       | ✅ 0.22s     | ≤ 150KB     | ✅ 30KB     |
| /atp-live    | ≤ 0.8s      | ✅ 0.13s    | ≤ 2.0s       | ✅ 0.27s     | ≤ 300KB     | 🔴 588KB    |
| /wta-live    | ≤ 0.8s      | ✅ 0.30s    | ≤ 2.0s       | ✅ 0.40s     | ≤ 200KB     | 🔴 329KB    |
| /world-cup   | ≤ 0.8s      | ✅ 0.21s    | ≤ 2.0s       | ✅ 0.39s     | ≤ 300KB     | 🔴 359KB    |

**Status:**
- ✅ **All routes:** TTFB and total load time within budgets
- 🔴 **3 routes over size budget:** ATP (96% over), WTA (65% over), World Cup (20% over)

---

## Impact Assessment

### CRITICAL (ESCALATING) — Day 9 of Size Regressions

**Duration:** NINTH consecutive day without fix (since 2026-07-05)

**Business Impact:**
- 🏆 **FIFA World Cup 2026:** LIVE through ~July 19 (6 days remaining) — elevated sports traffic NOW
- 📱 **Mobile users:** ATP 588KB = ~5.5s transfer on slow 3G, WTA 329KB = ~3.1s transfer
- 💰 **Revenue:** Blocks Phase 3 monetization (ads + betting affiliates)
- 🔍 **SEO:** Large payloads harm Core Web Vitals rankings
- 📊 **Ad Revenue:** Slow loads reduce ad viewability and RPM

**Urgency:** IMMEDIATE — ninth consecutive day without code intervention

**Existing Tickets:**
- `perf-atp-guid-bloat` (Priority 0) — OPEN, day 9
- `perf-wta-guid-bloat` (Priority 0) — OPEN, day 9

---

## Recommendations

### Immediate (CRITICAL)

1. **Fix GUID bloat on ATP/WTA pages** (tickets already exist, Priority 0)
   - Remove `guid` from SSR payload
   - Use computed slug from player name instead (e.g., `/atp/player/novak-djokovic-1`)
   - Target: ATP < 300KB, WTA < 200KB
   - Expected savings: ~300KB per page

### Monitor (WTA TTFB variance)

2. **Monitor WTA TTFB in next run**
   - If variance persists > 2 days or breaches budget, investigate
   - Current assessment: likely transient (same pattern as previous resolved variances)

### Positive Trends

3. **Acknowledge size improvements**
   - All routes showed size decreases today (Home -9%, ATP -2%, WTA -6%)
   - Trend is positive but insufficient to resolve critical bloat

---

## Core Web Vitals

**Status:** Not measured (browser automation requires approval)

**Note:** Real user experience likely remains good despite HTML bloat (compression + edge caching working). However, the size regressions still harm mobile users on metered connections, SEO bots, and initial parse time.

**Last CWV Measurement (2026-07-11):**
- All routes: LCP < 1.5s ✅, FCP < 0.7s ✅, CLS 0.000 ✅
- Excellent user-perceived performance despite size bloat

---

## Conclusion

**Summary:** Mixed results — yesterday's TTFB variance fully resolved (✅), new WTA variance detected but likely transient (⚠️), and critical size regressions persist for NINTH day (🔴).

**Action Required:**
1. **CRITICAL:** Fix GUID bloat tickets (`perf-atp-guid-bloat`, `perf-wta-guid-bloat`) — Day 9, IMMEDIATE
2. **Monitor:** WTA TTFB variance in next run
3. **Positive:** All routes FAST, sizes trending downward (but still over budget)

**Next Run:** Continue monitoring WTA TTFB variance and size regression tickets.
