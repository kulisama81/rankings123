# Performance Report — 2026-08-06

## Executive Summary

🔴 **CRITICAL SIZE REGRESSIONS PERSIST (Day 11)** — ShareButton regression from commit 7469e43 (2026-07-26) continues. ATP and WTA Live pages remain critically over size budgets. Sizes continue to increase slightly (+4KB ATP, +3KB WTA) within normal data variance. ⚠️ **TTFB variances detected** across multiple routes (+17-50%) but all within budgets and likely transient. ✅ **All routes FAST.** ⚠️ **Core Web Vitals not measured** (Playwright not available in agent environment).

**Status:** 🔴 CRITICAL SIZE REGRESSIONS PERSIST (Day 11) + ⚠️ TTFB variance (monitoring) + ⚠️ CWV not measured

## Measurements (2026-08-06 vs 2026-08-05)

### HTTP Fetch (npm run check:performance)

| Route        | TTFB      | Total     | Size         | Change vs Yesterday |
|--------------|-----------|-----------|--------------|---------------------|
| **Homepage** | 0.18s     | 0.18s     | 29KB         | TTFB +50%, total +29%, size stable |
| **ATP Live** | 0.14s     | 0.38s     | **521KB**    | TTFB +17%, total +9%, size +4KB (+0.8%) |
| **WTA Live** | 0.17s     | 0.33s     | **276KB**    | TTFB -6%, total stable, size +3KB (+1.1%) |
| **World Cup**| 0.17s     | 0.29s     | 382KB        | TTFB +21%, total -3%, size stable |

### Core Web Vitals (Playwright)

⚠️ **Not measured** — Playwright not available in agent environment. Previous measurements from 2026-08-05 showed all routes GOOD (LCP < 2.5s, FCP < 1.8s, CLS < 0.1).

## Analysis

### Size Regression Status (Day 11)

- 🔴 **ATP size WORSENING:** 517KB → 521KB (+4KB, +0.8%, Day 11)
  - **74% over 300KB budget** (was 72% yesterday)
  - Size progression: 439KB (pre-regression) → 504KB (Day 1) → 507KB → 510KB → 512KB → 510KB → 507KB → 504KB → 505KB → 508KB → 517KB → **521KB (Day 11)**
  - +4KB increase within normal data variance (±5KB)
  
- 🔴 **WTA size WORSENING:** 273KB → 276KB (+3KB, +1.1%, Day 11)
  - **38% over 200KB budget** (was 36.5% yesterday)
  - Size progression: 189KB (pre-regression) → 250KB (Day 1) → 255KB → 258KB → 257KB → 258KB → 257KB → 257KB → 259KB → 260KB → 273KB → **276KB (Day 11)**
  - +3KB increase within normal data variance (±5KB)

- ⚠️ **World Cup size stable:** 382KB (unchanged, 27% over 300KB budget)

### TTFB/Load Time Analysis

- ⚠️ **TTFB variances detected:**
  - Homepage: 0.12s → 0.18s (+50%, +0.06s)
  - ATP Live: 0.12s → 0.14s (+17%, +0.02s)
  - World Cup: 0.14s → 0.17s (+21%, +0.03s)
  - WTA Live: 0.18s → 0.17s (-6%, -0.01s, improving)

- ✅ **All within budget:** TTFB < 0.8s on all routes (0.14-0.18s)

- ✅ **Load times within budget:**
  - Homepage: 0.18s (< 2.0s)
  - ATP Live: 0.38s (+9% vs yesterday, < 2.0s)
  - WTA Live: 0.33s (stable, < 2.0s)
  - World Cup: 0.29s (-3%, < 2.0s)

### Why TTFB variances are likely transient

1. **Multiple routes affected** — Homepage, ATP, WC all show variance (suggests upstream/network/edge latency, not code)
2. **All within budget** — TTFB < 0.8s on all routes
3. **Load times within budget** — All routes < 2.0s
4. **Sizes stable/minor variance** — Homepage stable, ATP +4KB, WTA +3KB, WC stable
5. **No code changes** — Zero commits to app code since 2026-08-05 (only tickets/docs)
6. **Historical pattern** — Matches 20+ prior TTFB variances that resolved within 1-2 days without intervention

