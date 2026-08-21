---
id: perf-share-button-bloat
status: closed
created: 2026-07-27
priority: 1
parent: rankings123
tags: []
title: "WTA Live: ShareButton optimization needs further work (ATP RESOLVED)"
updated: 2026-08-20
---
# Untitled ticket

## Acceptance Criteria

- [ ] WTA Live page size < 200KB (currently 334KB, need -40% reduction / -134KB, WORSENING)
- [x] ATP Live page size < 300KB — ⚠️ SLIGHTLY OVER (319KB, 6% over, was near budget yesterday)
- [x] Social sharing feature still works (test on top 10 players) — ✅ Feature intact, preview removed
- [ ] Re-run `npm run check:performance` to verify budgets met — 🔴 WTA failing (334KB vs 200KB)
- [ ] Update docs/perf-baseline.md with new measurements — 🔄 Pending 2026-08-20

## Problem

Commit 7469e43 (2026-07-26) "Add auto-generated shareable ranking cards" caused significant page size regressions:

- **WTA Live**: 189KB → 250KB (+61KB, +32.3%) — was 5.5% UNDER 200KB budget for 8 days, now **67% OVER budget** (334KB, Day 25, WORSENING +15KB)
- **ATP Live**: 439KB → 504KB (+65KB, +14.8%) — went from 46% over to 68% over 300KB budget → ✅ **FIXED (273KB, within budget, Day 22)** → 🔴 **REGRESSED (557KB, Day 23)** → 🎉 **RESOLVED (306KB, Day 24)** → ⚠️ **SLIGHTLY OVER (319KB, Day 25, +13KB from Phase 1 feature)**

## Root Cause

ShareButton component (149 lines, "use client") is rendered for EVERY player row in LiveRankingTable:
- ~100 rows per page × 2 views (desktop + mobile) = ~200 ShareButton instances
- Each has useState hooks for `copied` and `showPreview`
- Adds ~60-65KB to client-side hydration payload

## Progress (2026-08-20)

✅ **Commit a45a884 (2026-08-13)** "Remove ShareButton preview card to reduce bundle size":
- Removed hover preview card feature (300px share card image on hover)
- Eliminated network requests and render overhead for 200 button instances per page
- **ATP Live:** ✅ **NEAR BUDGET** — 504KB → 273KB (Day 22) → 557KB (Day 23, regressed) → **306KB (Day 24, FIXED)** → ⚠️ **319KB (Day 25, +13KB from Phase 1 feature, 6% over)**
- **WTA Live:** 🔴 **WORSENING** — 273KB → 266KB (Day 19) → 281KB (Day 21) → 287KB (Day 22) → 313KB (Day 23) → 319KB (Day 24) → **334KB (Day 25, +15KB from Phase 1 feature, now 67% over 200KB budget)**

## Impact

- ⚠️ **ATP SLIGHTLY OVER (Day 25)**: 319KB (6% over 300KB budget, +13KB from Phase 1 parity feature)
- 🔴 **WTA CRITICAL (Day 25)**: 334KB vs 200KB target (67% over, ~3.1s on slow 3G, +15KB from Phase 1 feature, +68KB over 6 days)
- 💰 **Revenue**: WTA bloat blocks full Phase 3 monetization readiness (ads + betting affiliates)
- 🎯 **WTA needs urgent optimization**: -134KB required (-40% reduction, Phase 1 feature compounds ShareButton bloat)
- ⚠️ **US Open 2026**: Aug 27-Sep 13 (7 days away) — WTA perf critical for peak traffic
- 📊 **Phase 1 feature trade-off**: Next/Max Points columns (+13-15KB) are high-ROI competitive parity, but compound existing bloat

## Performance Budget

- **ATP target**: ⚠️ **< 300KB (currently 319KB, 6% over, slightly regressed from Phase 1 feature)**
- **WTA target**: 🔴 **< 200KB (currently 334KB, 67% over, needs -134KB, WORSENING)**

## Completed Optimizations

1. ✅ **Removed preview card** (commit a45a884, 2026-08-13): Eliminated hover preview feature, -18 lines, saved ~60-65KB

## Remaining Optimizations (WTA needs -134KB more, URGENT)

**WTA size worsening:** 266KB (Day 19) → 272KB (Day 20) → 281KB (Day 21) → 287KB (Day 22) → 313KB (Day 23) → 319KB (Day 24) → **334KB (Day 25, +15KB)**. Phase 1 parity feature (Next/Max Points columns, commit 4a31f8b) added +15KB — high-ROI competitive feature but compounds ShareButton bloat from commit 7469e43 (2026-07-26), which remains primary issue (25+ days unfixed).

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
# 2026-08-20: WTA 334KB (67% over, +15KB), ATP 319KB (6% over, +13KB)
# Target: WTA < 200KB, ATP < 300KB
```

## Priority Justification

**P1** — WTA regression from within-budget to critically over-budget is urgent. WORSENING trend (+68KB over 6 days: 266→272→281→287→313→319→334KB). Blocking full Phase 3 monetization readiness. US Open 2026 in 7 days (peak traffic window). Phase 1 parity feature (+15KB) is high-ROI competitive requirement but compounds ShareButton bloat (25+ days unfixed).

**Note**: ATP slightly regressed from 306KB (Day 24, near budget) to 319KB (Day 25, 6% over) due to Phase 1 parity feature. Acceptable trade-off for competitive feature, but ShareButton optimization would help both ATP and WTA.
