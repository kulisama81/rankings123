---
id: live-event-status-api
status: open
deps: []
links: []
created: 2026-07-06T13:49:14Z
type: feature
priority: 2
parent: rankings123
tags: [infrastructure, api]
---
# Live event status API endpoint

Create /api/live-status endpoint that returns JSON of all currently live events (WC matches, TdF stage in progress, Wimbledon matches, ATP/WTA tournaments). Powers cross-sport widgets, homepage live banner, mobile app integrations. Cacheable (60s ISR). First principles: DRY - one source of truth for 'what's live' used across site.

## Acceptance Criteria

GET /api/live-status returns JSON: {worldCup: {live: bool, round: string}, tdf: {live: bool, stage: number}, wimbledon: {...}, atpWta: {...}}. 60s ISR. Consumed by homepage, cross-sport module. Tested. Effort: LOW. Impact: MEDIUM (enables other features).
