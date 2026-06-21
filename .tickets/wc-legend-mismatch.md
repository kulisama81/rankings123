---
id: wc-legend-mismatch
status: closed
deps: []
links: []
created: 2026-06-21T07:15:02Z
type: bug
priority: 2
parent: rankings123
tags: [worldcup, ui, bug]
---
# World Cup legend shows Advancing/Eliminated colours but no team is marked

On https://rankings123.com/world-cup the standings legend always shows 'Advancing' (green) and 'Eliminated' (red) keys, but mid-group no team has a confirmed advanced/out outlook (we correctly only mark confirmed status once group games complete), so NO row is actually coloured green/red. Result: the legend advertises states that aren't present — a confusing mismatch. Fix in src/components/WorldCupTable.tsx: only render each legend item when at least one team currently has that outlook (and/or show a small 'decided once the group stage finishes' note when none). Keep the confirmed-only logic intact.

## Acceptance Criteria

1) Legend only shows the 'Advancing'/'Eliminated' keys that correspond to outlooks actually present on the page right now; no key shown with zero matching rows. 2) When teams ARE confirmed advanced/out, the matching key shows and rows are coloured. 3) REGRESSION TEST REQUIRED: a node --test unit test under tests/ for the helper that derives which legend keys to show given a set of teams (fails on the current always-show behaviour, passes after the fix); npm test green. 4) tokens-themed dark+light; build/lint/readability green; live-verified.
