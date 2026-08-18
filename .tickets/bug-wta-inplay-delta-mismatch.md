---
id: bug-wta-inplay-delta-mismatch
status: closed
deps: []
links: []
created: 2026-07-18T00:00:00Z
type: bug
priority: 2
parent: rankings123
tags: [bug, wta, data, consistency]
---
# WTA Live: "In play" tournament count doesn't match players with point changes

**URL:** https://rankings123.com/wta-live

**Severity:** P2 (Medium) — Data consistency / UI legend mismatch

**Type:** Data consistency bug

**Description:**
The WTA Live page displays a legend indicating "In play (21)" suggesting 21 tournaments are currently active with players competing. However, when examining the actual ranking data, only ~8 players show non-zero point changes (Δ≠0), which is inconsistent with 21 active tournaments.

**Specific findings:**
- Legend states: "In play (21)" with 8 tournaments listed
- Only 8-9 players show point changes: Clara Tauson (+110), Ann Li (+30), Maria Sakkari (+180), Marie Bouzkova (+1), Barbora Krejcikova (+1), Sara Bejlek (+1), Nikola Bartunkova (+1), Petra Marcinko (+60), Oleksandra Oliynykova (+110)
- The vast majority of the displayed top 50 players show Δ=0 despite tournaments being marked as "in play"

**Reproduction Steps:**
1. Visit https://rankings123.com/wta-live
2. Note the "In play" count at the top (currently shows "21")
3. Scan through the ranking table's Δ (point change) column
4. Count how many players have non-zero Δ values
5. Observe the mismatch: 21 tournaments "in play" should produce more than 8-9 players with point changes

**Expected Behavior:**
- If 21 tournaments are truly "in play", we should see significantly more than 8-9 players with non-zero Δ values
- The "in play" count should reflect tournaments that actually have players showing point changes in the current feed
- OR: The Δ column should show point changes for all players competing in those 21 tournaments

**Actual Behavior:**
- "In play (21)" legend suggests broad tournament activity
- Only ~8 players show Δ≠0 in the actual data
- This creates a legend-versus-data consistency issue that confuses users

**Impact:**
- Undermines trust in data accuracy
- Users see "21 tournaments" but minimal ranking movement, creating confusion
- Suggests either the "in play" count is wrong or the point changes aren't being calculated correctly

**Possible Root Causes:**
- "In play" count may be counting tournaments from the ESPN feed that don't have ranked players
- Point change calculation (Δ) may not be updating for all active participants
- Tournament completion status may not be syncing correctly with the ranking updates
- The legend may be showing tournaments scheduled/ongoing but whose results haven't been processed yet

## Acceptance Criteria

1. Investigate the "In play" count calculation:
   - Check where this count comes from in the WTA live feed logic
   - Determine if it's counting tournaments with active matches vs tournaments with ranked players
   - Verify the 8 listed tournaments against the "21" count

2. Investigate the Δ calculation for active tournament participants:
   - Check `src/lib/liveFeed.ts` and WTA-specific feed logic
   - Verify that players competing in "in play" tournaments are having their point changes calculated
   - Determine why only 8-9 players show Δ≠0 when 21 tournaments are marked as active

3. Fix the root cause (choose appropriate option):
   - **Option A:** Fix the "In play" count to only show tournaments that have ranked players with point changes
   - **Option B:** Fix the Δ calculation to properly update for all players in active tournaments
   - **Option C:** Add clarification to the UI (e.g., "In play (21 tournaments, 8 with ranked players)")

4. **REGRESSION TEST REQUIRED** (per CLAUDE.md):
   - Add data-sanity check in `scripts/check-data-sanity.mjs`:
     - For WTA live rankings, if "in play" count > 0, verify that at least 20% of that count shows in non-zero Δ values
     - Example: if 21 tournaments "in play", expect at least 4-5 players with Δ≠0 (allowing for tournaments without top-ranked players)
     - Flag when "in play" count is >10 but <3 players show point changes (clear data inconsistency)
   - Test should FAIL with current data (21 in play, only 8-9 Δ≠0)
   - Test should PASS after fix
   - Run via `npm run check:data-sanity`

5. Verify the fix locally:
   - Visit http://localhost:3000/wta-live
   - Check "In play" count matches the number of players showing point activity
   - Verify Δ column shows changes for players in active tournaments
   - `npm test` — all tests green
   - `npm run build` — succeeds
   - `npx eslint src --max-warnings=0` — clean

6. Live verification after deploy:
   - Visit https://rankings123.com/wta-live
   - Verify "In play" count is consistent with Δ activity in the table
   - Spot-check that players listed in active tournaments show appropriate Δ values
   - `npm run check:data-sanity` passes in production
   - Verify Vercel build succeeded: `gh api repos/kulisama81/rankings123/commits/HEAD/status`
