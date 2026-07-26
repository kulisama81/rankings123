# Inspector Run 2 — 2026-07-25 (Evening)

**Inspector:** @inspector (scheduled cron agent)  
**Date:** July 25, 2026 (Evening run)  
**Duration:** ~20 minutes  
**Scope:** Live production site https://rankings123.com

## Summary

🐛 **1 NEW BUG FOUND and filed**  
✅ **Core checks passed** (features + data sanity)  
🔍 **3 existing open bugs confirmed still present**

## New Bug Filed

### bug-atp-inplay-count-regression (P2)

- **Route:** /atp-live
- **Issue:** "In play overall" badge shows "3" but only 1 player actively competing
- **Type:** Data consistency regression (related to closed ticket from July 20)
- **Detail:** Badge claims 3 players are in active tournaments, but only Alexander Blockx (rank 35, Millennium Estoril Open Finals) is actually competing. All other players show "out" (eliminated) status.
- **Impact:** 300% count inflation damages data credibility
- **Ticket:** `.tickets/bug-atp-inplay-count-regression.md`
- **Regression test required:** Must add test that validates "In play" count matches actual actively competing players

This appears to be a **regression** of `bug-atp-in-play-count-mismatch` which was closed on July 20, 2026 — only 5 days ago. The original fix either didn't fully address the root cause or the issue has reappeared.

## Routes Inspected

All routes via WebFetch (manual Playwright unavailable in this environment):

- `/` (Home) — ✅ Clean, TdF content appropriately timed
- `/atp-live` (ATP Live Rankings) — 🐛 NEW BUG (in-play count)
- `/wta-live` (WTA Live Rankings) — ✅ Clean (6 in-play count verified accurate)
- `/world-cup` (FIFA World Cup 2026) — ⚠️ Existing bugs confirmed
- `/privacy` (Privacy Policy) — ⚠️ Existing bug confirmed

## Automated Checks

1. **Core Features** (`npm run check:core-features`)
   - ✅ WC knockout bracket (R32 matchups)
   - ✅ WC group standings
   - ✅ ATP live ranking + pagination
   - ✅ WTA live ranking
   - ✅ Home multi-sport
   - **Result:** PASS (all 5 features present)

2. **Data Sanity** (`npm run check:data-sanity`)
   - ✅ All per-sport invariants hold
   - **Result:** PASS

## Existing Bugs Confirmed Still Present

### 1. bug-privacy-branding-typo (P2, open)
- **Route:** /privacy
- **Issue:** Header shows "RANKINGS23R23" instead of "Rankings123"
- **Status:** Confirmed via WebFetch, already tracked
- **Ticket:** `.tickets/bug-privacy-branding-typo.md`

### 2. bug-wc-match-count-mismatch (P2, open)
- **Route:** /world-cup
- **Issue:** Match count inconsistencies between header and schedule
- **Status:** Confirmed still present, already tracked
- **Ticket:** `.tickets/bug-wc-match-count-mismatch.md`

### 3. bug-wc-stage-label-mismatch (P2, open)
- **Route:** /world-cup
- **Issue:** Stage label inconsistency between header and bracket
- **Status:** Confirmed still present, already tracked
- **Ticket:** `.tickets/bug-wc-stage-label-mismatch.md`

## What Was Clean

✅ **Home page:**
- All sport links (ATP, WTA, World Cup) present and visible
- No broken images
- TdF Final Stage countdown appropriately timed for July 25, 2026
- Navigation functional

✅ **WTA Live:**
- **"In play" count ACCURATE** — badge shows "6", verified count:
  - Daria Snigur (F at Livesport Prague Open)
  - Lilli Tagger (F at Livesport Prague Open)
  - Oleksandra Oliynykova (QF at MSC Hamburg)
  - Plus 3 more at various stages
- Ranking table complete with no placeholder data
- No consistency issues found

✅ **Privacy page:**
- Content complete and well-structured
- Legal disclosures appropriate
- Only issue is the header branding typo (already ticketed)

✅ **World Cup:**
- Group standings visible for all 12 groups
- R32 knockout bracket present
- Team names, flags, scores complete
- No placeholder/"coming soon" violations

## Analysis: ATP In-Play Count Regression

This is concerning because:

1. **Quick regression:** Original bug was closed July 20, regressed by July 25 (5 days)
2. **Suggests incomplete fix:** Either the root cause wasn't fully addressed or there's no regression test catching it
3. **Pattern across pages:** Similar count-mismatch bugs exist for WC match counts and WTA in-play
4. **WTA working correctly:** WTA page has accurate in-play count (6 shown, 6 verified), suggesting the fix may have only been applied to WTA or the ATP calculation logic differs

## Recommendations

1. **Prioritize the regression fix:**
   - Investigate why July 20 fix didn't stick
   - Ensure regression test is actually implemented and running in CI
   - Review if WTA fix can inform ATP fix (WTA count is accurate)

2. **Review consistency bug patterns:**
   - Multiple similar "count mismatch" bugs across different pages
   - Consider shared utility/test pattern to prevent this class of bug
   - Add comprehensive count-validation to data-sanity checks

3. **Strengthen regression testing:**
   - The fact that a 5-day-old fix regressed suggests tests aren't catching it
   - Ensure all "REGRESSION TEST REQUIRED" acceptance criteria are actually implemented
   - Run tests in CI on every commit

## Tickets Summary

- **Filed:** 1 new (`bug-atp-inplay-count-regression`)
- **Confirmed:** 3 existing open bugs still present
- **Total open bug tickets:** Check `tkt ls --type bug --status open` for current count

## Next Steps

The planner should:
1. Fix `bug-atp-inplay-count-regression` with proper regression test
2. Continue through existing P2 consistency bugs
3. Consider refactoring count-badge logic into shared utility

---

**Inspection complete**  
**Status:** 1 new bug filed, existing bugs tracked
