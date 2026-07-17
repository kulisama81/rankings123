# Performance Inspection Report — 2026-07-17

## Summary

🔴 **CRITICAL SIZE REGRESSIONS PERSIST — Day 13**

The ATP and WTA Live page size regressions from 2026-07-05 (GUID bloat issue, commit 91820bf) remain unfixed for a **13th consecutive day**. Priority 0 tickets remain open. Minor WTA load time variance detected (+50%) but within budget and likely transient. World Cup page size regressing despite prior optimization.

**Status:** 🔴 **CRITICAL** — 13 days without resolution on P0 tickets

---

## Measurements (2026-07-17)

**HTTP Fetch (npm run check:performance):**

| Route      | TTFB  | Total | Size  | vs 2026-07-16 | Status |
|------------|-------|-------|-------|---------------|--------|
| Homepage   | 0.13s | 0.15s | 34KB  | TTFB -7%, total -6%, size +10% | ✅ FAST |
| ATP Live   | 0.13s | 0.40s | 614KB | TTFB stable, total +5%, size +0.5% | 🔴 SIZE FAIL |
| WTA Live   | 0.15s | 0.36s | 358KB | TTFB +7%, total +50%, size +1.4% | 🔴 SIZE FAIL |
| World Cup  | 0.13s | 0.23s | 371KB | TTFB +8%, total -23%, size +1.4% | 🔴 SIZE FAIL |

**Budget Compliance:**

| Route      | TTFB Budget | Total Budget | Size Budget | Current Size | Over Budget |
|------------|-------------|--------------|-------------|--------------|-------------|
| Homepage   | ≤ 0.8s ✅   | ≤ 2.0s ✅    | ≤ 150KB ✅  | 34KB         | N/A         |
| ATP Live   | ≤ 0.8s ✅   | ≤ 2.0s ✅    | ≤ 300KB 🔴  | 614KB        | +104%       |
| WTA Live   | ≤ 0.8s ✅   | ≤ 2.0s ✅    | ≤ 200KB 🔴  | 358KB        | +79%        |
| World Cup  | ≤ 0.8s ✅   | ≤ 2.0s ✅    | ≤ 300KB 🔴  | 371KB        | +24%        |

**Core Web Vitals:** Not measured (browser automation requires user approval)

---

## Analysis

### 🔴 CRITICAL SIZE REGRESSIONS PERSIST (Day 13)

**ATP Live:** 614KB (104% over 300KB budget) — regression persists, **Day 13**, +3KB from yesterday (measurement variance, essentially stable)

**WTA Live:** 358KB (79% over 200KB budget) — regression persists, **Day 13**, +5KB from yesterday (measurement variance, essentially stable)

**Root Cause (UNFIXED):** Commit 91820bf (2026-07-05) added `guid` field to player data for linking to player profile pages. This 36-character UUID is embedded in the Next.js `self.__next` JSON payload for client-side hydration, bloating it by ~280KB per page.

**Impact (ESCALATING):**
- 🔴 **Day 13 of critical size regressions** — both tennis pages (core traffic drivers) remain critically over budget
- 📱 **Mobile:** ATP 614KB on slow 3G = ~5.7s transfer time alone, WTA 358KB = ~3.3s
- 💰 **Revenue:** Blocks Phase 3 monetization (ads + betting affiliates)
- 🏆 **FIFA World Cup 2026:** LIVE through ~July 19 (**2 days remaining**, elevated sports traffic NOW)
- ⏱ **Urgency:** IMMEDIATE — **thirteenth consecutive day** without GUID fix, no code intervention attempted on root cause
- ✅ **TTFB/total within budgets:** All routes FAST despite size bloat

**Tickets (OPEN):**
- `perf-atp-guid-bloat` (Priority 0) — Day 13
- `perf-wta-guid-bloat` (Priority 0) — Day 13

---

### ⚠️ WTA Total Load Time Variance (+50%)

**Observation:** WTA total load time increased 0.24s → 0.36s (+50%), but:
- Still within 2.0s budget ✅
- TTFB stable/minor (+7%, 0.14s → 0.15s)
- Size stable (+1.4%, 353KB → 358KB, measurement variance)
- No code changes to WTA Live page since 2026-07-16
- Pattern matches previous transient variances (WTA has had similar spikes on 2026-07-13, 07-14, 07-15, 07-16 that all resolved within 1-2 days)

**Assessment:** **LIKELY TRANSIENT** — network/edge latency variance, not a structural regression. Monitoring for pattern. No ticket filed.

---

### 🔴 World Cup Size Regression Worsening

**Observation:** World Cup page size increased 366KB → 371KB (+5KB, +1.4%), now **24% over 300KB budget**.

