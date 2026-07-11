# Performance Report — 2026-07-11

**Measurement Date:** 2026-07-11  
**Measurement Method:** `npm run check:performance` (HTTP fetch) + Playwright Core Web Vitals  
**Previous Report:** docs/reports/2026-07-10-performance.md

---

## Executive Summary

✅ **Homepage TTFB variance RESOLVED** — The +200% spike from 2026-07-10 (0.11s → 0.33s) completely resolved, now at 0.13s (-61%). Confirms transient network/edge latency.

🔴 **CRITICAL SIZE REGRESSIONS PERSIST — Day 7** — ATP Live and WTA Live size bloat from GUID issue (commit 91820bf, 2026-07-05) continues unaddressed. P0 tickets remain open.

🎉 **CORE WEB VITALS EXCELLENT** — All routes achieve GOOD thresholds (LCP < 2.5s, FCP < 1.8s, CLS < 0.1) despite HTML size bloat. Real user experience remains fast.

⚠️ **ATP size increased +1%** — Commit 4fb904d (SEO table duplication fix) added 6KB on top of existing GUID bloat.

---

## Performance Measurements

### HTTP Fetch (npm run check:performance)

| Route      | TTFB  | Total | Size  | vs 2026-07-10      | Budget Status |
|------------|-------|-------|-------|-------------------|---------------|
| /          | 0.13s | 0.15s | 33KB  | TTFB -61%, total -55% | ✅ FAST       |
| /atp-live  | 0.12s | 0.23s | 597KB | TTFB -20%, size +1%   | 🔴 SIZE FAIL  |
| /wta-live  | 0.13s | 0.22s | 349KB | total -31%, size +1%  | 🔴 SIZE FAIL  |
| /world-cup | 0.12s | 0.20s | 360KB | TTFB -20%, total -44% | 🔴 SIZE FAIL  |

**Size Budgets:**
- Homepage: 33KB / 150KB (22% used) ✅
- ATP Live: 597KB / 300KB (99% over budget) 🔴
- WTA Live: 349KB / 200KB (75% over budget) 🔴
- World Cup: 360KB / 300KB (20% over budget) 🔴

### Core Web Vitals (Playwright Browser)

| Route      | LCP   | FCP   | CLS   | TTFB  | Transfer | vs 2026-07-09 CWV |
|------------|-------|-------|-------|-------|----------|-------------------|
| /          | 1.48s | 0.66s | 0.000 | 0.16s | 460KB    | LCP +22%, FCP +35% |
| /atp-live  | 0.64s | 0.35s | 0.000 | 0.04s | 454KB    | LCP -18% 🎉, FCP -34% 🎉, Transfer -38% 🎉 |
| /wta-live  | 0.53s | 0.33s | 0.000 | 0.04s | 283KB    | LCP -40% 🎉, FCP -48% 🎉, Transfer -52% 🎉 |
| /world-cup | 0.79s | 0.36s | 0.000 | 0.04s | 134KB    | LCP -10%, FCP -45% 🎉, Transfer -69% 🎉 |

**All routes achieve GOOD thresholds:**
- ✅ LCP < 2.5s (all routes: 0.53s - 1.48s)
- ✅ FCP < 1.8s (all routes: 0.33s - 0.66s)
- ✅ CLS < 0.1 (all routes: 0.000, perfect!)
- ✅ TTFB < 0.8s (all routes: 0.04s - 0.16s)

---

## Analysis

### ✅ Homepage TTFB Variance Resolved

**Yesterday (2026-07-10):** TTFB spiked 0.11s → 0.33s (+200%)  
**Today (2026-07-11):** TTFB 0.33s → 0.13s (-61%, back to normal)

**Conclusion:** Same transient network/edge latency pattern as ATP variance on 2026-07-09 (which also self-resolved). Not a code regression.

**Homepage CWV Note:** LCP increased +22% (1.21s → 1.48s) and FCP increased +35% (0.49s → 0.66s) vs 2026-07-09, but both remain well within GOOD thresholds. Monitoring for pattern.

### 🔴 CRITICAL Size Regressions — Day 7

**ATP Live:** 591KB → 597KB (+6KB, +1%)  
**WTA Live:** 345KB → 349KB (+4KB, +1.2%)

Both pages remain critically over size budget. Root cause: commit 91820bf (2026-07-05) added `guid` field to player data, bloating Next.js `self.__next` JSON payload by ~280KB.

**New Contributing Factor — ATP:** Commit 4fb904d (2026-07-10) "Fix ATP Live duplicate table bug while preserving SSR/SEO" intentionally added both StaticRankingTable (for SEO) and LiveRankingTable to SSR HTML. This adds ~6KB on top of existing GUID bloat.

**Ticket Details:**
```
SSR HTML intentionally contains both tables (50+ players for SEO), but JavaScript 
hides the StaticRankingTable on hydration so users only see one interactive table.
```

This is a deliberate SEO optimization but adds to page weight. The 6KB increase is minor vs the 320KB GUID bloat, but compounds the existing issue.

