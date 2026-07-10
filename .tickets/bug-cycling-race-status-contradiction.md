---
id: bug-cycling-race-status-contradiction
status: closed
deps: []
links: []
created: 2026-07-08T20:00:00Z
type: bug
priority: 2
parent: rankings123
tags: [bug, cycling, ui, consistency]
---
# Cycling page: Contradictory race status messages ("Stage 5 in progress" vs "will update once race begins")

## Acceptance Criteria

1. Make the "General Classification will update once the race begins" message conditional
2. Only show this message when `tdfData.raceStatus === "upcoming"`
3. When race is active or complete, either:
   - Show different appropriate text, OR
   - Omit that sentence entirely
4. Ensure data source attribution still shows (just make the race timing part conditional)
5. **REGRESSION TEST REQUIRED:**
   - Add test in `tests/cycling-race-status-consistency.test.js` (run via `npm test`)
   - Test must verify:
     - When raceStatus is "active", page should not contain "will update once the race begins"
     - When raceStatus is "upcoming", message is appropriate
     - No contradictory status messages present
   - Test should FAIL on current code, PASS when fixed
6. Run `npm test` — all tests green
7. Run `npm run build` — succeeds
8. Verify on LIVE production:
   - Visit https://rankings123.com/cycling
   - Check that race status messages are consistent
   - No contradictory text present

## Bug Report

**URL:** https://rankings123.com/cycling

**Severity:** p2 - Consistency issue, confusing user experience

**Description:**
The cycling page shows contradictory messages about whether the Tour de France race has started:
- The header subtitle says "Stage 5 in progress" (indicating race is active)
- The data source notice says "General Classification will update once the race begins on July 4, 2026" (indicating race hasn't started yet)

These messages cannot both be true and create confusion about the race status.

**Root Cause:**
The subtitle is conditional based on `tdfData.raceStatus`:
```tsx
subtitle={
  tdfData.raceStatus === "upcoming"
    ? "Starting July 4, 2026 in Barcelona"
    : tdfData.raceStatus === "active"
      ? `Stage ${tdfData.currentStage} in progress`
      : "Race Complete"
}
```

But the "will update once the race begins" message (line 144 in `src/app/cycling/page.tsx`) is hard-coded and always shows, regardless of race status.

**Reproduction Steps:**
1. Visit https://rankings123.com/cycling when race status is "active"
2. Look at header subtitle - shows "Stage 5 in progress"
3. Scroll down to the data source notice
4. Notice it says "General Classification will update once the race begins on July 4, 2026"

**Expected Behavior:**
The "will update once race begins" message should only show when `raceStatus === "upcoming"`. Once the race is active, it should show different text (or nothing).

**Actual Behavior:**
Both messages show simultaneously, contradicting each other.

**Impact:**
- User confusion about race status
- Looks unprofessional / buggy
- Undermines trust in data accuracy
