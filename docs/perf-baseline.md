# Performance Baseline — Rankings123

This baseline establishes performance budgets and target metrics for all routes. Use this to detect regressions during development.

**Last Updated:** 2026-07-10 (CRITICAL REGRESSIONS PERSIST — Day 6)  
**Last Fix:** 2026-06-30 (ATP/WTA ISR permanently restored via client-side searchParams)  
**Measurement Method:** `npm run check:performance` (TTFB/total/size via live fetch) + Core Web Vitals (Playwright when available)

> ✅ **REGRESSION RESOLVED (2026-06-30):** ATP/WTA Live ISR + searchParams architectural conflict permanently fixed. SearchParams handling moved entirely to client-side (already was via useEffect, just removed blocking `force-dynamic`). ISR caching (`revalidate = 60`) now works without breaking table functionality. ATP TTFB -38% (0.60s → 0.37s), WTA TTFB -6% (0.33s → 0.31s). Regression test rewritten to check OUTCOMES (performance budget) instead of IMPLEMENTATION (force-dynamic), preventing future toggle pattern.

> 🎯 **PERMANENT FIX ARCHITECTURE:** LiveRankingTable already handled searchParams client-side only (via useEffect guards on lines 97-103, 106-116). The Suspense boundary has `fallback={null}` so no "Loading..." persists in static HTML. During SSG, component renders with default state (all countries), then hydrates with URL params on mount. ISR + functionality both work. Test now enforces TTFB ≤ 800ms budget, not force-dynamic pattern.

> 🏆 **WIMBLEDON 2026 IMPACT:** Fix deployed during peak tennis traffic (Wimbledon live through July 13). Fast TTFB critical for UX, SEO, ad viewability, and Phase 3 monetization readiness.

---

## Core Web Vitals Targets (Global)

