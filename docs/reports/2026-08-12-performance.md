# Performance Report — 2026-08-12

**Run Date:** 2026-08-12  
**Baseline:** docs/perf-baseline.md  
**Method:** `npm run check:performance` (HTTP fetch via live rankings123.com)  
**Core Web Vitals:** Not measured (Playwright not available in agent environment)

---

## Summary

⚠️ **ATP size "improvement" is MISLEADING** — ATP Live dropped from 514KB to 258KB (-50%) BUT this is due to **mock fallback data** (100 players instead of 500-1000 from UTS deep ranking), NOT a performance fix. The **ShareButton regression PERSISTS** (Day 17) — when UTS feed is restored, expect ATP to return to ~514KB unless ShareButton is fixed. 🚀 **Major load time improvements** across all routes. ⚠️ **Homepage TTFB variance** +73% but within budget. **WTA size regression persists** (Day 17). **No new tickets filed** (existing `perf-share-button-bloat` P1 tracks root issue).

---

## Measurements

### HTTP Fetch (npm run check:performance)

| Route        | TTFB  | Total | Size  | vs 2026-08-11 | Status      |
|--------------|-------|-------|-------|---------------|-------------|
| /            | 0.26s | 0.28s | 31KB  | +73% / +65% / 0KB | ✅ FAST |
| /atp-live    | 0.24s | 0.33s | 258KB | +20% / -43% / -256KB | ✅ FAST (⚠️ MOCK DATA) |
| /wta-live    | 0.18s | 0.35s | 266KB | -42% / -15% / 0KB | ✅ FAST (🔴 SIZE FAIL) |
| /world-cup   | 0.26s | 0.35s | 385KB | +24% / -22% / +3KB | ✅ FAST (⚠️ SIZE) |

**Legend:**
- TTFB = Time to First Byte (server response start)
- Total = Full page load time (TTFB + network transfer)
- Size = Uncompressed response size
- ✅ FAST = Within TTFB (< 0.8s) and total (< 2.0s) budgets
- ⚠️ MOCK DATA = Showing fallback data (degraded mode), not live data
- 🔴 SIZE FAIL = Critically over size budget (persistent regression)
- ⚠️ SIZE = Over size budget

### Core Web Vitals (Playwright)

⚠️ **Not measured** — Playwright not available in agent environment  
**Last measured 2026-08-05:** All routes GOOD (LCP < 2.5s, FCP < 1.8s, CLS 0.000)

---

## Analysis

### ATP Live: Misleading Size "Improvement"

⚠️ **ATP Live size dropped 50% (514KB → 258KB) BUT this is due to degraded data, NOT a performance fix:**

**Root cause of size reduction:**
- **Before (2026-08-11):** UTS deep ranking feed (500-1000 players) = 514KB
- **Now (2026-08-12):** Mock fallback data (100 players) = 258KB
- **Reason:** Commit `56fab71` "Fix ATP Live pagination: expand mock fallback to 100 players"

**Why this is NOT a fix:**
1. **UTS deep ranking feed is currently unavailable** (degraded mode)
2. ATP Live is showing MOCK data (100 players) instead of live data (500-1000 players)
3. ShareButton regression (commit 7469e43, 2026-07-26) **STILL PRESENT in code**
4. When UTS feed is restored, ATP will likely return to ~500-514KB (500-1000 players + ShareButton bloat)

**Why the mock was expanded:**
- Original bug: ATP showed only 40 players (no pagination)
- Fix: Expanded mock to 100 players so pagination renders (requires >50 players)
- Purpose: Ensure pagination works even in degraded mode
- Ticket closed: `bug-atp-pagination-missing-deep-ranking`

**Impact:**
- ✅ **Load time genuinely improved:** 0.58s → 0.33s (-43%, excellent)
- ⚠️ **Size improvement is temporary:** Will revert when UTS is restored
- 🔴 **ShareButton bloat persists:** Would add ~200KB+ to both mock (100) and live (500-1000) data
- 📱 **Current mobile:** 258KB = ~2.4s on slow 3G (good in degraded mode)
- 📱 **When UTS restored:** Expected ~514KB = ~4.8s on slow 3G (unless ShareButton fixed)

**Recommendation:** Do NOT update baseline to 258KB. This is degraded-mode performance, not the target. The real fix requires:
1. Restore UTS deep ranking feed, AND
2. Fix ShareButton bloat (ticket `perf-share-button-bloat`)

---

### WTA Size Regression (Day 17)

🔴 **WTA Live:** 266KB vs 200KB budget (**33% over**, Day 17, stable)
- Root cause: commit 7469e43 (2026-07-26) — ShareButton on every row
- Tracked in: `perf-share-button-bloat` (Priority 1, OPEN, awaiting planner)
- Impact: 📱 Mobile ~2.5s on slow 3G, 💰 blocks Phase 3 monetization
- **No change today:** Size 266KB (stable)

---

### World Cup

⚠️ **World Cup:** 385KB vs 300KB budget (28% over, +3KB data variance)
- FIFA World Cup 2026 ENDED ~July 19 (24 days ago)
- Size stable: 382KB → 385KB (+3KB, within measurement variance)
- ✅ Load time improved: 0.45s → 0.35s (-22%, excellent)
- ✅ Core Web Vitals (from 2026-08-05): LCP 0.56s (GOOD), FCP 0.56s (GOOD), CLS 0.000

**Code change:** Commit `6e18f97` "Fix World Cup page showing Live status when tournament complete"
- Enhanced tournament completion detection
- Layout/logic changes (not data size changes)
- +3KB likely measurement variance

