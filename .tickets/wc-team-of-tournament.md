---
id: wc-team-of-tournament
status: open
deps: []
links: []
created: 2026-06-21T00:00:00Z
type: feature
priority: 3
parent: worldcup
tags: [worldcup, engagement]
---
# World Cup Team of the Tournament / Round

Show a "Team of the Round" or "Team of the Tournament so far" — best XI based on player ratings/performance. SofaScore publishes daily/round-based best XIs; FotMob has "Team of the Week". **High engagement** (users debate selections, share on social).

Derive from player ratings if ESPN provides them, or integrate SofaScore ratings (they publish this publicly). Alternative: editorial/manual selection per round (human-curated) — less automated but viable.

**ROI:** Medium engagement (shareable, debate-worthy content). Medium-high build (needs player ratings source or manual curation). Nice-to-have, not MVP — prioritize after core features.

## Acceptance Criteria

1. `/world-cup/team-of-the-round` (or inline section on main WC page) shows best XI: formation, player names, ratings.
2. Updated per matchday or round.
3. Real ratings source (ESPN player ratings, SofaScore scrape, or manual curation); clearly labelled source.
4. Optional: historical Team of the Tournament archive.
5. Tokens-themed; build/lint green; live-verified.

## Notes

**2026-06-21**

SofaScore publishes [Team of the Day](https://www.sofascore.com/news/world-cup-2026-team-of-the-day-sofascore-ratings) and [Team of the Round](https://www.sofascore.com/news/fifa-world-cup-2026-team-of-the-round-round-1). Could scrape or use as inspiration for manual curation.
