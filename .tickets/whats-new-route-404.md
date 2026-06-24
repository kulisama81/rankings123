---
id: whats-new-route-404
status: closed
deps: []
links: []
created: 2026-06-23T18:04:30Z
type: bug
priority: 2
parent: rankings123
tags: [bug, routing, ui]
---
# /whats-new route returns 404 while /changelog works

## Acceptance Criteria

- Choose canonical route (/whats-new or /changelog)
- Add redirect from non-canonical to canonical route
- Update all internal links to use canonical route
- **Regression test added** to tests/ that verifies both routes return 200 (canonical direct, non-canonical via redirect)
- Verified working on production after deploy

## Bug Report

**URL:** https://rankings123.com/whats-new

**Severity:** Medium - Route inconsistency, but workaround exists (/changelog)

**Description:**
The /whats-new route returns a 404 error, but the changelog page is accessible at /changelog. This creates routing inconsistency.

**Reproduction Steps:**
1. Visit https://rankings123.com/whats-new
2. Observe 404 error
3. Visit https://rankings123.com/changelog
4. Changelog page loads successfully

**Expected Behavior:**
Either /whats-new should redirect to /changelog, OR /whats-new should be the canonical route with /changelog redirecting to it

**Actual Behavior:**
/whats-new 404s while /changelog works, creating broken links if anything points to /whats-new

**Impact:**
- Potential broken links
- SEO confusion with duplicate/inconsistent URLs
- User confusion if they try to access /whats-new
