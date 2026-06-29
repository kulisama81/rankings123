---
id: planner-render-verification
status: open
deps: []
links: []
created: 2026-06-29T13:50:12Z
type: task
priority: 2
parent: rankings123
tags: [loop, process, quality]
---
# Strengthen planner verification: catch UI rendering regressions

## Notes

**2026-06-29T13:50:18Z**

Loop health — prevent silent regressions

ATP/WTA table truncation was a SILENT regression (passed build/ESLint but broke UX). Planner needs stronger pre-commit verification.

Current: build green + ESLint + unit tests
Missing: Real-browser rendering check

Solution:
1. Extend npm run check:core-features to verify:
   - ATP Live table > 1 row
   - WTA Live table > 1 row
   - World Cup bracket > 1 match
   - Nav tabs visible
2. Update planner contract to require check:core-features green
3. Document in docs/LOOP.md

Acceptance:
✓ check:core-features extended (table row counts)
✓ Planner contract updated
✓ Documented in LOOP.md
✓ Test: break ATP table → verify check catches it

Impact: HIGH (prevents future UX regressions). Effort: MEDIUM.
