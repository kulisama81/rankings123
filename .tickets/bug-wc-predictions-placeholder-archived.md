---
id: bug-wc-predictions-placeholder-archived
status: open
deps: []
links: []
created: 2026-08-18T00:00:00Z
type: bug
priority: 2
parent: rankings123
tags: [bug, worldcup, ui, consistency]
---
# World Cup page shows outdated placeholder text post-tournament

**URL:** https://rankings123.com/world-cup

**Severity:** P2 (Consistency/UX bug)

**Type:** Consistency bug — outdated placeholder text on archived tournament page

**Description:**
The World Cup page Match Predictions section displays "Check back as the tournament schedule is announced" despite the tournament being complete (ended July 19, 2026). This creates a confusing user experience on a historical/archived page.

**Reproduction Steps:**
1. Visit https://rankings123.com/world-cup
2. Scroll to Match Predictions section
3. Observe text: "Check back as the tournament schedule is announced"
4. Note the tournament shows as complete with final results (Argentina 3-1 Switzerland)

**Expected Behavior:**
Since the tournament is complete, the Match Predictions section should either:
- Display historical predictions (if available), OR
- Be hidden entirely, OR
- Show appropriate messaging like "Tournament concluded July 19, 2026"

**Actual Behavior:**
Shows "Check back as the tournament schedule is announced" — implying a future tournament that hasn't been scheduled yet, despite showing completed match results.

**Impact:**
- Confusing/contradictory messaging on an archived page
- Violates consistency principle (page shows completed results but asks users to "check back")
- Minor UX degradation for users browsing historical data

**Inspector found:** 2026-08-18 live site inspection

## Acceptance Criteria

1. **Remove or update the placeholder text:**
   - Remove "Check back as the tournament schedule is announced" from the Match Predictions section
   - Replace with appropriate messaging for a completed tournament OR hide the section entirely
   - No "upcoming" or "check back" language on a completed tournament page

2. **Regression test in tests/world-cup-archived.test.mjs:**
   - Fetch https://rankings123.com/world-cup HTML
   - If tournament is complete (final match has result), assert NO occurrence of "check back as the tournament schedule" or similar future-tense placeholder text
   - Test should FAIL on current code (placeholder found)
   - Test should PASS after fix (no future-tense placeholders on completed tournament)
   - Run via `npm test`

3. **Local verification:**
   - Visit http://localhost:3000/world-cup
   - Verify NO "check back" or "schedule is announced" messaging on Match Predictions section
   - `npm run build` — succeeds
   - `npm test` — regression test passes
   - `npx eslint src --max-warnings=0` — clean

4. **Live verification after deploy:**
   - Visit https://rankings123.com/world-cup
   - Verify Vercel build succeeded via gh api
   - Verify no outdated placeholder text in Match Predictions section
   - Check both dark and light themes
   - Screenshot for report
