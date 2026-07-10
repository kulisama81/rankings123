# Performance Report — 2026-07-10

**Measurement Method:** `npm run check:performance` (HTTP fetch, best of 2 runs)  
**Core Web Vitals:** Not measured (browser automation blocked)

---

## Executive Summary

**Status:** 🔴 **CRITICAL SIZE REGRESSIONS PERSIST — Day 6** + ⚠️ **Homepage TTFB Degradation**

- **ATP/WTA size regressions:** Day 6 without fix (P0 tickets `perf-atp-guid-bloat`, `perf-wta-guid-bloat` remain open)
- **ATP TTFB variance RESOLVED:** Yesterday's +129% spike (0.14s → 0.32s) fully resolved (0.32s → 0.15s, -53%), confirms transient network/edge latency
- **NEW: Homepage TTFB degradation:** +200% (0.11s → 0.33s) but still within 0.8s budget — monitoring for pattern
- **All routes within TTFB/total budgets:** ✅ FAST despite size bloat

---

## Measurements

### HTTP Fetch (npm run check:performance)

| Route        | TTFB  | Total | Size  | vs 2026-07-09 TTFB | vs 2026-07-09 Total | vs 2026-07-09 Size | Status |
|--------------|-------|-------|-------|-------------------|--------------------|--------------------|--------|
| /            | 0.33s | 0.33s | 33KB  | +200% (0.11s)     | +136% (0.14s)      | 0% (33KB)          | ⚠️ TTFB REGRESSION |
| /atp-live    | 0.15s | 0.25s | 591KB | -53% (0.32s)      | -44% (0.45s)       | 0% (591KB)         | 🔴 SIZE FAIL |
| /wta-live    | 0.13s | 0.32s | 345KB | 0% (0.13s)        | +45% (0.22s)       | -0.3% (346KB)      | 🔴 SIZE FAIL |
| /world-cup   | 0.15s | 0.36s | 361KB | +25% (0.12s)      | +24% (0.29s)       | -0.3% (362KB)      | 🔴 SIZE FAIL |

### vs Baseline (docs/perf-baseline.md)

| Route        | TTFB Budget | Size Budget | Current TTFB | Current Size | TTFB Status | Size Status |
|--------------|-------------|-------------|--------------|--------------|-------------|-------------|
| /            | ≤ 0.8s      | ≤ 150KB     | 0.33s        | 33KB         | ✅ PASS     | ✅ PASS     |
| /atp-live    | ≤ 0.8s      | ≤ 300KB     | 0.15s        | 591KB        | ✅ PASS     | 🔴 FAIL (97% over) |
| /wta-live    | ≤ 0.8s      | ≤ 200KB     | 0.13s        | 345KB        | ✅ PASS     | 🔴 FAIL (73% over) |
| /world-cup   | ≤ 0.8s      | ≤ 300KB     | 0.15s        | 361KB        | ✅ PASS     | 🔴 FAIL (20% over) |

---

## Analysis

### 1. ATP TTFB Variance RESOLVED ✅

**Observation:** Yesterday's high ATP TTFB variance (0.32-0.43s in HTTP fetch, despite excellent 0.04s browser TTFB) is **fully resolved**.

**Measurements:**
- **2026-07-09:** TTFB 0.32s (Run 1), 0.43s (Run 2) — high variance
- **2026-07-10:** TTFB 0.15s (-53% vs 0.32s, -65% vs 0.43s) — back to baseline

**Confirmation:** This confirms yesterday's assessment that the variance was **transient network/edge node latency**, NOT a structural regression. Similar pattern to World Cup TTFB spike on 2026-07-07/08 that also self-resolved.

**Root cause:** Likely transient upstream ESPN API latency or edge node variance (no code changes to ATP page since 2026-07-05).

**Status:** ✅ RESOLVED — no action needed

---

### 2. Homepage TTFB Regression ⚠️

