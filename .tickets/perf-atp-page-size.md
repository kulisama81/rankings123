---
id: perf-atp-page-size
status: open
deps: []
links: []
created: 2026-06-21T00:00:00Z
type: enhancement
priority: 2
parent: rankings123
tags: [perf]
---
# ATP Live page: reduce 380KB payload via virtualization or pagination

## Context

The ATP Live page loads the **deep ATP ranking** (~1000 players) in a single payload.

**Current implementation:**
- Client-side pagination (50 rows per page) via `LiveRankingTable.tsx`
- But all ~1000 player records are sent in the initial HTML/JSON payload
- Only 50 are rendered at a time

**Recent improvement (2026-06-23):**
The ISR migration (commit b438b6d) delivered **major performance gains**:
- Size: 380KB → **269KB** (-29%, now **under the 300KB budget!**)
- TTFB: 0.46s → 0.18s (-61%)
- Total: 0.73s → 0.31s (-58%)

**Current measurement:**
- TTFB: 0.18s (excellent)
- Total: 0.31s (excellent)
- Size: 269KB (**now under 300KB budget**, but still far from aggressive 100KB target)

**Mobile impact:** On slow 3G, 269KB = ~2.5s transfer time (improved from ~3.5s).

## Solution

### Option 1: Server-Side Pagination (Recommended)
Only send the current page (50 players) in the initial payload; fetch additional pages on demand.

**Pros:** Smallest initial payload (~30KB instead of 380KB), fastest LCP  
**Cons:** Requires API route changes + client fetch logic

### Option 2: Virtual Scrolling
Render only visible rows in the DOM (e.g., via `react-window` or `@tanstack/react-virtual`).

**Pros:** Smooth infinite scroll UX, no pagination clicks  
**Cons:** Still sends full 380KB payload; reduces DOM size but not network transfer

### Recommendation
Start with **Option 1** (server-side pagination) since network transfer is the bottleneck on mobile, not DOM size. Client-side pagination is already implemented; just move it server-side.

**Reference:** [Next.js server-side pagination patterns](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations), [web.dev/reduce-javascript-payloads](https://web.dev/reduce-javascript-payloads-with-code-splitting)

## Why It Matters (ROI)

**Mobile UX:** 380KB → ~50KB = ~3s faster on slow 3G  
**Engagement:** Faster LCP → lower bounce rate → more page views  
**SEO:** Improved Core Web Vitals (LCP, TBT) → ranking signal  
**Ad Revenue:** Faster page load → better ad viewability + RPM

ATP Live is one of the core value props (real-time rankings) — it needs to feel instant.

## Acceptance Criteria

- [ ] Implement server-side pagination for ATP deep ranking
  - API route accepts `?page=0` param, returns only 50 players
  - Client fetches new pages on pagination click
- [ ] Initial payload size < 100KB (first 50 players only)
- [ ] Re-run `npm run check:performance` — `/atp-live` size should be < 100KB
- [ ] Measure LCP via Lighthouse — expect < 2.0s (faster with smaller payload)
- [ ] Verify no UX regression (pagination still works smoothly)
- [ ] Add loading state for page transitions

## Performance Budget

**Baseline (2026-06-21):** 380KB total page size  
**Current (2026-06-23):** 269KB total page size (-29% improvement)  
**Target:** < 100KB initial payload  
**Remaining gap:** ~170KB (send only 50 players instead of 1000)
