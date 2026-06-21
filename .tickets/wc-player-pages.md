---
id: wc-player-pages
status: open
deps: []
links: []
created: 2026-06-21T00:00:00Z
type: feature
priority: 1
parent: worldcup
tags: [worldcup, seo, engagement]
---
# World Cup player pages

Per-player pages (`/world-cup/player/[id]`) with tournament stats: goals, assists, minutes played, cards, player rating where available. The long-tail SEO engine for "Lionel Messi World Cup 2026", "Kylian Mbappé stats", etc. — following the successful team pages pattern.

Mirrors the team pages structure: fetch player data from ESPN soccer endpoints (`/athletes` or match lineups/player stats), show tournament-specific performance (not career stats — keep it scoped to WC 2026), link from match pages/team rosters/top scorers lists.

**ROI:** Player names = massive SEO long-tail (millions search "Messi World Cup", "Haaland stats"). Complements the team pages SEO strategy. Modest build (reuse team-page card/table patterns).

## Acceptance Criteria

1. `/world-cup/player/[id]` renders: player name, flag/country, tournament stats (goals, assists, appearances, minutes, cards minimum; xG/rating if source provides).
2. Linked from: top scorers/assisters lists, team squad pages, match lineups.
3. Real ESPN data; keyless + mock-fallback + source flag; degrades gracefully.
4. In sitemap; SEO-optimized title/description (e.g., "Lionel Messi — World Cup 2026 Stats").
5. Tokens-themed; build/lint/check:data-integrity green; live-verified on rankings123.com.
