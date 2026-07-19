---
status: open
priority: 1
tags: perf,regression,atp
parent: rankings123
updated: 2026-07-19
---

# ATP Live page size regression (446KB, 49% over budget) — IMPROVING

**REGRESSION DETECTED (2026-07-05), NOW IMPROVING (2026-07-19):**

ATP Live page size jumped from **271KB → 591KB** (+118%) on 2026-07-05. After optimization (commit 19712c8), now **446KB** (49% over 300KB budget). Major improvement but still over budget.

**Root cause:** Commit 91820bf (player profile pages) added a `guid` field to every player. This 36-character UUID is now embedded in the Next.js `self.__next` JSON payload for client-side hydration, bloating it from ~130KB to ~410KB (+280KB!).

**Why this matters:**
- **Mobile impact:** 591KB on slow 3G = ~5.5s transfer time alone
- **User experience:** Slow loads harm engagement, SEO (Core Web Vitals), and ad viewability/RPM
- **Scale:** Every ATP Live page view now transfers 320KB of unnecessary data
- **Revenue:** Performance is a conversion lever — every 100ms counts for ad revenue

**Technical analysis:**
The `guid` field is only needed for linking to player pages (`/atp/player/[guid]`), NOT for rendering the ranking table itself. It should not bloat the SSR payload.

**Measured impact (2026-07-05):**
- TTFB: 0.12s → 0.13s (+8%, minor)
- Total: 0.19s → 0.39s (+105%, DOUBLED)
- Size: 271KB → 591KB (+118%, 97% over 300KB budget)
- `self.__next` JSON payload: ~130KB → ~410KB (+280KB)

**Progress (2026-07-19):**
- Size: 620KB → 446KB (-28%, -174KB) via commit 19712c8
- Still over budget: 446KB vs 300KB (49% over, need -33% more)
- Major improvement but not fully resolved
- Mobile transfer time: 5.8s → 4.2s on slow 3G

## Acceptance Criteria

**Performance Budget (MUST MEET):**
- ATP Live page size: **< 300KB** (currently 446KB, 49% over — improved from 591KB/620KB)
- Total load time: **< 2.0s** (currently 0.43s, within budget) ✅
- TTFB: **< 0.8s** (currently 0.26s, within budget) ✅

**Implementation requirements:**
1. ✅ PARTIAL: Removed duplicate StaticRankingTable rendering (commit 19712c8) — reduced 620KB → 446KB
2. 🟡 REMAINING: Further optimization needed to reach < 300KB budget (need -33% more reduction)
3. Possible next steps:
   - **Virtualization** (render only visible rows) — expected -100-150KB
   - **Code splitting** (lazy-load tooltip/filter features) — expected -20-40KB
   - **Data pruning** (defer non-essential fields to client fetch) — expected -30-50KB
4. **Re-run `npm run check:performance`** and verify:
   - ATP Live size **< 300KB** (currently 446KB, target -146KB more)
5. **Add regression guard:** Update performance test to FAIL if ATP Live page size exceeds budget
6. **Verify player profile links still work** with the new approach ✅ (working as of 2026-07-19)

**Verification:**
```bash
npm run check:performance
# ATP Live should show: size < 300KB, total < 0.25s
```

**Success criteria:** ATP Live page size back to ~270KB range (±10%), player profile links still functional.

---

## Progress Update (2026-07-19)

**Status:** 🟡 IMPROVING (downgraded from P0 to P1)

**Partial Fix:** Commit 19712c8 (2026-07-18) "Optimize ATP/WTA Live page sizes by removing duplicate table rendering" removed StaticRankingTable component.

**Results:**
- ATP Live: 620KB → 446KB (-28%, -174KB)
- Still OVER BUDGET: 446KB vs 300KB (49% over, need -146KB more to hit budget)
- Mobile transfer time: 5.8s → 4.2s on slow 3G
- **Major improvement but not fully resolved**

**Why ATP still over budget while WTA is under:**
- ATP has ~100 players in live view (vs WTA's smaller top set)
- ATP Deep ranking integration includes more data fields
- Further optimization needed (likely virtualization, per ticket `atp-wta-size-optimization`)

**Next Steps:** See ticket `atp-wta-size-optimization` for virtualization/code-splitting strategies to reach < 300KB budget.

**Verification:** `npm run check:performance` (2026-07-19) shows ATP Live at 446KB, 49% over 300KB budget.
