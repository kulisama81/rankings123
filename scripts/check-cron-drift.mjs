#!/usr/bin/env node
/**
 * Cross-project-safe crontab drift monitor for RANKINGS123.
 *
 * Problem this solves:
 *   This user's crontab is shared by multiple projects (rankings123 +
 *   apibstudyguide). When any project's setup runs `crontab <file>` with only
 *   its own entries, it REPLACES the whole crontab and silently wipes the other
 *   project's lines. rankings123's planner lanes were wiped this way (see the
 *   .tickets/loop-planner-down-5days.md incident); apibstudyguide was hit 3×.
 *
 * How this defends WITHOUT causing the same bug in reverse:
 *   1. Reads scripts/expected-cron.txt — the source of truth for THIS project's
 *      cron entries ONLY. Never lists or touches other projects' entries.
 *   2. Reads the current live `crontab -l`.
 *   3. For each expected entry, checks whether a NON-comment line with the
 *      matching [tag] exists in the live crontab.
 *   4. If any are missing: APPENDS them to the CURRENT crontab (reads live first,
 *      adds only the missing lines, writes current+additions) — never replaces
 *      the whole crontab, so apibstudyguide's (and everyone else's) lines survive.
 *   5. Files a p0 .tickets/cron-drift.md ticket for visibility.
 *
 * Runs hourly at :10 (apibstudyguide's runs at :05 — staggered, no clash).
 * Also safe to invoke ad-hoc for an immediate restore.
 */
import { execSync } from "child_process";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";

const ROOT = join(import.meta.dirname, "..");
const EXPECTED_PATH = join(ROOT, "scripts", "expected-cron.txt");
const TICKET = join(ROOT, ".tickets", "cron-drift.md");
const FOREIGN_MARKER = "Workspace/apibstudyguide"; // sanity guard: must survive

const log = (m) => console.log(`[${new Date().toISOString()}] ${m}`);
const extractTag = (line) => (line.match(/\[([a-z0-9-]+)\]/i) || [])[1] || null;

function loadExpected() {
  if (!existsSync(EXPECTED_PATH)) throw new Error(`expected-cron.txt not found at ${EXPECTED_PATH}`);
  const entries = readFileSync(EXPECTED_PATH, "utf8")
    .split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#"))
    .map((line) => ({ line, tag: extractTag(line) }));
  const untagged = entries.filter((e) => !e.tag);
  if (untagged.length) throw new Error(`expected-cron.txt has untagged entries:\n${untagged.map((e) => "  " + e.line.slice(0, 90)).join("\n")}`);
  return entries;
}

function readLiveCrontab() {
  try { return execSync("crontab -l 2>/dev/null || true").toString(); } catch { return ""; }
}

function findMissing(expected, live) {
  const lines = live.split("\n");
  return expected.filter((e) =>
    !lines.some((l) => !l.trim().startsWith("#") && l.includes(`[${e.tag}]`))
  );
}

function appendToCrontab(current, missing) {
  // SAFETY: start from the CURRENT live crontab and only ADD lines — never drop any.
  const foreignBefore = (current.match(/Workspace\/apibstudyguide/g) || []).length;
  const banner = [
    "",
    `# ─── auto-appended by rankings123 scripts/check-cron-drift.mjs at ${new Date().toISOString()} ───`,
    `# These [rankings123 *] entries were missing from the live crontab and restored.`,
    `# Source of truth: scripts/expected-cron.txt in the rankings123 repo. If they keep`,
    `# disappearing, another project sharing this crontab is running \`crontab <file>\``,
    `# with only its own entries — it must append instead of replace.`,
  ].join("\n");
  const newContent = current.replace(/\n*$/, "") + "\n" + banner + "\n" + missing.map((m) => m.line).join("\n") + "\n";
  // Guard: the new content must still contain every foreign (apib) line it had before.
  const foreignAfter = (newContent.match(/Workspace\/apibstudyguide/g) || []).length;
  if (foreignAfter < foreignBefore) {
    throw new Error(`ABORT: restore would drop foreign entries (apib ${foreignBefore} → ${foreignAfter}). Not writing crontab.`);
  }
  const tmp = join(tmpdir(), `rk123-crontab-${Date.now()}.txt`);
  writeFileSync(tmp, newContent);
  execSync(`crontab ${tmp}`);
  return tmp;
}

function fileDriftTicket(missing) {
  const stamp = new Date().toISOString();
  const tags = missing.map((m) => `[${m.tag}]`).join(", ");
  let created = stamp, priorLog = "";
  if (existsSync(TICKET)) {
    const cur = readFileSync(TICKET, "utf8");
    created = (cur.match(/^created:\s*(.+)$/m) || [])[1] || stamp;
    priorLog = (cur.split("## Log")[1] || "").trim();
  }
  writeFileSync(TICKET, `---
id: cron-drift
status: open
deps: []
links: []
created: ${created}
type: bug
priority: 0
parent: rankings123
tags: [cron-drift, infrastructure, bug]
---
# Crontab drift — rankings123 cron entries were wiped + auto-restored

\`scripts/check-cron-drift.mjs\` found rankings123 cron entries missing from the live crontab and
**restored them by appending** (apibstudyguide's entries were preserved). Root cause: another
project sharing this user crontab ran \`crontab <file>\` with only its own entries, replacing the
whole crontab. This is the recurring cross-project stomp (see loop-planner-down-5days).

**Human:** confirm the offending project's setup APPENDS (reads \`crontab -l\` first) rather than
replaces. Both projects now run a drift monitor as a backstop.

## Restored this run (${stamp})
${missing.map((m) => `- **${m.tag}** — \`${m.line.slice(0, 70)}...\``).join("\n")}

## Log
- ${stamp}: restored ${missing.length} entr${missing.length > 1 ? "ies" : "y"} — ${tags}
${priorLog}
`);
}

function main() {
  const expected = loadExpected();
  const live = readLiveCrontab();
  const missing = findMissing(expected, live);
  if (!missing.length) { log(`OK — all ${expected.length} rankings123 entries present`); return 0; }
  log(`MISSING ${missing.length}/${expected.length}: ${missing.map((m) => m.tag).join(", ")}`);
  const tmp = appendToCrontab(live, missing);
  log(`restored via ${tmp} (appended, apib preserved)`);
  fileDriftTicket(missing);
  return 1;
}

process.exit(main());
