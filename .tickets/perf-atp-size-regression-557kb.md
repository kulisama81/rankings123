---
id: perf-atp-size-regression-557kb
title: "ATP Live: Critical size regression 273KB → 557KB (+104%, data-driven)"
status: open
priority: 0
tags:
  - perf
  - performance
  - atp
parent: rankings123
created: 2026-08-18
updated: 2026-08-18
---

## Problem

ATP Live page size jumped from 273KB (within 300KB budget, maintained for 5 days) to 557KB in one day (+284KB, +104%), now **86% OVER BUDGET**. This is a **NEW regression** separate from the previously-resolved ShareButton bloat (commit a45a884, 2026-08-14).

**Measurements (2026-08-18):**
- ATP Live: 557KB vs 300KB budget (**+86% over**)
- Baseline (2026-08-17): 273KB (9% under budget, Day 22 of maintaining budget)
- Regression: +284KB (+104% increase)

## Root Cause (Preliminary)

**DATA-DRIVEN, NOT CODE-DRIVEN** — Zero code changes to ATP Live page, ShareButton, or data feeds since 2026-08-17.

**Code changes in period:**
- Three new article pages (`/articles/jannik-sinner-ranking-2026`, etc.) — separate routes
- New `playerData.ts` library — NOT imported by ATP Live
- Changelog/sitemap updates only

**Likely data source changes:**
1. **UTS deep ranking feed** now returning more players (closer to DEEP_N = 1000 limit)
   - Historical: ~500-700 players
   - Possibly now: ~900-1000 players
   - src/lib/atpDeepRanking.ts line 18: `const DEEP_N = 1000;`
2. **ESPN scoreboard** returning more tournament data (more active tournaments, longer names, more matches)
3. **Natural data bloat** — Player names, tournament strings, match statuses accumulating

**Historical context:**
- 2026-07-26 (pre-ShareButton): 439KB
- 2026-08-06 (ShareButton peak): 521KB
- 2026-08-14 (optimized): 272KB ✅ **BUDGET ACHIEVED**
- 2026-08-15-17 (Days 20-22): 272-273KB ✅ **BUDGET MAINTAINED**
- 2026-08-18 (Day 23): **557KB** 🔴 **WORSE THAN ORIGINAL REGRESSION**

## Impact

- 📱 **Mobile UX degraded**: 557KB = ~5.2s on slow 3G (was ~2.5s at 273KB, now **+108% slower**)
- 💰 **Revenue**: Blocks Phase 3 monetization (betting affiliates have strict page weight requirements)
- 🎯 **US Open 2026**: Starts Aug 27 (**9 days away**) — critical timing for peak tennis traffic
- 🔴 **User trust**: Page weight directly impacts bounce rate, engagement, and ad viewability

## Investigation Steps

1. **Measure data size** — Check actual player count and data payload:
   ```bash
   curl -s https://rankings123.com/api/atp-live-data | \
     python3 -c "import sys, json; d=json.load(sys.stdin); \
     print(f'Players: {len(d[\"players\"])}, Size: {len(json.dumps(d))} bytes')"
   ```

2. **Check UTS feed** — Inspect actual UTS response size and player count:
   ```bash
   curl -s 'https://www.ultimatetennisstatistics.com/rankingsTableTable?current=1&rowCount=1000&rankType=RANK&searchPhrase=&season=&date=' | \
     python3 -c "import sys, json; d=json.load(sys.stdin); print(f'UTS players: {len(d.get(\"rows\", []))}')"
   ```

3. **Compare historical data** — Check if player count increased from ~500-700 to ~900-1000

4. **Inspect HTML payload** — Measure rendered table size vs data size to isolate bloat source

## Solution Options (Pick Best ROI)

### Option 1: Reduce player count (QUICK WIN)
- Reduce DEEP_N from 1000 to 500 in `src/lib/atpDeepRanking.ts`
- **Why**: Most users don't scroll past top 100-200 players
- **Trade-off**: Lose deep ranking visibility (but can add "View More" pagination)
- **Impact**: Estimated -50% size reduction if player count is the bloat source
- **Risk**: Low — can revert if user complaints

### Option 2: Virtualization (BEST UX, more effort)
- Implement react-window or react-virtual for player table
- Only render visible rows (viewport ~10-20 rows at a time)
- **Why**: Keeps full 1000 players available without bloating initial payload
- **Impact**: ~90% size reduction (render 20 rows vs 1000)
- **Risk**: Medium — requires refactor of LiveRankingTable.tsx

### Option 3: Pagination (SIMPLE, good fallback)
- Show top 100 by default, add "Load More" button or pagination
- **Why**: Most users only care about top 100
- **Impact**: ~80% size reduction if showing 100 vs 1000 players
- **Risk**: Low — familiar UX pattern

### Option 4: Code splitting + lazy loading (MEDIUM effort)
- Lazy-load below-the-fold players (rank 101+)
- Use `next/dynamic` or Intersection Observer
- **Why**: Fast initial load, full data available on scroll
- **Impact**: ~70-80% initial size reduction
- **Risk**: Medium — requires scroll detection logic

### Option 5: Data compression (TEMPORARY fix)
- Enable gzip/brotli compression on API routes (if not already)
- **Why**: Quick win while investigating root cause
- **Impact**: ~60-70% size reduction (text compresses well)
- **Risk**: Low — standard practice, but doesn't solve root bloat

## Recommended Approach (Hybrid)

1. **IMMEDIATE (< 1 hour)**: Reduce DEEP_N to 500 (Option 1) as emergency fix
   - Gets ATP back under budget quickly
   - Measure impact, if insufficient try Option 3 (pagination to top 100)

2. **SHORT-TERM (< 1 day)**: Add pagination showing top 100 by default (Option 3)
   - Better UX than hard cap at 500
   - "View More" or "Show All Rankings" button for deep ranking nerds

3. **LONG-TERM (< 1 week)**: Implement virtualization (Option 2)
   - Best UX — fast load + full data available
   - Prevents future regressions
   - Apply to WTA too (WTA also over budget)

## Performance Budget

- **Target**: < 300KB (currently 557KB, need **-257KB** / **-46% reduction**)
- **Baseline**: 273KB (2026-08-17, maintained for 5 days)
- **Acceptable**: < 350KB (temporary, if immediate fix insufficient)

## Acceptance Criteria

- [ ] ATP Live page size < 300KB (currently 557KB, need -46% reduction)
- [ ] Re-run `npm run check:performance` to verify budget met
- [ ] Verify full data still accessible (pagination or virtualization, not hard truncation)
- [ ] Test on slow 3G network (target < 3s load time)
- [ ] Update docs/perf-baseline.md with new measurements
- [ ] Add data-size monitoring to prevent future regressions (e.g., fail build if > 350KB)

## Measurement

```bash
npm run check:performance
# Current (2026-08-18): ATP 557KB (86% over budget)
# Target: ATP < 300KB
# Baseline: ATP 273KB (2026-08-17)
```

## Priority Justification

**P0 (Critical)** — ATP Live is the FLAGSHIP PAGE and primary traffic driver. 104% size regression (+284KB) severely degrades mobile UX, blocks monetization, and arrives 9 days before US Open 2026 (peak traffic window). This is worse than the original ShareButton regression we spent 3 weeks fixing.

**Why P0**:
- Flagship page (most traffic)
- Worse than original regression (557KB vs 521KB peak)
- US Open in 9 days (critical timing)
- Blocks Phase 3 revenue (betting affiliates)
- Mobile UX unacceptable (~5.2s on slow 3G)
- Data-driven = likely quick fix (reduce DEEP_N or paginate)
