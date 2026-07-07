# Performance Report — 2026-07-07

**Inspector:** perf-inspector (automated)  
**Measurement Method:** `npm run check:performance` (TTFB/total/size via live fetch)  
**Site:** https://rankings123.com

---

## Summary

🔴 **CRITICAL REGRESSIONS PERSIST (Day 3):** ATP and WTA Live pages remain critically over size budget for the **third consecutive day**. P0 tickets from 2026-07-05 remain unfixed.

⚠️ **NEW VARIANCE: World Cup TTFB/Total:** Moderate increase in World Cup response times (+54% TTFB, +39% total) but still within budgets. Likely transient upstream API latency (monitoring for pattern).

✅ **Homepage stable:** Fast and within all budgets.

---

## Measurements (2026-07-07)

| Route        | TTFB  | Total | Size   | Status      |
|--------------|-------|-------|--------|-------------|
| /            | 0.12s | 0.14s | 33KB   | ✅ FAST     |
| /atp-live    | 0.14s | 0.24s | 591KB  | 🔴 SIZE FAIL |
| /wta-live    | 0.12s | 0.27s | 348KB  | 🔴 SIZE FAIL |
| /world-cup   | 0.20s | 0.32s | 364KB  | ⚠️ TTFB VARIANCE |

**Budgets:**
- TTFB: ≤ 0.8s
- Total: ≤ 2.0s
- Size: / ≤ 150KB, /atp-live ≤ 300KB, /wta-live ≤ 200KB, /world-cup ≤ 300KB

---

## Changes vs 2026-07-06 Baseline

### 🔴 ATP Live — CRITICAL REGRESSION PERSISTS (Day 3)
- **TTFB:** 0.13s → 0.14s (+8%, minor variance)
- **Total:** 0.25s → 0.24s (-4%, improvement)
- **Size:** 590KB → 591KB (+0.2%, **virtually unchanged**)
- **Status:** 🔴 SIZE FAIL (591KB vs 300KB budget, **97% over**)

**Analysis:**
- Third consecutive day at ~590KB (2026-07-05: 591KB, 2026-07-06: 590KB, today: 591KB)
- Root cause: `guid` field bloat in SSR payload (commit 91820bf, 2026-07-04)
- **No code fix shipped yet** — P0 ticket `perf-atp-guid-bloat` remains open
- Minor load time improvement (-4%) likely due to ISR edge cache warming, not structural fix

**Impact:**
- 📱 Mobile: 591KB on slow 3G = ~5.5s transfer time alone
- 💰 Revenue: Slow loads harm ad viewability/RPM, blocks Phase 3 monetization
- ⏱ Urgency: **IMMEDIATE** — Day 3 of critical regression

**Ticket:** `perf-atp-guid-bloat` (Priority 0) — OPEN

---

### 🔴 WTA Live — CRITICAL REGRESSION PERSISTS (Day 3)
- **TTFB:** 0.13s → 0.12s (-8%, improvement)
- **Total:** 0.29s → 0.27s (-7%, improvement)
- **Size:** 345KB → 348KB (+0.9%, **minor increase**)
- **Status:** 🔴 SIZE FAIL (348KB vs 200KB budget, **74% over**)

**Analysis:**
- Third consecutive day critically over budget (2026-07-05: 356KB, 2026-07-06: 345KB, today: 348KB)
- Root cause: Same as ATP — `guid` field bloat in SSR payload
- **No code fix shipped yet** — P0 ticket `perf-wta-guid-bloat` remains open
- Minor size increase (+3KB, +0.9%) is negligible variance
- Load time improvements (-7% TTFB, -7% total) likely due to ISR edge caching, not code fix

**Impact:**
- 📱 Mobile: 348KB on slow 3G = ~3.2s transfer time alone
- 💰 Revenue: Slow loads harm ad viewability/RPM, blocks Phase 3 monetization
- ⏱ Urgency: **IMMEDIATE** — Day 3 of critical regression

**Ticket:** `perf-wta-guid-bloat` (Priority 0) — OPEN

---

### ⚠️ World Cup — TTFB/Total Variance (Likely Transient)
- **TTFB:** 0.13s → 0.20s (+54%, **notable increase**)
- **Total:** 0.23s → 0.32s (+39%, **notable increase**)
- **Size:** 366KB → 364KB (-0.5%, stable)
- **Status:** ⚠️ TTFB variance, still within budgets

**Analysis:**
- Moderate TTFB/total increases but **still within budgets** (< 0.8s, < 2.0s)
- Size stable at 364KB (21% over 300KB budget, unchanged from baseline)
- **No recent World Cup code changes** (last 3 days: only homepage widget additions, unrelated)
- **Likely transient upstream ESPN API latency** (similar pattern seen 2026-06-28)
- Absolute TTFB (0.20s) is still fast — the +54% is relative to an excellent baseline (0.13s)

**Action:** Monitoring for pattern. If TTFB remains elevated tomorrow (Day 2), will investigate for structural cause. No ticket filed yet.

**Technical Notes:**
- Recent commits (cdd84cc, c11c2c7, 4e6c46c, 87ce622) did not touch World Cup code
- Tour de France widget (4e6c46c) and Wimbledon widget (87ce622) added to homepage/ATP/WTA, not World Cup
- Logo change (c11c2c7) is global but shouldn't affect server-side fetch performance

