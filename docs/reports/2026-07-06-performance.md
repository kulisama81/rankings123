# Performance Report — 2026-07-06

**Status:** 🔴 **CRITICAL REGRESSIONS PERSIST (Day 2)**

## Summary

CRITICAL performance regressions on ATP/WTA Live pages **continue for a 2nd consecutive day**. Both pages remain critically over size budget, harming UX, SEO, and revenue during peak tennis traffic.

**Key findings:**
- ❌ **ATP Live:** 590KB (97% over 300KB budget) — virtually unchanged from yesterday
- ❌ **WTA Live:** 345KB (73% over 200KB budget) — minor -3% improvement but still critical
- ✅ **No new regressions** detected
- 🔴 **P0 tickets from 2026-07-05 remain open** (`perf-atp-guid-bloat`, `perf-wta-guid-bloat`)

## Measurements

**Method:** `npm run check:performance` (TTFB/total/size via live fetch, best of 2 runs)  
**Target:** https://rankings123.com  
**Date:** 2026-07-06

| Route        | TTFB  | Total | Size  | vs 2026-07-05 | Status        |
|--------------|-------|-------|-------|---------------|---------------|
| /            | 0.13s | 0.15s | 32KB  | Stable        | ✅ FAST       |
| /atp-live    | 0.13s | 0.25s | 590KB | -0.2% (-1KB)  | 🔴 SIZE FAIL  |
| /wta-live    | 0.13s | 0.29s | 345KB | -3.1% (-11KB) | 🔴 SIZE FAIL  |
| /world-cup   | 0.13s | 0.23s | 366KB | Stable        | ⚠️ SIZE       |

**Legend:**
- ✅ **FAST** = All metrics within budget
- ⚠️ **SIZE** = Over size budget (affects mobile, metered connections)
- 🔴 **SIZE FAIL** = Critically over size budget

## Analysis

### 🔴 CRITICAL: ATP/WTA Regressions Persist (Day 2)

**Observation:** The GUID bloat regressions detected on 2026-07-05 remain **unfixed** for a 2nd consecutive day.

**Current state vs budget:**
- **ATP Live:** 590KB vs 300KB budget (**97% over**, -0.2% vs yesterday)
- **WTA Live:** 345KB vs 200KB budget (**73% over**, -3.1% vs yesterday)

**Root cause (unchanged from 2026-07-05):**  
Commit 91820bf (player profile pages) added `guid` field to every player. This 36-character UUID bloats the Next.js `self.__next` JSON payload from ~130KB to ~410KB (+280KB).

**Impact (ESCALATING):**
- 🔴 **Day 2 of critical performance issues** — both tennis pages (core traffic drivers) remain critically degraded
- 📱 **Mobile:** ATP 590KB on slow 3G = ~5.5s transfer time alone
- 💰 **Revenue:** Slow loads harm engagement, SEO (Core Web Vitals), ad viewability/RPM, and block monetization path
- ⏱ **Load time:** ATP total doubled (0.19s baseline → 0.25s), WTA nearly doubled (0.15s → 0.29s)
- 🚫 **Blocks Phase 3:** Tennis pages are key monetization targets (ads + betting affiliates)

**WTA Minor Improvement:**  
WTA size decreased 3% (356KB → 345KB, -11KB) but remains critically over budget. This is likely ISR edge-cache warming or transient variance, NOT a code fix (no commits touched WTA pages).

**Code status (verified 2026-07-06):**  
No commits since yesterday's perf run have addressed the GUID bloat issue. The regression persists in production.

**Tickets:**
- `perf-atp-guid-bloat` (Priority 0) — OPEN, day 2
- `perf-wta-guid-bloat` (Priority 0) — OPEN, day 2

**Urgency:** 🔴 **IMMEDIATE** — This is now the 2nd consecutive day of critical performance degradation on the site's core traffic drivers.

### ✅ No New Regressions

**Observation:** No new performance issues detected. All other routes stable.

**Recent commits (2026-07-05 → 2026-07-06):**
- `d852658` — Changelog update (docs-only)
- `f6cf5d0` — TDF cycling feed fix (data layer, unrelated to tennis pages)
- `1dfcafc` — Wimbledon post-tournament display (UI, unrelated to ATP/WTA Live)

None of these commits touched ATP/WTA Live pages or introduced new performance-degrading patterns.

### 📊 Other Routes

**Homepage:** 32KB, stable (within budget)  
**World Cup:** 366KB, stable (22% over 300KB budget, known debt tracked in `perf-wc-page-size`)

## Recommendations

### 1. URGENT: Fix GUID Bloat (Priority 0)

The critical regressions from 2026-07-05 are **still unfixed**. This should be the **top priority** for the next planner run.

**Recommended approach (from ticket `perf-atp-guid-bloat`):**
- Remove `guid` from SSR payload — use computed slug from player name instead (e.g., `/atp/player/novak-djokovic-1`)
- Simpler, no extra fetch, SEO-friendly, no client-side overhead
- One fix resolves both ATP and WTA tickets

**Expected outcome:**
- ATP: 590KB → ~270KB (-54%, back to baseline)
- WTA: 345KB → ~50KB (-85%, back to baseline)

### 2. Core Web Vitals Measurement

Core Web Vitals (LCP/INP/CLS) not measured in this run (Playwright unavailable). Recommend installing Lighthouse/Playwright for real user-perceived metrics beyond TTFB.

## Performance Budget Compliance

| Route      | Budget                          | Current | Status        |
|------------|---------------------------------|---------|---------------|
| /          | TTFB ≤ 0.8s, Total ≤ 2.0s, Size ≤ 150KB | 0.13s / 0.15s / 32KB | ✅ PASS |
| /atp-live  | TTFB ≤ 0.8s, Total ≤ 2.0s, Size ≤ 300KB | 0.13s / 0.25s / 590KB | 🔴 FAIL (size) |
| /wta-live  | TTFB ≤ 0.8s, Total ≤ 2.0s, Size ≤ 200KB | 0.13s / 0.29s / 345KB | 🔴 FAIL (size) |
| /world-cup | TTFB ≤ 0.8s, Total ≤ 2.0s, Size ≤ 300KB | 0.13s / 0.23s / 366KB | 🔴 FAIL (size) |

**Overall:** 🔴 **FAIL** — 2 critical size regressions persisting for 2 days

## Conclusion

Critical performance regressions on ATP and WTA Live pages **remain unfixed for a 2nd consecutive day**, blocking monetization and harming user experience during peak tennis traffic. No new issues detected. Urgent action required on `perf-atp-guid-bloat` and `perf-wta-guid-bloat` tickets.
