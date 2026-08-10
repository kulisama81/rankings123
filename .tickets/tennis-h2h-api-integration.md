---
id: tennis-h2h-api-integration
status: closed
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

## Acceptance Criteria

- [ ] Evaluate StevegTennis free API for H2H data (ATP/WTA coverage, request limits, response format)
- [ ] Integrate H2H API endpoint: `/api/tennis/h2h?player1={id}&player2={id}`
- [ ] Returns: total meetings, surface breakdown, recent matches (last 5), head-to-head record
- [ ] Handles API failures with graceful degradation (empty state, not fabricated data)
- [ ] Source flag: `h2hSource: "stevegtennis" | "mock" | null`
- [ ] NOT A UI TICKET — this is API/data-layer only; the UI ticket is separate (`head-to-head`)

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

## Notes

Links to `tennis-h2h-tool` ticket — this provides the data layer for that feature.

Alternative APIs researched (if SteveG Tennis doesn't work):
- Matchstat API (paid, but has free trial)
- Tennis API (api-tennis.com, 14-day trial)
- Could scrape ATP/WTA official H2H pages as last resort

**2026-08-04T13:49:16Z**

## Context

live-tennis.eu has head-to-head player comparison (Phase 1 parity gap). Free H2H APIs available: StevegTennis (free tier), Tennis-API.com, MatchStat.

## ROI Justification

**First Principles:** H2H is a CORE tennis fan need — "who wins when these two play?" is the #1 question before any match. Parity feature that unblocks the `head-to-head` UI ticket. StevegTennis free tier = zero cost, high engagement value.

**Impact:** Phase 1 parity gap closure, high engagement (fans obsess over H2H before big matches)  
**Effort:** 4-6 hours (API eval + integration + error handling)  
**ROI:** HIGH

**Sources:**
- https://matchstat.com/tennis/head-to-head/
- https://www.stevegtennis.com/h2h-predictions/tennis-api/
- https://tennis-api.com/tennis-h2h-api/

## Closed in backlog triage 2026-08-10
dup: tennis-h2h-tool
