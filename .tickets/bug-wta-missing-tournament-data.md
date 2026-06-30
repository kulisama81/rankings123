---
id: bug-wta-missing-tournament-data
status: open
deps: []
links: []
created: 2026-06-29T15:30:00Z
type: bug
priority: 2
parent: rankings123
tags: [bug, wta, data]
---
# WTA Live: Missing tournament data for multiple players

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

## Notes

This issue is similar to ATP Live where 10 players show "—" status, but the WTA issue is more concerning because of the "——" (double dash) pattern which clearly indicates incomplete/corrupt data rather than intentional "not competing" markers.

Consider applying the same fix/clarity to ATP if the WTA investigation reveals UX improvements that should be consistent across both tours.
