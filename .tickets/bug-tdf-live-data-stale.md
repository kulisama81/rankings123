---
id: bug-tdf-live-data-stale
status: open
deps: []
links: []
created: 2026-07-13T13:48:03Z
type: bug
priority: 0
parent: rankings123
tags: [bug, cycling, data]
---
# Tour de France live data showing stale preview when race is live (stage 9)

## Notes

**2026-07-13T13:48:23Z**

## CRITICAL DATA BUG

**Current State:** rankings123.com/cycling shows 'General Classification will update once the race begins on July 4, 2026. Currently showing preview data.' ALL stage winners show '—' dashes.

**Reality:** Tour de France 2026 is LIVE NOW (stage 9, rest day July 13). Tadej Pogačar leads by 2:42 over Vingegaard. 9 stages completed.

**Impact:** TRUST DESTROYER. Claiming 'live' when showing stale data is worse than no data. Users arrive, see placeholder, never return.

**Root Cause:** Wikipedia API feed is configured but parsing/display logic not working. See src/lib/cyclingFeed.ts line 1-50.

**Fix Required:**
1. Verify Wikipedia API returns live data (test fetch)
2. Fix parsing if broken OR switch to alternate source (ProCyclingStats, FirstCycling)
3. Display actual GC standings with Pogačar in yellow, stage winners 1-9
4. Show 'Last updated: [timestamp]' so staleness is visible
5. Regression test: check:data-sanity must FAIL on stale cycling data

**Verification:** Visit /cycling, see Pogačar leading GC with actual times, stages 1-9 show real winners (not dashes).
