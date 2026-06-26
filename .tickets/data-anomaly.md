---
id: data-anomaly
status: closed
deps: []
links: []
created: 2026-06-26T22:00:00.906Z
type: bug
priority: 0
parent: rankings123
tags: [data, bug, monitor]
---
# Data anomaly detected (automated sanity check)

`scripts/check-data-sanity.mjs` found served data that fails real-world invariants — likely
fabricated, mis-parsed, or mis-sourced. **Planner: investigate the relevant feed/parse logic,
fix it, re-run `npm run check:data-sanity` until clean, log the resolution in the Log below,
then close this ticket.** Do NOT close while `check:data-sanity` still reports errors.

## Anomalies (latest run · 2026-06-26T22:28:23.455Z)

- [worldcup-bracket] United States vs Paraguay — both from Group D (impossible)

## Log

- 2026-06-26T22:28:23.455Z: 1 anomalies — [worldcup-bracket] United States vs Paraguay — both from Group D (impossible)
- 2026-06-26T22:30:00.000Z: **RESOLVED** — Fixed third-place assignment logic in `worldCupBracketFeed.ts`. Removed fallback that allowed invalid group assignments. All projected R32 matches now respect the official FIFA bracket template constraints (no same-group matchups). Verified locally: check passes.
- 2026-06-26T22:26:14.356Z: 1 anomalies — [worldcup-bracket] United States vs Paraguay — both from Group D (impossible)
- 2026-06-26T22:24:41.615Z: 1 anomalies — [worldcup-bracket] United States vs Paraguay — both from Group D (impossible)
- 2026-06-26T22:00:00.906Z: 1 anomalies — [worldcup-bracket] United States vs Paraguay — both from Group D (impossible)
