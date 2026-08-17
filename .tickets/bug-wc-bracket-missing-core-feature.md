---
id: bug-wc-bracket-missing-core-feature
status: open
deps: []
links: []
created: 2026-08-16T00:00:00Z
type: bug
priority: 0
parent: rankings123
tags: [bug, worldcup, ui, core-feature, p0]
---
# World Cup knockout bracket completely missing (CORE FEATURE violation)

## Bug Report

**URL:** https://rankings123.com/world-cup

**Severity:** P0 - CRITICAL - Core feature violation (breaks `npm run check:core-features`)

**Inspection Date:** 2026-08-16

## Description

The World Cup knockout bracket is completely missing from the live site, showing only placeholder text despite the tournament having finished on July 12, 2026. This violates the core feature requirement in `docs/CORE-FEATURES.md` which mandates:

> **Knockout Bracket Tree** showing the **Round of 32 matchups** (real/projected teams, not all TBD) → R16 → QF → SF → Final, with confirmed-vs-projected labelling. *(This is the one a planner deleted "to save space" — it is the heart of the knockout view; never drop the R32 column.)*

## Automated Check Failure

```
npm run check:core-features
✗ check-core-features: 1 CORE FEATURE(S) MISSING (see docs/CORE-FEATURES.md):
  ✗ WC knockout bracket (R32 matchups): no Round of 32 column in the bracket tree
```

## Reproduction Steps

1. Visit https://rankings123.com/world-cup
2. Scroll to the "Knockout Bracket" section
3. **Expected:** Full bracket visualization showing R32 → R16 → QF → SF → Final with Argentina's path to victory
4. **Actual:** Placeholder message: "The knockout bracket will appear once the group stage concludes and teams advance."

## Impact

- **CORE FEATURE VIOLATION**: The bracket is listed in protected features that must never be removed
- Tournament ended 35+ days ago but bracket still shows "will appear once group stage concludes"
- Users visiting for World Cup results see incomplete/broken data
- Makes the site appear unmaintained and unreliable
- This is a known regression - multiple closed tickets attempted fixes (ba4fdb9, 67a5e71) but the issue persists

## Current State

The page shows:
- Final result header: "Argentina 🇦🇷 3-1 🇨🇭 Switzerland · July 12, 2026 · AET" ✓ (correct)
- Group standings: All 12 groups with complete data ✓
- Knockout bracket: Placeholder text only ✗ (BROKEN)
- No bracket visualization at all ✗ (MISSING)
- No R32, R16, QF, SF, or Final matchups shown ✗ (MISSING)

## Acceptance Criteria

1. **Knockout bracket visualization restored:**
   - Full bracket tree visible on https://rankings123.com/world-cup
   - Shows ALL completed rounds: Round of 32 → Round of 16 → Quarterfinals → Semifinals → Final
   - Each match displays: team names, flags, scores, date
   - Argentina's path to victory clearly visible from R32 through Final
   - No placeholder text like "will appear once group stage concludes"
   - No "TBD" placeholders for completed matches

2. **Core features check passes:**
   - `npm run check:core-features` exits 0 (success)
   - Specifically: "WC knockout bracket (R32 matchups)" check passes
   - R32 column is visible in the bracket tree (this is the protected column per CORE-FEATURES.md)

3. **Data integrity:**
   - All bracket data comes from real sources (ESPN API or bundled mock)
   - Final result matches header: Argentina 3-1 Switzerland
   - Match dates, scores, and teams are historically accurate
   - Source attribution visible (e.g., "ESPN" or "Mock" badge)
   - No fabricated or placeholder data shown to users

4. **REGRESSION TEST REQUIRED** (per CLAUDE.md):
   - Add test in `tests/worldcup-bracket-core-feature.test.mjs` (run via `npm test`):
     - Fetch https://rankings123.com/world-cup HTML or test bracket data structure
     - Assert NO occurrence of placeholder text: "will appear once the group stage concludes"
     - Assert bracket section contains matchup data (team codes/names)
     - Assert all rounds present: R32, R16, QF, SF, Final
     - When tournament status is "complete", assert NO "TBD" placeholders in bracket
     - Test must FAIL on current broken state, PASS when bracket is restored
   - OR extend `scripts/check-core-features.mjs` to be more strict about R32 visibility

5. **Visual verification (webapp-testing recommended):**
   - Use Playwright to screenshot the bracket section
   - Verify R32 matchups are visually rendered (not just in HTML but actually visible)
   - Test in both dark and light themes
   - Test on mobile viewport (bracket should be responsive/scrollable, not hidden)

6. **Standard checks:**
   - `npm run build` — succeeds
   - `npm test` — all tests green
   - `npx eslint src --max-warnings=0` — clean
   - `npm run check:data-sanity` — passes

7. **Live verification after deploy:**
   - Visit https://rankings123.com/world-cup
   - Verify full bracket tree visible with all rounds (R32 through Final)
   - Verify Argentina's championship path is clear
   - Verify `npm run check:core-features` passes on deployed build
   - No placeholder/TBD text for completed tournament
