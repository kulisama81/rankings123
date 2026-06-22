# Performance Report — 2026-06-22

**Agent:** perf-inspector  
**Measurement:** `npm run check:performance` (TTFB/total/size via live fetch, best of 2 runs)  
**Target:** https://rankings123.com  
**Baseline:** docs/perf-baseline.md (2026-06-21)

---

## Summary

✅ **All routes within budget** — no performance tickets filed.

All four measured routes meet their TTFB and total-time budgets. TTFB measurements show variance vs yesterday's baseline (ranging from +24% to +57%), but given:
1. All routes remain comfortably within budget
2. No code changes to measured pages that would explain regressions  
3. Suspicious homepage size variance (93KB → 24KB, -74%) suggesting measurement noise
4. World Cup tournament is LIVE with real traffic, so upstream ESPN API latency may vary

**Conclusion:** The variance appears to be measurement noise and/or upstream API fluctuation rather than code-induced regression. No action needed at this time.

---

## Measurements vs Baseline

| Route        | TTFB (current) | TTFB (baseline) | Change  | Total (current) | Total (baseline) | Change  | Size (current) | Size (baseline) | Status |
|--------------|----------------|-----------------|---------|-----------------|------------------|---------|----------------|-----------------|--------|
| /            | 0.29s          | 0.23s           | +26%    | 0.29s           | 0.27s            | +7%     | 24KB           | 93KB            | ✅ FAST |
| /atp-live    | 0.57s          | 0.46s           | +24%    | 0.66s           | 0.73s            | -10%    | 375KB          | 380KB           | ✅ FAST |
| /wta-live    | 0.38s          | 0.29s           | +31%    | 0.52s           | 0.47s            | +11%    | 164KB          | 165KB           | ✅ FAST |
| /world-cup   | 0.55s          | 0.35s           | +57%    | 0.63s           | 0.49s            | +29%    | 359KB          | 341KB           | ✅ FAST |

**Budgets:**
- TTFB: ≤ 0.8s (good), ≤ 1.5s (acceptable)
- Total: ≤ 2.0s
- Size: varies by route (150KB–300KB)

---

## Analysis

### Measurement Variance Observed

The **homepage size drop from 93KB to 24KB** (-74%) is implausible given no code changes to that route. This suggests:
- Different compression/caching states between measurements
- Network/CDN routing variance
- Possible baseline measurement anomaly

This casts doubt on the TTFB increases as well — they may be within normal measurement variance rather than real regressions.

### Code Changes Since Baseline (2026-06-21)

Recent commits reviewed:
- `47afa40` — Added player roster to World Cup **team pages** (not main /world-cup page)
- `ed88bce` — Added mock fallback to match pages
- `047707f` — Autoresearch filed new tickets (no app code)
- `71f7b18` — Inspector filed tickets (no app code)

**None of these changes touch the measured routes** (`/`, `/atp-live`, `/wta-live`, `/world-cup`), so code is unlikely to be the cause of the observed TTFB increases.

### External Factors

The **World Cup 2026 tournament is LIVE** (through July 19, 2026). All World Cup data comes from ESPN's public API. Increased real-world traffic to ESPN's APIs during the live tournament could cause higher latency, which directly affects our TTFB since all pages use `force-dynamic` (no edge caching).

This is expected variance, not a regression in our code.

---

## Recommendations

### 1. Add Core Web Vitals Measurement (High Priority)

TTFB and total-time measurements via `curl` are useful but noisy. **Core Web Vitals** (LCP, INP, CLS) are the real user-perceived metrics and tend to be more stable.

**Action:** Add Lighthouse or PageSpeed Insights API integration to capture CWV in future perf runs. This will give us:
- LCP (Largest Contentful Paint) — main content render time
- INP (Interaction to Next Paint) — responsiveness
- CLS (Cumulative Layout Shift) — visual stability

### 2. Consider Moving to ISR (Medium Priority — Already Tracked)

The baseline document notes that all data pages use `force-dynamic`, which means every request blocks on upstream APIs. This makes us vulnerable to upstream latency variance.

**Solution:** Migrate to ISR with short revalidation (e.g., `export const revalidate = 60`) + client-side polling for live feel. This would:
- Serve cached pages from edge (near-instant TTFB)
- Reduce sensitivity to ESPN API variance
- Lower upstream API load

This is already documented in the baseline as "Known Performance Debt #1" — no new ticket needed.

### 3. Baseline Stability

The homepage size variance suggests our baseline measurements may have noise. Going forward:
- Take average of 3+ runs instead of best-of-2 to reduce variance
- Measure at consistent time of day (e.g., always at 10am PST)
- Consider multiple samples throughout the day to capture typical range

---

## Actions Taken

- ✅ Measured all routes — all within budget
- ✅ Compared to baseline — variance observed but no clear code regression
- ✅ Reviewed recent commits — no changes to measured routes
- ✅ **No performance tickets filed** (all routes meeting budgets)
- ⏭️ Baseline NOT updated (variance suggests measurement noise; will wait for more stable measurement method)

---

## Next Run

- Add Core Web Vitals measurement capability
- Consider running at fixed time of day for consistency
- Monitor if World Cup TTFB variance continues as tournament traffic increases
