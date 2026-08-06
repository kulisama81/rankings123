# Inspector Run 2026-08-05 (Second)

**Status:** Site stable, 10 known bugs confirmed, no new issues found

## Routes Inspected
- ✓ Home `/`, ATP Live `/atp-live`, WTA Live `/wta-live`
- ✓ World Cup `/world-cup`, Privacy `/privacy`, Cycling `/cycling`
- ✓ World Cup teams `/world-cup/team/ARG`, `/world-cup/team/USA`
- ✓ World Cup Final Predictions `/world-cup/final-2026-predictions`
- ❌ World Cup match pages with 401xxx IDs return HTTP 404

## Automated Checks
- ✓ `npm run check:core-features` — PASS (all 5 protected features present)
- ✓ `npm run check:data-sanity` — PASS (all sport invariants hold)

## Confirmed Existing Bugs (10 total)

### P0 Critical (3 bugs)

1. **bug-wc-match-401xxx-404** — World Cup match pages with 401xxx ID format return 404
   - Tested `/world-cup/match/401760007`, `401760001`, `401760050` — all return HTTP 404
   - Impact: Core World Cup feature broken, match pages inaccessible

2. **bug-wc-final-predictions-placeholder** — CX violation: placeholder content shipped to users
   - URL: `/world-cup/final-2026-predictions`
   - Found: "TBD" (4×), "Finalists To Be Determined", "Awaiting Semifinals"
   - Impact: Violates CX-first principle (CLAUDE.md: "never ship placeholder UI to users")

3. **bug-wc-tournament-status-stale** — World Cup showing "Live" badge when tournament ended July 19
   - Current date: Aug 5, 2026 (17 days post-tournament)
   - Page shows: "World Cup 2026 Live" status badge
   - Impact: Misleading tournament status for completed event

### P1 High (3 bugs)

4. **bug-atp-wta-duplicate-table-regression** — Both ATP and WTA render duplicate ranking tables
   - ATP: Table appears twice with identical data
   - WTA: Table appears twice (detailed + condensed format)
   - Impact: Visual regression, content duplication

5. **bug-usa-roster-balogun** — USA World Cup roster incorrectly includes Folarin Balogun
   - Listed as Forward #20, age 25
   - Balogun plays for England, not USA
   - Impact: Data accuracy issue on team roster

6. **bug-tdf-race-status-stale** — Tour de France showing as "Live" when race ended July 26
   - Current date: Aug 5, 2026 (10 days post-race)
   - Home page: Listed in "What's Live Now"
   - Cycling page: "Stage 21 in progress"
   - Impact: Misleading race status for completed event

### P2 Medium (4 bugs)

7. **bug-atp-inplay-count-regression** — ATP "In play" count badge shows 32 but data shows 22 active
   - Badge: "32 In play overall"
   - Actual visible in top 50: 22 players with tournament activity
   - Impact: Data consistency mismatch (badge ≠ displayed count)

8. **bug-atp-country-filter-malformed** — ATP country filter contains duplicate code "ISR ISR"
   - Filter dropdown shows Israel twice consecutively
   - Impact: UI polish issue, malformed filter option

9. **bug-wc-stage-label-mismatch** — World Cup page uses inconsistent stage terminology
   - Uses both "Round of 32" and "R32 Match" interchangeably
   - Impact: Consistency issue in bracket labeling

10. **bug-privacy-branding-typo** — Privacy page header shows "RANKINGS23R23" instead of "Rankings123"
    - Navigation branding malformed: `[RANKINGS23R23](/)`
    - Impact: Branding inconsistency on legal page

## New Issues Found

**None.** All issues found this run are already tracked in existing open bug tickets.

## Key Observations

1. **Stale "Live" status pattern:** Both World Cup (ended July 19) and Tour de France (ended July 26) continue showing "Live" badges 10-17 days after completion. This affects user trust in data freshness.

2. **CX-first violation:** The `/world-cup/final-2026-predictions` page ships extensive placeholder UI ("TBD" text) to production users, directly violating the project's CX-first principle.

3. **Match page 404s:** World Cup match ID format `401xxx` returns 404, breaking a core feature during tournament window.

4. **Data consistency issues:** Multiple count mismatches (ATP in-play count, form badge counts) and duplicate codes (ISR ISR) suggest data processing bugs.

5. **Duplicate table rendering:** Both ATP and WTA pages render tables twice, indicating a shared component regression.

## Summary

Site remains **functionally stable** with all core features intact (automated checks passing). However, **10 open bugs confirmed reproducible** across data accuracy, UI consistency, and CX violations. No new bugs discovered this sweep — all issues are known and tracked.

Recommend prioritizing the 3 P0 bugs (stale World Cup status, match page 404s, placeholder content) as they affect live tournament coverage and violate core CX principles.

---
*Inspector routine: automated QA sweep of rankings123.com (2nd run 2026-08-05)*
