---
id: bug-wta-pagination-spacing
status: in_progress
deps: []
links: []
created: 2026-07-22T00:00:00Z
type: bug
priority: 3
parent: rankings123
tags: [bug, wta, ui, pagination]
---
# WTA Live: Pagination text formatting broken (missing spaces)

**URL:** https://rankings123.com/wta-live

**Severity:** P3 (Minor UI polish issue)

**Description:**
The pagination controls on the WTA Live page display with missing spaces between elements, showing "← PrevPage 1 / 2Next →" instead of the properly formatted "← Prev  Page 1 / 2  Next →". This makes the pagination text harder to read and looks unprofessional.

**Reproduction Steps:**
1. Visit https://rankings123.com/wta-live
2. Scroll to the bottom of the rankings table
3. Observe the pagination controls
4. Notice "PrevPage" is concatenated (should be "Prev  Page")
5. Notice "2Next" is concatenated (should be "2  Next")

**Expected Behavior:**
Pagination should display with proper spacing: "← Prev  Page 1 / 2  Next →"

**Actual Behavior:**
Pagination displays as: "← PrevPage 1 / 2Next →" (missing spaces)

**Impact:**
- Reduces readability of pagination controls
- Looks unprofessional and suggests quality issues
- Minor UX degradation

## Acceptance Criteria

1. Investigate the WTA live rankings pagination component:
   - Check `src/components/LiveRankingTable.tsx` or WTA-specific table component
   - Identify where pagination text is rendered
   - Find why spaces are missing between "Prev"/"Page" and "2"/"Next"

2. Fix the spacing issue:
   - Add proper spacing between pagination elements
   - Ensure consistent formatting with ATP pagination (check if ATP has same issue)
   - Test in both dark and light themes

3. **REGRESSION TEST REQUIRED** (per CLAUDE.md):
   - Add test in `tests/pagination-formatting.test.js`:
     - Fetch /wta-live HTML (can use simple string check or DOM parsing)
     - Verify pagination text contains proper spaces: "Prev  Page" and "  Next"
     - Test should FAIL with current concatenated text
     - Test should PASS when spacing is fixed
   - Run via `npm test`

4. Verify the fix locally:
   - Visit http://localhost:3000/wta-live
   - Scroll to pagination controls
   - Verify proper spacing: "← Prev  Page 1 / 2  Next →"
   - Test both themes (dark/light)
   - Check ATP page for consistency

5. Standard checks:
   - `npm run build` — succeeds
   - `npm test` — all tests green
   - `npx eslint src --max-warnings=0` — clean

6. Live verification after deploy:
   - Visit https://rankings123.com/wta-live
   - Verify pagination displays correctly: "← Prev  Page 1 / 2  Next →"
   - Verify Vercel build succeeded
