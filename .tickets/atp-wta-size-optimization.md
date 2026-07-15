---
id: atp-wta-size-optimization
status: open
deps: []
links: [perf-atp-page-size]
created: 2026-07-15T13:58:00Z
type: enhancement
priority: 1
parent: rankings123
tags: [performance, mobile, ux]
---
# ATP/WTA Page Size Reduction (100%+ Over Budget)

**Context:** Performance report (2026-07-14) shows ATP Live (613KB, 104% over 300KB budget) and WTA Live (350KB, 75% over 200KB budget) are significantly over size budget. This hurts mobile UX, increases bounce rate (especially on slower connections), and costs users data.

**Problem (First Principles):**
- **User's root need:** See rankings quickly, especially on mobile (43% of traffic)
- **Mobile constraint:** Data costs matter; 600KB = expensive on limited plans
- **Performance impact:** Large payloads = longer parse time, slower interactivity
- **Competitive disadvantage:** Live-tennis.eu ATP page = ~180KB (we're 3× larger)

**Proof:**
- ATP Live: 613KB (104% over 300KB budget)
- WTA Live: 350KB (75% over 200KB budget)
- 43% of traffic is mobile (from analytics)
- Page size directly impacts bounce rate on mobile

**ROI Justification:**
- **Mobile UX:** Faster load = lower bounce (especially 3G/4G users)
- **SEO:** Page speed is ranking factor (Core Web Vitals)
- **Cost to users:** 300KB savings = $0.01-0.03 per visit (data costs)
- **Engagement:** Fast pages = more pages/session

## Root Causes (Needs Investigation)

**Likely culprits:**
1. **Large ranking dataset:** Rendering 100+ rows at once (ATP: 1,000+ players available)
2. **Unoptimized images:** Player photos, flags not compressed
3. **JavaScript bundle:** Large client-side data
4. **Tooltip/popover feature:** Recent commit (0fc779b) added ~25KB per page
5. **No virtualization:** All rows rendered even if off-screen

## Solution

Optimization strategies (investigate and apply):

1. **Virtualization (Highest Impact):**
   - Only render visible rows (~20-30 at a time)
   - Library: `react-window` or `@tanstack/react-virtual`
   - Expected savings: 300-400KB (most of dataset not rendered)

2. **Pagination (Alternative):**
   - Show top 50 by default, "Load more" button
   - Expected savings: 200-300KB

3. **Image Optimization:**
   - Compress flags/icons (WebP format, < 5KB each)
   - Lazy-load player photos (if used)
   - Expected savings: 20-50KB

4. **Code Splitting:**
   - Lazy-load tooltip/popover feature (only when needed)
   - Split large components
   - Expected savings: 25-50KB

5. **Data Compression:**
   - Server-side gzip/brotli (Vercel does this automatically)
   - Verify compression is enabled
   - Expected savings: 30-50% of uncompressed size

## Acceptance Criteria

1. **Size Targets (Post-Optimization):**
   - ATP Live: ≤ 300KB (currently 613KB, need -51% reduction)
   - WTA Live: ≤ 200KB (currently 350KB, need -43% reduction)

2. **Investigation Phase:**
   - Profile current bundle with Next.js bundle analyzer
   - Identify top 3 contributors to page size
   - Document findings in ticket notes

3. **Implementation:**
   - Apply optimization strategy (likely virtualization + code splitting)
   - Measure size after each change
   - Target incremental improvements (not all-or-nothing)

4. **UX Preservation:**
   - All data still accessible (no information loss)
   - Scrolling smooth (virtualization doesn't feel broken)
   - Mobile-tested (iPhone, Android)
   - Dark/light themes work

5. **Verification:**
   - `npm run build` succeeds
   - `npm run check:performance` shows:
     - ATP Live: ≤ 300KB
     - WTA Live: ≤ 200KB
   - Visit localhost: scroll performance smooth
   - Live: verify on https://rankings123.com/atp-live (real mobile device)

6. **Performance Testing:**
   - Lighthouse mobile score: target 90+
   - Real device test (iPhone 12, Android mid-range)
   - 3G throttling test (simulate slow connection)

## Technical Approach

**Option A: Virtualization (Recommended)**
```tsx
import { useVirtualizer } from '@tanstack/react-virtual'

// Only render visible rows
const virtualizer = useVirtualizer({
  count: rankings.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 60, // row height
  overscan: 10, // render 10 extra rows for smooth scroll
})
```

**Option B: Pagination**
```tsx
const ROWS_PER_PAGE = 50
const [page, setPage] = useState(1)
const visibleRows = rankings.slice(0, page * ROWS_PER_PAGE)
```

**Recommendation:** Virtualization (Option A) because:
- No UX change (all data accessible via scroll)
- Better mobile experience (smooth infinite scroll)
- Standard pattern for large tables

## Related Tickets
- `perf-atp-page-size` (P2) — duplicate, this supersedes it
- `mobile-table-scroll-system` (P1) — virtualization supports this
- `polish` (P3) — Core Web Vitals includes page size

## ROI Summary
**High ROI:** Reduces mobile bounce (43% of traffic), improves SEO (page speed ranking factor), better UX (faster load/parse), competitive parity (live-tennis.eu is 3× smaller), low cost (library integration, not full rewrite).

**Priority:** P1 because 100%+ over budget = user-facing problem (slow mobile load) and quick win (virtualization is proven solution).
