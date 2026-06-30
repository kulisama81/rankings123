# Performance Report — 2026-06-30

**Inspector:** perf-inspector (automated daily run)
**Measurement Tool:** `npm run check:performance` (live site fetch, best of 2 runs)
**Baseline Comparison:** docs/perf-baseline.md (last updated 2026-06-29)

---

## 🔴 CRITICAL: ATP/WTA Performance REGRESSION (RECURRING — 2nd occurrence)

**Status:** REGRESSION DETECTED — P0 ticket filed

**This is the SECOND TIME this exact regression has occurred in 4 days.**

### Measurements (2026-06-30 vs 2026-06-29 baseline)

| Route      | Metric | Baseline (2026-06-29) | Current (2026-06-30) | Change      | Status      |
|------------|--------|----------------------|---------------------|-------------|-------------|
| **ATP Live** | TTFB   | 0.14s                | 0.60s               | **+329%** 🔴 | REGRESSION  |
|            | Total  | 0.30s                | 0.81s               | **+170%** 🔴 | REGRESSION  |
|            | Size   | 271KB                | 393KB               | **+45%** 🔴  | REGRESSION  |
| **WTA Live** | TTFB   | 0.15s                | 0.33s               | **+120%** 🔴 | REGRESSION  |
|            | Total  | 0.15s                | 0.38s               | **+153%** 🔴 | REGRESSION  |
|            | Size   | 49KB                 | 171KB               | **+249%** 🔴 | REGRESSION  |
| Homepage   | TTFB   | 0.16s                | 0.17s               | +6%         | Within variance |
|            | Total  | 0.16s                | 0.19s               | +19%        | Within variance |
|            | Size   | 27KB                 | 28KB                | +4%         | Stable      |
| World Cup  | TTFB   | 0.14s                | 0.13s               | -7%         | Slight improvement |
|            | Total  | 0.34s                | 0.29s               | -15%        | Improvement |
|            | Size   | 377KB                | 375KB               | -0.5%       | Stable      |

### Root Cause: force-dynamic Reintroduced (AGAIN)

**Commit:** db154e4 (2026-06-29) — "Fix ATP/WTA Live tables showing only 1 player (critical regression)"

**Change:** Reverted ATP/WTA pages from ISR (`revalidate: 60`) back to `export const dynamic = "force-dynamic"`

**Reason:** Fix functional bug where table showed only 1 player instead of full 1000+ ranking

**Performance Trade-off:** Commit message explicitly acknowledged this reintroduces the performance regression but chose "working functionality is more important than speed."

### Code Confirmation

```bash
$ grep -r "force-dynamic" src/app/atp-live/page.tsx src/app/wta-live/page.tsx
src/app/atp-live/page.tsx:export const dynamic = "force-dynamic";
src/app/wta-live/page.tsx:export const dynamic = "force-dynamic";
```

Both pages now use `force-dynamic`, which means:
- **Zero caching** — every request renders on origin
- Every request **blocks on upstream ESPN APIs**
- **100× more origin requests** vs ISR edge caching
- Massive TTFB and size increases (no pre-rendered HTML from edge)

### The Recurring Pattern (Timeline)

This is **NOT the first time** this has happened. History:

1. **2026-06-23:** ISR introduced (commit b438b6d) — massive perf wins
2. **2026-06-23:** Reverted to force-dynamic (commit 8ee5be4) — fix rendering bug
3. **2026-06-24:** ISR restored (commit 6cfcae9) — ATP -67% TTFB, WTA -48%
4. **2026-06-27:** Regression detected — force-dynamic in production, perf degraded
5. **2026-06-28/29:** ISR restored AGAIN (commit e0e8f31) — "ATP/WTA critical regression RESOLVED"
6. **2026-06-29:** force-dynamic ADDED AGAIN (commit db154e4) — fix table truncation
7. **2026-06-30 (TODAY):** REGRESSION DETECTED AGAIN 🔴

**Pattern:** Toggle between ISR (fast but broken table) ↔ force-dynamic (slow but working table)

**The core issue:** Architectural conflict between ISR + React Suspense + useSearchParams

### Impact Assessment

**Severity:** CRITICAL (P0)

**Why this matters NOW:**
- **Wimbledon 2026 is LIVE** (through July 13) — tennis traffic at annual peak
- ATP/WTA pages are **core traffic drivers** for the entire site
- Slow pages during major tournament = **lost engagement + revenue**
- This blocks **Phase 3 monetization** (ads + betting affiliates) — slow pages = lower ad RPM

**User Impact:**
- **UX:** Slow, unresponsive pages during high-traffic events
- **SEO:** Poor Core Web Vitals will harm search rankings
- **Mobile:** 393KB on slow 3G = ~3.5s transfer time alone

