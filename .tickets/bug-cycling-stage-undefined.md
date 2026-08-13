---
id: bug-cycling-stage-undefined
status: open
deps: []
links: []
created: 2026-08-12T18:00:00Z
type: bug
priority: 2
parent: rankings123
tags: [bug, cycling, placeholder, cx-first-violation]
---
# Cycling page shows "Stage undefined in progress" placeholder text

## Bug Report

**URL:** https://rankings123.com/cycling

**Severity:** P2 (Medium) - CX-FIRST violation, shows broken placeholder text to users

**Inspection Date:** 2026-08-12

## Description

The cycling page displays **"Stage undefined in progress"** and shows "preview data" placeholder content, violating the CX-FIRST principle: "never ship placeholder, 'coming soon', empty, or fabricated UI to users."

## Specific Issues Found

1. **"Stage undefined in progress"** — broken template string showing "undefined"
2. **"Leader will be determined"** — placeholder text across all jersey classifications
3. **"Currently showing preview data"** — explicit admission of placeholder content
4. Race marked as "Live" but stage details table is empty

## Reproduction Steps

1. Visit https://rankings123.com/cycling (Tour de Pologne 2026 page)
2. Observe header: "Stage undefined in progress"
3. See jersey classifications: "Leader will be determined" (4× placeholder)
4. Read footer: "Currently showing preview data"
5. **Expected:** Real data OR section hidden until data available
6. **Actual:** Broken/placeholder content visible to users

## Impact

- Looks broken/unprofessional ("undefined" visible to users)
- Violates CX-FIRST: showing placeholder instead of hiding incomplete features
- Confusing: race marked "Live" but shows preview/placeholder data

## Related Tickets

- `cycling-placeholder-violation` (closed) — homepage cycling placeholder issue
- This is a **new issue** on the cycling detail page itself

## Acceptance Criteria

1. **Fix or hide the broken cycling page:**
   - **Option A (if race data available):** Fix "Stage undefined" to show actual stage number
   - **Option B (if no real data):** Hide the cycling page entirely until real data is available
   - **Option C:** Show only historical/completed race data (no "Live" label for incomplete data)
   
2. **Remove all placeholder text:**
   - No "undefined" visible in UI
   - No "Leader will be determined" placeholder
   - No "Currently showing preview data" disclaimer
   - No "Stage undefined" broken template strings

3. **CX-FIRST compliance:**
   - Either show real, complete data OR hide the feature
   - Never show "Live" badge on a race without actual live stage data

4. **REGRESSION TEST REQUIRED:**
   - Add invariant to `scripts/check-data-sanity.mjs`:
     - Scan cycling page HTML for prohibited patterns: /undefined|preview data|will be determined/i
     - If cycling page is accessible, verify it has real stage numbers (not "undefined")
     - Test should FAIL with current placeholder content, PASS when fixed or hidden
   - OR add test in `tests/cycling-placeholder.test.mjs`:
     - Fetch cycling page
     - Assert no "undefined" text in page
     - Assert no "preview data" disclaimer
     - Assert if race is "Live", stage number is a real number (not undefined)

5. **Verify locally:**
   - Visit http://localhost:3000/cycling
   - Confirm: no "undefined", no placeholder text visible
   - Either real data showing OR page hidden/404s gracefully
   - `npm test` — all tests green
   - `npm run check:data-sanity` — passes

6. **Standard checks:**
   - `npm run build` — succeeds
   - `npx eslint src --max-warnings=0` — clean

7. **Live verification:**
   - Visit https://rankings123.com/cycling
   - No placeholder/broken text visible to users
   - CX-FIRST compliant: real data or feature hidden