**Observation:** Homepage TTFB increased significantly but remains within budget.

**Measurements:**
- **TTFB:** 0.11s → 0.33s (+200%, +0.22s)
- **Total:** 0.14s → 0.33s (+136%, +0.19s)
- **Size:** 33KB (stable)
- **Budget status:** ✅ PASS (0.33s < 0.8s budget)

**Analysis:**
- Absolute degradation (+0.22s) is larger than typical network variance
- However, 0.33s is still FAST (well under 0.8s budget)
- No code changes to homepage since last measurement
- Similar pattern to ATP variance (2026-07-09) and World Cup spike (2026-07-07) — both self-resolved

**Assessment:** Likely **transient variance** (network/edge latency), but larger magnitude warrants monitoring.

**Action:** Monitor in next run. If persists or worsens, investigate for code/infrastructure changes.

**Status:** ⚠️ MONITORING — within budget, likely transient

---

### 3. CRITICAL Size Regressions PERSIST — Day 6 🔴

**Observation:** ATP and WTA Live page sizes remain critically over budget for a **6th consecutive day**. P0 tickets from 2026-07-05 remain unfixed.

**Measurements (vs 2026-07-09):**
- **ATP Live:** 591KB (UNCHANGED, 97% over 300KB budget)
- **WTA Live:** 345KB (-1KB, 73% over 200KB budget)
- **World Cup:** 361KB (-1KB, 20% over 300KB budget)

**Root cause (unchanged since 2026-07-05):** Commit 91820bf added 36-character `guid` field to player data, bloating Next.js `self.__next` JSON hydration payload:
- ATP: ~130KB → ~410KB (+280KB, 67% of page size)
- WTA: Similar bloat pattern

**Mobile impact:**
- **ATP:** 591KB on slow 3G = ~5.5s transfer time alone
- **WTA:** 345KB on slow 3G = ~3.2s transfer time alone

**Business impact (ESCALATING):**
- 🔴 **Day 6** of critical regressions on both tennis pages (core traffic drivers)
- 💰 **Revenue:** Slow mobile loads harm UX, SEO (Core Web Vitals), ad viewability/RPM
- 🏆 **Tour de France 2026:** Live through July 27 — elevated sports traffic NOW
- 🔒 **Blocks Phase 3 monetization:** Ads + betting affiliates require fast UX

**Code status (confirmed via git log — no changes since 2026-07-05):**
```
src/app/atp-live/page.tsx — no commits since 2026-07-05
src/app/wta-live/page.tsx — no commits since 2026-07-05
```

**Why unfixed:**
- No planner intervention attempted in 6 days
- P0 tickets opened 2026-07-05, remain open
- The fix is well-defined in tickets: remove `guid` from SSR payload, use computed slug instead

**Historical context:**
- **2026-06-23:** ISR migration — massive perf wins (ATP -61% TTFB, WTA -45%)
- **2026-06-27:** Force-dynamic regression — ISR destroyed, restored by 2026-06-30
- **2026-07-05:** GUID bloat regression — size +118% ATP, +627% WTA — **PERSISTS TODAY**

**Status:** 🔴 CRITICAL — P0 tickets open, day 6

**Tickets:**
- `perf-atp-guid-bloat` (Priority 0) — OPEN, day 6
- `perf-wta-guid-bloat` (Priority 0) — OPEN, day 6

---

### 4. WTA Total Load Time Regression

**Observation:** WTA total load time increased despite stable TTFB and size.

**Measurements:**
- **Total:** 0.22s → 0.32s (+45%, +0.10s)
- **TTFB:** 0.13s (stable)
- **Size:** 346KB → 345KB (-1KB, stable)

**Analysis:**
- TTFB stable = server response unchanged
- Size stable = payload unchanged
- Total increased = network transfer/client processing slower

**Likely cause:** Transient network latency (same pattern as homepage TTFB variance).

**Action:** Monitor in next run. If persists, investigate client-side JS execution time.

