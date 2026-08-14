---
id: mobile-ux-audit-findings
status: open
deps: []
links: [mobile-first-optimization]
created: 2026-08-14T14:00:00Z
type: task
priority: 1
parent: rankings123
tags: [mobile, ux, audit]
---
# Mobile UX Audit Findings — Document Specific Issues for P0 Fix

Document specific mobile UX issues via real-device testing to unblock mobile-first-optimization P0 ticket. Test on iPhone/Android across key pages (homepage, /atp-live, /wta-live). Current mobile share 16% vs 50-60% industry standard.

## Test Areas
- Navigation: horizontal scroll on small screens (27-country filter overflow)
- Tables: touch scroll/swipe interactions, column readability
- Homepage: hydration delays (loading skeletons visible), hero section mobile layout
- Tap targets: button/link sizing (min 44×44px iOS, 48×48px Android)
- Performance: LCP/FID/CLS on 3G connection
- Forms: keyboard types, input field sizing (if any contact forms)

## Acceptance Criteria
1. Test 3 devices: iPhone (iOS), Android phone, iPad/tablet
2. Screenshot issues with annotations
3. Document findings in this ticket as notes with severity (P0/P1/P2)
4. Feed findings into mobile-first-optimization P0 execution plan
5. Time budget: 2 hours

## ROI
Effort: LOW (2 hours testing)
Impact: MEDIUM-HIGH (unblocks P0 mobile ticket with concrete fixes)
Why: Mobile-first-optimization P0 exists since Aug 2 but hasn't shipped — specific findings help prioritize fixes
