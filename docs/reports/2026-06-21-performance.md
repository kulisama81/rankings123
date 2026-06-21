# Performance Assessment — 2026-06-21

**Agent:** @perf-inspector  
**Type:** First full assessment (baseline establishment)  
**Date:** 2026-06-21

---

## Executive Summary

All routes are currently **within TTFB and total load budgets** (fast on desktop/good connections), but the site has significant **performance debt** that will impact mobile users and leave conversion/revenue gains on the table:

- ✅ **Good:** TTFB 0.23s–0.46s (all under 0.8s budget)
- ⚠️ **Size over budget:** `/atp-live` (380KB) and `/world-cup` (341KB) hurt mobile UX
- ⚠️ **Architecture debt:** `force-dynamic` everywhere → no edge caching, cold-start blocking
- ⚠️ **Redundant fetches:** World Cup page fetches ESPN APIs twice

**Tickets filed:** 5 (2 high-priority, 2 medium, 1 low)  
**Highest ROI:** ISR migration + World Cup fetch deduplication

---

## Measurement Results

### Per-Route Performance

Measured via `npm run check:performance` (2 runs, best of 2):

| Route        | TTFB   | Total  | Size  | vs Budget        | Status  |
|--------------|--------|--------|-------|------------------|---------|
| /            | 0.23s  | 0.27s  | 93KB  | All within       | ✅ FAST  |
| /atp-live    | 0.46s  | 0.73s  | 380KB | Size: 380/300KB  | ⚠️ SIZE |
| /wta-live    | 0.29s  | 0.47s  | 165KB | All within       | ✅ FAST  |
| /world-cup   | 0.35s  | 0.49s  | 341KB | Size: 341/300KB  | ⚠️ SIZE |

**Budgets:**
- TTFB: ≤ 0.8s (good), > 1.5s (slow)
- Total: ≤ 2.0s
- Size: varies by route complexity (see baseline doc)

### Core Web Vitals

**Not measured** in this run (PageSpeed Insights API rate limited).  
**Action:** Add Lighthouse CI measurement in next run.

**Targets (per web.dev/vitals):**
- LCP < 2.5s (good)
- INP < 200ms (good)
- CLS < 0.1 (good)

---

## Root Cause Analysis

### 1. `force-dynamic` Everywhere (High Impact)

**Finding:** All data pages use `export const dynamic = 'force-dynamic'`, which disables Next.js ISR/SSG caching.

**Affected routes:**
- `/atp-live`
- `/wta-live`
- `/world-cup` (and all subpages)
- All `/api/*` routes

**Impact:**
- Every request blocks on upstream API calls (ESPN, WTA, UTS)
- No edge caching → can't serve from CDN
- Higher upstream API load (no request coalescing)
- TTFB depends on upstream latency (currently acceptable, but fragile)

**Why it exists:** Likely implemented for "always fresh" data during live tournaments.

**Better approach:** ISR with short revalidation (`export const revalidate = 60`) + client polling for live updates. This gives:
- Near-instant TTFB (serve cached page from edge)
- Background revalidation
- Same "live" feel via existing client-side polling

