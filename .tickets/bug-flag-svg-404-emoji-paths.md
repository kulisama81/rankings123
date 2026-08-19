---
id: bug-flag-svg-404-emoji-paths
status: open
deps: []
links: []
created: 2026-08-19T18:04:07Z
type: bug
priority: 1
parent: rankings123
tags: [bug, ui, atp, homepage]
---
# Flag SVG 404 errors: emoji-encoded paths instead of ISO codes

**URL:** / (Homepage), /atp-live (ATP Live Rankings)

**Severity:** p1 - Multiple network failures on every page load

**Repro steps:**
1. Visit https://rankings123.com/ or https://rankings123.com/atp-live
2. Open browser DevTools Network tab
3. Observe multiple 404 errors for flag SVG requests

**Expected:**
Flag images load successfully using ISO country codes (e.g., `/flags/DE.svg`, `/flags/US.svg`)

**Actual:**
- Flag paths use emoji Unicode: `/flags/%F0%9F%87%A9%F0%9F%87%AA.svg` (🇩🇪), `/flags/%F0%9F%87%BA%F0%9F%87%B8.svg` (🇺🇸)
- All flag SVG requests return 404
- Console shows multiple 'Failed to load resource' errors

**Impact:**
- Homepage: 3 console errors, 3 network failures
- ATP Live: 22 console errors, 22 network failures
- Degrades performance and causes broken flag images

## Acceptance Criteria

- Flag SVG paths use ISO country codes (DE, US, IT) not emoji Unicode
- All flag images load successfully (200 status) on /, /atp-live, /wta-live
- Zero console errors related to flag loading
- **Regression test:** Add test in `tests/flag-paths.test.mjs` that validates flag path generation uses ISO codes and rejects emoji-encoded paths
