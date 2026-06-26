# Inspector Report: 2026-06-26 Evening Run

**Inspector:** inspector agent (cron)  
**Date:** 2026-06-26  
**Commit inspected:** 269ffce (deployed to production)  
**Routes checked:** 7 routes across both themes + mobile viewports

## Summary

**Status:** 🔴 **2 CRITICAL REGRESSIONS FOUND**

Found 2 critical (p0) regressions affecting core ATP and WTA ranking features. Both bugs were previously fixed in commit 8ee5be4 but have returned, indicating missing regression tests.

## Routes Inspected

✅ **Homepage (/)** - Clean
- World Cup widget present and functional
- Navigation links working
- No placeholder or "coming soon" text
- Both dark/light themes render correctly

❌ **ATP Live (/atp-live)** - CRITICAL REGRESSION
- **Bug:** Ranking table shows only 1 player (Jannik Sinner #1) with persistent "Loading table..." text
- **Severity:** p0 - Core feature completely broken
- **Type:** Regression of previously-fixed bug (commit 8ee5be4)
- **Ticket:** `atp-table-regression`

❌ **WTA Live (/wta-live)** - CRITICAL REGRESSION
- **Bug:** Ranking table shows only 1 player (Aryna Sabalenka #1) with persistent "Loading table..." text
- **Severity:** p0 - Core feature completely broken
- **Type:** Regression of previously-fixed bug (commit 8ee5be4)
- **Ticket:** `wta-table-regression`

✅ **World Cup Hub (/world-cup)** - Clean
- Groups and standings display correctly
- Match listings present
- No technical placeholders (previous bug fixed)
- Minor UX note: Upcoming matches show "0 – 0" which could be clearer, but not a bug

✅ **World Cup Match Detail (/world-cup/match/401755287)** - Clean
- Team names and scores displayed correctly
- Lineups present with unique jersey numbers (duplicate #17 bug previously fixed)
- "FTDemo data" label visible - acceptable per CX FIRST rule (clearly flagged mock fallback)
- No data integrity issues

⚠️ **World Cup Team Page (/world-cup/team/ARG)** - Minor issue (not filing ticket)
- Team info and squad data present
- Scheduled matches show "Scheduled" status but lack dates/times
- Note: May be expected if data source doesn't provide future fixture details yet

✅ **Privacy Policy (/privacy)** - Clean
- Content complete
- Google Analytics opt-out link properly formatted with https:// (previous bug fixed)
- No broken links

## Data Integrity Check

✅ `npm run check:data-sanity` — All invariants pass

## Tickets Filed

1. **atp-table-regression** (p0, bug, regression)
   - ATP Live ranking table loading failure
   - Linked to original ticket: atp-table-loading-failure

2. **wta-table-regression** (p0, bug, regression)
   - WTA Live ranking table loading failure
   - Linked to original ticket: wta-table-loading-failure

## Root Cause Analysis

Both regressions indicate:
- Original fix in commit 8ee5be4 was overridden or broken by subsequent changes
- **Missing regression tests:** The original tickets' acceptance criteria required regression tests to be added, but these appear to be missing (or they would have caught the regressions)
- Both tickets now explicitly require regression tests as acceptance criteria to prevent this from happening again

## Recommendations

1. **Immediate:** Planner should prioritize these p0 regressions (core features broken)
2. **Process improvement:** Enforce regression test requirement in the verify step - do not close bug tickets until regression tests are confirmed present and passing
3. **Consider:** Add a pre-deploy smoke test that checks for these specific issues before marking commits as "ready for production"

## Next Inspection

Next scheduled run: 2026-06-27 (daily)
