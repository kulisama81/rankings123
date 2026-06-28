---
id: mobile-table-patterns
status: open
deps: []
links: []
created: 2026-06-28T14:32:34Z
type: feature
priority: 2
parent: rankings123
tags: [design, mobile]
---
# Mobile-first responsive table patterns

Dense ranking tables don't just shrink well on mobile. Implement mobile-optimized patterns: card-based views, swipeable columns, collapsible details, or horizontal scroll with sticky rank column.

## Acceptance Criteria

- Tables remain scannable on 375px viewport (iPhone SE)
- Rank + Name + Points always visible (no horizontal scroll for key data)
- Secondary data (tournament, movement) accessible via expand/collapse or horizontal scroll
- Touch targets ≥44px (WCAG 2.2)
- Test on real devices (iOS Safari, Android Chrome)
- No layout shift on orientation change
- Mobile UX feels native, not desktop-cramped
