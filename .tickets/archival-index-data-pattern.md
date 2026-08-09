---
id: archival-index-data-pattern
status: open
deps: []
links: []
created: 2026-08-09T00:00:00Z
type: feature
priority: 2
parent: rankings123
tags: [design, engagement, differentiation]
---
# Archival Index data storytelling pattern (2026 premium trend)

2026 Design Trends Research (Figma, Squarespace, Wix): "Archival Index" transforms structured data into visual storytelling — nostalgic approach to collecting/archiving information with grids, labels, detailed annotations. Design relies on neutral palettes, carefully organized layouts, and detailed labeling.

**Why it fits rankings123:** Sports are inherently archival (historical records, season progressions, tournament brackets). This pattern makes rankings FEEL like a curated sports almanac vs generic spreadsheet.

**Examples:** Tournament bracket as annotated timeline with match notes, historical rank progression charts with milestone callouts, season archive grids with labeled eras.

**Differentiation:** Live-tennis.eu presents raw tables. Rankings123 can present data as *stories* — structured, labeled, contextual.

## Acceptance Criteria

- Create archival index treatment for ONE historical view: either ATP/WTA historical rankings timeline OR World Cup tournament archive
- Grid-based layout with detailed labels (dates, milestones, context annotations)
- Neutral color palette (muted grays + sport accent for highlights)
- Typography: small-caps labels, tabular numbers, serif for editorial notes (Classic design variant fits well)
- Metadata prominence: "Updated X", "Source: Y", "Coverage: Z" clearly labeled
- Hover/tap reveals contextual annotations (e.g., "First #1 ranking" on player timeline)
- Maintains scannability — data still hero, labels enhance vs obscure
- Mobile: stacked cards with labels inline (maintains archival feel, adapts to narrow screens)
- Add to one existing page (e.g., "/tennis/history" or "/world-cup/archive") with toggle between table view and archival view
- Accessibility: labels are real text (not decorative), semantic HTML (dl/dt/dd for label/value pairs)
