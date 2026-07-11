# Inspector Report: 2026-07-10

**Inspector:** Automated QA agent  
**Inspection Time:** July 10, 2026  
**Routes Checked:** /, /atp-live, /wta-live, /world-cup, /privacy, /world-cup/team/ARG, /world-cup/team/USA, /world-cup/match/760512  
**Build Status:** All automated checks passed  

## Summary

Site is **healthy** with no new bugs detected. All issues found during inspection are already tracked in open tickets. Recent button state system changes (commits dafe105, 9edf173) appear stable with no regressions.

## Automated Checks

✓ **Core Features Check** (`npm run check:core-features`)  
  - WC knockout bracket (R32 matchups) ✓
  - WC group standings ✓
  - ATP live ranking + pagination ✓
  - WTA live ranking ✓
  - Home multi-sport ✓

✓ **Data Sanity Check** (`npm run check:data-sanity`)  
  - All per-sport invariants hold ✓

## Routes Inspection

### Homepage (/)
- **Status:** 200 OK ✓
- **Navigation:** All primary links present (ATP, WTA, World Cup, Cycling) ✓
- **Content:** Featured Wimbledon 2026 content visible ✓
- **Issues:** None

### ATP Live (/atp-live)
- **Status:** 200 OK ✓
- **Ranking Table:** Present with 50 entries ✓
- **Pagination:** Controls visible (Page 1/20) ✓
- **Issues Found (already tracked):**
  - Duplicate ranking tables (detailed + condensed format) → `atp-duplicate-table` (p1)
  - Rafael Jodar shows ▲869 rank jump → `bug-atp-jodar-rank-jump` (p2)
  - Some players show "—" for tournament (appears to be expected behavior for non-participants)
- **Other large rank changes detected:** Joao Fonseca ▲117, Arthur Fery ▲444, Valentin Vacherot ▲117, Alexander Blockx ▲162, Ignacio Buse ▲198 (not confirmed as bugs - could be legitimate live updates)

### WTA Live (/wta-live)
- **Status:** 200 OK ✓
- **Ranking Table:** Present with 50 entries ✓
- **Tournament Data:** Wimbledon data showing for active players ✓
- **Issues:** None detected

### World Cup (/world-cup)
- **Status:** 200 OK ✓
- **Knockout Bracket:** Visible with R32, R16, Quarters, Semis, Final columns ✓
- **Group Standings:** All 12 groups present ✓
- **Issues Found (already tracked):**
  - Match count mismatch: header shows 100, schedule shows 99 → `bug-wc-match-count-mismatch` (p2)
  - Stage labels appear consistent (no mismatch detected, contradicts `bug-wc-stage-label-mismatch`)

### World Cup Team Pages
- **ARG Team Page:** 200 OK ✓ - Full roster (23 players), group standings, match history all present
- **USA Team Page:** 200 OK ✓
  - **Issue Found (already tracked):** Folarin Balogun incorrectly listed (England international) → `bug-usa-roster-balogun` (p1)

### World Cup Match Pages
- **Match 760512 (Norway vs England):** 200 OK ✓
  - Match details, venue, head-to-head visible
  - Lineups show "not available" (expected - match scheduled for 7/11, not yet played)
- **Match 401521050:** 404 Not Found (tested with arbitrary ID - expected)

### Privacy Page (/privacy)
- **Status:** 200 OK ✓
- **Content:** Complete privacy policy with all sections ✓
- **Links:** Navigation and footer links functional ✓

## Previously-Reported Bugs: Status Check

**Appears FIXED (ticket still open):**
- `suspense-fallback-bug` - "Loading table..." text no longer visible on ATP/WTA Live pages ✓

**Still Present (confirmed):**
- `atp-duplicate-table` - Duplicate tables still rendering on ATP Live
- `bug-atp-jodar-rank-jump` - Rafael Jodar still shows ▲869 
- `bug-usa-roster-balogun` - Folarin Balogun still in USA roster
- `bug-wc-match-count-mismatch` - Count mismatch still present (100 vs 99)

**Unable to Verify (require browser/Playwright):**
- `wc-mobile-horizontal-scroll` - Mobile viewport horizontal scroll
- `wc-standings-sync-bug` - Live match scores vs group standings sync
- Console errors / failed network requests

## New Bugs Filed

**None** - No new reproducible bugs detected.

## Notes

1. The button state system changes (Clay 2026 implementation) deployed cleanly with no visual or functional regressions observed
2. All core features remain protected and visible per `check:core-features`
3. Data integrity maintained per `check:data-sanity`
4. The suspense fallback bug appears to have been resolved but ticket remains open
5. ATP tournament data showing "—" for some players is likely expected behavior (non-participants) rather than a bug
6. Several large rank changes detected on ATP Live but cannot confirm as bugs without access to source data

## Recommendations

1. Consider closing `suspense-fallback-bug` if the fix has been verified and deployed
2. The planner should prioritize the p1 bugs: `atp-duplicate-table` and `bug-usa-roster-balogun`
3. Investigate WC match count mismatch - the 100 vs 99 discrepancy persists
