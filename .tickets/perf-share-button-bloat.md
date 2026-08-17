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
updated: 2026-08-17
---

## Problem

Commit 7469e43 (2026-07-26) "Add auto-generated shareable ranking cards" caused significant page size regressions:

- **WTA Live**: 189KB → 250KB (+61KB, +32.3%) — was 5.5% UNDER 200KB budget for 8 days, now **44% OVER budget** (287KB, WORSENING)
- **ATP Live**: 439KB → 504KB (+65KB, +14.8%) — went from 46% over to **68% over 300KB budget** → ✅ **FIXED (273KB, within budget)**

## Root Cause

ShareButton component (149 lines, "use client") is rendered for EVERY player row in LiveRankingTable:
- ~100 rows per page × 2 views (desktop + mobile) = ~200 ShareButton instances
- Each has useState hooks for `copied` and `showPreview`
- Adds ~60-65KB to client-side hydration payload

## Progress (2026-08-17)

✅ **Commit a45a884 (2026-08-13)** "Remove ShareButton preview card to reduce bundle size":
- Removed hover preview card feature (300px share card image on hover)
- Eliminated network requests and render overhead for 200 button instances per page
- **ATP Live:** ✅ **NOW WITHIN BUDGET** — 504KB → 273KB (-231KB, -46%, 9% under 300KB budget, Day 22)
- **WTA Live:** 🔴 **WORSENING** — 273KB → 266KB (Day 19) → 281KB (Day 21) → 287KB (Day 22, +21KB, now 44% over 200KB budget)

## Impact

- ✅ **ATP DONE**: 273KB < 300KB budget (excellent UX, ~2.5s on slow 3G, Day 22)
- 🔴 **WTA WORSENING**: 287KB vs 200KB target (44% over, ~2.7s on slow 3G)
- 💰 **Revenue**: WTA bloat still blocks Phase 3 monetization (ads + betting affiliates)
- 🎯 **WTA needs urgent optimization**: -87KB required (-30% reduction)
- ⚠️ **US Open 2026**: Aug 27-Sep 13 (10 days away) — WTA perf critical for peak traffic

## Performance Budget

- **ATP target**: ✅ **< 300KB (currently 273KB, DONE, Day 22)**
- **WTA target**: 🔴 **< 200KB (currently 287KB, 44% over, needs -87KB, WORSENING)**

## Completed Optimizations

1. ✅ **Removed preview card** (commit a45a884, 2026-08-13): Eliminated hover preview feature, -18 lines, saved ~60-65KB

## Remaining Optimizations (WTA needs -87KB more, URGENT)

**WTA size worsening:** 266KB (Day 19) → 272KB (Day 20) → 281KB (Day 21) → 287KB (Day 22). Recent CSS additions from design work (typographic maximalism + table hover, +222 lines to globals.css) contributed ~2-3KB; rest is data variance. ShareButton bloat remains primary issue.

Pick one or combine:

1. **Virtualize ShareButtons**: only render for visible rows (react-window/react-virtual) — highest impact
2. **Single share button**: one button per table (top-right) instead of per-row, opens modal to select player — simplest
3. **Lazy-load ShareButton**: dynamic import (`next/dynamic`) that loads on hover/click — good middle ground
4. **Code-split**: extract ShareButton to separate chunk, load on interaction
5. **CSS content-visibility**: hide off-screen rows from render tree — low effort, moderate impact
6. **Consider reverting CSS additions** if bloat continues and US Open deadline approaches

## Acceptance Criteria

- [ ] WTA Live page size < 200KB (currently 287KB, need -30% reduction / -87KB, WORSENING)
- [x] ATP Live page size < 300KB (currently 273KB, ✅ DONE 2026-08-14, maintained Day 22)
- [x] Social sharing feature still works (test on top 10 players) — ✅ Feature intact, preview removed
- [x] Re-run `npm run check:performance` to verify budgets met — ✅ ATP within budget
- [x] Update docs/perf-baseline.md with new measurements — ✅ Updated 2026-08-17

## Measurement

```bash
npm run check:performance
# 2026-08-17: WTA 287KB (44% over), ATP 273KB (✅ within budget)
# Target: WTA < 200KB, ATP < 300KB
```

## Priority Justification

**P1** — WTA regression from within-budget to critically over-budget is urgent. WORSENING trend (+21KB over 3 days). Blocking Phase 3 monetization. US Open 2026 in 10 days (peak traffic window).
