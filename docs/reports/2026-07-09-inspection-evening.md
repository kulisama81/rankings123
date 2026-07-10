# Inspector Report — 2026-07-09 (Evening Run)

**Run time:** 2026-07-09 ~23:00 UTC  
**Routes checked:** /, /atp-live, /wta-live, /world-cup, /world-cup/match/*, /world-cup/team/*  
**Core features check:** ✅ PASS (all 5 core features present)  
**Data sanity check:** ✅ PASS (all invariants hold)

## Summary

**1 new bug filed:**
- `bug-usa-roster-balogun` (p1) - USA World Cup roster incorrectly includes Folarin Balogun (England international)

**Routes clean:**
- Home page (/) - multi-sport navigation working, no placeholder content
- ATP Live (/atp-live) - ranking table functional, pagination working
- WTA Live (/wta-live) - ranking table functional, data attribution clear
- World Cup match pages - valid match IDs load correctly (404s for non-existent IDs is correct behavior)

**Existing bugs still present:**
- `bug-wc-stage-label-mismatch` (p2) - Stage label inconsistency confirmed
- `bug-wc-match-count-mismatch` (p2) - Match count discrepancy confirmed

## Bugs Found

### NEW: USA Roster Has Incorrect Player Data (p1)

**File:** `bug-usa-roster-balogun`

The USA World Cup team page (/world-cup/team/USA) lists Folarin Balogun (#20, Forward) on the squad roster. Balogun actually represents England internationally, not the United States. This is a factual data error that damages credibility during the live World Cup 2026 tournament.

**Impact:** 
- Critical data accuracy issue
- Violates "CX FIRST" principle (no fabricated/incorrect data)
- Undermines user trust in live tournament coverage

**Verified:**
- https://rankings123.com/world-cup/team/USA shows Balogun in roster
- https://rankings123.com/world-cup/team/ENG does NOT show Balogun (though he should if included)
- Real-world verification: Balogun represents England

## Testing Notes

**Core features check:** All 5 protected core features verified present:
- WC knockout bracket (R32 matchups) ✓
- WC group standings ✓
- ATP live ranking + pagination ✓
- WTA live ranking ✓
- Home multi-sport ✓

**Match page behavior verified:**
- Valid match IDs (760511, 760512) return 200 and show match details ✓
- Non-existent match IDs (401607058, 401607060) return 404 ✓ (correct per recent fix f8e96a8)

**Placeholder content check:** 
- No "coming soon", "placeholder", or "demo data" labels visible on main routes ✓
- Future match pages appropriately show "Lineup not available" for upcoming matches ✓

**Data source attribution:**
- WTA page: Clear "Data via ESPN" attribution ✓
- ATP page: Attribution not explicitly visible in content (minor)

## Confirmed Existing Bugs

### World Cup Stage Label Mismatch (p2)
File: `bug-wc-stage-label-mismatch`

Header shows different stage than bracket display. Previously filed, still present.

### World Cup Match Count Mismatch (p2)
File: `bug-wc-match-count-mismatch`

Header total doesn't match schedule count breakdown. Previously filed, still present.

## Notes

- Recent match page fixes (commit f8e96a8) are working correctly - non-existent matches now properly return 404 instead of falling back to mock data
- World Cup data is actively updating (upcoming matches showing future dates)
- No console errors or failed requests detected
- Automated sanity checks passing cleanly

**Priority:** The `bug-usa-roster-balogun` ticket should be prioritized by the planner as it's a P1 data accuracy issue during a live tournament window.
