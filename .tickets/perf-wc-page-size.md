---
id: perf-wc-page-size
status: open
deps: []
links: []
created: 2026-06-21T00:00:00Z
type: enhancement
priority: 2
parent: rankings123
tags: [perf, worldcup]
---
# World Cup page: reduce payload size via lazy-loading and Suspense

## Context

The World Cup page is **341KB** (over the 300KB budget), with all content hydrating at once:
- 100 matches (full tournament schedule)
- 12 group standings tables
- Knockout bracket tree (projected or live)
- Tournament stats (top scorers, assisters)

**Mobile impact:** On slow 3G, 341KB = ~3s transfer time alone, even before JS execution.

**Current measurement:**
- TTFB: 0.35s (acceptable)
- Total: 0.49s (acceptable on fast connection)
- Size: 341KB (**over budget**, impacts mobile)

## Solution

Lazy-load below-the-fold sections via `next/dynamic` + Suspense:

1. **Knockout Bracket** — below fold, heavy component (~50KB)
2. **Tournament Stats** — below fold, not critical for initial render

```typescript
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const WorldCupBracket = dynamic(() => import('@/components/WorldCupBracket'), {
  loading: () => <div className="animate-pulse">Loading bracket...</div>,
});

const WorldCupStats = dynamic(() => import('@/components/WorldCupStats'), {
  loading: () => <div className="animate-pulse">Loading stats...</div>,
});

// In render:
<Suspense fallback={<BracketSkeleton />}>
  <WorldCupBracket bracket={bracket} />
</Suspense>
```

**Additional optimizations:**
- Consider pagination for match schedule (show "Today" + "Upcoming" by default, "Past Results" on demand)
- Virtualize group standings if we expand to show all teams in a scrollable list

**Reference:** [Next.js dynamic imports](https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading), [web.dev/code-splitting](https://web.dev/code-splitting)

## Why It Matters (ROI)

**Mobile UX:** 341KB → ~250KB = ~1s faster on slow 3G  
**Engagement:** Faster LCP → lower bounce rate → more ad impressions  
**SEO:** Improved Core Web Vitals → ranking signal  
**World Cup spike:** High mobile traffic during tournament (June–July 2026)

Mobile users are more likely to be on-the-go during World Cup matches — speed is critical for this audience.

## Acceptance Criteria

- [ ] Lazy-load `WorldCupBracket` component via `next/dynamic`
- [ ] Lazy-load `WorldCupStats` component via `next/dynamic`
- [ ] Add loading skeletons for both components
- [ ] Re-run `npm run check:performance` — `/world-cup` size should be < 300KB
- [ ] Measure LCP via Lighthouse — should improve (bracket/stats won't block initial paint)
- [ ] Verify no layout shift (CLS < 0.1) when lazy components load
- [ ] Test on throttled 3G connection (Chrome DevTools)

## Performance Budget

**Current:** 341KB total page size  
**Target:** < 300KB initial bundle  
**Expected savings:** ~50-80KB (bracket + stats deferred)
