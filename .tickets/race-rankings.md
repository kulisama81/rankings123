---
id: race-rankings
status: open
deps: []
links: []
created: 2026-06-14T22:51:04Z
type: feature
priority: 1
parent: tennis-site
tags: [feature, data]
---
# Race rankings (ATP + WTA, YTD)

Race to Turin / year-to-date rankings — second-most-used view on the competitor.

## Acceptance Criteria

/atp-race + /wta-race render YTD points from ESPN; switcher; build+lint green.

## Notes

**2026-06-23T04:19:59Z**

BLOCKED: ESPN API does not provide race/YTD rankings data. Only standard 52-week rolling rankings available. Ticket acceptance criteria assumes ESPN has this data, but it doesn't. Needs alternative data source (UTS, ATP/WTA official APIs) or ticket scope revision.
