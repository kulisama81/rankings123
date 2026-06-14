export const meta = {
  name: 'build-features',
  description: 'Build several independent Rankings123 backlog tickets in parallel worktrees, each adversarially verified, and report verified branches to merge.',
  whenToUse: 'When 2+ independent tickets can be built concurrently (e.g. worldcup + player-pages). Pass ticket ids as args.',
  phases: [
    { title: 'Build', detail: 'one agent per ticket, isolated in its own git worktree + branch' },
    { title: 'Verify', detail: 'one independent adversarial verifier per ticket, reviewing the branch diff' },
  ],
};

// args: array of tkt ticket ids, e.g. ["worldcup", "player-pages"]
const tickets = Array.isArray(args) && args.length ? args : null;
if (!tickets) {
  log('No tickets provided. Invoke as {args:["worldcup","player-pages"]}. Aborting.');
  return { error: 'no tickets provided' };
}
log(`Fanning out ${tickets.length} ticket(s): ${tickets.join(', ')}`);

const BUILD_SCHEMA = {
  type: 'object',
  required: ['ticket', 'branch', 'buildGreen', 'lintClean', 'summary'],
  properties: {
    ticket: { type: 'string' },
    branch: { type: 'string', description: 'git branch the work was committed to, or empty if build failed' },
    buildGreen: { type: 'boolean' },
    lintClean: { type: 'boolean' },
    changedFiles: { type: 'array', items: { type: 'string' } },
    summary: { type: 'string' },
  },
};

const VERDICT_SCHEMA = {
  type: 'object',
  required: ['ticket', 'pass', 'evidence'],
  properties: {
    ticket: { type: 'string' },
    pass: { type: 'boolean' },
    evidence: { type: 'string', description: 'concrete findings: met/unmet criteria, regressions, stale refs, with file:line' },
    issues: { type: 'array', items: { type: 'string' } },
  },
};

const results = await pipeline(
  tickets,
  // Stage 1 — BUILD in an isolated worktree, commit to a branch.
  (id) => agent(
    `You are building Rankings123 ticket "${id}" in an isolated git worktree.
1. Read the ticket: \`tkt show ${id}\` and its acceptance criteria. Read docs/DESIGN.md and
   src/lib/liveFeed.ts (the live-feed/table template for new sports & data adapters).
2. Implement the feature fully to meet the acceptance criteria, matching existing code style.
   Keep the ESPN-with-mock-fallback + source flag discipline.
3. Verify mechanically: \`npm run build\` (must be green) and \`npx eslint src --max-warnings=0\`
   (must be clean). Fix until both pass.
4. Commit your work to a NEW branch named \`feat/${id}\`:
   \`git switch -c feat/${id} && git add -A && git commit -m "<msg>"\`.
   Do NOT commit to main. Do NOT merge.
5. Return the branch name, whether build/lint were green, the changed files, and a summary.
   If you could not get build green, return branch:"" and explain in summary.`,
    { label: `build:${id}`, phase: 'Build', isolation: 'worktree', schema: BUILD_SCHEMA }
  ),
  // Stage 2 — INDEPENDENT adversarial verify of the branch diff.
  (build, id) => {
    if (!build || !build.branch || !build.buildGreen) {
      return { ticket: id, build, verdict: { ticket: id, pass: false, evidence: `build did not complete green: ${build?.summary ?? 'no result'}` } };
    }
    return agent(
      `You are an INDEPENDENT adversarial verifier. You did NOT write this code. Try to make it
FAIL, do not rubber-stamp it. Ticket "${id}" was built on branch \`${build.branch}\`.
1. Read the acceptance criteria: \`tkt show ${id}\`.
2. Inspect the diff WITHOUT checking out (avoid disturbing other agents):
   \`git diff main...${build.branch}\` and \`git show ${build.branch}:<path>\` for changed files.
3. Adversarially check: are ALL acceptance criteria met? Any regression to existing pages,
   stale/dead references, half-done or faked/stubbed work, type leaks, broken invariants?
   The builder reported buildGreen=${build.buildGreen}, lintClean=${build.lintClean} — note if
   the diff makes that doubtful.
4. Return pass=true ONLY if you are convinced it genuinely meets the criteria, with concrete
   evidence (file:line). Otherwise pass=false with the specific issues.`,
      { label: `verify:${id}`, phase: 'Verify', schema: VERDICT_SCHEMA }
    ).then((verdict) => ({ ticket: id, build, verdict }));
  }
);

const clean = results.filter(Boolean);
const passed = clean.filter((r) => r.verdict && r.verdict.pass);
const failed = clean.filter((r) => !r.verdict || !r.verdict.pass);

log(`Verified ${passed.length}/${tickets.length}. To merge: ${passed.map((p) => p.build.branch).join(', ') || '(none)'}`);
if (failed.length) log(`Needs attention: ${failed.map((f) => f.ticket).join(', ')}`);

// The main loop reviews this, merges PASS branches into main, runs a final build, and closes
// the tickets (tkt edit <id> --status closed). Failures are reported to the user.
return {
  mergeBranches: passed.map((p) => ({ ticket: p.ticket, branch: p.build.branch, summary: p.build.summary })),
  failures: failed.map((f) => ({ ticket: f.ticket, evidence: f.verdict?.evidence })),
};
