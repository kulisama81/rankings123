---
id: bug-wc-stage-label-mismatch
status: open
deps: []
links: []
created: 2026-07-08T20:00:00Z
type: bug
priority: 2
parent: rankings123
tags: [bug, worldcup, ui, consistency]
---
# World Cup page: Stage label mismatch (header shows "Round of 16", bracket shows "Round of 32")

## Bug Report

**URL:** https://rankings123.com/world-cup

**Severity:** p2 - Consistency issue causing user confusion

**Description:**
The World Cup page header displays "FIFA World Cup 2026 · Round of 16" but the knockout bracket section shows "Round of 32" as the first/current knockout stage. This is an inconsistency that confuses users about what stage the tournament is actually in.

**Root Cause:**
- The stage label comes from ESPN's API (`scoreboard?.leagues?.[0]?.season?.type?.name`) which reports "Round of 16"
- The bracket is correctly structured for FIFA 2026's 48→32 team format, where Round of 32 is the first knockout stage
- These two sources are out of sync

**Reproduction Steps:**
1. Visit https://rankings123.com/world-cup
2. Look at the page header/subtitle - it says "FIFA World Cup 2026 · Round of 16"
3. Scroll down to the knockout bracket section
4. The bracket displays "Round of 32" as the first knockout round

**Expected Behavior:**
The header stage label and the bracket should show the same tournament stage.

**Actual Behavior:**
Header says "Round of 16", bracket shows "Round of 32"

**Impact:**
- User confusion about tournament progress
- Inconsistent messaging across the same page
- Undermines trust in data accuracy

## Acceptance Criteria

1. Determine the correct current tournament stage (likely Round of 32 based on 48-team format)
2. Fix the stage label to match the bracket OR
3. Override ESPN's incorrect stage label with our own logic based on the bracket data
4. Verify header and bracket show consistent stage information
5. **REGRESSION TEST REQUIRED:**
   - Add test in `tests/worldcup-stage-consistency.test.js` (run via `npm test`)
   - Test must verify:
     - Fetch World Cup data and bracket
     - Extract stage label from both sources
     - Assert they match (or follow expected progression)
   - Test should FAIL on current code, PASS when fixed
6. Run `npm test` — all tests green
7. Run `npm run build` — succeeds
8. Verify on LIVE production:
   - Visit https://rankings123.com/world-cup
   - Header and bracket show consistent stage labels
