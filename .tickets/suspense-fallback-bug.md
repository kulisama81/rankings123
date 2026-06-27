---
id: suspense-fallback-bug
status: open
deps: []
links: []
created: 2026-06-27T05:05:35Z
type: bug
priority: 2
parent: rankings123
tags: [bug, ui, atp, wta]
---
# ATP/WTA Live: Suspense fallback 'Loading table...' renders with loaded content

## Bug Report

**URLs Affected:**
- https://rankings123.com/atp-live
- https://rankings123.com/wta-live

**Severity:** Medium (p2) - Visual/UX bug, doesn't break functionality but looks broken to users

**Type:** UI/Consistency bug

**Description:**
The text "Loading table..." from the Suspense fallback is visible on the live production pages even though the ranking tables have fully loaded with 50 players displayed. This makes it appear as if the page is still loading or broken, creating a poor user experience.

On the ATP Live page, there's also duplicate data rendering where the same ranking data appears twice in different formats.

**Reproduction Steps:**
1. Visit https://rankings123.com/atp-live
2. Wait for page to fully load
3. Observe the "Loading table..." text appears immediately after the hero banner stats
4. Scroll down and note the ranking table has fully loaded with 50 players
5. On ATP page specifically, note the data appears in both table and list format (duplicate rendering)

Repeat for https://rankings123.com/wta-live (same issue except no duplicate rendering).

**Expected Behavior:**
- No "Loading table..." text should be visible once the table has loaded
- Only one instance of the ranking data should render (not duplicated)
- The Suspense fallback should only show during initial load, not after content renders

**Actual Behavior:**
- "Loading table..." text persists after table loads
- Text appears in context: "🇮🇹 Jannik Sinner Live #1 13,460 Points 120 In play 1000 Ranked **Loading table...**" (ATP)
- Text appears in context: "🇧🇾 Aryna Sabalenka / Live #1 / 9,090 Points / 9 In play / 100 Ranked / **Loading table...**" (WTA)
- ATP page renders ranking data twice (table format + condensed list format)

**Root Cause:**
Located in `src/components/LiveRankingView.tsx:34`:
```tsx
<Suspense fallback={<div className="text-center text-muted">Loading table...</div>}>
  <LiveRankingTable tour={tour} initialSnapshot={snapshot} />
</Suspense>
```

The Suspense fallback is rendering alongside the loaded content instead of being replaced by it. This suggests either:
1. The LiveRankingTable component is still in a suspended state
2. Both the fallback and children are rendering (React Suspense boundary bug)
3. The component isn't properly resolving the Suspense condition

## Acceptance Criteria

1. Visit https://rankings123.com/atp-live - NO "Loading table..." text visible anywhere on the page when table has loaded
2. Visit https://rankings123.com/wta-live - NO "Loading table..." text visible anywhere on the page when table has loaded
3. ATP Live page renders ranking data only once (no duplicate table/list rendering)
4. **REGRESSION TEST REQUIRED** (per CLAUDE.md - all bug fixes must ship with a test):
   - Add test in `tests/suspense-fallback.test.js` (run via `npm test`)
   - Test must verify:
     - Render LiveRankingView component with snapshot data
     - Assert "Loading table..." text does NOT appear in rendered output
     - Assert ranking table renders with player data
     - Test should FAIL on current code, PASS when fixed
5. Run `npm test` — all tests green
6. Run `npm run build` — succeeds
7. Run `npx eslint src --max-warnings=0` — clean
8. Verify on LIVE production after deploy:
   - ATP Live: no "Loading table..." text, single data rendering
   - WTA Live: no "Loading table..." text
9. Commit includes the regression test

## Related Tickets

This may be related to the previously fixed `atp-table-regression` and `wta-table-regression` tickets, though those focused on the table not loading at all, whereas this is about the fallback text persisting after successful load.
