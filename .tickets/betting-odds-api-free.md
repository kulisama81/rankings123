---
id: betting-odds-api-free
status: closed
deps: []
links: []
created: 2026-07-11T13:51:37Z
type: feature
priority: 1
parent: rankings123
tags: [revenue, betting, data]
---
# Sports betting odds API integration (free tier)

Integrate free betting odds API for World Cup + tennis - enable betting content

## Acceptance Criteria

Research and integrate free/freemium odds API (The Odds API, API-Football, or similar), odds data available for WC matches + major tennis tournaments, display on match/preview pages, fallback gracefully if API down, never show fabricated odds, track as prerequisite for betting affiliate revenue

## Notes

**2026-07-11T13:51:43Z**

## Revenue Enabler - Betting Content Requires Real Odds

**CX FIRST rule:** Never show fake/placeholder odds to users. Betting content ships ONLY when backed by real data.

**Free API options researched:**
- The Odds API (free tier: 500 requests/month)
- API-Football (freemium, has odds endpoints)
- SportBex (trial available)

**Why critical:** Betting affiliate content (semifinals/final previews) needs real odds to be credible. Fake odds = trust killer.

**First Principles:** Betting decisions require real, current odds. Placeholder odds = worse than no odds.
**Effort:** MEDIUM (API integration + rate limiting + caching)
**Impact:** HIGH (enables entire betting content vertical)
**ROI:** VERY HIGH (prerequisite for $15-40 RPM betting content vs $5-10 general)

## Closed in backlog triage 2026-08-10
dup: odds-api-integration
