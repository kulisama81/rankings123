---
id: f1-driver-constructor-standings
status: open
deps: []
links: []
created: 2026-07-23T13:51:57Z
type: feature
priority: 1
parent: rankings123
tags: []
---
# Formula 1 driver & constructor championship standings (OpenF1 API)

Build F1 championship standings page using OpenF1 API (https://api.openf1.org): Driver standings table (rank, driver, team, points) + Constructor standings table (rank, constructor, points). Real-time updates during race weekends (every 4 sec). Mock fallback + source flag. Launch BEFORE next F1 race weekend.

## Acceptance Criteria

- /f1 page with 2 tables: Drivers (rank, name, team, points) + Constructors (rank, team, points)
- Data from OpenF1 API (keyless, free, real-time)
- Mock fallback if API fails (bundled 2026 season snapshot)
- source flag shows openf1 vs mock
- Mobile-optimized (responsive tables, horizontal scroll if needed)
- Revalidate every 5 min (aggressive during race weekends)
- Green build + clean lint + renders in browser + independent verifier PASS

## Notes

**2026-07-23T13:52:03Z**

ROI: VERY HIGH impact (445M fans, 24 races/year, high betting RPM), MEDIUM effort (new sport, 2 tables), URGENT timing (launch before next race weekend). Revenue potential: $1,250/race × 24 races = $30K annual baseline.

First-principles: F1 fans need LIVE standings during race weekends. Most F1 sites are news/video-heavy; a FAST, data-first standings page fills a gap. 24 races/year = 24 SEO events + 24 betting windows (vs tennis ~15 major tournaments).
