---
id: bug-wc-team-form-badge-count
status: closed
deps: []
links: []
created: 2026-07-15T12:00:00Z
type: bug
priority: 2
parent: rankings123
tags: [bug, worldcup, ui, consistency, data]
---
# World Cup team page: Recent form badges show incorrect count (5 W's for 6 wins)

**URL:** https://rankings123.com/world-cup/team/ARG

**Severity:** P2 - Data consistency issue, confusing to users

**Description:**
The Argentina team page shows inconsistent data across three different sections:
- **Recent Form badges:** Shows 5 "W" (win) badges
- **Match Results:** Lists 6 matches, all wins (Switzerland, Egypt, Cape Verde, Jordan, Austria, Algeria)
- **Group Standings:** Shows 3 matches played (group stage only)

All 6 listed matches are confirmed World Cup 2026 tournament matches (3 group stage + 3 knockout). Argentina won all 6 matches, but the Recent Form section only displays 5 W badges.

**Reproduction Steps:**
1. Visit https://rankings123.com/world-cup/team/ARG
2. Look at "Recent Form" section near top - count W badges (shows 5)
3. Scroll to match results - count total matches and wins (shows 6 matches, all wins)
4. Look at group standings "P" (Played) column - shows 3

**Expected Behavior:**
Recent Form badges should accurately reflect the match results shown on the same page:
- Either show 6 W badges (all tournament matches), OR
- Show 3 W badges (group stage only), OR
- The calculation should match the matches displayed

**Actual Behavior:**
Shows 5 W badges when 6 wins are listed in the match results below.

**Impact:**
- Undermines trust in data accuracy
- Confusing user experience (numbers don't add up)
- May apply to other team pages as well

## Acceptance Criteria

1. Investigate the Recent Form calculation logic:
   - Check `src/app/world-cup/team/[code]/page.tsx` or relevant component
   - Determine how form badges are calculated from match data
   - Identify why it shows 5 instead of 6 for Argentina

2. Fix the calculation to ensure consistency:
   - If showing ALL tournament matches: form badges count should equal total wins shown
   - If showing GROUP STAGE only: form badges should match group standings
   - Ensure the logic is consistent across all team pages

3. **REGRESSION TEST REQUIRED** (per CLAUDE.md):
   - Add test in `tests/worldcup-team-form-consistency.test.mjs` (run via `npm test`)
   - Test must verify:
     - Form badge count matches the actual win count in displayed matches
     - No team page shows mismatched form vs results
     - Test with Argentina (ARG) specifically as a known case
   - Test should FAIL on current code (5 badges for 6 wins)
   - Test should PASS after fix (badge count matches results)

4. Verify the fix locally:
   - Visit http://localhost:3000/world-cup/team/ARG
   - Count form badges - should match number of wins in results
   - Check at least 2 other team pages for consistency
   - `npm test` — all tests green
   - `npm run build` — succeeds
   - `npx eslint src --max-warnings=0` — clean

5. Live verification after deploy:
   - Visit https://rankings123.com/world-cup/team/ARG
   - Verify form badges match match results
   - Spot-check 2-3 other teams (USA, BRA, ENG) for consistency
   - Verify Vercel build succeeded: `gh api repos/kulisama81/rankings123/commits/HEAD/status`
   - No console errors in browser

## Closed in backlog triage 2026-08-10
obsolete: WC over
