---
id: bug-wc-final-predictions-placeholder
status: open
deps: []
links: [wc-final-predictions-page]
created: 2026-07-14T19:30:00Z
type: bug
priority: 0
parent: rankings123
tags: [bug, worldcup, p0, cx-violation]
---
# World Cup Final Predictions page ships placeholder content (P0 CX violation)

**URL:** https://rankings123.com/world-cup/final-2026-predictions

**Severity:** P0 (CRITICAL) — Violates CX-first rule during live World Cup (through July 19)

**Type:** Regression — Ticket `wc-final-predictions-page` was marked CLOSED but implementation violates its acceptance criteria

**Description:**
The World Cup Final Predictions page ships with placeholder content visible to users, violating the CX-first principle in CLAUDE.md: "never ship placeholder, 'coming soon', empty, or fabricated UI to users — no 'Affiliate Partner: Placeholder', no made-up odds/stats/predictions, no dead links."

The page header promises "Expert predictions · Tactical analysis · Match preview" but delivers none of this content.

**Placeholder Content Found:**
- "Finalists To Be Determined"
- "🏆TBD" (appears 4 times)
- "Awaiting Semifinals"
- "The World Cup Final matchup will be confirmed after the semifinals conclude."

**Reproduction Steps:**
1. Visit https://rankings123.com/world-cup/final-2026-predictions
2. Observe placeholder text throughout the page
3. Note that no actual predictions, analysis, or betting content is present
4. Compare with the page header which promises content that isn't delivered

**Expected Behavior:**
Per the closed ticket's acceptance criteria: "CX-first: no placeholder/fake odds - only show when real source available"

The page should either:
- **Option A (preferred):** Not exist yet / return 404 until real predictions are available
- **Option B:** Show "This page will go live after the semifinals (July 15)" instead of pretending to have content
- **Option C:** Hide/gate all placeholder sections behind a check for real data (like we do with other features)

**Actual Behavior:**
Page ships with visible placeholder text ("TBD", "To Be Determined", "Awaiting"), marketing content it doesn't deliver ("Expert predictions" header with no predictions), and violates the acceptance criteria of its parent ticket.

**Impact:**
- Users arrive expecting predictions but find placeholders
- Violates CX-first design principle (protecting viewer experience above shipping fast)
- Tournament is LIVE (semifinals July 15, final July 19) — time-sensitive
- Damages trust when we promise "expert predictions" but show "TBD"

**Why This Matters:**
CLAUDE.md explicitly prioritizes CX over speed: "CX FIRST — protect the viewer experience above short-term revenue (overriding rule): a great experience is what guarantees continued engagement and viewer trust, which is what ultimately drives revenue."

Shipping placeholder content trains users not to trust our site.

## Acceptance Criteria

1. **Remove or gate all placeholder content:**
   - Remove "Finalists To Be Determined", "🏆TBD", "Awaiting Semifinals" text
   - Either hide sections until real data available OR remove page entirely until ready
   - If keeping page structure: replace placeholders with honest messaging ("Available after semifinals July 15")

2. **Fix the false marketing:**
   - Remove "Expert predictions · Tactical analysis · Match preview" header OR deliver on this promise
   - Don't market content that doesn't exist

3. **Apply CX-first gating pattern:**
   - Follow the pattern used elsewhere: `{realDataAvailable && <Section />}` not `<Section>TBD</Section>`
   - Example: betting odds only show when `oddsSource === "api"`, not as placeholders

4. **REGRESSION TEST REQUIRED** (per CLAUDE.md):
   - Add test in `tests/worldcup-final-predictions.test.mjs`:
     - Fetch /world-cup/final-2026-predictions page HTML
     - Assert NO occurrence of: "TBD", "To Be Determined", "Awaiting", "placeholder", "coming soon" (case-insensitive)
     - OR if page should 404 until ready: assert 404 status before semifinals, 200 after
   - Test should FAIL on current code (placeholder text found)
   - Test should PASS after fix (no placeholders OR 404 until ready)
   - Run via `npm test`

5. Verify the fix locally:
   - Visit http://localhost:3000/world-cup/final-2026-predictions
   - Verify NO placeholder text visible to users
   - If page exists: only shows real predictions/data OR honest "coming soon" message
   - `npm run build` — succeeds
   - `npm test` — regression test passes
   - `npx eslint src --max-warnings=0` — clean
   - `npm run check:data-sanity` — clean

6. Live verification after deploy:
   - Visit https://rankings123.com/world-cup/final-2026-predictions
   - Verify Vercel build succeeded
   - Verify NO "TBD", "To Be Determined", "Awaiting" text visible
   - Check browser console: no errors
   - Screenshot the page in both dark and light themes: no placeholders

## Related Tickets
- Parent: `wc-final-predictions-page` (CLOSED) — acceptance criteria violated
- Similar: `wc-knockout-placeholder-text` (CLOSED) — same pattern, different page

## Notes
This is the SECOND time we've shipped placeholder text to users (first was knockout bracket "Winner M74"). The data-integrity gate catches fabricated data, but we need a similar check for placeholder UI text.

Consider adding to `scripts/check-data-sanity.mjs`:
- Fail build if any component renders user-facing text matching /TBD|To Be Determined|Placeholder|Coming Soon/i
- Exceptions: honest messaging like "This page will be available on [date]" (not "TBD")
