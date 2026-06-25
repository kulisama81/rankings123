---
id: wc-knockout-placeholder-text
status: open
deps: []
links: []
created: 2026-06-25T21:30:00Z
type: bug
priority: 2
parent: rankings123
tags: [worldcup, ui, bug]
---
# World Cup knockout bracket shows "Winner M74" placeholder text (CX violation)

**URL:** https://rankings123.com/world-cup/knockout

**Severity:** Medium (P2) — Visual/UX issue that violates CX-first principle

**Description:**
The knockout stage bracket displays technical placeholder text like "Winner M74", "Winner M77", "Winner M101", etc. for R16, quarterfinal, and semifinal matchups. This is user-unfriendly and violates the CX-first rule in CLAUDE.md: "never ship placeholder, 'coming soon', empty, or fabricated UI to users."

**Reproduction Steps:**
1. Visit https://rankings123.com/world-cup/knockout
2. Scroll to the R16, Quarterfinals, or Semifinals sections
3. Observe matchups labeled "Winner M74 vs Winner M75", etc.

**Expected Behavior:**
Bracket should show user-friendly text such as:
- "TBD" or "To Be Determined" 
- "Winner of [Match #74]" with a link/reference to the source match
- Or better: "Winner of [Team A vs Team B]" dynamically referencing the actual R32 matchup

**Actual Behavior:**
Technical placeholders ("Winner M74", "Winner M77", "Winner M101", "Winner M102") are displayed directly to users, creating confusion about which matches these refer to.

**Root Cause:**
Source code in `src/lib/worldCupBracketFeed.ts` generates these labels:
```typescript
homeSeedLabel: sourceIndices[0] !== undefined ? `Winner M${73 + sourceIndices[0]}` : undefined,
```

**Impact:**
- Poor user experience — users cannot understand which matches feed into later rounds
- Violates CX-first design principle
- Makes the bracket feel unfinished/unprofessional

## Acceptance Criteria

1. Replace all "Winner M[number]" labels with user-friendly alternatives:
   - Option A: "TBD" or "To Be Determined"
   - Option B: "Winner of Match #74" (more specific)
   - Option C (best): "Winner of [Team A vs Team B]" by dynamically resolving the R32 matchup
2. No technical placeholder text visible to users anywhere on the knockout bracket
3. Both dark and light themes render the updated labels clearly
4. **REGRESSION TEST REQUIRED**: Create `tests/world-cup-knockout-labels.test.js` that:
   - Verifies knockout bracket data does NOT contain "Winner M[digit]" pattern in user-facing labels
   - Confirms labels use user-friendly alternatives (TBD, descriptive match references, or team names)
   - Test fails on current implementation, passes after fix
5. Run via `npm test` — all tests green
6. Build/lint/check:data-integrity green
7. Live-verified: https://rankings123.com/world-cup/knockout shows no "Winner M74" style text
