---
id: data-sanity-validator
status: closed
deps: []
links: []
created: 2026-06-21T06:47:49Z
type: chore
priority: 1
parent: rankings123
tags: [infra, quality, data]
---
# Per-sport data-sanity validator with auto-ticketing

Runtime validator (scripts/check-data-sanity.mjs) that fetches served data per sport (ATP/WTA/World Cup + projected bracket) and asserts real-world invariants; on failure it writes/updates an open data-anomaly ticket (timestamped log) so the planner fixes the feed/parse logic and logs the resolution. Adds /api/worldcup/bracket endpoint for validation.

## Acceptance Criteria

Validator checks ATP/WTA (rank order, no dupes, non-negative, points monotonic) + World Cup (points=3W+D, GD=GF-GA, played<=3, 12 groups of 4) + bracket (no same-group R32 ties, labels match real group); on error files data-anomaly (p0) with log; planner treats data-anomaly as Tier 1; runs clean on current production data.
