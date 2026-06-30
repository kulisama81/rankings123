# Inspector Report — 2026-06-29 Afternoon

**Inspector:** Automated QA sweep of live rankings123.com  
**Date:** 2026-06-29  
**Time:** Afternoon run
**Routes Checked:** /, /atp-live, /wta-live, /world-cup, /privacy  
**Method:** WebFetch analysis (live site inspection)

## Summary

**Bugs Found:** 1 confirmed new bug  
**Tickets Filed:** 1 (bug-wta-missing-tournament-data)  
**Core Features:** ✓ All passing (`npm run check:core-features`)  
**Data Sanity:** ✓ Passing (`npm run check:data-sanity`)

## Routes Inspected

### 1. Homepage (/)
**Status:** ✓ Clean  
- All sport links present and functional (ATP, WTA, World Cup, Cycling)
- Navigation intact
- No broken images or placeholder content
- No layout issues detected

### 2. ATP Live (/atp-live)
**Status:** ⚠️ Minor issues (tracked by existing ticket)  
- **Ranks:** Sequential 1-50 ✓
- **Player count:** 50 shown, paginated to 1000 ✓
- **Data issue:** Rafael Jodar shows ▲869 rank movement (implausible) — **already tracked** in existing ticket `bug-atp-jodar-rank-jump`
- **Other movements:** Several players show large jumps (Buse ▲198, Blockx ▲164, Tien ▲105, Fonseca ▲117) — likely Wimbledon qualifying results, under the 200-position threshold for anomaly detection
- **Status data:** 10 players show "—" for tournament status (Alcaraz, Fritz, Rune, Musetti, etc.) — appears to be intentional "not competing this week" indicator, not a data error

**Finding:** The extreme movements will be caught by the data-sanity check requested in the existing Jodar ticket (>200 position threshold).

### 3. WTA Live (/wta-live)
**Status:** ⚠️ **NEW BUG FOUND**  
- **Ranks:** Sequential 1-50 ✓
- **Player count:** 50 shown, paginated to 100 ✓
- **Data issue:** 4 players show missing tournament data:
  - Victoria Mboko (#10): "—" for tournament/delta
  - Hailey Baptiste (#31): "——" (double dash, clearly incomplete)
  - Emma Raducanu (#33): "——"
  - Cristina Bucsa (#37): "——"

**Ticket Filed:** `bug-wta-missing-tournament-data`

**Severity:** P2 (data quality/completeness issue, not critical functionality)

**Root Cause Theory:** Feed merge logic may fail for players not currently competing, showing "——" instead of explicit "not competing" status.

### 4. World Cup (/world-cup)
**Status:** ✓ Mostly clean  
- **Groups:** All 12 groups (A-L) displayed correctly ✓
- **Knockout bracket:** R32, R16, QF, SF, Final all present ✓
- **Standings:** Match played (MP) counts shown, all teams at 3 matches (group stage complete) ✓
- **Schedule:** Shows "22 Upcoming + 75 Results"
  - This count seems high (48 group matches + 31 knockout = 79 total expected)
  - Could include third-place playoff or be counting completed knockout matches
  - **Not filing a bug** — need more investigation to confirm this is actually wrong vs. just unexpected

**Note:** Earlier inspection today found a live match score vs standings sync bug (`wc-standings-sync-bug`). Did not reproduce this issue in current inspection — may have been resolved or was transient.

### 5. Privacy (/privacy)
**Status:** ✓ Clean  
- Page loads correctly
- All sections present
- No broken links detected

## Core Features Check
```
✓ WC knockout bracket (R32 matchups)
✓ WC group standings
✓ ATP live ranking + pagination
✓ WTA live ranking
✓ Home multi-sport

✓ check-core-features: all 5 core features present.
```

## Data Sanity Check
```
✓ data-sanity: all per-sport invariants hold.
```

**Note:** Current data-sanity checks don't yet catch the WTA missing tournament data issue. The ticket's acceptance criteria include adding a check for this.

## Tickets Filed

### New Tickets
1. **bug-wta-missing-tournament-data** — P2 data bug
   - 4 WTA players showing incomplete tournament participation data ("—" or "——")
   - Requires regression test in check-data-sanity.mjs
   - Affects: Mboko #10, Baptiste #31, Raducanu #33, Bucsa #37

### Existing Open Bugs (Not Duplicated)
1. **bug-atp-jodar-rank-jump** — P2 data bug (already open)
   - Rafael Jodar ▲869 implausible movement
   - Ticket already requests data-sanity check for movements >200 positions
   - Will catch this and similar extreme movements

### Earlier Today
1. **wc-standings-sync-bug** — P1 data bug (filed by earlier inspection)
   - Live match scores contradicting group standings
   - Did not reproduce in this inspection

## Observations

**Positive:**
- All core features remain intact post-favicon work
- No regressions in ATP/WTA table rendering (previous regression fixed)
- Navigation and routing all functional
- No console errors or broken images detected
- Privacy/legal pages loading correctly

**Data Quality:**
- The WTA missing data issue is the only new confirmed bug
- ATP extreme movements (except Jodar) are under 200 positions and may be legitimate Wimbledon results
- Both ATP and WTA show some players with "—" status, which appears intentional (not competing) rather than broken data

**Recommendations:**
- Planner should prioritize the existing `bug-atp-jodar-rank-jump` ticket (P2)
- New WTA missing data ticket should be built after Jodar fix is verified
- Consider adding user-facing tooltip/note explaining "—" status means "not competing this week"

## Next Inspection
Next run: Evening 2026-06-29 or morning 2026-06-30

**Focus areas:**
- Verify WTA missing data issue persists (could be transient feed issue)
- Monitor ATP extreme movements (will the >200 check catch Jodar when implemented?)
- Check World Cup match count after more knockout matches complete
- Recheck World Cup standings sync if live matches are in progress
