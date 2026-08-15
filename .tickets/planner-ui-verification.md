---
id: planner-ui-verification
status: open
deps: []
links: []
created: 2026-08-15T13:52:05Z
type: task
priority: 2
parent: rankings123
tags: [process, loop-health, quality]
---
# Planner verification improvement: UI rendering checks

LOOP QUALITY ISSUE: Planner sometimes ships UI that breaks in production but passes build/lint (example: homepage preview stuck in loading state, required a fix commit).

ROOT CAUSE: Verification is build + lint only. No check that components actually RENDER correctly.

SOLUTION: Add lightweight render verification to planner loop:
1. After build passes, start dev server
2. Curl key routes (/, /atp-live, /wta-live) → check 200 + HTML contains expected content
3. OR: Playwright smoke test (basic render checks, not full E2E)

BENEFIT: Catches hydration errors, loading states, API integration bugs BEFORE merge.

ROI: 7/10 — MEDIUM effort (add verification step), prevents production bugs, improves loop quality.

## Acceptance Criteria

✅ Research options: curl + grep vs Playwright smoke test
✅ Implement chosen approach in build-next command
✅ Verification checks:
  - / returns 200 + contains 'Rankings123'
  - /atp-live returns 200 + contains player names (not just loading skeleton)
  - /wta-live returns 200 + contains player names
✅ Document in docs/LOOP.md
✅ Test: intentionally break a page, verify detection
✅ Update acceptance-criteria-template to include render check
