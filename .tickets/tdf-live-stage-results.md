---
id: tdf-live-stage-results
status: open
deps: []
links: []
created: 2026-07-11T13:49:17Z
type: feature
priority: 1
parent: rankings123
tags: [cycling, live]
---
# Tour de France LIVE stage results fix

Fix stale preview data - race is IN PROGRESS

## Acceptance Criteria

TdF page shows actual stage winners for completed stages (not dashes), GC standings show real leader + top 10, jersey leaders show real riders, last updated timestamp visible, fallback to mock only if both Wikipedia + ESPN fail

## Notes

**2026-07-11T13:49:48Z**

## ROI Justification

**URGENT - Race IN PROGRESS** (July 4-26, Stage 7-8 now). Cycling page shows "preview data" when race is LIVE. Analytics: 7 views, 0% bounce (users WANT this).

**First Principles:** Fans want TODAY'S stage winner + GC leader during race, not after. 
**Effort:** LOW-MED (Wikipedia source exists, likely parsing fix)
**Impact:** MED-HIGH (15 days daily traffic, 0% bounce)
**ROI:** HIGH
