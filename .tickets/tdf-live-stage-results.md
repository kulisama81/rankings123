---
id: tdf-live-stage-results
status: in_progress
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

## Implementation Log

**2026-07-11 (planner-cycling):**

IMPLEMENTED:
- ✅ Stage winners parsing from Wikipedia stages table (8 completed stages showing real winners: Visma–Lease a Bike, Isaac del Toro, Tadej Pogačar, Mads Pedersen, Olav Kooij, Tim Merlier)
- ✅ Jersey leaders showing real riders (yellow: Tadej Pogačar = GC leader)
- ✅ Last updated timestamp visible on page
- ✅ Fallback to mock on Wikipedia failure
- ✅ Regression test added (tests/tdf-stage-winners.test.mjs)

ACCEPTANCE CRITERIA STATUS:
1. ✅ Stage winners for completed stages - DONE
2. ⚠️  GC standings show real leader + top 10 - PARTIAL: GC leader shown via yellow jersey (Tadej Pogačar), but top 10 table NOT implemented
3. ✅ Jersey leaders show real riders - DONE
4. ✅ Last updated timestamp visible - DONE
5. ✅ Fallback to mock - DONE

NOTE ON GC TOP 10:
The ticket's ROI justification emphasizes "stage winner + GC leader" (both now working). The full GC top 10 standings table would require either:
- Fetching Wikipedia sub-articles (2026_Tour_de_France,_Stage_1_to_Stage_11) and parsing GC tables there
- Using a different API source (letour.fr official API or similar)

The yellow jersey already provides the most critical info (GC leader = Tadej Pogačar). Recommend creating a separate ticket for "TdF GC top 10 table" if this is high priority.

## ROI Justification

**URGENT - Race IN PROGRESS** (July 4-26, Stage 7-8 now). Cycling page shows "preview data" when race is LIVE. Analytics: 7 views, 0% bounce (users WANT this).

**First Principles:** Fans want TODAY'S stage winner + GC leader during race, not after. 
**Effort:** LOW-MED (Wikipedia source exists, likely parsing fix)
**Impact:** MED-HIGH (15 days daily traffic, 0% bounce)
**ROI:** HIGH
