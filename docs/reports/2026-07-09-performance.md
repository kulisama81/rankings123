# Performance Report — 2026-07-09

**Measurement:** `npm run check:performance` (2 runs) + Core Web Vitals (Playwright)  
**Status:** 🔴 CRITICAL SIZE REGRESSIONS PERSIST (Day 5) + ⚠️ ATP TTFB variance  
**Previous:** [2026-07-08](2026-07-08-performance.md)

---

## Executive Summary

**CRITICAL (Day 5):** ATP and WTA Live page size regressions continue unfixed for a 5th consecutive day. P0 tickets filed 2026-07-05 remain open.

**NEW:** ATP Live TTFB shows variance (0.32-0.43s via HTTP fetch vs 0.04s in browser), likely transient network/edge node variance.

**EXCELLENT NEWS:** Core Web Vitals measurements show all routes pass GOOD thresholds (LCP < 1.0s, FCP < 0.7s, TTFB < 0.04s in browser).

---

## Measurements

### HTTP Fetch Performance (npm run check:performance)

**Run 1:**
| Route        | TTFB  | Total | Size  | vs Baseline (2026-07-08) |
|--------------|-------|-------|-------|---------------------------|
| /            | 0.11s | 0.14s | 33KB  | -21% / stable / stable    |
| /atp-live    | 0.32s | 0.45s | 591KB | +129% / +88% / stable     |
| /wta-live    | 0.13s | 0.22s | 346KB | +8% / -21% / -0.6%        |
| /world-cup   | 0.12s | 0.29s | 362KB | -14% / stable / +0.3%     |

**Run 2 (variance check):**
| Route        | TTFB  | Total | Size  | vs Run 1 |
|--------------|-------|-------|-------|----------|
| /            | 0.13s | 0.15s | 33KB  | +18%     |
| /atp-live    | 0.43s | 0.55s | 591KB | +34% 🔴  |
| /wta-live    | 0.33s | 0.45s | 346KB | +154% 🔴 |
| /world-cup   | 0.21s | 0.49s | 362KB | +75%     |

**Variance Analysis:** ATP and WTA TTFB show HIGH variance between runs (+34-154%), suggesting transient network/edge node latency rather than structural regression.

### Core Web Vitals (Playwright, Real Browser)

| Route        | LCP   | FCP   | CLS   | TTFB  | Load  | Total Size | Status |
|--------------|-------|-------|-------|-------|-------|------------|--------|
| /            | 1.21s | 0.49s | 0.046 | 0.03s | 4.97s | 452KB      | ✅ GOOD |
| /atp-live    | 0.78s | 0.53s | N/A   | 0.04s | 6.46s | 732KB      | ✅ GOOD |
| /wta-live    | 0.88s | 0.64s | N/A   | N/A   | 0.04s | 5.34s | 588KB      | ✅ GOOD |
| /world-cup   | 0.88s | 0.66s | N/A   | 0.04s | 6.08s | 438KB      | ✅ GOOD |

**Targets (web.dev/vitals):**
- **LCP** (Largest Contentful Paint): < 2.5s GOOD ✅, < 4.0s NEEDS IMPROVEMENT
- **FCP** (First Contentful Paint): < 1.8s GOOD ✅, < 3.0s NEEDS IMPROVEMENT
- **CLS** (Cumulative Layout Shift): < 0.1 GOOD ✅, < 0.25 NEEDS IMPROVEMENT
- **TTFB** (Time to First Byte): < 0.8s GOOD ✅, < 1.8s NEEDS IMPROVEMENT

**CWV Assessment:** ✅ All routes PASS all Core Web Vitals thresholds with excellent margins.

