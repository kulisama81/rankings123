---
id: premium-mobile-swipe-gestures
status: open
deps: []
links: []
created: 2026-07-26T00:00:00Z
type: feature
priority: 2
parent: rankings123
tags: [design, mobile, premium]
---
# Premium mobile swipe gestures — 62% traffic is mobile

2026 mobile-first research: 62% of global traffic is mobile, sports skews even HIGHER (fans check scores on phones). Rankings123 mobile tables work but feel basic. Premium pattern: swipe gestures reveal actions (swipe left on player row → "Share rank", swipe right → "Compare"). Haptic feedback (vibration) on interaction. iPhone/Android sports apps (ESPN, SofaScore) do this — we should too.

Builds on existing `mobile-table-gestures` ticket (open) — adds premium swipe-to-reveal + haptic feedback.

## Acceptance Criteria

- Swipe gestures on table rows (mobile only, touch-enabled):
  - Swipe left 30% → reveals action menu: "Share rank" + "View profile"
  - Swipe right 30% → reveals "Compare with..." (opens comparison modal)
  - Full swipe (60%+) → executes primary action immediately
- Haptic feedback: light vibration (10ms) on swipe threshold reached (iOS: `navigator.vibrate(10)`)
- Visual feedback: row background slides with finger, action icons fade in at 20% swipe
- Cancel swipe: release before 30% threshold → row springs back (physics easing)
- Swipe lock: can't swipe multiple rows simultaneously, first touch wins
- Accessibility: actions also available via long-press menu (for users who can't swipe)
- Performance: 60fps during swipe (transform only, no layout), passive touch listeners
- Respect `prefers-reduced-motion`: disable swipe animations, show action buttons directly
- Haptic disabled if `navigator.vibrate` unsupported (older browsers) or user disabled in OS settings
- Apply to: ATP/WTA ranking tables, World Cup standings, TdF GC classification
- Library: Framer Motion gestures API or custom touch handlers (evaluate perf)
- Example: swipe left on Swiatek row → "Share rank" + "View profile" buttons slide in from right, light haptic buzz
