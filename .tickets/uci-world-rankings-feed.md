---
id: uci-world-rankings-feed
status: open
deps: []
links: []
created: 2026-08-11T13:50:23Z
type: feature
priority: 1
parent: rankings123
tags: [cycling, data-source, parity]
---
# UCI World Cycling Rankings dynamic feed — expand beyond race coverage to rider rankings

COVERAGE GAP: We show Tour de France race GC but NO overall UCI World Rankings (equivalent of ATP/WTA rankings for cycling). Users want to know who's #1 cyclist RIGHT NOW across all races, not just during TdF. PARITY: ProCyclingStats, CyclingNews, UCI.org all show live world rankings. We only show individual race standings. FIRST-PRINCIPLES: Rankings are the CORE product (site is rankings123.com). Cycling currently has RACES but no RANKINGS. That's backwards. ENGAGEMENT: Race coverage = spike during 3 weeks. Rankings = evergreen year-round traffic (Pogačar vs Vingegaard vs Evenepoel ranking battles).

## Acceptance Criteria

1. Data source: Evaluate UCI official rankings vs ProCyclingStats scraper vs FirstCycling. Pick most reliable keyless source with mock fallback. 2. Feed implementation: getUCIRankings() returns top 100 riders with rank, points, nationality, team (same pattern as ATP/WTA feeds). 3. Page: /cycling/rankings shows UCI World Rankings table (sortable, country filter, pagination). 4. Homepage integration: Add UCI Rankings to 'All Sports' section alongside ATP/WTA. 5. SEO meta: 'UCI Cycling Rankings 2026 — Live World Rankings'. 6. Source flag: Display data source (uci/procyclingstats/mock) and last-updated timestamp. TEST: Verify top 10 rankings match UCI.org or ProCyclingStats. Check mock fallback on source failure. ROI: 6-10 hours effort (data source research + feed + UI). FILLS major coverage gap. UCI rankings = 5K searches/month evergreen vs races = 10K during 3-week spikes. Year-round traffic vs seasonal.
