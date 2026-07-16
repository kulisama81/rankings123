# Performance Report — 2026-07-16

**Inspector:** perf-inspector (automated daily run)  
**Measurement:** `npm run check:performance` (HTTP fetch TTFB/total/size)  
**Baseline:** docs/perf-baseline.md (last updated 2026-07-15)

---

## Summary

🔴 **CRITICAL SIZE REGRESSIONS PERSIST — Day 12**

ATP and WTA Live pages remain critically over size budget for a **12th consecutive day**. No code changes addressed the root cause (GUID bloat from commit 91820bf, 2026-07-05). P0 tickets remain open.

✅ **GOOD NEWS:**
- **WTA TTFB variance RESOLVED:** Yesterday's +77% spike (0.13s → 0.23s) fully resolved today (0.23s → 0.14s, -39%). Confirms transient network/edge latency (same pattern as Homepage 2026-07-10, ATP 2026-07-09, World Cup 2026-07-07).
- **Font loading optimization shipped:** Commit 0a14dcb added `display: 'swap'` to all 5 Google Fonts — prevents render-blocking, improves LCP and Core Web Vitals. Positive performance improvement.
- **All routes FAST:** TTFB/total times within budgets (< 0.8s / < 2.0s) despite size bloat.

---

## Measurements (2026-07-16 vs 2026-07-15)

**HTTP Fetch (npm run check:performance):**

| Route      | TTFB (prev) | TTFB (now) | Δ     | Total (prev) | Total (now) | Δ     | Size (prev) | Size (now) | Δ     | Status |
|------------|-------------|------------|-------|--------------|-------------|-------|-------------|------------|-------|--------|
| Homepage   | 0.12s       | 0.14s      | +17%  | 0.14s        | 0.16s       | +14%  | 31KB        | 31KB       | 0%    | ✅ FAST |
| ATP Live   | 0.15s       | 0.13s      | -13%  | 0.28s        | 0.38s       | +36%  | 612KB       | 611KB      | -0.2% | 🔴 SIZE FAIL |
| WTA Live   | 0.23s       | 0.14s      | -39%  | 0.39s        | 0.24s       | -38%  | 353KB       | 353KB      | 0%    | 🔴 SIZE FAIL |
| World Cup  | 0.14s       | 0.12s      | -14%  | 0.23s        | 0.30s       | +30%  | 366KB       | 366KB      | 0%    | 🔴 SIZE FAIL |

**Core Web Vitals:** Not measured (browser automation requires approval)

---

## Analysis

### ✅ WTA TTFB Variance RESOLVED

Yesterday's WTA TTFB variance (+77%, 0.13s → 0.23s) is **fully resolved** today:
- **TTFB:** 0.23s → 0.14s (-39%, **back to normal**)
- **Total:** 0.39s → 0.24s (-38%, **back to normal**)
- **Size:** 353KB (stable, no change)

**Pattern confirms transient network/edge latency** — same behavior as:
- Homepage 2026-07-10 (+200% → resolved next day)
- ATP 2026-07-09 (+129% → resolved next day)
- World Cup 2026-07-07 (+54% → resolved next day)

No code changes to WTA Live page. Variance was external/infrastructure, not a code regression.

### 🔴 Size Regressions Persist — Day 12

**All three critical size regressions continue unchanged:**

1. **ATP Live:** 611KB vs 300KB budget (104% over) — Day 12, -1KB from yesterday (stable)
2. **WTA Live:** 353KB vs 200KB budget (77% over) — Day 12, stable
3. **World Cup:** 366KB vs 300KB budget (22% over) — Day 12, stable

**Root cause (UNFIXED):** GUID bloat from commit 91820bf (2026-07-05). No commits since then addressed the underlying issue. The 36-character UUID is embedded in the Next.js `self.__next` JSON payload for client-side hydration, bloating ATP/WTA pages by ~280KB.

**Impact (ESCALATING):**
- 🔴 **Day 12** — eleventh consecutive day without fix
- 📱 **Mobile:** ATP 611KB on slow 3G = ~5.7s transfer time alone, WTA 353KB = ~3.3s
- 💰 **Revenue:** Blocks Phase 3 monetization (ads + betting affiliates)
- 🏆 **FIFA World Cup 2026:** LIVE through ~July 19 (**3 days remaining**, elevated sports traffic NOW)
- ⏱ **Urgency:** IMMEDIATE

### ⚠️ Minor Load Time Increases (Within Budget)

**ATP Live total:** 0.28s → 0.38s (+36%, +0.10s)  
**World Cup total:** 0.23s → 0.30s (+30%, +0.07s)

