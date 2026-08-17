---
id: live-match-indicators-engagement
status: open
deps: []
links: []
created: 2026-08-17T00:00:00Z
type: feature
priority: 2
parent: rankings123
tags: [feature, tennis, live, engagement, ux]
---
# Live match indicators on ranking tables — real-time urgency signal

## Feature Description

Show "Playing Now" badges/indicators next to players currently in matches on ATP/WTA Live ranking pages. Competitors (live-tennis.eu, livetennis.io) highlight active matches directly in ranking tables as a real-time urgency signal.

## User Need

"What's happening RIGHT NOW?" — live match indicators create urgency and drive immediate engagement. Users return frequently during tournament days to see who's playing and how it affects rankings.

## Scope

1. **Data source**: ESPN scoreboard API (already in use for live points) — filter for in-progress matches
2. **Display**: Small "LIVE" or "⚡️ Playing" badge next to player name in ranking table
3. **Interactivity**: Click badge → jump to match details (score, opponent, round, tournament)
4. **Real-time**: Sync with scoreboard refresh (currently 60s revalidation)

## Acceptance Criteria

1. **Live match badges visible**:
   - ATP/WTA Live ranking tables show "LIVE" indicator for players in active matches
   - Badge style: small, non-intrusive, high-contrast (e.g., red dot + "LIVE" text)
   - Only shows when ESPN scoreboard status = "in" (in progress)
   - Disappears when match completes (status = "post")

2. **Click interaction**:
   - Click badge → navigate to match detail (if page exists) OR show match score tooltip
   - Tooltip shows: opponent, current score, tournament, round

3. **Performance**:
   - Live indicators don't slow down table render (LCP <2.5s maintained)
   - Data comes from existing ESPN scoreboard fetch (no new API calls)

4. **Standard checks**:
   - `npm run build` — green
   - `npm test` — all tests pass
   - `npx eslint src --max-warnings=0` — clean

5. **Live verification**:
   - During tournament hours, visit /atp-live or /wta-live
   - Verify players in active matches show "LIVE" badge
   - Click badge and verify interaction works
   - After match completes, verify badge disappears

## ROI Justification

**Traffic**: Low direct impact (doesn't drive new visitors).

**Engagement**: HIGH — creates urgency and drives return visits during tournament days. "Who's playing right now?" is a core live-rankings user need.

**Revenue**: Moderate — keeps users on site longer (session depth), more ad impressions.

**Parity**: Competitor standard (live-tennis.eu has this). Reinforces "live" positioning.

**ROI: 7/10** — Pure engagement driver. Strengthens "live" brand but doesn't drive traffic or direct revenue.

## Notes

- Data already available from ESPN scoreboard (no new API dependency)
- Low implementation effort (reuse existing scoreboard data)
- First-principles: "Live" = urgency = return visits. Match indicators make the "live" promise visible and actionable.
- Consider mobile UX: badge should be tappable on mobile (44×44px touch target)
