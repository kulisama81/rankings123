---
id: perf-wc-dedupe-fetches
status: open
deps: []
links: []
created: 2026-06-21T00:00:00Z
type: bug
priority: 1
parent: rankings123
tags: [perf, worldcup]
---
# World Cup page: deduplicate redundant ESPN API fetches

## Context

The `/world-cup` page fetches ESPN's STANDINGS and SCOREBOARD APIs **twice in parallel**:
1. `getWorldCupData()` in `src/lib/worldCupFeed.ts` (lines 164-167)
2. `getWorldCupBracket()` in `src/lib/worldCupBracketFeed.ts` (lines 253-256)

Both functions are called in parallel on the World Cup page (`src/app/world-cup/page.tsx:37-41`), resulting in duplicate network requests on every page load.

**Impact:**
- Wastes ~100-200ms TTFB (waiting for redundant upstream calls)
- Wastes ESPN API quota (could lead to rate limiting)
- Wastes bandwidth and server CPU
- Unnecessary during World Cup traffic spike (June–July 2026)

## Root Cause

Both feeds independently fetch the same data because they need different parts of it:
- `worldCupFeed` needs standings + matches for the main table
- `worldCupBracketFeed` needs standings (for bracket projection) + scoreboard (for knockout fixtures)

## Solution

Deduplicate via React's `cache()` wrapper or a shared cached fetch helper:

```typescript
// src/lib/worldCupSharedCache.ts
import { cache } from 'react';

const STANDINGS_URL = "https://site.api.espn.com/apis/v2/sports/soccer/fifa.world/standings";
const SCOREBOARD_URL = "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard";

async function fetchJson(url: string, revalidateSeconds: number): Promise<any> {
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: revalidateSeconds },
  });
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return res.json();
}

// React cache() deduplicates within a single render pass
export const getCachedStandings = cache(() => fetchJson(STANDINGS_URL, 300));
export const getCachedScoreboard = cache(() => fetchJson(SCOREBOARD_URL, 60));
```

Then update both feeds to use these shared cached fetches instead of inline `fetchJson` calls.

**Reference:** [React cache() docs](https://react.dev/reference/react/cache), [Next.js request deduplication](https://nextjs.org/docs/app/building-your-application/caching#request-memoization)

## Why It Matters (ROI)

**Performance:** ~100-200ms faster TTFB on World Cup page (currently 0.35s → target < 0.25s)  
**Reliability:** Reduces ESPN API load during high-traffic World Cup period  
**UX:** Faster page = better engagement, lower bounce rate  
**SEO:** Better LCP → ranking signal

World Cup traffic is time-sensitive (June–July 2026) — every ms counts.

## Acceptance Criteria

- [ ] Create shared cached fetch helper for ESPN STANDINGS and SCOREBOARD
- [ ] Update `getWorldCupData()` to use shared cache
- [ ] Update `getWorldCupBracket()` to use shared cache
- [ ] Verify both feeds still work correctly (no data regression)
- [ ] Re-run `npm run check:performance` — `/world-cup` TTFB should drop ~100-200ms
- [ ] Add regression test: verify only ONE fetch per unique URL during SSR

## Performance Budget

**Current:** TTFB 0.35s (with redundant fetches)  
**Target:** TTFB < 0.25s (deduplicated)  
**Expected savings:** ~100-200ms
