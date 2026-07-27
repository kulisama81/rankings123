# Performance Report — 2026-07-27

**Status:** 🔴 **CRITICAL SIZE REGRESSION** — ShareButton feature broke WTA/ATP budgets  
**Inspector:** perf-inspector (daily cron)  
**Measurement:** `npm run check:performance` (HTTP fetch, uncompressed HTML)

---

## Executive Summary

**CRITICAL performance regression** detected on ATP and WTA Live pages from commit 7469e43 (2026-07-26) "Add auto-generated shareable ranking cards":

- **WTA Live:** 189KB → 250KB (+61KB, +32.3%) — was 5.5% UNDER budget for 8 days, now **25% OVER**
- **ATP Live:** 439KB → 504KB (+65KB, +14.8%) — worsened from 46% over to **68% over budget**

**Root cause:** ShareButton component (149 lines, "use client") rendered for EVERY player row in LiveRankingTable (~100 rows × 2 views = ~200 instances per page). Adds ~60-65KB to client-side hydration payload.

**Action:** Filed P1 ticket `perf-share-button-bloat` with suggested fixes (virtualization, single button per table, lazy-load, code-split).

---

## Measurements (2026-07-27)

| Route        | TTFB   | Total  | Size   | vs 2026-07-26 | Budget  | Status |
|--------------|--------|--------|--------|---------------|---------|--------|
| /            | 0.24s  | 0.26s  | 29KB   | +85% / +86% / +3.6% | ≤ 0.8s / 2.0s / 150KB | ✅ FAST |
| /atp-live    | 0.24s  | 0.37s  | 504KB  | +60% / -5% / **+14.8%** | ≤ 0.8s / 2.0s / 300KB | 🔴 SIZE FAIL |
| /wta-live    | 0.17s  | 0.29s  | 250KB  | +42% / +38% / **+32.3%** | ≤ 0.8s / 2.0s / 200KB | 🔴 SIZE FAIL |
| /world-cup   | 0.15s  | 0.25s  | 382KB  | +15% / -7% / +0.3% | ≤ 0.8s / 2.0s / 300KB | ⚠️ SIZE |

**Legend:**
- TTFB = Time to First Byte (server response start)
- Total = Full page load time (TTFB + network transfer)
- Size = Uncompressed HTML response size
- vs 2026-07-26 = TTFB% / Total% / Size% change

---

## Analysis

### 🔴 WTA Live — CRITICAL REGRESSION

**Size:** 189KB → 250KB (+61KB, +32.3%)  
**Budget:** 200KB  
**Status:** 25% OVER budget (was 5.5% UNDER for 8 consecutive days)

**Impact:**
- Undoes 8-day stable period (2026-07-19 to 2026-07-26)
- Mobile: 250KB on slow 3G = ~2.3s transfer time (was 1.8s)
- Blocks Phase 3 monetization (ads + betting affiliates)

**Root cause:** Commit 7469e43 added ShareButton to every row in LiveRankingTable

### 🔴 ATP Live — REGRESSION WORSENING

**Size:** 439KB → 504KB (+65KB, +14.8%)  
**Budget:** 300KB  
**Status:** 68% OVER budget (was 46% over)

**Impact:**
- Went from "stable but over" to "critically over"
- Mobile: 504KB on slow 3G = ~4.7s transfer time (was 4.1s)
- Blocks Phase 3 monetization

**Root cause:** Same as WTA — ShareButton on every row

### ⚠️ TTFB Variances (Likely Transient)

All routes show TTFB increases (+15% to +85%) but all remain within 0.8s budget:
- Homepage: 0.13s → 0.24s (+85%)
- ATP: 0.15s → 0.24s (+60%)
- WTA: 0.12s → 0.17s (+42%)
- World Cup: 0.13s → 0.15s (+15%)

**Why transient:**
1. No payload bloat correlation (Homepage +85% TTFB but only +1KB size)
2. Load times improved/stable (ATP -5%, WC -7%)
3. Pattern matches 15+ historical transient variances (all resolved within 1-2 days)
4. Multiple routes affected (suggests network/edge/CDN latency, not code)

**Monitoring:** Will re-measure tomorrow. If TTFB remains elevated, will file separate ticket.

### ✅ World Cup & Homepage — Stable

- **World Cup:** 381KB → 382KB (+1KB, +0.3% variance), load time improved -7%
- **Homepage:** 28KB → 29KB (+1KB, +3.6% variance), likely from About/Contact pages metadata

---

## Root Cause Deep Dive

**Commit 7469e43** (2026-07-26 15:19) "Add auto-generated shareable ranking cards":

**What was added:**
1. **ShareButton.tsx** — 149 lines, "use client" component
2. **LiveRankingTable.tsx** — modified to add `<ShareButton>` to every row (+28 lines)
3. **@vercel/og** npm package — server-side only, no client bundle impact

**How it's used:**
```tsx
// LiveRankingTable.tsx
{players.map(p => (
  <tr>
    {/* ... rank, name, points ... */}
    <td>
      <ShareButton
        type="rank-milestone"
        sport={tour}
        data={{ playerName, rank, points, countryCode, movement }}
        variant="icon"
      />
    </td>
  </tr>
))}
```

