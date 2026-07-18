---
id: wta-romanian-flag-display
status: open
deps: []
links: []
created: 2026-07-18T18:07:15Z
type: bug
priority: 3
parent: rankings123
tags: [bug, wta, visual, data]
---
# WTA rankings show white flag for some Romanian players

**URL:** https://rankings123.com/wta-live

**Repro:**
1. Visit /wta-live
2. Find Sorana Cirstea (rank ~17) or Jaqueline Cristian (rank ~37)
3. Observe flag emoji

**Expected:** Romanian flag emoji 🇷🇴 displayed next to players with country code 'ROM'

**Actual:** White flag emoji 🏳️ displayed for some Romanian players (Cirstea, Cristian) while their country code correctly shows 'ROM'

**Impact:** Visual inconsistency - same country code renders different flag emojis for different players

**Root Cause:** Likely a flag mapping issue in the WTA data feed or flag rendering logic

## Acceptance Criteria

- All players with country code 'ROM' display the Romanian flag 🇷🇴 consistently
- Add a regression test in tests/flag-consistency.test.mjs that verifies all players in ranking data have valid flag emojis matching their country codes (no white flags 🏳️ unless country is explicitly null/unknown)