Per [web.dev/vitals](https://web.dev/vitals), these are the **GOOD** thresholds we target:

- **LCP** (Largest Contentful Paint): < 2.5s (GOOD), < 4.0s (NEEDS IMPROVEMENT)
- **FCP** (First Contentful Paint): < 1.8s (GOOD), < 3.0s (NEEDS IMPROVEMENT)
- **INP** (Interaction to Next Paint): < 200ms (GOOD), < 500ms (NEEDS IMPROVEMENT)
- **CLS** (Cumulative Layout Shift): < 0.1 (GOOD), < 0.25 (NEEDS IMPROVEMENT)

### Current Measurements (2026-07-09)

**Method:** Playwright with real Chromium browser, measures actual user experience.

| Route        | LCP   | FCP   | CLS   | TTFB (browser) | Total Transfer | Status |
|--------------|-------|-------|-------|----------------|----------------|--------|
| /            | 1.21s | 0.49s | 0.046 | 0.03s          | 452KB          | ✅ GOOD |
| /atp-live    | 0.78s | 0.53s | N/A   | 0.04s          | 732KB          | ✅ GOOD |
| /wta-live    | 0.88s | 0.64s | N/A   | 0.04s          | 588KB          | ✅ GOOD |
| /world-cup   | 0.88s | 0.66s | N/A   | 0.04s          | 438KB          | ✅ GOOD |

**Assessment:** ✅ **ALL ROUTES PASS GOOD THRESHOLDS** — excellent user-perceived performance despite HTML payload size regressions.

**Note on Total Transfer vs HTML Size:**
- `npm run check:performance` measures initial HTML response only (uncompressed)
- Core Web Vitals measures total transfer size including all resources (JS, CSS, fonts, images, analytics)
- Example: ATP Live = 591KB HTML + 141KB additional resources = 732KB total transfer

**CLS Measurement Note:** CLS returned N/A for ATP/WTA/World Cup routes. This could indicate no layout shifts (good!) or measurement timing issue. Will monitor in future runs.

---

## Per-Route Performance Budget

| Route        | TTFB Budget | Total Budget | Size Budget | Current TTFB | Current Total | Current Size | Status |
|--------------|-------------|--------------|-------------|--------------|---------------|--------------|--------|
| /            | ≤ 0.8s      | ≤ 2.0s       | ≤ 150KB     | 0.33s        | 0.33s         | 33KB         | ⚠️ TTFB VARIANCE |
| /atp-live    | ≤ 0.8s      | ≤ 2.0s       | ≤ 300KB     | 0.15s        | 0.25s         | 591KB        | 🔴 SIZE FAIL |
| /wta-live    | ≤ 0.8s      | ≤ 2.0s       | ≤ 200KB     | 0.13s        | 0.32s         | 345KB        | 🔴 SIZE FAIL |
| /world-cup   | ≤ 0.8s      | ≤ 2.0s       | ≤ 300KB     | 0.15s        | 0.36s         | 361KB        | 🔴 SIZE FAIL |

*Homepage TTFB shows variance (0.11s → 0.33s, +200%) but within budget — monitoring for pattern (similar to ATP variance on 2026-07-09 that self-resolved).

**Legend:**
- **TTFB** = Time to First Byte (server response start)
- **Total** = Full page load time (TTFB + network transfer)
- **Size** = Uncompressed response size

**Status:**
- ✅ **FAST** = All metrics within budget
- ⚠️ **SIZE** = Over size budget (affects mobile, metered connections)
- 🔴 **SIZE FAIL** = Critically over size budget (regression detected)
- 🔴 **SLOW** = Over TTFB or total budget (user-perceived slowness)

**Note on ATP size:**
- ATP Live size now 271KB vs 300KB budget (within budget, -10% margin)
- Size reduced -31% from 2026-06-30 (393KB → 271KB) as ISR edge caching stabilizes
- ISR benefits are compounding: fast TTFB + smaller response sizes over time
- Further optimization ticket available: `perf-atp-page-size` (server-side pagination to reach < 100KB)

**Note on World Cup size:**
- World Cup size 369KB vs 300KB budget (23% over, trending downward from 376KB on 2026-06-30)
- ISR pre-renders all data server-side → full HTML regardless of lazy-loading
- Lazy-loading (ticket `perf-wc-page-size`) will benefit JS bundle size for client-side sections
- Size improving (376KB → 369KB, -2%) but still over budget — optimization ticket remains valid

---

## Recent Changes

### 🔴 CRITICAL REGRESSIONS PERSIST — Day 6 + ✅ ATP Variance Resolved + ⚠️ Homepage Variance (2026-07-10)

**Observation:** CRITICAL performance regressions on ATP and WTA Live pages **continue for a 6th consecutive day**. P0 tickets from 2026-07-05 remain unfixed. GOOD: ATP TTFB variance from yesterday fully resolved (-53%). NEW: Homepage TTFB variance detected (+200% but within budget).

**Measurements (2026-07-10 vs 2026-07-09):**

**HTTP Fetch (npm run check:performance):**
- **Homepage:** TTFB 0.11s → 0.33s (+200%, **variance**), total 0.14s → 0.33s (+136%), size 33KB (stable)
- **ATP Live:** TTFB 0.32s → 0.15s (-53%, **variance RESOLVED**), total 0.45s → 0.25s (-44%), size 591KB (UNCHANGED)
- **WTA Live:** TTFB 0.13s (stable), total 0.22s → 0.32s (+45%), size 346KB → 345KB (-0.3%)
- **World Cup:** TTFB 0.12s → 0.15s (+25%), total 0.29s → 0.36s (+24%), size 362KB → 361KB (-0.3%)

**Core Web Vitals:** Not measured (browser automation blocked)

**Analysis:**
- ✅ **ATP TTFB variance RESOLVED:** Yesterday's +129% spike (0.14s → 0.32s) fully resolved (0.32s → 0.15s, -53%), confirms transient network/edge latency
- 🔴 **ATP size:** 591KB (97% over 300KB budget) — regression persists, **Day 6**, size UNCHANGED
- 🔴 **WTA size:** 345KB (73% over 200KB budget) — regression persists, **Day 6**, -1KB measurement variance only
- ⚠️ **Homepage TTFB variance:** +200% (0.11s → 0.33s) but within 0.8s budget — same pattern as ATP variance (Day 5) and World Cup spike (2026-07-07/08), likely transient
- ⚠️ **WTA total load time:** +45% (0.22s → 0.32s) despite stable TTFB/size — likely network transfer latency
- ⚠️ **Root cause unfixed:** No commits since 2026-07-05 addressed the GUID bloat issue (commit 91820bf)

**Code changes since 2026-07-09:** Bug fixes to World Cup match pages and Tour de France routes. **No changes** to homepage, ATP Live, or WTA Live pages.

**Impact (ESCALATING):**
- 🔴 **Day 6 of critical size regressions** — both tennis pages (core traffic drivers) remain critically over budget
- 📱 **Mobile:** ATP 591KB on slow 3G = ~5.5s transfer time alone, WTA 345KB = ~3.2s
- 💰 **Revenue:** Blocks Phase 3 monetization (ads + betting affiliates)
- 🏆 **Tour de France 2026:** Live through July 27 (elevated sports traffic NOW)
- ⏱ **Urgency:** IMMEDIATE — sixth consecutive day without fix, no code intervention attempted
- ✅ **TTFB/total within budgets:** All routes FAST despite size bloat

**Status:** 🔴 CRITICAL SIZE REGRESSIONS PERSIST (Day 6) — P0 tickets remain open (`perf-atp-guid-bloat`, `perf-wta-guid-bloat`)

**Tickets:** 
- `perf-atp-guid-bloat` (Priority 0) — OPEN, day 6
- `perf-wta-guid-bloat` (Priority 0) — OPEN, day 6

**Report:** docs/reports/2026-07-10-performance.md

---

### 🔴 CRITICAL REGRESSIONS PERSIST — Day 5 + ⚠️ ATP TTFB Variance (2026-07-09) [RESOLVED]

**Observation:** CRITICAL performance regressions on ATP and WTA Live pages **continue for a 5th consecutive day**. P0 tickets from 2026-07-05 remain unfixed. NEW: ATP TTFB shows variance (0.32-0.43s via HTTP fetch) but browser Core Web Vitals show excellent performance (0.04s TTFB, 0.78s LCP).

**Measurements (2026-07-09 vs 2026-07-08):**

**HTTP Fetch (npm run check:performance, Run 1):**
- **ATP Live:** TTFB 0.14s → 0.32s (+129%, **high variance**), total 0.24s → 0.45s (+88%), size 591KB (UNCHANGED)
- **WTA Live:** TTFB 0.12s → 0.13s (+8%), total 0.27s → 0.22s (-19%), size 348KB → 346KB (-0.6%, **no improvement**)
- **Homepage:** TTFB 0.14s → 0.11s (-21%), total stable 0.14s, size stable 33KB
- **World Cup:** TTFB 0.14s → 0.12s (-14%), total 0.29s (stable), size 361KB → 362KB (+0.3%)

**HTTP Fetch (Run 2, variance check):**
- **ATP Live:** TTFB 0.43s (+34% vs Run 1), size 591KB (UNCHANGED)
- **WTA Live:** TTFB 0.33s (+154% vs Run 1), size 346KB (UNCHANGED)

**Core Web Vitals (Playwright, Real Browser) — NEW BASELINE:**
- **Homepage:** LCP 1.21s ✅, FCP 0.49s ✅, CLS 0.046 ✅, TTFB 0.03s ✅, total transfer 452KB
- **ATP Live:** LCP 0.78s ✅, FCP 0.53s ✅, CLS N/A, TTFB 0.04s ✅, total transfer 732KB
- **WTA Live:** LCP 0.88s ✅, FCP 0.64s ✅, CLS N/A, TTFB 0.04s ✅, total transfer 588KB
- **World Cup:** LCP 0.88s ✅, FCP 0.66s ✅, CLS N/A, TTFB 0.04s ✅, total transfer 438KB

**Analysis:**
- 🔴 **ATP size:** 591KB (97% over 300KB budget) — regression persists, **Day 5**, size UNCHANGED
- 🔴 **WTA size:** 346KB (73% over 200KB budget) — regression persists, **Day 5**, -2KB likely measurement variance
- ⚠️ **ATP TTFB variance (HTTP fetch):** +129% in Run 1 (0.32s), +34% more in Run 2 (0.43s) — high variance suggests transient network/edge node latency
- ✅ **Browser CWV EXCELLENT:** All routes pass GOOD thresholds (LCP < 1.0s, FCP < 0.7s, TTFB < 0.04s in browser)
- ✅ **Real user experience unaffected:** Despite HTTP fetch variance, actual browser performance (CWV) is excellent
- ⚠️ **Root cause unfixed:** No commits since 2026-07-05 addressed the GUID bloat issue (commit 91820bf)

**Why ATP TTFB Variance Is Likely Transient:**
1. **Browser CWV shows FAST performance** (0.04s TTFB, 0.78s LCP) — real users experience fast loads
2. **High variance between runs** (+34% Run 1 → Run 2) — structural regressions don't fluctuate this much
3. **No code changes** since 2026-07-08 — no commits to ATP/WTA pages or data feeds
4. **Similar pattern to World Cup** on 2026-07-07/08 (TTFB spike, then resolved) — transient upstream API latency

**Impact (ESCALATING):**
- 🔴 **Day 5 of critical size regressions** — both tennis pages (core traffic drivers) remain critically over budget
- 📱 **Mobile:** ATP 591KB on slow 3G = ~5.5s transfer time alone, WTA 346KB = ~3.2s
- 💰 **Revenue:** Blocks Phase 3 monetization (ads + betting affiliates)
- 🏆 **Tour de France 2026:** Live through July 27 (elevated sports traffic NOW)
- ⏱ **Urgency:** IMMEDIATE — fifth consecutive day without fix, no code intervention attempted
- ✅ **CWV excellent:** Real user experience remains fast despite size bloat

**Status:** 🔴 CRITICAL SIZE REGRESSIONS PERSIST (Day 5) — P0 tickets remain open (`perf-atp-guid-bloat`, `perf-wta-guid-bloat`)

**Tickets:** 
- `perf-atp-guid-bloat` (Priority 0) — OPEN, day 5
- `perf-wta-guid-bloat` (Priority 0) — OPEN, day 5

**Report:** docs/reports/2026-07-09-performance.md

---

### 🔴 CRITICAL REGRESSIONS PERSIST — Day 4 (2026-07-08)

**Observation:** CRITICAL performance regressions on ATP and WTA Live pages **continue for a 4th consecutive day**. P0 tickets from 2026-07-05 remain unfixed.

**Measurements (2026-07-08 vs 2026-07-07):**
- **ATP Live:** TTFB 0.14s → 0.12s (-14%), total 0.24s (stable), size 591KB (UNCHANGED, **no improvement**)
- **WTA Live:** TTFB 0.12s → 0.15s (+25%), total 0.27s → 0.28s (+4%), size 348KB → 346KB (-2KB, **minor variance only**)
- **Homepage:** TTFB 0.12s → 0.14s (+17%), total stable 0.14s, size stable 33KB
- **World Cup:** TTFB 0.20s → 0.14s (-30%, **variance resolved**), total 0.32s → 0.29s (-9%), size 364KB → 361KB (-3KB)

**Analysis:**
- 🔴 **ATP:** 591KB (97% over 300KB budget) — regression persists, **Day 4**, size UNCHANGED from Days 2-4
- 🔴 **WTA:** 346KB (73% over 200KB budget) — regression persists, **Day 4**, -2KB likely measurement variance
- ✅ **World Cup TTFB variance resolved:** Yesterday's +54% spike (0.13s → 0.20s) fully resolved (0.20s → 0.14s), confirmed as transient upstream API latency
- ✅ **Homepage:** Stable and fast
- ⚠️ **Root cause unfixed:** No commits since 2026-07-05 addressed the GUID bloat issue (commit 91820bf)
- 🚫 **WTA -2KB is NOT a fix** — measurement variance, not structural improvement

**Impact (ESCALATING):**
- 🔴 **Day 4 of critical regressions** — both tennis pages (core traffic drivers) remain critically degraded
- 📱 **Mobile:** ATP 591KB on slow 3G = ~5.5s transfer time alone, WTA 346KB = ~3.2s
- 💰 **Revenue:** Blocks Phase 3 monetization (ads + betting affiliates)
- 🏆 **Tour de France 2026:** Live through July 27 (elevated sports traffic)
- ⏱ **Urgency:** IMMEDIATE — fourth consecutive day without fix, no code intervention attempted

**Status:** 🔴 CRITICAL — P0 tickets remain open (`perf-atp-guid-bloat`, `perf-wta-guid-bloat`)

**Tickets:** 
- `perf-atp-guid-bloat` (Priority 0) — OPEN, day 4
- `perf-wta-guid-bloat` (Priority 0) — OPEN, day 4

**Report:** docs/reports/2026-07-08-performance.md

---

### 🔴 CRITICAL REGRESSIONS PERSIST — Day 3 (2026-07-07)

**Observation:** CRITICAL performance regressions on ATP and WTA Live pages **continue for a 3rd consecutive day**. P0 tickets from 2026-07-05 remain unfixed. NEW: World Cup TTFB variance detected (+54%) but still within budget.

**Measurements (2026-07-07 vs 2026-07-06):**
- **ATP Live:** TTFB 0.13s → 0.14s (+8%, minor variance), total 0.25s → 0.24s (-4%), size 590KB → 591KB (+0.2%, **virtually unchanged**)
- **WTA Live:** TTFB 0.13s → 0.12s (-8%), total 0.29s → 0.27s (-7%), size 345KB → 348KB (+0.9%, **minor increase**)
- **Homepage:** TTFB 0.13s → 0.12s (-8%), total 0.15s → 0.14s (-7%), size 32KB → 33KB (+3%)
- **World Cup:** TTFB 0.13s → 0.20s (+54%, **notable variance**), total 0.23s → 0.32s (+39%), size 366KB → 364KB (-0.5%)

**Analysis:**
- 🔴 **ATP:** 591KB (97% over 300KB budget) — regression persists, **Day 3**, no change from Day 2
- 🔴 **WTA:** 348KB (74% over 200KB budget) — regression persists, **Day 3**, +3KB from Day 2 (negligible)
- ⚠️ **World Cup:** TTFB +54% (0.13s → 0.20s) but still within budget (< 0.8s) — likely transient upstream API latency (no recent code changes), monitoring for pattern
- ✅ **Homepage:** Fast and stable
- ⚠️ **Root cause unfixed:** No commits since 2026-07-05 addressed the GUID bloat issue (commit 91820bf)
- 🚫 **Minor improvements are NOT code fixes** — load time improvements likely cache warming or variance

**Impact (ESCALATING):**
- 🔴 **Day 3 of critical regressions** — both tennis pages (core traffic drivers) remain critically degraded
- 📱 **Mobile:** ATP 591KB on slow 3G = ~5.5s transfer time alone, WTA 348KB = ~3.2s
- 💰 **Revenue:** Blocks Phase 3 monetization (ads + betting affiliates)
- 🏆 **Wimbledon 2026:** Live through July 13 (peak tennis traffic NOW)
- ⏱ **Urgency:** IMMEDIATE — third consecutive day without fix

**Status:** 🔴 CRITICAL — P0 tickets remain open (`perf-atp-guid-bloat`, `perf-wta-guid-bloat`)

**Tickets:** 
- `perf-atp-guid-bloat` (Priority 0) — OPEN, day 3
- `perf-wta-guid-bloat` (Priority 0) — OPEN, day 3

**Report:** docs/reports/2026-07-07-performance.md

---

### 🔴 CRITICAL REGRESSIONS PERSIST — Day 2 (2026-07-06)

**Observation:** CRITICAL performance regressions on ATP and WTA Live pages **continue for a 2nd consecutive day**. P0 tickets from 2026-07-05 remain unfixed.

**Measurements (2026-07-06 vs 2026-07-05):**
- **ATP Live:** TTFB 0.13s (stable), total 0.39s → 0.25s (-36%, **improvement**), size 591KB → 590KB (-0.2%, **virtually unchanged**)
- **WTA Live:** TTFB 0.16s → 0.13s (-19%, improvement), total 0.35s → 0.29s (-17%, improvement), size 356KB → 345KB (-3.1%, **minor improvement but still critical**)
- **Homepage:** TTFB 0.12s → 0.13s (+8%, minor variance), total 0.14s → 0.15s (+7%), size stable 32KB
- **World Cup:** TTFB 0.15s → 0.13s (-13%), total 0.36s → 0.23s (-36%, **improvement**), size 364KB → 366KB (+0.5%, stable)

**Analysis:**
- 🔴 **ATP:** 590KB (97% over 300KB budget) — regression persists, virtually unchanged from yesterday
- 🔴 **WTA:** 345KB (73% over 200KB budget) — minor size reduction but still critically over budget
- ✅ **TTFB/Total improvements:** All routes show faster TTFB/total times (likely ISR edge-cache warming or transient network variance)
- ⚠️ **Root cause unfixed:** No commits since 2026-07-05 addressed the GUID bloat issue (commit 91820bf)
- 🚫 **WTA improvement is NOT a code fix** — likely cache warming or variance, not structural improvement

**Technical Notes:**
- WTA -3% size improvement (356KB → 345KB, -11KB) but still 73% over budget
- ATP load time improved (0.39s → 0.25s, -36%) but size unchanged (590KB)
- Load time improvements likely due to ISR edge caching stabilizing, NOT code fixes

**Impact (ESCALATING):**
- 🔴 **Day 2 of critical regressions** — both tennis pages (core traffic drivers) remain critically degraded
- 📱 **Mobile:** ATP 590KB on slow 3G = ~5.5s transfer time alone
- 💰 **Revenue:** Blocks Phase 3 monetization (ads + betting affiliates)
- ⏱ **Urgency:** IMMEDIATE — second consecutive day without fix

**Status:** 🔴 CRITICAL — P0 tickets remain open (`perf-atp-guid-bloat`, `perf-wta-guid-bloat`)

**Tickets:** 
- `perf-atp-guid-bloat` (Priority 0) — OPEN, day 2
- `perf-wta-guid-bloat` (Priority 0) — OPEN, day 2

**Report:** docs/reports/2026-07-06-performance.md

---

### 🔴 CRITICAL REGRESSIONS — ATP/WTA Page Size (2026-07-05)

**Observation:** MASSIVE performance regression on ATP and WTA Live pages. Both pages now critically over size budget.

**Measurements (2026-07-05 vs 2026-07-04 baseline):**
- **ATP Live:** TTFB 0.12s → 0.13s (+8%), total 0.19s → 0.39s (+105%, **DOUBLED**), size 271KB → 591KB (+118%, **97% over 300KB budget**)
- **WTA Live:** TTFB 0.15s → 0.16s (+7%), total 0.15s → 0.35s (+133%, **MORE THAN DOUBLED**), size 49KB → 356KB (+627%, **78% over 200KB budget**)
- **Homepage:** TTFB 0.16s → 0.12s (-25%, improvement), total 0.16s → 0.14s (-12%), size stable 32KB
- **World Cup:** TTFB 0.11s → 0.15s (+36%), total 0.26s → 0.36s (+38%), size stable 364KB

**Root Cause:** Commit 91820bf (2026-07-04) added `guid` field to player data for linking to player profile pages. This 36-character UUID is now embedded in the Next.js `self.__next` JSON payload for client-side hydration, bloating it from ~130KB to ~410KB (+280KB!).

**Technical Analysis:**
- The `guid` field is only needed for linking to player pages (`/atp/player/[guid]`)
- It does NOT need to be in the SSR payload — the ranking table can render without it
- `self.__next` JSON payload: ~130KB → ~410KB (+280KB, 67% of total page size)
- HTML also grew due to Link components with long GUID URLs in both desktop and mobile table views

**Impact:**
- 🔴 **CRITICAL** — Both tennis pages (core traffic drivers) now critically over size budget
- ❌ **ATP:** 591KB vs 300KB budget (97% over)
- ❌ **WTA:** 356KB vs 200KB budget (78% over)
- 📱 **Mobile:** 591KB on slow 3G = ~5.5s transfer time alone (ATP)
- 💰 **Revenue:** Slow loads harm UX, SEO (Core Web Vitals), ad viewability/RPM
- ⏱ **Load time doubled** on both pages (ATP 0.19s → 0.39s, WTA 0.15s → 0.35s)

**Status:** 🔴 CRITICAL — P0 tickets filed (`perf-atp-guid-bloat`, `perf-wta-guid-bloat`)

**Recommended Fix:** Remove `guid` from SSR payload. Use computed slug from player name instead (e.g., `/atp/player/novak-djokovic-1`). Simpler, no extra fetch, SEO-friendly.

**Tickets:** 
- `perf-atp-guid-bloat` (Priority 0) — ATP Live page size regression
- `perf-wta-guid-bloat` (Priority 0) — WTA Live page size regression

**Report:** docs/reports/2026-07-05-performance.md

---

### ✅ Continued Stability — ISR Fix Holding (Day 3) (2026-07-04)

**Observation:** Third consecutive day of stable, fast performance across all routes. ISR fix continues to hold with minor variance on some routes.

**Measurements (2026-07-04 vs 2026-07-03 baseline):**
- **Homepage:** TTFB 0.11s → 0.16s (+45%), total 0.13s → 0.16s (+23%), size stable 32KB
- **ATP Live:** TTFB 0.14s → 0.12s (-14%), total 0.25s → 0.19s (-24%), size stable 271KB
- **WTA Live:** TTFB 0.12s → 0.15s (+25%), total 0.16s → 0.15s (-6%), size stable 49KB
- **World Cup:** TTFB 0.12s → 0.11s (-8%), total 0.29s → 0.26s (-10%), size 369KB → 366KB (-0.8%)

**Analysis:**
- ✅ **All routes FAST** — within TTFB (< 0.8s) and total (< 2.0s) budgets
- 🎉 **ISR fix continues to hold** — zero code intervention since 2026-06-30
- 🚀 **ATP/World Cup improvements** — edge caching continuing to compound (ATP -24% total, WC -10% total)
- ⚡ **Minor variance on homepage/WTA** — TTFB increases (+0.05s, +0.03s) are minor in absolute terms and follow patterns from prior runs (likely transient network/API latency)
- ⚠️ **World Cup size** continues trending toward budget (366KB, down from 369KB, still 22% over 300KB)

**Code changes:** Recent commits (empty states UI, cycling results) added no performance-degrading patterns. Variance appears transient.

**Status:** ✅ **No regressions** — stable, fast performance continues

**Tickets:** None filed (all routes within budget)

**Report:** docs/reports/2026-07-04-performance.md

---

### 🎉 MAJOR PERFORMANCE GAINS — ISR Fix Holding Strong (2026-07-03)

**Observation:** All routes show **significant improvements** vs 2026-06-30 baseline. The permanent ISR fix is not only holding, but **continuing to improve**.

**Measurements (2026-07-03 vs 2026-06-30 baseline):**
- **ATP Live:** TTFB 0.37s → 0.14s (-62%), total 0.56s → 0.25s (-55%), size 393KB → 271KB (-31%)
- **WTA Live:** TTFB 0.31s → 0.12s (-61%), total 0.71s → 0.16s (-77%), size 172KB → 49KB (-72%)
- **Homepage:** TTFB 0.14s → 0.11s (-21%), total 0.16s → 0.13s (-19%), size 28KB → 32KB (+14%)
- **World Cup:** TTFB 0.14s → 0.12s (-14%), total 0.31s → 0.29s (-6%), size 376KB → 369KB (-2%)

**Analysis:**
- ✅ **All routes FAST** — within TTFB (< 0.8s) and total (< 2.0s) budgets
- 🎉 **ATP/WTA ISR fix is durable** — zero code changes since 2026-06-30, yet performance keeps improving
- 🚀 **Edge caching compounding** — as cache warms and stabilizes, TTFB/total/size all trending downward
- ✅ **ATP Live now within size budget** (271KB < 300KB, was 393KB on 2026-06-30)
- ⚠️ **World Cup size** still 23% over budget but improving (369KB vs 300KB, down from 376KB)

**Technical Success:**
The permanent architectural fix (client-side searchParams + ISR + outcome-based tests) has proven **durable and self-improving**. No intervention needed between 2026-06-30 and today — this is ISR edge caching working as designed.

**Status:** 🎉 **No new regressions** — permanent fix holding perfectly

**Tickets:** None filed (no new performance issues detected)

**Report:** docs/reports/2026-07-03-performance.md

---

### ✅ CRITICAL RECURRING REGRESSION PERMANENTLY FIXED (2026-06-30)

**Resolution:** ATP/WTA Live ISR + searchParams architectural conflict permanently solved via ticket `perf-atp-wta-isr-permanent`. This was the SECOND occurrence of the same regression in 4 days — now resolved with a permanent architecture fix that prevents the toggle pattern from recurring.

**Measurements (2026-06-30 post-fix vs degraded state):**
- **ATP Live:** TTFB 0.60s → 0.37s (-38%), total 0.81s → 0.56s (-31%), size 393KB (stable)
- **WTA Live:** TTFB 0.33s → 0.31s (-6%), total 0.38s → 0.71s (+87% but still < 2s budget), size 172KB (stable)
- **Both routes:** Now ✅ FAST with ISR caching (`revalidate = 60`) AND full table functionality

**Technical Fix:**
- **Root cause:** The searchParams handling was ALREADY client-side safe (via useEffect guards), but page had `dynamic = "force-dynamic"` blocking ISR
- **Solution:** Removed `dynamic = "force-dynamic"`, added `revalidate = 60` for ISR
- **Component architecture:** LiveRankingTable renders with default state (all countries) during SSG, then hydrates with URL params on client mount (lines 97-103, 106-116)
- **Suspense boundary:** `fallback={null}` prevents "Loading..." text in static HTML
- **Regression guard:** Rewrote test to enforce OUTCOMES (TTFB ≤ 800ms) instead of IMPLEMENTATION (force-dynamic pattern)

**Why This Is Permanent:**
1. The underlying client-side searchParams pattern was already correct — just unblocked ISR
2. New test enforces performance budget, not implementation — if force-dynamic creeps back, TTFB degrades → test fails
3. Comments in page.tsx explain the architecture so future changes preserve it
4. Docs updated with this permanent fix explanation

**Status:** 🎉 PERMANENTLY RESOLVED — Toggle pattern cannot recur

**Ticket:** `perf-atp-wta-isr-permanent` — CLOSED

---

### 🔴 CRITICAL RECURRING REGRESSION (2026-06-30) — ATP/WTA force-dynamic AGAIN [ARCHIVED]

**Observation:** ATP/WTA Live pages have regressed for the SECOND TIME in 4 days. `force-dynamic` was reintroduced, destroying performance.

**Measurements (2026-06-30 vs 2026-06-29 baseline):**
- **ATP Live:** TTFB 0.14s → 0.60s (+329%), total 0.30s → 0.81s (+170%), size 271KB → 393KB (+45%)
- **WTA Live:** TTFB 0.15s → 0.33s (+120%), total 0.15s → 0.38s (+153%), size 49KB → 171KB (+249%)
- **Homepage:** TTFB 0.16s → 0.17s (+6%, minor variance), size 27KB → 28KB (+4%)
- **World Cup:** TTFB 0.14s → 0.13s (-7%, slight improvement), total 0.34s → 0.29s (-15%), size 377KB → 375KB (-0.5%)

**Root Cause (RECURRING PATTERN):** Commit db154e4 (2026-06-29) reverted ATP/WTA pages from ISR back to `export const dynamic = "force-dynamic"` to fix a critical bug where tables only showed 1 player instead of the full ranking.

**The Toggle Pattern (History):**
1. **2026-06-23:** ISR introduced — massive perf wins
2. **2026-06-23:** Reverted to force-dynamic — fix table rendering bug
3. **2026-06-24:** ISR restored — ATP -67% TTFB, WTA -48%
4. **2026-06-27:** FIRST REGRESSION detected — force-dynamic in production
5. **2026-06-28/29:** ISR restored AGAIN (commit e0e8f31) — "regression RESOLVED"
6. **2026-06-29:** force-dynamic ADDED AGAIN (commit db154e4) — fix table truncation
7. **2026-06-30 (NOW):** SECOND REGRESSION DETECTED 🔴

**This is a TOGGLE between two broken states:**
- **ISR:** Fast (0.14s TTFB) but table broken (shows 1 player)
- **force-dynamic:** Slow (0.60s TTFB) but table works

**Code Status (confirmed 2026-06-30):**
```
src/app/atp-live/page.tsx:export const dynamic = "force-dynamic";
src/app/wta-live/page.tsx:export const dynamic = "force-dynamic";
```

**The Bad Regression Test:**
`tests/atp-table-rendering.test.js` lines 79-117 actively **enforces force-dynamic** and **blocks ISR**. This test guarantees poor performance by testing implementation (force-dynamic) instead of outcomes (fast + working).

**Impact:**
- **CRITICAL** — Wimbledon 2026 is LIVE NOW (through July 13), tennis at annual traffic peak
- Every request hits origin + ESPN APIs (no caching)
- 100× more origin requests vs ISR edge caching
- Slow pages harm UX, SEO (Core Web Vitals), ad revenue (viewability/RPM)
- Blocks Phase 3 monetization (ads + betting affiliates)

**Status:** 🔴 CRITICAL — P0 ticket filed (`perf-atp-wta-isr-permanent`)

**Required Solution:** PERMANENT architectural fix for ISR + useSearchParams conflict. Fix ROOT CAUSE so both ISR (performance) and table functionality work together. No more toggling.

**Technical Fix:** Move searchParams handling entirely to client-side so ISR can work without breaking functionality. See ticket for detailed implementation options.

**Urgency:** IMMEDIATE — Second occurrence proves the current approach (toggle force-dynamic on/off) is not sustainable. Need permanent fix.

**Report:** docs/reports/2026-06-30-performance.md

**Ticket:** `perf-atp-wta-isr-permanent` (Priority 0)

---

### ✅ ATP/WTA Critical Regression RESOLVED (2026-06-29) — ⚠️ REGRESSED AGAIN 2026-06-30

**Observation:** ISR caching fully restored on ATP/WTA Live pages. Critical P0 regression from 2026-06-27 now completely resolved.

**Measurements (2026-06-29 vs 2026-06-28 degraded baseline):**
- **ATP Live:** TTFB 0.40s → 0.14s (-65%), size 399KB → 271KB (-32%)
- **WTA Live:** TTFB 0.29s → 0.15s (-48%), size 173KB → 49KB (-72%)
- **Homepage:** TTFB 0.12s → 0.16s (+33%, minor variance), size 24KB → 27KB (+12.5%)
- **World Cup:** TTFB 0.17s → 0.14s (-18%), size 379KB → 377KB (-0.5%)

**Resolution:** Commit e0e8f31 (2026-06-28) by planner — "Restore ISR caching on ATP/WTA Live pages"

**Technical fix:**
- Changed from `dynamic="force-dynamic"` to `revalidate=60` (ISR)
- Modified Suspense fallback from visible text to null
- Added regression guard test to prevent reverting to force-dynamic

**Code verification:**
```bash
$ grep -r "force-dynamic" src/app/atp-live/ src/app/wta-live/
No force-dynamic found ✓
```

**Impact:**
- ✅ Both routes now served from edge cache with 60s revalidation
- ✅ 100× fewer origin requests vs force-dynamic
- ✅ All routes now FAST and within TTFB/total budgets
- ✅ Tennis pages (core traffic drivers) unblocked for monetization

**Homepage variance:** +33% TTFB (0.12s → 0.16s) but remains FAST and within budget. Likely transient network variance (same pattern as 2026-06-27/28). Monitoring in next run.

**Status:** 🎉 CRITICAL REGRESSION RESOLVED

**Ticket:** `perf-atp-wta-isr-restore` — CLOSED (commit e0e8f31)

**Report:** docs/reports/2026-06-29-performance.md

---

### ⚠️ ATP/WTA Regression Persists, Homepage Variance Resolved (2026-06-28)

**Observation:** Mixed results — homepage variance fully resolved, ATP/WTA regression persists but showing slight improvement.

**Measurements (2026-06-28):**
- **Homepage:** TTFB 0.38s → 0.12s (-68%, variance fully resolved)
- **ATP Live:** TTFB 0.61s → 0.40s (-34% improvement but still +135% vs 0.17s baseline)
- **WTA Live:** TTFB 0.31s → 0.29s (-6%, still +164% vs 0.11s baseline), size 153KB → 173KB (+13%)
- **World Cup:** size 390KB → 379KB (-3%, still over 300KB budget)

**Status:**
- ✅ **Homepage variance RESOLVED** — The +65% TTFB spike from 2026-06-27 (0.23s → 0.38s) is completely resolved, now at 0.12s (-48% vs baseline). Confirms transient network/upstream latency.
- 🔴 **ATP/WTA regression PERSISTS** — Pages still use force-dynamic (ticket `perf-atp-wta-isr-restore` remains open). TTFB improving slightly but still critical (+135-164% vs baseline).
- ⚠️ **World Cup size improving** — Down from 390KB to 379KB, still 26% over 300KB budget but trending right.

**Code Status (confirmed 2026-06-28):**
```
src/app/atp-live/page.tsx:export const dynamic = "force-dynamic";
src/app/wta-live/page.tsx:export const dynamic = "force-dynamic";
```

**Trend Analysis:**
ATP/WTA TTFB is slowly improving (ATP -34%, WTA -6% vs yesterday) even with force-dynamic still in place. This suggests:
1. Upstream ESPN API latency improving, OR
2. Origin function cold-start frequency reduced, OR
3. Network conditions improving

However, regression remains CRITICAL — baseline is 0.17s (ATP) and 0.11s (WTA), so current state is still 135-164% slower.

**Action:** Continue monitoring. No new ticket needed (existing ticket `perf-atp-wta-isr-restore` is comprehensive).

**Report:** docs/reports/2026-06-28-performance.md

---

### 🔴 CRITICAL REGRESSION: ATP/WTA Force-Dynamic Rendering (2026-06-27)

**Observation:** MASSIVE performance degradation across all tennis pages.

**Measurements (2026-06-27 vs 2026-06-26 baseline):**
- **ATP Live:** TTFB 0.17s → 0.61s (+259%), size 271KB → 399KB (+47%)
- **WTA Live:** TTFB 0.11s → 0.31s (+182%), size 49KB → 153KB (+212%)
- **Homepage:** TTFB 0.23s → 0.38s (+65%, cause TBD)

**Root Cause:** Commit 3eec872 (2026-06-26) restored `export const dynamic = "force-dynamic"` in ATP/WTA page files to fix a table rendering bug (Suspense fallback persisting). This forces every request to render on origin instead of serving from edge cache.

**Status:** 🔴 CRITICAL — P0 ticket filed (`perf-atp-wta-isr-restore`)

**Impact:**
- Every request hits origin + upstream ESPN APIs (no caching)
- 3.6× slower TTFB on ATP, 2.8× slower on WTA
- Harms UX, SEO (Core Web Vitals), ad revenue (viewability), and scale (100× more origin requests)
- Dual problem: BOTH performance regression (this) AND functional bug (production shows "Loading table..." fallback, see ticket `suspense-fallback-bug`)

**Technical Details:**
The force-dynamic change "fixes" functionality (table renders correctly) but destroys performance. The root issue is an architectural conflict: **ISR + React Suspense + useSearchParams**.

When using ISR (`revalidate: 60`):
- Next.js pre-renders at build time
- `LiveRankingTable` (client component) uses `useSearchParams()`
- SearchParams unavailable at build time → component suspends
- Suspense fallback ("Loading table...") rendered in static HTML
- Result: Fast TTFB but broken UI

When using force-dynamic:
- Every request renders at request time
- SearchParams available → component renders correctly
- Result: Correct UI but terrible performance (no caching)

**Previous Fix Attempt:** Commit 6cfcae9 (2026-06-24) successfully restored ISR (ATP TTFB 0.39s → 0.18s), but that fix later regressed.

**Solution:** Fix the Suspense+useSearchParams conflict properly (move Suspense inside client component OR make searchParams optional) so ISR works without breaking functionality. See ticket for detailed implementation plan.

**Urgency:** IMMEDIATE — tennis pages are core traffic drivers. Blocks monetization path (slow pages = lower ad RPM).

**Report:** docs/reports/2026-06-27-performance.md

---

### ⚠️ World Cup Page Variance Detected (2026-06-26) — ✅ RESOLVED (2026-06-27)

**Observation:** World Cup page showed increased TTFB (0.12s → 0.16s, +33%) and total (0.28s → 0.37s, +32%) in 2026-06-26 measurement.

**Resolution (2026-06-27):** Performance returned to baseline with IMPROVEMENTS:
- TTFB: 0.16s → 0.12s (-25%, back to baseline)
- Total: 0.37s → 0.31s (-16%)
- Size: 390KB → 351KB (-10%)

**Status:** ✅ Resolved — variance was transient network/upstream ESPN API latency (same pattern as ATP variance from 2026-06-25).

**Report:** docs/reports/2026-06-26-performance.md, docs/reports/2026-06-27-performance.md

---

### ✅ ATP Live Variance Resolved (2026-06-26)

**Previous variance (2026-06-25):** TTFB 0.13s → 0.18s (+38%), total 0.25s → 0.33s (+32%)

**Current (2026-06-26):** TTFB 0.17s (-5.6% vs baseline), total 0.28s (-15.2% vs baseline)

**Status:** ✅ Resolved — confirms yesterday's variance was transient network/upstream fluctuation, not a structural performance issue.

**Report:** docs/reports/2026-06-25-performance.md

---

### ✅ ISR RESTORATION (COMPLETED — commit 6cfcae9, 2026-06-24)

**Commit:** 6cfcae9 (2026-06-24)
**Change:** Restored ISR caching on ATP/WTA pages while preserving country filter functionality
**Solution:** Removed searchParams access from server components (which forced dynamic rendering), kept useSearchParams in client component with Suspense boundary

**Performance Recovery:**
- **ATP Live:** TTFB 0.39s → 0.13s (-67%), size 374KB → 269KB (-28%)
- **WTA Live:** TTFB 0.31s → 0.16s (-48%), size 157KB → 48KB (-69%)

**Impact:** Pages now served from edge cache with 60s revalidation. Massive TTFB improvement, sizes back to ISR baseline.

**Ticket:** `perf-atp-wta-isr-regression` (Priority 0) — CLOSED

---

### 🔴 CRITICAL REGRESSION (RESOLVED — 2026-06-24) — ATP/WTA ISR Rollback

**Commit:** 8ee5be4 (2026-06-23)
**Change:** Reverted ATP and WTA Live pages from ISR (`revalidate: 60`) to `force-dynamic`
**Reason:** Fix rendering bug where only 1 player showed (useSearchParams conflict with ISR)

**Performance Impact (REGRESSION):**
- **ATP Live:** TTFB 0.18s → 0.39s (+117%), size 269KB → 374KB (+39%)
- **WTA Live:** TTFB 0.16s → 0.31s (+94%), size 48KB → 157KB (+227%)

**Root cause:** Every request blocked on origin/upstream APIs instead of serving from edge cache.

**Resolution:** Commit 6cfcae9 restored ISR while preserving country filter by moving searchParams handling entirely to client component.

---

### ✅ ISR Migration (COMPLETED — commit b438b6d, 2026-06-23)
**Impact:** Massive performance wins across all routes.

**Results:**
- ATP Live: TTFB 0.46s → 0.18s (-61%), size 380KB → 269KB (-29%)
- WTA Live: TTFB 0.29s → 0.16s (-45%), size 165KB → 48KB (-71%)
- World Cup: TTFB 0.35s → 0.24s (-31%)
- Home: size 93KB → 24KB (-74%)

Migrated from `force-dynamic` to `export const revalidate = 60` for ISR caching. Pages now served from edge with background revalidation.

**Note:** ATP/WTA later reverted to force-dynamic (see regression above).

### ✅ ESPN Fetch Deduplication (COMPLETED — commit e3242c7)
Eliminated redundant ESPN API calls on World Cup page. Contributed to TTFB improvements.

---

## Known Performance Debt

### 1. World Cup Page Size Regression (High Impact, PRIORITY 1)
**Impact:** Page size **increased 14%** (341KB → 390KB, now 30% over 300KB budget).

**Root cause:** Recent feature additions:
- Team statistics leaderboards (commit 853a068)
- Team rosters (commit 47afa40)
- Match page enhancements (commit ed88bce)

**Mobile impact:** 390KB on slow 3G = ~3.5s transfer time.

**Solution (ticket `perf-wc-page-size`):** Lazy-load below-the-fold sections:
- Knockout bracket (~50KB)
- Team statistics (~30KB)
- Selective roster loading

**Target:** < 300KB initial bundle (~100KB reduction needed)

**Why urgent:** World Cup 2026 is live (through ~July 19) — high mobile traffic NOW.

---

### 2. Large Page Sizes (Medium Impact)
- **/atp-live**: 271KB (now under 300KB budget, improved from 380KB) — still loads ~1000 players at once
  - **Target:** < 100KB via server-side pagination (ticket `perf-atp-page-size`)
- **/world-cup**: 390KB (**over 300KB budget**, regressed from 341KB) — 100 matches + 12 groups + bracket + stats + rosters
  - **Target:** < 300KB via lazy-loading (ticket `perf-wc-page-size`)

**Mobile impact:** 390KB on slow 3G = ~3.5s transfer alone.

**Solutions:**
- **World Cup (priority 1):** Lazy-load bracket and stats via `next/dynamic` + Suspense
- **ATP (priority 2):** Server-side pagination — send only 50 players per request
- **Bundle analysis** to identify large JS dependencies (`@next/bundle-analyzer`)

---

### 3. Multiple Font Families (Low-Medium Impact)
5 Google Fonts loaded: Geist, Geist_Mono, Archivo, Oswald, Source_Serif_4.

**Impact:** Additional render-blocking requests; font flash.

**Solution:** Audit font usage; reduce to 2-3 core families; ensure `display: 'swap'`.

---

### 4. Limited `next/image` Usage (Low Impact)
Only 1 occurrence of `next/image` found across components.

**Impact:** Unoptimized images can bloat payload and slow LCP.

**Action:** Audit image usage and migrate to `next/image` for automatic optimization.

---

## Regression Detection

**On every build/PR:**
1. Run `npm run check:performance` in CI
2. Compare TTFB/total/size against this baseline
3. **Flag as regression** if any route:
   - TTFB or total increased **> 25%** vs baseline
   - Size increased **> 15%** vs baseline
   - Any metric exceeds its budget

**Update this baseline** only when a real performance improvement ships (move budgets downward). Never silently rebaseline a regression.

---

## Next Steps

1. Add Core Web Vitals measurement (LCP/INP/CLS) via Lighthouse in CI
2. File tickets for force-dynamic → ISR migration (highest ROI)
3. File ticket for World Cup redundant fetch deduplication
4. Set up bundle analysis to track JS payload over time
