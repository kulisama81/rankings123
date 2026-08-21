---
id: odds-api-integration-sprint
status: open
deps: []
links: []
created: 2026-08-21T13:49:11Z
type: feature
priority: 1
parent: tennis-site
tags: [api, betting, revenue]
---
# The Odds API Integration — Real Betting Odds (Free Tier)

Integrate The Odds API free tier (500 req/month) for REAL betting odds. Covers Bet365, DraftKings, FanDuel. Docs: docs.odds-api.io. Display odds on US Open draw, prediction articles. Cache 5min+ to stay under limit. Mock fallback + source flag pattern.

## Acceptance Criteria

1. The Odds API integrated with free tier key
2. Tennis odds fetch working (mock fallback on failure)
3. US Open tournament winner odds displaying
4. Source flag: api vs mock visible
5. Request rate under 500/month (aggressive caching)
6. Build green, data-integrity passes
7. Mobile responsive

Effort: 6-8 hours
ROI: 9/10 — Unblocks ALL betting content, revenue enabler
