---
id: cross-sport-discovery
status: open
deps: []
links: []
created: 2026-08-02T13:50:31Z
type: feature
priority: 1
parent: rankings123
tags: [ux, engagement, multi-sport]
---
# Cross-Sport Discovery Navigation System

Help users discover other sports. Analytics show excellent cycling engagement (0% bounce, 26.8s) but only 4 views - discovery problem. Build cross-sport recommendation cards, related content links, and sport-switcher UI.

## Acceptance Criteria

Cross-sport nav component on all sport pages, Related sports recommendations visible, Analytics: cross-sport click-through >10%, Session depth increases (users view 2+ sports)

## Notes

**2026-08-02T13:50:51Z**

FIRST PRINCIPLES:

ROOT NEED: Users come for one sport but might like others
PROOF: Cycling has BEST engagement (0% bounce, 26.8s) but only 4 views
BARRIER: Users don't know we have cycling/WC if they land on ATP page

CURRENT STATE:
- Tennis fans may never discover World Cup or cycling content
- Each sport page is a silo (no cross-linking)
- Lost session depth (users view 1 sport, leave)

SOLUTION:
- Related sports cards ('Also live: Tour de France', 'Explore: World Cup')
- Sport switcher in nav (quick jump between sports)
- Contextual recommendations (tennis fan → cycling GC race)

IMPACT: Multi-sport identity, higher session depth, more pageviews
EFFORT: MEDIUM (nav component, recommendation logic)
ROI: HIGH — converts single-sport visitors to multi-sport users
