---
id: perf-isr-migration
status: open
deps: []
links: []
created: 2026-06-21T00:00:00Z
type: enhancement
priority: 1
parent: rankings123
tags: [perf, worldcup]
---
# Migrate data pages from force-dynamic to ISR caching

## Context

Every data page uses `export const dynamic = 'force-dynamic'`, which disables Next.js caching and forces every request to block on upstream API calls (ESPN, WTA, UTS). This results in:
- Cold-start blocking on every page load (TTFB depends on upstream API latency)
- No edge caching → users can't be served from CDN
- Higher load on upstream APIs (no request coalescing)

**Performance impact:** While current TTFB is acceptable (0.23s–0.46s), this architecture leaves significant performance headroom on the table and creates unnecessary upstream API load.

## Solution

Migrate to ISR (Incremental Static Regeneration) with short revalidation intervals:

```typescript
// Instead of:
export const dynamic = 'force-dynamic';

// Use:
export const revalidate = 60; // 1 minute ISR
```

Combined with client-side polling (already implemented) for live updates. This gives us:
- ✅ Near-instant TTFB (serve cached page from edge)
- ✅ Background revalidation every 60s
- ✅ Live feel via client polling
- ✅ Reduced upstream API load (requests coalesced during revalidation)

**Reference:** [Next.js ISR docs](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration), [web.dev/vitals](https://web.dev/vitals)

## Why It Matters (ROI)

**Conversion + Revenue Impact:**
- Faster pages → higher engagement, lower bounce rate
- Better LCP → improved SEO rankings → more organic traffic
- Better Core Web Vitals → Google ranking signal
- Faster mobile experience → better ad viewability + RPM
- **Critical for World Cup traffic spike** (June–July 2026) — traffic volume amplifies the impact of every 100ms

## Acceptance Criteria

- [ ] Remove `force-dynamic` from all data pages (`/atp-live`, `/wta-live`, `/world-cup`, etc.)
- [ ] Add `export const revalidate = 60` (or appropriate interval per page)
- [ ] Verify client-side polling still works (live updates visible within ~20s)
- [ ] Re-run `npm run check:performance` — expect TTFB < 0.3s for cached hits
- [ ] Measure Core Web Vitals (Lighthouse) — expect LCP < 2.0s
- [ ] Add performance regression test to CI (fail if TTFB > baseline + 25%)

## Performance Budget

**Target:** TTFB < 0.3s (cached), < 0.8s (revalidating)  
**Current:** 0.23s–0.46s (all force-dynamic, no caching)