**Reference:** [Next.js ISR](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration), [web.dev TTI optimization](https://web.dev/tti)

**Ticket filed:** `perf-isr-migration` (priority 1)

---

### 2. Redundant ESPN Fetches on World Cup Page (High Impact)

**Finding:** The World Cup page fetches ESPN's STANDINGS and SCOREBOARD APIs **twice in parallel**:

1. `getWorldCupData()` in `src/lib/worldCupFeed.ts:164-167`
2. `getWorldCupBracket()` in `src/lib/worldCupBracketFeed.ts:253-256`

Both are called in `src/app/world-cup/page.tsx:37-41`.

**Impact:**
- ~100-200ms wasted TTFB (waiting for duplicate requests)
- Wasted ESPN API quota (risk of rate limiting during traffic spike)
- Wasted bandwidth and server CPU

**Root cause:** Both feeds need overlapping data (standings for bracket projection, scoreboard for fixtures), but they fetch independently.

**Solution:** Deduplicate via React's `cache()` wrapper:

```typescript
// src/lib/worldCupSharedCache.ts
import { cache } from 'react';

export const getCachedStandings = cache(() => fetchJson(STANDINGS_URL, 300));
export const getCachedScoreboard = cache(() => fetchJson(SCOREBOARD_URL, 60));
```

React `cache()` deduplicates within a single render pass → only one actual fetch per unique URL.

**Reference:** [React cache()](https://react.dev/reference/react/cache), [Next.js request deduplication](https://nextjs.org/docs/app/building-your-application/caching#request-memoization)

**Ticket filed:** `perf-wc-dedupe-fetches` (priority 1)

---

### 3. Large Page Sizes (Medium Impact)

**Finding:** Two routes exceed size budget:

- **`/atp-live`**: 380KB (budget: 300KB) — full deep ranking (~1000 players) sent in initial payload
- **`/world-cup`**: 341KB (budget: 300KB) — 100 matches + 12 groups + bracket + stats all hydrating at once

**Mobile impact:** On slow 3G, 380KB = ~3.5s transfer time alone (before JS execution).

**Current mitigation:** Client-side pagination on ATP Live (50 rows per page), but all 1000 records are still in the payload.

**Solutions:**

#### ATP Live (380KB → target < 100KB)
- **Server-side pagination:** Only send current page (50 players) in initial payload; fetch additional pages on demand
- **Expected savings:** ~280KB (send 50 instead of 1000 players)

#### World Cup (341KB → target < 300KB)
- **Lazy-load below-the-fold sections** via `next/dynamic`:
  - Knockout bracket (~50KB)
  - Tournament stats (~30KB)
- **Expected savings:** ~80KB moved to deferred chunks

**Reference:** [Next.js dynamic imports](https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading), [web.dev code splitting](https://web.dev/code-splitting)

**Tickets filed:**
- `perf-atp-page-size` (priority 2)
- `perf-wc-page-size` (priority 2)

---

### 4. Multiple Font Families (Low-Medium Impact)

**Finding:** 5 Google Fonts loaded in `src/app/layout.tsx`:
1. Geist (sans)
2. Geist Mono
3. Archivo (display)
4. Oswald (alternate theme)
5. Source Serif 4 (alternate theme)

**Impact:**
- Multiple render-blocking requests
- Each font file ~20-50KB compressed
- Can delay LCP if fonts block initial paint
- Oswald + Source Serif appear to be for alternate themes not yet implemented

**Solution:**
- Audit usage; likely can reduce to 2-3 core families
- Add `display: 'swap'` to all fonts (prevent invisible text)
- Preload critical fonts (Archivo for headings)

**Reference:** [Next.js font optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts), [web.dev font best practices](https://web.dev/font-best-practices)

**Ticket filed:** `perf-font-optimization` (priority 3)

---

### 5. Limited `next/image` Usage (Low Impact)

**Finding:** Only 1 occurrence of `next/image` across components (most components don't use images).

**Impact:** Minimal on current site (not image-heavy), but worth noting for future.

**Action:** Audit if any `<img>` tags exist that should use `next/image` for automatic optimization.

---

## Performance Baseline Established

Created **`docs/perf-baseline.md`** with:
- Per-route budgets (TTFB/total/size)
- Current measurements (this run)
- Known performance debt
- Regression detection criteria

**Usage:** Every build/PR should run `npm run check:performance` and compare to baseline. Flag as regression if any route's TTFB/total increases > 25% or size increases > 15%.

---

## Tickets Filed

| ID                     | Priority | Type        | Impact   | Description                                      |
|------------------------|----------|-------------|----------|--------------------------------------------------|
| `perf-isr-migration`   | 1 (high) | enhancement | High     | Migrate from force-dynamic to ISR caching        |
| `perf-wc-dedupe-fetches` | 1 (high) | bug         | High     | Deduplicate ESPN fetches on World Cup page       |
| `perf-atp-page-size`   | 2 (med)  | enhancement | Medium   | Reduce ATP Live payload via server-side pagination |
| `perf-wc-page-size`    | 2 (med)  | enhancement | Medium   | Reduce World Cup payload via lazy-loading        |
| `perf-font-optimization` | 3 (low)  | enhancement | Low-Med  | Optimize font loading (reduce families, display swap) |

All tickets include:
- Concrete performance budgets in acceptance criteria
- ROI framing (conversion + revenue impact)
- References to web.dev / Next.js perf best practices
- Before/after measurement requirements

---

## Why Performance Matters (ROI Framing)

Performance is a **direct conversion and revenue lever**:

1. **Engagement:** Faster pages → lower bounce rate, more page views
2. **SEO:** Core Web Vitals are a Google ranking signal → more organic traffic
3. **Mobile UX:** Mobile users more sensitive to slow loads; faster = better retention
4. **Ad Revenue:** Faster page load → better ad viewability + RPM
5. **World Cup spike:** June–July 2026 traffic amplifies every 100ms — small improvements = big impact

**Research citations:**
- [Google: 53% of mobile users abandon sites that take > 3s](https://www.thinkwithgoogle.com/marketing-strategies/app-and-mobile/mobile-page-speed-new-industry-benchmarks/)
- [Portent: Page load time vs conversion rate](https://www.portent.com/blog/analytics/research-site-speed-hurting-everyones-revenue.htm) (0-1s = 3× higher conversion than 0-5s)
- [web.dev: Core Web Vitals impact on bounce rate](https://web.dev/vitals-business-impact)

---

## Recommendations (Priority Order)

### Immediate (High ROI, Low Risk)

1. **Deduplicate World Cup fetches** (`perf-wc-dedupe-fetches`)
   - Low-hanging fruit, safe refactor
   - ~100-200ms TTFB improvement
   - Reduces ESPN API load during traffic spike

2. **ISR migration** (`perf-isr-migration`)
   - Biggest architectural improvement
   - Near-instant TTFB for cached pages
   - Critical for scalability during World Cup

### Next (Medium ROI, Medium Effort)

3. **Lazy-load World Cup sections** (`perf-wc-page-size`)
   - ~80KB payload reduction
   - Improves LCP (bracket/stats won't block paint)
   - Good mobile UX win

4. **ATP server-side pagination** (`perf-atp-page-size`)
   - ~280KB payload reduction (huge mobile win)
   - Requires API route changes (more effort)

### Later (Low Priority)

5. **Font optimization** (`perf-font-optimization`)
   - Audit + reduce to 2-3 families
   - Add `display: 'swap'`
   - ~100-300ms LCP improvement if fonts were blocking

---

## Next Steps

1. **Add Core Web Vitals measurement** (Lighthouse CI or PageSpeed Insights)
2. **Planner builds tickets** in priority order (start with `perf-wc-dedupe-fetches` and `perf-isr-migration`)
3. **CI regression checks:** Add `npm run check:performance` to CI; fail if any route exceeds baseline + 25%
4. **Re-measure after each fix** to verify budget met

---

## Appendix: Web Performance Best Practices

All findings grounded in established guidance:

- **Core Web Vitals:** [web.dev/vitals](https://web.dev/vitals) (LCP < 2.5s, INP < 200ms, CLS < 0.1)
- **Next.js App Router perf:** [Next.js docs](https://nextjs.org/docs/app/building-your-application/optimizing)
- **PRPL pattern:** [web.dev/apply-instant-loading-with-prpl](https://web.dev/apply-instant-loading-with-prpl)
- **Code splitting:** [web.dev/reduce-javascript-payloads](https://web.dev/reduce-javascript-payloads-with-code-splitting)
- **ISR:** [Next.js ISR docs](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
- **Request deduplication:** [React cache()](https://react.dev/reference/react/cache)

Performance = conversion lever. Every 100ms counts.
