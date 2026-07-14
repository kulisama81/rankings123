---
id: wc-homepage-final-promo
status: open
deps: []
links: []
created: 2026-07-14T13:51:28Z
type: feature
priority: 0
tags: [worldcup, revenue]
---
# Add World Cup Final countdown + betting CTA to homepage

Homepage drives most traffic. Feature WC Final prominently with countdown timer + CTA to predictions/betting content.

FEATURE:
Hero section or prominent card on rankings123.com homepage:
- "World Cup Final 2026" headline
- Countdown timer to kickoff (July 19, [time] UTC)
- Finalist flags/crests (after July 15 semifinals)
- CTA button: "View Predictions & Odds" → /world-cup/final-2026-predictions
- Mobile-responsive, Apple Sports aesthetic

REVENUE IMPACT: Funnel driver - homepage → predictions → betting affiliate conversions

DEPLOY: By July 16

## Acceptance Criteria

- Component built, countdown accurate
- Updates automatically after semifinals (July 15)
- Links to predictions page (wc-final-predictions-page)
- Countdown expires post-final, converts to "View Results" CTA
- Performance: no CLS, countdown JS lightweight