---

### Load Time Improvements

🚀 **Major load time improvements across all routes:**

**ATP Live:**
- Total: 0.58s → 0.33s (-43%, **major improvement**)
- TTFB: 0.20s → 0.24s (+20%, minor variance)
- **Cause:** Smaller payload (258KB vs 514KB) due to mock data (100 vs 500-1000 players)

**WTA Live:**
- Total: 0.41s → 0.35s (-15%, **improvement**)
- TTFB: 0.31s → 0.18s (-42%, **major improvement**)
- **Cause:** Yesterday's +107% TTFB variance fully resolved (transient network/edge latency)

**World Cup:**
- Total: 0.45s → 0.35s (-22%, **major improvement**)
- TTFB: 0.21s → 0.26s (+24%, minor variance)
- **Cause:** Yesterday's +50% TTFB variance mostly resolved

**Pattern:** Yesterday's load time variances (WTA +107% TTFB, WC +50%) have resolved, confirming they were transient network/edge/CDN latency (not code issues).

---

### Homepage TTFB Variance

⚠️ **Homepage variance detected:**
- TTFB: 0.15s → 0.26s (+73%, +110ms)
- Total: 0.17s → 0.28s (+65%, +110ms)
- Size: 31KB (stable)
- ✅ **Still within budget:** TTFB 0.26s < 0.8s, total 0.28s < 2.0s

**Why variance is likely transient:**
1. **Within budget** — TTFB 0.26s < 0.8s, total 0.28s < 2.0s
2. **Size stable** — 31KB unchanged (no payload bloat)
3. **No code changes** to homepage since 2026-08-11 (only ATP/WC bug fixes)
4. **Historical pattern** — Matches 20+ prior TTFB variances that resolved within 1-2 days
5. **Other routes improving** — ATP -43%, WTA -15%, WC -22% suggest homepage variance is isolated

**Monitoring:** Re-measure in 24h. If persists, investigate edge/CDN/upstream latency.

---

## Code Changes Since 2026-08-11

1. `6e18f97` — Fix World Cup page showing Live status when tournament complete
   - Enhanced tournament completion detection (dual detection + champion inference)
   - Changes: `src/app/world-cup/page.tsx` (logic/layout), `src/data/changelog.ts`
   - Size impact: WC +3KB (measurement variance, not bloat)

2. `56fab71` — Fix ATP Live pagination: expand mock fallback to 100 players
   - Expanded mock from 40 to 100 players (ensures pagination renders in degraded mode)
   - Changes: `src/data/atpLive.ts`, `tests/atp-deep-ranking.test.js`, `src/data/changelog.ts`
   - Size impact: ATP -256KB (mock 100 players vs UTS 500-1000 players)
   - **IMPORTANT:** This is degraded-mode data, not a permanent fix

3. Tickets/docs: `400bbd2`, `af78455`, `1f10a8f` — No impact on measured routes

**No code changes** to WTA Live pages or ShareButton component.

---

## Impact

- 🚀 **Major load time improvements** — ATP -43%, WTA -15%, WC -22% (excellent user experience)
- ✅ **All routes FAST** — Within TTFB (< 0.8s) and total (< 2.0s) budgets
- ⚠️ **ATP size "improvement" is misleading** — Due to mock data (100 players), not live UTS data (500-1000)
- 🔴 **ShareButton regression PERSISTS (Day 17)** — Both ATP and WTA remain bloated when live data is restored
- ⚠️ **Homepage TTFB variance** — Monitoring for 24h (likely transient)
- ✅ **Core Web Vitals (from 2026-08-05):** All routes GOOD — excellent user-perceived performance
- 💰 **Revenue:** WTA bloat still blocks Phase 3 monetization (ads + betting affiliates)
- 🏆 **FIFA World Cup 2026:** Tournament ENDED ~July 19 (24 days ago)

---

## Tickets

**Existing:**
- `perf-share-button-bloat` (Priority 1) — OPEN (awaiting planner restoration, planner down 17+ days)
  - Tracks ShareButton regression (commit 7469e43)
  - Affects both ATP and WTA Live pages
  - Expected impact: ~200KB+ bloat per page

**New:** None filed

**Reasoning:** The ATP size reduction is due to degraded data (mock fallback), not a performance fix. The root cause (ShareButton bloat) persists and is already tracked in `perf-share-button-bloat`. When UTS feed is restored, ATP will likely return to ~514KB unless ShareButton is fixed.

---

## Recommendations

1. **ATP data restoration:** Investigate why UTS deep ranking feed is unavailable. Restore live data (500-1000 players) to fix the data regression.

2. **ShareButton bloat (Day 17):** Size regressions persist for both ATP (when UTS restored) and WTA. Fix requires planner restoration or manual intervention.

3. **Monitor homepage TTFB variance:** Re-measure in 24h. If persists, investigate edge/CDN/upstream latency.

4. **Do NOT rebaseline ATP to 258KB:** This is degraded-mode performance. When UTS is restored, expect ~514KB (500-1000 players + ShareButton bloat) unless ShareButton is fixed.

5. **Core Web Vitals:** Re-measure with Playwright when available (last measured 2026-08-05, all GOOD).

---

**Status:** ⚠️ ATP "improvement" misleading (mock data) + 🔴 CRITICAL SIZE REGRESSIONS PERSIST (Day 17, WTA + ATP when restored) + 🚀 Major load improvements + ⚠️ Homepage TTFB variance (monitoring) + ⚠️ CWV not measured
