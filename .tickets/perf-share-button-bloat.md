---
id: perf-share-button-bloat
title: "WTA Live: ShareButton optimization needs further work (ATP SEPARATE REGRESSION)"
status: open
priority: 1
tags:
  - perf
  - performance
parent: rankings123
created: 2026-07-27
updated: 2026-08-18
---

## Problem

Commit 7469e43 (2026-07-26) "Add auto-generated shareable ranking cards" caused significant page size regressions:

- **WTA Live**: 189KB → 250KB (+61KB, +32.3%) — was 5.5% UNDER 200KB budget for 8 days, now **57% OVER budget** (313KB, WORSENING)
- **ATP Live**: 439KB → 504KB (+65KB, +14.8%) — went from 46% over to 68% over 300KB budget → ✅ **FIXED (273KB, within budget, Day 22)** → 🔴 **NEW REGRESSION (557KB, Day 23, see separate ticket perf-atp-size-regression-557kb)**

## Root Cause

ShareButton component (149 lines, "use client") is rendered for EVERY player row in LiveRankingTable:
- ~100 rows per page × 2 views (desktop + mobile) = ~200 ShareButton instances
- Each has useState hooks for `copied` and `showPreview`
- Adds ~60-65KB to client-side hydration payload

## Progress (2026-08-18)

✅ **Commit a45a884 (2026-08-13)** "Remove ShareButton preview card to reduce bundle size":
- Removed hover preview card feature (300px share card image on hover)
- Eliminated network requests and render overhead for 200 button instances per page
- **ATP Live:** ✅ **NOW WITHIN BUDGET** — 504KB → 273KB (-231KB, -46%, 9% under 300KB budget, Day 22) → 🔴 **NEW REGRESSION Day 23** (557KB, +284KB, see ticket perf-atp-size-regression-557kb)
- **WTA Live:** 🔴 **WORSENING** — 273KB → 266KB (Day 19) → 281KB (Day 21) → 287KB (Day 22) → **313KB (Day 23, +26KB, now 57% over 200KB budget)**

## Impact

- 🔴 **ATP NEW REGRESSION (Day 23)**: 273KB → 557KB (+284KB, separate data-driven issue, see perf-atp-size-regression-557kb)
- 🔴 **WTA WORSENING**: 313KB vs 200KB target (57% over, ~2.9s on slow 3G, +26KB from yesterday)
- 💰 **Revenue**: WTA bloat still blocks Phase 3 monetization (ads + betting affiliates)
- 🎯 **WTA needs urgent optimization**: -113KB required (-36% reduction, was -30% yesterday)
- ⚠️ **US Open 2026**: Aug 27-Sep 13 (9 days away) — WTA perf critical for peak traffic

## Performance Budget

- **ATP target**: 🔴 **< 300KB (currently 557KB, 86% over, NEW REGRESSION — see separate ticket perf-atp-size-regression-557kb)**
- **WTA target**: 🔴 **< 200KB (currently 313KB, 57% over, needs -113KB, WORSENING)**

## Completed Optimizations

1. ✅ **Removed preview card** (commit a45a884, 2026-08-13): Eliminated hover preview feature, -18 lines, saved ~60-65KB

## Remaining Optimizations (WTA needs -113KB more, URGENT)

**WTA size worsening:** 266KB (Day 19) → 272KB (Day 20) → 281KB (Day 21) → 287KB (Day 22) → **313KB (Day 23, +26KB)**. Recent CSS additions from design work (typographic maximalism + table hover, +222 lines to globals.css) contributed ~2-3KB; +26KB increase likely combination of data variance and ShareButton bloat. ShareButton bloat remains primary issue.

Pick one or combine:

1. **Virtualize ShareButtons**: only render for visible rows (react-window/react-virtual) — highest impact
2. **Single share button**: one button per table (top-right) instead of per-row, opens modal to select player — simplest
3. **Lazy-load ShareButton**: dynamic import (`next/dynamic`) that loads on hover/click — good middle ground
4. **Code-split**: extract ShareButton to separate chunk, load on interaction
5. **CSS content-visibility**: hide off-screen rows from render tree — low effort, moderate impact
6. **Consider reverting CSS additions** if bloat continues and US Open deadline approaches

## Acceptance Criteria

- [ ] WTA Live page size < 200KB (currently 313KB, need -36% reduction / -113KB, WORSENING)
- [ ] ATP Live page size < 300KB (was ✅ DONE 2026-08-14-17, now 🔴 REGRESSED 557KB — see separate ticket)
- [x] Social sharing feature still works (test on top 10 players) — ✅ Feature intact, preview removed
- [ ] Re-run `npm run check:performance` to verify budgets met — 🔴 WTA failing, ATP new regression
- [ ] Update docs/perf-baseline.md with new measurements — 🔴 Needs 2026-08-18 update

## Measurement

```bash
npm run check:performance
# 2026-08-18: WTA 313KB (57% over, +26KB), ATP 557KB (86% over, NEW REGRESSION)
# Target: WTA < 200KB, ATP < 300KB
```

## Priority Justification

**P1** — WTA regression from within-budget to critically over-budget is urgent. WORSENING trend (+47KB over 4 days: 266→272→281→287→313KB). Blocking Phase 3 monetization. US Open 2026 in 9 days (peak traffic window).

**Note**: ATP has a separate P0 NEW REGRESSION (273KB → 557KB, +284KB) tracked in perf-atp-size-regression-557kb. That ticket has higher priority (P0) due to severity and flagship page status.
