# Performance Report — 2026-08-10

**Agent:** perf-inspector  
**Method:** `npm run check:performance` (HTTP fetch, best of 2 runs)  
**Baseline:** docs/perf-baseline.md (last updated 2026-08-09)

---

## Measurements

| Route        | TTFB  | Total | Size  | vs 2026-08-09 | Status |
|--------------|-------|-------|-------|---------------|--------|
| /            | 0.13s | 0.15s | 30KB  | stable / +1KB | ✅ FAST |
| /atp-live    | 0.22s | 0.58s | 514KB | +57% / +123% / stable | ✅ FAST |
| /wta-live    | 0.15s | 0.29s | 267KB | +7% / +16% / -1KB | ✅ FAST |
| /world-cup   | 0.14s | 0.30s | 382KB | +8% / +30% / stable | ✅ FAST |

**Legend:**
- **TTFB** = Time to First Byte (server response start)
- **Total** = Full page load time (TTFB + network transfer)
- **Size** = Uncompressed HTML response size
- **vs 2026-08-09** = TTFB % change / Total % change / Size change

---

## Analysis

### Key Findings

**✅ All routes FAST** — Within TTFB (< 0.8s) and total (< 2.0s) budgets

**⚠️ ATP load time variance detected** — Total 0.26s → 0.58s (+123%, +32ms absolute), TTFB 0.14s → 0.22s (+57%, +8ms)

**🔴 ShareButton size regressions persist (Day 15)** — ATP 514KB (71% over 300KB budget), WTA 267KB (34% over 200KB budget)

**✅ Sizes stable** — Homepage +1KB (+3.4%), ATP stable (514KB), WTA -1KB (-0.4%), WC stable (382KB)

---

## Regression Detection

### ATP Live Load Time Variance

**Before (2026-08-09):** TTFB 0.14s, Total 0.26s  
**After (2026-08-10):** TTFB 0.22s (+57%), Total 0.58s (+123%)  
**Status:** ⚠️ Monitoring (likely transient)

**Why likely transient:**
1. **No code changes** — Zero commits to ATP/WTA pages since 2026-08-09
2. **Size stable** — 514KB unchanged (no payload bloat)
3. **Single route affected** — WTA/WC/Homepage stable or minor variance
4. **Historical pattern** — Matches 20+ prior load variances (all resolved within 1-2 days)
5. **Within budget** — TTFB 0.22s < 0.8s, total 0.58s < 2.0s

**Code changes since 2026-08-09:**
1. `f736c3c` — Autoresearch 2026-08-10 (tickets only)
2. `582aae5` — Reset orphaned tickets (tickets only)
3. `786b02a` — Cross-project-safe crontab monitor (unrelated to tennis)
4. `e9208e2` — Fix TDF status (TDF page only)
5. `e8fd06f` — Fix WC status (WC page only)
6. `0e3f435` — Dynamic featured events system (homepage only)

**No commits modified:**
- `src/app/**/atp*` or `src/app/**/wta*`
- `src/components/LiveRankingTable.tsx`
- `src/lib/*Feed.ts` or `src/lib/*Ranking.ts`

**Assessment:** Monitoring for 24h. If variance persists on 2026-08-11, investigate edge caching/ISR configuration.

---

### ShareButton Size Regressions (Day 15)

**ATP Live:** 514KB vs 300KB budget (71% over, unchanged)  
**WTA Live:** 267KB vs 200KB budget (34% over, -1KB data variance)

**Root cause:** commit 7469e43 (2026-07-26) — ShareButton component rendered on every player row

**Status:** 🔴 CRITICAL — Day 15 of size regressions  
**Tracked in:** `perf-share-button-bloat` (P1, OPEN)

**Impact:**
- 📱 **Mobile:** WTA 267KB = ~2.5s on slow 3G, ATP 514KB = ~4.8s
- 💰 **Revenue:** Blocks Phase 3 monetization (ads + betting affiliates)
- ⏱ **Urgency:** IMMEDIATE — two weeks without fix (planner down 15+ days)

---

## Core Web Vitals

⚠️ **Not measured** — Playwright/webapp-testing not available in agent environment

**Last measured (2026-08-05):** All routes GOOD
- Homepage: LCP 2.27s, FCP 0.85s, CLS 0.000
- ATP Live: LCP 0.61s, FCP 0.38s, CLS 0.000
- WTA Live: LCP 0.39s, FCP 0.39s, CLS 0.000
- World Cup: LCP 0.56s, FCP 0.56s, CLS 0.000

---

## Tickets Filed

**None** — ATP variance likely transient; existing P1 ticket tracks ShareButton regression.

**Existing ticket:**
- `perf-share-button-bloat` (P1, OPEN) — ATP/WTA size regressions from ShareButton feature

---

## Summary

**Status:** ✅ All routes FAST + ⚠️ ATP load time variance (monitoring) + 🔴 ShareButton regression persists (Day 15)

**Action:** Monitor ATP variance for 24h. If persists, investigate edge/ISR. ShareButton P1 awaiting planner restoration.

**Next run:** 2026-08-11
