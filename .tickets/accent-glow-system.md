---
id: accent-glow-system
status: open
deps: []
links: []
created: 2026-06-28T14:32:41Z
type: feature
priority: 3
parent: rankings123
tags: [design]
---
# Accent-colored glow/shadow system for emphasis

Introduce subtle accent-colored glow effects on active/focused elements (cards, buttons, nav tabs) to strengthen the per-sport color identity. Think: soft box-shadow in accent color on hover/focus.

## Acceptance Criteria

- Define 2-3 glow levels (subtle, medium, strong) in globals.css using accent token
- Apply to: active nav tabs, card hover states, primary buttons, focus states
- GPU-cheap (box-shadow or filter: drop-shadow, not heavy blur layers)
- Respects prefers-reduced-motion (glow stays, transition disabled)
- Works in dark + light themes (glow opacity adjusted per theme)
- Reinforces 'live' feel with accent color
