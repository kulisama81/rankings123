# Inspector Report — 2026-08-19 (Second Run)

**Run time:** ~19:00 UTC  
**Agent:** inspector (automated via cron)

## Summary

Inspected live production site (rankings123.com) across all major routes. Found **2 confirmed bugs** and filed tickets. Previous flag SVG 404 bug has been fixed.

## Routes Checked
- ✓ `/` (Home)
- ✓ `/atp-live` (ATP Live Rankings)
- ✓ `/wta-live` (WTA Live Rankings)
- ✓ `/world-cup` (World Cup)
- ✓ `/privacy` (Privacy page)

## Automated Checks
- ✓ `npm run check:core-features` — PASSED (all 5 core features present)
- ✓ `npm run check:data-sanity` — PASSED (1 warning: World Cup using mock fallback)

## Bugs Found

### 1. World Cup: 8 FIFA country codes missing mappings → emoji fallback flags
**Ticket:** `bug-wc-fifa-codes-missing`  
**Severity:** P2 (visual)  
**Status:** Filed

**Issue:** Eight countries on the World Cup page show 🏳️ white flag emoji instead of proper SVG flags because their FIFA codes are missing from the `SOCCER_TO_ISO2` mapping in `worldCupFlags.ts`.

**Affected countries:** Scotland, Haiti, Iceland, Costa Rica, Nigeria, England, Cameroon, Uganda

**Root cause:** The flag mapping chain breaks when FIFA codes (SCO, HAI, ISL, CRC, NGA, ENG, CMR, UGA) don't have entries in `SOCCER_TO_ISO2`. The function returns the 3-letter code unchanged, FlagIcon tries to convert it to ISO2, fails, and falls back to emoji.

**Fix required:** Add ISO2 mappings for all 8 FIFA codes. Note: Scotland and England are special cases (FIFA treats them separately but ISO uses GB).

---

### 2. World Cup mock data: South Korea marked "advanced" but missing from R32 bracket
**Ticket:** `bug-wc-korea-bracket-missing`  
**Severity:** P1 (data integrity)  
**Status:** Filed

**Issue:** Group A standings show South Korea (KOR) with W:1 D:0 L:0 marked as "advanced", but South Korea is completely absent from the Round of 32 bracket. This violates tournament structure integrity.

**Verification:**
- API check: `/api/worldcup/live` shows KOR with `outlook: "advanced"` in Group A
- API check: `/api/worldcup/bracket` has no "KOR" in any bracket stage
- Similar to recently-fixed bug-wc-italy-bracket-group-mismatch (commit 7d672ce) but for a different team

**Root cause:** Mock data in `src/data/worldCup.ts` has inconsistent groups vs bracket. Recent Italy fix didn't catch South Korea.

**Fix required:**
1. Either add South Korea to R32 bracket OR mark them as "out" in groups
2. Enhance `check-data-sanity.mjs` to check bidirectionally: not just "bracket teams in groups" but also "advanced teams in bracket"

---

## Clean Areas
- ✅ Home page: All sport navigation links working, no broken images, no placeholder content
- ✅ ATP Live: Ranking table present with 50+ players, pagination working, columns correct (Rank, Player, Age, Live Points, Δ, Next, Max, Official, Tournament)
- ✅ WTA Live: Ranking table present with 50 players, structure mirrors ATP, no missing features
- ✅ Core features: All 5 protected features verified present (WC bracket R32 column, WC groups, ATP live + pagination, WTA live, home multi-sport)
- ✅ Data sanity: All tennis rankings show realistic values, no fabricated data, no duplicate ranks
- ✅ Privacy page: Loads successfully
- ✅ Flag SVG 404 bug from earlier today has been FIXED (commit b07be2c)

## Notes
- World Cup is serving from mock fallback (expected - live feed unavailable)
- Recent commits addressed flag SVG 404s and World Cup data integrity (Italy), but new issues found
- No console errors detected on main routes
- All routes return 200 status codes

## Tickets Filed
1. `bug-wc-fifa-codes-missing` (P2) - 8 FIFA codes missing ISO2 mappings
2. `bug-wc-korea-bracket-missing` (P1) - South Korea group-bracket data mismatch

**Inspector:** automated QA agent  
**Inspection date:** 2026-08-19 (second run)  
**Next inspection:** scheduled via cron (2×/day)
