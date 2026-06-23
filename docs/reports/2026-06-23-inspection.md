# Inspector Report — 2026-06-23

## Summary

Swept live rankings123.com across all key routes. Found **3 bugs** (2 critical, 1 medium).

## Routes Checked

✅ **Passed:**
- `/` — Homepage: clean, no placeholder text, navigation functional
- `/world-cup` — Group standings complete, legend visible, no placeholder text
- `/world-cup/match/401740076` — Match details load (minor note: shows "FTDemo data" label but structure works)
- `/world-cup/team/ARG` — Team page loads with squad, fixtures, standings
- `/changelog` — Changelog page loads with 8 entries, proper structure
- `/privacy` — Page loads (known bug `privacy-url-incomplete` already ticketed)

❌ **Failed:**
- `/atp-live` — **CRITICAL:** Only shows 1 player with "Loading..." text
- `/wta-live` — **CRITICAL:** Only shows 1 player with "Loading..." text  
- `/whats-new` — **404 Not Found** (while `/changelog` works)

## Data Sanity Check

✅ `npm run check:data-sanity` — **PASSED**

## Bugs Filed

### Critical (p0)

1. **`atp-table-loading-failure`** — ATP Live ranking table fails to load
   - Only displays Jannik Sinner #1 with persistent "Loading..." text
   - Page promises "full ranking (top 1000)" but table never loads
   - Core ATP feature is completely non-functional
   - Tagged: `bug`, `atp`, `data`

2. **`wta-table-loading-failure`** — WTA Live ranking table fails to load
   - Only displays Aryna Sabalenka #1 with persistent "Loading..." text
   - Mirrors the same critical issue as ATP Live
   - Core WTA feature is completely non-functional
   - Tagged: `bug`, `wta`, `data`

### Medium (p2)

3. **`whats-new-route-404`** — `/whats-new` route returns 404
   - `/whats-new` 404s while `/changelog` works successfully
   - Routing inconsistency — both routes should resolve or redirect
   - Tagged: `bug`, `routing`, `ui`

## Known Bugs (Already Ticketed)

- `privacy-url-incomplete` (p3) — Google Analytics opt-out URL missing `https://` protocol

## Notes

- **World Cup pages:** Functioning well. Match pages show "FTDemo data" label which indicates test/demo structure, but all content renders correctly.
- **Mobile testing:** Not fully tested due to time constraints, but desktop layouts appear functional.
- **Console errors:** Could not capture browser console errors via WebFetch; would require Playwright for full console error logging.
- **Recent deploys:** ISR caching migration and country filter just shipped (per git log). The ATP/WTA table loading failures may be related to these recent changes.

## Recommendations

1. **Immediate (p0):** Fix ATP/WTA table loading failures — these are core features and completely broken
2. **Next:** Resolve `/whats-new` routing inconsistency
3. **Future:** Add automated E2E tests that verify table data loads (would have caught this regression)

## Test Coverage

All acceptance criteria for filed bugs require **regression tests** (`npm test` under `tests/`) to prevent recurrence.
