---
id: bug-wc-italy-bracket-group-mismatch
status: open
deps: []
links: []
created: 2026-08-18T00:00:00Z
type: bug
priority: 1
parent: rankings123
tags: [bug, worldcup, data, integrity]
---
# World Cup data integrity: Italy in knockout bracket but not in group standings

**URL:** https://rankings123.com/world-cup

**Severity:** P1 (Data integrity bug)

**Type:** Data integrity — team appears in knockout bracket without group stage participation

**Description:**
The World Cup page shows Italy competing in knockout bracket matches (R32, quarterfinals) but Italy does NOT appear in any of the 12 group standings (Groups A-L). This is impossible in a real World Cup tournament structure where all knockout teams must first place in group stage.

**Reproduction Steps:**
1. Visit https://rankings123.com/world-cup
2. Scroll to Group Standings section
3. Search all 12 groups (A-L) for Italy — NOT FOUND
4. Scroll to Knockout Bracket section
5. Observe Italy appears in R32 and/or later rounds

**Expected Behavior:**
- All teams in the knockout bracket MUST appear in group standings
- Data consistency: if Italy is in the bracket, Italy must be in one of the groups
- OR if this is mock/fallback data, it should be internally consistent

**Actual Behavior:**
Italy appears in knockout matches but not in any group, creating an impossible tournament scenario.

**Impact:**
- Data integrity violation — shows structurally impossible tournament state
- User confusion — where did Italy come from?
- Suggests mock/fallback data is inconsistent with itself
- Violates data-sanity principles

**Root Cause Hypothesis:**
Likely the knockout bracket data comes from a different source or mock than the group standings, and they're not synchronized.

**Inspector found:** 2026-08-18 live site inspection

## Acceptance Criteria

1. **Fix the data integrity issue:**
   - Ensure all teams appearing in knockout bracket also appear in group standings
   - If using mock/fallback data, make it internally consistent
   - Either: add Italy to appropriate group standings OR remove Italy from knockout bracket
   - Verify the fix matches the actual World Cup 2026 results

2. **Add data-sanity check in scripts/check-data-sanity.mjs:**
   - New invariant: "All knockout bracket teams must appear in group standings"
   - Fetch World Cup group standings (get all team codes)
   - Fetch World Cup knockout bracket (get all team codes)
   - Assert every bracket team exists in groups
   - Test should FAIL on current code (Italy in bracket but not groups)
   - Test should PASS after fix (all bracket teams in groups)
   - Run via `npm run check:data-sanity`

3. **Local verification:**
   - Run `npm run check:data-sanity` — passes
   - Visit http://localhost:3000/world-cup
   - Verify Italy appears in group standings IF it appears in bracket
   - OR verify Italy is removed from bracket if it wasn't actually in the tournament
   - Cross-check against real World Cup 2026 results
   - `npm run build` — succeeds
   - `npm test` — passes

4. **Live verification after deploy:**
   - Visit https://rankings123.com/world-cup
   - Verify Vercel build succeeded
   - Run `npm run check:data-sanity` — passes
   - Manually verify: all knockout teams appear in groups
   - Screenshot group standings and bracket for report
