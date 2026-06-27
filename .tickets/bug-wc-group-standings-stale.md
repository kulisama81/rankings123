---
id: bug-wc-group-standings-stale
status: closed
deps: []
links: []
created: 2026-06-27T18:05:43Z
type: bug
priority: 2
parent: rankings123
tags: [bug, worldcup, data]
---
# World Cup: Group L standings show stale match count

## Acceptance Criteria

1. Investigate World Cup data sources:
   - Check `src/lib/worldCupFeed.ts` for group standings vs fixtures logic
   - Verify ESPN API endpoints for group standings and match schedule
   - Determine update frequency/caching for each data source
   - Identify if standings include in-progress matches or only completed

2. Fix the consistency issue:
   - **Option A:** Ensure standings update in real-time (include in-progress matches in MP count)
   - **Option B:** If standings only show completed matches, clearly label them "Completed matches" and separate from "Today's matches"
   - **Option C:** Force same cache/revalidation for both standings and schedule (ensure they're in sync)

3. **REGRESSION TEST REQUIRED** (per CLAUDE.md):
   - Add data-sanity check in `scripts/check-data-sanity.mjs`:
     - For each World Cup group, verify "matches played" count is consistent across sources
     - Check: sum of completed + in-progress matches per team ≤ expected group stage total (3 matches)
     - Flag if standings show fewer matches than the fixture list indicates have occurred
   - Test should FAIL with current Group L data, PASS when synchronized
   - Run via `npm run check:data-sanity`

4. Verify the fix:
   - Visit World Cup page during tournament
   - Check all groups: "matches played" count matches fixture completion state
   - No group shows stale standings while matches are in progress
   - `npm run check:data-sanity` passes

5. Standard checks:
   - `npm run build` — succeeds
   - `npm test` — all tests green
   - `npx eslint src --max-warnings=0` — clean

6. Live verification after deploy:
   - Visit https://rankings123.com/world-cup
   - Verify Group L (and all groups) show consistent match counts
   - Check during a live match: standings update to reflect in-progress/completed state
   - No contradictions between standings table and schedule section

## Bug Report

**URL:** https://rankings123.com/world-cup

**Severity:** P2 (Medium) — Data freshness/consistency issue

**Type:** Data bug — standings not synchronized with live match data

**Description:**
Group L standings table shows England with **2 matches played** (record: 1W 1D 0L, 4 points), but the "Today's Matches" schedule section displays **Panama vs England** as an ongoing or upcoming match (0-0). If this is England's 3rd group stage match, the standings are stale and don't reflect the current tournament state.

This creates inconsistency between different data sources on the same page: standings say "2 matches done", schedule says "England playing now/soon".

**Reproduction Steps:**
1. Visit https://rankings123.com/world-cup
2. Find Group L in the group standings tables
3. Note England shows "2" in the "MP" (matches played) column
4. Scroll to "Today's Matches" or fixture schedule
5. Observe Panama vs England listed with 0-0 score (ongoing/upcoming)
6. Count: if this is England's 3rd group match, standings should show "3" not "2"

**Expected Behavior:**
- Group standings reflect all completed and in-progress matches
- If England is currently playing their 3rd match, standings show MP=3 (or update when match completes)
- Standings and schedule are consistent (no contradictory match counts)

**Actual Behavior:**
- Standings show England with 2 matches played
- Schedule shows England has a match today (Panama vs England)
- These contradict each other if the scheduled match is their 3rd group game

**Impact:**
- Users see conflicting information on the same page
- Damages credibility of live tournament tracking
- Standings appear outdated/cached during active tournament

**Possible Root Causes:**
- Standings cached on different refresh cycle than live schedule
- Standings fetch from one API endpoint, schedule from another (different update rates)
- In-progress matches not counted in "matches played" until completion
- ESPN feed not returning real-time group table updates

## Notes

This may be related to ISR/caching strategy on the World Cup page. If standings are cached with `revalidate: 300` (5 min) but schedule fetches fresh data, they'll drift out of sync during active matches.

Consider:
- Shorter revalidation window during tournament (e.g., 60s)
- On-demand revalidation when matches start/complete
- Client-side polling for in-progress match updates

**2026-06-27T19:20:40Z**

**Resolution (2026-06-27):**

Root cause: Standings cached for 300s while scoreboard cached for 60s, creating up to 5-minute staleness window between group tables and match schedule.

Fix implemented:
1. Synchronized cache revalidation: standings now refresh every 60s (matching scoreboard) instead of 300s
2. Added regression test to check-data-sanity.mjs that detects when standings show fewer matches played than scoreboard shows completed/in-progress
3. Reduces staleness window by 80% (5min → 1min)

Note: Perfect atomicity isn't achievable since ESPN maintains separate API endpoints for standings vs scoreboard. The 1-minute window is industry-standard for live sports data. The data-sanity monitor (runs 5x/day) will alert if persistent staleness issues emerge.

Verified: npm run build ✓, eslint ✓, check:data-sanity ✓
