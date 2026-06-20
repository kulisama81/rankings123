---
id: wc-knockout-live
status: open
deps: []
links: []
created: 2026-06-20T22:46:10Z
type: feature
priority: 1
parent: worldcup
tags: [worldcup, engagement, seo]
---
# Projected live knockout bracket (BBC-style)

Like BBC's World Cup schedule (bbc.com/sport/football/world-cup/schedule#KnockoutStage), build a
**projected knockout bracket that fills in live from the CURRENT group standings — it does NOT wait
for the group stage to finish.** It's a fun, engaging "here's what the knockout matchups could look
like right now" preview: take the current group positions (each group's 1st & 2nd, plus the
best-ranked 3rd-placed teams) and slot them into the FIFA 2026 bracket (Round of 32 -> R16 -> QF ->
SF -> Final). It re-projects as standings change with every result.

KEY DISTINCTION FROM THE GROUP-TABLE FIX: here the projection IS the feature and is welcome — the only
rule is it must be **clearly labelled as a projection** (e.g. a header note "Projected from current
standings — updates live, not yet confirmed", and a subtle projected/provisional treatment on ties
that aren't locked yet). We do NOT pass projections off as confirmed fact. As real results lock a
slot (and once ESPN publishes actual knockout fixtures with dates/venues), switch that tie from
"projected" to confirmed and show the real schedule.

Build on the existing bracket (wc-knockout, wc-future — both closed): add the live-projection logic +
the projected/confirmed labelling. FIFA 2026 = 12 groups, top 2 + 8 best third-placed teams reach the
Round of 32; the best-thirds ranking + bracket slot assignment is the tricky bit — an approximation is
fine if documented and clearly labelled as a projection.

## Acceptance Criteria

1) /world-cup shows a projected knockout bracket (R32 -> Final) derived from the CURRENT standings,
   without waiting for the group stage to end; it re-projects as results land.
2) The bracket is clearly labelled as a projection from current standings (header note + per-tie
   provisional treatment); projections are never presented as confirmed outcomes.
3) Projected ties show the current group-position teams (flags + names); when a team/slot is
   mathematically locked or ESPN publishes the real fixture, that tie flips to confirmed (with real
   date, local-tz kickoff, venue/city when available).
4) Uses the real ESPN standings/bracket data; keyless + mock-fallback + source flag; degrades
   gracefully. SEO-friendly; tokens-themed (dark+light); build + eslint + check:readability green;
   live-verified on rankings123.com.
