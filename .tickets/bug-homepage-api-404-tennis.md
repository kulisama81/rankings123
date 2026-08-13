---
id: bug-homepage-api-404-tennis
status: open
deps: []
links: []
created: 2026-08-13T18:06:25Z
type: bug
priority: 2
parent: rankings123
tags: [bug, homepage, api, console-error]
---
# Homepage making repeated 404 API calls to tennis endpoints

## Bug Report

**URL:** https://rankings123.com/

**Severity:** P2 (Medium) - Console errors, unnecessary network traffic, related to live preview issue

**Inspection Date:** 2026-08-13

## Description

The homepage is making **repeated failed API calls** to `/api/atp-live` and `/api/wta-live`, which both return 404 errors. During page load, **8 failed requests** are logged to the console (multiple retries for each endpoint). These endpoints either don't exist or are misconfigured.

This is causing:
- Console pollution with error messages
- Unnecessary network traffic and retry overhead
- Likely contributing to the homepage live preview data issue (bug-homepage-live-preview-empty)

## Reproduction Steps

1. Open browser developer console (Network tab + Console tab)
2. Visit https://rankings123.com/
3. Observe console errors: "Failed to load resource: the server responded with a status of 404 ()"
4. Check Network tab: see multiple requests to `/api/atp-live` and `/api/wta-live` with 404 status
5. **Expected:** API calls succeed (200) or don't happen if endpoints don't exist
6. **Actual:** 8 failed 404 requests (4× `/api/atp-live`, 4× `/api/wta-live`)

## Root Cause

The homepage Live Rankings Preview component is attempting to fetch data from API routes that don't exist or are returning 404. The component likely has retry logic, causing multiple failed attempts.

Possible causes:
- API routes `/api/atp-live` and `/api/wta-live` were never implemented
- Routes moved/renamed but homepage component still references old paths
- Routes are server-side only and not exposed as API endpoints

## Acceptance Criteria

1. **Fix the API calls:**
   - **Option A:** Implement the missing `/api/atp-live` and `/api/wta-live` API routes that return proper JSON data
   - **Option B:** Update homepage component to fetch from correct existing endpoints (if they exist elsewhere)
   - **Option C:** Remove the API calls if the preview should use SSR data instead
   
2. **Zero 404 errors on homepage:**
   - Load https://rankings123.com/ in browser console
   - Network tab shows NO 404 errors
   - Console shows NO "Failed to load resource" errors
   - All API calls succeed (200) or are removed

3. **REGRESSION TEST REQUIRED** (per CLAUDE.md):
   - Add test in `tests/homepage-api-endpoints.test.mjs` (run via `npm test`):
     - Fetch homepage HTML or JSON
     - If API endpoints exist: verify `/api/atp-live` and `/api/wta-live` return 200 status
     - Verify response contains valid JSON with expected structure (player data)
     - Test should FAIL if either endpoint returns 404
     - Test should PASS when both endpoints work or calls are removed
   - OR add to existing `tests/` suite:
     - Test that homepage loads without 404 console errors
     - Mock or stub the API calls to verify proper error handling

4. **Verify locally:**
   - `npm run dev` → visit http://localhost:3000/
   - Open browser console + Network tab
   - Verify NO 404 errors appear
   - If API routes exist, verify they return data
   - `npm test` — all tests green including new regression test

5. **Standard checks:**
   - `npm run build` — succeeds
   - `npx eslint src --max-warnings=0` — clean
   - `npm run check:data-sanity` — passes

6. **Live verification after deploy:**
   - Visit https://rankings123.com/
   - Open browser console + Network tab
   - Confirm NO 404 errors for `/api/atp-live` or `/api/wta-live`
   - All API calls succeed or are removed
   - Regression test passes in production

## Related Tickets

- bug-homepage-live-preview-empty — likely caused by these failed API calls