---

### ✅ Homepage — Stable and Fast
- **TTFB:** 0.13s → 0.12s (-8%, improvement)
- **Total:** 0.15s → 0.14s (-7%, improvement)
- **Size:** 32KB → 33KB (+3%, minor)
- **Status:** ✅ FAST (within all budgets)

**Analysis:** Homepage remains fast and stable. Minor size increase (+1KB, +3%) is negligible.

---

## Regressions Summary

### 🔴 CRITICAL (Escalating) — Day 3
1. **ATP Live size bloat:** 591KB vs 300KB budget (97% over) — **DAY 3**
2. **WTA Live size bloat:** 348KB vs 200KB budget (74% over) — **DAY 3**

**Root Cause (Both):** Commit 91820bf (2026-07-04) added `guid` field to player data, bloating Next.js SSR JSON payload from ~130KB to ~410KB (+280KB).

**Status:** P0 tickets open (`perf-atp-guid-bloat`, `perf-wta-guid-bloat`), no fix shipped yet.

**Impact (ESCALATING):**
- 🔴 **Day 3 of critical regressions** — both tennis pages (core traffic drivers) remain critically degraded
- 📱 **Mobile:** ATP 591KB + WTA 348KB on slow 3G = ~5.5s + ~3.2s transfer times
- 💰 **Revenue:** Blocks Phase 3 monetization (ads + betting affiliates), harms ad viewability/RPM
- 🏆 **Wimbledon 2026:** Tournament live through July 13 (peak tennis traffic NOW)
- ⏱ **Urgency:** **IMMEDIATE** — third consecutive day without fix

### ⚠️ NEW VARIANCE (Monitoring)
3. **World Cup TTFB/Total variance:** +54% TTFB (0.13s → 0.20s), +39% total (0.23s → 0.32s)
   - Still within budgets (< 0.8s, < 2.0s)
   - Likely transient upstream API latency (no recent code changes)
   - Monitoring for pattern — will investigate if persists tomorrow

---

## Tickets

**Open P0 Tickets (CRITICAL, Day 3):**
- `perf-atp-guid-bloat` — ATP Live size 591KB (97% over 300KB budget)
- `perf-wta-guid-bloat` — WTA Live size 348KB (74% over 200KB budget)

**No new tickets filed** — existing P0 tickets remain valid, World Cup variance likely transient.

---

## Recommendations (Priority Order)

### 1. 🔴 P0 — Fix ATP/WTA GUID Bloat (IMMEDIATE, Day 3)
**Why urgent:** Third day of critical regressions on core tennis pages during Wimbledon (peak traffic).

**Recommended fix (from tickets):**
- **Option A (best):** Use computed slug from player name (e.g., `/atp/player/novak-djokovic-1`) instead of `guid`. Simpler, no extra fetch, SEO-friendly.
- **Option B:** Fetch `guid` client-side only when user hovers/clicks a player link (lazy-load).
- **Option C:** Accept name slug in URL, resolve to `guid` server-side in player page route.

**Expected impact:**
- ATP: 591KB → ~270KB (-54%, back to baseline)
- WTA: 348KB → ~50KB (-86%, back to baseline)

**Verification:**
```bash
npm run check:performance
# ATP: size < 300KB, WTA: size < 200KB
```

### 2. ⚠️ Monitor World Cup TTFB (Next Run)
If TTFB remains elevated tomorrow (Day 2 of variance), investigate:
- Check ESPN API `/soccer/fifa.world` response times directly
- Review `src/lib/worldCupFeed.ts` for fetch patterns
- Consider ISR revalidation frequency (currently 60s)

If proven structural (not transient), file ticket for optimization.

---

## Performance Best Practices Reference

From [web.dev/vitals](https://web.dev/vitals) and [web.dev/learn/performance](https://web.dev/learn/performance):

**Core Web Vitals (GOOD thresholds):**
- **LCP** (Largest Contentful Paint): < 2.5s
- **INP** (Interaction to Next Paint): < 200ms
- **CLS** (Cumulative Layout Shift): < 0.1

**Why performance matters:**
- **Conversion lever:** Faster pages measurably lift engagement, retention, SEO rank, ad viewability/RPM, and conversion on affiliate/odds CTAs
- **Every 100ms counts:** Performance directly impacts revenue (ad RPM, monetization readiness)
- **Mobile impact:** Large payloads on slow 3G connections amplify the user experience gap

**PRPL / loading best practices:**
- Ship less JS, defer below-the-fold, cache aggressively
- Preconnect/preload critical resources, avoid layout shift
- Lazy-load heavy/offscreen sections
- Use ISR (`revalidate`) instead of `force-dynamic` for live data

---

## Next Run Actions

1. Re-measure all routes (compare to today's baseline)
2. **Check ATP/WTA for fix** — if sizes still elevated (Day 4), escalate P0 tickets in next report
3. **Monitor World Cup TTFB** — if elevated again, investigate for structural cause
4. **Add Core Web Vitals measurement** when Lighthouse/PageSpeed Insights API available (currently rate-limited)
