---
id: table-pagination-fix
status: open
deps: []
links: []
created: 2026-06-29T13:49:50Z
type: bug
priority: 0
parent: rankings123
tags: [bug, atp, wta, regression]
---
# Fix ATP/WTA Live table truncation (only 1 player visible)

## Notes

**2026-06-29T13:49:56Z**

CRITICAL REGRESSION — Core feature broken

Both ATP/WTA Live tables only show 1 player instead of full rankings.
- https://rankings123.com/atp-live — only Jannik Sinner
- https://rankings123.com/wta-live — only Aryna Sabalenka

Root cause: Likely rendering/pagination bug. Data feed OK, UI renders only first row.

Acceptance:
✓ ATP Live displays full rankings (top 1000)
✓ WTA Live displays full rankings (top 100+)
✓ Pagination functional
✓ Regression test in tests/ verifying table has > 1 row
✓ Verified on live site

Impact: CRITICAL — core feature unusable. Effort: MEDIUM.
