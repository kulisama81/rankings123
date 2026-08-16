---
id: race-to-finals-atp-wta
status: in_progress
deps: []
links: []
created: 2026-08-15T13:49:06Z
type: feature
priority: 1
parent: rankings123
tags: [tennis, parity, engagement]
---
# ATP/WTA Race to Finals rankings (Phase 1 parity)

PARITY GAP: live-tennis.eu shows Race rankings (YTD points, resets Jan 1). We don't. Fans track who qualifies for year-end Finals (top 8).

DATA: WTA api.wtatennis.com/tennis/players/ranked?type=raceToFinals, ATP via ESPN or UTS.

FIRST-PRINCIPLES ROI: Race changes FASTER than 52-week (more volatile = more checking). Narrative driver Aug-Nov: 'Who makes Turin/Riyadh Finals?'. Easy differentiation (most sites don't show Race).

IMPACT: 8/10 — Parity gap, LOW effort (reuse table component), HIGH engagement.

## Acceptance Criteria

✅ Routes: /atp-race, /wta-race
✅ Table: Rank, Player, YTD Points, Tournaments Played
✅ Live overlay (merge scoreboard)
✅ Top 8 highlighted (Finals cutoff)
✅ 'Race to Turin/Riyadh' branding
✅ Nav links from ATP/WTA Live pages
✅ SEO meta optimized
✅ Mock fallback + source flag
✅ Mobile responsive
✅ Build green, lint clean