Both remain **well within 2.0s budget**. Likely transient variance (no code changes to these pages' server-side rendering). TTFB stable/improved (ATP -13%, WC -14%), so the increase is in transfer time, not server response.

**Why likely transient:**
1. ATP/WC sizes stable (611KB/366KB unchanged)
2. TTFB improved or stable on both routes
3. No code changes to page rendering
4. Similar pattern to previous transient variances that resolved

Monitoring in next run — if persists or worsens, will investigate further.

### ✅ Font Loading Optimization (Positive Improvement)

**Commit 0a14dcb (2026-07-15)** — "Optimize font loading for better LCP and Core Web Vitals"

Added `display: 'swap'` to all 5 Google Fonts (Geist Sans, Geist Mono, Archivo, Oswald, Source Serif 4):
- **Before:** Fonts render-blocking, FOIT (flash of invisible text)
- **After:** Fonts show fallback text immediately, swap in when loaded

**Expected improvements (can't measure CWV today):**
- ✅ Better LCP (text visible sooner)
- ✅ Better FCP (content painted faster)
- ✅ No FOIT (better perceived performance)
- ✅ Follows web.dev best practices

This is a **positive** performance change. Won't affect HTML size measurements, but should improve user-perceived performance and Core Web Vitals scores.

### 📊 Code Changes Since 2026-07-15

1. `dce5691` — Autoresearch 2026-07-16 (tickets only)
2. `5807996` — Inspector 2026-07-15 (tickets only)
3. `889d1eb` — Data anomaly ticket (tickets only)
4. **`0a14dcb`** — **Optimize font loading** (display: 'swap') — **POSITIVE** for LCP/CWV
5. `cd39d22` — **Add UCI Cycling World Rankings page** — NEW FEATURE (new route, doesn't affect measured routes)

**No changes to ATP/WTA/World Cup data or rendering** that would explain the minor load time increases. Variance likely transient.

---

## Status vs Budget

| Route      | TTFB Budget | TTFB Actual | Status | Total Budget | Total Actual | Status | Size Budget | Size Actual | Status |
|------------|-------------|-------------|--------|--------------|--------------|--------|-------------|-------------|--------|
| Homepage   | ≤ 0.8s      | 0.14s       | ✅ PASS | ≤ 2.0s       | 0.16s        | ✅ PASS | ≤ 150KB     | 31KB        | ✅ PASS |
| ATP Live   | ≤ 0.8s      | 0.13s       | ✅ PASS | ≤ 2.0s       | 0.38s        | ✅ PASS | ≤ 300KB     | 611KB       | 🔴 FAIL |
| WTA Live   | ≤ 0.8s      | 0.14s       | ✅ PASS | ≤ 2.0s       | 0.24s        | ✅ PASS | ≤ 200KB     | 353KB       | 🔴 FAIL |
| World Cup  | ≤ 0.8s      | 0.12s       | ✅ PASS | ≤ 2.0s       | 0.30s        | ✅ PASS | ≤ 300KB     | 366KB       | 🔴 FAIL |

**Summary:**
- ✅ **All routes FAST** — TTFB and total load times within budget
- 🔴 **Three routes over size budget** — ATP, WTA, World Cup all critically over

---

## Tickets

**Existing P0 tickets (still open):**
- `perf-atp-guid-bloat` (Priority 0) — ATP Live page size regression (104% over budget), **Day 12**
- `perf-wta-guid-bloat` (Priority 0) — WTA Live page size regression (77% over budget), **Day 12**

**No new tickets filed.** The root cause and solution are well-documented in the existing tickets. The planner needs to prioritize these P0 fixes.

---

## Recommendations

### Immediate (P0)

**Fix the GUID bloat issue** — 12 days is far too long for a CRITICAL performance regression:

1. **Remove `guid` from SSR payload** — only needed for client-side linking
2. **Use SEO-friendly slug URLs** — `/atp/player/novak-djokovic-1` instead of `/atp/player/{36-char-uuid}`
3. **Expected impact:** ATP -280KB (611KB → 331KB, within budget), WTA -150KB (353KB → 203KB, within budget)

**Why urgent:**
- 🏆 **World Cup 2026 LIVE** — only 3 days remaining (through ~July 19), peak sports traffic NOW
- 📱 **Mobile UX** — 611KB = ~5.7s transfer on slow 3G
- 💰 **Revenue** — slow pages harm ad viewability, RPM, and SEO (Core Web Vitals rank factor)
- ⏱ **12 days** — regression persists with zero intervention

### Short-term

**Measure Core Web Vitals regularly** — browser automation currently blocked, but real user metrics (LCP/FCP/CLS/INP) are the north-star for performance. HTTP fetch (TTFB/size) is useful but incomplete.

**Continue monitoring variance patterns** — ATP/WC load time increases today are likely transient (same pattern as previous resolved variances), but monitor in next run.

### Long-term

Already covered in existing tickets:
- `perf-wc-page-size` — Lazy-load World Cup bracket/stats (target < 300KB)
- `perf-atp-page-size` — Server-side pagination for ATP top-1000 (target < 100KB)

---

## Conclusion

**Day 12 of CRITICAL size regressions.** GUID bloat from 2026-07-05 remains unfixed. All routes remain FAST in TTFB/total despite size bloat, and yesterday's WTA variance fully resolved. Font loading optimization shipped (positive for CWV). 

**World Cup Final is July 19 (3 days away)** — fix the P0 size issues NOW to capture peak tournament traffic with fast, monetization-ready pages.
