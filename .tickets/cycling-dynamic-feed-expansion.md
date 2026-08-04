---
id: cycling-dynamic-feed-expansion
status: open
deps: []
links: []
created: 2026-08-04T13:50:05Z
type: feature
priority: 2
parent: rankings123
tags: [cycling, data]
---
# Cycling Dynamic Feed Expansion (Vuelta, stage races)

Add dynamic feeds for Vuelta 2026 (Aug-Sep) and other active stage races beyond TdF. Prevent staleness.

## Notes

**2026-08-04T13:50:39Z**

## Research Needed
- Vuelta a España 2026 dates (typically late Aug - mid Sep)
- Active stage races NOW (Aug): Tour de Pologne, Tour de Wallonie
- Data sources: FirstCycling API, ProCyclingStats API, Wikipedia

## Acceptance Criteria
- [ ] Research which major races are happening NOW or soon (Aug-Sep 2026)
- [ ] Identify free/keyless data sources for each
- [ ] Add Vuelta 2026 dynamic feed (Wikipedia pattern like TdF)
- [ ] Add "currently active races" detection
- [ ] All races show correct status: upcoming/active/complete
- [ ] Source flags per race

## ROI: MEDIUM
**Effort:** 8-12 hours  
**Impact:** Data accuracy, cycling engagement during non-TdF months  
**First Principles:** Static cycling data worse than none. Kills trust.

Sources:
- https://firstcycling.com/
- https://parse.bot/marketplace/5e1fc7dd-2556-4f19-a5ec-1b945e990340/procyclingstats-com-api
