---
id: perf-atp-wta-isr-regression
status: closed
deps: []
links: [atp-table-loading-failure]
created: 2026-06-24T00:00:00Z
type: bug
priority: 0
parent: rankings123
tags: [perf, regression]
---
# Restore ISR caching on ATP/WTA pages while keeping country filter working

## Acceptance Criteria

- [ ] Restore ISR caching on ATP Live page (`export const revalidate = 60`)
- [ ] Restore ISR caching on WTA Live page (`export const revalidate = 60`)
- [ ] Country filter still works (no rendering bug, full table loads)
- [ ] Re-run `npm run check:performance`:
  - ATP: TTFB < 0.3s, size < 300KB
  - WTA: TTFB < 0.3s, size < 200KB
- [ ] Re-run the regression test `tests/atp-table-rendering.test.js` — must PASS (no rendering bug)
- [ ] Verify ISR is working: request same page twice in <60s, expect cached response (check response headers for `x-vercel-cache: HIT`)
- [ ] Update `docs/perf-baseline.md` with new measurements

## Context

**PERFORMANCE REGRESSION DETECTED (2026-06-24):**

Commit 8ee5be4 (2026-06-23) changed ATP and WTA Live pages from ISR caching back to `force-dynamic` to fix a rendering bug where only 1 player was showing (the `useSearchParams` hook in LiveRankingTable conflicted with ISR prerendering).

While the fix solved the rendering bug, it introduced a **severe performance regression** by removing ISR caching:

### ATP Live Performance Regression

| Metric | Baseline (2026-06-23 AM) | Current (2026-06-24) | Change |
|--------|---------------------------|----------------------|--------|
| TTFB   | 0.18s                     | 0.39s                | **+117%** ⚠️ |
| Total  | 0.31s                     | 0.53s                | **+71%**  ⚠️ |
| Size   | 269KB                     | 374KB                | **+39%**  ⚠️ |

### WTA Live Performance Regression

| Metric | Baseline (2026-06-23 AM) | Current (2026-06-24) | Change |
|--------|---------------------------|----------------------|--------|
| TTFB   | 0.16s                     | 0.31s                | **+94%** ⚠️ |
| Total  | 0.16s                     | 0.41s                | **+156%** ⚠️ |
| Size   | 48KB                      | 157KB                | **+227%** ⚠️ |

**Root cause:** With `force-dynamic`, every request blocks on upstream ESPN API calls instead of serving cached pages from the edge. The ISR migration (commit b438b6d) had delivered massive performance wins, which were lost in the rollback.

**Impact:**
- Every page load is now slow (TTFB approaching 0.8s budget limit)
- No edge caching → all traffic hits origin
- Higher load on ESPN upstream APIs
- Worse mobile UX (slower TTFB + larger payloads)
- Worse Core Web Vitals → SEO impact

## Solution

**Restore ISR caching while keeping the country filter working.** This is a known Next.js pattern:

1. **Keep `export const revalidate = 60` (ISR) on the page**
2. **Move `useSearchParams` logic to a separate Client Component**
3. **Wrap that Client Component in Suspense**

This way:
- The server-rendered page is cached (fast TTFB)
- The client-side filter still works (no rendering bug)
- Best of both worlds

### Implementation Pattern

```typescript
// src/app/atp-live/page.tsx (Server Component with ISR)
export const revalidate = 60; // ← ISR caching
// REMOVE: export const dynamic = "force-dynamic";

export default async function AtpLivePage() {
  const snapshot = await getLiveData("atp");
  return (
    <div data-sport="atp">
      <Suspense fallback={<LiveRankingViewSkeleton />}>
        <LiveRankingViewClient tour="atp" snapshot={snapshot} />
      </Suspense>
    </div>
  );
}
```

```typescript
// src/components/LiveRankingViewClient.tsx (NEW Client Component)
'use client';

import { useSearchParams } from 'next/navigation';
import LiveRankingView from './LiveRankingView';

export default function LiveRankingViewClient({ tour, snapshot }) {
  const searchParams = useSearchParams(); // ← now safe in client component
  return <LiveRankingView tour={tour} snapshot={snapshot} />;
}
```

**Alternative (if simpler):** Read query params on the server using `searchParams` prop (Server Component pattern) instead of `useSearchParams` hook. Then ISR works without needing Suspense.

**Reference:**
- [Next.js useSearchParams with ISR](https://nextjs.org/docs/app/api-reference/functions/use-search-params#static-rendering)
- [web.dev/vitals](https://web.dev/vitals)

## Why It Matters (ROI)

**Conversion + Revenue Impact:**
- ATP and WTA are the **core product** (70%+ of traffic)
- Slower pages → higher bounce rate → fewer ad impressions
- TTFB doubled → worse Core Web Vitals → SEO ranking penalty
- Mobile UX degraded significantly (2x slower + larger payloads)
- Lost all the performance wins from the ISR migration (commit b438b6d)

**This is P0 because:**
1. Affects the two highest-traffic pages
2. Measured 2x performance regression
3. Directly impacts SEO and ad revenue
4. Can be fixed without sacrificing the country filter feature

## Performance Budget

**Target (restore to baseline):**
- ATP: TTFB < 0.3s, total < 0.5s, size < 300KB
- WTA: TTFB < 0.3s, total < 0.5s, size < 200KB

**Current (regression):**
- ATP: TTFB 0.39s, total 0.53s, size 374KB
- WTA: TTFB 0.31s, total 0.41s, size 157KB

**Expected improvement:** ~50% reduction in TTFB, ~30% reduction in size (back to ISR-cached performance)
