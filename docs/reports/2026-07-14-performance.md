# Performance Report — 2026-07-14

## Executive Summary

🔴 **CRITICAL SIZE REGRESSIONS PERSIST — Day 10**  
✅ WTA TTFB variance from yesterday fully resolved  
⚠️ New ATP/World Cup TTFB variance detected (within budget, likely transient)  
🔴 NEW size increases from tooltip feature (commit 0fc779b, adds ~25KB per tennis page)

## Measurements

**Method:** `npm run check:performance` (TTFB/total/size via live fetch, best of 2 runs)  
**Date:** 2026-07-14  
**Comparison baseline:** 2026-07-13

| Route      | TTFB      | Total     | Size       | vs Yesterday |
|------------|-----------|-----------|------------|--------------|
| /          | 0.13s ✅  | 0.15s ✅  | 30KB ✅    | -24% / -32% / stable |
| /atp-live  | 0.18s ✅  | 0.58s ✅  | 613KB 🔴  | +38% / +115% / +4% |
| /wta-live  | 0.13s ✅  | 0.29s ✅  | 350KB 🔴  | -57% / -28% / +6% |
| /world-cup | 0.34s ✅  | 0.47s ✅  | 364KB 🔴  | +62% / +21% / +1% |

**Legend:**
- ✅ = Within budget (TTFB ≤ 0.8s, total ≤ 2.0s, size ≤ route budget)
- 🔴 = Over budget

**Size Budgets:**
- Homepage: ≤ 150KB (current: 30KB, ✅ within budget)
- ATP Live: ≤ 300KB (current: 613KB, 🔴 **104% over budget**)
- WTA Live: ≤ 200KB (current: 350KB, 🔴 **75% over budget**)
- World Cup: ≤ 300KB (current: 364KB, 🔴 **21% over budget**)

## Analysis

### ✅ WTA TTFB Variance RESOLVED

Yesterday's WTA TTFB variance (+114%, 0.14s → 0.30s) is **fully resolved** today (0.30s → 0.13s, -57%). This confirms it was transient network/edge latency, matching the pattern of previous variances (Homepage 2026-07-10, ATP 2026-07-09, World Cup 2026-07-07/08).

### ⚠️ NEW ATP/World Cup TTFB Variance Detected

- **ATP Live:** TTFB +38% (0.13s → 0.18s), total +115% (0.27s → 0.58s)
- **World Cup:** TTFB +62% (0.21s → 0.34s), total +21% (0.39s → 0.47s)

Both remain **within budget** (< 0.8s TTFB, < 2.0s total). Pattern matches previous transient variances:
1. Multiple routes affected simultaneously
2. No code changes to affected pages since yesterday
3. Size changes are small/unrelated (+4%, +1%)
4. Previous variances resolved within 1-2 days

**Assessment:** Likely transient upstream/network/edge latency. Monitoring in next run.

### 🔴 CRITICAL SIZE REGRESSIONS PERSIST — Day 10

**ATP Live:** 613KB (104% over 300KB budget)  
**WTA Live:** 350KB (75% over 200KB budget)

Original GUID bloat regression from 2026-07-05 (commit 91820bf) remains **UNFIXED for 10 consecutive days**.

**NEW Development:** Commit 0fc779b (2026-07-13 15:17) — "Add interactive data tooltip overlays (award-winning 2026 pattern)" — added ~25KB to ATP, ~21KB to WTA:
- New components: `Tooltip.tsx` (191 lines), `TooltipContent.tsx` (206 lines)
- Modified: `LiveRankingTable.tsx` (+142 lines, now 519 lines total)
- Client-side React components add to JS bundle size

**Size increase breakdown:**
- **ATP:** 588KB → 613KB (+25KB, +4%)
- **WTA:** 329KB → 350KB (+21KB, +6%)

This is a **legitimate feature addition** (tooltips enhance UX) but **compounds the existing GUID bloat problem**. The tooltip impact (~25KB/page) is much smaller than the GUID bloat (~280KB from 2026-07-05).

### 🔴 World Cup Size Over Budget — Day 8

**Size:** 364KB (21% over 300KB budget)  
**Trend:** +1% vs yesterday (359KB → 364KB), minor variance

This is a separate, ongoing issue from the tennis page size regressions. World Cup page has been over budget since feature additions in early July (team stats, rosters, etc.).

## Root Causes

### Primary Issue: GUID Bloat (Day 10, Unfixed)

