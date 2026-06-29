---
id: wc-standings-sync-bug
status: open
deps: []
links: []
created: 2026-06-29T18:05:30Z
type: bug
priority: 1
parent: rankings123
tags: [bug, worldcup, data]
---
# World Cup: Live match scores contradict group standings

URL: https://rankings123.com/world-cup

Repro: Visit /world-cup during an active match. Live match shows Brazil 0-1 Japan (in progress), but Group C standings show Brazil with 2W-1D-0L (7 pts) - a contradiction since Brazil is currently losing.

Expected: Standings should either (a) show current standings labeled 'before this match', OR (b) show projected standings accounting for in-progress results. No contradictions.

Actual: Live match shows Brazil losing, standings show Brazil with 0 losses.

Severity: P1 - data consistency during World Cup high-traffic period.

## Acceptance Criteria

1. Fix sync between live match data and group standings
2. Add regression test (unit test in tests/ OR new invariant in scripts/check-data-sanity.mjs) that verifies match results propagate to standings correctly and detects contradictions
3. Verify on live site: no contradictions between live scores and standings
