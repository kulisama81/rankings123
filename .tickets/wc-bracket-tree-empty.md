---
id: wc-bracket-tree-empty
status: open
deps: []
links: []
created: 2026-06-27T21:59:46Z
type: bug
priority: 0
parent: worldcup
tags: [worldcup, ui, bug]
---
# Bracket Tree view renders EMPTY — projected knockout not shown

The 'Bracket Tree' view on /world-cup shows the toggle + heading but NOT the projected matchups. Verified: 'Top Half' is absent from the rendered HTML and there are ZERO team codes in the tree region — yet /api/worldcup/bracket returns the FULL projection (R32->Final, all projected; England is in projected-r32-7 vs Ecuador). So the coolest feature — the live projected knockout bracket — is invisible in the tree view (wc-bracket-tree-render was closed but has regressed or never actually rendered the cards). FIX: make the Bracket Tree view actually render the projected matchups for every round (R32->R16->QF->SF->Final), each with team flag + code/name, connected so a team's path is traceable (e.g. where England lands). Clearly distinguish CONFIRMED (decided) vs PROJECTED/LIVE (from current standings) — solid card + label for confirmed, dashed + 'Projected' badge for projected. Visible on desktop AND mobile, light + dark.

## Acceptance Criteria

1) /world-cup Bracket Tree view VISIBLY shows projected matchups for every round (not empty); team flags+codes render. 2) Each tie labeled confirmed vs projected/live; projections from current standings, never fabricated; as real knockout results land they flip to confirmed. 3) VISUAL QA MANDATORY: use webapp-testing to load the page, screenshot the Bracket Tree view, and confirm the matchup cards actually render (desktop+mobile, light+dark) — do NOT rely on text-in-DOM (it's misled us before). 4) Regression test asserting the tree renders >0 matchup cards with team data. 5) build/lint/check:data-integrity green; live-verified.
