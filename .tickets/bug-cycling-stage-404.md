---
id: bug-cycling-stage-404
status: open
deps: []
links: []
created: 2026-07-09T22:00:00Z
type: bug
priority: 1
parent: rankings123
tags: [bug, cycling, routing, ui]
---
# Tour de France stage pages return 404 (broken links)

## Bug Report

**URL:** https://rankings123.com/cycling

**Severity:** P1 (High) - Broken navigation links affecting user experience

**Description:**
The cycling page displays clickable links to individual Tour de France stage pages (e.g., `/events/tdf-2026/stage-1`, `/events/tdf-2026/stage-2`, etc.), but all these links return HTTP 404 when clicked. Users cannot access the stage detail pages they're being directed to.

**Reproduction Steps:**
1. Visit https://rankings123.com/cycling
2. Scroll to the stage list section
3. Click on any stage link (e.g., "Stage 1", "Stage 2", etc.)
4. Observe 404 error

**Expected Behavior:**
Stage links should navigate to working stage detail pages showing stage information (distance, profile, winner, etc.)

**Actual Behavior:**
All stage page URLs return HTTP 404:
- `/events/tdf-2026/stage-1` → 404
- `/events/tdf-2026/stage-2` → 404
- `/events/tdf-2026/stage-7` (current stage) → 404

**Verification:**
```bash
curl -I "https://rankings123.com/events/tdf-2026/stage-1" # Returns 404
```

**Impact:**
- Broken user experience - links don't work
- Looks unprofessional
- Users expect to see stage details when clicking these links
- Git history shows "Add individual Tour de France stage pages" was committed (16c4045) but pages are not accessible

## Acceptance Criteria

1. All stage page routes under `/events/tdf-2026/stage-[N]` return HTTP 200 (not 404)
2. Stage pages display stage information correctly (stage number, distance, date, type)
3. Stage pages are properly linked from the cycling main page
4. Navigation between stage pages works (if implemented)
5. **REGRESSION TEST REQUIRED:**
   - Add test in `tests/cycling-stage-pages.test.js` (run via `npm test`)
   - Test must verify:
     - Stage 1 page returns 200, not 404
     - Current stage page (e.g., stage 7) returns 200
     - Stage pages contain expected content (stage number, basic details)
   - Test should FAIL on current code, PASS when fixed
6. Run `npm test` — all tests green
7. Run `npm run build` — succeeds
8. Verify on LIVE production:
   - Visit https://rankings123.com/cycling
   - Click on a stage link
   - Confirm stage page loads (HTTP 200, not 404)
   - Check multiple stage pages work
