---
title: ATP/WTA ISR+useSearchParams conflict — permanent architectural fix (RECURRING P0)
status: open
priority: 0
type: bug
tags: [perf, regression, atp, wta, isr, critical]
parent: rankings123
created: 2026-06-30
---

**CRITICAL RECURRING REGRESSION** — ATP/WTA Live pages have toggled between ISR (fast but broken) and force-dynamic (slow but working) **TWICE** in 4 days. This is the SECOND occurrence of the same performance regression.

## Current State (2026-06-30)
- **ATP Live:** TTFB 0.60s (+329% vs 0.14s baseline), size 393KB (+45% vs 271KB)
- **WTA Live:** TTFB 0.33s (+120% vs 0.15s baseline), size 171KB (+249% vs 49KB)
- Both pages using `dynamic = "force-dynamic"` (zero caching, every request hits origin + ESPN APIs)

## Performance Impact
- **Engagement:** Slow pages kill user experience during high-traffic events (Wimbledon 2026 is LIVE NOW)
- **SEO:** Poor Core Web Vitals harm search rankings
- **Revenue:** Slow TTFB reduces ad viewability and RPM
- **Scale:** 100× more origin requests vs ISR (expensive, fragile)

## Root Cause (Architectural Conflict)
The issue is an **architectural conflict** between three Next.js patterns:
1. **ISR** (`revalidate: 60`) — pre-renders at build time for edge caching
2. **useSearchParams** — LiveRankingTable uses it for country filtering, requires request-time context
3. **React Suspense** — wraps the client component, but searchParams unavailable at build time → component suspends → fallback rendered in static HTML

**When using ISR:**
- Table suspends during static generation
- Suspense fallback persists → table shows only 1 player or "Loading..." text
- Result: FAST but BROKEN

**When using force-dynamic:**
- Every request renders at request time
- SearchParams available → table renders correctly
- Result: WORKS but SLOW (no caching)

## The Toggle Pattern (History)
1. **2026-06-23:** ISR introduced (commit b438b6d) — massive perf wins
2. **2026-06-23:** Reverted to force-dynamic (commit 8ee5be4) — fix table rendering bug
3. **2026-06-24:** ISR restored (commit 6cfcae9) — ATP -67% TTFB, WTA -48%
4. **2026-06-27:** REGRESSION detected — force-dynamic found in production
5. **2026-06-28/29:** ISR restored AGAIN (commit e0e8f31) — ATP -65% TTFB, WTA -48%
6. **2026-06-29:** force-dynamic ADDED AGAIN (commit db154e4) — "fix" table truncation bug
7. **2026-06-30 (NOW):** REGRESSION DETECTED AGAIN — same performance degradation

**This ticket is the SECOND occurrence in 4 days.** The current "fix" just toggles between broken states.

## The Bad Regression Test
`tests/atp-table-rendering.test.js` lines 79-117 **enforces force-dynamic** and **blocks ISR**. This test guarantees poor performance by mandating the wrong implementation. It tests implementation pattern (force-dynamic) instead of outcomes (functionality + performance).

## Permanent Solution (Required)
Fix the ROOT CAUSE so ISR and table functionality BOTH work:

**Option A (Recommended):** Move searchParams handling entirely to client-side
- Remove `useSearchParams` from build-time code path
- Pass country filter state via client-only context/state
- Suspense boundary stays but never suspends during SSG

**Option B:** Make searchParams optional with defaults
- Component renders with default (all countries) during SSG
- Client-side hydration applies filter from URL after mount
- Requires careful handling to avoid hydration mismatch

**Option C:** Lazy-load the filtered table component
- Static shell renders immediately
- Table component loads client-side with `next/dynamic` + `ssr: false`
- Trade-off: slight delay before table appears

All options must satisfy BOTH performance AND functionality budgets (see acceptance criteria).

## Why This Matters NOW
- **Wimbledon 2026 is LIVE** (through July 13) — tennis traffic at annual peak
- ATP/WTA pages are core traffic drivers for the site
- Slow pages during a major tournament = lost engagement + revenue
- This is the foundation for Phase 3 monetization (ads + betting affiliates)

## Acceptance Criteria

### Functionality Requirements
- [ ] ATP/WTA Live pages render **full ranking table** (100+ players visible, not just #1)
- [ ] Country filter works correctly (URL param `?country=USA` filters table)
- [ ] No "Loading table..." or Suspense fallback text persists in static HTML
- [ ] All existing table features work: sorting, pagination, live points, tournament badges
- [ ] Test passes: `npm test` (rewritten functional test, see below)

### Performance Requirements (BUDGETS — must meet ALL)
- [ ] **ATP Live:** TTFB ≤ 0.8s (target ≤ 0.20s), total ≤ 2.0s, size ≤ 300KB
- [ ] **WTA Live:** TTFB ≤ 0.8s (target ≤ 0.20s), total ≤ 2.0s, size ≤ 200KB
- [ ] Both pages use ISR (`export const revalidate = 60`) or equivalent caching strategy
- [ ] `npm run check:performance` shows both routes as ✅ FAST
- [ ] Production verification: `curl -I https://rankings123.com/atp-live` shows `x-vercel-cache: HIT` on second request

### Regression Prevention
- [ ] **Rewrite** `tests/atp-table-rendering.test.js` lines 79-117:
  - **Remove** the test that enforces `force-dynamic` and blocks ISR
  - **Replace with** outcome-based tests:
    1. Functional test: table renders with 50+ players, country filter works
    2. Performance test: TTFB ≤ 0.8s (fails if force-dynamic creeps back)
  - Test OUTCOMES (fast + working), not IMPLEMENTATION (force-dynamic vs ISR)
- [ ] Add comment in ATP/WTA page.tsx explaining the searchParams handling pattern
- [ ] Update `docs/perf-baseline.md` with new measurements after fix

### Verification Steps
1. Deploy to preview
2. Run `npm run check:performance` against preview URL → both routes FAST
3. Run `npm test` → all tests pass (including NEW performance test)
4. Manual check: visit `/atp-live` and `/atp-live?country=USA` → table renders correctly both times
5. Check Vercel edge caching: `curl -I [preview-url]/atp-live` twice → second request shows cache HIT
6. Deploy to production
7. Re-run performance check against rankings123.com → confirm TTFB improvements sustained
8. Monitor for 24h to ensure no client-side errors or rendering bugs

### Success Metrics
- ATP TTFB: 0.60s → ≤ 0.20s (-67% minimum)
- WTA TTFB: 0.33s → ≤ 0.20s (-39% minimum)
- ATP size: 393KB → ≤ 300KB (-24% minimum)
- WTA size: 171KB → ≤ 200KB (already within budget, maintain)
- Zero functional regressions (table works perfectly)
- Pattern documented so it never recurs
