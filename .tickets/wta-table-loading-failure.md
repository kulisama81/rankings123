---
id: wta-table-loading-failure
status: closed
deps: []
links: []
created: 2026-06-23T18:04:27Z
type: bug
priority: 0
parent: rankings123
tags: [bug, wta, data]
---
# WTA Live ranking table fails to load - shows only one player

## Acceptance Criteria

- WTA ranking table loads with full dataset
- No "Loading..." placeholder visible on page load
- Country filter functional (if implemented)
- **Regression test added** to tests/ (run via npm test) that verifies ranking table has >1 player AND no "Loading..." text in rendered output
- Verified working on production after deploy

## Bug Report

**URL:** https://rankings123.com/wta-live

**Severity:** CRITICAL - Core feature completely broken

**Description:**
The WTA Live ranking table only displays a single player (Aryna Sabalenka #1) followed by "Loading..." text. The table never completes loading.

**Reproduction Steps:**
1. Visit https://rankings123.com/wta-live
2. Observe the ranking table area
3. Only one player is visible with persistent "Loading..." text below

**Expected Behavior:**
Full WTA ranking table should load and display

**Actual Behavior:**
Only 1 player shown, "Loading..." text persists indefinitely, suggesting data fetch failure or incomplete SSR

**Impact:**
- Primary WTA ranking feature is non-functional
- Users cannot browse rankings beyond #1
- Mirrors the same critical issue affecting ATP Live
