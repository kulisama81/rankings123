---
id: perf-share-button-bloat
title: "ATP/WTA Live: ShareButton feature caused 60KB+ regression per page"
status: open
priority: 1
tags:
  - perf
  - performance
parent: rankings123
created: 2026-07-27
---

## Problem

Commit 7469e43 (2026-07-26) "Add auto-generated shareable ranking cards" caused significant page size regressions:

- **WTA Live**: 189KB → 250KB (+61KB, +32.3%) — was 5.5% UNDER 200KB budget for 8 days, now **25% OVER budget**
- **ATP Live**: 439KB → 504KB (+65KB, +14.8%) — went from 46% over to **68% over 300KB budget**

## Root Cause

ShareButton component (149 lines, "use client") is rendered for EVERY player row in LiveRankingTable:
- ~100 rows per page × 2 views (desktop + mobile) = ~200 ShareButton instances
- Each has useState hooks for `copied` and `showPreview`
- Adds ~60-65KB to client-side hydration payload

## Impact

- 📱 **Mobile**: WTA 250KB = ~2.3s on slow 3G (was 1.8s), ATP 504KB = ~4.7s (was 4.1s)
- 💰 **Revenue**: Blocks Phase 3 monetization readiness (ads + betting affiliates)
- 🎯 **WTA regression CRITICAL**: was within budget, now over — undoes 8 days of stable perf

## Performance Budget

- **WTA target**: < 200KB (currently 250KB, **25% over**)
- **ATP target**: < 300KB (currently 504KB, **68% over**)

## Suggested Fixes (pick one or combine)

1. **Virtualize ShareButtons**: only render for visible rows (react-window/react-virtual)
2. **Single share button**: one button per table (top-right) instead of per-row, opens modal to select player
3. **Lazy-load ShareButton**: dynamic import (`next/dynamic`) that loads on hover/click
4. **Code-split**: extract ShareButton to separate chunk, load on interaction
5. **Optimize bundle**: inline SVGs, remove preview image preload, simplify component

## Acceptance Criteria

- [ ] WTA Live page size < 200KB (currently 250KB, need -20% reduction)
- [ ] ATP Live page size < 300KB (currently 504KB, need -40% reduction)
- [ ] Social sharing feature still works (test on top 10 players)
- [ ] Re-run `npm run check:performance` to verify budgets met
- [ ] Update docs/perf-baseline.md with new measurements

## Measurement

```bash
npm run check:performance
# Before: WTA 250KB, ATP 504KB
# Target: WTA < 200KB, ATP < 300KB
```

## Priority Justification

**P1** — WTA regression from within-budget to over-budget is urgent. This undoes the July 19 fix that held stable for 8 days. Blocking Phase 3 monetization.
