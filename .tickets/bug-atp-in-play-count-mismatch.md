---
id: bug-atp-in-play-count-mismatch
status: open
deps: []
links: []
created: 2026-07-20T18:06:55Z
type: bug
priority: 2
parent: rankings123
tags: [bug, atp, ui, consistency]
---
# ATP Live 'In play' badge shows incorrect count vs visible data

**URL:** https://rankings123.com/atp-live

**Repro:**
1. Visit https://rankings123.com/atp-live
2. Observe the header badge showing "8 In play"
3. Scan the visible ranking table (rows 1-50, page 1 of 20)
4. Count players with active tournament information (format: "Tournament Name · Stage")

**Expected:** The "8 In play" badge should match the number of players with tournament info visible on the current page, OR it should clarify it's showing a total across all pages (e.g., "8 In play across all pages")

**Actual:** Header shows "8 In play" but only **1 player** (rank 38, Ignacio Buse with "Generali Open · R16") has tournament info visible on page 1. The other 7 are presumably on other pages, creating a confusing UX where the badge count doesn't match what the user can see.

**Severity:** P2 - Consistency/UX bug. Not broken functionality, but creates user confusion. Classic "count badge that disagrees with the visible list" consistency issue.

**Type:** Consistency bug - UI shows a count that doesn't match the visible data without explanation.

## Acceptance Criteria

- Either: The "X In play" badge shows only the count of players with active tournaments visible on the CURRENT page, OR
- The badge clarifies it's a total count (e.g., "8 in play" → "8 in play (across all rankings)")
- Same fix should apply to WTA Live if it has the same issue
- Regression test REQUIRED: Add a test in `tests/` (run via `npm test`) that validates the "In play" count logic, OR add an invariant to `scripts/check-data-sanity.mjs` that verifies count badges match visible data when the badge appears
