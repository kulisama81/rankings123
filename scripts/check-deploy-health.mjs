#!/usr/bin/env node
/**
 * Deploy-health monitor — detects FAILED Vercel deployments and acts on them.
 *
 * A failed Vercel build doesn't take the site down (Vercel keeps serving the last-good
 * deploy), so it's a SILENT failure: your latest commit's changes never went live and
 * nothing notices. This checks the tip of origin/main's Vercel build status (via the
 * GitHub commit status — keyless, no Vercel auth needed) and, if it FAILED, writes/updates
 * an open p0 `deploy-failed` ticket (with the offending commit) so the planner fixes the
 * build and re-ships. Mirrors the data-sanity monitor. Meant to run on a frequent cron.
 *
 * Usage: node scripts/check-deploy-health.mjs
 */
import { execSync } from "child_process";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const ROOT = join(import.meta.dirname, "..");
const REPO = "kulisama81/rankings123";
const TICKET = join(ROOT, ".tickets", "deploy-failed.md");

const sh = (c) => execSync(c, { cwd: ROOT, encoding: "utf8" }).trim();
function vercelState(sha) {
  try {
    const out = sh(`gh api repos/${REPO}/commits/${sha}/status --jq '.statuses[]|select(.context|test("[Vv]ercel"))|.state' 2>/dev/null`);
    return out.split("\n").filter(Boolean)[0] || "none";
  } catch {
    return "unknown";
  }
}

sh("git fetch origin -q");
// Walk back to the most recent commit that actually triggered a Vercel build (skip
// tickets/docs-only commits whose status is "none").
const shas = sh("git log -8 --pretty=%H origin/main").split("\n");
let tip = null;
for (const sha of shas) {
  const st = vercelState(sha);
  if (st !== "none" && st !== "unknown") { tip = { sha, st }; break; }
}

if (!tip) {
  console.log("✓ deploy-health: no recent deploy status to evaluate.");
  process.exit(0);
}

const short = tip.sha.slice(0, 7);
const msg = sh(`git log -1 --pretty=%s ${tip.sha}`);

if (tip.st === "failure" || tip.st === "error") {
  const stamp = new Date().toISOString();
  let created = stamp, priorLog = "";
  if (existsSync(TICKET)) {
    const cur = readFileSync(TICKET, "utf8");
    created = (cur.match(/^created:\s*(.+)$/m) || [])[1] || stamp;
    priorLog = (cur.split("## Log")[1] || "").trim();
  }
  writeFileSync(TICKET, `---
id: deploy-failed
status: open
deps: []
links: []
created: ${created}
type: bug
priority: 0
parent: rankings123
tags: [deploy, infra, bug]
---
# Vercel deployment FAILED — latest changes are not live

The tip of \`origin/main\` failed to build on Vercel, so production is stuck on the last-good
deploy and the latest commit's changes are NOT live. **Planner: reproduce with \`npm run build\`,
fix the build error, push the fix, confirm the new deploy succeeds (gh commit status = success),
then close this.** Do not close while the tip commit's Vercel status is still failure/error.

## Failing commit
- \`${short}\` — ${msg}
- Vercel status: **${tip.st}**

## Log
- ${stamp}: tip ${short} = ${tip.st}
${priorLog}
`);
  console.error(`✗ deploy-health: tip ${short} = ${tip.st} — wrote p0 deploy-failed ticket.\n  ${msg}`);
  process.exit(1);
}

console.log(`✓ deploy-health: tip ${short} = ${tip.st}.`);
