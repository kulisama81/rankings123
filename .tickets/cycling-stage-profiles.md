---
id: cycling-stage-profiles
status: open
deps: []
links: []
created: 2026-06-27T22:00:23Z
type: feature
priority: 1
parent: rankings123
tags: [cycling, tdf, engagement]
---
# TdF stage profiles: elevation gain + climb profiles + upcoming stages

For the Tour de France subsection, make following the race FUN: per-stage detail with distance, total ELEVATION GAIN (vertical meters), stage type (flat/hilly/mountain/ITT), categorized climbs, start/finish towns, and the elevation PROFILE (ProCyclingStats exposes stage profile + vertical-meters data per stage). Highlight UPCOMING stages prominently (next stage countdown + what to expect). Source via the TS PCS scraper from cycling-dynamic-feed; mock fallback + source flag; never fabricate. Part of the /cycling/tour-de-france-2026 subsection.

## Acceptance Criteria

1) TdF stage list shows each stage's distance + elevation gain + type + start/finish; upcoming stages highlighted with what-to-expect. 2) Stage elevation profile shown (image/chart from PCS or rendered from profile data). 3) Real data via the TS scraper (source flag), no fabrication/placeholder. 4) tokens-themed, mobile; build/lint/check green; live-verified.
