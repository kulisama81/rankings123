#!/bin/sh
# Planner lane runner — invoked by cron with a short, safe command line.
#
# Why this exists: putting the full ~1300-char planner prompt (with em-dashes,
# parens, brackets, nested quotes) directly in a crontab line makes /bin/sh
# fail to parse it ("syntax error: unexpected end of file"), so the lane never
# runs. Cron lines MUST stay short and call this script instead. All the fragile
# prompt text lives here, in a normal shell script, where it's safe.
#
# Usage: run-planner-lane.sh <lane>
#   lane ∈ seo | tennis | cycling | design | growth | general
set -u
cd /Users/loideniel/Workspace/rankings123 || exit 1

LANE="${1:-general}"
CLAUDE=/Users/loideniel/.local/bin/claude
LOG=.claude/planner-cron.log
STAMP() { date '+%Y-%m-%d %H:%M:%S'; }

case "$LANE" in
  seo)      SCOPE="SEO/growth tickets (tagged seo or growth): meta, structured data, indexing, content hubs. Traffic is the #1 bottleneck." ;;
  tennis)   SCOPE="tennis tickets (tagged tennis/atp/wta). US Open 2026 build-up is the next big window." ;;
  cycling)  SCOPE="cycling tickets (tagged cycling). Use the Wikipedia API (keyless) for data, never PCS (Cloudflare-blocked)." ;;
  design)   SCOPE="design tickets (tagged design): the distinctive-identity backlog per docs/DESIGN-IDENTITY.md." ;;
  growth)   SCOPE="SEO/growth + revenue-enablement tickets (tagged seo/growth/revenue) that need no human handoff." ;;
  general)  SCOPE="bug/perf/data/infra/CX/homepage tickets and anything untagged." ;;
  *)        echo "unknown lane: $LANE"; exit 1 ;;
esac

PROMPT="You are @planner running the ${LANE} lane via cron. Read .claude/agents/planner.md and CLAUDE.md and follow the verified loop EXACTLY. git pull --rebase origin main first. Work ONLY on ${SCOPE} Pick the top unblocked highest-ROI such ticket and ship it through the full verified loop: build, eslint, check:data-integrity, check:readability, npm test, an independent adversarial verifier subagent, commit with a Closes trailer, git push, and post-deploy verify including npm run check:core-features. Close the ticket and update README/changelog per the loop. If no buildable ${LANE} tickets remain, take the top buildable ticket overall instead so you never idle. A data-anomaly or deploy-failed p0 always preempts. Ship 3 to 4 tickets this run, only as many as you can take fully through the verified loop before budget runs low, and never skip verification to fit more. Never remove a core feature. Produce a session summary."

echo "--- [planner-${LANE}] START $(STAMP) ---" >> "$LOG"
"$CLAUDE" -p "$PROMPT" --model claude-sonnet-4-5-20250929 --permission-mode auto >> "$LOG" 2>&1
echo "--- [planner-${LANE}] END $(STAMP) exit=$? ---" >> "$LOG"
