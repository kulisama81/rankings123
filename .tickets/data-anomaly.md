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

## Anomalies (latest run · 2026-06-28T22:14:03.447Z)

- [worldcup] South Africa (RSA): standings show 3 matches played, but schedule shows 4 completed/in-progress (stale standings)
- [worldcup] Canada (CAN): standings show 3 matches played, but schedule shows 4 completed/in-progress (stale standings)

## Log

- 2026-06-28T23:30:00.000Z: **RESOLVED** — Root cause: false positive in the sanity check. The check was counting ALL completed matches (including cross-group/knockout matches like RSA vs CAN) against group-stage standings. Fixed `scripts/check-data-sanity.mjs` to only count group-stage matches (where both teams are in the same group). Group standings correctly show 3 matches played (the group-stage maximum); the 4th match was cross-group and shouldn't count toward group standings.
- 2026-06-28T22:14:03.447Z: 2 anomalies — [worldcup] South Africa (RSA): standings show 3 matches played, but schedule shows 4 completed/in-progress (stale standings) (…)
- 2026-06-28T22:02:47.674Z: 2 anomalies — [worldcup] South Africa (RSA): standings show 3 matches played, but schedule shows 4 completed/in-progress (stale standings) (…)
- 2026-06-28T22:01:32.827Z: 2 anomalies — [worldcup] South Africa (RSA): standings show 3 matches played, but schedule shows 4 completed/in-progress (stale standings) (…)
- 2026-06-28T22:00:37.625Z: 2 anomalies — [worldcup] South Africa (RSA): standings show 3 matches played, but schedule shows 4 completed/in-progress (stale standings) (…)
- 2026-06-28T22:00:00.498Z: 2 anomalies — [worldcup] South Africa (RSA): standings show 3 matches played, but schedule shows 4 completed/in-progress (stale standings) (…)
- 2026-06-28T12:00:00.000Z: **RESOLVED** — Verified check passes consistently (3 runs). Root cause: transient ESPN API lag (standings API briefly lagging scoreboard API within the 60s cache window). The underlying fix (commit a4c9243: synchronized standings/scoreboard caching to 60s) is already deployed and working. The detected anomalies were temporary API lag that has now self-resolved. No code changes needed.
- 2026-06-28T04:00:00.914Z: 4 anomalies — [worldcup] Argentina (ARG): standings show 2 matches played, but schedule shows 3 completed/in-progress (stale standings) (…)
- 2026-06-28T01:00:01.080Z: 4 anomalies — [worldcup] Colombia (COL): standings show 2 matches played, but schedule shows 3 completed/in-progress (stale standings) (…)
- 2026-06-27T22:00:01.200Z: 4 anomalies — [worldcup] England (ENG): standings show 2 matches played, but schedule shows 3 completed/in-progress (stale standings) (…)
- 2026-06-26T22:28:23.455Z: 1 anomalies — [worldcup-bracket] United States vs Paraguay — both from Group D (impossible)
- 2026-06-26T22:30:00.000Z: **RESOLVED** — Fixed third-place assignment logic in `worldCupBracketFeed.ts`. Removed fallback that allowed invalid group assignments. All projected R32 matches now respect the official FIFA bracket template constraints (no same-group matchups). Verified locally: check passes.
- 2026-06-26T22:26:14.356Z: 1 anomalies — [worldcup-bracket] United States vs Paraguay — both from Group D (impossible)
- 2026-06-26T22:24:41.615Z: 1 anomalies — [worldcup-bracket] United States vs Paraguay — both from Group D (impossible)
- 2026-06-26T22:00:00.906Z: 1 anomalies — [worldcup-bracket] United States vs Paraguay — both from Group D (impossible)
