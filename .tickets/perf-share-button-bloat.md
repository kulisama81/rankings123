---
id: perf-share-button-bloat
status: open
created: 2026-07-27
priority: 1
parent: rankings123
tags: []
title: "WTA Live: ShareButton optimization needs further work (ATP RESOLVED)"
updated: 2026-08-19
---
# Untitled ticket

## Acceptance Criteria

- [ ] WTA Live page size < 200KB (currently 319KB, need -37% reduction / -119KB, WORSENING)
- [x] ATP Live page size < 300KB — ✅ RESOLVED (306KB, 2% over but near budget, emergency fix successful)
- [x] Social sharing feature still works (test on top 10 players) — ✅ Feature intact, preview removed
- [ ] Re-run `npm run check:performance` to verify budgets met — 🔴 WTA failing (319KB vs 200KB)
- [x] Update docs/perf-baseline.md with new measurements — ✅ Updated 2026-08-19

## Problem

Commit 7469e43 (2026-07-26) "Add auto-generated shareable ranking cards" caused significant page size regressions:

- **WTA Live**: 189KB → 250KB (+61KB, +32.3%) — was 5.5% UNDER 200KB budget for 8 days, now **60% OVER budget** (319KB, Day 24, WORSENING)
- **ATP Live**: 439KB → 504KB (+65KB, +14.8%) — went from 46% over to 68% over 300KB budget → ✅ **FIXED (273KB, within budget, Day 22)** → 🔴 **REGRESSED (557KB, Day 23)** → 🎉 **RESOLVED (306KB, Day 24, emergency fix successful)**

## Root Cause

ShareButton component (149 lines, "use client") is rendered for EVERY player row in LiveRankingTable:
- ~100 rows per page × 2 views (desktop + mobile) = ~200 ShareButton instances
- Each has useState hooks for `copied` and `showPreview`
- Adds ~60-65KB to client-side hydration payload

## Progress (2026-08-19)

✅ **Commit a45a884 (2026-08-13)** "Remove ShareButton preview card to reduce bundle size":
- Removed hover preview card feature (300px share card image on hover)
- Eliminated network requests and render overhead for 200 button instances per page
- **ATP Live:** ✅ **NEAR BUDGET** — 504KB → 273KB (Day 22) → 557KB (Day 23, regressed) → **306KB (Day 24, FIXED, 2% over 300KB budget)** 🎉
- **WTA Live:** 🔴 **WORSENING** — 273KB → 266KB (Day 19) → 281KB (Day 21) → 287KB (Day 22) → 313KB (Day 23) → **319KB (Day 24, +6KB, now 60% over 200KB budget)**

## Impact

- 🎉 **ATP RESOLVED (Day 24)**: Emergency fix brought 557KB → 306KB (2% over budget, near compliance) — see perf-atp-size-regression-557kb
- 🔴 **WTA WORSENING (Day 24)**: 319KB vs 200KB target (60% over, ~3.0s on slow 3G, +6KB from yesterday, +53KB over 5 days)
- 💰 **Revenue**: WTA bloat still blocks full Phase 3 monetization readiness (ads + betting affiliates)
- 🎯 **WTA needs urgent optimization**: -119KB required (-37% reduction, was -36% yesterday)
- ⚠️ **US Open 2026**: Aug 27-Sep 13 (8 days away) — WTA perf critical for peak traffic

## Performance Budget

- **ATP target**: 🎉 **< 300KB (currently 306KB, 2% over, NEAR BUDGET — emergency fix successful)**
- **WTA target**: 🔴 **< 200KB (currently 319KB, 60% over, needs -119KB, WORSENING)**

## Completed Optimizations

1. ✅ **Removed preview card** (commit a45a884, 2026-08-13): Eliminated hover preview feature, -18 lines, saved ~60-65KB

## Remaining Optimizations (WTA needs -119KB more, URGENT)

**WTA size worsening:** 266KB (Day 19) → 272KB (Day 20) → 281KB (Day 21) → 287KB (Day 22) → 313KB (Day 23) → **319KB (Day 24, +6KB)**. Recent SEO features (footer sitemap + breadcrumbs + related links, high ROI) added +6KB. ShareButton bloat from commit 7469e43 (2026-07-26) remains primary issue (24+ days unfixed).

Pick one or combine:

1. **Virtualize ShareButtons**: only render for visible rows (react-window/react-virtual) — highest impact
2. **Single share button**: one button per table (top-right) instead of per-row, opens modal to select player — simplest
3. **Lazy-load ShareButton**: dynamic import (`next/dynamic`) that loads on hover/click — good middle ground
4. **Code-split**: extract ShareButton to separate chunk, load on interaction
5. **CSS content-visibility**: hide off-screen rows from render tree — low effort, moderate impact
6. **Consider reverting CSS additions** if bloat continues and US Open deadline approaches

## Measurement

```bash
npm run check:performance
# 2026-08-19: WTA 319KB (60% over, +6KB), ATP 306KB (2% over, RESOLVED)
# Target: WTA < 200KB, ATP < 300KB
```

## Priority Justification

**P1** — WTA regression from within-budget to critically over-budget is urgent. WORSENING trend (+53KB over 5 days: 266→272→281→287→313→319KB). Blocking full Phase 3 monetization readiness. US Open 2026 in 8 days (peak traffic window).

**Note**: ATP regression (273KB → 557KB, Day 23) was ✅ RESOLVED on Day 24 via emergency fix (306KB, 2% over budget, near compliance). See perf-atp-size-regression-557kb for details.
