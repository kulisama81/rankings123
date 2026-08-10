---
id: haptic-feedback-micro-interactions
status: closed
deps: []
links: []
created: 2026-07-12T07:45:00Z
type: feature
priority: 3
parent: rankings123
tags: [design, mobile, ux]
---
# Haptic feedback for mobile micro-interactions

Add tactile vibrations (haptic feedback) for key mobile interactions — button taps, rank changes, filter toggles, theme switches. Pairs visual animations with physical feedback for premium mobile feel. 2026 UX trend: visual + tactile = more engaging.

## Acceptance Criteria

- Haptic feedback triggers on:
  - Button/nav tab taps (light impact)
  - Rank change animations (subtle notification)
  - Filter toggle / theme switch (medium impact)
  - Top 3 rank tap (celebratory selection)
- Uses Web Vibration API (`navigator.vibrate()`) with fallback (no crash if unsupported)
- Vibration patterns: light (10ms), medium (20ms), celebratory ([10, 50, 10])
- Respects user preferences: check for reduced-motion or battery-saver mode (skip haptics)
- iOS Safari support (limited but works for basic patterns)
- Android Chrome full support
- No impact on desktop (graceful degradation)

## ROI

2026 mobile UX trend: haptic feedback standard on premium apps (not just visual-only). 62.54% of traffic is mobile (higher for sports) — tactile feedback increases engagement and perceived quality. Quick implementation (~2-3h), big premium feel on mobile. Differentiates from competitors (live-tennis.eu has no haptic).

## References

- Web Vibration API: https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API
- 2026 micro-interactions trend: visual + tactile pairing (Acodez report)
- iOS Safari: supports basic vibration patterns (10-50ms)

## Closed in backlog triage 2026-08-10
stale: speculative polish
