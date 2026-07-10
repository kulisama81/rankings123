---
id: bug-usa-roster-balogun
status: open
deps: []
links: []
created: 2026-07-09T23:00:00Z
type: bug
priority: 1
parent: rankings123
tags: [bug, worldcup, data, roster]
---
# USA World Cup roster incorrectly includes Folarin Balogun (England international)

**URL:** https://rankings123.com/world-cup/team/USA

**Severity:** P1 — Data accuracy violation undermining credibility

**Description:**
The USA World Cup team roster incorrectly lists Folarin Balogun (#20, Forward, age 25) as a squad member. Balogun actually represents England internationally, not the United States. This is a factual error that damages the site's credibility as a reliable sports data source.

**Reproduction Steps:**
1. Visit https://rankings123.com/world-cup/team/USA
2. Scroll to the squad roster section
3. Observe Folarin Balogun listed as #20 Forward
4. Cross-reference: Balogun represents England (verified on England roster page and real-world data)

**Expected Behavior:**
USA roster should only include players who represent the United States men's national team. Folarin Balogun should NOT appear on the USA roster.

**Actual Behavior:**
Folarin Balogun is listed on USA's roster despite being an England international.

**Impact:**
- Factual error damages credibility
- Users may notice and question data accuracy
- Violates "CX FIRST" principle (no fabricated/incorrect data)
- During live World Cup 2026, accuracy is critical for user trust

## Acceptance Criteria

1. Investigate the data source for World Cup team rosters:
   - Check `src/lib/worldCupFeed.ts` or related feed files
   - Determine if this is ESPN API data or mock/fallback data
   - Identify why Balogun appears on USA roster

2. Fix the root cause:
   - If from ESPN API: investigate why ESPN data is incorrect, consider data validation layer
   - If from mock/fallback data: correct the mock roster in `src/data/worldCup.ts`
   - Remove Folarin Balogun from USA roster
   - Verify Balogun appears ONLY on England roster (if at all)

3. **REGRESSION TEST REQUIRED** (per CLAUDE.md):
   - Add data-sanity invariant in `scripts/check-data-sanity.mjs`:
     - For World Cup team rosters, verify no player appears on multiple national teams
     - Optionally: verify known incorrect assignments (e.g., Balogun must not be on USA)
   - Test should FAIL with current data, PASS when fixed
   - Run via `npm run check:data-sanity`

4. Verify the fix:
   - Visit https://rankings123.com/world-cup/team/USA — Balogun not listed
   - Visit https://rankings123.com/world-cup/team/ENG — verify roster accuracy
   - `npm run check:data-sanity` passes

5. Standard checks:
   - `npm run build` — succeeds
   - `npm test` — all tests green
   - `npx eslint src --max-warnings=0` — clean

6. Live verification after deploy:
   - Verify USA roster is accurate on production
   - `npm run check:data-sanity` passes in production
