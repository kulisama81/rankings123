---
id: tennis-live-scores-integration
status: open
deps: []
links: []
created: 2026-07-28T13:51:34Z
type: feature
priority: 1
parent: rankings123
tags: []
---
# Tennis live match scores integration (in-progress matches)

Live-tennis.eu shows live match scores for in-progress matches. We show live RANKING updates but not live MATCH scores. Major parity gap. ESPN scoreboard has this data (we already fetch it for ranking calc).

## Acceptance Criteria

Display live match scores on ATP/WTA live pages: show in-progress matches with current score (sets, games), tournament name, round, link to match detail. Update every 60s (same as rankings). Data from ESPN scoreboard (already fetched). ROI: Core feature parity with live-tennis.eu, increases time-on-site (fans track matches + rankings together).
