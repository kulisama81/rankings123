---
id: wc-odds-comparison-widget
status: closed
deps: []
links: []
created: 2026-07-14T13:51:38Z
type: feature
priority: 1
tags: [worldcup, revenue]
---
# Build odds comparison widget for World Cup pages

FlashScore/SofaScore monetization model: real-time odds comparison widgets drive affiliate conversions. Build once Bet365/FanDuel approval confirmed (July 16-17).

FEATURE:
Reusable odds widget component:
- Displays odds from multiple books (Bet365, FanDuel)
- Highlights best odds per bet type (spread, total, moneyline)
- Click → deep-link to affiliate with tracking params
- Real-time or near-real-time updates
- Responsive design

Embed on:
- /world-cup/final-2026-predictions
- /world-cup/semifinal pages
- Main /world-cup hub

TECHNICAL:
- Component: <OddsComparisonWidget match={} affiliates={} />
- Data source: TBD (Bet365 API if available, else manual input for key markets)
- Affiliate tracking: append ?ref=rankings123 or provided tracking params

DEPENDENCY: Blocked by wc-betting-affiliates (need tracking IDs)

REVENUE IMPACT: Direct conversion driver. FlashScore's primary monetization model.

SOURCES: Competitor analysis - flashscore.com, sofascore.com

## Acceptance Criteria

- Widget component built, tested
- Affiliate IDs from Bet365/FanDuel integrated
- Deployed on prediction pages by July 18
- CX-first: graceful fallback if odds unavailable (hide widget, no "Coming Soon")
- Performance: no CLS, lazy-load below fold

## Closed in backlog triage 2026-08-10
obsolete: WC over
