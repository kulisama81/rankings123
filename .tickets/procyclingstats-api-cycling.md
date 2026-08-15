---
id: procyclingstats-api-cycling
status: open
deps: []
links: []
created: 2026-08-15T13:50:48Z
type: feature
priority: 1
parent: rankings123
tags: [cycling, data, freshness]
---
# ProCyclingStats API integration (dynamic cycling feed)

DATA FRESHNESS CRISIS: Cycling page uses static/bundled data (goes stale). Example: Tour de Pologne showed 'Live' 4 days after finishing (Aug 13 bug).

SOLUTION: ProCyclingStats API (procyclingstats Python wrapper, Parse.bot API). Provides:
- Current race results + GC standings (not live timing, but published results after stage)
- UCI World Rankings (rider rankings, not just race coverage)
- Race calendar (upcoming races)

PATTERN: Same as tennis/World Cup — dynamic keyless source + mock fallback + 'source' flag.

ROI: 7/10 — Fixes data-freshness defect, enables World Tour coverage beyond Grand Tours, foundational for cycling expansion.

## Acceptance Criteria

✅ Research ProCyclingStats API options (Python wrapper vs Parse.bot vs scraper)
✅ Pick best approach (prefer keyless public if available)
✅ Integrate for Vuelta 2026 GC standings (Aug 22 start)
✅ Add UCI World Rankings route: /cycling/uci-rankings
✅ Mock fallback if API fails
✅ Source flag in UI
✅ Remove static/bundled cycling data
✅ Data sanity check: no 'Live' badges on finished races
✅ Build green
