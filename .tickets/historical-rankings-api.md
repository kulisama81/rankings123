---
id: historical-rankings-api
status: open
deps: []
links: []
created: 2026-08-04T13:49:58Z
type: feature
priority: 1
parent: rankings123
tags: [data, phase1-parity]
---
# Historical Rankings API (Phase 1 Parity)

Integrate historical ATP/WTA rankings API for rank-on-date feature. Research UTS/Tennis-API for past rankings data.

## Notes

**2026-08-04T13:50:19Z**

## Acceptance Criteria
- [ ] Research free historical rankings APIs: UTS history endpoint, Tennis-API.com, or scrape ATP/WTA archives
- [ ] Integrate endpoint: `/api/tennis/rankings/history?tour={atp|wta}&date={YYYY-MM-DD}`
- [ ] Returns: top 100+ rankings for given date, with rank/name/points/country
- [ ] Cache historical data aggressively (immutable once past)
- [ ] Source flag: `source: "uts" | "atp-archive" | "mock"`
- [ ] Handles missing dates gracefully (nearest available date)
- [ ] Data-layer only; UI is separate (`rank-history` ticket)

## ROI: MEDIUM-HIGH
**Impact:** Phase 1 parity, SEO (long-tail "ATP ranking on [date]" searches)  
**Effort:** 6-8 hours  
**First Principles:** Historical context drives engagement. Fan curiosity about past rankings = session depth.
