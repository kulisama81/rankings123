---
id: wc-bracket-tree-render
status: open
deps: []
links: []
created: 2026-06-21T22:31:48Z
type: bug
priority: 1
parent: worldcup
tags: [worldcup, ui, bug]
---
# Bracket Tree view doesn't visually read as a bracket (R32 matchups not drawn)

On https://rankings123.com/world-cup, the 'Bracket Tree' view shows the headers (Top Half / Bottom Half / 'Round of 32') and the projection notice, but it does NOT visually read as a bracket — users report not seeing the matchups drawn. NOTE: the data + server render are FINE (the R32 cards ARE in the DOM: codes like KOR/SUI/GER, flags, 'Proj' badges, seed labels all present). This is a VISUAL/structure bug, two parts: (1) we only project the Round of 32 — R16/QF/SF/Final stages are EMPTY (0 matches), so the 'tree' is a single faint column with connector lines going nowhere; it doesn't look like a connected bracket you can trace. (2) The projected cards use a very faint dashed/low-contrast style (border-dashed border-surface2/40 bg-surface/30) that's hard to see.

FIX: (a) Project the FULL bracket structure forward — render R16/QF/SF/Final as PLACEHOLDER slots fed by the R32 winners (e.g. 'Winner R32-1', or the two feeding seed labels) using the official tree already encoded in src/lib/worldCupBracketTree.ts (R32_TO_R16 / R16_TO_QF / QF_TO_SF / SF_TO_FINAL) — so the bracket actually connects R32 -> Final and is traceable. These future slots are clearly-labelled projections with NO fabricated teams (placeholders until winners are known). (b) Make the matchup cards clearly visible (raise contrast of projected cards; legible flag + code/name + seed label). (c) Draw connectors only between populated columns; verify desktop (full bracket) + mobile (horizontal scroll) both look right.

## Acceptance Criteria

1) The Bracket Tree view visually renders as a connected bracket R32 -> R16 -> QF -> SF -> Final: R32 shows the 16 projected matchups (clearly visible, not faint), and R16/QF/SF/Final show placeholder slots fed by the official tree mapping so the structure is traceable across halves. 2) No fabricated future teams — undetermined slots are clearly-labelled placeholders ('Winner R32-x' / feeding seeds). 3) VISUAL QA: actually load the page (webapp-testing screenshot) and confirm the R32 matchups + connected structure are visible in BOTH light and dark, desktop and mobile — the data is already correct so the verifier MUST look at the rendered output. 4) REGRESSION TEST: node --test that the tree builds R16+ placeholder slots from R32 via the official mapping in worldCupBracketTree.ts. 5) build/lint/readability green; live-verified.
