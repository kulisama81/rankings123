---
id: analytics
status: closed
deps: [gdpr-consent]
links: []
created: 2026-06-14T22:53:14Z
type: feature
priority: 2
parent: tennis-site
tags: [analytics, revenue]
---
# Web analytics integration (visitors/pageviews)

GA4 (Google Analytics 4) for visitors/pageviews/sessions, paired with AdSense for revenue. MUST load only after GDPR consent in EU (depends on gdpr-consent). Feeds daily report + improvement loop.

## Acceptance Criteria

Visitor + pageview data visible in a dashboard and queryable for the daily report; no measurable CLS/perf hit; consent-compliant.

## Notes

**2026-06-15T00:29:56Z**

GA4 Measurement ID provided by Loic: G-GDM8YNM3SM. Implementing via next/script with Consent Mode v2 (analytics_storage default denied) + consent banner to grant; satisfies gdpr-consent too.
