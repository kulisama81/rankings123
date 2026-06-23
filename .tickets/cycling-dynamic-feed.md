---
id: cycling-dynamic-feed
status: open
deps: []
links: []
created: 2026-06-21T07:54:28Z
type: feature
priority: 1
parent: rankings123
tags: [cycling, data, parity]
---
# Wire dynamic cycling data feed (FirstCycling scraper + UCI rankings)

Replace static mock cycling data with a dynamic feed. Use FirstCycling Python wrapper (baronet2/FirstCyclingAPI) or scraping to fetch UCI rankings + race results. Pattern: fetch → transform → mock fallback + source flag (never fabricate, never go stale). Wire for: UCI individual rankings (top 50+), team rankings, and current/recent race GC standings (Giro 2026 final, Tour de Suisse live, Tour de France upcoming).

## Acceptance Criteria

✓ Dynamic cycling feed wired (FirstCycling or similar keyless source)
✓ UCI individual rankings (top 50+) with rider, team, points, nationality
✓ Team rankings available
✓ Race results available (at minimum: completed Giro 2026, ongoing/upcoming TdF 2026)
✓ Mock fallback + source flag pattern (espn/firstcycling/mock)
✓ Never fabricates data - degrades gracefully to mock on fetch failure
✓ Data persists across builds (check:data-integrity passes)
✓ No Math.random, Math.sin, or synthetic generators in data layer

## Notes

**2026-06-21T07:54:43Z**

**ROI Justification (First Principles):**

FUNDAMENTAL TRUTH: Users need accurate, current data. Static data that goes stale = broken trust = lost traffic.

CURRENT STATE: Cycling is on static 2024 mock data. Giro 2026 (completed May 31) is missing. Tour de Suisse (ongoing NOW, June 17-21) is missing. Cycling shown as 'upcoming' when it's already happened = credibility destroyer.

DIRECT SOLUTION: Wire a dynamic feed (FirstCycling wrapper, keyless, scrapes UCI data) with mock fallback, exactly like tennis/World Cup pattern. Updates automatically, never goes stale.

IMPACT vs EFFORT:
- Impact: HIGH - fixes credibility gap, enables cycling as a live sport (Tour de France starts June 27 - 6 days away!), unlocks cycling SEO/traffic
- Effort: MEDIUM - established pattern (see tennis liveFeed.ts), FirstCycling Python wrapper exists
- ROI: HIGH - unblocks cycling as a first-class sport + Phase 1 parity

DATA SOURCES EVALUATED:
✗ ESPN cycling - does NOT exist (404)
✓ FirstCycling API wrapper (https://github.com/baronet2/FirstCyclingAPI) - keyless, scrapes rankings + race results
✓ ProCyclingStats - scraping viable but needs wrapper OR RapidAPI key
✗ UCI DataRide - login-restricted

RECOMMENDATION: Start with FirstCycling wrapper (most direct, keyless, documented). Fallback to PCS scraping if needed.

**2026-06-23T04:18:46Z**

BLOCKED: No keyless public UCI rankings API available. ESPN has no cycling data. FirstCycling/PCS require Python scrapers with Cloudflare bypass. Needs Python microservice infrastructure (out of scope for autonomous loop). Recommend human evaluation of alternatives.
