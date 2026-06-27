---
id: perf-atp-wta-isr-restore
status: open
deps: []
links: [suspense-fallback-bug]
created: 2026-06-27T00:00:00Z
type: bug
priority: 0
parent: rankings123
tags: [perf, atp, wta, critical]
---
# CRITICAL: Restore ISR caching on ATP/WTA pages — fix Suspense+useSearchParams conflict

## Problem

**CRITICAL performance regression** on ATP/WTA Live pages caused by `force-dynamic` rendering:

**Measured Impact (2026-06-27 vs baseline):**
- **ATP Live:** TTFB +259% (0.17s → 0.61s), size +47% (271KB → 399KB)
- **WTA Live:** TTFB +182% (0.11s → 0.31s), size +212% (49KB → 153KB)

**Root Cause:** Commit 3eec872 (2026-06-26) restored `export const dynamic = "force-dynamic"` in ATP/WTA page files to fix a table rendering bug. This forces every request to render on origin and fetch from upstream ESPN APIs, eliminating edge caching.

**Dual Problem:** Current code has BOTH issues:
1. **Performance:** force-dynamic → massive TTFB/size regression (this ticket)
2. **Functional:** "Loading table..." Suspense fallback persists in production (see linked ticket `suspense-fallback-bug`)

Both stem from the same architectural conflict: **ISR + React Suspense + useSearchParams**.

---

## Architecture Conflict

### Current Component Structure

```
src/app/atp-live/page.tsx (server component)
  ↓ export const dynamic = "force-dynamic"  ← THE PROBLEM
  ↓ calls getLiveData("atp")
  ↓ renders LiveRankingView

src/components/LiveRankingView.tsx (server component)
  ↓ wraps in <Suspense fallback="Loading table...">
  ↓ renders LiveRankingTable

src/components/LiveRankingTable.tsx (client component)
  ↓ "use client"
  ↓ useSearchParams() for country filter  ← CONFLICTS WITH ISR
```

### Why It Breaks with ISR

When page uses `export const revalidate = 60` (ISR):
1. Next.js pre-renders the page at build time (static generation)
2. `LiveRankingView` (server) wraps `LiveRankingTable` (client) in Suspense
3. During static generation, `LiveRankingTable` uses `useSearchParams()`
4. SearchParams aren't available at build time (no URL yet)
5. Component suspends → React renders the Suspense fallback: "Loading table..."
6. Static HTML contains ONLY the fallback, not the table
7. Result: ISR = fast TTFB but broken UI (shows "Loading table..." in production)

### Why It Works with force-dynamic

When page uses `export const dynamic = "force-dynamic"`:
1. Every request renders on origin server at request time (no static generation)
2. SearchParams are available (real request URL)
3. Component renders successfully with full table
4. Correct HTML sent to browser
5. Result: Correct UI but terrible performance (no caching, every request hits origin + upstream APIs)

---

## Previous Fix Attempts

**Commit 6cfcae9 (2026-06-24):** "Restore ISR caching on ATP/WTA pages while preserving country filter"
- Changed `force-dynamic` → `revalidate: 60`
- Claimed to fix by "removing searchParams access from server components"
- Performance recovered: ATP TTFB 0.39s → 0.18s, WTA 0.31s → 0.16s
- But this fix regressed again → table loading failures returned

**Commit 3eec872 (2026-06-26):** "Fix ATP/WTA Live ranking table regression - restore dynamic rendering"
- Reverted ISR → force-dynamic
- Fixed functional bug but destroyed performance
- Added test `tests/atp-table-rendering.test.js` that ENFORCES force-dynamic (anti-pattern!)

**Problem:** Ping-pong between functionality and performance. No lasting solution.

---

## The Correct Solution

The Suspense boundary is in the **server component** (`LiveRankingView`), wrapping a client component that uses `useSearchParams`. This is the anti-pattern.

### Option 1: Move Suspense Inside Client Component (RECOMMENDED)

**Change `LiveRankingView.tsx`:**
```tsx
// BEFORE (current — server component with Suspense)
export default function LiveRankingView({ tour, snapshot }: Props) {
  // ...stats logic...
  return (
    <div>
      <HeroBanner {...} />
      <Suspense fallback={<div>Loading table...</div>}>
        <LiveRankingTable tour={tour} initialSnapshot={snapshot} />
      </Suspense>
    </div>
  );
}

// AFTER (remove Suspense from server component)
export default function LiveRankingView({ tour, snapshot }: Props) {
  // ...stats logic...
  return (
    <div>
      <HeroBanner {...} />
      <LiveRankingTable tour={tour} initialSnapshot={snapshot} />
    </div>
  );
}
```

