---
id: bug-atp-live-subtitle-misleading
status: open
created: 2026-08-22
priority: 2
parent: rankings123
tags: [bug, atp, consistency, ux]
type: bug
---
# ATP Live: Misleading subtitle claims "full ranking (top 500+)" but only shows top 60

## Acceptance Criteria

1. **Fix the subtitle inconsistency:**
   - Update `weekLabel` in `/atp-live` to reflect actual available data
   - Options:
     - Change subtitle to "ATP Tour — top 60" (honest about limitation)
     - OR implement the API endpoint for on-demand loading (ranks 61-500+) and keep "full ranking" claim
   - Pagination footer "1-50 of 60" should match the subtitle claim

2. **REGRESSION TEST REQUIRED** (per CLAUDE.md):
   - Add test in `tests/atp-subtitle-consistency.test.js`:
     ```js
     // Verify ATP page subtitle matches actual player count
     const { getLiveData } = require('../src/lib/liveFeed');
     const fullSnapshot = await getLiveData("atp");
     const renderedSnapshot = {
       ...fullSnapshot,
       players: fullSnapshot.players.slice(0, 60), // Current limitation
     };
     
     // The subtitle should NOT claim more players than are actually shown
     const claimedCount = parseInt(fullSnapshot.weekLabel.match(/top (\d+)/)?.[1] || '0');
     const actualCount = renderedSnapshot.players.length;
     
     assert(
       claimedCount === 0 || claimedCount <= actualCount,
       `Subtitle claims "top ${claimedCount}" but only ${actualCount} players shown`
     );
     ```
   - Test should FAIL with current code
   - Test should PASS when subtitle reflects reality

3. **Standard checks:**
   - `npm run build` — succeeds
   - `npx eslint src --max-warnings=0` — clean
   - `npm test` — all tests green including new regression test
   - `npm run check:core-features` — passes

4. **Live verification after deploy:**
   - Visit https://rankings123.com/atp-live
   - Verify subtitle accurately reflects player count shown
   - Verify pagination footer matches subtitle (e.g., both say "60" not "500")
   - No user confusion about data availability

## Bug Report

**URL:** https://rankings123.com/atp-live

**Inspection Date:** 2026-08-22

**Severity:** P2 (Consistency / UX) — Not broken, but misleading to users

**Type:** Consistency bug — UI claims one thing, delivers another

## Description

The ATP Live page subtitle (hero banner weekLabel) claims the page shows the "full ranking (top 500)" but the page only renders **60 players** due to a performance optimization. This creates a contradiction:

- **Subtitle:** Claims "full ranking (top 500)" or similar
- **Pagination footer:** Shows "1-50 of 60" (honest about actual data)
- **Actual behavior:** Users can only view top 60 players

This is misleading — users expect access to 500+ players based on the subtitle, but pagination is limited to 60.

## Reproduction Steps

1. Visit https://rankings123.com/atp-live
2. Read the subtitle under "ATP Live Ranking" header
3. Observe it claims "full ranking (top X)" where X > 60
4. Scroll to pagination footer
5. Observe it shows "1-50 of 60"
6. Try to navigate past page 2 — cannot access players 61+

## Expected vs Actual

**Expected (consistent UX):**
- Subtitle: "ATP Tour — top 60" (or similar honest claim)
- Pagination: "1-50 of 60"
- User expectation: Top 60 players available
- **OR** implement API endpoint for on-demand loading and keep "full ranking" claim

**Actual (inconsistent):**
- Subtitle: Claims "full ranking (top 500+)"
- Pagination: "1-50 of 60"
- User sees contradiction, expects 500+ but gets 60

## Root Cause

**File:** `src/app/atp-live/page.tsx` lines 58-67

The page intentionally slices to 60 players for performance (emergency fix for 557KB → 300KB budget):

```typescript
export default async function AtpLivePage() {
  const fullSnapshot = await getLiveData("atp");

  // For SSR payload optimization: send top 60 players (300KB page budget).
  // KNOWN LIMITATION: Ranks 61-500 not accessible client-side.
  const snapshot = {
    ...fullSnapshot,
    players: fullSnapshot.players.slice(0, 60),
  };
  // ...
}
```

However, `snapshot.weekLabel` still comes from `getAtpDeepRankingData()` which returns the full player count in its weekLabel:

**File:** `src/lib/atpDeepRanking.ts` line ~180
```typescript
weekLabel: `ATP Tour — full ranking (top ${players.length})${updated}${...}`
```

So the weekLabel claims "top 500" (or whatever `players.length` is) but the page only shows 60.

## Impact

- **User confusion:** Expect 500+ players, get 60
- **Trust issue:** Contradiction between subtitle and pagination
- **Competitive gap:** live-tennis.eu shows full rankings, we claim "full" but deliver partial

## Context

This limitation was introduced as an emergency fix for the 557KB performance regression (ticket `perf-atp-size-regression-557kb`, now closed). The code comment acknowledges it as a "KNOWN LIMITATION" and calls for a follow-up API endpoint for on-demand loading:

> "KNOWN LIMITATION: Ranks 61-500 not accessible client-side. Follow-up needed: implement client-side API fetch from /api/atp/live for on-demand loading, or virtualization (long-term recommendation)."

The fix addressed performance but didn't update the UI to reflect the new limitation.

## Solution Options

### Option 1: Update subtitle to reflect reality (quick fix)
- Change weekLabel generation to show actual available count
- E.g., "ATP Tour — top 60" instead of "top 500"
- **Pros:** Honest, quick, no misleading claims
- **Cons:** Acknowledges limitation publicly

### Option 2: Implement API endpoint for on-demand loading (complete fix)
- Add `/api/atp/live?ranks=61-500` endpoint
- Implement client-side fetch + pagination for ranks 61+
- Keep "full ranking" claim (now accurate)
- **Pros:** Delivers on the claim, better UX
- **Cons:** More work (~1-2 hours implementation)

### Option 3: Virtualization (best long-term)
- Implement react-window/react-virtual for table rendering
- Load full 500+ players without performance hit
- **Pros:** Best UX, scalable
- **Cons:** Requires refactor of LiveRankingTable (~4-8 hours)

## Recommended Approach

**Short-term (this ticket):** Option 1 — Update subtitle to "top 60" (honest, quick fix)

**Long-term (separate ticket):** Option 2 or 3 — Implement API endpoint or virtualization to actually deliver the "full ranking" claim

## Priority Justification

**P2 (Medium)** — Not broken, but misleading. Users aren't blocked (top 60 is usable), but the contradiction damages trust and creates confusion. Should fix soon but not urgent.
