---
id: points-defend-data-source
status: open
deps: []
links: []
created: 2026-08-04T13:50:00Z
type: feature
priority: 1
parent: rankings123
tags: [data, phase1-parity]
---
# Points to Defend Data Source (Phase 1 Parity)

52-week rolling points data source for points-to-defend feature. Requires player tournament results from 52 weeks ago.

## Notes

**2026-08-04T13:50:26Z**

## Acceptance Criteria
- [ ] Research 52-week data sources: UTS player activity history, Tennis-API.com, ESPN player stats
- [ ] Integrate data source: player's tournament results from 52 weeks ago (round reached, points earned)
- [ ] Calculate points dropping: sum points from tournaments THIS week 52 weeks ago
- [ ] Endpoint: `/api/tennis/points-defend?tour={atp|wta}&player={id}`
- [ ] Returns: total points dropping this week, breakdown by tournament
- [ ] Source flag: `defendSource: "uts" | "espn" | null`
- [ ] Data-layer only; UI tickets are `points-defend` and `defend-next`

## ROI: HIGH
**Impact:** Phase 1 parity, unblocks 2 UI tickets  
**Effort:** 8-10 hours (complex rolling window logic)  
**First Principles:** Points-to-defend = strategic insight fans need. "Can Alcaraz hold his ranking?" = tournament-week obsession.
