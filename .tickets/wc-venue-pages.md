---
id: wc-venue-pages
status: closed
deps: []
links: []
created: 2026-06-21T00:00:00Z
type: feature
priority: 2
parent: worldcup
tags: [worldcup, seo]
---
# World Cup venue / stadium / city pages

Per-venue pages (`/world-cup/venue/[slug]`) for the 16 host stadiums/cities: stadium name, city, capacity, matches hosted here, photos/description where available. **SEO goldmine** — users search "World Cup matches in Dallas", "MetLife Stadium World Cup 2026", "Vancouver World Cup venue".

ESPN World Cup data includes venue/city per match; aggregate to build venue pages showing all matches at that stadium. 16 venues = 16 indexable pages capturing geo + venue long-tail search traffic.

**ROI:** High SEO value (16 cities × stadium name × "World Cup" = strong search volume). Low build effort (mostly static, one fetch to group matches by venue). Differentiates us from pure-stats competitors.

## Acceptance Criteria

1. `/world-cup/venue/[slug]` renders: stadium name, city/country, capacity (if available), list of matches hosted (date, teams, result/upcoming).
2. Linked from: match pages (venue name → venue page), schedule (group by venue view optional but nice).
3. Real ESPN venue data (venue field on match objects); mock fallback if venue missing; source flag.
4. In sitemap; SEO title/description (e.g., "MetLife Stadium — World Cup 2026 Matches in New York/New Jersey").
5. Tokens-themed; build/lint/check:data-integrity green; live-verified.

## Notes

**2026-06-21**

Per FIFA, the 16 host cities are: Atlanta, Boston, Dallas, Guadalajara, Houston, Kansas City, Los Angeles, Mexico City, Miami, Monterrey, New York/New Jersey (MetLife), Philadelphia, San Francisco Bay Area (Levi's), Seattle, Toronto, Vancouver. Sources: [FIFA Host Cities](https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/host-cities), [Olympics.com stadiums list](https://www.olympics.com/en/news/fifa-world-cup-2026-full-list-stadiums-mexico-canada-usa).
