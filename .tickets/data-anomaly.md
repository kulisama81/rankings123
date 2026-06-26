---
id: data-anomaly
status: open
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

## Anomalies (latest run · 2026-06-26T22:00:00.906Z)
- [worldcup-bracket] United States vs Paraguay — both from Group D (impossible)

## Log
- 2026-06-26T22:00:00.906Z: 1 anomalies — [worldcup-bracket] United States vs Paraguay — both from Group D (impossible)

