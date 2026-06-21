---
id: wc-bracket-visual
status: closed
deps: []
links: []
created: 2026-06-21T07:49:22Z
type: feature
priority: 1
parent: worldcup
tags: [worldcup, engagement, ui]
---
# Visualize the knockout as a bracket TREE (draw halves + future paths)

Render the World Cup knockout (starting from the projected Round of 32) as a proper visual BRACKET TREE — connected columns R32 -> R16 -> QF -> SF -> Final with lines/connectors — instead of stacked per-stage lists. The goal: a human can see which teams are on the TOP half vs BOTTOM half of the draw and trace a team's potential path / imagine future matchups (e.g. 'if both win, X meets Y in the QF').

Use the OFFICIAL FIFA 2026 bracket TREE: how each R32 match (M73-M88, already encoded in R32_TEMPLATE in src/lib/worldCupBracketFeed.ts) feeds into R16, then QF, SF, Final, and which matches sit in the top vs bottom half. Do NOT invent the tree — derive it from the official 2026 knockout bracket (same source as wc-bracket-official; e.g. en.wikipedia.org/wiki/2026_FIFA_World_Cup_knockout_stage). Carry the existing projected/confirmed labelling forward: projected slots show the seed-label teams (e.g. '1st Group A') and are clearly marked projection; confirmed fixtures show real teams.

CX-first: data is the hero, no fabricated matchups. Desktop = full connected bracket; mobile = a sensible responsive fallback (horizontal scroll and/or collapsible halves) — never a broken/overflowing layout. Tokens-themed (dark+light), accessible (keyboard/focus, readable connectors), GPU-cheap.

## Acceptance Criteria

1) /world-cup shows the knockout as a connected bracket tree (R32->Final) where the two draw halves are visually clear and a team's potential path is traceable. 2) Tree structure follows the OFFICIAL FIFA 2026 bracket (R32->R16->QF->SF->Final feeding + halves) — verified against the official source, not invented; projected vs confirmed labelling preserved; projected teams shown via seed labels and clearly marked as projection. 3) Responsive: full bracket on desktop, non-broken fallback on mobile; tokens-themed dark+light; accessible. 4) REGRESSION TEST: a node --test unit test under tests/ for the bracket-tree mapping helper (R32 match index -> its R16/QF/... slot + half) asserting it matches the official structure; npm test green. 5) build + eslint + check:readability green; live-verified on rankings123.com/world-cup.
