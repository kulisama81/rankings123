---
id: typography-system-refinement
status: closed
deps: []
links: []
created: 2026-07-19T14:35:27Z
type: feature
priority: 2
parent: rankings123
tags: [design, typography, polish]
---
# Typography system amplification — intentional Geist+Archivo pairing

Clay Partstack article (July 14, 2026): Two-typeface system pairs personality (Aeonik) with readability (Inter) at small sizes. Rankings123 has Geist Sans + Archivo but system is underutilized. Need more intentional application: Archivo for bold display moments (hero, page titles, rank #1), Geist Sans for data-dense tables/body. Current state: both used interchangeably, no dramatic scale contrast.

## Acceptance Criteria

- Audit all typography: categorize Display vs Body vs Data | - Archivo extrabold 900 for hero headlines, page titles, podium ranks (#1-3) | - Geist Sans for tables, body text, metadata | - Dramatic scale contrast: whisper-to-shout (rank #1 huge, rank #50 smaller) | - Letter-spacing refinement: -0.02em on display, normal on body | - Update globals.css font-display class documentation | - Test dark + light + 3 design variants | - Mobile scale: 2xl-3xl hero (not 5xl), readable at 375px width
