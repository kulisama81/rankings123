---
id: doubles-parity-critical
status: open
deps: []
links: []
created: 2026-08-09T13:48:34Z
type: feature
priority: 1
parent: rankings123
tags: []
---
# Doubles rankings (ATP/WTA) — Phase 1 parity CRITICAL

Build ATP and WTA doubles rankings pages. ALL major competitors have this: live-tennis.eu, FlashScore, SofaScore, ESPN. This is NOT a nice-to-have — it's table-stakes credibility. A rankings site without doubles = incomplete product.

## Acceptance Criteria

- /atp-doubles route renders top 100 ATP doubles teams with rank, names, points, movement
- /wta-doubles route renders top 100 WTA doubles teams with rank, names, points, movement  
- Data sources: ESPN doubles rankings API or WTA API doubles endpoint (api.wtatennis.com/tennis/players/ranked?type=rankDoubles)
- Mock fallback + source flag (espn/wta/mock) per data-veracity discipline
- Header nav includes Doubles links for both ATP and WTA sections
- Core Web Vitals pass (LCP < 2.5s, no layout shift)
- Mobile-responsive (verify on iPhone/Android via webapp-testing skill)
- npm run build green, eslint clean, no data-integrity violations

## Notes

**2026-08-09T13:48:47Z**

ROI JUSTIFICATION (First Principles):

Phase 1 = credibility parity. User visits our site for ATP singles rankings, sees 'Doubles' nav missing while live-tennis.eu has it → immediate credibility gap → trust erosion. Doubles is NOT a Phase 2 feature; it's foundational for a 'complete tennis rankings site' brand promise.

DATA SOURCES (research):
- WTA API: api.wtatennis.com/tennis/players/ranked?type=rankDoubles
- ATP: ESPN /sports/tennis/atp/rankings (doubles variant) or UTS doubles table
- Fallback: static mock from last known good data

EFFORT: LOW (2-4 hours) — copy existing singles table component, swap data source to doubles endpoint.
IMPACT: HIGH — fills a major parity gap that signals 'incomplete product' to users.
ROI: 10/10 — table-stakes feature, low effort, high credibility return.

COMPETITORS WITH THIS (all of them):
- live-tennis.eu ✅
- FlashScore ✅
- SofaScore ✅
- ESPN ✅
- Perfect Tennis ✅
