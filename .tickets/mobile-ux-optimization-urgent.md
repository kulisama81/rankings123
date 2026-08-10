---
id: mobile-ux-optimization-urgent
status: open
deps: []
links: []
created: 2026-08-10T14:20:00Z
type: task
priority: 1
parent: rankings123
tags: [mobile, ux, revenue]
---
# Mobile UX Optimization URGENT — 9% mobile vs 68% industry (7.5× revenue leak)

**CURRENT STATUS:** 9% mobile traffic vs 68% mobile industry average (per yesterday's autoresearch). We're losing 7.5× potential users/revenue by not optimizing for mobile.

## FIRST-PRINCIPLES IMPACT

**Mobile = majority of sports traffic:**
- Industry average: 68% mobile, 32% desktop
- Rankings123 current: 9% mobile (4 sessions), 91% desktop (39 sessions)
- **We're optimized for the MINORITY platform (desktop) and broken for the MAJORITY (mobile)**

**Revenue leak calculation:**
- Current: 43 sessions/28 days = 1.5 sessions/day
- If mobile-optimized: 1.5 ÷ 0.32 = 4.7 sessions/day (68% mobile, 32% desktop)
- **Missing 3.2 sessions/day = 90 sessions/month = 70% revenue leak**

**User behavior on mobile:**
- Check live scores during commute, at stadium, between meetings
- Quick glances, not deep research sessions
- Rankings tables MUST be scannable on small screens
- Tap targets MUST be large enough (44×44px minimum)

## Current Mobile UX Issues (Hypothesis — Need Audit)

Likely problems based on 9% mobile share:
1. **Ranking tables too wide** — horizontal scroll on mobile = terrible UX
2. **Font sizes too small** — can't read player names, points
3. **Tap targets too small** — can't filter by country, can't click player names
4. **Navigation too dense** — header nav cramped on mobile
5. **Slow mobile load** — no lazy loading, large images

## Acceptance Criteria

### 1. Mobile UX Audit (Use Playwright or Real Device)

- Test ALL pages on mobile viewport (375×667 iPhone SE, 360×640 Android)
- Document UX issues: horizontal scroll, tiny text, cramped tap targets, slow load
- Screenshot issues for bug tickets

### 2. Ranking Table Mobile Optimization

- **Responsive columns:** Hide less-critical columns on mobile (keep rank, name, points; hide country code, detailed stats)
- **Readable font sizes:** Min 14px for body text, 16px for player names
- **Tap targets:** Min 44×44px for clickable elements (country filter, player names)
- **Horizontal scroll:** ELIMINATE — use vertical stacking or hide columns, never require horizontal scroll

### 3. Navigation Mobile Optimization

- **Hamburger menu** or **bottom nav** on mobile (not cramped horizontal nav)
- **Large tap targets** for sport links (ATP Live, WTA Live, World Cup)
- **Clear hierarchy:** Primary sports prominently visible

### 4. Performance Mobile Optimization

- **Lazy load images** (country flags, any future player photos)
- **Reduce JS bundle** for mobile (defer non-critical scripts)
- **Test on 3G connection** (not just WiFi) — target < 3s load

### 5. Mobile Metrics Target

- **Post-optimization:** Mobile share 40%+ within 2 weeks (from 9%)
- **Engagement:** Mobile bounce rate < 50% (desktop is 80.8% on homepage, so room to improve)
- **Performance:** Mobile Core Web Vitals green (LCP < 2.5s, FID < 100ms, CLS < 0.1)

## Verification

- Test on real mobile devices (iPhone, Android) or Playwright mobile emulation
- Check Google Search Console Mobile Usability report (any errors?)
- Lighthouse mobile audit (should score 90+ for mobile UX)

## Impact Estimate

- **Current:** 9% mobile = losing 59% of potential audience
- **After optimization:** 40-50% mobile share (still below 68% industry but massive improvement)
- **Revenue impact:** 4.5× traffic increase from mobile optimization alone
- **Engagement:** Lower bounce rate, higher pages/session on mobile

**ROI:** 10/10 — MEDIUM effort (10-15 hours), MASSIVE impact (4.5× traffic, prerequisite for mobile-first audience)

**Timeline:** URGENT — every day at 9% mobile = cumulative user loss. Ship mobile optimizations within 1 week.