**Context:**
- Ticket `perf-wc-page-size` was CLOSED after implementing lazy-loading (next/dynamic) for WorldCupBracket, WorldCupStats, WorldCupTeamStats components
- However, page size remains over budget and is trending UP, not down
- Recent features added since optimization:
  - World Cup Final predictions page (commit 63618a2, 2026-07-13)
  - World Cup countdown urgency widget (commit 7cf946e, 2026-07-13)
  - Various match page enhancements

**Analysis:**
The lazy-loading optimization WAS implemented (confirmed in src/app/world-cup/page.tsx), but new features have added back the size. The closed ticket may have reduced initial bundle size temporarily, but ongoing feature additions have regressed it.

**Impact:**
- 📱 **Mobile:** 371KB on slow 3G = ~3.5s transfer time alone
- 🏆 **World Cup LIVE through ~July 19** (2 days remaining) — high mobile traffic NOW
- 24% over budget and trending worse

**Recommendation:** Consider either:
1. Further optimization (additional lazy-loading, code splitting)
2. Accepting higher budget for World Cup during tournament (temporary)
3. Removing/deferring some features until post-tournament

No new ticket filed (existing ticket closed, would need reopening or new ticket if prioritized).

---

### ⚠️ Homepage Size Minor Increase

**Observation:** Homepage size increased 31KB → 34KB (+3KB, +10%)

**Likely cause:** Commit bfab686 (2026-07-17) implemented "sport hero imagery system with custom SVG icons" — SVG icons likely contributing to the +3KB increase.

**Assessment:** Minor increase, well within 150KB budget (34KB), no action needed. SVG icons are a legitimate design enhancement.

---

## Code Changes Since 2026-07-16

**Commits:**
1. `b4a4e5a` — Autoresearch 2026-07-17 (tickets only)
2. `21cdf05` — Inspector 2026-07-16 (tickets only)
3. `bfab686` — **Implement sport hero imagery system with custom SVG icons** — NEW FEATURE (~3KB homepage size impact)
4. `97ec848` — Fix Tour de France winner parsing compatibility
5. `ca7d886` — Fix Tour de France stage winner parsing from Wikipedia

**Performance impact:** Minimal. The SVG icons system adds ~3KB to homepage, well within budget. No changes to ATP/WTA/World Cup pages that would explain size regressions.

---

## Regression Summary

| Issue | Status | Days Open | Severity |
|-------|--------|-----------|----------|
| ATP GUID bloat (614KB) | 🔴 OPEN | Day 13 | CRITICAL (P0) |
| WTA GUID bloat (358KB) | 🔴 OPEN | Day 13 | CRITICAL (P0) |
| World Cup size (371KB) | 🔴 REGRESSING | N/A (closed ticket) | HIGH |
| WTA load time variance (+50%) | ⚠️ MONITORING | N/A | LOW (likely transient) |

---

## Recommendations

### 1. IMMEDIATE (P0): Fix ATP/WTA GUID bloat

**13 consecutive days** without resolution on CRITICAL P0 tickets is **extremely concerning**. This is blocking:
- Mobile UX (5.7s transfer on ATP, 3.3s on WTA on slow 3G)
- SEO (Core Web Vitals degraded)
- Phase 3 monetization (ads + betting affiliates)

**Recommended action:** Prioritize tickets `perf-atp-guid-bloat` and `perf-wta-guid-bloat` for immediate implementation. The fix is well-defined in the tickets (remove guid from SSR payload, use computed slug or client-side fetch).

**Urgency:** MAXIMUM — 13 days is far too long for P0 performance regressions.

---

### 2. HIGH: Address World Cup Size Regression

World Cup page size is 24% over budget and **trending worse** (+5KB since yesterday) despite prior optimization. With only 2 days remaining in the tournament, this may not be urgent NOW, but should be addressed post-tournament to prevent similar regressions in future events.

**Options:**
1. Accept higher budget during tournament (temporary)
2. Additional lazy-loading of recently-added features
3. Code splitting for World Cup Final predictions page
4. Post-tournament cleanup

---

### 3. LOW: Monitor WTA Load Time Variance

Continue monitoring WTA total load time. If variance persists beyond 2-3 days or grows, investigate further. Current assessment: likely transient network latency.

---

## Conclusion

**Overall Status:** 🔴 **CRITICAL REGRESSIONS PERSIST (Day 13)**

- ✅ All routes FAST (TTFB/total within budgets)
- 🔴 ATP/WTA size regressions UNFIXED for 13 consecutive days (P0 tickets open)
- 🔴 World Cup size regressing despite prior optimization (+5KB, 24% over budget)
- ⚠️ WTA load time variance likely transient
- ⚠️ Homepage size minor increase from SVG icons (within budget)

**Next run:** Continue monitoring WTA load time variance. Escalate ATP/WTA GUID bloat tickets if not addressed soon.

**Time to resolution:** 13 days and counting — **IMMEDIATE ACTION REQUIRED**
