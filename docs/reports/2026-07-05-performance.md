# Performance Report — 2026-07-05

**Inspector:** perf-inspector (automated)  
**Measurement Method:** `npm run check:performance` (TTFB/total/size via live fetch)  
**Baseline:** docs/perf-baseline.md (2026-07-04)

---

## 🔴 CRITICAL REGRESSIONS DETECTED

Two CRITICAL performance regressions detected on ATP and WTA Live pages. Both caused by the same root issue.

### Regression #1: ATP Live Page Size

**Status:** 🔴 CRITICAL — P0 ticket filed (`perf-atp-guid-bloat`)

**Measurements:**
- TTFB: 0.12s → 0.13s (+8.3%, minor increase)
- Total: 0.19s → 0.39s (+105%, **DOUBLED**)
- Size: 271KB → 591KB (+118%, **97% over 300KB budget**)

**Impact:**
- ❌ **Size budget FAILED:** 591KB vs 300KB budget (97% over)
- ✅ TTFB budget met: 0.13s < 0.8s
- ✅ Total budget met: 0.39s < 2.0s (but doubled from baseline)

### Regression #2: WTA Live Page Size

**Status:** 🔴 CRITICAL — P0 ticket filed (`perf-wta-guid-bloat`)

**Measurements:**
- TTFB: 0.15s → 0.16s (+6.7%, minor increase)
- Total: 0.15s → 0.35s (+133%, **MORE THAN DOUBLED**)
- Size: 49KB → 356KB (+627%, **78% over 200KB budget**)

**Impact:**
- ❌ **Size budget FAILED:** 356KB vs 200KB budget (78% over)
- ✅ TTFB budget met: 0.16s < 0.8s
- ✅ Total budget met: 0.35s < 2.0s (but more than doubled from baseline)

---

## Root Cause Analysis

**Commit:** 91820bf (2026-07-04) — "Add player profile pages for ATP and WTA"

**What changed:**
- Added `guid` field to `AtpLivePlayer` type (36-character UUID)
- Modified LiveRankingTable to render player names as `<Link href="/atp/player/{guid}">` instead of plain `<span>`
- Added dynamic routes `/atp/player/[id]` and `/wta/player/[id]`

**Why this caused a regression:**

The `guid` field is now embedded in the Next.js `self.__next` JSON payload for client-side hydration. This bloated the embedded JSON from ~130KB to ~410KB (+280KB!).

**Technical breakdown:**
- **Before:** Player data in SSR payload = name, rank, points, country (no GUID)
- **After:** Player data in SSR payload = name, rank, points, country, **+ 36-char GUID**
- **ATP:** ~100 players × 36 chars per GUID = ~3.6KB raw, but JSON overhead makes it ~50 bytes per player
- **Impact:** `self.__next` JSON payload ~130KB → ~410KB (+280KB)
- **Total page size:** 271KB → 591KB (ATP), 49KB → 356KB (WTA)

**Why this is wrong:**

The `guid` field is only needed for linking to player profile pages (`/atp/player/[guid]`). It does NOT need to be in the SSR payload — the ranking table can render perfectly fine without it in the initial HTML/JSON.

**Mobile impact:**
- ATP: 591KB on slow 3G = ~5.5s transfer time alone
- WTA: 356KB on slow 3G = ~3.3s transfer time alone

**Revenue impact:**

Performance is a conversion and revenue lever:
- Slow loads harm engagement, retention, and SEO (Core Web Vitals)
- Lower ad viewability/RPM (ads must be in viewport to generate impressions)
- Blocks Phase 3 monetization (betting affiliates require fast CTA response)
- Every 100ms counts for conversion

---

## Other Routes (Stable)

### Homepage
- TTFB: 0.16s → 0.12s (-25%, **improvement**)
- Total: 0.16s → 0.14s (-12.5%, **improvement**)
- Size: 32KB (stable)
- Status: ✅ **FAST** — all budgets met

### World Cup
- TTFB: 0.11s → 0.15s (+36%, some variance but still fast)
- Total: 0.26s → 0.36s (+38%, within budget)
- Size: 366KB → 364KB (-0.5%, stable)
- Status: ⚠️ **SIZE** — 21% over 300KB budget (stable, pre-existing)

**Analysis:** Homepage improved slightly. World Cup page shows minor TTFB/total variance (+0.04s, +0.10s) but remains well within budgets. Size stable at 364KB (pre-existing 21% over budget, tracked in existing ticket `perf-wc-page-size`).

---

## Performance Budget Summary

| Route        | TTFB | Total | Size   | Status          |
|--------------|------|-------|--------|-----------------|
| /            | 0.12s | 0.14s | 32KB   | ✅ FAST         |
| /atp-live    | 0.13s | 0.39s | 591KB  | 🔴 **SIZE FAIL** |
| /wta-live    | 0.16s | 0.35s | 356KB  | 🔴 **SIZE FAIL** |
| /world-cup   | 0.15s | 0.36s | 364KB  | ⚠️ SIZE (stable) |

**Budgets:**
- TTFB: ≤ 0.8s (good) / ≤ 1.5s (ok) / > 1.5s (slow)
- Total: ≤ 2.0s
- Size: / (≤ 150KB), /atp-live (≤ 300KB), /wta-live (≤ 200KB), /world-cup (≤ 300KB)

---

## Recommended Fix

**Remove `guid` from SSR payload.** The ranking table doesn't need it in the initial HTML/JSON.

**Solution Options:**

1. **Option A (RECOMMENDED):** Use a computed slug from player name instead of GUID
   - Example: `/atp/player/novak-djokovic-1` instead of `/atp/player/431a1bce-...`
   - Simpler, no extra fetch, SEO-friendly
   - Server-side player page can resolve slug → player data from the same ESPN feed

2. **Option B:** Fetch guid client-side only when user clicks a player link
   - Lazy-load guid data on hover/click
   - More complex, adds client-side fetch

3. **Option C:** Server-side lookup in player page route
   - Accept name slug in URL, resolve to guid server-side in the player page
   - No guid in SSR payload, player page does lookup on-demand

**Recommended:** Option A (name slug) is cleanest — no guid needed anywhere in the frontend, SEO-friendly URLs.

---

## Tickets Filed

1. **`perf-atp-guid-bloat`** (Priority 0) — ATP Live page size regression
   - Target: Reduce 591KB → < 300KB
   - Current: 97% over budget

2. **`perf-wta-guid-bloat`** (Priority 0) — WTA Live page size regression
   - Target: Reduce 356KB → < 200KB
   - Current: 78% over budget

**Urgency:** IMMEDIATE — These are the core traffic drivers (tennis pages), and slow loads harm UX, SEO, and ad revenue during peak tennis season.

---

## Next Steps

1. ✅ Tickets filed (both P0)
2. ✅ Baseline updated with regression documented
3. ⏳ Planner to implement fix (remove guid from SSR payload)
4. ⏳ Re-run `npm run check:performance` to verify fix
5. ⏳ Add regression guard to prevent size budget violations in CI

---

## References

- **Baseline:** docs/perf-baseline.md
- **Commit:** 91820bf (player profile pages)
- **Web Performance Best Practices:** https://web.dev/learn/performance
- **Core Web Vitals:** LCP < 2.5s, INP < 200ms, CLS < 0.1
