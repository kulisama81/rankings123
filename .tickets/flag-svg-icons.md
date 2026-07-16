---
id: flag-svg-icons
status: open
deps: []
links: []
created: 2026-07-16T00:00:00Z
type: feature
priority: 2
parent: rankings123
tags: [design, icons]
---
# Replace country flag emojis with SVG flag component

Replace all country flag emojis across the site with a cohesive SVG flag sprite system. Currently flags use `String.fromCodePoint()` emoji generation, which is functional but not aligned with the premium visual identity.

## Acceptance Criteria

- Create `FlagIcon` component that renders SVG flags from a sprite sheet
- Source/create SVG flags for ~50 countries (tennis, football, cycling)
  - Recommend: flagicons.lipis.dev or similar open-source flag sprite library
- Update all ranking feed generators to return country codes instead of flag emojis
  - `src/lib/flags.ts` - replace `flagEmoji()` with country code return
  - `src/lib/liveFeed.ts` - ATP/WTA player data
  - `src/lib/worldCupFeed.ts` - team/player data
  - `src/lib/cyclingFeed.ts` - rider data
- Update all display components to use `<FlagIcon code={countryCode} />`
  - LiveRankingTable (ATP/WTA)
  - AtpDeepRankingTable
  - WorldCupTable, WorldCupScenarios, WorldCupTeamStats
  - TdfJerseys, TdfGCTable, UciRankingTable
- Flags maintain current size/position in layouts
- Flags adapt to dark/light themes (same as other icons)
- Performance: sprite sheet <50KB, loaded once and cached
- Accessibility: proper aria-labels with country names

## Context

Deferred from ticket `sport-hero-imagery` during design lane sprint. The hero imagery and UI icon system are complete; flag replacement is the final emoji-to-SVG conversion needed for visual maturity.

## Estimated Effort

2-4 hours (sprite integration + data layer changes + component updates)

## ROI

Medium. Completes the visual identity transition from emojis to custom SVG iconography. Less impactful than hero imagery (already shipped) but necessary for a cohesive premium feel.
