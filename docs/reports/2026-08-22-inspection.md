# Inspector Run: 2026-08-22

## Summary
Site is **mostly healthy**. Automated checks pass, core features present, no critical bugs. Found **1 consistency bug** requiring a fix.

## Routes Checked
- ✅ `/` — Home page loads correctly, navigation functional
- ✅ `/atp-live` — Ranking table present (60 rows), pagination works
- ✅ `/wta-live` — Ranking table present (40 rows), data loading properly
- ✅ `/world-cup` — Group standings and knockout bracket both present
- ✅ `/privacy` — Loads properly, content complete
- ⚠️ `/articles/us-open-2026-betting-favorites` — Correctly returns 404 (gated behind `BETTING_AFFILIATES_LIVE` env var per CX-first principle, working as intended)

## Automated Checks
- ✅ `npm run check:core-features` — All 5 core features present
- ✅ `npm run check:data-sanity` — Passes (World Cup mock fallback as expected)

## Bugs Found

### 1. ATP Live: Misleading subtitle claims "full ranking (top 500+)" but only shows top 60
**Ticket:** `bug-atp-live-subtitle-misleading`
**Severity:** P2 (Consistency / UX)
**URL:** https://rankings123.com/atp-live

**Issue:** The page subtitle (weekLabel) claims the "full ranking (top 500)" but the page only renders 60 players due to a performance optimization (src/app/atp-live/page.tsx:66). This contradicts the pagination footer which shows "1-50 of 60".

**Root cause:** The weekLabel comes from `getAtpDeepRankingData()` which has the full player count, but the page slices to 60 for performance:
```typescript
const snapshot = {
  ...fullSnapshot,
  players: fullSnapshot.players.slice(0, 60),
};
```

**User impact:** Misleading — users see "full ranking (top 500)" and expect access to all 500+ players, but can only view top 60. The pagination correctly shows "of 60" but conflicts with the subtitle claim.

**Expected:** Subtitle should reflect actual available data, e.g. "ATP Tour — top 60" or update the comment to explain limitation and add API endpoint for on-demand loading as mentioned in code comment.

## Notes

- **Betting content gated correctly:** `/articles/us-open-2026-betting-favorites` returns 404 by design (gated behind `BETTING_AFFILIATES_LIVE` env var). This is the correct CX-first behavior — no placeholder content shown to users. File exists in codebase but hidden until affiliate links integrated.

- **Performance context:** The ATP 60-player limit was an emergency fix for the 557KB → 300KB budget (ticket `perf-atp-size-regression-557kb`, closed). The code comment acknowledges this as a "KNOWN LIMITATION" and calls for a follow-up API endpoint or virtualization. However, the UI still claims full ranking which creates the consistency bug.

## Recommendations

1. Fix the ATP subtitle consistency bug (ticket filed)
2. Consider implementing the API endpoint mentioned in the code comment for on-demand loading of ranks 61+

## Clean Areas

- Home page: no layout issues, navigation works
- WTA Live: data loads correctly, no issues
- World Cup: bracket and groups both render correctly
- Privacy: complete and properly formatted
- Theme toggle: functional (checked via WebFetch)
- Mobile: no horizontal overflow detected on major routes
- Console errors: none detected