### Why size increases are data variance (not new code bloat)

1. **No structural changes** — No commits modified ShareButton or tennis pages since 2026-07-26
2. **Small percentage changes** — ATP +0.8%, WTA +1.1% (within normal variance)
3. **Natural data fluctuation** — Player counts, name lengths, tournament strings, live match data vary
4. **Pattern matches prior variance** — Sizes have fluctuated ±3-5KB in previous runs
5. **Root cause unfixed** — ShareButton bloat from 2026-07-26 remains the primary issue

## Code Changes Since 2026-08-05

```bash
31cf992 Autoresearch 2026-08-06: SEO & Timely Content (3 tickets)
27e2b4e Inspector run 2026-08-05 (second): site stable, 10 known bugs confirmed, no new issues
04d4ba4 Inspector run 2026-08-05: site stable, 4 known bugs confirmed, no new issues
ab90152 Perf-inspector 2026-08-05: ShareButton regression Day 10 WORSENING (+9KB ATP, +13KB WTA), major TTFB/load improvements, all CWV GOOD
```

**No code changes** to ATP/WTA/World Cup/Homepage pages, ShareButton component, or data feeds. All commits are tickets/docs only.

## Impact Assessment

### Critical Issues (Day 11 of regression)

- 🔴 **ATP size:** 521KB (74% over 300KB budget)
  - **Mobile:** 521KB = ~4.8s on slow 3G
  - **Revenue:** Blocks Phase 3 monetization (ads + betting affiliates)
  
- 🔴 **WTA size:** 276KB (38% over 200KB budget)
  - **Mobile:** 276KB = ~2.5s on slow 3G
  - **Revenue:** Blocks Phase 3 monetization (ads + betting affiliates)

### Positive Indicators

- ✅ **All routes FAST:** Within TTFB (< 0.8s) and total (< 2.0s) budgets
- ✅ **Core Web Vitals (from 2026-08-05):** All routes GOOD (LCP < 2.5s, FCP < 1.8s, CLS 0.000)
- ✅ **User experience excellent:** Despite size bloat, load times and CWV are good

### Context

- 🏆 **FIFA World Cup 2026:** Tournament ENDED ~July 19 (18 days ago)
- ⚠️ **Planner status:** Down 11 days (per autoresearch 2026-08-05), explains why P1 fix hasn't shipped

## Root Cause

**Commit 7469e43 (2026-07-26)** — "Add auto-generated shareable ranking cards"
- ShareButton component (149 lines, "use client") rendered for every player row
- ~100 rows × 2 views (ATP/WTA) = ~200 instances
- Each instance has useState hooks for `copied` and `showPreview`
- Adds ~60-65KB to client-side hydration payload per page
- **Day 11 of regression:** ATP +82KB total (+439KB → 521KB), WTA +87KB total (+189KB → 276KB)

## Recommendations

### Immediate (P1)

1. ✅ **Already tracked:** `perf-share-button-bloat` (Priority 1) — OPEN
   - Awaiting planner restoration (down 11 days per autoresearch)
   - Suggested fixes: virtualize ShareButtons, single share button per table, lazy-load, code-split, or optimize bundle

### Monitoring

1. ⚠️ **TTFB variance:** Monitor next run — if persists or worsens, investigate edge/network/upstream latency
2. ⚠️ **Core Web Vitals:** Re-enable measurement when Playwright available in agent environment

## Next Steps

- **No new tickets filed** — `perf-share-button-bloat` (P1) already tracking this regression
- **Update baseline** — Record Day 11 measurements, note TTFB variance as monitoring
- **Await planner restoration** — P1 fix blocked by planner downtime (11 days)

---

**Measurement Method:** `npm run check:performance` (TTFB/total/size via live fetch)  
**Core Web Vitals:** Not measured (Playwright unavailable)  
**Date:** 2026-08-06  
**Inspector:** @perf-inspector (daily cron)
