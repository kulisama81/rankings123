# Rankings123 Live Site Inspection Report
**Date:** 2026-08-12 (Afternoon Run)  
**Inspector:** @inspector (automated cron)  
**Scope:** Live production site https://rankings123.com

## Summary

Inspected key routes across the site. **4 new bugs found and ticketed**, plus 2 existing open bugs confirmed still present.

- ✅ Core features check: PASSED (all 5 protected features present)
- ✅ Data sanity check: PASSED (warnings on mock fallbacks, expected)
- 🐛 4 NEW bugs filed
- ⚠️ 2 existing bugs still open

---

## Routes Inspected

| Route | Status | Issues Found |
|-------|--------|--------------|
| `/` (Homepage) | 200 ✓ | Live preview empty (new bug) |
| `/atp-live` | 200 ✓ | Source attribution missing, in-play count mismatch (existing) |
| `/wta-live` | 200 ✓ | Clean ✓ |
| `/world-cup` | 200 ✓ | TBD placeholders in bracket (existing) |
| `/world-cup/match/401631699` | **404 ✗** | Match detail route broken (new bug) |
| `/cycling` | 200 ✓ | "Stage undefined" placeholder (new bug) |
| `/privacy` | 200 ✓ | Clean ✓ |

---

## New Bugs Filed (4)

### 1. **bug-homepage-live-preview-empty** (P2)
- **Issue:** Homepage "Live Rankings Preview" section shows only headers/links, no actual player data
- **Impact:** Feature shipped incomplete; defeats bounce-rate reduction goal
- **Repro:** Visit homepage → "Live Rankings Preview" displays zero player names/ranks/points
- **Ticket:** `.tickets/bug-homepage-live-preview-empty.md`

### 2. **bug-atp-source-attribution-missing** (P3)
- **Issue:** ATP Live page missing "Data via ESPN/UTS" attribution (WTA & World Cup show it)
- **Impact:** Consistency bug; missing credit to data providers
- **Repro:** ATP page footer shows no source attribution vs WTA "Data via ESPN" ✓
- **Ticket:** `.tickets/bug-atp-source-attribution-missing.md`

### 3. **bug-cycling-stage-undefined** (P2)
- **Issue:** Cycling page displays "Stage undefined in progress" + "preview data" placeholders
- **Impact:** CX-FIRST violation; broken placeholder text visible to users
- **Repro:** Visit /cycling → see "undefined", "Leader will be determined", "preview data" text
- **Ticket:** `.tickets/bug-cycling-stage-undefined.md`

### 4. **bug-wc-match-detail-404** (P1)
- **Issue:** World Cup match detail URLs return HTTP 404 (route not implemented or broken)
- **Impact:** Broken internal links if used anywhere; missing functionality
- **Repro:** Visit /world-cup/match/401631699 → 404 Not Found
- **Ticket:** `.tickets/bug-wc-match-detail-404.md`

---

## Existing Open Bugs (Still Present)

### 5. **bug-atp-inplay-count-regression** (P2) - CONFIRMED
- ATP Live shows "27 In play overall" but only 4 players show Δ≠0 (point changes)
- Consistency bug: badge count doesn't match visible active players
- Ticket already exists, still reproducible

### 6. **bug-wc-bracket-tbd-complete-tournament** (P2) - CONFIRMED
- World Cup knockout bracket shows "🏆TBD" in Quarterfinals/Semifinals/Final despite tournament complete
- Top of page shows final result (Argentina 3-1 Switzerland) but bracket shows placeholders
- Ticket already exists, still reproducible

---

## Clean Pages ✓

- `/wta-live` — Proper attribution, data rendering correctly
- `/world-cup` — Core features (R32 bracket, group standings) present; only TBD issue noted
- `/privacy` — Complete, properly formatted

---

## Automated Checks

### Core Features (✅ PASSED)
```
✓ WC knockout bracket (R32 matchups)
✓ WC group standings
✓ ATP live ranking + pagination
✓ WTA live ranking
✓ Home multi-sport
```
All 5 protected features confirmed present.

### Data Sanity (✅ PASSED with warnings)
```
⚠ [atp] served from mock fallback (live feed unavailable)
⚠ [atp] 27 players "in play" but only 4 show point changes (Δ≠0)
⚠ [cycling] served from mock fallback (live feed unavailable)
```
Warnings expected (mock fallbacks allowed per CLAUDE.md). The ATP in-play discrepancy is already ticketed.

---

## Recommendations

1. **High Priority:** Fix `bug-wc-match-detail-404` (P1) — 404s hurt UX and SEO
2. **Medium Priority:** Populate homepage live preview (P2) — feature incomplete, affects bounce goal
3. **Medium Priority:** Fix cycling "undefined" placeholder (P2) — looks broken to users
4. **Low Priority:** Add ATP source attribution (P3) — consistency polish

---

## Notes

- Recent deploys (homepage preview, cycling nav fix) introduced or surfaced new issues
- World Cup tournament ended July 19; TBD placeholders in bracket should be backfilled
- Cycling page appears to have incomplete live data integration (mock fallback + "undefined" stage)

**Total inspection time:** ~25 minutes  
**Next inspection:** Scheduled per cron (evening run)
