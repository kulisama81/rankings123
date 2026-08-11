---
id: tennis-live-points-accuracy
status: open
deps: []
links: []
created: 2026-08-11T13:50:02Z
type: task
priority: 1
parent: rankings123
tags: [tennis, data-quality, accuracy]
---
# Tennis live-points accuracy audit — validate ESPN scoreboard point estimation vs reality

ACCURACY UNKNOWN: We estimate live points from round-reached × tier points table (R64=10, R32=45, R16=90, QF=180, etc). But we've NEVER validated this against real post-tournament rankings. If our estimates are systematically wrong (off by 10-50 points per player), live rankings are fiction. FIRST-PRINCIPLES: Data accuracy is BINARY — either our live points match ATP/WTA official or they don't. CANNOT SHIP CONFIDENT PRODUCT WITHOUT KNOWING. RISK: If estimates are wrong, users compare our 'live ranking' to official and see mismatches → trust destroyed → never return. OPPORTUNITY: If estimates are CORRECT (within ±5%), we have differentiation vs competitors. But we don't know which.

## Acceptance Criteria

1. Sample audit: Pick 3 recent ATP tournaments (Cincinnati, Canadian Open, recent Masters) + 3 WTA tournaments. 2. Compare our live-points estimates during tournament to official ATP/WTA rankings published AFTER tournament. 3. Calculate error: For top 20 players per tournament, measure (our estimate - official points). 4. Report findings: Mean error, max error, % within ±5%, % within ±10%. 5. Document results in docs/reports/tennis-live-accuracy-audit.md with recommendations (keep current estimation, refine points table, switch to different source). 6. If error >10% for >25% of players: file P0 ticket to fix estimation logic. TEST: Manually verify 1 player's points for 1 tournament against official published ranking. ROI: 3-4 hours effort (data collection + analysis), VALIDATES or INVALIDATES core product value (live rankings accuracy). If accurate → differentiation proof. If inaccurate → critical bug we must fix.
