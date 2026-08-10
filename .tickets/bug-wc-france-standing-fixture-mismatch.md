---
id: bug-wc-france-standing-fixture-mismatch
status: closed
deps: []
links: []
created: 2026-08-08T19:00:00Z
type: bug
priority: 2
parent: rankings123
tags: [bug, worldcup, data, consistency]
---
# World Cup France team page: Group Standing shows 3 matches played but Fixtures shows 6 matches

**URL:** https://rankings123.com/world-cup/team/FRA

**Severity:** P2 (Medium) — Data consistency issue affecting credibility

**Type:** Data consistency bug — count mismatch between Group Standing and Fixtures sections

**Description:**
The France team page displays contradictory match counts across two sections on the same page:
- **Group Standing table:** Shows "3" in the "P" (Played) column
- **Fixtures & Results section:** Lists 6 completed matches with scores

All 6 fixtures show final scores (Morocco 2-0, Paraguay 1-0, Sweden 3-0, Norway 4-1, Iraq 3-0, Senegal 3-1), indicating these are completed matches, not upcoming fixtures.

**Reproduction Steps:**
1. Visit https://rankings123.com/world-cup/team/FRA
2. Look at "Group Standing" section - note "P" (Played) column shows "3"
3. Scroll to "Fixtures & Results" section
4. Count the matches listed with scores: 6 total matches
5. Observe the contradiction: 3 ≠ 6

**Expected Behavior:**
- Group Standing "Played" count should match the number of completed fixtures shown
- All data on the same page should be consistent
- If France has played 6 matches, standings should show P=6
- If France has only played 3 group stage matches, Fixtures should show only those 3 (or clearly separate group vs knockout matches)

**Actual Behavior:**
- Group Standing claims 3 matches played
- Fixtures section lists 6 completed matches
- No clear separation or explanation for the discrepancy

**Impact:**
- Damages credibility as a data source (numbers don't add up on the same page)
- Violates consistency check principle: "a count badge that disagrees with the list"
- Users notice contradictions and question data accuracy
- May affect other team pages as well

**Possible Root Causes:**
- Group Standing shows only group stage matches (3) while Fixtures shows all tournament matches (group + knockout)
- Different data sources or API endpoints for standings vs fixtures
- Standings data cached separately from fixtures data
- Bug in match counting logic for one of the sections

## Acceptance Criteria

1. Investigate the data source mismatch:
   - Check `src/app/world-cup/team/[code]/page.tsx` or relevant component
   - Determine how Group Standing "Played" count is calculated
   - Determine how Fixtures list is populated
   - Verify if they're pulling from the same data source

2. Fix the consistency issue with one of these approaches:
   - **Option A:** Make standings show all tournament matches (group + knockout), matching Fixtures count
   - **Option B:** Clearly separate "Group Stage" (3 matches) from "Knockout Stage" (3 matches) in Fixtures, and label standings as "Group Stage Standing"
   - **Option C:** Ensure both sections pull from the same source with same filtering logic

3. **REGRESSION TEST REQUIRED** (per CLAUDE.md):
   - Add test in `tests/worldcup-team-consistency.test.mjs` (run via `npm test`):
     - For each team page, fetch Group Standing "Played" count
     - Count completed matches in Fixtures section
     - Assert they match (or assert proper labeling if they intentionally differ)
     - Test with France (FRA) specifically as a known failing case
   - Test should FAIL on current code (3 ≠ 6 for France)
   - Test should PASS after fix (counts match or are properly labeled)

4. Verify the fix locally:
   - Visit http://localhost:3000/world-cup/team/FRA
   - Verify Group Standing "Played" count matches Fixtures count
   - OR verify clear separation/labeling between group and knockout matches
   - Check at least 2 other team pages (ARG, BRA) for consistency
   - `npm test` — all tests green
   - `npm run build` — succeeds
   - `npx eslint src --max-warnings=0` — clean
   - `npm run check:data-sanity` — clean

5. Live verification after deploy:
   - Visit https://rankings123.com/world-cup/team/FRA
   - Verify no count mismatch between standings and fixtures
   - Spot-check 2-3 other teams for consistency
   - Verify Vercel build succeeded: `gh api repos/kulisama81/rankings123/commits/HEAD/status`
   - No console errors in browser

## Closed in backlog triage 2026-08-10
obsolete: WC over
