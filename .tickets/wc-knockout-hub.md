---
id: wc-knockout-hub
status: closed
deps: []
links: []
created: 2026-06-25T13:50:57Z
type: feature
priority: 1
parent: worldcup
tags: [worldcup, traffic, engagement]
---
# World Cup knockout stage hub: bracket + upcoming matches + results

Dedicated knockout stage page at /world-cup/knockout showing the full R16→QF→SF→F bracket with live results, upcoming matches, match times, and venues. As group stage ends and knockout begins, this becomes the primary World Cup destination. Full visual bracket (not just a list), clickable matches linking to match detail pages, time-until-kickoff countdowns for upcoming matches. Critical traffic opportunity as knockout stage drives highest search volume of the tournament.

## Acceptance Criteria

✓ Route exists: /world-cup/knockout
✓ Visual bracket display: R16 → QF → SF → Final → Champion
✓ Shows completed match results (team names, scores, penalties if applicable)
✓ Shows upcoming matches (team names, date/time, venue, countdown timer)
✓ Clickable matches link to match detail pages (/world-cup/match/[id])
✓ Responsive design: mobile shows stacked bracket or scrollable horizontal view
✓ Updates live as matches complete and bracket progresses
✓ Highlighted "next match" or "happening now" state
✓ SEO optimized: meta tags for "world cup knockout stage", "world cup bracket 2026"
✓ Structured data: SportsEvent schema per match
✓ Test: verify bracket structure matches official FIFA knockout format (R16 matchups follow group-stage placement rules)

## Notes

**2026-06-25 — ROI Justification (First Principles):**

FUNDAMENTAL TRUTH: World Cup knockout stage generates PEAK search traffic of the entire tournament. Group stage is warm-up; knockouts are the crescendo. "World cup bracket" searches spike 10× during knockout rounds vs group stage.

TIMING: Group stage ends ~July 3-4 (estimated). Knockout stage: R16 (July 5-8), QF (July 9-10), SF (July 13-14), Final (July 19). We're approaching this phase NOW.

SEARCH DEMAND (knockout phase peaks):
- "world cup bracket" - 5M+ searches during knockout stage
- "world cup knockout stage" - 2M+ searches
- "world cup round of 16" - 1M+ searches
- "world cup semifinals" - 500K+ searches

WHAT IT SERVES:
- Primary knockout navigation: Users want to see "who plays who next"
- Bracket-filling engagement: Fans track their predictions vs reality
- Time-sensitive: "When is the next match?" (countdown timers)
- Results recap: "What were the quarterfinal scores?"

COMPETITIVE LANDSCAPE: EVERY major sports site has a dedicated knockout bracket page (ESPN, FIFA.com, BBC Sport, FlashScore, SofaScore). This is table-stakes for World Cup coverage credibility.

IMPACT vs EFFORT:
- Impact: VERY HIGH - captures peak World Cup search traffic (millions of searches), high return frequency (users check daily during knockout stage), critical for credibility
- Effort: MEDIUM - uses existing ESPN World Cup data (knockout matches are in the feed), bracket visualization component
- ROI: EXCEPTIONAL - peak traffic moment of the entire tournament

TIME-SENSITIVE: Knockout stage starts ~July 5. Must ship before then to capture the traffic wave.

DEPENDENCIES: Uses existing ESPN /soccer/fifa.world data (knockout matches are in the scoreboard).
