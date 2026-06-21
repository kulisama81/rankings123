---
id: wc-bracket-official
status: closed
deps: []
links: []
created: 2026-06-21T06:39:40Z
type: bug
priority: 1
parent: worldcup
tags: [worldcup, data, bug]
---
# Projected bracket uses real FIFA 2026 R32 template (not invented pairings)

Projection paired teams by array index (qualified[i] vs qualified[31-i]), inventing matchups like 2C vs 2F. Replace with the official FIFA 2026 Round of 32 bracket template; thirds approximated within their allowed groups; clearly labelled projection.

## Acceptance Criteria

Projected R32 follows the official FIFA template (e.g. 2C plays 1F, 2F plays 1C; runner-up pairings only where official); winner/runner-up slots exact; build/lint green; live-verified.
