---
id: wc-scenarios
status: open
deps: []
links: []
created: 2026-06-21T00:00:00Z
type: feature
priority: 2
parent: worldcup
tags: [worldcup, engagement]
---
# World Cup group "what-if" qualification scenarios

Interactive qualification scenario tool: show what each team needs to advance from their group ("Brazil advances with a draw", "USA needs to win by 2+ goals if Mexico wins"). **Peak engagement during final group matchdays** when qualification hangs in the balance.

Inspired by [worldfootball.net table calculator](https://www.worldfootball.net/competition/co139/fifa-world-cup/standings-calculator/), [World Cup Pass simulator](https://worldcuppass.com/simulator/), and [GoWoC calculator](https://worldcupcalculator.com/). Let users simulate upcoming results and see updated standings + who qualifies.

**ROI:** High engagement (users LOVE scenario planning during tournaments — see massive traffic to BBC/ESPN scenario widgets). Viral/"shareable bracket" potential. Moderate build (standings logic exists; add result-input UI + re-sort on change).

## Acceptance Criteria

1. Per group: show current standings + upcoming fixtures; let user input hypothetical scores for remaining matches.
2. Live-update standings (points, GD, position) as user enters scores; highlight who qualifies (top 2 + best 3rd-placed logic).
3. "Reset to current" button; optionally shareable URL with encoded scenario (nice-to-have, not MVP blocker).
4. Real ESPN data as baseline; client-side calculation (no backend); tokens-themed.
5. Build/lint/check:data-integrity green; live-verified.

## Notes

**2026-06-21**

2026 format: 12 groups of 4 teams; top 2 per group + 8 best 3rd-placed teams advance to Round of 32. Tiebreakers: points → goal difference → goals scored → head-to-head → fair play → FIFA ranking. Source: [FIFA 2026 format](https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026).