**Problem:**
- ~100 player rows per page
- Desktop view + mobile view = 2 table renderings
- **~200 ShareButton instances** rendered per page
- Each instance:
  - Is a "use client" component (adds to client-side bundle)
  - Has `useState` hooks for `copied` and `showPreview`
  - Includes inline SVG icons, hover preview logic, toast animations
- Total overhead: ~60-65KB per page

**Why this is expensive:**
- React hydration payload includes all component state and props
- 200 instances × ~300-350 bytes per instance = ~60-70KB
- All instances hydrate at once (not lazy)

---

## Code Changes Since 2026-07-26

1. `df8bfe2` — Auto: data-anomaly filed by data-sanity monitor (tickets only)
2. `c058d2e` — Autoresearch 2026-07-27 (tickets only)
3. `b791826` — Inspector 2026-07-26 late night (tickets only)
4. `0e5160e` / `ae1881a` — Auto: data-anomaly filed (tickets only)
5. `605c808` — Update changelog: About and Contact pages (changelog only)
6. `a14984f` — Add About and Contact pages for AdSense readiness (new pages, no impact on tennis)
7. **2026-07-26 evening:**
   - `7469e43` — **Add auto-generated shareable ranking cards** (REGRESSION ROOT CAUSE)

**No code changes** to ATP/WTA data feeds or rendering logic — regression is purely from the ShareButton feature.

---

## Suggested Fixes (from ticket `perf-share-button-bloat`)

1. **Virtualize ShareButtons** — only render for visible rows (react-window/react-virtual)
2. **Single share button per table** — one button at top-right, opens modal to select player
3. **Lazy-load ShareButton** — dynamic import (`next/dynamic`) that loads on hover/click
4. **Code-split** — extract ShareButton to separate chunk, load on interaction
5. **Optimize bundle** — inline SVGs, remove preview image preload, simplify component

**Recommendation:** Option 2 (single button) or Option 3 (lazy-load) will give best balance of UX + performance.

---

## Performance Budget Compliance

| Route        | Budget  | Current | Compliance |
|--------------|---------|---------|------------|
| /            | 150KB   | 29KB    | ✅ 81% under |
| /atp-live    | 300KB   | 504KB   | 🔴 68% over |
| /wta-live    | 200KB   | 250KB   | 🔴 25% over |
| /world-cup   | 300KB   | 382KB   | ⚠️ 27% over |

**Status:** 2 routes CRITICAL FAIL, 1 route warning

---

## Mobile Impact (3G Slow Network)

| Route        | Size   | 3G Transfer Time | vs Baseline |
|--------------|--------|------------------|-------------|
| /            | 29KB   | ~0.3s            | +0.01s      |
| /atp-live    | 504KB  | ~4.7s            | +0.6s       |
| /wta-live    | 250KB  | ~2.3s            | +0.5s       |
| /world-cup   | 382KB  | ~3.6s            | +0.01s      |

**Calculation:** 3G Slow = ~108 Kbps / 8 = ~13.5 KB/s transfer rate

**Impact:** WTA +0.5s and ATP +0.6s are significant on mobile. Each second of delay correlates with measurable engagement drop and ad viewability loss.

---

## Action Items

### Immediate (Filed Today)

1. ✅ **Filed P1 ticket** `perf-share-button-bloat`
   - WTA/ATP both over budget from ShareButton feature
   - Includes root cause analysis, suggested fixes, acceptance criteria
   - Priority 1 — WTA regression from within-budget to over-budget

2. ✅ **Updated docs/perf-baseline.md**
   - Marked WTA/ATP as 🔴 SIZE FAIL
   - Added 2026-07-27 Recent Changes entry with full analysis
   - Updated per-route notes with regression details

3. ✅ **Wrote this report** — docs/reports/2026-07-27-performance.md

### Next Steps (for planner)

1. **Fix the ShareButton regression** — ticket `perf-share-button-bloat` (P1)
   - Target: WTA < 200KB, ATP < 300KB
   - Re-run `npm run check:performance` to verify
   
2. **Monitor TTFB variances** — if TTFB remains elevated tomorrow, file separate ticket

---

## Core Web Vitals

**Status:** Not measured  
**Reason:** Agent lacks Skill tool for webapp-testing/Playwright

**Last measured:** 2026-07-11 (all routes GOOD — LCP < 2.5s, FCP < 1.8s, CLS 0.000)

**Note:** Despite HTML size bloat, user-perceived performance may remain good due to:
- Browser compression (gzip/brotli)
- Edge caching (Vercel ISR)
- Streaming HTML rendering

However, the size regression is still real and affects:
- Mobile users on metered connections
- Initial parse time
- SEO bots (may not benefit from compression)

**Recommendation:** Re-measure CWV after ShareButton fix to verify no user-facing regression.

---

## Conclusion

**CRITICAL size regression** from ShareButton feature (commit 7469e43) broke performance budgets on both tennis pages:
- WTA undid 8-day stable period (189KB → 250KB, 25% over budget)
- ATP worsened from 46% to 68% over budget (439KB → 504KB)

**Root cause:** ShareButton component rendered for every row (~200 instances per page) without lazy-loading or virtualization.

**Action:** Filed P1 ticket `perf-share-button-bloat` for planner to fix.

**TTFB variances** across all routes are likely transient (matches historical pattern) — monitoring tomorrow.
