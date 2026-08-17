---
id: h2h-records-phase1-parity
status: open
deps: []
links: []
created: 2026-08-17T00:00:00Z
type: feature
priority: 1
parent: rankings123
tags: [feature, tennis, parity, betting, engagement]
---
# Head-to-head (H2H) player records — Phase 1 parity + betting context

## Feature Description

Implement head-to-head (H2H) win/loss records between top tennis players. Competitors (livetennis.io, live-tennis.eu) show H2H as a core feature; we lack this completely.

## User Need

"Who wins when Player X plays Player Y?" — critical for betting decisions and engagement. H2H searches ("Sinner vs Alcaraz head to head") drive 10K+ monthly searches per matchup.

## Scope

1. **Data source**: ESPN API player matchup endpoint OR Ultimate Tennis Statistics H2H data
2. **Display locations**:
   - Player profile pages: H2H vs top 10 opponents
   - Pre-match prediction articles: H2H stat in matchup preview
   - Hover/expand on ranking tables: Quick H2H lookup
3. **Metrics**: Wins-Losses, last 5 matches, surface breakdown (hard/clay/grass)
4. **Betting integration**: Link to betting odds for upcoming H2H matchups

## Acceptance Criteria

1. **Player profile H2H section**:
   - Shows record vs top 10 opponents (e.g., "vs Alcaraz: 5-3")
   - Surface breakdown when available
   - Last 5 match results with dates
   - Data from real source (ESPN/UTS), fallback to mock if unavailable
   - Source flag visible ("ESPN" / "UTS" / "Mock")

2. **Data integrity**:
   - No fabricated H2H records
   - All match results trace to real source
   - When data unavailable, show "H2H data not available" NOT placeholder records

3. **Standard checks**:
   - `npm run build` — green
   - `npm test` — all tests pass
   - `npx eslint src --max-warnings=0` — clean
   - `npm run check:data-sanity` — passes

4. **Live verification**:
   - Visit player profile page on production
   - Verify H2H section displays with real data
   - Check source flag is accurate
   - Test on 3+ player pages (Sinner, Alcaraz, Swiatek)

## ROI Justification

**Traffic**: "Player X vs Player Y head to head" = 10K+/month per top matchup × 10 matchups = 100K+ monthly search volume addressable.

**Engagement**: Deep stat that brings users back. Betting users consult H2H before placing bets.

**Revenue**: High betting affiliate conversion context (users viewing H2H are in betting mindset).

**Parity**: Competitor standard feature (livetennis.io, live-tennis.eu both have it). Lack of H2H = credibility gap.

**ROI: 8/10** — Phase 1 parity requirement + betting revenue enabler.

## Notes

- Blocked by: `player-pages-*` tickets (need player pages first for H2H display)
- Data source research: Check ESPN `/sports/tennis/player/{id}/splits` or UTS player matchup tables
- First-principles: H2H serves betting decision-making (high-intent users) + deep engagement (return visits to check before matches)
