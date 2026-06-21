#!/usr/bin/env node
/**
 * Ticket-hygiene check — catches loop-discipline drift between commits and tickets:
 *   1. A commit says `Closes: [id]` but the ticket is still `status: open` (the close
 *      step didn't flip the status — exactly how landing-all-sports slipped).
 *   2. A recent commit carries a forbidden `Co-Authored-By` trailer (Loïc is sole author).
 *
 * Reports mismatches so they can be reconciled. Run ad-hoc or from the daily digest.
 * Usage: node scripts/check-ticket-hygiene.mjs [N]   (scan last N commits, default 80)
 */
import { execSync } from "child_process";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

const ROOT = join(import.meta.dirname, "..");
const N = Number(process.argv[2] || 80);

function git(cmd) {
  try { return execSync(cmd, { cwd: ROOT, encoding: "utf8" }); } catch { return ""; }
}
const ticketStatus = (id) => {
  const f = join(ROOT, ".tickets", `${id}.md`);
  if (!existsSync(f)) return "MISSING";
  return (readFileSync(f, "utf8").match(/^status:\s*(\w+)/m) || [])[1] || "?";
};

const log = git(`git log -n ${N} --format=%H%x1f%s%x1f%b%x1e`).split("\x1e").filter(Boolean);
const openDespiteClose = [];
const coauthored = [];

for (const entry of log) {
  const [sha, subject, body] = entry.split("\x1f");
  const msg = `${subject}\n${body || ""}`;
  for (const m of msg.matchAll(/Closes:\s*\[?([a-z0-9-]+)\]?/gi)) {
    const id = m[1];
    const st = ticketStatus(id);
    if (st !== "closed" && st !== "MISSING") openDespiteClose.push({ sha: sha.slice(0, 7), id, status: st });
  }
  if (/^Co-Authored-By:/im.test(body || "")) coauthored.push(sha.slice(0, 7));
}

let bad = 0;
if (openDespiteClose.length) {
  bad++;
  console.error("✗ tickets marked 'Closes:' in a commit but still OPEN (status didn't flip):");
  for (const x of openDespiteClose) console.error(`  ${x.sha}  ${x.id}  (status: ${x.status}) → set to closed`);
}
if (coauthored.length) {
  bad++;
  console.error(`\n✗ ${coauthored.length} recent commit(s) carry a forbidden Co-Authored-By trailer: ${coauthored.join(", ")}`);
  console.error("  (Loïc is sole author — the commit-msg hook strips these going forward.)");
}
if (!bad) { console.log("✓ ticket-hygiene: commits ↔ ticket statuses in sync; no forbidden trailers."); process.exit(0); }
process.exit(1);
