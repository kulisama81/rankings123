---
id: bug-privacy-branding-typo
status: open
deps: []
links: []
created: 2026-07-22T00:00:00Z
type: bug
priority: 2
parent: rankings123
tags: [bug, privacy, ui, branding]
---
# Privacy page: Header branding typo "RANKINGS23R23" instead of "Rankings123"

**URL:** https://rankings123.com/privacy

**Severity:** P2 (Medium) — Branding/professionalism issue

**Description:**
The privacy policy page displays a malformed branding link in the header navigation showing "[RANKINGS23R23](/)" instead of the correct "[Rankings123](/)". This is a typo that affects brand consistency and looks unprofessional on an important legal/compliance page.

**Reproduction Steps:**
1. Visit https://rankings123.com/privacy
2. Look at the header navigation (top-left logo/brand link)
3. Observe "RANKINGS23R23" text

**Expected Behavior:**
Header should display "Rankings123" consistently with the rest of the site.

**Actual Behavior:**
Header displays "RANKINGS23R23" (typo: "23R23" instead of "123").

**Impact:**
- Damages brand consistency and professionalism
- Particularly bad on privacy page (users read these for trust signals)
- Suggests lack of attention to detail
- May affect user trust in the site

## Acceptance Criteria

1. Investigate the privacy page header/navigation component:
   - Check `src/app/privacy/page.tsx` or shared layout component
   - Identify where the branding link text is defined
   - Determine if this is a copy-paste typo or a variable issue

2. Fix the typo:
   - Change "RANKINGS23R23" to "Rankings123"
   - Verify this doesn't affect other pages (should use shared nav component)
   - Ensure consistent branding across all static pages (privacy, terms, cookies, about)

3. **REGRESSION TEST REQUIRED** (per CLAUDE.md):
   - Add test in `tests/branding-consistency.test.js`:
     - Fetch /privacy, /terms, /cookies HTML
     - Verify header branding text is exactly "Rankings123" (case-sensitive)
     - Test should FAIL with current "RANKINGS23R23" typo
     - Test should PASS when corrected
   - Run via `npm test`

4. Verify the fix locally:
   - Visit http://localhost:3000/privacy
   - Check header displays "Rankings123"
   - Also check /terms, /cookies, /about for consistency
   - Click the logo link to verify it goes to homepage

5. Standard checks:
   - `npm run build` — succeeds
   - `npm test` — all tests green
   - `npx eslint src --max-warnings=0` — clean

6. Live verification after deploy:
   - Visit https://rankings123.com/privacy
   - Verify header shows "Rankings123" (correct branding)
   - Check other static pages for consistency
   - Verify Vercel build succeeded
