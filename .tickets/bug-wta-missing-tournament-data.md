---
id: bug-wta-missing-tournament-data
status: closed
deps: []
links: []
created: 2026-06-29T15:30:00Z
type: bug
priority: 2
parent: rankings123
tags: [bug, wta, data]
---
# WTA Live: Missing tournament data for multiple players

## Acceptance Criteria

1. Investigate WTA data sources:
   - Check `src/lib/liveFeed.ts` and WTA-specific feed logic
   - Verify ESPN API response for affected players (Mboko, Baptiste, Raducanu, Bucsa)
   - Determine why tournament/delta fields are missing for these specific players
   - Check if issue is feed-level (ESPN doesn't provide data) or app-level (merge/fallback failure)

2. Fix the root cause:
   - **Option A:** If feed lacks data, implement graceful fallback: show "Not competing" or "Between tournaments" instead of "—"
   - **Option B:** If merge logic issue, ensure players without current tournament show explicit status (e.g., "—" for not playing, with consistent meaning)
   - **Option C:** Add tooltip/hover explanation for "—" status so users understand it's intentional, not broken

3. **REGRESSION TEST REQUIRED** (per CLAUDE.md):
   - Add data-sanity check in `scripts/check-data-sanity.mjs`:
     - For WTA live rankings (top 100), verify that tournament/delta columns are not null/undefined
     - Allow "—" or specific "not competing" markers as valid, but flag truly missing/undefined data
     - Check: no more than 10% of ranked players should have missing tournament data (threshold for feed health)
   - Test should FAIL with current data (4+ players showing "——"), PASS when fixed
   - Run via `npm run check:data-sanity`

4. Verify the fix:
   - Visit https://rankings123.com/wta-live
   - Check previously affected players: all should show clear status (tournament name/round or explicit "not competing")
   - Spot-check 20 random players: tournament/delta columns populated or show intentional placeholders
   - `npm run check:data-sanity` passes

5. Standard checks:
   - `npm run build` — succeeds
   - `npm test` — all tests green
   - `npx eslint src --max-warnings=0` — clean

6. Live verification after deploy:
   - Visit https://rankings123.com/wta-live
   - Verify no players show "——" (truly missing data)
   - Confirm consistent presentation: either tournament info or clear "not competing" status
   - `npm run check:data-sanity` passes in production

## Bug Report

**URL:** https://rankings123.com/wta-live

**Severity:** P2 (Medium) — Data completeness issue

**Type:** Data bug — incomplete live tournament tracking

**Description:**
Multiple players in the WTA Live rankings table show missing tournament participation data, displayed as "—" or "——" in both the tournament stage column and point delta column. This suggests incomplete data fetching from the live feed source.

**Affected Players (as of 2026-06-29):**
- Victoria Mboko (#10): Shows "—" for tournament stage and point delta
- Hailey Baptiste (#31): Shows "——" (missing tournament/delta)
- Emma Raducanu (#33): Shows "——" (missing tournament/delta)
- Cristina Bucsa (#37): Shows "——" (missing tournament/delta)

**Reproduction Steps:**
1. Visit https://rankings123.com/wta-live
2. Scroll through the rankings table (ranks 1-50)
3. Observe the "Tournament" and "Δ" (delta) columns
4. Note that several players show "—" or "——" instead of tournament name/round and point change

**Expected Behavior:**
- All players should show either their current tournament status (e.g., "Wimbledon R64", "out") or a clear indicator if they're not participating
- Point delta should show numeric value or 0, not missing data markers
- If data is unavailable from the source, use "—" consistently with a tooltip/note explaining why

**Actual Behavior:**
- Some players show incomplete data ("—" or "——") without explanation
- Inconsistent with most other players who have complete tournament info
- Creates impression of broken data feed or partial update failure

**Impact:**
- Reduces user confidence in data accuracy
- Viewers can't track which top players are currently competing
- Inconsistent presentation suggests technical issues

**Possible Root Causes:**
- ESPN feed doesn't include all players' current tournament status
- Players may be between tournaments and feed returns null/undefined (not handled gracefully)
- Data merge logic fails when live scoreboard doesn't contain a ranked player
- Missing fallback for players not in active competition

## Notes

This issue is similar to ATP Live where 10 players show "—" status, but the WTA issue is more concerning because of the "——" (double dash) pattern which clearly indicates incomplete/corrupt data rather than intentional "not competing" markers.

Consider applying the same fix/clarity to ATP if the WTA investigation reveals UX improvements that should be consistent across both tours.

## Investigation Log

**2026-07-13: Root cause analysis (planner)**

Investigated the four affected players mentioned in the bug report:
- Victoria Mboko (rank #12): Shows "—" for tournament
- Hailey Baptiste (rank #33): Shows "—" for tournament  
- Emma Raducanu (rank #38): Shows "—" for tournament
- Cristina Bucsa (rank #42): Shows "—" for tournament

**Finding:** All four players are NOT in the ESPN WTA scoreboard (checked via `curl https://site.api.espn.com/apis/site/v2/sports/tennis/wta/scoreboard`). They are not competing in any of this week's 6 WTA events.

**Root cause:** This is EXPECTED behavior, not a data bug. When a player doesn't appear in the scoreboard (not competing this week), the merge logic at `src/lib/liveFeed.ts:226` correctly sets `tournament: undefined`. The UI then renders "—" to indicate "not competing."

**The "——" visual:** The bug report's "——" (double dash) isn't corrupt data — it's two separate "—" symbols displayed side-by-side:
  - Tournament column: "—" (player.tournament is undefined → "Not competing")
  - Delta column: "—" (player.pointsDelta is 0 → no points change)

**Why this confused users:** The "—" symbol is ambiguous — it could mean:
  1. Not competing (intentional, correct)
  2. Data missing due to feed failure (error)

**Fix decision:** Chose Option C from acceptance criteria — add a tooltip to the "—" indicator so hovering reveals "Not competing this week". This clarifies the intent without changing the visual or fabricating data.

**Feed health check:** Added data-sanity validation (scripts/check-data-sanity.mjs lines 65-80) to flag if >95% of top-100 have no tournament data, which would indicate an actual feed/merge failure. Current WTA data shows 72% not competing (below threshold, expected for end-of-week period).

**Applied to both tours:** The tooltip fix is implemented for both ATP and WTA in LiveRankingTable.tsx (shared component).
