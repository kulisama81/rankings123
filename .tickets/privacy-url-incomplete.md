---
id: privacy-url-incomplete
status: closed
deps: []
links: []
created: 2026-06-21T20:00:00Z
type: bug
priority: 3
parent: rankings123
tags: [privacy, ui, bug]
---
# Privacy policy Google Analytics opt-out URL missing protocol

**URL:** https://rankings123.com/privacy

**Repro:** Visit the privacy policy page and find the Google Analytics opt-out link.

**Expected:** A working link to `https://tools.google.com/dlpage/gaoptout` with proper protocol.

**Actual:** The link text shows `tools.google.com/dlpage/gaoptout` without the `https://` protocol prefix, which may result in a broken or improperly-functioning link.

**Severity:** P3 (minor usability issue — low impact but should be fixed for completeness)

## Acceptance Criteria

1. Privacy policy page displays Google Analytics opt-out link with full URL including `https://` protocol
2. Link is clickable and navigates correctly to the opt-out page
3. REGRESSION TEST REQUIRED: Add test in `tests/privacy-links.test.js`:
   - Verify all external links in privacy policy include proper protocol (https://)
   - Check that Google Analytics opt-out link specifically is well-formed
   - Test fails with current incomplete URL, passes when protocol is added
4. Run via `npm test` — all tests green
5. Build/lint green
6. Live-verified on https://rankings123.com/privacy — link works correctly
