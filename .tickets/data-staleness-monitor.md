---
id: data-staleness-monitor
status: open
deps: []
links: []
created: 2026-08-04T13:51:17Z
type: feature
priority: 2
parent: rankings123
tags: [data-veracity, monitoring]
---
# Data Sanity: Automate staleness detection (WC/cycling status bugs)

Automate detection of stale tournament status (e.g., showing 'Live' when ended). Add to check:data-sanity.

## Notes

**2026-08-04T13:51:23Z**

## Context
Two recent bugs:
- World Cup showing "Live" when ended July 19 (`bug-wc-tournament-status-stale`)
- Cycling potentially showing stale race status

Manual verification catches these late. Automate staleness detection.

## Acceptance Criteria
- [ ] Add tournament-status sanity check to `npm run check:data-sanity`
- [ ] For each sport with events:
  - [ ] Check event end date vs current date
  - [ ] If ended >7 days ago and showing "Live"/"Active": FAIL
  - [ ] If upcoming event starts <7 days ago and showing "Upcoming": WARN
- [ ] Fail on stale status (kills build, prevents deploy)
- [ ] Add test: World Cup (ended July 19) should NOT show "Live"
- [ ] Add test: TdF (ended July 26) should show "Complete"

## ROI: MEDIUM-HIGH
**Effort:** 4-6 hours  
**Impact:** Prevents stale-status bugs from reaching production  
**First Principles:** Data veracity = trust. Automate verification of temporal correctness.
