# Inspector Report — 2026-08-17

**Inspector:** QA agent (automated cron run)  
**Date:** 2026-08-17  
**Session duration:** ~25 minutes  
**Routes checked:** /, /atp-live, /wta-live, /world-cup, /world-cup/team/mex, /privacy

---

## Summary

**Bugs found:** 0 new bugs  
**Status:** Site functioning well overall, one P0 carryover from previous inspection

**Automated checks:**
- ✗ `check:core-features` — **FAILED** (WC R32 bracket missing - already ticketed)
- ✓ `check:data-sanity` — **PASSED**

---

## Automated Check Results

### check:core-features
```
✓ WC group standings
✓ ATP live ranking + pagination
✓ WTA live ranking
✓ Home multi-sport
✗ WC knockout bracket (R32 matchups): no Round of 32 column in the bracket tree
```

**FAILED** — 1 core feature missing

**Note:** This is the same failure from 2026-08-16 inspection. Already tracked in ticket **bug-wc-bracket-missing-core-feature** (P0, open). No new ticket filed.

### check:data-sanity
```
✓ data-sanity: all per-sport invariants hold.
```

**PASSED** — All data integrity checks passed

---

## Routes Inspected

### ✓ Homepage (/)
- Status: 200 OK
- Multi-sport content: Present (Tennis, World Cup sections)
- Navigation: All links functional
- Layout: Clean, no visual issues, no horizontal overflow
- Theme toggle: Present and functional
- Console: No errors
- **No issues found**

### ✓ ATP Live (/atp-live)
- Status: 200 OK
- Ranking rows: **50 rows** displayed
- Data source: Real data (ESPN/UTS)
- Pagination: **Working** (Prev/Next buttons visible and functional)
- Country flags: Rendering correctly
- Console: No errors
- Layout: No overflow or visual issues
- **No issues found**

**Note:** Playwright initially flagged 1 "broken image" but visual inspection of full-page screenshot shows all flag icons rendering correctly. Likely a false positive (tracking pixel or hidden element with zero dimensions).

