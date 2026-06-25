---
id: wc-h2h
status: closed
deps: []
links: []
created: 2026-06-21T00:00:00Z
type: feature
priority: 2
parent: worldcup
tags: [worldcup, engagement]
---
# World Cup head-to-head records

Show historical head-to-head records between teams on match pages: "Brazil vs Argentina — last 5 meetings: 3 wins Brazil, 1 draw, 1 win Argentina". **Narrative/context boost** — users love rivalry history before big matches.

Similar to tennis `head-to-head` ticket (p1 tennis parity feature). For World Cup: fetch historical results between two teams (ESPN historical data or FIFA archives if accessible); show on upcoming match pages or as a standalone H2H page (`/world-cup/h2h/[team1]-vs-[team2]`).

**ROI:** Medium engagement (adds storyline/context). Medium build (new historical data source; display straightforward). Parity with SofaScore/FotMob H2H sections.

## Acceptance Criteria

1. Match pages (or dedicated H2H page) show head-to-head: last N meetings (5-10), wins/draws/losses, recent results.
2. Optionally: World Cup-specific H2H (meetings at past WCs) if data available.
3. Real ESPN historical data or FIFA archives; mock fallback ("H2H data unavailable"); source flag.
4. Tokens-themed; build/lint/check:data-integrity green; live-verified.

## Notes

**2026-06-21**

ESPN likely has historical soccer match data; probe `/summary` or `/history` endpoints per team. FIFA also publishes past WC results. Start with ESPN; fallback to manual FIFA data if needed.
