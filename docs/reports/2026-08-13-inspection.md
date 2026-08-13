# Inspector Run — 2026-08-13

**Agent:** inspector (QA bug-hunter)  
**Run Time:** 2026-08-13 ~18:00 UTC  
**Routes Checked:** Homepage, /atp-live, /wta-live, /world-cup, /cycling, /privacy  
**Method:** Playwright browser automation (webapp-testing skill)

---

## Summary

**Bugs Found:** 1 NEW bug filed  
**Existing Bugs Confirmed:** 5 bugs still present  
**Automated Checks:** ✅ All passed (core-features, data-sanity)

---

## Routes Inspected

| Route | Status | Data | Console Errors | Visual Issues |
|-------|--------|------|----------------|---------------|
| `/` (Homepage) | ✅ 200 | Mixed (WC data in tennis preview) | ❌ 8× 404 errors | ⚠️ Branding typo in nav |
| `/atp-live` | ✅ 200 | ✅ Displaying rankings | ✅ Clean | ⚠️ Source attribution missing |
| `/wta-live` | ✅ 200 | ✅ Displaying rankings | ✅ Clean | ✅ Good |
| `/world-cup` | ✅ 200 | ⚠️ TBD placeholders | ✅ Clean | ⚠️ Bracket incomplete |
| `/cycling` | ✅ 200 | ⚠️ "undefined" text | ✅ Clean | ⚠️ Stage data missing |
| `/privacy` | ✅ 200 | ✅ Content present | ✅ Clean | ⚠️ Branding typo in nav |

---

## New Bugs Filed

### 1. Homepage API 404 Errors (bug-homepage-api-404-tennis) — P2

**Issue:** Homepage making repeated failed API calls to `/api/atp-live` and `/api/wta-live` (8 total 404 errors with retries).

**Impact:**
- Console pollution with error messages
- Unnecessary network traffic
- Likely contributing to the live preview data issue

**Regression Test Required:** Add `tests/homepage-api-endpoints.test.mjs` to verify API endpoints return 200 or calls are removed.

**Related:** Likely root cause of `bug-homepage-live-preview-empty`.

---

## Existing Bugs Confirmed (Still Present)

All previously filed bugs remain reproducible:

### 1. bug-homepage-live-preview-empty — P2
**Status:** ⚠️ **EVOLVED** — No longer "empty", now showing **wrong data**  
**Current Behavior:** Live Rankings Preview displays World Cup "Golden Boot" scorers (Mbappe 18 goals, Messi 8 goals) instead of ATP/WTA tennis rankings.  
**Note:** The underlying issue persists but manifests differently than originally reported. The preview should show tennis data, not football.

### 2. bug-privacy-branding-typo — P2
**Status:** ✅ Confirmed, **appears site-wide**  
**Location:** Navigation link text shows "RANKINGS23R23" instead of "Rankings123"  
**Scope:** Found on homepage navigation AND privacy page (broader than ticket describes).  
**Note:** Footer branding is correct ("© 2026 Rankings123 · Live sports rankings").

### 3. bug-atp-source-attribution-missing — P3
**Status:** ✅ Confirmed  
**Location:** ATP Live page lacks data source attribution (no "Source: ESPN/UTS" indicator).

### 4. bug-wc-bracket-tbd-complete-tournament — P2
**Status:** ✅ Confirmed  
**Location:** World Cup knockout bracket contains 44 "TBD" placeholders despite tournament being complete.

### 5. bug-cycling-stage-undefined — P2
**Status:** ✅ Confirmed  
**Location:** Cycling page shows "undefined" text in stage data (OVERALL, SPRINTER, WINNER columns all say "undefined").

### 6. bug-atp-inplay-count-regression — P2
**Status:** ⚠️ **Flagged by data-sanity check**  
**Data-sanity output:** "27 players 'in play' but only 4 show point changes (Δ≠0)"  
**Note:** Automated check caught this; did not visually verify in browser during this run.

---

## Automated Checks

### ✅ check:core-features — PASSED
All 5 protected features present:
- WC knockout bracket (R32 matchups) ✅
- WC group standings ✅
- ATP live ranking + pagination ✅
- WTA live ranking ✅
- Home multi-sport ✅

### ✅ check:data-sanity — PASSED (with warnings)
All per-sport invariants hold. Warnings:
- ATP served from mock fallback (live feed unavailable)
- ATP in-play count mismatch (27 players marked vs 4 with Δ)
- Cycling served from mock fallback (live feed unavailable)

**Note:** Mock fallbacks are expected behavior (graceful degradation per CLAUDE.md). The ATP in-play discrepancy is already filed as a separate bug.

---

## Screenshots Captured

Browser automation saved full-page screenshots for visual reference:
- `/tmp/homepage-inspection.png` — Homepage with live preview (showing WC data)
- `/tmp/atp-live-inspection.png` — ATP Live rankings page
- `/tmp/wta-live-inspection.png` — WTA Live rankings page
- `/tmp/worldcup-inspection.png` — World Cup page with TBD placeholders
- `/tmp/cycling-inspection.png` — Cycling page with "undefined" text
- `/tmp/privacy-inspection.png` — Privacy page

---

## Clean Areas (No Issues Found)

- ✅ ATP Live and WTA Live pages render data correctly
- ✅ Navigation links all resolve (no broken internal links on checked pages)
- ✅ No horizontal overflow or layout breaks observed
- ✅ Page load performance acceptable (all routes loaded in <5s)
- ✅ Core features check passed (no protected features removed)

---

## Deduplication

Before filing, checked existing open tickets to avoid duplicates:
- `bug-homepage-live-preview-empty` exists → noted evolution, did NOT file duplicate
- `bug-privacy-branding-typo` exists → confirmed broader scope, did NOT file duplicate
- `bug-atp-source-attribution-missing` exists → confirmed, no action
- `bug-wc-bracket-tbd-complete-tournament` exists → confirmed, no action
- `bug-cycling-stage-undefined` exists → confirmed, no action
- `bug-atp-inplay-count-regression` exists → confirmed via data-sanity, no action
- `bug-wc-match-detail-404` exists but NOT tested this run (no match links found)

**New bug filed:** `bug-homepage-api-404-tennis` (API 404 errors) — no existing ticket for this issue.

---

## Next Steps (for planner)

**High Priority:**
1. Fix `bug-homepage-api-404-tennis` (P2) — repeated API failures, likely root cause of preview issue
2. Investigate `bug-homepage-live-preview-empty` evolution — now shows wrong data (WC instead of tennis)
3. Fix `bug-wc-bracket-tbd-complete-tournament` (P2) — tournament complete, remove placeholders

**Medium Priority:**
4. Fix `bug-cycling-stage-undefined` (P2) — "undefined" text is poor UX
5. Update `bug-privacy-branding-typo` scope → site-wide navigation issue
6. Add source attribution to ATP Live page (P3)

---

## Inspector Notes

- All bugs filed with **regression test requirements** per CLAUDE.md
- Used webapp-testing skill (Playwright) for rendered/visual QA
- Respected ~30min budget
- No app code changes — only `.tickets/` and `docs/` touched
- Ready to commit + push
