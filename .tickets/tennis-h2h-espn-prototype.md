---
id: tennis-h2h-espn-prototype
status: closed
deps: []
links: []
created: 2026-07-23T13:52:21Z
type: feature
priority: 1
parent: rankings123
tags: [tennis, parity]
---
# Tennis head-to-head tool (ESPN data prototype)

Build tennis H2H comparison tool using ESPN data. User selects 2 players → see career head-to-head (total meetings, last 5 matches, surface breakdown if available). MVP using free ESPN data; note upgrade path to tennis-api.com ($49/mo) once revenue > $0.

## Acceptance Criteria

- /tennis/head-to-head page with player search/autocomplete (ATP/WTA top 100)
- Select 2 players → display: total meetings, career record, last 5 matches
- Data from ESPN scoreboard + rankings APIs (free, keyless)
- Surface breakdown if ESPN provides it (hard/clay/grass records)
- Mobile-optimized (responsive cards/tables)
- Note in code: Upgrade to tennis-api.com when revenue > $0
- Green build + clean lint + renders + verifier PASS

## Notes

**2026-07-23T13:52:22Z**

ROI: HIGH impact (P0 parity gap, betting driver), LOW effort (ESPN data we already fetch), NO cost (free).

First-principles: Bettors NEED H2H to make informed wagers. live-tennis.eu has H2H (Phase 1 parity gap). Free ESPN prototype ships NOW; paid upgrade waits for revenue > $0. H2H = betting decision tool → high affiliate CTR.

## Closed in backlog triage 2026-08-10
dup: tennis-h2h-tool
