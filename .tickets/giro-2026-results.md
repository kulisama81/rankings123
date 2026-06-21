---
id: giro-2026-results
status: open
deps: []
links: []
created: 2026-06-21T07:56:10Z
type: task
priority: 1
parent: rankings123
tags: [cycling, data, quick-win]
---
# Update Giro 2026 mock data with real final results (Vingegaard win)

Quick fix: update the static Giro 2026 event data (src/data/index.ts) with the REAL final results. Currently shows status='upcoming' with empty rankings[], but the race finished May 31, 2026. Update with: status='completed', final GC top 10 (Vingegaard won, Gall 2nd at +5:22, Hindley 3rd at +6:25, etc.). This is a stopgap before cycling-dynamic-feed ships - at least shows accurate historical data. Sources: Olympics.com, CyclingNews, ProCyclingStats articles.

## Acceptance Criteria

✓ Giro 2026 event in src/data/index.ts updated:
  - status: 'completed' (was 'upcoming')
  - endDate: '2026-05-31' (verify)
  - rankings: final GC top 10 with rider, team, nationality, time/gap
✓ Top 3 verified correct:
  1. Jonas Vingegaard (Visma-Lease a Bike)
  2. Felix Gall (Decathlon CMA CGM) +5:22
  3. Jai Hindley (Red Bull-Bora-Hansgrohe) +6:25
✓ /events/giro-2026 page shows completed results (not 'upcoming')
✓ Data sourced from reputable cycling sites (link sources in commit message)
✓ No fabricated/estimated data - only verified final results
✓ check:data-integrity passes

## Notes

**2026-06-21T07:56:22Z**

**ROI Justification (First Principles):**

FUNDAMENTAL TRUTH: Showing completed events as 'upcoming' with no results = broken credibility. Users lose trust immediately.

CURRENT DEFECT: Giro 2026 finished May 31 (21 days ago!) but we show it as 'upcoming' with empty rankings. This is a data-accuracy bug, not a feature gap.

WHY QUICK-WIN:
- Effort: VERY LOW (15 min) - just update static mock data in src/data/index.ts with verified final results
- Impact: MEDIUM - fixes credibility gap, shows we have real cycling coverage
- Can ship TODAY, doesn't block on cycling-dynamic-feed

SOURCES FOR FINAL RESULTS:
- Olympics.com: https://www.olympics.com/en/news/road-cycling-giro-d-italia-2026-full-schedule-all-results-general-classification-standings
- CyclingNews: https://www.cyclingnews.com/pro-cycling/racing/giro-d-italia-gc-standings-2026/
- Wikipedia: https://en.wikipedia.org/wiki/2026_Giro_d'Italia

This is a stopgap - cycling-dynamic-feed will automate this in the future, but we can't wait 21+ days showing stale 'upcoming' status.
