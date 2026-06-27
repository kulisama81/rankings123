# Performance Report — 2026-06-27

**Status:** 🔴 **CRITICAL REGRESSIONS DETECTED**

## Executive Summary

**Critical performance regressions** detected on all tennis pages (ATP/WTA Live + homepage):
- **ATP Live:** TTFB +259%, size +47% vs baseline
- **WTA Live:** TTFB +182%, size +212% vs baseline  
- **Homepage:** TTFB +65%, total +52% vs baseline
- **World Cup:** ✅ IMPROVED (TTFB -25%, size -10%)

**Root Cause:** Commit 3eec872 (2026-06-26) reverted ATP/WTA pages from ISR (`revalidate: 60`) to `force-dynamic` to fix a table rendering bug. This forces every request to hit origin/upstream APIs instead of serving from edge cache, causing massive TTFB increases.

**Impact:** Tennis pages are the core traffic drivers. A 259% TTFB increase directly harms:
- User engagement & retention (slow = bounce)
- SEO rankings (Core Web Vitals signal)
- Ad viewability & RPM (slow loads = fewer impressions)

**Dual Problem:** The current code has BOTH performance AND functional regressions:
1. **Performance:** `force-dynamic` → 259% TTFB increase
2. **Functional:** Production shows "Loading table..." fallback alongside loaded content (see ticket `suspense-fallback-bug`)

Both stem from the same root cause: conflict between ISR, React Suspense, and `useSearchParams`.

---

## Measurement Results

**Method:** `npm run check:performance` — 2 runs per route, best of 2
**Date:** 2026-06-27
**Baseline:** 2026-06-26

| Route       | TTFB (now) | TTFB (baseline) | Change    | Total (now) | Total (baseline) | Change   | Size (now) | Size (baseline) | Change   | Status |
|-------------|------------|-----------------|-----------|-------------|------------------|----------|------------|-----------------|----------|--------|
| /           | 0.38s      | 0.23s           | **+65%** 🔴 | 0.38s       | 0.25s            | **+52%** 🔴 | 24KB       | 24KB            | 0%       | ⚠️ SLOW |
| /atp-live   | 0.61s      | 0.17s           | **+259%** 🔴 | 0.70s       | 0.28s            | **+150%** 🔴 | 399KB      | 271KB           | **+47%** 🔴 | 🔴 CRITICAL |
| /wta-live   | 0.31s      | 0.11s           | **+182%** 🔴 | 0.41s       | 0.16s            | **+156%** 🔴 | 153KB      | 49KB            | **+212%** 🔴 | 🔴 CRITICAL |
| /world-cup  | 0.12s      | 0.16s           | **-25%** ✅ | 0.31s       | 0.37s            | **-16%** ✅ | 351KB      | 390KB           | **-10%** ✅ | ✅ IMPROVED |

**Legend:**
- 🔴 **CRITICAL:** > 100% regression
- ⚠️ **SLOW:** 25-100% regression
- ✅ **IMPROVED:** performance gain

**Regression Threshold:** >25% increase in TTFB/total or >15% increase in size

---

## Detailed Analysis

### 🔴 CRITICAL: ATP Live (/atp-live)

**Performance:**
- TTFB: 0.17s → 0.61s (+259%, +0.44s)
- Total: 0.28s → 0.70s (+150%, +0.42s)
- Size: 271KB → 399KB (+47.2%, +128KB)

**Status:** Still within budget (< 0.8s TTFB) but massive degradation from excellent → mediocre.

**Root Cause:**
- Commit 3eec872 (2026-06-26) restored `export const dynamic = "force-dynamic"` in `src/app/atp-live/page.tsx`
- This forces EVERY request to render dynamically on origin instead of serving from edge cache
- Every request blocks on upstream ESPN API calls (`getLiveData("atp")`)
- No caching, no edge optimization

**Why Changed:**
- Fixed table rendering regression where ISR + Suspense + useSearchParams caused "Loading table..." fallback to persist
- Previous fix (commit 6cfcae9, 2026-06-24) successfully used ISR with TTFB 0.17s, but that regressed again

**Impact:**
- User experience: 0.61s TTFB feels noticeably slower than 0.17s (3.6× worse)
- SEO: Slower TTFB hurts Core Web Vitals rankings
- Ad revenue: Slower page → lower viewability → lower RPM
- Scale risk: All requests hit origin → higher Vercel costs + API rate limit risk

**Related Functional Bug:**
Production currently shows "Loading table..." text alongside loaded content. See ticket `suspense-fallback-bug`.

---

### 🔴 CRITICAL: WTA Live (/wta-live)

**Performance:**
- TTFB: 0.11s → 0.31s (+182%, +0.20s)
- Total: 0.16s → 0.41s (+156%, +0.25s)
- Size: 49KB → 153KB (+212%, +104KB)

**Status:** Still within budget but massive degradation.

**Root Cause:** Same as ATP Live — commit 3eec872 restored `force-dynamic` rendering.

**Impact:** Same as ATP Live. WTA has lower overall traffic than ATP but still a core page.

---

### ⚠️ Homepage (/)

