# Inspector Run: 2026-07-30 (Afternoon)

**Inspection Date:** July 30, 2026 (afternoon run)  
**Inspector:** Automated QA sweep via WebFetch  
**Routes Checked:** 7 (/, /atp-live, /wta-live, /world-cup, /world-cup/match/401679426, /world-cup/team/USA, /privacy)

## Summary

All existing open bug tickets confirmed still present on live site. **No new bugs found.** This run adds coverage of match pages and additional team pages beyond the morning inspection.

## Routes Inspected

### ✓ Home (/)
- **Status:** 200 OK
- **Issues:** Minor content staleness (TDF section says "through July 26" with no live data, World Cup showing incomplete final content)
- **Related:** `bug-tdf-race-status-stale`, `bug-wc-tournament-status-stale`

### ⚠ ATP Live (/atp-live)
- **Status:** 200 OK
- **CONFIRMED BUG:** Country filter contains "???" placeholder text → `bug-atp-country-filter-malformed` **STILL PRESENT**
- **Note:** WebFetch detected potential duplicate table rendering, but ticket `atp-duplicate-table` is marked CLOSED (may be false positive or needs browser verification)

### ✓ WTA Live (/wta-live)
- **Status:** 200 OK
- **CLEAN:** No bugs detected. Ranking data complete, country codes valid, no placeholder text.

### ⚠ World Cup Main (/world-cup)
- **Status:** 200 OK
- **CONFIRMED BUG:** Multiple "TBD" placeholders in knockout bracket → `bug-wc-final-predictions-placeholder` and related
- **CONFIRMED BUG:** Tournament shows as live/incomplete when it ended July 19 → `bug-wc-tournament-status-stale` **STILL PRESENT**
- **Issues:** 
  - Knockout stages show "🏆TBD" for Quarterfinals, Semifinals, and Final
  - Contradictory schedule messaging: "No upcoming fixtures scheduled" vs populated bracket

### ⚠ World Cup Match (/world-cup/match/401679426)
- **Status:** 404 NOT FOUND
- **CONFIRMED BUG:** Match route returns 404 → `bug-wc-match-401xxx-404` **STILL PRESENT**

### ⚠ World Cup Team USA (/world-cup/team/USA)
- **Status:** 200 OK
- **CONFIRMED BUG:** Folarin Balogun listed as USA Forward → `bug-usa-roster-balogun` **STILL PRESENT**
  - Player represents England, not USA
- **Data Inconsistency:** Match form shows 5 games but group standing shows "Played: 3" — minor sync issue

### ⚠ Privacy (/privacy)
- **Status:** 200 OK
- **CONFIRMED BUG:** Header shows "RANKINGS23R23" instead of "RANKINGS123" → `bug-privacy-branding-typo` **STILL PRESENT**

## Core Features & Data Checks

✓ **Core Features Check:** `npm run check:core-features` — **PASSED**  
All 5 protected features present:
- WC knockout bracket (R32 matchups)
- WC group standings
- ATP live ranking + pagination
- WTA live ranking
- Home multi-sport view

✓ **Data Sanity Check:** `npm run check:data-sanity` — **PASSED**  
All per-sport data invariants hold.

## Bugs Confirmed (All Previously Filed)

### Critical (P0)
1. `bug-wc-tournament-status-stale` — World Cup showing "Live" when ended July 19, 2026 (11 days ago)
2. `bug-wc-final-predictions-placeholder` — Placeholder/TBD content in knockout bracket
3. `bug-privacy-branding-typo` — "RANKINGS23R23" typo (affects branding perception)

### High (P1)
4. `bug-wc-match-401xxx-404` — Match route 401679426 returns 404
5. `bug-tdf-race-status-stale` — TDF status showing stale "through July 26" with no data

### Medium (P2)
6. `bug-atp-country-filter-malformed` — "???" in ATP country filter dropdown
7. `bug-usa-roster-balogun` — Incorrect roster data (Balogun not on USA team)

### Not Directly Verified This Run
- `bug-wc-countdown-not-displaying` (countdown widget)
- `bug-wc-team-form-badge-count` (form badge count)
- `bug-atp-inplay-count-regression` (in-play count mismatch)

## Coverage Notes

This afternoon run complements the morning inspection by adding:
- **Match page testing:** Confirmed 404 bug on /world-cup/match/401679426
- **Additional team page:** USA team verified Balogun roster bug
- **ATP filter bug:** Confirmed "???" placeholder still present
- **Privacy branding:** Confirmed typo still exists

## New Bugs Filed

**None** — all detected issues already have open tickets.

## Analysis

### Primary Issue Cluster: World Cup Pages
- Tournament ended July 19, 2026 (11 days ago)
- Site still shows "Live" status and "TBD" placeholders
- Creates stale impression during what should be post-tournament traffic
- P0 CX violations that damage credibility

### Secondary Issues
- ATP country filter UX degraded by "???" codes
- Privacy page branding typo (minor but visible)
- TDF status stale (race ended July 26)

### What's Working
- **WTA Live:** Completely clean, no bugs
- **Core features:** All protected features intact
- **Data integrity:** No fabricated data, all sanity checks passing
- **ATP/WTA ranking data:** Complete and accurate

## Recommendations for Planner

1. **Prioritize World Cup cleanup** — Tournament ended 11 days ago but site looks abandoned
   - Fix tournament status detection (`bug-wc-tournament-status-stale`)
   - Replace TBD placeholders with final results (`bug-wc-final-predictions-placeholder`)
   - Fix 404 match routes (`bug-wc-match-401xxx-404`)

2. **Quick wins:**
   - Privacy branding typo (1-line fix)
   - ATP country filter "???" codes (data mapping issue)

3. **Data quality:**
   - USA roster cleanup (remove Balogun)
   - TDF status update

## Next Steps

Next inspection run will re-check same routes. If World Cup bugs are fixed, will expand to:
- Browser-based testing (console errors, network failures)
- Theme toggle persistence
- Mobile viewport testing
- Additional match and team pages for consistency
