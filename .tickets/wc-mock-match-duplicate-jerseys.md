---
id: wc-mock-match-duplicate-jerseys
status: closed
deps: []
links: []
created: 2026-06-24T22:00:00Z
type: bug
priority: 2
parent: rankings123
tags: [bug, worldcup, data, mock]
---
# Mock World Cup match data has duplicate jersey numbers in Türkiye lineup

**URL:** https://rankings123.com/world-cup/match/716495 (or any match falling back to mock data)

**Severity:** P2 - Data integrity violation in mock fallback

**Description:**
The mock World Cup match detail fallback in `src/data/worldCup.ts` contains a data integrity error: Türkiye's lineup has TWO players wearing jersey #17, which violates basic soccer roster rules (unique jersey numbers required per team).

**Location:** `src/data/worldCup.ts`, `getMockWorldCupMatchDetail()` function, lines 318-320

**Duplicate entries:**
- Line 318: `{ name: "İ. Kahveci", position: "MF", jersey: "17" }`
- Line 320: `{ name: "B. Yılmaz", position: "FW", jersey: "17" }`

**Reproduction Steps:**
1. Visit any match page that falls back to mock data (e.g., https://rankings123.com/world-cup/match/716495)
2. Observe "Demo data" label (correctly shown)
3. Scroll to Türkiye lineup
4. Notice both İ. Kahveci and B. Yılmaz listed as wearing #17

**Expected Behavior:**
Each player in a team's lineup should have a unique jersey number

**Actual Behavior:**
Two Türkiye players share jersey #17

**Impact:**
- Data integrity violation in mock fallback
- Undermines credibility even for demo/fallback data
- Page correctly labels it as "Demo data", but the demo itself contains errors

## Acceptance Criteria

1. Mock match data in `src/data/worldCup.ts` has unique jersey numbers for all players in both lineups
2. Fix Türkiye lineup: assign correct unique jersey numbers (verify against real roster or adjust to avoid duplicates)
3. **REGRESSION TEST REQUIRED**: Add test in `tests/mock-data-integrity.test.js` (or extend existing test):
   - Load mock World Cup match detail
   - Extract all jersey numbers from both home and away lineups
   - Assert no duplicates within each team's lineup
   - Test fails with current duplicate #17, passes when fixed
4. Run `npm test` — all tests green
5. Build/lint green
6. Optional: verify on a match page that falls back to mock (if one exists) or by temporarily breaking ESPN fetch to trigger mock fallback
