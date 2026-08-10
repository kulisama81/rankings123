---
id: odds-api-comparison
status: closed
deps: []
links: []
created: 2026-08-08T13:50:52Z
type: task
priority: 1
parent: rankings123
tags: [betting, data, research]
---
# Free Odds API Comparison: OddsPapi vs Sports Game Odds vs The Odds API

Research and compare the 3 best FREE sports odds APIs for tennis + soccer. Current ticket 'betting-odds-api-free' mentions The Odds API but doesn't evaluate alternatives. Research shows: OddsPapi (free tier, 300+ bookmakers, 60+ sports), Sports Game Odds / SGO (free, no credit card, real-time), The Odds API (500 requests/mo free tier). Compare: data coverage (tennis ATP/WTA + World Cup), update frequency (pre-match vs live), rate limits, data quality, fallback behavior. Document recommendation with justification.

## Acceptance Criteria

Comparison doc: docs/odds-api-comparison.md, All 3 APIs tested with sample requests (ATP match odds, World Cup match odds), Rate limits documented (requests/day, requests/month), Data quality assessed (how many bookmakers? odds accuracy? update frequency?), Coverage verified (ATP, WTA, World Cup, Cincinnati/US Open), Recommendation made with first-principles justification, Integration complexity estimated (effort: hours vs days), Update betting-odds-api-free ticket with chosen API

## Notes

**2026-08-08T13:51:08Z**

**FIRST-PRINCIPLES ROI (Data Quality = Conversion Rate):**

CX-FIRST principle: Never show fake/stale odds. Betting decisions require REAL, CURRENT odds.

API options researched (2026):

**1. OddsPapi** (https://oddspapi.io)
- Free tier: YES (300+ bookmakers, 60+ sports)
- Coverage: Tennis (ATP/WTA), Soccer (World Cup), pre-match + live + historical
- Rate limits: TBD (need to test)
- Pros: Most comprehensive free option, 300+ bookmakers = best odds coverage
- Cons: Unknown rate limits, data quality TBD

**2. Sports Game Odds (SGO)** (https://sportsgameodds.com)
- Free tier: YES (no credit card required, real-time)
- Coverage: Pre-match + live in-play
- Rate limits: TBD
- Pros: Real-time, no credit card, easy signup
- Cons: Fewer bookmakers than OddsPapi?

**3. The Odds API** (https://the-odds-api.com)
- Free tier: 500 requests/month
- Coverage: Multiple sports including tennis
- Rate limits: 500/month = ~16/day (tight for live odds)
- Pros: Popular, well-documented, reliable
- Cons: 500/month too restrictive for live updates (need 1 request/min during matches = 1,440/day)

**Recommendation bias before testing:** OddsPapi (best coverage) > SGO (real-time) > The Odds API (too restrictive for live).

Effort: LOW (4-6 hours to test all 3, document findings)
Impact: CRITICAL (wrong API choice = rebuild later OR hit rate limits during Cincinnati/US Open)

Sources:
- https://sportsapis.dev/ (API directory)
- https://oddspapi.io/us (OddsPapi)
- https://sportsgameodds.com/ (SGO)

## Closed in backlog triage 2026-08-10
dup: odds-api-integration
