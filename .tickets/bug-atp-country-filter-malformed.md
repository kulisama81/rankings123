---
id: bug-atp-country-filter-malformed
status: closed
deps: []
links: []
created: 2026-07-24T18:30:00Z
type: bug
priority: 2
parent: rankings123
tags: [bug, atp, ui, data]
---
# ATP Live: Country filter dropdown contains malformed "???" codes

**URL:** https://rankings123.com/atp-live

**Severity:** P2 (Medium) — Data quality / UX issue

**Description:**
The country filter dropdown on the ATP Live rankings page contains malformed country codes displayed as "???" in the selection menu. This suggests incomplete or corrupted localization/country data being passed to the filter component.

**Reproduction Steps:**
1. Visit https://rankings123.com/atp-live
2. Locate the "All countries" dropdown filter
3. Click to open the dropdown menu
4. Observe "???" entries in the country code list

**Expected Behavior:**
- All country codes should display as valid 3-letter ISO codes (e.g., "USA", "ESP", "SRB")
- OR display full country names (e.g., "United States", "Spain", "Serbia")
- No placeholder or malformed "???" entries

**Actual Behavior:**
- Dropdown contains "???" codes indicating missing/corrupted country data
- Users cannot reliably filter by country when codes are malformed

**Impact:**
- Damages data quality perception
- Filter functionality appears broken or incomplete
- Professional/polished experience degraded

**Possible Root Causes:**
1. Player data missing country codes in the feed (`src/lib/liveFeed.ts` or `src/lib/atpDeepFeed.ts`)
2. Country code normalization logic failing for certain codes
3. Fallback value "???" being used when country data is undefined/null
4. Incomplete country code mapping table

## Acceptance Criteria

1. Investigate country code data flow:
   - Check `src/lib/liveFeed.ts` and `src/lib/atpDeepFeed.ts` for country code extraction
   - Verify ESPN API returns valid country codes for all players
   - Check any country code normalization/mapping logic
   - Identify which players have "???" codes (log them during feed fetch)

2. Fix the root cause:
   - **Option A:** If ESPN data is missing codes, add fallback to lookup by player name
   - **Option B:** If normalization is failing, fix the mapping logic
   - **Option C:** If certain country codes are unknown, maintain a fallback map of IOC→ISO codes
   - Ensure NO player shows "???" in production

3. **REGRESSION TEST REQUIRED** (per CLAUDE.md):
   - Add test in `tests/country-codes.test.mjs` (run via `npm test`):
     - Fetch ATP live ranking data
     - Verify every player has a non-empty country code
     - Verify no country codes are "???", null, undefined, or empty string
     - Test should FAIL with current data (finds "???"), PASS when fixed
   - OR add invariant to `scripts/check-data-sanity.mjs`:
     - For ATP/WTA feeds, check all players have valid country codes
     - Fail if any player.country is "???", null, or undefined

4. Verify the fix locally:
   - Run `npm run dev`
   - Visit http://localhost:3000/atp-live
   - Open country filter dropdown
   - Verify all entries show valid country codes (no "???")
   - Test filtering by country works correctly
   - `npm run build` — succeeds
   - `npm test` — regression test passes
   - `npx eslint src --max-warnings=0` — clean
   - `npm run check:data-sanity` — passes

5. Live verification after deploy:
   - Visit https://rankings123.com/atp-live
   - Check country filter dropdown: no "???" codes
   - Test filter functionality: selecting a country shows correct players
   - Verify Vercel build succeeded
   - Spot-check a few players in the table have valid country codes displayed

6. Apply same fix to WTA if affected:
   - Check https://rankings123.com/wta-live country filter
   - Ensure WTA feed also has valid country codes
   - No "???" codes on WTA page either
