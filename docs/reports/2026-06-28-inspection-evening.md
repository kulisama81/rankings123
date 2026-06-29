# Inspector Report — 2026-06-28 Evening

## ⚠️ CRITICAL REGRESSION DETECTED

**Result:** 3 bugs found, **2 are NEW REGRESSIONS** since this morning's inspection (11:06)

Comprehensive inspection of rankings123.com production site. The ATP and WTA Live pages that were **working correctly this morning (showing 1-50 of 1000 players with pagination)** are now **broken** — showing only 1 player each.

## Summary
Inspected live production site https://rankings123.com across all major routes (homepage, ATP Live, WTA Live, World Cup, match/team pages, privacy). Found **3 confirmed bugs**:
- **2 are NEW REGRESSIONS** (ATP/WTA table display — worked at 11:06, broken now)
- **1 is a pre-existing CX violation** (World Cup demo labels)

## Routes Checked
- ✅ `/` — Homepage: Clean, no issues
- ❌ `/atp-live` — **REGRESSION**: Table now shows only 1 player (was 1-50 at 11:06)
- ❌ `/wta-live` — **REGRESSION**: Table now shows only 1 player (was 1-50 at 11:06)
- ✅ `/world-cup` — Working correctly (groups + R32 bracket present)
- ❌ `/world-cup/match/401635294` — **BUG**: Shows "Demo data" placeholder labels
- ✅ `/world-cup/team/ARG` — Clean, team page working
- ✅ `/privacy` — Loads correctly

## Automated Checks
- ✅ **Core features check** (`npm run check:core-features`): PASS — All 5 core features present
- ✅ **Data sanity check** (`npm run check:data-sanity`): PASS — All invariants hold

## Bugs Filed

### 1. **atp-live-table-truncated** (P0 — bug, atp, ui) ⚠️ REGRESSION
**URL:** https://rankings123.com/atp-live

**Issue:** ATP Live page only displays 1 player (Jannik Sinner #1) instead of the full rankings table. No pagination controls visible.

**Regression details:**
- **Morning inspection (11:06):** ✅ Working — showed "1-50 of 1,000 players" with "Page 1/20" pagination
- **Evening inspection (now):** ❌ Broken — shows only 1 player, no pagination

**Impact:** Core tennis feature is broken. This is a **critical regression** — the page was functional earlier today.

**Regression test required:** Verify table has > 1 row of data (via `npm test`).

---

### 2. **wta-live-table-truncated** (P0 — bug, wta, ui) ⚠️ REGRESSION
**URL:** https://rankings123.com/wta-live

**Issue:** WTA Live page only displays 1 player (Aryna Sabalenka #1) instead of the full rankings table.

**Regression details:**
- **Morning inspection (11:06):** ✅ Working — showed "1-50 of 100 players" with "Page 1/2" pagination
- **Evening inspection (now):** ❌ Broken — shows only 1 player, no pagination

**Impact:** Core tennis feature is broken. This is a **critical regression** — the page was functional earlier today.

**Regression test required:** Verify table has > 1 row of data (via `npm test`).

---

### 3. **wc-match-demo-labels** (P1 — bug, worldcup, ui, cx)
**URL:** https://rankings123.com/world-cup/match/401635294 (and likely all match pages)

**Issue:** Match pages display "FTDemo data" and "Demo data" placeholder labels, violating the CX-first principle (no placeholder text in production per CLAUDE.md).

**Impact:** Undermines user trust despite functional match data. While the page works, the demo labels make it appear unfinished.

**Regression test required:** Add check in `scripts/check-data-sanity.mjs` that fails if demo/placeholder labels detected on public pages.

---

## What Worked
- Homepage multi-sport content renders correctly
- World Cup group standings and Round of 32 bracket (core feature) both present
- Team pages load with complete data
- Privacy page accessible
- All routes return HTTP 200
- No broken images or horizontal overflow detected
- No "coming soon" text on homepage or main pages (except the match demo labels)

## Regression Analysis

**What changed between 11:06 and now?**

Recent commits since morning inspection:
- c2927bd: "Enforce build-before-push: pre-push hook runs npm run build on code pushes..."
- 7b1a76f: "Add deploy-health monitor: detect FAILED Vercel builds..."
- c55313a: "Fix data-anomaly false positive: filter group-stage matches only"

**Hypothesis:** The ATP/WTA table regression may be related to:
1. A data feed issue (ESPN API changed response format?)
2. A client-side rendering issue (pagination/table rendering broke)
3. A recent code change that affected table display logic

**Recommendation:** The planner should investigate commits c2927bd through 7e373ef (today's range) to identify what broke the table display. This is a **critical production issue** affecting two core features.

## Next Steps
1. **URGENT:** Fix ATP/WTA table regressions immediately (P0)
2. Investigate what changed between 11:06 (working) and now (broken)
3. Fix World Cup demo labels (P1)
4. Add regression tests to prevent this table truncation from recurring

## Notes
- The World Cup knockout bracket showing "TBD" for quarterfinals/semifinals/final is **expected behavior** (these matches haven't been determined yet), not a bug.
- Both ATP and WTA pages claim to show "full ranking" but only render 1 player
- The morning inspection confirmed these pages were working correctly with pagination
- This regression happened during production hours and is affecting live users
