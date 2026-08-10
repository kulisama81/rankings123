---
id: mobile-traffic-crisis
status: closed
deps: []
links: []
created: 2026-08-06T13:52:00Z
type: feature
priority: 1
parent: rankings123
tags: [mobile, ux, analytics, audit]
---
# Mobile Traffic Crisis: 9% vs 68% Industry Standard

**CRITICAL GAP** — Sports sites average 68-70% mobile traffic (FIFA.com 67.58%, MLB.com 69.79%), but rankings123.com shows only **9% mobile** (4 of 43 sessions in last 28 days per GA4). This is a **7.5× gap**.

## Acceptance Criteria

### Phase 1: Audit (THIS TICKET)

**Test on real devices:**
- iPhone (Safari iOS)
- Android (Chrome Android)
- Test pages: `/`, `/atp-live`, `/wta-live`, `/world-cup`, `/cycling`

**Document issues:**
- Viewport problems (horizontal scroll, elements overflow, pinch-to-zoom required)
- Text readability (too small, low contrast on small screens)
- Tap targets (buttons/links too small, < 44px touch target)
- Table usability (ranking tables on narrow screens — do they scroll? Are columns readable?)
- Navigation (hamburger menu work? Footer links accessible?)

**Performance audit:**
- Run Lighthouse mobile on key pages (target: 90+ performance, 100 accessibility)
- Check Core Web Vitals mobile (LCP, CLS, FID) — compare to desktop
- Test on slow connection (3G simulation) — does site load in < 3s?

**Search visibility:**
- Google Search Console: filter by device (mobile vs desktop)
- Are we invisible on mobile search but visible on desktop?
- Check mobile SERP position vs desktop position

**Findings deliverable:**
- Write `docs/reports/2026-08-XX-mobile-ux-audit.md` with:
  - Top 3-5 mobile UX blockers (with screenshots if possible)
  - Lighthouse scores (mobile vs desktop)
  - Core Web Vitals mobile
  - Mobile search visibility gap
  - Prioritized fix recommendations

### Phase 2: Fix (separate tickets after audit)
- Based on audit, file specific fix tickets (e.g., `mobile-table-responsive`, `mobile-viewport-fix`, `mobile-performance`)
- **Target:** Reach 40-50% mobile traffic within 4 weeks (4-5× improvement, approaching industry standard)
- **Measure:** GA4 mobile % week-over-week

### Verification
- ✅ Audit complete with findings doc (`docs/reports/2026-08-XX-mobile-ux-audit.md`)
- ✅ Top 3-5 issues identified with severity (P0/P1/P2)
- ✅ Fix tickets created based on findings
- ✅ Baseline mobile % recorded (currently 9%)

## First-Principles Analysis

**User behavior (sports audience):**
- Fans check live scores/rankings **on mobile** (during commute, at events, casual browsing)
- Desktop = deep research, fantasy sports, betting analysis (minority use case)
- Mobile = quick checks, live updates (**our core use case** — "what's the ranking right now?")

**Traffic fundamentals:**
Traffic = (Desktop Users + Mobile Users) × Engagement × Retention

If we're 7.5× below industry on mobile, we're **losing 60% of our potential audience**.

**Root causes (hypotheses to test):**
1. **Mobile UX problems** — tables/text too small, horizontal scroll, buttons hard to tap
2. **Viewport issues** — not responsive, breaks on mobile screens
3. **Discovery gap** — not ranking on mobile search (Google has separate mobile index)
4. **Performance** — slow load on mobile networks (3G/4G), poor Core Web Vitals on mobile
5. **Content formatting** — data tables (our hero) don't work well on narrow screens

## ROI Justification

**Why this matters (traffic fundamentals):**
- **Traffic multiplier:** Fixing mobile UX could **5-10× total traffic** (going from 9% → 50% mobile = 5× mobile sessions)
- **Addressable market:** 68% of sports traffic is mobile → we're serving only 9% → **59% of market unreachable**
- **Competitive gap:** Competitors who work well on mobile get the traffic we're missing

**Why this matters (revenue fundamentals):**
- **Ad inventory:** Mobile traffic = mobile ad impressions (70% of sports audience × RPM = 70% of revenue potential)
- **Engagement:** Mobile users check live rankings **more frequently** than desktop (throughout the day)
- **Betting affiliates:** Sports bettors use mobile to place bets during games (highest-RPM audience)

**Impact vs Effort:**
- **Impact:** VERY HIGH (unlock 60% of sports audience, 5-10× traffic multiplier)
- **Effort:** MEDIUM (responsive audit → specific fix tickets → iterative improvements)
- **Priority:** P1 (after planner restart, but before Phase 2 features)
- **Urgency:** HIGH (every day at 9% mobile = 60% of potential traffic lost)

**First-principles reasoning:**
The product is "live rankings you can check anytime." The natural access pattern is mobile (quick check). If the mobile experience is broken, the product doesn't deliver its core value to its natural audience. Desktop-only rankings are a fundamentally misaligned product.

## Sources

Mobile traffic benchmarks:
- [Mobile Website Traffic Statistics 2026](https://fosspost.org/mobile-website-traffic/) — 59.6% global average
- [Most Visited Sports Websites](https://www.semrush.com/trending-websites/global/sports) — FIFA.com 67.58% mobile, MLB.com 69.79% mobile

## Closed in backlog triage 2026-08-10
dup: mobile-first-optimization