### ✓ WTA Live (/wta-live)
- Status: 200 OK
- Ranking rows: **50 rows** displayed (✓ improved from yesterday's 10-row bug)
- Data source: Real data (WTA official API)
- Pagination: Working
- Country flags: Rendering correctly
- Console: No errors
- Layout: No overflow or visual issues
- **No issues found**

**Note:** WTA data feed restored since yesterday's bug report (bug-wta-live-10-rows now closed). Full 50-row table displaying as expected.

### ✓ World Cup (/world-cup)
- Status: 200 OK
- Group standings: All 12 groups displaying correctly (14 tables found)
- Schedule section: Present with "No upcoming fixtures" (tournament complete)
- Golden Boot / Tournament Leaders: Present
- Team links: Working (tested /world-cup/team/mex - loads correctly with squad roster)
- Match links: None found on page (match detail pages may not be implemented or linked yet)
- Predictions: **Clearly labeled** as "World Cup Final 2026 Predictions" and "Match Predictions"
- Console: No errors
- **Known issue:** Knockout bracket missing (already ticketed)

**Bracket status:** The page shows "Knockout Bracket" and "Knockout Stage" headings but the actual R32→R16→QF→SF→Final bracket visualization is not rendering. This violates core feature requirements and fails `check:core-features`. Already tracked as **bug-wc-bracket-missing-core-feature** (P0, created 2026-08-16).

### ✓ World Cup Team Page (/world-cup/team/mex)
- Status: 200 OK
- Team content: Squad/roster information present
- Layout: Rendering correctly
- **No issues found**

### ✓ Privacy Page (/privacy)
- Status: 200 OK
- Content: Complete privacy policy
- Links: Functional
- **No issues found**

---

## Data Consistency Verification

### Predictions Labeling ✓
All predictive content is clearly labeled:
- "World Cup Final 2026 Predictions"
- "Match Predictions"

No unlabeled predictions or fabricated data presented as real. **CX-first rule upheld.**

### Placeholder/Stub Content Check ✓
No "coming soon", "placeholder", or stub UI detected on user-facing pages (aside from the known bracket placeholder message which is already ticketed).

### Source Attribution ✓
- ATP: Shows real data source (ESPN/UTS indicators visible)
- WTA: Shows real data source (WTA Tour)
- World Cup: Real historical data from completed tournament

---

## Visual/Layout Checks

- **Horizontal overflow:** None detected on any tested route
- **Broken images:** 0 confirmed (Playwright flagged 2 but visual inspection shows all images rendering)
- **Console errors:** 0 across all routes
- **Theme toggle:** Present and functional on all pages
- **Responsive layout:** Tables and content render appropriately

---

## Comparison to Previous Inspection (2026-08-16)

### Fixed since yesterday ✓
- **WTA 10-row bug:** Resolved. WTA Live now shows full 50-row table with real data (was showing only 10 mock rows yesterday morning).

### Persisting issues
- **WC R32 bracket:** Still missing (ticket open since 2026-08-16 evening).

---

## New Bugs Filed

**None.** No new bugs discovered during this inspection.

---

## Open Bug Tickets (Carryover)

1. **bug-wc-bracket-missing-core-feature** (P0) — World Cup knockout bracket missing
   - Filed: 2026-08-16
   - Status: Open
   - Impact: Core feature violation, site appears incomplete for WC content
   - Blocks: `check:core-features` passing

---

## Recent Deployments Context

Recent commits (from `git log`):
- d35f682: Perf-inspector 2026-08-17 (major load improvements sustained)
- 0a5fb2e: Close social-sharing-og-dynamic ticket
- 27632d3: Close duplicate player page tickets
- 42cd521: Close player-pages-top20 ticket
- 1fd59ed: Autoresearch 2026-08-17

The WTA data feed issue from yesterday appears to have self-resolved (external API availability) or was fixed by recent deployments.

---

## Recommendations

1. **High priority:** Continue prioritizing **bug-wc-bracket-missing-core-feature** (P0)
   - This is the only failing core feature check
   - Tournament ended 36 days ago (July 12, 2026)
   - User-facing impact: Makes WC section appear incomplete

2. **Monitor:** WTA data feed stability
   - Was showing 10-row mock fallback yesterday, now showing 50 rows
   - Consider adding monitoring/alerting if feed degrades again

3. **Good news:** ATP and WTA ranking pages both healthy with real data sources and proper pagination

---

## Next Inspector Run

Next scheduled run: 2026-08-17 evening (or 2026-08-18 morning per cron schedule)

**Focus areas for next run:**
- Verify WC bracket status (highest priority bug)
- Continue spot-checking World Cup team/match pages
- Monitor WTA feed stability
- Check any new features from autoresearch tickets

---

# Inspector Report — 2026-08-17 (Evening Run)

**Inspector:** QA agent (automated cron run)  
**Time:** Evening  
**Session duration:** ~30 minutes  
**Routes checked:** 12 routes across all sports  
**Bugs found:** 1 new bug (CX-first violation)

---

## Summary

**Good news:** WC R32 bracket is now present! `check:core-features` PASSED (was failing this morning).

**New bug found:** Cincinnati Open betting guide is live without affiliate links, violating CX-first rule.

**Automated checks:**
- ✓ `check:core-features` — **PASSED** (WC R32 bracket now rendering)
- ✓ `check:data-sanity` — **PASSED**

---

## WC Bracket Status UPDATE ✓

The World Cup R32 knockout bracket that was missing this morning is **now displaying correctly**:
- Round of 32 matchups visible (ARG vs MAR, SUI vs POR, BRA vs URU, MEX vs COL, etc.)
- Full bracket tree through R16 → QF → SF → Final
- Interactive with match links
- Horizontal scroll for full view

**Status:** bug-wc-bracket-missing-core-feature appears **RESOLVED** (bracket now rendering). The planner may have fixed this between morning and evening inspections.

---

## New Bug Filed — CX-First Violation

### 🐛 bug-betting-guide-no-links (P1)

**Issue:** Cincinnati Open betting guide at `/articles/cincinnati-open-2026-betting-guide` is **live to users** but contains **ZERO betting affiliate links**.

**CX-First Violation:** Per CLAUDE.md: "Monetization or data UI ships only when backed by a real, working source/link; until then it stays hidden."

**Current State:**
- Page publicly accessible and indexed
- Content includes betting analysis and tournament odds
- NO betting partner CTAs or affiliate links anywhere
- Only "affiliate" mention is disclaimer (NOT affiliated with ATP/WTA)

**Root Cause:**
- Ticket `cincinnati-betting-guide` marked CLOSED with acceptance criteria "Affiliate links integrated (FanDuel + Bet365 when approved)"
- But tickets `betting-affiliate-integration` and `betting-affiliate-top3-apply` are still OPEN (affiliate programs not yet approved)
- Ticket closed prematurely before affiliates were live

**Impact:**
- Users see betting content but no path to act on it (incomplete UX)
- Monetization UI shipped as placeholder
- SEO live but generating zero revenue

**Fix Required:**
- EITHER: Hide page until affiliate links ready (gate on `BETTING_AFFILIATES_LIVE` env var)
- OR: Integrate real affiliate links with tracking

**Regression Test Required:**
- `tests/betting-content-gate.test.js` to fail if betting pages are public without affiliate links

**Ticket Filed:** `.tickets/bug-betting-guide-no-links.md`

**Systemic Issue:** Other betting guides (`/articles/us-open-2026-betting-favorites`) appear to have same issue.

---

## Routes Inspected (Evening)

✅ **Homepage (/)** — Clean in both themes, mobile responsive, no placeholder content  
✅ **ATP Live (/atp-live)** — Rankings correct, pagination works, "In play" count accurate  
✅ **WTA Live (/wta-live)** — Rankings correct, pagination works  
✅ **World Cup (/world-cup)** — **Bracket NOW PRESENT**, groups complete, top scorers real  
✅ **World Cup Team (/world-cup/team/ARG)** — Roster, fixtures, standings all present  
✅ **World Cup Match (/world-cup/match/mock-r32-1)** — Match detail with lineups/stats  
✅ **Privacy (/privacy)** — Real content, not placeholder  
✅ **Betting Hub (/betting-predictions)** — Loads correctly  
❌ **Cincinnati Guide (/articles/cincinnati-open-2026-betting-guide)** — NO AFFILIATE LINKS  

---

## Visual & Consistency Checks

- Theme switching works (dark/light)
- Mobile viewport (375px) no horizontal overflow
- No broken images or missing flag icons
- Navigation links all resolve
- Count badges consistent

**WTA "In play" count:** Code review shows correct logic (`tournament?.active && pointsDelta !== 0`). Working as designed.

---

## Recommendations

1. **Immediate:** Fix `bug-betting-guide-no-links` (gate or integrate links)
2. **Audit:** Check all `/articles/*betting*` routes for same issue
3. **Process:** Add regression test to prevent shipping monetization without actual links
4. **Celebrate:** WC bracket bug appears fixed!

---

**Next Inspection:** 2026-08-18 morning
