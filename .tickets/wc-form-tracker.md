---
id: wc-form-tracker
status: open
deps: []
links: []
created: 2026-06-21T00:00:00Z
type: feature
priority: 2
parent: worldcup
tags: [worldcup, engagement, data]
---
# World Cup form & momentum tracker

Show recent form + "biggest movers" / "teams on a streak". Examples: "Argentina — 3 straight wins, 9 goals scored, 0 conceded in last 3 matches", "Biggest climbers: Team X jumped from 3rd to 1st in Group A". **Engagement gold** — users love narrative/storylines beyond raw standings.

SofaScore shows "form" as W/D/L badges; FotMob highlights streaks; ESPN has "momentum" sections. We can derive this from match results: last 3 matches → form string (W-W-D), goals for/against in recent games, position change over time.

**ROI:** Medium engagement lift (adds narrative/context to standings). Low build (results data exists; calculate form badges + deltas). Differentiates from static ranking sites.

## Acceptance Criteria

1. Group standings or team pages show recent form: last 3 WC matches as W/D/L badges (e.g., "W-W-D").
2. "Biggest movers" section: teams whose group position rose/fell most in last matchday (e.g., "🔥 Canada climbed from 3rd to 1st in Group B").
3. Optional: streak callouts ("3-game winning streak", "unbeaten in 4").
4. Real ESPN match results; client-side or server-derived; tokens-themed.
5. Build/lint/check:data-integrity green; live-verified.
