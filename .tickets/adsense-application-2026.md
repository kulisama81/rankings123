---
id: adsense-application-2026
status: open
deps: []
links: []
created: 2026-07-24T13:51:28Z
type: task
priority: 1
parent: rankings123
tags: [revenue, monetization]
---
# AdSense Application + Ad Inventory Setup

Apply for Google AdSense account and set up initial ad inventory. Required for display ad revenue (Phase 3). Long lead time (7-14 days approval), so start now even while building features.

## Acceptance Criteria

- Apply for AdSense account at adsense.google.com
- Add ads.txt file to public/ directory (AdSense verification)
- Design ad slot placements: leaderboard (top), in-content (mid-page), sidebar (desktop)
- Implement ad components with lazy loading (below-fold)
- Ad density: max 1 leaderboard + 1 in-content per page (CX-first, no ad walls)
- Consent Mode v2 integration (already exists, verify compatible)
- Test in AdSense sandbox before going live
- Document approval status in ticket notes
- Builds green, ESLint clean, no CLS (Core Web Vitals)

## Notes

**2026-07-24T13:51:42Z**

ROI (First Principles - Revenue): Revenue = traffic × RPM. Current RPM = zero (no ads). AdSense baseline RPM = 2-10 dollars for sports content. With 1000 pageviews/day = 60-300 dollars/month baseline. Lead time = 7-14 days approval (blocker for revenue). Progression = AdSense to Ezoic (5K sessions) to Mediavine (50K sessions). CX protection = low ad density, lazy load, no CLS. Effort = Low. ROI = CRITICAL (revenue enablement, long lead time).
