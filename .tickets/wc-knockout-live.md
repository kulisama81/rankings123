---
id: wc-knockout-live
status: open
deps: []
links: []
created: 2026-06-20T22:46:10Z
type: feature
priority: 1
parent: worldcup
tags: [worldcup, engagement, seo]
---
# Live knockout stage — BBC-style schedule + bracket (polish + accuracy)

Build on the shipped knockout bracket (wc-knockout, wc-future — both closed) to fully match BBC's World Cup knockout schedule (bbc.com/sport/football/world-cup/schedule#KnockoutStage): a clean, LIVE Round of 32 -> R16 -> QF -> SF -> Final view that fills in as teams qualify. Each tie shows date, kickoff in the user's local timezone, and venue/city; live matches show the live minute + score; finished ties show the result and who advanced. Must update live from ESPN as results land. DATA ACCURACY (hard rule, same class of bug we just fixed for group eliminations): NEVER fabricate or present a projected matchup as confirmed — for slots whose teams aren't decided yet, show BBC-style positional placeholders ('Winner Group A', 'Runners-up Group B', or '1A vs 2B'), not invented teams; a real team only appears in a slot once ESPN confirms it. Keep the keyless + mock-fallback + source-flag pattern; degrade gracefully when the bracket isn't published yet.

## Acceptance Criteria

1) /world-cup knockout section matches BBC layout: full R32->Final progression with per-tie date, local-tz kickoff, and venue/city. 2) Live scores/minute for in-progress ties; result + advancing team for finished ones; updates as ESPN data lands. 3) Undecided slots show positional placeholders (e.g. 'Winner Group A'), never fabricated/projected teams presented as fact; verify no made-up matchup ships. 4) source flag + mock fallback; SEO-friendly; tokens-themed (works dark+light); build + eslint + check:readability green; live-verified on rankings123.com.
