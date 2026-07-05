---
status: open
priority: 0
tags: perf,regression,atp
parent: rankings123
---

# CRITICAL: ATP Live page size regression (591KB, 97% over budget)

**CRITICAL REGRESSION DETECTED (2026-07-05):**

ATP Live page size jumped from **271KB → 591KB** (+118%, now **97% over 300KB budget**). Total load time doubled (0.19s → 0.39s, +105%).

**Root cause:** Commit 91820bf (player profile pages) added a `guid` field to every player. This 36-character UUID is now embedded in the Next.js `self.__next` JSON payload for client-side hydration, bloating it from ~130KB to ~410KB (+280KB!).

**Why this matters:**
- **Mobile impact:** 591KB on slow 3G = ~5.5s transfer time alone
- **User experience:** Slow loads harm engagement, SEO (Core Web Vitals), and ad viewability/RPM
- **Scale:** Every ATP Live page view now transfers 320KB of unnecessary data
- **Revenue:** Performance is a conversion lever — every 100ms counts for ad revenue

**Technical analysis:**
The `guid` field is only needed for linking to player pages (`/atp/player/[guid]`), NOT for rendering the ranking table itself. It should not bloat the SSR payload.

**Measured impact:**
- TTFB: 0.12s → 0.13s (+8%, minor)
- Total: 0.19s → 0.39s (+105%, DOUBLED)
- Size: 271KB → 591KB (+118%, 97% over 300KB budget)
- `self.__next` JSON payload: ~130KB → ~410KB (+280KB)

## Acceptance Criteria

**Performance Budget (MUST MEET):**
- ATP Live page size: **< 300KB** (currently 591KB, 97% over)
- Total load time: **< 2.0s** (currently 0.39s, within budget but doubled from baseline)
- TTFB: **< 0.8s** (currently 0.13s, within budget)

**Implementation requirements:**
1. Remove `guid` from SSR payload — the ranking table doesn't need it in the initial HTML/JSON
2. Implement one of these solutions:
   - **Option A (recommended):** Use a computed slug from player name (e.g., `/atp/player/novak-djokovic-1`) instead of guid. Simpler, no extra fetch, SEO-friendly.
   - **Option B:** Fetch guid client-side only when user hovers/clicks a player link (lazy-load)
   - **Option C:** Use server-side lookup in the player page route — accept name slug in URL, resolve to guid server-side
3. **Re-run `npm run check:performance`** and verify:
   - ATP Live size **< 300KB** (down from 591KB)
   - `self.__next` JSON payload **< 150KB** (down from ~410KB)
   - Total load time restored to **< 0.25s** (baseline was 0.19s)
4. **Add regression guard:** Update performance test to FAIL if ATP/WTA Live page size exceeds budget
5. **Verify player profile links still work** with the new approach

**Verification:**
```bash
npm run check:performance
# ATP Live should show: size < 300KB, total < 0.25s
```

**Success criteria:** ATP Live page size back to ~270KB range (±10%), player profile links still functional.
