---
id: mobile-cx-optimization
status: open
deps: []
links: []
created: 2026-06-30T13:49:33Z
type: feature
priority: 1
parent: rankings123
tags: [mobile, ux, conversion, revenue, performance]
---
# Mobile-first UX optimization: comprehensive mobile conversion audit

Comprehensive mobile UX optimization pass: audit and fix mobile experience issues that drive 68.5% homepage bounce and 100% bounce on cycling events. 39% of traffic is mobile.

## Acceptance Criteria

✓ Mobile UX audit completed: identify friction points
✓ Homepage mobile bounce <50% (from 68.5%)
✓ Table scroll/navigation optimized for touch
✓ Tap targets ≥44x44px (accessibility)
✓ Mobile menu navigation tested + optimized
✓ Forms/inputs mobile-friendly (if any)
✓ Core Web Vitals on mobile: LCP <2.5s, FID <100ms, CLS <0.1
✓ Sticky headers don't cover content on scroll
✓ Images/ads don't push content (CLS fix)
✓ Test on real devices: iPhone + Android
✓ Analytics: measure bounce rate improvement
✓ Regression test: mobile-table-patterns ticket integration

## Notes

**2026-06-30T13:49:46Z**

**First Principles ROI Analysis:**

**Problem:** 39% of traffic is mobile, but bounce rates are HIGH:
- Homepage: 68.5% bounce (Analytics: https://rankings123.com/, 28-day data)
- Cycling events: 100% bounce on many pages (Giro, Vuelta, Paris-Roubaix)
- Mobile share: 34 sessions out of 87 total

**Root cause:** Mobile UX likely not optimized — tables hard to scroll, tap targets small, navigation friction.

**Fundamental drivers:**
- Revenue = traffic × RPM × session depth × CONVERSION
- Mobile UX directly impacts conversion (bounce = lost ad impressions)
- Good mobile experience → lower bounce → more pageviews → more ad revenue

**First principles insight:** 
We're optimizing FOR traffic (SEO, player pages, Wimbledon) but losing 68.5% of homepage visitors immediately. Fixing conversion multiplies the value of every traffic optimization.

**Impact:** HIGH — 39% of traffic, every 10% bounce reduction = significant revenue gain  
**Effort:** MEDIUM — audit + targeted fixes  
**ROI:** HIGH — conversion lever that compounds with all traffic work

Different from polish (vague chore) and mobile-table-patterns (tables only) — this is comprehensive mobile conversion optimization with measurable bounce rate goals.