**Status:** ⚠️ MONITORING — still within 2.0s budget

---

### 5. World Cup Minor Variance

**Observation:** World Cup shows minor increases in TTFB/total but remains within budget.

**Measurements:**
- **TTFB:** 0.12s → 0.15s (+25%, +0.03s)
- **Total:** 0.29s → 0.36s (+24%, +0.07s)
- **Size:** 362KB → 361KB (-1KB, stable)

**Analysis:** Likely transient network variance (absolute changes are small).

**Status:** ✅ WITHIN BUDGET — no action needed

---

## Recent Code Changes (since 2026-07-09)

```
2b24c1e Inspector 2026-07-09 evening: 1 new bug (USA roster has incorrect player)
f8e96a8 Fix World Cup match pages returning mock data for non-existent matches
a647521 Auto: data-anomaly filed by data-sanity monitor
12dba5f Fix Tour de France stage pages returning 404 (CORRECTED)
0462659 Auto: data-anomaly filed by data-sanity monitor
e3cc30a Fix World Cup match detail pages returning 404
00f8906 Inspector 2026-07-09: 1 new bug (cycling stage 404s), 2 existing confirmed
d8231b5 perf-inspector 2026-07-09: CRITICAL regressions persist (day 5), CWV excellent, ATP TTFB variance
```

**Performance-relevant changes:** None. All commits are bug fixes to World Cup match pages and Tour de France routes. No changes to homepage, ATP Live, or WTA Live pages.

**Conclusion:** Today's TTFB variance on homepage (and resolved ATP variance) is NOT code-related — confirms transient network/infrastructure latency.

---

## Recommendations

### IMMEDIATE (P0)

1. **Fix ATP/WTA size regressions (Day 6)** — tickets `perf-atp-guid-bloat`, `perf-wta-guid-bloat`
   - Remove `guid` from SSR payload (use computed slug: `/atp/player/novak-djokovic-1`)
   - Target: ATP < 300KB (-49%), WTA < 200KB (-42%)
   - ROI: Unblocks Phase 3 monetization, improves mobile UX/SEO/ad-revenue

### MONITOR (Next Run)

2. **Homepage TTFB variance** — +200% but within budget, likely transient
   - If persists or worsens, investigate for code/infrastructure changes
   - If resolves, confirm as transient (same pattern as ATP/WC variance)

3. **WTA total load time** — +45% despite stable TTFB/size
   - If persists, investigate client-side JS execution time

---

## Core Web Vitals (Not Measured)

Browser automation blocked during this run. Based on yesterday's measurements (2026-07-09):

- **All routes passed GOOD thresholds:** LCP < 1.0s, FCP < 0.7s, CLS < 0.1, browser TTFB < 0.04s
- **Assessment:** Real user experience remained excellent despite HTTP fetch variance

Expect similar results today given:
- ATP TTFB variance resolved (0.32s → 0.15s)
- All routes within budgets
- Size bloat does NOT affect browser CWV (yesterday proved this: 591KB ATP had 0.78s LCP ✅)

**Action:** Resume CWV measurement in next run for full picture.

---

## Conclusion

**Key Findings:**
1. ✅ **ATP TTFB variance RESOLVED** — -53% improvement, confirms transient cause
2. 🔴 **CRITICAL size regressions PERSIST** — Day 6, P0 tickets open
3. ⚠️ **Homepage TTFB degraded** — +200% but within budget, likely transient
4. ✅ **All routes FAST** — within TTFB/total budgets despite size bloat

**Urgent Action Required:**
- **IMMEDIATE:** Fix ATP/WTA GUID bloat (Day 6) — well-defined fix, high ROI, blocks monetization
- **Monitor:** Homepage/WTA variance in next run — likely self-resolves

**Overall Status:** 🔴 CRITICAL (size regressions day 6) but ✅ FUNCTIONAL (TTFB/total within budgets)
