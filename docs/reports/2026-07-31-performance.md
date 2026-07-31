# Performance Report — 2026-07-31

## Summary

🔴 **CRITICAL SIZE REGRESSIONS PERSIST — ShareButton Feature (Day 5)**

ShareButton regression from commit 7469e43 (2026-07-26) **persists for a fifth consecutive day**. ATP and WTA Live pages remain critically over size budgets. Sizes stable (±1-2KB measurement variance). **Load times show variance (+18-24%) but within 2.0s budget**. TTFB improvements across tennis and World Cup routes.

**Root cause unfixed:** No code changes to ShareButton or tennis pages since regression introduced.

**Planner context:** Autoresearch reports planner down 5 days (ticket `loop-planner-down-5days` P0) — explains why P1 fix hasn't shipped.

---

## Measurements (2026-07-31 vs 2026-07-30)

**HTTP Fetch (`npm run check:performance`):**

| Route        | TTFB          | Total         | Size           | Status |
|--------------|---------------|---------------|----------------|--------|
| Homepage     | 0.26s (+86%)  | 0.27s (+69%)  | 29KB (stable)  | ✅ FAST |
| ATP Live     | 0.15s (-29%)  | 0.45s (+18%)  | 510KB (-0.4%)  | 🔴 SIZE FAIL |
| WTA Live     | 0.13s (-13%)  | 0.26s (+24%)  | 258KB (+0.4%)  | 🔴 SIZE FAIL |
| World Cup    | 0.13s (-13%)  | 0.24s (-8%)   | 382KB (stable) | ⚠️ SIZE |

**Core Web Vitals:** Not measured (agent lacks Skill tool for webapp-testing)

---

## Analysis

### Size Budgets

- 🔴 **ATP size regression PERSISTS:** 510KB (70% over 300KB budget, Day 5, -2KB data variance)
- 🔴 **WTA size regression PERSISTS:** 258KB (29% over 200KB budget, Day 5, +1KB data variance)
- ⚠️ **World Cup stable:** 382KB (27% over 300KB budget, unchanged)

**Size changes are measurement variance:**
- ATP -2KB (-0.4%), WTA +1KB (+0.4%)
- No code changes to ShareButton, tennis pages, or data feeds since 2026-07-30
- Natural data fluctuation (player counts, names, tournament strings)
- Root cause unfixed: ShareButton bloat from commit 7469e43 (2026-07-26) remains

### Load Times & TTFB

⚠️ **Load time variance detected (likely transient):**
- **Homepage:** Total +69% (0.16s → 0.27s), TTFB +86% (0.14s → 0.26s)
- **ATP Live:** Total +18% (0.38s → 0.45s)
- **WTA Live:** Total +24% (0.21s → 0.26s)

**Why load time variances are likely transient:**
1. **All within budget** — Homepage 0.27s, ATP 0.45s, WTA 0.26s, WC 0.24s (all < 2.0s)
2. **TTFB improved on tennis/WC** — ATP -29%, WTA -13%, WC -13% (homepage variance +86% suggests network/upstream latency)
3. **Sizes stable** — ATP -2KB, WTA +1KB, WC stable (no payload bloat)
4. **Multiple routes affected** — Homepage, ATP, WTA all show variance (not isolated code issue)
5. **Historical pattern** — Matches 15+ prior TTFB/load variances that resolved within 1-2 days without intervention
6. **No code changes** — Zero commits to app code since 2026-07-30 (only tickets/docs)

✅ **TTFB improvements:**
- ATP -29% (0.21s → 0.15s)
- WTA -13% (0.15s → 0.13s)
- World Cup -13% (0.15s → 0.13s)

✅ **World Cup load time improving:** -8% (0.26s → 0.24s)

---

## Code Changes Since 2026-07-30

1. `296b518` — Autoresearch 2026-07-31 (tickets only, reports planner down 5 days)
2. `f880005` — Inspector 2026-07-30 run 2 (tickets only)
3. `a34a42e` — Inspector 2026-07-30 run 1 (tickets only)

**No code changes** to ATP/WTA Live pages, ShareButton component, World Cup page, or data feeds.

---

## Impact

- 🔴 **Day 5 of critical size regressions** — both tennis pages (core traffic drivers) remain critically over budget
- ⚠️ **Planner down 5 days** — explains why P1 fix hasn't shipped (per autoresearch report)
- 📱 **Mobile:** WTA 258KB = ~2.4s on slow 3G, ATP 510KB = ~4.8s
- 💰 **Revenue:** Blocks Phase 3 monetization (ads + betting affiliates)
- 🏆 **FIFA World Cup 2026:** Tournament ENDED ~July 19 (12 days ago)
- ✅ **Load times within budget** — All routes < 2.0s despite size bloat and transient variance
- ✅ **TTFB within budget** — All routes < 0.8s (homepage 0.26s, tennis/WC 0.13-0.15s)

---

## Status

🔴 **CRITICAL SIZE REGRESSIONS PERSIST (Day 5)**

⚠️ **Load time variance (monitoring, likely transient)**

✅ **TTFB/total within budgets**

---

## Tickets

**Open:**
- `perf-share-button-bloat` (Priority 1) — OPEN, Day 5 (planner down, fix not shipped)

**No new tickets filed:**
- Regression already tracked in existing P1 ticket
- Load time variance likely transient (matches historical pattern)
- Sizes stable within measurement variance

---

## Recommendations

1. **Fix planner first** — Ticket `loop-planner-down-5days` (P0) blocking all build work
2. **Once planner restored:** `perf-share-button-bloat` (P1) should be next priority
3. **Monitor load time variance** — If Homepage/ATP/WTA variance persists tomorrow, investigate further
4. **Core Web Vitals measurement** — Consider enabling webapp-testing skill for real user metrics

---

## Next Steps

- Monitor load time variances (Homepage +69%, ATP +18%, WTA +24%) — expect resolution within 1-2 days
- Await planner restoration (P0 ticket filed by autoresearch)
- ShareButton fix should ship once planner operational
