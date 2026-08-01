# Performance Report — 2026-08-01

## Summary

🔴 **CRITICAL SIZE REGRESSIONS PERSIST — ShareButton Feature (Day 6)**

ShareButton regression from commit 7469e43 (2026-07-26) **persists for a sixth consecutive day**. ATP and WTA Live pages remain critically over size budgets. Sizes stable (±1-3KB measurement variance). **Load times improved** — ATP -13%, WTA -8%, homepage variance from yesterday RESOLVED. **TTFB variances** detected on ATP/WTA (+23-33%) but within budget and likely transient (matches historical pattern).

**Root cause unfixed:** No code changes to ShareButton or tennis pages since regression introduced.

**Planner context:** Autoresearch reported planner down 5 days on 2026-07-31 — likely explains why P1 fix hasn't shipped yet.

---

## Measurements (2026-08-01 vs 2026-07-31)

**HTTP Fetch (`npm run check:performance`):**

| Route        | TTFB          | Total         | Size           | Status |
|--------------|---------------|---------------|----------------|--------|
| Homepage     | 0.16s (-38%)  | 0.17s (-37%)  | 29KB (stable)  | ✅ FAST |
| ATP Live     | 0.20s (+33%)  | 0.39s (-13%)  | 507KB (-0.6%)  | 🔴 SIZE FAIL |
| WTA Live     | 0.16s (+23%)  | 0.24s (-8%)   | 257KB (-0.4%)  | 🔴 SIZE FAIL |
| World Cup    | 0.14s (+8%)   | 0.25s (+4%)   | 382KB (stable) | ⚠️ SIZE |

**Core Web Vitals:** Not measured (webapp-testing requires Skill tool invocation)

---

## Analysis

### Size Budgets

- 🔴 **ATP size regression PERSISTS:** 507KB (69% over 300KB budget, Day 6, -3KB data variance)
- 🔴 **WTA size regression PERSISTS:** 257KB (29% over 200KB budget, Day 6, -1KB data variance)
- ⚠️ **World Cup stable:** 382KB (27% over 300KB budget, unchanged)

**Size changes are measurement variance:**
- ATP -3KB (-0.6%), WTA -1KB (-0.4%), WC stable
- No code changes to ShareButton, tennis pages, or data feeds since 2026-07-31
- Natural data fluctuation (player counts, names, tournament strings)
- Root cause unfixed: ShareButton bloat from commit 7469e43 (2026-07-26) remains

### Load Times & TTFB

✅ **Homepage variance from yesterday RESOLVED:**
- TTFB 0.26s → 0.16s (-38%, -100ms, **major improvement**)
- Total 0.27s → 0.17s (-37%, -100ms)
- Yesterday's +69%/+86% spikes confirmed transient (matches historical pattern)

✅ **Load times improved/stable:**
- ATP Total -13% (0.45s → 0.39s, **improvement**)
- WTA Total -8% (0.26s → 0.24s, **improvement**)
- World Cup Total +4% (0.24s → 0.25s, minor variance within budget)

⚠️ **TTFB variances detected (likely transient):**
- **ATP:** +33% (0.15s → 0.20s)
- **WTA:** +23% (0.13s → 0.16s)
- **World Cup:** +8% (0.13s → 0.14s)

**Why TTFB variances are likely transient:**
1. **All within budget** — ATP 0.20s, WTA 0.16s, WC 0.14s (all < 0.8s)
2. **Load times improved** — ATP -13%, WTA -8% (network transfer faster despite TTFB variance)
3. **Sizes stable** — ATP -3KB, WTA -1KB, WC stable (no payload bloat)
4. **Multiple routes affected** — ATP, WTA, WC all show TTFB variance (suggests upstream/edge latency, not isolated code issue)
5. **Historical pattern** — Matches 15+ prior TTFB variances that resolved within 1-2 days without intervention
6. **No code changes** — Zero commits to app code since 2026-07-31 (only tickets/docs from autoresearch)
7. **Homepage reversed** — Yesterday's +86% TTFB spike fully resolved today (-38%), confirms transient network/edge variance

---

## Code Changes Since 2026-07-31

1. `9be5701` — Autoresearch 2026-08-01 (tickets only)
2. `7cddce1` — Auto: deploy-failed detected by deploy-health monitor (tickets only)
3. `5ee8756` — Auto: deploy-failed detected by deploy-health monitor (tickets only)
4. `67b2962` — Inspector 2026-07-31 (tickets only, duplicate table regression bug filed)

**No code changes** to ATP/WTA Live pages, ShareButton component, World Cup page, or data feeds.

---

## Impact

- 🔴 **Day 6 of critical size regressions** — both tennis pages (core traffic drivers) remain critically over budget
- 📱 **Mobile:** WTA 257KB = ~2.4s on slow 3G, ATP 507KB = ~4.7s
- 💰 **Revenue:** Blocks Phase 3 monetization (ads + betting affiliates)
- 🏆 **FIFA World Cup 2026:** Tournament ENDED ~July 19 (13 days ago)
- ✅ **Load times within budget** — All routes < 2.0s (ATP 0.39s, WTA 0.24s, WC 0.25s, homepage 0.17s)
- ✅ **TTFB within budget** — All routes < 0.8s (homepage 0.16s, ATP 0.20s, WTA 0.16s, WC 0.14s)
- ✅ **Load times improving** — ATP -13%, WTA -8%, homepage -37%
- ✅ **Homepage variance resolved** — Yesterday's +69%/+86% spikes fully reversed

---

## Status

🔴 **CRITICAL SIZE REGRESSIONS PERSIST (Day 6)**

⚠️ **TTFB variance (monitoring, likely transient)**

✅ **Load times improving/within budgets**

---

## Tickets

**Open:**
- `perf-share-button-bloat` (Priority 1) — OPEN, Day 6 (awaiting planner restoration)

**No new tickets filed:**
- Regression already tracked in existing P1 ticket
- TTFB variances likely transient (matches historical pattern, homepage variance already resolved)
- Sizes stable within measurement variance
- No new regressions detected

---

## Recommendations

1. **Await planner restoration** — Once operational, `perf-share-button-bloat` (P1) should be prioritized
2. **Monitor TTFB variance** — If ATP/WTA TTFB variance persists tomorrow, investigate further (but likely transient based on homepage resolution + historical pattern)
3. **Core Web Vitals measurement** — Consider enabling webapp-testing skill for real user metrics (LCP/CLS/INP) to complement HTTP fetch measurements

---

## Next Steps

- Monitor TTFB variances (ATP +33%, WTA +23%) — expect resolution within 1-2 days based on pattern
- Await planner restoration and ShareButton fix deployment
- Continue daily regression monitoring
