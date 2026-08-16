---
id: cincinnati-live-scores
status: closed
deps: []
links: []
created: 2026-08-15T13:49:21Z
type: feature
priority: 0
parent: rankings123
tags: [tennis, tournament, timely, revenue]
---
# Cincinnati Open 2026 live scores widget (Aug 11-23)

DEADLINE: Cincinnati Open ENDS Aug 23 (8 days). Tournament is LIVE NOW.

ENGAGEMENT CATALYST: Live match scores = fans check 5-20× during tournament vs rankings 1×/week. Each check = ad impression + betting affiliate opportunity.

SIMPLEST BUILD: Homepage widget showing Cincinnati matches in-progress. Reuse existing ESPN scoreboard API integration (/sports/tennis/atp/scoreboard filtered to Cincinnati). Mobile-first card design.

REVENUE TIE-IN: Links to betting guide ticket (cincinnati-betting-guide). Live scores drive betting clicks (real-time odds change).

ROI: 9/10 — Time-sensitive (8 days), HIGH engagement multiplier, REUSES existing API.

## Acceptance Criteria

✅ Homepage widget: 'Cincinnati Open - Live Now'
✅ Shows in-progress matches from ESPN scoreboard API
✅ Filters to Cincinnati tournament only
✅ Card shows: Player names, current score, set count
✅ Click → betting guide or match detail (if exists)
✅ Auto-hides when no Cincinnati matches active
✅ Mobile-optimized card
✅ Build green

## Notes

**2026-08-16T00:22:15Z**

COMPLETE: Live scores widget shipped to homepage, shows both ATP and WTA Cincinnati Open matches (Aug 11-23). Auto-refreshes every 2 minutes, auto-hides outside tournament dates. Verified through adversarial review.
