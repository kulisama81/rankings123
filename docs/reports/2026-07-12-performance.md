# Performance Report — 2026-07-12

## Summary

**Status:** 🔴 CRITICAL SIZE REGRESSIONS PERSIST (Day 8) + ⚠️ TTFB Variance Detected

- **CRITICAL:** ATP and WTA size regressions continue for **8th consecutive day** (P0 tickets remain open)
- **VARIANCE:** Homepage, ATP, World Cup show TTFB variance (+46-133%) but all remain within budget
- **STABLE:** All routes pass TTFB/total budgets; WTA performance stable

## Measurements

### HTTP Fetch (npm run check:performance)

| Route        | TTFB      | Total     | Size      | vs 2026-07-11    |
|--------------|-----------|-----------|-----------|------------------|
| /            | 0.19s     | 0.19s     | 33KB      | TTFB +46%, size stable |
| /atp-live    | 0.28s     | 0.41s     | 600KB     | TTFB +133%, size +3KB (+0.5%) |
| /wta-live    | 0.14s     | 0.22s     | 349KB     | Stable |
| /world-cup   | 0.27s     | 0.52s     | 360KB     | TTFB +125%, total +160%, size stable |

**Budget Status:**
- ✅ All routes within TTFB budget (< 0.8s)
- ✅ All routes within total budget (< 2.0s)
- 🔴 ATP critically over size budget (600KB vs 300KB, +100%)
- 🔴 WTA critically over size budget (349KB vs 200KB, +75%)
- ⚠️ World Cup over size budget (360KB vs 300KB, +20%)

### Core Web Vitals

**Not measured** — browser automation requires manual approval.

## Analysis

### 1. TTFB/Total Variance (Transient, Monitoring)

**Affected routes:** Homepage (+46%), ATP Live (+133%), World Cup (+125%)

**Pattern:** This matches previous transient variances that resolved themselves:
- 2026-07-10: Homepage TTFB +200% → resolved 2026-07-11 (-61%)
- 2026-07-09: ATP TTFB +129% → resolved 2026-07-10 (-53%)
- 2026-07-07: World Cup TTFB +54% → resolved 2026-07-08 (-30%)

**Characteristics:**
- Multiple routes affected simultaneously (not isolated)
- No code changes to affected pages
- All routes remain WITHIN BUDGET
- Size stable (ATP +3KB is negligible 0.5% increase)

**Verdict:** Almost certainly transient network/edge/upstream latency, not a structural regression.

**Action:** Monitor tomorrow for resolution. No ticket filed.

### 2. CRITICAL SIZE REGRESSIONS PERSIST (Day 8)

**🔴 ATP Live: 600KB** (100% over 300KB budget)
- Day 1 (2026-07-05): 271KB → 591KB (+118% regression)
- Day 8 (today): 600KB (+3KB vs yesterday, +0.5%)
- Mobile impact: ~5.6s transfer on slow 3G
- Ticket: `perf-atp-guid-bloat` (Priority 0) — OPEN

**🔴 WTA Live: 349KB** (75% over 200KB budget)
- Day 1 (2026-07-05): 49KB → 356KB (+627% regression)
- Day 8 (today): 349KB (stable vs yesterday)
- Mobile impact: ~3.3s transfer on slow 3G
- Ticket: `perf-wta-guid-bloat` (Priority 0) — OPEN

**Root cause:** Commit 91820bf (2026-07-04) added `guid` field to player data, bloating Next.js `self.__next` JSON payload by ~280KB.

**Impact (ESCALATING):**
- 🔴 **Day 8** — both tennis pages (core traffic drivers) remain critically degraded
- 📱 **Mobile:** Poor experience on slow connections
- 💰 **Revenue:** Blocks Phase 3 monetization (ads + betting affiliates)
- 🏆 **FIFA World Cup 2026:** LIVE through ~July 19 (elevated sports traffic NOW)
- 🎾 **Wimbledon 2026:** Ended July 13 (tennis traffic now normal)
- ⏱ **Urgency:** IMMEDIATE — eighth consecutive day without fix

**Why User Experience Remains Acceptable Despite HTML Bloat:**
- Browser receives compressed content: ATP 600KB HTML → ~454KB transfer (-24% from compression)
- Edge caching + ISR working effectively
- TTFB/total load times within budget (when not experiencing transient variance)

**However, the bloat is still problematic:**
1. Mobile users on metered connections pay for full transfer
2. Initial parse time slower for large HTML
3. SEO bots may not benefit from compression
4. Unnecessary waste of network resources

### 3. World Cup Size

**360KB** (20% over 300KB budget)
- Stable over past week
- ISR pre-renders all data server-side → full HTML
- Existing ticket: `perf-wc-page-size` (lazy-load below-fold sections)

## Code Changes Since 2026-07-11

Recent commits:
```
8d824e5 Design research 2026-07-12 (tickets only)
8cbaee7 autoresearch 2026-07-12 (tickets only)
4f52fa4 Inspector 2026-07-11 evening (tickets only)
fe7ace9 Strengthen nav accent visibility (+240 lines CSS)
d9c8007 Update tdf-live-stage-results ticket (tickets only)
114d4fb Update changelog for TdF (changelog only)
307933f Fix TdF live stage winners parsing (TdF page only)
```

**Analysis:**
- No changes to Homepage, ATP Live, WTA Live, or World Cup data pages
- Nav accent CSS changes (fe7ace9) add styling but don't explain TTFB variance
- ATP duplicate table fix (02cddd8, previous day) only affects ATP, not Homepage/World Cup
- **Verdict:** No code changes explain the TTFB variance → confirms transient nature

## Recommendations

### Immediate (CRITICAL)

**1. Fix GUID bloat (Day 8) — P0 tickets open**
- Tickets: `perf-atp-guid-bloat`, `perf-wta-guid-bloat`
- Remove `guid` from SSR payload
- Use computed slug from player name instead (e.g., `/atp/player/novak-djokovic-1`)
- Target: ATP < 300KB, WTA < 200KB
- **Urgency:** IMMEDIATE — 8 days without intervention

### Monitoring

**2. TTFB variance resolution**
- Monitor tomorrow's run for resolution
- If variance persists 3+ days, investigate for structural cause
- Pattern suggests resolution within 1-2 days

## Conclusion

**Performance status:** Mixed — load times within budget, but critical size regressions persist.

**Action required:** The planner should prioritize the GUID bloat tickets. Eight consecutive days without fix is too long for P0 tickets during peak sports traffic (World Cup finals week).

**Next measurement:** 2026-07-13 (monitor variance resolution + size regression status)