**Performance:**
- TTFB: 0.23s → 0.38s (+65%, +0.15s)
- Total: 0.25s → 0.38s (+52%, +0.13s)
- Size: 24KB → 24KB (unchanged)

**Status:** Still within budget but notable degradation.

**Root Cause:** TBD — homepage does NOT use `force-dynamic` (checked `src/app/page.tsx`).

**Possible Causes:**
1. **Transient network variance** (like ATP variance on 2026-06-25 that self-resolved)
2. **New Wimbledon tournament route** (commit 514d5ed) added complexity to sitemap or routing
3. **LiveWorldCupWidget** client-side polling impacting SSR

**Action:** Monitor in next run. If variance persists >2 runs, investigate further.

---

### ✅ World Cup (/world-cup)

**Performance:**
- TTFB: 0.16s → 0.12s (-25%, -0.04s) ✅
- Total: 0.37s → 0.31s (-16%, -0.06s) ✅
- Size: 390KB → 351KB (-10%, -39KB) ✅

**Status:** Improved across all metrics!

**Analysis:**
- Previous run (2026-06-26) showed +33% TTFB variance (0.12s → 0.16s)
- Current run shows return to 0.12s baseline → confirms variance was transient
- Size improvement (390KB → 351KB) suggests upstream ESPN data is lighter today (fewer matches/stats)

**Conclusion:** World Cup performance is healthy and stable.

---

## Root Cause Deep Dive

### The ISR + Suspense + useSearchParams Conflict

The ATP/WTA pages have a recurring architecture conflict:

**Components:**
1. `page.tsx` (server component) → calls `getLiveData()` → passes to `LiveRankingView`
2. `LiveRankingView.tsx` (server component) → wraps `LiveRankingTable` in `<Suspense fallback="Loading table...">`
3. `LiveRankingTable.tsx` (client component, uses `useSearchParams` for country filter)

**The Conflict:**
- ISR (static generation at build time): Pages are pre-rendered and cached at edge
- `useSearchParams`: Requires runtime client-side access to URL params
- React Suspense: Suspends components that aren't ready during SSR/ISR

**What Happens with ISR:**
During static generation, React tries to render `LiveRankingView`:
1. `LiveRankingTable` (client component) uses `useSearchParams`
2. SearchParams aren't available during static generation (no URL yet)
3. Component suspends
4. Suspense boundary renders fallback: "Loading table..."
5. Static HTML includes the fallback, NOT the table

**Result:** ISR generates HTML with only "Loading table..." → fast TTFB but broken UI.

**What Happens with force-dynamic:**
1. Every request renders on origin server at request time
2. SearchParams are available (real URL)
3. Component renders successfully with full table
4. Correct HTML sent to browser

**Result:** Correct UI but slow TTFB (no caching, origin render + upstream API fetch every time).

### Previous Fix Attempt (Commit 6cfcae9)

Commit 6cfcae9 (2026-06-24) claimed to solve this by:
> "Remove searchParams access from server components (forces dynamic)
> Keep useSearchParams in client component (LiveRankingTable) with Suspense"

But this regressed again, suggesting the fix was incomplete or reversed.

### The Correct Solution

The Suspense boundary is in the **server component** (`LiveRankingView`), but the client component inside it uses `useSearchParams`. This is the anti-pattern.

**Options:**
1. **Move Suspense inside client component** — wrap only the parts that truly suspend, not the whole client component
2. **Remove Suspense entirely** — if the component doesn't fetch async data, Suspense isn't needed
3. **Make searchParams optional** — default to "no filter" during SSR, hydrate with real params client-side
4. **Use a different filter mechanism** — e.g., client-side state, no URL params

The test file `tests/atp-table-rendering.test.js` enforces `force-dynamic` and explicitly forbids ISR:
```js
// Must have dynamic = "force-dynamic"
assert.ok(atpContent.includes('export const dynamic = "force-dynamic"'));
// Must NOT have revalidate
assert.ok(!atpContent.includes("export const revalidate"));
```

**This test is WRONG** — it enforces the performance anti-pattern. The test should verify correct rendering, not enforce a specific rendering mode.

---

## Performance Impact Analysis

### User Experience
**Per web.dev/vitals**, TTFB is a key signal for perceived speed:
- < 0.8s: Good
- 0.8s - 1.8s: Needs improvement
- \> 1.8s: Poor

Current ATP/WTA TTFB (0.61s, 0.31s) are still "Good" but degraded significantly from excellent baseline (0.17s, 0.11s).

**Perceived difference:**
- 0.17s → 0.61s: Users notice the delay (3.6× slower)
- Every 100ms of latency measurably reduces engagement

### SEO Impact
Google uses Core Web Vitals (including TTFB indirectly via LCP) as a ranking signal. Slower pages = lower rankings.

ATP/WTA are the primary SEO traffic drivers. A TTFB regression harms discoverability.

### Ad Revenue Impact
Slower page load → lower ad viewability → lower CPM/RPM.

A 0.44s TTFB increase on ATP means:
- Ads load 0.44s later
- Some users bounce before ads load
- Lower viewability % → networks pay less

For a sports site targeting premium ad networks (Mediavine, Ezoic), performance IS revenue.