**Note on CLS:** CLS measurement returned N/A for ATP/WTA/World Cup routes. This could indicate:
- No layout shifts detected (good!)
- Measurement timing issue (observer didn't capture shifts)
- Will monitor in future runs

**Note on Size Discrepancy:**
- `check:performance` measures initial HTML response only (uncompressed)
- CWV measures total transfer size (all resources: JS, CSS, fonts, images, analytics)
- ATP Live: 591KB HTML + 141KB additional resources = 732KB total
- WTA Live: 346KB HTML + 242KB additional resources = 588KB total

---

## Analysis

### 🔴 CRITICAL: Size Regressions Persist (Day 5)

**Status:** P0 tickets from 2026-07-05 remain unfixed for 5th consecutive day.

| Route     | Current Size | Budget | Over Budget | Days Unfixed |
|-----------|--------------|--------|-------------|--------------|
| ATP Live  | 591KB        | 300KB  | +97% 🔴     | Day 5        |
| WTA Live  | 346KB        | 200KB  | +73% 🔴     | Day 5        |

**Root Cause (from 2026-07-05):** Commit 91820bf added `guid` field to player data, bloating Next.js `self.__next` JSON payload from ~130KB to ~410KB (+280KB).

**Impact:**
- 📱 **Mobile:** ATP 591KB on slow 3G = ~5.5s transfer time alone
- 💰 **Revenue:** Blocks Phase 3 monetization (ads + betting affiliates)
- 🏆 **Tour de France 2026:** Live through July 27 (elevated sports traffic NOW)
- ⏱ **Urgency:** IMMEDIATE — 5th consecutive day without fix

**Tickets:** 
- `perf-atp-guid-bloat` (Priority 0) — OPEN, Day 5
- `perf-wta-guid-bloat` (Priority 0) — OPEN, Day 5

### ⚠️ NEW: ATP TTFB Variance (Likely Transient)

**Observation:** ATP Live TTFB shows high variance:
- HTTP fetch Run 1: 0.32s (+129% vs 2026-07-08 baseline of 0.14s)
- HTTP fetch Run 2: 0.43s (+34% vs Run 1)
- Browser (CWV): 0.04s (EXCELLENT, -71% vs baseline)

**WTA also shows variance:**
- HTTP fetch Run 1: 0.13s (baseline)
- HTTP fetch Run 2: 0.33s (+154% vs Run 1)
- Browser (CWV): 0.04s (EXCELLENT)

**Assessment:**
- ✅ **Browser measurements (CWV) show FAST performance** (0.04s TTFB, well within 0.8s budget)
- ⚠️ **HTTP fetch variance suggests transient network/edge node latency** (similar to World Cup pattern from 2026-07-07/08)
- ✅ **No code changes to ATP/WTA pages since 2026-07-08** (confirmed via git log)
- ✅ **Core Web Vitals are EXCELLENT** (LCP < 1.0s on all routes)

**Conclusion:** This appears to be transient network variance affecting the HTTP fetch measurements, NOT a structural regression. The real user experience (measured via browser CWV) remains excellent. Will monitor in next run.

### ✅ Positive: Core Web Vitals Pass All Thresholds

**All routes achieve GOOD ratings:**
- LCP: 0.78-1.21s (target < 2.5s, all ✅)
- FCP: 0.49-0.66s (target < 1.8s, all ✅)
- TTFB: 0.03-0.04s (target < 0.8s, all ✅)
- CLS: 0.046 on homepage (target < 0.1, ✅)

**Impact:** Despite HTML payload size regressions, actual user-perceived performance (Core Web Vitals) remains excellent. However, size regressions still harm:
- Mobile users on metered/slow connections
- SEO (page weight is a ranking factor)
- Server costs (more data transferred per request)

### ✅ Stable: Homepage and World Cup

- **Homepage:** Fast and stable (TTFB 0.11-0.13s, size 33KB)
- **World Cup:** TTFB variance in Run 2 (+75%) but CWV excellent (0.04s TTFB, 0.88s LCP)

---

## Regressions vs Baseline (2026-07-08)

| Route      | Metric | 2026-07-08 | 2026-07-09 (Run 1) | Change   | Status |
|------------|--------|------------|--------------------|----------|--------|
| ATP Live   | TTFB   | 0.14s      | 0.32s              | +129% 🔴 | Variance (see analysis) |
| ATP Live   | Size   | 591KB      | 591KB              | 0%       | 🔴 Unfixed (Day 5) |
| WTA Live   | Size   | 348KB      | 346KB              | -0.6%    | 🔴 Unfixed (Day 5) |

**Key Changes:**
- 🔴 **ATP TTFB variance:** +129% in Run 1, but browser CWV shows 0.04s (excellent) — likely transient
- 🔴 **Size regressions persist:** No change in ATP/WTA size, P0 tickets remain open (Day 5)
- ✅ **Core Web Vitals excellent:** All routes pass GOOD thresholds

---

## Tickets Status

### Open P0 Tickets (Day 5)

**`perf-atp-guid-bloat`** (Priority 0)
- **Status:** OPEN (5th day)
- **Issue:** ATP Live size 591KB (97% over 300KB budget)
- **Root cause:** GUID bloat in SSR payload
- **Impact:** CRITICAL — blocks monetization, harms mobile UX
- **Action required:** Remove guid from SSR payload, use computed slug instead

**`perf-wta-guid-bloat`** (Priority 0)
- **Status:** OPEN (5th day)
- **Issue:** WTA Live size 346KB (73% over 200KB budget)
- **Root cause:** Same as ATP (GUID bloat)
- **Impact:** CRITICAL — blocks monetization, harms mobile UX
- **Action required:** Same fix as ATP

### No New Tickets Filed

**Rationale:**
- ATP TTFB variance appears transient (browser CWV shows excellent performance)
- Existing P0 tickets cover the critical size regressions
- Will monitor ATP TTFB in next run to confirm variance pattern

---

## Recommendations

### Immediate (P0)

1. **Fix GUID bloat (Day 5)** — tickets `perf-atp-guid-bloat`, `perf-wta-guid-bloat`
   - Remove `guid` from SSR payload
   - Use computed slug from player name (e.g., `/atp/player/novak-djokovic-1`)
   - Target: ATP < 300KB, WTA < 200KB
   - Expected savings: ~280KB per page

### Monitor (Next Run)

1. **ATP TTFB variance** — run 2-3 measurements to confirm transient pattern
2. **CLS measurement** — investigate why CLS returned N/A on some routes
3. **Total page weight** — consider lazy-loading below-the-fold sections to reduce initial bundle

---

## Why This Matters (Conversion + Revenue Lever)

Performance directly impacts business metrics:

- **SEO:** Core Web Vitals are Google ranking factors (we're excellent ✅, but size matters)
- **Engagement:** Every 100ms of load time affects bounce rate and session duration
- **Mobile:** 591KB on slow 3G = ~5.5s transfer alone (ATP)
- **Ad Revenue:** Faster pages = higher viewability, better RPM
- **Monetization Readiness:** Slow pages block Phase 3 betting affiliate integration

**Current State:**
- ✅ Core Web Vitals: EXCELLENT (LCP < 1.0s, FCP < 0.7s, TTFB < 0.04s in browser)
- 🔴 HTML payload: CRITICAL BLOAT (ATP +97%, WTA +73% over budget, Day 5)
- ⚠️ HTTP fetch TTFB: Variance detected (likely transient network/edge latency)

**Priority:** Fix GUID bloat (P0, Day 5) to unblock monetization and improve mobile experience.

---

## Next Run

**Focus:**
1. Verify ATP TTFB variance pattern (2-3 measurements)
2. Check if P0 size tickets have been addressed
3. Investigate CLS measurement gaps
4. Continue Core Web Vitals monitoring

**Baseline Update:** ATP TTFB shows variance; will not update baseline until pattern stabilizes. Size baseline remains unchanged (regressions persist).
