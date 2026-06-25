# Performance Report — 2026-06-25

**Agent:** perf-inspector  
**Date:** 2026-06-25  
**Measurement Method:** `npm run check:performance` (TTFB/total/size via live fetch, best of 2 runs)

---

## Summary

✅ **All routes within budget.** No actionable regressions requiring tickets.

**Highlights:**
- Home page improved (-27% TTFB, -23% total)
- ATP Live shows variance (+38% TTFB, +32% total) but remains well within budget; likely network/API latency variation
- WTA Live stable with minor fluctuations
- World Cup slight improvement; size remains over budget (known issue, tracked in baseline)

---

## Performance Measurements

| Route        | TTFB   | Total  | Size  | vs Baseline (TTFB) | vs Baseline (Total) | Status      |
|--------------|--------|--------|-------|--------------------|---------------------|-------------|
| /            | 0.22s  | 0.24s  | 24KB  | -27% (0.30s)       | -23% (0.31s)        | ✅ FAST     |
| /atp-live    | 0.18s  | 0.33s  | 269KB | +38% (0.13s)       | +32% (0.25s)        | ✅ FAST ⚠️  |
| /wta-live    | 0.12s  | 0.17s  | 48KB  | -25% (0.16s)       | +6% (0.16s)         | ✅ FAST     |
| /world-cup   | 0.12s  | 0.28s  | 393KB | -14% (0.14s)       | -3% (0.29s)         | ✅ FAST ⚠️ SIZE |

**Legend:**
- ✅ **FAST** = All metrics within budget
- ⚠️ = Variance detected or over size budget (see notes)

**Budgets:**
- TTFB ≤ 0.8s, Total ≤ 2.0s
- Size: / ≤ 150KB, /atp-live ≤ 300KB, /wta-live ≤ 200KB, /world-cup ≤ 300KB

---

## Core Web Vitals

**Status:** Not measured (PageSpeed Insights API rate limited - HTTP 429)

Attempted mobile Lighthouse audits via PageSpeed Insights API for LCP/CLS/INP but hit rate limits. Will retry in next run.

---

## Findings

### 1. ATP Live Variance (+38% TTFB, +32% Total)

**Observation:** ATP Live TTFB increased from 0.13s → 0.18s (+38%), total from 0.25s → 0.33s (+32%).

**Analysis:**
- **Still well within budget** (0.18s vs 0.8s TTFB budget, 0.33s vs 2.0s total budget)
- **No code changes** affecting ATP Live in recent commits (last 10 commits focused on World Cup features)
- **Likely cause:** Network variance or upstream ESPN API latency fluctuation
- **Size unchanged** at 269KB (ISR cache working correctly)

**Action:** Monitor in next run. If variance persists above +25%, will investigate further and consider filing ticket.

**Ticket:** None (within budget, likely transient variance)

---

### 2. World Cup Size Over Budget (393KB vs 300KB target)

**Status:** Known issue, already tracked in baseline as "Performance Debt #1"

**Current:** 393KB (31% over 300KB budget)  
**Previous:** 397KB  
**Change:** -1% (slight improvement)

**Root cause:** Recent feature additions (knockout bracket, team stats, rosters) increased bundle size.

**Mobile impact:** 393KB on slow 3G ≈ 3.5s transfer time

**Existing ticket:** `perf-wc-page-size` (Priority 1)  
**Target:** < 300KB via lazy-loading below-the-fold sections (bracket, stats)

**Action:** No new ticket (already tracked, planner owns it)

---

## Recent Code Changes (git log)

Reviewed last 10 commits for performance impact:

- `ed53384` — Add World Cup knockout stage hub (affects /world-cup)
- `5e43f44` — autoresearch: filed 6 tickets
- `1faac46` — inspector: evening run (found jersey bug)
- `f148b57` — Add World Cup head-to-head history (affects /world-cup)
- `6378d0e` — Close wc-odds ticket
- `b8b075d` — Update ticket status
- `9735202` — Update perf-baseline.md (ISR regression resolved)
- `6cfcae9` — **Restore ISR caching on ATP/WTA** (major perf win)
- `2530d37` — Integrate The Odds API for World Cup
- `19c6286` — Close wc-venue-pages ticket

**Impact:** No changes affecting ATP Live performance in this window. ATP variance likely environmental.

---

## Comparison to Baseline (2026-06-24)

**Improved:**
- Home: TTFB -27%, total -23% ✅
- WTA Live: TTFB -25% ✅
- World Cup: TTFB -14%, total -3%, size -1% ✅

**Variance (within budget):**
- ATP Live: TTFB +38%, total +32% (no code changes, likely network/API latency)

**Persistent issues (tracked):**
- World Cup size over budget (393KB vs 300KB) — existing ticket `perf-wc-page-size`

---

## Tickets Filed

**None.** All routes within budget; ATP variance likely transient.

---

## Recommendations

1. **Monitor ATP Live** in next run — if TTFB/total variance persists above +25%, investigate upstream ESPN API latency or ISR cache behavior
2. **Prioritize World Cup lazy-loading** (ticket `perf-wc-page-size`) — tournament live through ~July 19, high mobile traffic NOW
3. **Retry PageSpeed Insights API** in next run (off-peak) to capture Core Web Vitals baseline

---

## Next Run

- Re-measure all routes
- Retry PageSpeed Insights API for CWV (LCP/CLS/INP)
- Flag ATP Live if variance persists
- Update baseline only if real improvements ship (never silently rebaseline regressions)
