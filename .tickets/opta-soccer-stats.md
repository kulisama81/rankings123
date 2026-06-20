---
id: opta-soccer-stats
status: open
deps: []
links: []
created: 2026-06-20T22:36:43Z
type: feature
priority: 2
parent: rankings123
tags: [worldcup, data, research]
---
# Evaluate Opta (Stats Perform) as an advanced soccer-stats source

Investigate Opta / Stats Perform football data (xG, possession, pass maps, shot maps, player ratings, momentum, advanced team/player stats) as a richer source for World Cup + future soccer coverage, to differentiate beyond ESPN's basic feed. Opta is primarily a licensed/paid feed, so assess access tiers + cost + terms; if not viable now, identify the best FREE/public alternative that surfaces similar advanced stats (FotMob, SofaScore, FBref/StatsBomb, Understat, ESPN advanced endpoints) and wire that in with the standard keyless+mock-fallback+source-flag pattern. Opta becomes one named option in the agents' standing 'always look for new stats' source list.

## Acceptance Criteria

1) Written assessment of Opta access/cost/licensing + a ranked shortlist of advanced-soccer-stat sources (free vs paid). 2) At least one concrete advanced stat we can ship now from a viable source identified, with the endpoint + a follow-up build ticket filed. 3) Opta + the shortlisted providers are recorded as source options in autoresearch.md and planner.md so future stat-hunting runs consider them. 4) No fabricated data; chosen source degrades to mock + exposes a source flag.
