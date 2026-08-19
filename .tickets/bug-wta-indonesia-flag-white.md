---
id: bug-wta-indonesia-flag-white
status: open
deps: []
links: []
created: 2026-08-18T00:00:00Z
type: bug
priority: 3
parent: rankings123
tags: [bug, wta, ui, flags, visual]
---
# WTA Live: Indonesia flag renders as white flag emoji for player

**URL:** https://rankings123.com/wta-live

**Severity:** P3 (Visual/cosmetic bug)

**Type:** Visual bug — flag emoji rendering issue

**Description:**
On the WTA Live rankings page, row 37 (Janice Tjen from Indonesia) displays a white flag emoji 🏳️ instead of the Indonesian flag 🇮🇩. All other players show proper country flag emojis.

**Reproduction Steps:**
1. Visit https://rankings123.com/wta-live
2. Navigate to row 37 (Janice Tjen, INA)
3. Observe the flag emoji displayed

**Expected Behavior:**
Janice Tjen (Indonesia/INA) should display the Indonesian flag emoji 🇮🇩 like all other players display their country flags.

**Actual Behavior:**
Shows white flag emoji 🏳️ instead of Indonesia flag.

**Impact:**
- Minor visual inconsistency
- Could be confusing (white flag typically means surrender/neutral)
- Affects one player on WTA rankings page

**Root Cause Hypothesis:**
Likely an issue with:
- Country code mapping (INA vs IDN vs ID)
- Flag emoji generation from country code
- Missing case in flag mapping logic
- Unicode rendering issue specific to Indonesia

**Inspector found:** 2026-08-18 live site inspection

## Acceptance Criteria

1. **Fix the flag rendering:**
   - Janice Tjen (Indonesia, rank 37) displays Indonesian flag 🇮🇩 not white flag 🏳️
   - Verify Indonesia country code mapping (INA → 🇮🇩)
   - Check if other Indonesian players (if any) have same issue
   - Ensure flag mapping works for all WTA country codes

2. **Regression test in tests/wta-flag-rendering.test.mjs:**
   - Fetch WTA Live data via getWTADeepRanking() or API
   - Find Indonesian players (country code INA or similar)
   - Assert their flag property/display is NOT white flag (🏳️) and IS Indonesian flag (🇮🇩 or correct ISO code)
   - OR verify flag generation function maps INA → ID (ISO 3166-1 alpha-2)
   - Test should FAIL on current code (white flag for Indonesia)
   - Test should PASS after fix (Indonesian flag displays correctly)
   - Run via `npm test`

3. **Local verification:**
   - Visit http://localhost:3000/wta-live
   - Find Janice Tjen (or other Indonesian players)
   - Verify Indonesian flag 🇮🇩 displays correctly
   - Check both dark and light themes
   - `npm run build` — succeeds
   - `npm test` — regression test passes

4. **Live verification after deploy:**
   - Visit https://rankings123.com/wta-live
   - Navigate to row 37 (Janice Tjen)
   - Verify Indonesian flag displays correctly (not white flag)
   - Screenshot the row for report
   - Check on mobile viewport as well
