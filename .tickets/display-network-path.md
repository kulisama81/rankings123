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

## Notes

**2026-07-30T06:00:00Z**

**CRITICAL UPDATE (Autoresearch 2026-07-30):**

Ezoic now requires **250,000 monthly users** (as of Feb 2026) — NOT "no minimum" as originally stated in this ticket. This makes Ezoic IMPOSSIBLE for new/small sites like rankings123.

**Revised ad network path for small publishers:**
- **AdSense** (0+ traffic): $9-18 RPM for sports, no minimum traffic requirement
- **PropellerAds** (0+ traffic): No minimum, alternative/supplement to AdSense
- **Media.net** (best for US/UK/CA): Low/no minimum, contextual ads
- **Raptive** (25K+ pageviews/month): Lowered from 100K to 25K in Oct 2025
- **Mediavine** (50K+ sessions/month): Premium network, ~$20-30 RPM

**Ezoic is NO LONGER on the upgrade path.** Update docs/DESIGN.md §5 to reflect this market change.

**Sources:**
- Ezoic requirements: https://support.ezoic.com/kb/article/getting-started-ezoics-requirements
- AdSense vs Ezoic 2026: https://adsenseaudit.net/guides/adsense-vs-ezoic-which-is-better-for-new-sites
- Ad network transitions: https://www.panstag.com/2026/07/when-to-move-adsense-to-premium-ad-network.html