**Change `LiveRankingTable.tsx`:**
```tsx
// Inside the client component, wrap ONLY the parts that need Suspense
// OR remove Suspense entirely if not needed (component doesn't fetch async data)
```

**Why this works:**
- Server component renders fully during ISR (no suspended children)
- Client component handles searchParams client-side during hydration
- No Suspense boundary in server component → no fallback in static HTML
- ISR works + correct UI

### Option 2: Make SearchParams Optional

Make the country filter optional with SSR-safe default:

```tsx
// In LiveRankingTable.tsx
const searchParams = useSearchParams();
const country = searchParams?.get("country") ?? null; // Default: no filter

// During SSR/ISR, searchParams may be null → default to showing all players
// After hydration, real params applied client-side
```

**Why this works:**
- Component doesn't suspend during static generation (searchParams being null is fine)
- SSR renders full table (no filter)
- Client hydrates and applies filter if present in URL
- Slight flash of unfiltered → filtered, but beats broken UI

### Option 3: Remove Suspense Entirely

If `LiveRankingTable` doesn't fetch async data (it uses `initialSnapshot` prop), Suspense isn't needed:

```tsx
// LiveRankingView.tsx
<LiveRankingTable tour={tour} initialSnapshot={snapshot} />
// No Suspense wrapper
```

**Why this works:**
- No Suspense boundary → no fallback
- Component renders synchronously with prop data
- SearchParams accessed client-side after hydration

---

## Implementation Plan

1. **Diagnose exactly why commit 6cfcae9's fix regressed**
   - Read the diff from that commit
   - Check if later changes re-introduced server-side searchParams access
   - Verify the component structure matches what was intended

2. **Apply the correct fix** (Option 1 recommended):
   - Remove Suspense from `LiveRankingView.tsx` (server component)
   - Ensure `LiveRankingTable.tsx` (client component) handles searchParams safely
   - Optionally add internal Suspense in client component if needed

3. **Change ATP/WTA pages to ISR:**
   ```tsx
   // src/app/atp-live/page.tsx
   // src/app/wta-live/page.tsx
   
   // REMOVE:
   export const dynamic = "force-dynamic";
   
   // ADD:
   export const revalidate = 60; // ISR with 60s background revalidation
   ```

4. **Fix the regression test:**
   - **Current test** (WRONG): enforces `force-dynamic`, forbids ISR
   - **Correct test**: verifies table renders with multiple players, no "Loading table..." fallback
   - Test should be rendering-mode agnostic — it verifies OUTPUT, not implementation

   ```js
   // tests/atp-table-rendering.test.js
   
   // DELETE this (enforces wrong solution):
   test("ATP/WTA Live pages must use dynamic rendering (regression guard)", ...)
   
   // KEEP this (verifies correct rendering):
   test("ATP Live page renders full ranking table (not just Loading fallback)", ...)
   ```

5. **Run mechanical verification:**
   - `npm run build` — should succeed, show ISR indicators: `○ /atp-live  1m  1y`
   - `npm test` — all tests green (after fixing the test that enforces force-dynamic)
   - `npx eslint src --max-warnings=0` — clean
   - Local test: `npm run dev`, visit `/atp-live?country=USA` → table renders, filter works

6. **Independent verification** (subagent):
   - Render ATP/WTA pages with ISR
   - Verify NO "Loading table..." fallback in HTML
   - Verify table loads with multiple players
   - Verify country filter works (client-side)
   - Check for any hydration errors in browser console

7. **Post-deploy verification:**
   - `npm run check:performance` → confirm TTFB back to baseline:
     - ATP: TTFB < 0.3s (target: ~0.17s, current: 0.61s)
     - WTA: TTFB < 0.3s (target: ~0.11s, current: 0.31s)
   - Verify production (rankings123.com):
     - `/atp-live` → NO "Loading table..." text visible
     - `/wta-live` → NO "Loading table..." text visible
     - Test country filter: `/atp-live?country=USA` → filters to USA players only
   - Check browser console for hydration errors

---

## Acceptance Criteria

### Performance Budgets (PRIMARY CRITERIA)

**ATP Live (`/atp-live`):**
- TTFB < 0.3s (currently 0.61s, baseline 0.17s) ✅
- Total < 1.0s (currently 0.70s) ✅
- Size < 300KB (currently 399KB) — separate ticket `perf-atp-page-size` for size

**WTA Live (`/wta-live`):**
- TTFB < 0.3s (currently 0.31s, baseline 0.11s) ✅
- Total < 1.0s (currently 0.41s) ✅
- Size < 200KB (currently 153KB) ✅

**Measured via:** `npm run check:performance` (best of 2 runs)

### Functional Requirements

