---
id: bug-wc-fifa-codes-missing
status: open
deps: []
links: []
created: 2026-08-19T00:00:00Z
type: bug
priority: 2
parent: rankings123
tags: [bug, worldcup, ui, flags, visual]
---
# World Cup: 8 FIFA country codes missing mappings, showing emoji fallback flags

**URL:** https://rankings123.com/world-cup

**Severity:** P2 - Visual bug affecting 8 countries

**Type:** Visual bug - flag rendering issue

**Description:**
Eight FIFA country codes are missing from the `SOCCER_TO_ISO2` mapping in `src/lib/worldCupFlags.ts`, causing the FlagIcon component to show emoji fallback flags (🏳️) instead of proper SVG flags on the World Cup page.

**Affected countries:**
- Scotland (SCO)
- Haiti (HAI)
- Iceland (ISL)
- Costa Rica (CRC)
- Nigeria (NGA)
- England (ENG)
- Cameroon (CMR)
- Uganda (UGA)

**Root cause:**
The `soccerFlag()` function in `worldCupFlags.ts` tries to map FIFA 3-letter codes to ISO2 codes. When a mapping doesn't exist, it returns the 3-letter code unchanged. The FlagIcon component then tries to convert it to ISO2, fails (because it's still 3 letters), and shows the 🏳️ emoji fallback.

**Reproduction:**
1. Visit https://rankings123.com/world-cup
2. Look for teams: Scotland, Haiti, Iceland, Costa Rica, Nigeria, England, Cameroon, Uganda
3. Observe 🏳️ white flag emoji instead of proper country flag SVG

**Expected:**
All country flags render as SVG using FlagIcon component (e.g., `/flags/sco.svg` for Scotland)

**Actual:**
Missing mappings cause FlagIcon to show 🏳️ emoji fallback

**Impact:**
- Visual inconsistency - some flags are SVG, others are emoji
- Less premium appearance
- Potential rendering issues across browsers/fonts
- Affects user experience on World Cup pages

**Inspector found:** 2026-08-19 live site inspection

## Acceptance Criteria

1. **Add missing FIFA → ISO2 mappings:**
   - Update `SOCCER_TO_ISO2` in `src/lib/worldCupFlags.ts` with mappings for:
     - SCO: "GB-SCT" or handle as special case (Scotland uses GB in ISO but FIFA treats separately)
     - HAI: "HT"
     - ISL: "IS"
     - CRC: "CR"
     - NGA: "NG"
     - ENG: "GB-ENG" or handle as special case (England uses GB in ISO but FIFA treats separately)
     - CMR: "CM"
     - UGA: "UG"
   - Note: Scotland and England are special cases - they're part of GB in ISO 3166-1 but have separate FIFA codes. Choose the appropriate ISO2 code or add special handling.

2. **Verify SVG flags exist:**
   - Ensure `/public/flags/{iso2}.svg` exists for each mapped code
   - If Scotland/England need special codes, verify those SVG files exist

3. **Regression test:**
   - Add test in `tests/flag-mappings.test.mjs` (create if doesn't exist)
   - Test that `soccerFlag()` returns valid 2-letter ISO codes for all 8 FIFA codes
   - Run via `npm test`
   - Test should FAIL on current code (returns 3-letter codes)
   - Test should PASS after fix (returns 2-letter ISO codes)

4. **Local verification:**
   - Run `npm run build` - succeeds
   - Visit http://localhost:3000/world-cup
   - Verify all 8 countries show SVG flags (not 🏳️ emoji)
   - Check browser DevTools: flag paths use 2-letter codes (e.g., `/flags/ng.svg`)
   - No 404s for flag SVG requests

5. **Live verification after deploy:**
   - Visit https://rankings123.com/world-cup
   - Verify Vercel build succeeded
   - Check all 8 affected countries show proper SVG flags
   - Screenshot for report
