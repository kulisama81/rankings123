---
id: atp-table-loading-failure
status: open
deps: []
links: []
created: 2026-06-23T18:04:23Z
type: bug
priority: 0
parent: rankings123
tags: [bug, atp, data]
---
# ATP Live ranking table fails to load - shows only one player

## Bug Report

**URL:** https://rankings123.com/atp-live

**Severity:** CRITICAL - Core feature completely broken

**Description:**
The ATP Live ranking table only displays a single player (Jannik Sinner #1) followed by "Loading..." text. The page header promises "full ranking (top 1000)" but the table never completes loading.

**Reproduction Steps:**
1. Visit https://rankings123.com/atp-live
2. Observe the ranking table area
3. Only one player is visible with persistent "Loading..." text below

**Expected Behavior:**
Full ATP ranking table with top 1000 players should load and display

**Actual Behavior:**
Only 1 player shown, "Loading..." text persists indefinitely, suggesting data fetch failure or incomplete SSR

**Impact:**
- Primary ATP ranking feature is non-functional
- Users cannot browse rankings beyond #1
- Country filter (if present) would have no data to filter

## Acceptance Criteria

- ATP ranking table loads with full dataset (top 1000)
- No "Loading..." placeholder visible on page load
- Country filter functional (if implemented)
- **Regression test added** to tests/ (run via npm test) that verifies ranking table has >1 player AND no "Loading..." text in rendered output
- Verified working on production after deploy
