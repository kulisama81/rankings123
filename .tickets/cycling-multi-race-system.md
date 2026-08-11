---
id: cycling-multi-race-system
status: in_progress
deps: []
links: []
created: 2026-08-11T13:49:11Z
type: feature
priority: 0
parent: rankings123
tags: [cycling, data-freshness, timely]
---
# Cycling multi-race coverage system — fix single-race limitation blocking Vuelta

Current cycling section hardcoded to Tour de France only. Vuelta a España starts Aug 22 (11 days) but we can't cover it alongside/instead of TdF without major refactor. FIRST-PRINCIPLES ROI: Multi-race reality — Grand Tours don't serialize. Vuelta (Aug 22-Sep 13) overlaps with US Open (Aug 30-Sep 13). We need concurrent multi-sport AND multi-race within cycling. Current architecture blocks growth: Single getTdfSnapshot() can't add Vuelta without removing TdF. Data-source leverage: Wikipedia pattern works for ANY Grand Tour. ONE refactor → infinite races.

## Acceptance Criteria

1. Multi-race feed: getCyclingRaces() returns array of active/recent races (TdF, Vuelta, Giro, Poland). 2. Race auto-discovery: Parse dates, auto-detect status (upcoming/active/complete/archived). 3. Vuelta a España 2026 coverage live (Aug 22-Sep 13) using Wikipedia. 4. Homepage integration: Vuelta shows when active, TdF shows as Final Results. 5. Archived races: TdF 2026 stays accessible at /cycling/tour-de-france-2026. 6. Dynamic meta tags per race status. TEST: Verify Vuelta live before Aug 22, both TdF (complete) and Vuelta (upcoming) show Aug 22+. ROI: 8-12 hours effort, UNBLOCKS all future cycling. Vuelta = 10K searches. URGENT — 11 days until Aug 22.
