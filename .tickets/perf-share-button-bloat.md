---
id: perf-share-button-bloat
title: "WTA Live: ShareButton optimization needs further work (ATP DONE)"
status: open
priority: 1
tags:
  - perf
  - performance
parent: rankings123
created: 2026-07-27
updated: 2026-08-14
---

## Problem

Commit 7469e43 (2026-07-26) "Add auto-generated shareable ranking cards" caused significant page size regressions:

- **WTA Live**: 189KB → 250KB (+61KB, +32.3%) — was 5.5% UNDER 200KB budget for 8 days, now **33% OVER budget** (266KB)
- **ATP Live**: 439KB → 504KB (+65KB, +14.8%) — went from 46% over to **68% over 300KB budget** → ✅ **FIXED (272KB, within budget)**

## Root Cause

ShareButton component (149 lines, "use client") is rendered for EVERY player row in LiveRankingTable:
- ~100 rows per page × 2 views (desktop + mobile) = ~200 ShareButton instances
- Each has useState hooks for `copied` and `showPreview`
- Adds ~60-65KB to client-side hydration payload

## Progress (2026-08-14)

✅ **Commit a45a884 (2026-08-13)** "Remove ShareButton preview card to reduce bundle size":
- Removed hover preview card feature (300px share card image on hover)
- Eliminated network requests and render overhead for 200 button instances per page
- **ATP Live:** ✅ **NOW WITHIN BUDGET** — 504KB → 272KB (-232KB, -46%, 9% under 300KB budget)
- **WTA Live:** 📊 **IMPROVING** — 273KB → 266KB (-7KB) but still 33% over 200KB budget

## Impact

- ✅ **ATP DONE**: 272KB < 300KB budget (excellent UX, ~2.5s on slow 3G)
- 🔴 **WTA still 33% over**: 266KB vs 200KB target (~2.4s on slow 3G)
- 💰 **Revenue**: WTA bloat still blocks Phase 3 monetization (ads + betting affiliates)
- 🎯 **WTA needs further optimization**: -66KB more required (-25% reduction)

## Performance Budget

- **ATP target**: ✅ **< 300KB (currently 272KB, DONE)**
- **WTA target**: 🔴 **< 200KB (currently 266KB, 33% over, needs -66KB)**

## Completed Optimizations

1. ✅ **Removed preview card** (commit a45a884, 2026-08-13): Eliminated hover preview feature, -18 lines, saved ~60-65KB

## Remaining Optimizations (WTA needs -66KB more)

Pick one or combine:

1. **Virtualize ShareButtons**: only render for visible rows (react-window/react-virtual) — highest impact
2. **Single share button**: one button per table (top-right) instead of per-row, opens modal to select player — simplest
3. **Lazy-load ShareButton**: dynamic import (`next/dynamic`) that loads on hover/click — good middle ground
4. **Code-split**: extract ShareButton to separate chunk, load on interaction
5. **CSS content-visibility**: hide off-screen rows from render tree — low effort, moderate impact

## Acceptance Criteria

- [ ] WTA Live page size < 200KB (currently 266KB, need -25% reduction / -66KB)
- [x] ATP Live page size < 300KB (currently 272KB, ✅ DONE 2026-08-14)
- [x] Social sharing feature still works (test on top 10 players) — ✅ Feature intact, preview removed
- [x] Re-run `npm run check:performance` to verify budgets met — ✅ ATP within budget
- [x] Update docs/perf-baseline.md with new measurements — ✅ Updated 2026-08-14

## Measurement

```bash
npm run check:performance
# Before: WTA 250KB, ATP 504KB
# Target: WTA < 200KB, ATP < 300KB
```

## Priority Justification

**P1** — WTA regression from within-budget to over-budget is urgent. This undoes the July 19 fix that held stable for 8 days. Blocking Phase 3 monetization.
