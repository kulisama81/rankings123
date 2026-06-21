---
id: button-state-system
status: open
deps: []
links: []
created: 2026-06-21T00:00:00Z
type: feature
priority: 2
parent: rankings123
tags: [design, ux, a11y]
---
# Button 6-state interaction system (Clay 2026)

Implement comprehensive 6-state button system per Clay blog 2026 best practices: enabled, hover, focus, pressed, disabled, loading. Apply to nav tabs, theme toggle, design switcher, filter controls, and any future CTAs. Ensure WCAG 2.2 visible focus rings, 44×44px minimum touch targets on mobile, and specific action labels.

## Acceptance Criteria

- All interactive buttons/controls have 6 states visually designed
- Focus rings visible and WCAG 2.2 compliant (never obscured by sticky nav)
- Touch targets ≥44×44px on mobile (test on real device)
- Loading state maintains action context ("Saving..." not just spinner)
- Disabled states include explanatory helper text where applicable
- Hover transitions smooth (150–200ms), pressed state provides instant feedback
- Works across dark/light themes + all 3 design variants

## References

- Clay blog: "Complete Guide to Buttons in Web Design for 2026"
- Current nav tabs (good starting point, needs refinement)
- ThemeToggle + DesignSwitcher components
