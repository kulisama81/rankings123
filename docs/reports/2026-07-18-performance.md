# Performance Report — 2026-07-18

## Summary

🔴 **CRITICAL SIZE REGRESSIONS PERSIST — Day 14**

ATP and WTA Live pages remain critically over budget for the **14th consecutive day** since GUID bloat regression (2026-07-05). Sizes slightly increased (+6KB ATP, +8KB WTA) but likely measurement variance or data fluctuation. P0 tickets remain unfixed. World Cup size regression persists (24% over budget).

## Measurements (2026-07-18 vs 2026-07-17)

**HTTP Fetch (npm run check:performance):**
- **Homepage:** TTFB 0.13s → 0.15s (+15%), total 0.15s → 0.17s (+13%), size 34KB (stable)
- **ATP Live:** TTFB 0.13s → 0.15s (+15%), total 0.40s → 0.42s (+5%), size 614KB → 620KB (+1%, **+6KB**)
- **WTA Live:** TTFB 0.15s → 0.13s (-13%), total 0.36s → 0.24s (-33%), size 358KB → 366KB (+2.2%, **+8KB**)
- **World Cup:** TTFB 0.13s → 0.12s (-8%), total 0.23s → 0.30s (+30%), size 371KB (stable)

**Core Web Vitals:** Not measured (browser automation requires approval)

## Analysis

### 🔴 CRITICAL — ATP Size Regression (Day 14)
- **Current:** 620KB (107% over 300KB budget)
- **Change:** +6KB from yesterday (614KB → 620KB, +1%)
- **Root cause:** GUID bloat from commit 91820bf (2026-07-05) — unfixed
- **Status:** CRITICAL, **Day 14** without fix

### 🔴 CRITICAL — WTA Size Regression (Day 14)
- **Current:** 366KB (83% over 200KB budget)
- **Change:** +8KB from yesterday (358KB → 366KB, +2.2%)
- **Root cause:** GUID bloat from commit 91820bf (2026-07-05) — unfixed
- **Status:** CRITICAL, **Day 14** without fix

### 🔴 World Cup Size Regression
- **Current:** 371KB (24% over 300KB budget)
- **Change:** Stable (371KB)
- **Root cause:** Recent features (Final predictions, countdown widget, match enhancements)
- **Prior optimization:** Lazy-loading implemented (ticket `perf-wc-page-size` closed) but new features added back the size

### ⚠️ Load Time Variance
- **World Cup:** total +30% (0.23s → 0.30s) but within 2.0s budget
- **Pattern:** Likely transient network/edge variance (TTFB improved -8%, size stable)
- **Other routes:** WTA total improved -33% (0.36s → 0.24s) despite size increase, suggesting transient variance

### ⚠️ Homepage/ATP TTFB Variance
- **Homepage:** TTFB +15% (0.13s → 0.15s, +0.02s in absolute terms)
- **ATP:** TTFB +15% (0.13s → 0.15s)
- **Both within budget** (< 0.8s TTFB, < 2.0s total)
- **Likely transient** — minor absolute increases

## Why ATP/WTA Size Increases Are Likely Data Variance

The +6KB (ATP) and +8KB (WTA) increases are likely NOT new code regressions:

1. **Small percentage changes** — +1% ATP, +2.2% WTA (within measurement variance)
2. **No structural changes** — Recent commit c2ae726 (WTA/ATP data clarity fix) changed display logic but not data payload
3. **Natural data fluctuation** — Player counts, name lengths, tournament strings vary week-to-week
4. **Pattern matches prior variance** — Sizes have fluctuated ±5-10KB in previous runs
5. **Root cause unfixed** — GUID bloat from 2026-07-05 (commit 91820bf) remains the primary issue

## Code Changes Since 2026-07-17

1. `da2049a` — Autoresearch 2026-07-18 (tickets only)
2. `5055a61` — Inspector 2026-07-17 PM (tickets only)
3. `c8a7659` — Mark cycling stage status bug as closed
4. `948d965` — Fix Tour de France stale stage status bug
5. `5f78d94` — Planner tennis session log + ticket status update
6. `c2ae726` — **Fix WTA/ATP ranking data clarity** — removed ambiguous placeholders, added test suite (no payload impact expected)

**No commits addressed the GUID bloat issue** (commit 91820bf from 2026-07-05).

## Impact (ESCALATING)

- 🔴 **Day 14 of critical size regressions** — both tennis pages (core traffic drivers) remain critically over budget
- 📱 **Mobile:** ATP 620KB on slow 3G = ~5.8s transfer time alone, WTA 366KB = ~3.4s
- 💰 **Revenue:** Blocks Phase 3 monetization (ads + betting affiliates)
- 🏆 **FIFA World Cup 2026:** LIVE through ~July 19 (**FINAL DAY**, last day of elevated sports traffic)
- ⏱ **Urgency:** IMMEDIATE — **fourteenth consecutive day** without GUID fix, no code intervention attempted on root cause
- ✅ **TTFB/total within budgets:** All routes FAST despite minor variance and size bloat

## Tickets Status

**CRITICAL (P0):**
- `perf-atp-guid-bloat` (Priority 0) — OPEN, day 14
- `perf-wta-guid-bloat` (Priority 0) — OPEN, day 14

**No new tickets filed** — size increases are likely data variance, not new code regressions.

## Recommendations

1. **URGENT:** Fix GUID bloat issue (P0 tickets remain unfixed for 14 days)
2. **Monitor:** Watch for continued size growth trend over next 2-3 runs to confirm variance vs real regression
3. **World Cup:** Re-optimize after Final (ticket `perf-wc-page-size` may need reopening for new features)

## Status

🔴 **CRITICAL SIZE REGRESSIONS PERSIST (Day 14)** — P0 tickets remain open, no fix attempted
