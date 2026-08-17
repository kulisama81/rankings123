---
id: bug-homepage-console-errors
status: closed
deps: []
links: []
created: 2026-08-16T05:04:30Z
type: bug
priority: 1
parent: rankings123
tags: [bug, homepage, data]
---
# Homepage has 17 console errors (CORS + Cincinnati fetch failures)

The homepage generates 17 JavaScript console errors, primarily CORS policy violations when fetching ESPN data and a specific 'Failed to fetch Cincinnati scores' error.

URL: https://rankings123.com
Repro: Open browser DevTools console and visit homepage
Expected: No console errors (warnings are acceptable)
Actual: 17 console errors including:
- 'Access to fetch at https://site.api.espn.com/apis/site/v2/sports/tennis/atp/scoreboard from origin https://rankings123.com has been blocked by CORS policy'
- 'Failed to fetch Cincinnati scores: TypeError: Failed to fetch'
Impact: While the page appears to function (graceful degradation to mock data), console errors indicate broken data fetching logic and could cause issues for users or affect site reliability.
Severity: P1 - Functional degradation, but site still works due to mock fallback.

## Acceptance Criteria

1. The homepage produces ZERO console errors (warnings are acceptable)
2. ESPN API fetches either succeed OR fail silently with proper error handling (no exposed errors in console)
3. Cincinnati scores widget either fetches successfully OR is hidden/shows a graceful 'unavailable' state (not a console error)
4. A regression test is added (node --test unit test in tests/ that uses Playwright to load the homepage and assert zero console errors, similar to the inspector's check)
5. The test MUST fail on current code (detecting the 17 errors) and pass after the fix
6. Verified on live production site by checking browser console at rankings123.com
