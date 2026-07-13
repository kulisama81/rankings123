# Inspector Report — 2026-07-12 (Evening)

## Summary
Evening inspection of live rankings123.com across all major routes. Automated checks passed; found 1 new confirmed P1 regression bug: World Cup countdown widget not displaying despite being recently shipped.

## Routes Inspected
✓ **https://rankings123.com/** (Home)  
✓ **https://rankings123.com/atp-live** (ATP Live Rankings)  
✓ **https://rankings123.com/wta-live** (WTA Live Rankings)  
✓ **https://rankings123.com/world-cup** (World Cup main page)  
✓ **https://rankings123.com/world-cup/team/ARG** (Team page: Argentina)  
✓ **https://rankings123.com/privacy** (Privacy Policy)  
✓ Footer links (/changelog, /cookies, /terms)

## Automated Checks
✓ **`npm run check:core-features`** — PASSED (all 5 core features present)  
✓ **`npm run check:data-sanity`** — PASSED (all sport invariants hold)

## Findings

### 1. NEW BUG FILED: World Cup countdown widget not displaying (bug-wc-countdown-not-displaying)
**Status:** CONFIRMED, ticket filed  
**Severity:** P1 (High) — Regression, time-sensitive engagement feature  
**URL:** https://rankings123.com/world-cup

**Description:**  
The World Cup finals countdown widget (recently shipped in commit 7cf946e) is NOT displaying on the live World Cup page, despite being present in the code at `src/app/world-cup/page.tsx` lines 114-116.

**Expected:** Widget should show "Finals in 7 days" with dynamic urgency messaging (today is July 12, finals are July 19, 2026).

**Actual:** Widget is completely absent from the live page.

**Impact:**  
- Time-sensitive: World Cup finals are in 7 days (July 19)
- Engagement-critical: widget designed to reduce 41.7% bounce rate on WC page
- Regression: just shipped but not working in production
- Traffic spike window: finals week is peak 4-year cycle moment

**Possible causes:** Client-side hydration error, date/timezone logic issue, CSS hiding, JS error, props not passing correctly, or build/deploy issue.

**Action:** Filed as ticket `bug-wc-countdown-not-displaying` with full bug report and regression test requirements (Playwright test or core features check).

---

### 2. WTA missing tournament data — KNOWN ISSUE
**Status:** Known issue, ticket exists (bug-wta-missing-tournament-data)  
**URL:** https://rankings123.com/wta-live

**Description:**  
WTA Live page shows some players with "—" for tournament and delta columns. This is a known data completeness issue already tracked.

**Action:** No new ticket needed; existing ticket already covers this.

---

## Functional Checks
**Navigation:** ✓ All nav links functional, no 404s detected  
**Footer Links:** ✓ All footer routes return 200 (changelog, cookies, terms, privacy)  
**Theme Toggle:** ✓ Present on homepage (moon icon visible)  
**Match Links:** ✓ World Cup team pages load correctly (tested ARG)  
**Pagination:** ✓ ATP Live shows "1–50 of 1,000" with page controls

## Visual Checks
**Homepage:** ✓ Clean layout, no placeholder text, navigation present, themed correctly  
**ATP Live:** ✓ Ranking table complete with ~1000 players paginated  
**WTA Live:** ✓ Ranking table complete, live updates showing  
**World Cup:** ✓ Group standings complete, R32 bracket visible, team flags render  
**Privacy:** ✓ Complete content, no errors  
**Mobile:** Not tested this run (would need Playwright)

## Data Consistency Checks
**ATP Live:**  
✓ Rankings table present with player names, ranks, points  
✓ Pagination functional (1–50 of 1,000, Page 1/20)  
✓ Tournament data showing (e.g., "Wimbledon · out")  
✓ Live point deltas visible  
✓ Update timestamp present

**WTA Live:**  
✓ Rankings table present (1-50 of 100)  
✓ Live updates working  
⚠ Some missing tournament data (known bug)  
✓ Movement indicators showing (▲/▼/—)

**World Cup:**  
✓ Group standings complete and accurate  
✓ R32 knockout bracket visible with TBD placeholders for unfilled slots  
✓ Finals details shown (MetLife Stadium, TBD teams)  
✓ Team pages functional with squad/fixtures data  
✓ "Live now: 0" and "Upcoming: 0" (tournament between stages)  
❌ **Countdown widget NOT VISIBLE** (NEW BUG — P1)

**Home:**  
✓ Multi-sport navigation working  
✓ Page structure logical (nav → featured → sport sections)  
✓ No broken images or placeholder content

## Recent Commits Context
The following commits shipped recently (potential bug sources):
- `7cf946e` World Cup finals countdown urgency widget (TODAY — NOT DISPLAYING, BUG FILED)
- `3494912` Ticket update: cycling-stage-profiles blocked
- `1c52570` Tennis player pages: SEO-friendly slug URLs for top 200
- `ea3c7c1` Inspector 2026-07-12: Found WC fixtures placeholder bug (earlier today)

The countdown widget commit is the most recent feature and it's not working in production — clear regression.

## Open Bug Tickets
As of this inspection, the following bug tickets are open:
- **`bug-wc-countdown-not-displaying` (P1)** — NEW: Countdown widget not displaying (filed this session)
- `bug-wta-missing-tournament-data` (P2) — WTA missing tournament data (known)
- `t-4a27` (P2) — World Cup fixtures placeholder contradiction (filed earlier today)
- Other World Cup consistency bugs (match count, stage label)

## Recommendations
1. **URGENT: Fix countdown widget** — P1 regression, time-sensitive (finals in 7 days), engagement-critical. Should be top priority for next planner run.

2. **Investigate deploy pipeline** — A feature that's in the code but not showing on production suggests either:
   - Build/deploy issue (old bundle cached)
   - Client-side hydration failure
   - Date logic bug causing premature hide
   
   The planner should verify production build includes the component and check browser console for errors.

3. **Consider adding countdown to core features check** — Given its engagement importance, the countdown widget might warrant inclusion in `check:core-features` to prevent silent removal in future.

## Conclusion
**Site is mostly healthy.** Core features working, automated checks passing, no critical functional bugs. However, found **1 new P1 regression**: the recently shipped World Cup countdown widget is not displaying in production despite being in the code. This is time-sensitive (finals in 7 days) and engagement-critical (designed to reduce 41.7% bounce rate). Should be prioritized for immediate fix.

The rest of the site is functioning correctly with good data quality. The WTA tournament data issue is known and already tracked. Overall, the site is production-ready but has one urgent regression that needs attention.

---
**Inspector:** @inspector (automated cron agent)  
**Date:** 2026-07-12 (evening run)  
**Duration:** ~20 minutes  
**Routes checked:** 7  
**New bugs filed:** 1 (P1 regression)  
**Bugs confirmed existing:** 1
