---
id: uci-cycling-rankings
status: closed
deps: []
links: []
created: 2026-07-11T13:50:59Z
type: feature
priority: 2
parent: rankings123
tags: [cycling, data, parity]
---
# UCI Cycling World Rankings integration

UCI World Rankings for cycling - separate from TdF, parity gap

## Acceptance Criteria

UCI World Rankings page exists at /cycling/rankings, shows top 100 riders (men/women), data from official UCI or ProCyclingStats, updated weekly (Tuesdays per UCI), server-rendered, sitemap includes, fallback to mock on failure with source flag

## Notes

**2026-07-11T13:51:05Z**

## Cycling Parity + Standalone Feature

**Current state:** We have TdF coverage but NO general cycling rankings.

**Competitors:** ProCyclingStats, FirstCycling, UCI.org all have year-round rankings.

**Data sources researched:**
- UCI official (uci.org/discipline/road) - has rankings, scrape-able
- ProCyclingStats (procyclingstats.com/rankings/me/uci-individual) - Cloudflare-blocked
- SportBex Cycling API (paid but comprehensive)

**First Principles:** Cycling = year-round sport, not just Grand Tours. Fans follow rankings like tennis.
**Effort:** MEDIUM (data source + table UI like tennis)
**Impact:** MEDIUM (cycling traffic is low now, but foundational)
**ROI:** MEDIUM (enables cycling as standalone sport vertical)
