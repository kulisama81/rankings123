---
id: display-network-path
status: open
deps: []
links: []
created: 2026-06-15T05:51:32Z
type: task
priority: 3
parent: rankings123
tags: [ads, revenue, strategy]
---
# Display ad network upgrade path (AdSense -> Ezoic -> Mediavine)

Track traffic vs network thresholds and swap to higher-RPM display networks as we grow: AdSense now -> Ezoic (no minimum, ~2-3x) -> Mediavine (~50k sessions/mo) / Raptive (~100k pageviews/mo). Keep ad integration network-agnostic so swapping is config, not a rebuild. Autoresearch should flag when we cross a threshold.

## Acceptance Criteria

Ad slots are network-agnostic; a documented threshold checklist exists; report flags when we qualify for the next tier.
