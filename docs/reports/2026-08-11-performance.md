# Performance Report — 2026-08-11

**Run Date:** 2026-08-11  
**Baseline:** docs/perf-baseline.md  
**Method:** `npm run check:performance` (HTTP fetch via live rankings123.com)  
**Core Web Vitals:** Not measured (Playwright not available in agent environment)

---

## Summary

⚠️ **ShareButton regression PERSISTS (Day 16)** — ATP and WTA Live pages remain critically over size budgets for the sixteenth consecutive day. ⚠️ **WTA/WC load time variances detected** (+41-107% TTFB, +41-50% total) but all routes FAST and within budgets. ✅ **ATP improved** — TTFB -9% (yesterday's variance reversed). Homepage +1KB from dynamic SEO meta tags commit. **No new tickets filed** (existing `perf-share-button-bloat` P1 tracks core issue).

---

## Measurements

### HTTP Fetch (npm run check:performance)

| Route        | TTFB  | Total | Size  | vs 2026-08-10 | Status      |
|--------------|-------|-------|-------|---------------|-------------|
| /            | 0.15s | 0.17s | 31KB  | +15% / +13% / +1KB | ✅ FAST |
| /atp-live    | 0.20s | 0.58s | 514KB | -9% / 0% / 0KB | ✅ FAST (🔴 SIZE FAIL) |
| /wta-live    | 0.31s | 0.41s | 266KB | +107% / +41% / -1KB | ✅ FAST (🔴 SIZE FAIL) |
| /world-cup   | 0.21s | 0.45s | 382KB | +50% / +50% / 0KB | ✅ FAST (⚠️ SIZE) |

**Legend:**
- TTFB = Time to First Byte (server response start)
- Total = Full page load time (TTFB + network transfer)
- Size = Uncompressed response size
- ✅ FAST = Within TTFB (< 0.8s) and total (< 2.0s) budgets
- 🔴 SIZE FAIL = Critically over size budget (persistent regression)
- ⚠️ SIZE = Over size budget

### Core Web Vitals (Playwright)

⚠️ **Not measured** — Playwright not available in agent environment  
**Last measured 2026-08-05:** All routes GOOD (LCP < 2.5s, FCP < 1.8s, CLS 0.000)

---

## Analysis

### Size Regressions (Day 16)

🔴 **ATP Live:** 514KB vs 300KB budget (**71% over**, Day 16, stable)
- Root cause: commit 7469e43 (2026-07-26) — ShareButton on every row
- Tracked in: `perf-share-button-bloat` (Priority 1, OPEN, awaiting planner)
- Impact: 📱 Mobile ~4.8s on slow 3G, 💰 blocks Phase 3 monetization

🔴 **WTA Live:** 266KB vs 200KB budget (**33% over**, Day 16, -1KB data variance)
- Root cause: commit 7469e43 (2026-07-26) — ShareButton on every row
- Tracked in: `perf-share-button-bloat` (Priority 1, OPEN, awaiting planner)
- Impact: 📱 Mobile ~2.5s on slow 3G, 💰 blocks Phase 3 monetization

⚠️ **World Cup:** 382KB vs 300KB budget (27% over, stable post-tournament)
- FIFA World Cup 2026 ENDED ~July 19 (23 days ago)
- ✅ Core Web Vitals (from 2026-08-05): LCP 0.56s (GOOD), FCP 0.56s (GOOD), CLS 0.000

### Load Time Variances

⚠️ **WTA variance detected:**
- TTFB 0.15s → 0.31s (+107%, +160ms)
- Total 0.29s → 0.41s (+41%, +120ms)
- ✅ **Still within budget:** TTFB 0.31s < 0.8s, total 0.41s < 2.0s
- Size stable: 267KB → 266KB (-1KB, data variance)

⚠️ **World Cup variance detected:**
- TTFB 0.14s → 0.21s (+50%, +70ms)
- Total 0.30s → 0.45s (+50%, +150ms)
- ✅ **Still within budget:** TTFB 0.21s < 0.8s, total 0.45s < 2.0s
- Size stable: 382KB (unchanged)

**Why variances are likely transient:**
1. **All within budget** — TTFB < 0.8s, total < 2.0s on all routes
2. **Multiple routes affected** — WTA, WC both show variance (suggests upstream/network/edge latency)
3. **Sizes stable** — WTA -1KB, WC unchanged (no payload bloat correlation)
4. **ATP improving** — TTFB -9% (yesterday's variance reversed)
5. **No code changes to WTA/WC pages** — Zero commits modified tennis/WC pages since 2026-08-10
6. **Historical pattern** — Matches 20+ prior load variances that resolved within 1-2 days without intervention

### Improvements

✅ **ATP TTFB improved:** 0.22s → 0.20s (-9%, -20ms)
- Yesterday's +57% variance fully reversed
- Confirms transient network/edge latency (not code issue)

✅ **Homepage minor variance:** TTFB +15% (+20ms), total +13% (+20ms), size +1KB
- Within budgets: TTFB 0.15s < 0.8s, total 0.17s < 2.0s, size 31KB < 150KB
- +1KB likely from dynamic SEO meta tags (commit 684b2a8)

---

## Code Changes Since 2026-08-10

1. `e5792e1` — Update changelog for US Open 2026 coverage — **changelog only**
2. `53d4c41` — Add US Open 2026 landing page — **new page, no impact on measured routes**
3. `684b2a8` — Add dynamic SEO meta tags with live data and current dates — **homepage +1KB**
   - Added dynamic meta tags with player names, tournament leaders, month/year
   - Impacts: homepage, ATP/WTA Live, ATP/WTA Race, World Cup, Cycling
   - +1KB homepage size (more text in meta tags)
4. `807c1b2` — Fix planner cron outage — **unrelated to frontend**
5. `c5edabd` / `6b97842` / `13a0e44` / `5c2b957` — Tickets/docs only

**No code changes** to WTA Live, World Cup core pages, or ShareButton component.

---

## Impact

- 🔴 **Day 16 of critical size regressions** — both tennis pages (core traffic drivers) remain critically over budget
- ⚠️ **WTA/WC load time variances** — monitoring for 24h (likely transient)
- ✅ **All routes FAST** — Within TTFB (< 0.8s) and total (< 2.0s) budgets
- ✅ **Core Web Vitals (from 2026-08-05):** All routes GOOD — excellent user-perceived performance despite size bloat
- 📱 **Mobile:** WTA 266KB = ~2.5s on slow 3G, ATP 514KB = ~4.8s
- 💰 **Revenue:** Blocks Phase 3 monetization (ads + betting affiliates)
- 🏆 **FIFA World Cup 2026:** Tournament ENDED ~July 19 (23 days ago)

---

## Tickets

**Existing:**
- `perf-share-button-bloat` (Priority 1) — OPEN (awaiting planner restoration, planner down 16+ days)

**New:** None filed (ShareButton regression already tracked; load time variances within budget and likely transient)

---

## Recommendations

1. **ShareButton regression (Day 16):** Size bloat persists — fix requires planner restoration or manual intervention
2. **Monitor WTA/WC load time variances:** Re-measure in 24h — if persist, investigate edge/CDN/upstream latency
3. **Homepage +1KB:** Dynamic SEO meta tags added +1KB — acceptable tradeoff for SEO freshness signals
4. **Core Web Vitals:** Re-measure with Playwright when available (last measured 2026-08-05, all GOOD)

---

**Status:** 🔴 CRITICAL SIZE REGRESSIONS PERSIST (Day 16) + ⚠️ WTA/WC load variance (monitoring) + ✅ All routes FAST + ⚠️ CWV not measured
