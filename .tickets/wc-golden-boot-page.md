---
id: wc-golden-boot-page
status: open
deps: []
links: []
created: 2026-06-21T00:00:00Z
type: feature
priority: 2
parent: worldcup
tags: [worldcup, seo, engagement]
---
# World Cup Golden Boot race — dedicated page

Dedicated `/world-cup/golden-boot` page for the adidas Golden Boot race: live top scorers leaderboard + assists (tiebreaker) + minutes played (2nd tiebreaker). Expand beyond the current "Tournament Leaders" section into a **full SEO + engagement destination**.

Currently we show top scorers inline on `/world-cup`; promote this to its own page. Users search "World Cup Golden Boot 2026", "top scorers World Cup", "Messi goals World Cup" — capture that traffic. Show richer detail: goals breakdown (penalty vs open play if available), matches played, goals-per-game, race history (who led after each round).

**ROI:** High SEO (Golden Boot = top World Cup search term). Medium engagement (users track this obsessively). Low build (stats exist; add page + richer table).

## Acceptance Criteria

1. `/world-cup/golden-boot` renders: top scorers table (player, country, goals, assists, minutes played minimum; penalties/open-play split if available).
2. Show tiebreaker rules (assists → minutes → alphabetical per FIFA rules).
3. Linked from: main WC page "Tournament Leaders" → "See full Golden Boot race", player pages.
4. Real ESPN player stats; mock fallback; source flag.
5. In sitemap; SEO-optimized title/description ("World Cup 2026 Golden Boot — Top Scorers & Assists").
6. Tokens-themed; build/lint/check:data-integrity green; live-verified.

## Notes

**2026-06-21**

Current leaders (per search): Messi and Jonathan David with 3 goals each (hat-tricks in opening matches). Mbappé, Haaland, Kane on 2. Sources: [FOX Golden Boot tracker](https://www.foxsports.com/stories/soccer/2026-fifa-world-cup-golden-boot-tracker), [FIFA Golden Boot](https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/adidas-golden-boot-race-top-scorer).
