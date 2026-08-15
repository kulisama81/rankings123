---
id: mobile-nav-overflow-fix
status: open
deps: []
links: []
created: 2026-08-15T13:50:55Z
type: bug
priority: 1
parent: rankings123
tags: [mobile, ux, quick-win]
---
# Mobile nav overflow fix (27-country filter)

MOBILE UX BUG (from Aug 14 report): Navigation requires horizontal scroll on small screens due to 27-country filter overflow.

IMPACT: 19% mobile traffic vs 50-60% industry standard. Navigation friction = bounce.

QUICK WIN: Collapse filter to dropdown or 'Filter →' button on mobile. Desktop keeps current layout.

ROI: 8/10 — LOW effort (1 breakpoint change), removes obvious mobile friction, part of mobile-first-optimization epic.

## Acceptance Criteria

✅ Identify navigation component with country filter
✅ Mobile breakpoint (<768px): collapse to dropdown or modal
✅ Desktop (≥768px): keep current inline filter
✅ Test on iPhone/Android viewports
✅ No horizontal scroll on 375px width
✅ Filter still functional (can select countries)
✅ Build green, lint clean
