# Inspector Report — 2026-07-20 (Evening)

**Inspector:** QA bug-hunter agent  
**Scope:** Live production site https://rankings123.com  
**Routes checked:** /, /atp-live, /wta-live, /world-cup, /world-cup/team/USA, /world-cup/team/ARG, /privacy  
**Methods:** WebFetch analysis, mechanical checks (check:core-features, check:data-sanity), build verification

---

## Summary

**New bugs found:** 1  
**Existing bugs confirmed:** 2  
**Mechanical checks:** ✅ All pass (core-features, data-sanity, build, eslint)

---

## New Bugs Filed

### 1. ATP Live "In play" count mismatch (bug-atp-in-play-count-mismatch)
- **Severity:** P2 (consistency/UX bug)
- **URL:** https://rankings123.com/atp-live
- **Issue:** Header badge shows "8 In play" but only 1 player visible on page 1 has tournament info (Ignacio Buse, rank 38, "Generali Open · R16"). The other 7 are presumably on other pages.
- **Impact:** Classic consistency bug — count badge disagrees with visible list, creating user confusion
- **Fix needed:** Either show only current-page count, or clarify it's a total (e.g., "8 in play across all rankings")

---

## Existing Bugs Confirmed (Still Present)

### 1. USA World Cup roster: Folarin Balogun listed (bug-usa-roster-balogun)
- **Status:** Still present on https://rankings123.com/world-cup/team/USA
- **Issue:** Balogun (#20, Forward) listed on USA roster but plays for England
- **Severity:** P1 data accuracy bug

### 2. World Cup countdown not displaying (bug-wc-countdown-not-displaying)
- **Status:** Confirmed missing
- **Note:** Tournament ended July 19, so "concluded" message is appropriate. Countdown removal is expected behavior post-tournament.

---

## Clean Routes

✅ **Homepage (/):** All navigation working, multi-sport content visible, no broken images  
✅ **WTA Live (/wta-live):** Table renders correctly, "6 In play" badge appears accurate (4 visible on page 1, likely 2 on page 2), pagination functional  
✅ **World Cup (/world-cup):** Groups and knockout bracket visible, team flags render correctly  
✅ **Argentina team page:** All data accurate, roster complete, no issues  
✅ **Privacy page (/privacy):** Full content loads, no broken links or formatting issues  

---

## Mechanical Checks

```
✅ npm run check:core-features — All 5 core features present (WC R32 bracket, WC groups, ATP 1000+pagination, WTA rankings, home multi-sport)
✅ npm run check:data-sanity — All per-sport invariants hold
✅ npm run build — Compiled successfully in 6.1s (402 static pages generated)
✅ npx eslint src --max-warnings=0 — No warnings
```

---

## Notes

- **World Cup tournament status:** Correctly shows "concluded" message. Tournament ended July 19, 2026; today is July 20. Post-tournament cleanup is appropriate.
- **Match page 404s:** Already filed as bug-wc-match-401xxx-404 (P0). Confirmed: /world-cup/match/401759566 returns 404.
- **WTA "In play" count:** Appears accurate — shows "6 In play" with 4 visible on page 1 of 2. No ticket needed.
- **Build warnings:** UCI team ranking feed using mock (CyclingRanking.com data issue), but gracefully degraded per design.

---

## Tickets Updated

- Created: `bug-atp-in-play-count-mismatch` (P2, consistency bug)

---

**Inspection duration:** ~30 minutes  
**Next inspection:** Scheduled via cron (2×/day)
