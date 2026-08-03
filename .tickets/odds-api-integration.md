---
id: odds-api-integration
status: open
deps: []
links: []
created: 2026-08-03T13:49:39Z
type: feature
priority: 1
parent: rankings123
tags: [revenue, betting, data, api]
---
# The Odds API Integration (free tier, 500 req/day)

BETTING REVENUE ENABLER: integrate The Odds API free tier (500 requests/day, 2 bookmakers, no credit card). Powers live odds widgets for Cincinnati + US Open betting content. Free tier sufficient for current traffic (72 pageviews/month). Covers Bet365, DraftKings, FanDuel, William Hill. Build reusable OddsWidget component for all betting content. References: https://odds-api.io/pricing/free and https://sportsapi.com/api-directory/the-odds-api/

## Acceptance Criteria

1. The Odds API account created (free tier) 2. API key obtained and stored in env 3. OddsWidget component built (src/components/OddsWidget.tsx) 4. Fetches live odds for given match/tournament 5. Displays odds from 2+ bookmakers 6. Affiliate links integrated (click odds → FanDuel/Bet365) 7. Caching strategy (avoid burning free quota) 8. Test on Cincinnati betting guide page