### Scale & Cost Impact
`force-dynamic` means:
- EVERY request hits Vercel Functions (origin)
- EVERY request fetches from upstream ESPN APIs
- Higher Vercel compute costs
- Risk of hitting ESPN API rate limits under traffic spikes

ISR means:
- First request generates cached HTML
- Subsequent requests served from edge (instant)
- Background revalidation every 60s
- 99% of traffic hits cache, not origin

**Cost difference at scale:**
- 10,000 requests/day with ISR: ~100 origin renders (1%)
- 10,000 requests/day with force-dynamic: 10,000 origin renders (100%)
- 100× more compute usage with force-dynamic

---

## Tickets Filed

### Priority 0 (CRITICAL)

**`perf-atp-wta-isr-restore`** — Restore ISR caching on ATP/WTA pages while fixing Suspense conflict  
Fix the root cause of both performance AND functional regressions. Target: TTFB < 0.3s, no "Loading table..." fallback.

### Priority 2 (MEDIUM)

**`perf-homepage-regression`** (if variance persists in next run)  
Monitor homepage TTFB variance and investigate if it persists beyond 2 consecutive runs.

---

## Baseline Update

**NOT rebaselining the ATP/WTA regressions upward** (per CLAUDE.md — never silently rebaseline a regression).

**Updating monitoring notes:**
- ATP/WTA regressions are structural (force-dynamic), not transient
- Homepage variance may be transient (monitor next run)
- World Cup variance from 2026-06-26 confirmed resolved

**Baseline remains:**
- /: TTFB 0.23s (monitoring +65% variance)
- /atp-live: TTFB 0.17s (REGRESSION: now 0.61s, +259%)
- /wta-live: TTFB 0.11s (REGRESSION: now 0.31s, +182%)
- /world-cup: TTFB 0.16s (improved to 0.12s)

---

## Next Run Actions

1. **Monitor homepage** — if TTFB variance persists (still ~0.38s), investigate causes
2. **Re-measure Core Web Vitals** via Lighthouse if available (LCP/INP/CLS not yet measured)
3. **Verify ATP/WTA fix** — once ticket `perf-atp-wta-isr-restore` is closed, confirm TTFB returns to < 0.3s
4. **Bundle analysis** — run `@next/bundle-analyzer` to identify size regression causes (ATP +128KB, WTA +104KB)

---

## Performance Budget Compliance

| Route       | TTFB Budget | Current TTFB | Status | Total Budget | Current Total | Status | Size Budget | Current Size | Status |
|-------------|-------------|--------------|--------|--------------|---------------|--------|-------------|--------------|--------|
| /           | ≤ 0.8s      | 0.38s        | ✅ PASS | ≤ 2.0s       | 0.38s         | ✅ PASS | ≤ 150KB     | 24KB         | ✅ PASS |
| /atp-live   | ≤ 0.8s      | 0.61s        | ✅ PASS | ≤ 2.0s       | 0.70s         | ✅ PASS | ≤ 300KB     | 399KB        | 🔴 FAIL |
| /wta-live   | ≤ 0.8s      | 0.31s        | ✅ PASS | ≤ 2.0s       | 0.41s         | ✅ PASS | ≤ 200KB     | 153KB        | ✅ PASS |
| /world-cup  | ≤ 0.8s      | 0.12s        | ✅ PASS | ≤ 2.0s       | 0.31s         | ✅ PASS | ≤ 300KB     | 351KB        | 🔴 FAIL |

**Budget Pass Rate:** 10/12 (83%)

**Failures:**
- ATP Live size: 399KB vs 300KB budget (+33% over)
- World Cup size: 351KB vs 300KB budget (+17% over)

---

## Recommendations

### Immediate (P0)
1. **Fix ATP/WTA ISR conflict** (ticket `perf-atp-wta-isr-restore`)
   - Move Suspense boundary inside client component OR
   - Remove Suspense if not needed OR  
   - Make searchParams optional with SSR-safe default
   - Update regression test to verify RENDERING correctness, not enforce force-dynamic
   - Target: TTFB < 0.3s (back to baseline), no "Loading table..." fallback

### High Priority (P1)
2. **ATP Live size reduction** (ticket `perf-atp-page-size` already exists)
   - Current: 399KB (33% over budget)
   - Target: < 300KB
   - Solutions: lazy-load below-fold sections, code-split, optimize bundle

### Monitor (P2)
3. **Homepage variance** — if TTFB stays > 0.35s in next run, file ticket
4. **World Cup size** — 351KB is 17% over budget but improving trend (390KB → 351KB)

---

## Conclusion

**Critical regressions detected on core tennis pages** due to architectural conflict between performance (ISR) and functionality (Suspense + useSearchParams).

**Current state:** Functionality over performance (force-dynamic) — pages work but slow.

**Required:** Fix the root cause to achieve BOTH fast AND correct rendering.

**Impact:** Tennis pages are primary traffic drivers. A 259% TTFB regression directly harms engagement, SEO, and ad revenue.

**Priority:** P0 (highest) — block all other work until this is resolved.

---

**Next perf-inspector run:** 2026-06-28 (daily schedule)
