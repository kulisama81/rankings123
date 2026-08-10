---
id: adsense-approval-checklist
status: closed
deps: []
links: [blog-infrastructure, tdf-2026-predictions, wc-knockout-predictions]
created: 2026-06-21T00:00:00Z
type: task
priority: 1
parent: rankings123
tags: [revenue, adsense, handoff]
---
# AdSense approval readiness checklist + application

Track AdSense approval requirements and apply when ready. 2026 requirements: 10-25 high-quality articles (800-1500+ words), domain age 3-6 months, essential pages (Privacy ✓, About ✓, Contact ✓, Terms ✓), some genuine traffic, comply with Google policies. Approval timeline: 3-5 days average.

**Current status check:**
- Articles: 0/10 minimum (need blog-infrastructure + prediction articles)
- Domain age: unknown (check whois)
- Essential pages: ✓ have Privacy, Terms, Cookies, Contact
- Traffic: 65 pageviews over 28 days (very low, but no minimum stated)
- Policies: sports content compliant

**Blockers:** Need 10+ articles first. Estimated timeline: 2-4 weeks after blog-infrastructure ships + prediction content published.

**HANDOFF:** Loic creates AdSense account + applies when checklist complete. This ticket tracks readiness, not implementation.

## Acceptance Criteria

Document current AdSense readiness status, track article count toward 10-25 goal, verify domain age, confirm policy compliance, create AdSense application checklist, HANDOFF to Loic when ready (10+ articles published + 3+ months domain age). Do not apply early (auto-rejection hurts).

## Notes

**2026-06-21 (autoresearch)**

**2026 AdSense requirements (researched):**
- Content: 10-25 high-quality articles (800-1500+ words) — quality > quantity
- Domain age: 3-6 months preferred (Google sees older domains as long-term projects)
- Essential pages: Privacy Policy ✓, About Us ✓, Contact ✓, Terms ✓ (we have these)
- Navigation: clear site structure ✓
- Traffic: no official minimum, but "some genuine traffic" helps (we have 65 pageviews over 28 days)
- Policies: comply with Google Program Policies (sports content is fine)
- Timeline: 3-5 days approval for sites meeting criteria

**Article roadmap toward 10 minimum:**
1. TdF 2026 predictions (tdf-2026-predictions)
2. WC knockout predictions (wc-knockout-predictions) — updates count as 4 articles
3. Tennis Grand Slam predictions (Wimbledon, US Open, etc.)
4. Player profile articles (top players, rivalries)
5. Stats analysis articles (records, milestones, trends)

**Revenue context:** AdSense is lowest-tier monetization (Ezoic/Mediavine require 10K-50K monthly sessions), but it's the entry point. Higher-RPM path is betting affiliates ($25-500 CPA vs AdSense pennies).

**Sources:**
- https://webtimizesolutions.com/blog/google-adsense-approval-guide-2026-complete-genuine-updated-information/
- https://www.stackedbuddy.com/google-adsense-approval-checklist/
- https://educareerguides.com/adsense-approval-guide-2026/

## Readiness gate (2026-07-26) — apply only when ALL are true

- [ ] /about live (see about-page)
- [ ] /contact live (see contact-page)
- [ ] privacy + cookies + terms live (DONE — all 200)
- [ ] several original articles published (thin now — SEO/content lanes producing; avoids "low-value content" rejection)
- [ ] site has some organic footprint in GSC (just indexed 2026-07-26 — give it ~2 weeks)
- [ ] ads.txt ready to publish post-approval (see ads-txt)
NOTE: gambling/betting pages may get limited AdSense serving — betting affiliate is the better monetization for those. Duplicate ads.txt/adsense tickets closed; this + ads-txt + adsense-slot-infrastructure are the canonical set.

## Closed in backlog triage 2026-08-10
dup: adsense-apply-now
