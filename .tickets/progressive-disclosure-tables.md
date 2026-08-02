---
id: progressive-disclosure-tables
status: open
deps: []
links: []
created: 2026-08-02T00:00:00Z
type: feature
priority: 2
parent: rankings123
tags: [design, tables, ux, cognitive-load]
---
# Progressive disclosure for ranking tables

**Cognitive load research:** Showing 1000-row tables all at once overwhelms users and slows page performance. Progressive disclosure (show essential data first, reveal details on demand) reduces cognitive load and improves scannability.

**Current issue:** ATP deep rankings show ~1000 rows in single table. WTA/World Cup similar. Users scroll endlessly to find mid-ranked players. Most users care about top 20 + their favorite player.

## Progressive Disclosure Patterns

1. **Collapsible rank bands:** Show top 20 expanded, bands 21-50, 51-100, 101-200, 200+ collapsed
2. **"Load more" pagination:** Initial load shows top 50, "Load next 50" button (infinite scroll option)
3. **Jump to rank:** Quick navigation input "Go to rank #..." with autocomplete
4. **Favorite player pin:** Star icon to pin specific players to top (localStorage persisted)
5. **Contextual expansion:** Hover row → expand to show hidden columns (tournaments played, win %, etc.)

## Acceptance Criteria

- Top 20 ranks always visible on initial load (expanded)
- Rank bands 21-50, 51-100, 101-200, 200+ appear as collapsed sections: "Ranks 21-50 (30 players) ▼"
- Click band header → expands inline, smooth height transition (300ms)
- "Jump to rank" input in table header: numeric input + "Go" button, scrolls + highlights target row
- Favorite players: star icon in row → pins to "Favorites" section above main table (max 10 pins)
- Mobile: bands 1-10, 11-25, 26-50, 50+ (smaller chunks for scroll performance)
- URL state: `?rank=42` expands relevant band and scrolls to rank #42
- Keyboard nav: arrow keys move between rows, Enter expands/collapses bands
- Performance: render only visible rows (virtual scrolling for 1000+ rows)

## References

- Clay cognitive load: "Clear hierarchy and fewer distractions cut cognitive load, improve readability, lift conversions"
- Nielsen Norman Group: progressive disclosure reduces overwhelm in data-heavy interfaces
- Current perf issue: 1000-row tables cause layout thrashing on mobile
