---
id: verify-tdf-complete-status
status: open
deps: []
links: []
created: 2026-08-04T13:50:03Z
type: task
priority: 2
parent: rankings123
tags: [data-veracity, cycling]
---
# Verify TdF Complete Status (July 26)

Verify Tour de France shows 'complete' status (ended July 26). Pogačar won. Quick browser verification.

## Notes

**2026-08-04T13:50:31Z**

## Acceptance Criteria
- [ ] Visit https://rankings123.com/cycling in browser
- [ ] Verify Tour de France shows: "Complete" (not "Live" or "Active")
- [ ] Verify final GC: Pogačar #1, Evenepoel #2, Del Toro #3
- [ ] Verify all 21 stages show winners
- [ ] If incorrect: debug Wikipedia parser (cyclingFeed.ts lines 320-336)
- [ ] Close with verification screenshot

## ROI: MEDIUM
**Effort:** 15-30 minutes  
**Impact:** Data veracity enforcement  
**First Principles:** Stale race status = instant credibility loss

Sources:
- https://www.npr.org/2026/07/26/nx-s1-5908503/tadej-pogacar-tour-de-france-2026-winner-wildfires