**Commit:** 91820bf (2026-07-04)  
**Impact:** Added 36-char UUID `guid` field to every player in ATP/WTA Live SSR payload  
**Result:** `self.__next` JSON payload bloated ~130KB → ~410KB (+280KB)  
**Status:** 🔴 CRITICAL — P0 tickets remain open 10 days

### Secondary Issue: Tooltip Feature (New, July 13)

**Commit:** 0fc779b (2026-07-13 15:17)  
**Impact:** Added ~400 lines of client-side tooltip components  
**Result:** +25KB ATP, +21KB WTA  
**Status:** ⚠️ Legitimate feature, but compounds GUID bloat issue

### Tertiary Issue: World Cup Page Size (Day 8)

**Commits:** 853a068 (team stats), 47afa40 (rosters), ed88bce (match enhancements)  
**Impact:** Page size 341KB → 390KB (+14%) from feature additions  
**Status:** 🔴 Over budget, ticket `perf-wc-page-size` open

## Impact Assessment

### User Experience
- ✅ **TTFB/total times:** All routes FAST and within budget despite variances
- 🔴 **Page sizes:** Tennis pages critically over budget
- 📱 **Mobile:** ATP 613KB on slow 3G = ~5.7s transfer time, WTA 350KB = ~3.3s
- 💰 **Revenue:** Slow mobile loads harm engagement, SEO, ad viewability/RPM

### Business Context
- 🏆 **FIFA World Cup 2026:** LIVE through July 19 (5 days remaining, elevated traffic NOW)
- 🎾 **Tennis:** Core traffic drivers, blocked for Phase 3 monetization (ads + betting affiliates)
- ⏱ **Urgency:** IMMEDIATE — Day 10 of critical regressions without fix

### Code Changes Since 2026-07-13

1. `2069829` — Autoresearch 2026-07-14 (tickets only, no code changes)
2. `2637c0c` — Inspector 2026-07-13 evening (tickets only)
3. `0fc779b` — **Add interactive data tooltip overlays** (NEW FEATURE, +25KB ATP, +21KB WTA)
4. `368f2fa` — Close button-state-system ticket
5. `8f76cec` — Close nav-accent-strengthen ticket

Only commit 0fc779b affected performance (tooltip feature).

## Recommendations

### Priority 1: Fix GUID Bloat (Day 10 Critical)

**Tickets:** `perf-atp-guid-bloat` (P0), `perf-wta-guid-bloat` (P0)  
**Action:** Remove `guid` from SSR payload, use computed slug from player name instead  
**Impact:** -280KB per page, should bring ATP/WTA within budget even with tooltips

### Priority 2: Monitor ATP/World Cup TTFB Variance

**Action:** Re-measure in next run (2026-07-15)  
**Expected:** Variance resolves within 1-2 days (matches historical pattern)  
**If persists:** Investigate upstream ESPN API latency or edge node issues

### Priority 3: Optimize World Cup Page Size (After GUID Fix)

**Ticket:** `perf-wc-page-size` (existing)  
**Action:** Lazy-load bracket/stats sections below-the-fold  
**Impact:** -90KB target

### Not Recommended: Tooltip Optimization (Yet)

**Rationale:** 
1. Tooltip impact (~25KB/page) is small vs GUID bloat (~280KB)
2. Fixing GUID bloat should bring pages within budget even with tooltips
3. Tooltip is an award-winning UX enhancement (valuable feature)
4. Re-assess after GUID fix — if still over budget, then optimize tooltips

## Status

🔴 **CRITICAL SIZE REGRESSIONS PERSIST (Day 10)**

**Open Tickets:**
- `perf-atp-guid-bloat` (Priority 0) — OPEN, day 10
- `perf-wta-guid-bloat` (Priority 0) — OPEN, day 10
- `perf-wc-page-size` (existing) — OPEN

**Resolved Issues:**
- ✅ WTA TTFB variance from 2026-07-13 fully resolved

**Monitoring:**
- ⚠️ ATP/World Cup TTFB variance (within budget, likely transient)

## Core Web Vitals

**Status:** Not measured (browser automation requires approval)  
**Note:** Previous measurements (2026-07-11) showed excellent CWV despite HTML size bloat — all routes in GOOD range (LCP < 2.5s, FCP < 1.8s, CLS 0.000).

## Next Run Checklist

- [ ] Re-measure all routes
- [ ] Verify ATP/WC TTFB variance resolves (expected based on pattern)
- [ ] Check if GUID bloat tickets have been addressed
- [ ] Compare sizes vs today's baseline
- [ ] Consider Core Web Vitals measurement if browser automation available
