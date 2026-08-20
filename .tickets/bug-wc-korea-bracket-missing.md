---
id: bug-wc-korea-bracket-missing
status: closed
deps: []
links: []
created: 2026-08-19T00:00:00Z
type: bug
priority: 1
parent: rankings123
tags: [bug, worldcup, data, integrity]
---
# World Cup mock data: South Korea marked "advanced" in Group A but missing from R32 bracket

**URL:** https://rankings123.com/world-cup

**Severity:** P1 - Data integrity bug

**Type:** Data integrity - inconsistent mock data between groups and bracket

**Description:**
The World Cup mock data shows South Korea (KOR) in Group A with W:1 D:0 L:0 (3 points) marked as "advanced", but South Korea does NOT appear anywhere in the Round of 32 bracket. This violates tournament structure integrity - all "advanced" teams must appear in the knockout bracket.

**Reproduction:**
1. Visit https://rankings123.com/world-cup (while using mock fallback data)
2. Check Group A standings - South Korea is listed with "advanced" outlook
3. Check Round of 32 bracket - South Korea is completely absent
4. API verification: `curl https://rankings123.com/api/worldcup/live | jq '.groups[0].teams[] | select(.code=="KOR")'` shows South Korea with `outlook: "advanced"`
5. `curl https://rankings123.com/api/worldcup/bracket` - no "KOR" anywhere in bracket stages

**Expected:**
Mock data is internally consistent:
- If South Korea is marked "advanced" in groups, they MUST appear in the bracket
- OR if South Korea shouldn't be in bracket, they should be marked "out" or "alive" in groups

**Actual:**
- Group A: South Korea shows as "advanced" (top 2 finisher)
- R32 bracket: South Korea completely missing
- Impossible tournament state

**Impact:**
- Data integrity violation - shows structurally impossible tournament
- User confusion - where did South Korea go?
- Similar to bug-wc-italy-bracket-group-mismatch (recently fixed for Italy, now recurring for South Korea)
- Suggests groups and bracket mock data are still not fully synchronized

**Root cause hypothesis:**
The mock data in `src/data/worldCup.ts` has inconsistent groups vs bracket. Recent fix (commit 7d672ce) addressed Italy but didn't catch South Korea.

**Inspector found:** 2026-08-19 live site inspection

## Acceptance Criteria

1. **Fix the mock data consistency:**
   - Review `src/data/worldCup.ts` groups and bracket mock data
   - Option A: Add South Korea to the R32 bracket (if they should advance from Group A)
   - Option B: Change South Korea's outlook from "advanced" to "out" in Group A (if they shouldn't be in bracket)
   - Ensure Mexico (the other advancing team from Group A) is correctly placed in bracket
   - Verify all 12 groups: every team marked "advanced" appears in bracket

2. **Enhance data-sanity check (bidirectional):**
   - Current check in `scripts/check-data-sanity.mjs` (lines 271-291) only verifies: "all bracket teams must be in groups"
   - Add reverse check: "all 'advanced' teams from groups must appear in bracket"
   - Collect all teams with `outlook === "advanced"` from groups
   - Verify each appears in at least one bracket stage
   - Test should FAIL on current mock data (South Korea advanced but not in bracket)
   - Test should PASS after fix

3. **Local verification:**
   - Run `npm run check:data-sanity` - MUST pass (both directions)
   - Visit http://localhost:3000/world-cup
   - If South Korea in bracket: verify they appear in correct R32 match with proper seeding
   - If South Korea not in bracket: verify Group A shows them as "out" or "alive"
   - Cross-check: all "advanced" teams in groups appear in brackets
   - `npm run build` - succeeds

4. **Live verification after deploy:**
   - Visit https://rankings123.com/world-cup
   - Verify Vercel build succeeded
   - Run `npm run check:data-sanity` against production
   - Manually verify: Group A standings match R32 bracket participants
   - Screenshot group + bracket for report
