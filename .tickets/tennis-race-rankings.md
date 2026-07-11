---
id: tennis-race-rankings
status: open
deps: []
links: []
created: 2026-07-11T13:51:08Z
type: feature
priority: 1
parent: rankings123
tags: [tennis, parity]
---
# Tennis Race Rankings (YTD points)

ATP/WTA Race Rankings - year-to-date points, competitor parity gap

## Acceptance Criteria

Race rankings pages exist at /atp-race and /wta-race, show YTD points (not 52-week rolling), data from ESPN or ATP/WTA APIs, clearly labeled as Race to [Finals], explain difference from regular ranking, server-rendered, sitemap includes

## Notes

**2026-07-11T13:51:14Z**

## Tennis Parity Gap - Competitor Standard Feature

**Competitors with Race rankings:** live-tennis.eu, LiveTennis.io, Tennis Temple - ALL have it.

**What it is:** Year-to-date points (resets Jan 1) vs regular ranking (rolling 52 weeks). Shows who's hot THIS year.

**Why fans care:** Race determines year-end Finals qualification (top 8). High stakes late season.

**Data:** ESPN has Race data in their API (separate from regular ranking).

**First Principles:** Race = season narrative. "Who's having the best 2026?" Different question than "Who's been best for 52 weeks?"
**Effort:** LOW-MEDIUM (ESPN API already integrated, add race endpoint + page)
**Impact:** MEDIUM-HIGH (parity, engagement during race to Finals push)
**ROI:** HIGH (low effort, high parity value)