1. Visit `/atp-live` — table renders with 50+ players, NO "Loading table..." text
2. Visit `/wta-live` — table renders with 50+ players, NO "Loading table..." text
3. Country filter works: `/atp-live?country=USA` filters to USA players only
4. No hydration errors in browser console
5. ISR verified: `npm run build` shows `○ /atp-live  1m  1y` (ISR indicator)

### Regression Prevention

6. **Regression test updated:**
   - `tests/atp-table-rendering.test.js` verifies correct rendering (NO "Loading table..." fallback)
   - Test does NOT enforce force-dynamic (remove that anti-pattern test)
   - Test should PASS with ISR (revalidate: 60)

7. Add guard to prevent future regressions:
   - New test or check in CI: if ATP/WTA pages use `force-dynamic`, FAIL with message:
     "ATP/WTA pages must use ISR (revalidate: 60) for performance. If you need force-dynamic, you're re-introducing a known performance regression. See ticket perf-atp-wta-isr-restore."

### Build & Deploy

8. `npm run build` — succeeds
9. `npx eslint src --max-warnings=0` — clean
10. `npm test` — all tests green
11. Deploy to production → post-deploy verify:
    - `gh api repos/kulisama81/rankings123/commits/$(git rev-parse HEAD)/status` → success
    - Smoke test: `curl -I https://rankings123.com/atp-live` → 200
    - Content test: `curl -s https://rankings123.com/atp-live | grep -q "Jannik Sinner"` → found
    - NO "Loading table...": `! curl -s https://rankings123.com/atp-live | grep -q "Loading table"`
12. Re-run `npm run check:performance` against LIVE site → budgets met

---

## Impact

**Why This is P0 (CRITICAL):**

1. **Tennis pages are core traffic drivers** — ATP/WTA Live are the flagship features
2. **259% TTFB regression is MASSIVE** — measurably harms UX, SEO, ad revenue
3. **Blocks monetization** — slow pages = lower ad viewability = lower RPM
4. **Scale risk** — force-dynamic = 100× more origin requests = higher costs + API rate limit risk
5. **Dual regression** — both performance AND functional bugs present in production

**User Impact:**
- 0.61s TTFB (ATP) feels noticeably slower than 0.17s baseline
- Some users bounce before page loads
- "Loading table..." text makes site look broken/incomplete

**SEO Impact:**
- Slower TTFB → worse Core Web Vitals → lower Google rankings
- ATP/WTA pages are primary organic traffic sources

**Revenue Impact:**
- Slower page → lower ad viewability → lower CPM/RPM
- For Mediavine/Ezoic approval, performance is a ranking factor

**Cost Impact:**
- force-dynamic = 100× more Vercel Function invocations vs ISR
- Higher compute costs at scale
- Risk of hitting ESPN API rate limits

---

## Why Previous Fixes Failed

**Commit 6cfcae9 (2026-06-24):** Successfully restored ISR, but later regressed.

**Hypothesis:** A subsequent commit may have:
- Re-introduced server-side searchParams access
- Changed component structure in a way that breaks with ISR
- Modified Suspense boundaries

**Action:** Read commit 6cfcae9 diff and trace what changed after that to cause regression.

**Test Enforcement Anti-pattern:** Commit 3eec872 added a test that ENFORCES force-dynamic and FORBIDS ISR. This test codifies the performance regression as "correct". The test must be removed.

---

## Success Metrics

**Before (current):**
- ATP TTFB: 0.61s, size 399KB
- WTA TTFB: 0.31s, size 153KB
- Production shows "Loading table..." fallback
- Every request hits origin

**After (target):**
- ATP TTFB: < 0.3s (~0.17s baseline), size < 300KB
- WTA TTFB: < 0.3s (~0.11s baseline), size < 200KB
- Production shows NO "Loading table..." text
- 99% of requests served from edge cache (ISR)

**Performance win:** 50-75% TTFB reduction, 100× fewer origin requests

---

## Related Tickets

- `suspense-fallback-bug` — Functional bug (same root cause as this perf regression)
- `perf-atp-page-size` — ATP size over budget (separate from this TTFB issue)

---

## References

- **Commit 3eec872:** Restored force-dynamic (introduced this regression)
- **Commit 6cfcae9:** Previous ISR restoration (successful but later regressed)
- **Commit 8ee5be4:** Original force-dynamic change (to fix table bug)
- **Test:** `tests/atp-table-rendering.test.js` (enforces wrong solution — must fix)
- **Performance Report:** `docs/reports/2026-06-27-performance.md`
- **Baseline:** `docs/perf-baseline.md`

---

**Assigned to:** planner (auto-pick highest priority)
**Estimated effort:** 2-4 hours (diagnose → fix → test → verify)
**Urgency:** IMMEDIATE — blocks monetization, harms core UX
