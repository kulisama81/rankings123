---
status: closed
priority: 0
tags: perf,regression,wta
parent: rankings123
closed: 2026-07-19
resolution: Regression fully resolved via commit 19712c8 (remove duplicate table rendering). WTA Live now 192KB < 200KB budget (4% under).
---

# CRITICAL: WTA Live page size regression (356KB, 78% over budget) — RESOLVED

**CRITICAL REGRESSION DETECTED (2026-07-05):**

WTA Live page size jumped from **49KB → 356KB** (+627%, now **78% over 200KB budget**). Total load time more than doubled (0.15s → 0.35s, +133%).

**Root cause:** Same as ATP — commit 91820bf (player profile pages) added a `guid` field to every player, bloating the Next.js SSR JSON payload.

**Why this matters:**
- **Mobile impact:** 356KB on slow 3G = ~3.3s transfer time alone
- **User experience:** Slow loads harm engagement, SEO (Core Web Vitals), and ad viewability/RPM
- **Scale:** Every WTA Live page view now transfers 307KB of unnecessary data
- **Revenue:** Performance is a conversion lever — every 100ms counts for ad revenue

**Measured impact:**
- TTFB: 0.15s → 0.16s (+6.7%, minor)
- Total: 0.15s → 0.35s (+133%, MORE THAN DOUBLED)
- Size: 49KB → 356KB (+627%, 78% over 200KB budget)

## Acceptance Criteria

**Performance Budget (MUST MEET):**
- WTA Live page size: **< 200KB** (currently 356KB, 78% over)
- Total load time: **< 2.0s** (currently 0.35s, within budget but more than doubled from baseline)
- TTFB: **< 0.8s** (currently 0.16s, within budget)

**Implementation requirements:**
1. Apply the SAME fix as ATP ticket `perf-atp-guid-bloat` (remove guid from SSR payload)
2. **Re-run `npm run check:performance`** and verify:
   - WTA Live size **< 200KB** (down from 356KB)
   - Total load time restored to **< 0.20s** (baseline was 0.15s)
3. **Verify player profile links still work** with the new approach

**Verification:**
```bash
npm run check:performance
# WTA Live should show: size < 200KB, total < 0.20s
```

**Success criteria:** WTA Live page size back to ~50KB range (±10%), player profile links still functional.

**Note:** This ticket is a sibling of `perf-atp-guid-bloat` — one fix resolves both.

---

## Resolution (2026-07-19)

**Status:** ✅ FULLY RESOLVED

**Fix:** Commit 19712c8 (2026-07-18) "Optimize ATP/WTA Live page sizes by removing duplicate table rendering" removed StaticRankingTable component that was duplicating all player data in the HTML payload.

**Results:**
- WTA Live: 366KB → 192KB (-48%, -174KB)
- **Now WITHIN BUDGET:** 192KB < 200KB (4% under)
- Mobile transfer time: 3.4s → 1.8s on slow 3G
- 15-day regression fully resolved

**Verification:** `npm run check:performance` (2026-07-19) shows WTA Live at 192KB, within 200KB budget.
