---
id: wc-bracket-seeding
status: closed
deps: []
links: []
created: 2026-06-21T06:16:47Z
type: feature
priority: 1
parent: worldcup
tags: [worldcup, engagement, ux]
---
# Show seeding rationale on projected knockout matchups (why they meet)

On the PROJECTED knockout bracket (projected- matches in worldCupBracketFeed.ts / WorldCupBracket.tsx), show WHY each matchup occurs — the group-position seeding behind it. E.g. next to (or as a sub-line below) each projected tie: 'Country A — 1st Group A  vs  Country B — 2nd Group D'. This makes the projection legible/fun: users see it's the current group leaders/runners-up that would meet. The bracket feed already derives each team's group + current position when projecting, so attach that seeding info to the projected match (e.g. new optional fields like homeSeedLabel/awaySeedLabel on WorldCupMatch, populated only for projected ties) and render it. Confirmed/real fixtures do NOT need this label (only projected ones). Keep CX clean: small, subtle text (muted), tokens-themed, doesn't clutter the card; mobile-friendly. Apply to projected Round of 32 at minimum; ideally any projected round (label later rounds by their source tie, e.g. 'Winner R32-1', if easy — otherwise R32 is enough).

## Acceptance Criteria

1) Each PROJECTED knockout tie shows the seeding reason — both teams' group + position (e.g. '1st Group A' / '2nd Group D') — next to or below the matchup. 2) Derived from the same current-standings projection logic (no fabricated/hardcoded seeds); positions update as standings change. 3) Only projected ties get the label; confirmed fixtures are unaffected. 4) Subtle, muted, tokens-themed (dark+light), not cluttered, mobile-OK. 5) build + eslint + check:readability green; live-verified on rankings123.com.
