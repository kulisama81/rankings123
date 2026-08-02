---
id: high-contrast-minimal-mode
status: open
deps: []
links: []
created: 2026-08-02T00:00:00Z
type: feature
priority: 3
parent: rankings123
tags: [design, theme, accessibility, focus]
---
# High-contrast minimal color mode (2-color system)

**Noomo Showcase (Awwwards Site of the Day, Aug 1, 2026):** Award-winning design uses just 2 colors — electric blue + near-black — for maximum visual impact and zero distraction. Rankings123 currently has 4 per-sport accents (ATP lime, WTA magenta, WC green, cycling amber) which adds vibrancy but can feel busy when switching between sports.

**Opportunity:** Add a "Focus Mode" theme option — ultra-minimal 2-color high-contrast variant for users who want data-only, zero visual noise.

## Design Approach

- **2-color palette:** Single accent (user-selected or adaptive: blue/green/purple) + true black/white
- Remove per-sport accent switching — one consistent accent across all pages
- Simplified cards: no gradients, no glass, sharp borders only
- Typography emphasis: data/numbers even larger, labels smaller/muted
- Motion reduced to essentials: no pulse dots, only functional transitions
- Designed for: power users, accessibility, low-vision, focus/concentration scenarios

## Acceptance Criteria

- New theme variant: "Focus Mode" (joins Court/Broadcast/Classic in design switcher)
- 2-color system: bg-black (#000000) / bg-white (#FFFFFF) + single accent color
- Accent color picker: 6 options (Blue, Green, Purple, Red, Amber, Cyan) — applies globally, no per-sport switching
- No gradients, no backdrop-blur, no glass — solid fills only
- Typography scale amplified: rank numbers +20% larger, metadata -10% smaller vs default
- Motion minimal: prefers-reduced-motion patterns always active in Focus Mode
- High contrast ratios: AAA level (7:1+) for all text
- Mobile: theme persists across sessions (localStorage)
- Settings: "Focus Mode reduces motion and visual complexity for concentration"

## References

- Noomo Showcase (Awwwards Aug 1, 2026): 2-color system (#0004EB blue + #020411 near-black) scored 7.79/10 creativity
- Accessibility: AAA contrast benefits low-vision users
- Power user pattern: minimal UI for data-dense professionals (trading terminals, analytics dashboards)
