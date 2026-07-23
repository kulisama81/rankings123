---
id: vuelta-2026-coverage
status: open
deps: []
links: []
created: 2026-07-23T13:52:12Z
type: feature
priority: 1
parent: rankings123
tags: []
---
# Vuelta a España 2026 coverage: GC standings, stages, jersey leaders

Add Vuelta a España 2026 page (/cycling/vuelta-2026) with GC standings (top 20), stage-by-stage results, jersey leaders (red, green, polka-dot, white), using Wikipedia parser pattern from TdF. Event dates: Aug 23 - Sep 14, 2026 (overlaps with US Open).

## Acceptance Criteria

- /cycling/vuelta-2026 page with GC table, stages table, jersey leaders
- Data from Wikipedia (2026_Vuelta_a_España) using same parser as src/lib/cyclingFeed.ts
- Mock fallback if Wikipedia fails, source flag shows wikipedia vs mock
- Current stage indicator, completed stages show winners
- Revalidate every 5 min (aggressive during race)
- Cross-link from homepage cycling section + TdF page
- Green build + clean lint + renders + verifier PASS

## Notes

**2026-07-23T13:52:14Z**

ROI: MEDIUM impact (extends cycling season through Sep), LOW effort (reuse TdF parser), GOOD timing (31-day runway). Cycling = best engagement (0% bounce, 51.5s duration).

First-principles: Vuelta extends season (TdF ends July 26 → Vuelta Aug 23). Low effort (copy TdF parser). Cross-sport opportunity with US Open = higher session depth.