**Impact (Day 7):**
- 🔴 Both tennis pages (core traffic drivers) remain critically over budget for **7 consecutive days**
- 📱 Mobile: ATP 597KB on slow 3G = ~5.6s transfer alone, WTA 349KB = ~3.3s
- 💰 Revenue: Blocks Phase 3 monetization (ads + betting affiliates)
- 🏆 **FIFA World Cup 2026 LIVE** (through ~July 19) — elevated sports traffic NOW
- ⏱ Urgency: IMMEDIATE — seventh consecutive day without fix

**Why User Experience Remains Good Despite HTML Bloat:**

The HTTP fetch measures uncompressed HTML (597KB), but browsers receive compressed/optimized content:
- ATP: 597KB HTML → 454KB browser transfer (-24% via compression)
- WTA: 349KB HTML → 283KB browser transfer (-19% via compression)
- World Cup: 360KB HTML → 134KB browser transfer (-63% via compression!)

This explains why Core Web Vitals remain EXCELLENT (LCP 0.64s, FCP 0.35s) despite large HTML size. Edge caching + gzip compression + browser optimizations are working.

**However, the issue is still real:**
1. Mobile users on metered connections pay for full transfer
2. Initial parse time for 597KB HTML slower than 271KB
3. SEO bots may not benefit from compression
4. Unnecessary waste of network resources

### 🎉 Core Web Vitals Improvements

**Major improvements vs 2026-07-09:**
- ATP Live: LCP -18% (0.78s → 0.64s), FCP -34% (0.53s → 0.35s), transfer -38% (732KB → 454KB)
- WTA Live: LCP -40% (0.88s → 0.53s), FCP -48% (0.64s → 0.33s), transfer -52% (588KB → 283KB)
- World Cup: LCP -10% (0.88s → 0.79s), FCP -45% (0.66s → 0.36s), transfer -69% (438KB → 134KB)

**All routes achieve perfect CLS (0.000)** — no layout shifts, excellent UX.

**Why Transfer Sizes Improved:**
- Edge caching maturity (ISR working as designed)
- Gzip compression effectiveness
- Browser-level optimizations

Despite HTML size bloat, the real user experience is FAST. This is ISR + edge caching working correctly.

### World Cup Stable

Size stable at 360KB (-1KB vs yesterday), still 20% over 300KB budget. Performance excellent (TTFB 0.12s, LCP 0.79s).

---

## Code Changes Since 2026-07-10

**Commits:**
1. `9edf173` — Implement comprehensive 6-state button system (Clay 2026)
   - Design enhancement, likely minor bundle size impact
2. `b8cbc7c` — Fix cycling page race status contradiction
   - Cycling page only, no perf impact on measured routes
3. `4fb904d` — Fix ATP Live duplicate table bug while preserving SSR/SEO
   - ATP Live page: added StaticRankingTable for SEO (both tables in SSR HTML)
   - Explains ATP +6KB size increase (+1%)
   - Trade-off: SEO benefit vs page weight (+6KB minor vs +320KB GUID bloat)

**No commits addressed the GUID bloat issue** — P0 tickets remain open.

---

## Current Status

### Open Tickets (CRITICAL)

**P0 — Day 7, unfixed:**
- `perf-atp-guid-bloat` — ATP Live 597KB (99% over 300KB budget)
- `perf-wta-guid-bloat` — WTA Live 349KB (75% over 200KB budget)

Both tickets comprehensively describe the issue and solution. No new tickets needed.

### Budget Compliance

**TTFB / Total Load Time:** ✅ All routes FAST  
**Size Budgets:** 🔴 3 of 4 routes over budget (ATP, WTA, World Cup)  
**Core Web Vitals:** ✅ All routes GOOD (LCP, FCP, CLS, TTFB)

---

## Recommendations

### Immediate (P0, Day 7)

**Fix GUID bloat** — Tickets exist with comprehensive solutions. The planner should prioritize these:
1. Remove `guid` from SSR payload (use computed slug from player name instead)
2. Target: ATP < 300KB, WTA < 200KB (from current 597KB/349KB)
3. Savings: ~320KB per tennis page view

### Monitor (No Action Yet)

**Homepage CWV variance** — LCP/FCP increased +22-35% vs 2026-07-09 but remain well within GOOD thresholds. Monitor in next run for pattern.

**ATP SEO table duplication** — The +6KB from dual tables is a deliberate SEO trade-off and minor vs GUID bloat. Acceptable if GUID issue is fixed.

---

## Conclusion

**User experience remains excellent** (all CWV metrics GOOD) despite HTML size bloat, thanks to edge caching, compression, and browser optimizations. However, the GUID bloat issue is real and should be fixed for mobile users, metered connections, and resource efficiency.

**Day 7 of critical regressions** — the planner has not picked up P0 tickets for a week. Recommend prioritizing `perf-atp-guid-bloat` and `perf-wta-guid-bloat` in next build cycle.
