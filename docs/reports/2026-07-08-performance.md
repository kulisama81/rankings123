# Performance Report — 2026-07-08

**Inspector:** @perf-inspector (daily cron)  
**Measurement Method:** `npm run check:performance` (TTFB/total/size via live fetch)  
**Baseline:** docs/perf-baseline.md

---

## Executive Summary

🔴 **CRITICAL REGRESSIONS PERSIST — Day 4**

Both ATP and WTA Live pages remain critically over size budget for the **4th consecutive day**. P0 tickets from 2026-07-05 remain unfixed. World Cup TTFB variance from yesterday resolved.

**Status:**
- 🔴 **ATP Live:** 591KB (97% over 300KB budget) — Day 4, no change
- 🔴 **WTA Live:** 346KB (73% over 200KB budget) — Day 4, -2KB (negligible)
- ⚠️ **World Cup:** TTFB variance resolved (-30%), still 20% over size budget but improving
- ✅ **Homepage:** Fast and stable

---

## Measurements

| Route        | TTFB   | Total  | Size  | vs Yesterday        | Status      |
|--------------|--------|--------|-------|---------------------|-------------|
| /            | 0.14s  | 0.14s  | 33KB  | TTFB +17%, stable   | ✅ FAST     |
| /atp-live    | 0.12s  | 0.24s  | 591KB | TTFB -14%, unchanged| 🔴 SIZE FAIL|
| /wta-live    | 0.15s  | 0.28s  | 346KB | TTFB +25%, -2KB     | 🔴 SIZE FAIL|
| /world-cup   | 0.14s  | 0.29s  | 361KB | TTFB -30%, -3KB     | ⚠️ SIZE     |

**Budget:**
- TTFB: ≤ 0.8s (all routes pass)
- Total: ≤ 2.0s (all routes pass)
- Size: / ≤150KB, /atp-live ≤300KB, /wta-live ≤200KB, /world-cup ≤300KB

---

## Analysis

### 🔴 ATP Live — Day 4 of Critical Regression

**Current:** 591KB (97% over 300KB budget)  
**Baseline:** 271KB  
**Change vs yesterday:** TTFB -14% (0.14s → 0.12s), size UNCHANGED at 591KB

**Root cause (unfixed):** Commit 91820bf (2026-07-04) added `guid` field to player data, bloating Next.js SSR payload by +280KB. No commits since 2026-07-05 have addressed this issue.

**Impact:**
- 📱 **Mobile:** 591KB on slow 3G = ~5.5s transfer time alone
- 💰 **Revenue:** Blocks Phase 3 monetization (ads + betting affiliates)
- 🏆 **Tour de France 2026:** Live through July 27 (tennis traffic elevated)
- ⏱ **Urgency:** IMMEDIATE — 4th consecutive day without fix

**Ticket:** `perf-atp-guid-bloat` (Priority 0) — OPEN, day 4

---

### 🔴 WTA Live — Day 4 of Critical Regression

**Current:** 346KB (73% over 200KB budget)  
**Baseline:** 49KB  
**Change vs yesterday:** TTFB +25% (0.12s → 0.15s), size -2KB (348KB → 346KB)

**Root cause (unfixed):** Same as ATP — guid field bloat from commit 91820bf.

**Analysis:** Minor 2KB size reduction (348KB → 346KB, -0.6%) is likely measurement variance, NOT a structural improvement. No code changes addressed the root cause.

**Impact:**
- 📱 **Mobile:** 346KB on slow 3G = ~3.2s transfer time alone
- 💰 **Revenue:** Blocks Phase 3 monetization
- ⏱ **Urgency:** IMMEDIATE — 4th consecutive day without fix

**Ticket:** `perf-wta-guid-bloat` (Priority 0) — OPEN, day 4

---

### ✅ World Cup — TTFB Variance Resolved

**Current:** TTFB 0.14s, total 0.29s, size 361KB  
**Change vs yesterday:** TTFB -30% (0.20s → 0.14s), total -9%, size -3KB

**Analysis:** Yesterday's +54% TTFB spike (0.13s → 0.20s) fully resolved. Confirmed as transient upstream ESPN API latency, not a structural issue.

**Size status:** 361KB vs 300KB budget (20% over, down from 364KB). Continuing downward trend (376KB on 2026-06-30 → 361KB today, -4% overall).

**Status:** ⚠️ Still over size budget but improving. Existing ticket `perf-wc-page-size` (Priority 2) covers lazy-loading optimization.

---

### ✅ Homepage — Stable

**Current:** TTFB 0.14s, total 0.14s, size 33KB  
**Status:** Fast and within budget.

---

## Recent Commits (since 2026-07-05)

**No performance-related commits.** Recent work:
- c63d069: autoresearch tickets (Elo, recaps, SEO)
- 37a745f: World Cup bracket page
- 6ddb19c: ATP table duplication bug fix
- c11c2c7: Logo/wordmark
- 4e6c46c: TDF widget
- 87ce622: Wimbledon widget

**Critical observation:** No commits have addressed the P0 performance tickets (`perf-atp-guid-bloat`, `perf-wta-guid-bloat`) filed on 2026-07-05.

---

## Impact (ESCALATING)

**Day 4 of critical regressions:**
- Both tennis pages (core traffic drivers) remain critically degraded
- 📱 **Mobile:** ATP 591KB on slow 3G = ~5.5s transfer time alone, WTA 346KB = ~3.2s
- 💰 **Revenue:** Slow loads harm UX, SEO (Core Web Vitals), ad viewability/RPM
- 🏆 **Tour de France 2026:** Live through July 27 (elevated tennis/sports traffic)
- ⏱ **Urgency:** IMMEDIATE — 4th consecutive day without fix, no code intervention attempted

---

## Recommendations

**IMMEDIATE (Priority 0):**
1. **Fix GUID bloat** — Remove `guid` from SSR payload on ATP/WTA Live pages
   - Recommended: Use computed slug from player name (e.g., `/atp/player/novak-djokovic-1`)
   - Target: ATP < 300KB (from 591KB), WTA < 200KB (from 346KB)
   - Tickets: `perf-atp-guid-bloat`, `perf-wta-guid-bloat`

**MEDIUM (Priority 2):**
2. **World Cup lazy-loading** — Reduce initial bundle via `next/dynamic`
   - Target: < 300KB (from 361KB)
   - Ticket: `perf-wc-page-size`

---

## Conclusion

**Status:** 🔴 CRITICAL — P0 regressions persist for Day 4 with no attempted fixes. Both tennis pages (core traffic drivers) remain critically degraded, blocking Phase 3 monetization readiness.

**Next measurement:** 2026-07-09 (automated daily run)