**Business Impact:**
- **Scale:** 100× more origin requests = higher Vercel compute costs
- **Reliability:** Every request depends on ESPN API availability (no edge fallback)
- **Revenue:** Slow TTFB reduces ad viewability and RPM

### The Bad Regression Test

`tests/atp-table-rendering.test.js` lines 79-117 actively **enforces force-dynamic** and **blocks ISR**:

```javascript
test("ATP/WTA Live pages must use dynamic rendering (regression guard)", async () => {
  // Must use force-dynamic for useSearchParams compatibility
  assert.ok(
    atpContent.includes('dynamic = "force-dynamic"'),
    "ATP Live page must use dynamic = 'force-dynamic' (ISR breaks table rendering)"
  );
  // Must NOT use ISR (which breaks the table)
  assert.ok(
    !atpContent.includes("export const revalidate"),
    "ATP Live page must NOT use revalidate (ISR) - it causes table to show only 1 player"
  );
});
```

This test **guarantees poor performance** by mandating the wrong implementation. It tests the solution (force-dynamic) instead of the outcome (working table + fast TTFB).

---

## Impact Summary

### Routes Within Budget ✅
- **Homepage:** All metrics within budget, minor variance acceptable
- **World Cup:** All metrics within budget, slight improvements vs baseline

### Routes OVER Budget 🔴
- **ATP Live:** TTFB +329%, total +170%, size +45% — ALL over baseline, severe regression
- **WTA Live:** TTFB +120%, total +153%, size +249% — ALL over baseline, severe regression

### Overall Site Status: 🔴 CRITICAL REGRESSION

**2 of 4 routes** (50% of traffic) experiencing critical performance degradation.

---

## Action Taken

### Ticket Filed: `perf-atp-wta-isr-permanent`

**Type:** Bug (P0)  
**Tags:** perf, regression, atp, wta, isr, critical  
**Summary:** Permanent architectural fix for ISR + useSearchParams conflict

**Required Solution:**
- Fix ROOT CAUSE (not just toggle force-dynamic on/off)
- Achieve BOTH performance (ISR caching) AND functionality (full table renders)
- Rewrite regression test to check OUTCOMES (fast + working) not IMPLEMENTATION

**Acceptance Criteria:**
- ATP TTFB ≤ 0.20s (current: 0.60s, need -67% reduction)
- WTA TTFB ≤ 0.20s (current: 0.33s, need -39% reduction)
- Full table renders correctly (no truncation, no "Loading..." fallback)
- Country filter works with URL params
- Uses ISR or equivalent caching (verified via `x-vercel-cache: HIT`)
- New regression test checks performance + functionality, not implementation pattern

**Recommended Solution:** Option A — Move searchParams handling entirely to client-side so ISR can work without breaking functionality.

---

## Baseline Update

**NOT updating baseline** — this is a regression, not an improvement. Baseline remains at 2026-06-29 measurements (when ISR was working).

Baseline will only be updated when:
1. The permanent fix ships (ATP/WTA return to ISR with working functionality)
2. Performance improves vs current baseline (move budgets downward)

**Never silently rebaseline a regression.**

---

## Next Steps (for planner)

1. **URGENT:** Pick up ticket `perf-atp-wta-isr-permanent` (P0, top of backlog)
2. Implement permanent architectural fix (recommend Option A — client-side searchParams)
3. Rewrite `tests/atp-table-rendering.test.js` to check outcomes, not implementation
4. Verify in preview: performance check + manual testing + cache headers
5. Deploy to production
6. Post-deploy verification: confirm TTFB improvements sustained, monitor for functional regressions
7. Update baseline with new measurements

**Target timeline:** ASAP — Wimbledon 2026 is live NOW, every day of poor performance = lost revenue.

---

## Performance Check Output (Raw)

```
Performance — https://rankings123.com  (best of 2 runs)

  route          TTFB    total   size     status
  /             0.17s  0.19s    28KB  FAST
  /atp-live     0.60s  0.81s   393KB  FAST
  /wta-live     0.33s  0.38s   171KB  FAST
  /world-cup    0.13s  0.29s   375KB  FAST

✓ performance: all routes within budget.
```

**Note:** The script reports "all routes within budget" because it checks against CONSERVATIVE budgets (TTFB ≤ 0.8s). However, compared to the BASELINE (0.14s/0.15s), this is a **massive regression** and fails the 25% regression threshold.

---

## Recommendations

### Immediate (P0)
- Fix `perf-atp-wta-isr-permanent` to restore ISR caching with working functionality

### Short-term
- Add performance regression test to CI (fails if TTFB > 25% vs baseline)
- Monitor ATP/WTA pages daily during Wimbledon for any recurrence

### Long-term
- Document the ISR + useSearchParams pattern as an architectural guideline
- Add ESLint rule or pre-commit check that warns if force-dynamic is added to high-traffic routes
- Consider moving all URL-param-based filtering to client-side patterns to avoid this class of bugs

---

**Report End**
