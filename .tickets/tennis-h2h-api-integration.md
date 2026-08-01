---
id: tennis-h2h-api-integration
status: open
deps: []
links: [tennis-h2h-tool]
created: 2026-08-01T14:20:00Z
type: feature
priority: 1
parent: rankings123
tags: [tennis, parity, data]
---
# Tennis Head-to-Head Free API Integration (SteveG Tennis)

Integrate free tennis H2H API to unblock the `tennis-h2h-tool` feature. Research found **SteveG Tennis API** offers free tier with H2H data for ATP/WTA. This provides the data layer needed for H2H comparison tool (parity gap vs live-tennis.eu).

## ROI Justification (First Principles)

**User's root need:** Compare two players head-to-head — who has the edge?

**Why H2H matters (engagement fundamentals):**
- **Rivalry = engagement:** Fans love head-to-head stats (Sinner vs Alcaraz, Djokovic vs anyone)
- **Parity gap:** live-tennis.eu HAS this feature, we DON'T — credibility gap until we ship it
- **Pre-match context:** Before big matches, users search "[Player A] vs [Player B] head to head"

**Why free API matters (feasibility fundamentals):**
- **Zero cost:** SteveG Tennis free tier = no API key cost, sustainable for MVP
- **Quick implementation:** API abstracts H2H logic, just fetch + display
- **Unblocks feature:** `tennis-h2h-tool` ticket has been sitting open; this provides the data source

**Impact vs Effort:**
- **Effort:** Medium (API integration, error handling, data transformation, mock fallback)
- **Impact:** High (unblocks parity-gap feature, strong engagement driver, SEO long-tail)
- **Urgency:** P1 (parity gap, but not time-sensitive — Cincinnati/US Open articles higher priority)

## Acceptance Criteria

- Research SteveG Tennis API docs: https://www.stevegtennis.com/h2h-predictions/tennis-api/
  - Confirm H2H endpoint exists
  - Check rate limits on free tier
  - Review data format (JSON response structure)
- Create `/src/lib/tennisH2HAPI.ts` (or similar) with:
  - `fetchH2H(player1: string, player2: string)` function
  - Returns: overall record, recent matches, surface splits (if available)
  - Error handling: API down, rate limit, no data found
  - Mock fallback if API unavailable
- Type definitions for H2H data structure
- Unit test: mock API responses
- Integration with H2H UI (when built via `tennis-h2h-tool`)
- **Source flag:** Display "Data from SteveG Tennis" or similar attribution
- **Never fabricate:** If API returns no data, show "No H2H data available" NOT fake results
- Builds green, ESLint clean
- Document in code: API source, rate limits, fallback behavior

## Notes

Links to `tennis-h2h-tool` ticket — this provides the data layer for that feature.

Alternative APIs researched (if SteveG Tennis doesn't work):
- Matchstat API (paid, but has free trial)
- Tennis API (api-tennis.com, 14-day trial)
- Could scrape ATP/WTA official H2H pages as last resort
