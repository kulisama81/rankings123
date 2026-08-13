---
id: procyclingstats-api-integration
status: open
deps: []
links: []
created: 2026-08-13T13:51:26Z
type: feature
priority: 1
parent: rankings123
tags: []
---
# ProCyclingStats API Integration — Dynamic Cycling Feed

Replace Wikipedia scraping with ProCyclingStats API for dynamic cycling data. CURRENT PROBLEM: Wikipedia parsing breaks, races show as 'Live' when finished (Tour de Pologne bug). ProCyclingStats has 13 endpoints with race metadata, results, real-time updates, rider positions. FREE tier available. ACCEPTANCE: Cycling feed uses ProCyclingStats API, mock fallback retained, race status auto-detects (live/finished/upcoming). ROI: 6-8 hours, solves recurring staleness bugs.
