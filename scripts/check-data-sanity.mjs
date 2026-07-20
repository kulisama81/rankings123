#!/usr/bin/env node
/**
 * Per-sport DATA-SANITY validator (runtime).
 *
 * Where check-data-integrity.mjs is a STATIC tripwire for fabricated *code* patterns,
 * this fetches the actual data the site serves (per sport) and asserts real-world
 * invariants — catching data that is fabricated, mis-parsed, mis-sourced, or impossible
 * (e.g. football points ≠ 3·W+D, ranks out of order, two same-group teams meeting in the
 * projected bracket). It is meant to run on a schedule (cron) against production.
 *
 * On finding errors it writes/updates an OPEN `data-anomaly` ticket (with a timestamped
 * log) so the planner picks it up, fixes the underlying feed/parse logic, verifies this
 * check passes, logs the resolution in the ticket, and closes it.
 *
 * Usage: node scripts/check-data-sanity.mjs            (checks https://rankings123.com)
 *        SANITY_BASE=http://localhost:3000 node scripts/check-data-sanity.mjs
 */
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const ROOT = join(import.meta.dirname, "..");
const BASE = process.env.SANITY_BASE || "https://rankings123.com";
const TICKET = join(ROOT, ".tickets", "data-anomaly.md");

const errors = []; // hard failures → ticket + non-zero exit
const warnings = []; // noted, non-failing (e.g. flagged mock fallback)
const err = (sport, msg) => errors.push(`[${sport}] ${msg}`);
const warn = (sport, msg) => warnings.push(`[${sport}] ${msg}`);

async function getJson(path) {
  const res = await fetch(`${BASE}${path}`, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`${path} → HTTP ${res.status}`);
  return res.json();
}

async function getHtml(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`${path} → HTTP ${res.status}`);
  return res.text();
}

const PLACEHOLDER_NAMES = new Set(["", "tbd", "unknown", "placeholder", "—", "home", "away"]);
const isBadName = (n) => PLACEHOLDER_NAMES.has(String(n ?? "").trim().toLowerCase());

// --- Tennis (ATP / WTA) ----------------------------------------------------
function checkTennis(sport, snap) {
  const players = snap?.players ?? [];
  if (players.length < 50) return err(sport, `only ${players.length} players (expected ≥50)`);
  if (snap.source === "mock") warn(sport, "served from mock fallback (live feed unavailable)");

  const ranks = players.map((p) => p.liveRank);
  if (new Set(ranks).size !== ranks.length) err(sport, "duplicate liveRank values");

  // Check for implausible rank movements (regression guard for bug-atp-jodar-rank-jump).
  // Single-period movements >200 positions are statistically implausible for professional rankings
  // (except for newly-ranked players entering from unranked status — would need special handling).
  const MOVEMENT_THRESHOLD = 200;
  const implausibleMovements = players.filter((p) => Math.abs(p.movement ?? 0) > MOVEMENT_THRESHOLD);
  if (implausibleMovements.length > 0) {
    for (const p of implausibleMovements.slice(0, 3)) {
      err(sport, `${p.name} (rank ${p.liveRank}) shows implausible movement of ${p.movement > 0 ? '+' : ''}${p.movement} positions`);
    }
  }

  // Data completeness check (regression guard for bug-wta-missing-tournament-data).
  // While many players won't be competing during tour breaks or quiet weeks, if >95% of top-100
  // have NO tournament data when the scoreboard shows active events, it indicates a feed/merge failure.
  // Note: During Grand Slams or Masters weeks, participation is typically 30-50% of top-100.
  // During smaller events or end-of-week periods, 70-80% not competing is normal.
  const top100 = players.slice(0, 100);
  const missingTournament = top100.filter((p) => !p.tournament);
  const missingPct = (missingTournament.length / top100.length) * 100;
  if (missingPct > 95) {
    err(
      sport,
      `${missingTournament.length}/${top100.length} (${missingPct.toFixed(0)}%) of top-100 players have no tournament data — likely feed/scoreboard merge failure`
    );
  } else if (missingPct > 85 && snap.source === "espn") {
    warn(sport, `${missingPct.toFixed(0)}% of top-100 not competing (tour break or end-of-week)`);
  }

  // Check for em dash strings in tournament data (regression guard for bug-wta-missing-tournament-data).
  // Tournament fields should be structured objects or undefined, never placeholder strings like "—".
  for (const p of players) {
    if (p.tournament) {
      if (typeof p.tournament === "string") {
        err(sport, `${p.name}: tournament field is string "${p.tournament}" (should be object or undefined)`);
      }
      if (p.tournament.name === "—" || p.tournament.round === "—") {
        err(sport, `${p.name}: tournament contains em dash placeholders (name: "${p.tournament.name}", round: "${p.tournament.round}")`);
      }
    }
  }

  // "In play" vs point delta consistency check (regression guard for bug-wta-inplay-delta-mismatch).
  // When players are actively competing, at least some should show point changes. If many players
  // are marked as "in play" (have active tournaments) but very few show non-zero Δ, it indicates
  // either: (1) point calculation bug, or (2) misleading UX where all players are in early rounds
  // of lower-tier tournaments (R32 = 0-1 points). We expect at least 20% of "in play" players to
  // show visible point movement.
  const inPlay = players.filter((p) => p.tournament?.active).length;
  const withDelta = players.filter((p) => (p.pointsDelta ?? 0) !== 0).length;
  if (inPlay > 10 && withDelta < Math.floor(inPlay * 0.2)) {
    warn(
      sport,
      `${inPlay} players "in play" but only ${withDelta} show point changes (Δ≠0) — check if tournaments are in early rounds or if Δ calculation is missing data`
    );
  }

  let prevRank = 0;
  let prevPts = Infinity;
  let nameDupes = new Set();
  const seenNames = new Set();
  for (const p of players) {
    if (isBadName(p.name)) err(sport, `placeholder/empty player name at rank ${p.liveRank}`);
    if (seenNames.has(p.name)) nameDupes.add(p.name);
    seenNames.add(p.name);
    if (typeof p.liveRank !== "number" || p.liveRank < 1) err(sport, `invalid liveRank ${p.liveRank}`);
    if (p.liveRank < prevRank) err(sport, `liveRank not ascending near ${p.name}`);
    if (p.livePoints < 0 || p.officialPoints < 0) err(sport, `negative points for ${p.name}`);
    // Live ranking is ordered BY live points, so points must be non-increasing with rank.
    if (p.livePoints > prevPts + 1) err(sport, `${p.name} (rank ${p.liveRank}) has more livePoints than a higher rank`);
    prevRank = p.liveRank;
    prevPts = p.livePoints;
  }
  if (nameDupes.size) err(sport, `duplicate player names: ${[...nameDupes].slice(0, 3).join(", ")}`);
}

// --- World Cup -------------------------------------------------------------
function checkWorldCup(snap) {
  const groups = snap?.groups ?? [];
  const matches = snap?.matches ?? [];
  if (snap.source === "mock") warn("worldcup", "served from mock fallback (live feed unavailable)");
  if (groups.length !== 12) warn("worldcup", `${groups.length} groups (expected 12 for 2026)`);

  // Build a map of team code → their group
  const teamGroup = new Map();
  for (const g of groups) {
    for (const t of g.teams ?? []) {
      teamGroup.set(t.code, g.name);
    }
  }

  // Build a map of team code → count of completed/in-progress GROUP STAGE matches.
  // Only count matches where both teams are in the same group (group stage matches).
  // Cross-group or knockout matches shouldn't be counted against group standings.
  const teamMatchCounts = new Map();
  for (const m of matches) {
    // Only count completed or in-progress matches (not future/scheduled ones)
    if (m.state === "post" || m.state === "in") {
      const hc = m.homeCode;
      const ac = m.awayCode;
      const homeGroup = teamGroup.get(hc);
      const awayGroup = teamGroup.get(ac);
      // Only count if both teams are in the same group (group stage match)
      if (homeGroup && awayGroup && homeGroup === awayGroup) {
        teamMatchCounts.set(hc, (teamMatchCounts.get(hc) || 0) + 1);
        teamMatchCounts.set(ac, (teamMatchCounts.get(ac) || 0) + 1);
      }
    }
  }

  for (const g of groups) {
    const teams = g.teams ?? [];
    if (teams.length !== 4) err("worldcup", `${g.name} has ${teams.length} teams (expected 4)`);
    const ranks = teams.map((t) => t.rank);
    if (new Set(ranks).size !== ranks.length) err("worldcup", `${g.name} has duplicate ranks`);
    for (const t of teams) {
      if (isBadName(t.name)) err("worldcup", `${g.name} placeholder team name`);
      // Football invariants — any violation means fabricated or mis-parsed data.
      if (t.points !== 3 * t.won + t.drawn) err("worldcup", `${t.name}: points ${t.points} ≠ 3·${t.won}+${t.drawn}`);
      if (t.played !== t.won + t.drawn + t.lost) err("worldcup", `${t.name}: played ${t.played} ≠ W+D+L`);
      if (t.goalDiff !== t.goalsFor - t.goalsAgainst) err("worldcup", `${t.name}: GD ${t.goalDiff} ≠ GF−GA`);
      if (t.played > 3) err("worldcup", `${t.name}: played ${t.played} > 3 group games`);
      if (t.played < 0 || t.points < 0 || t.goalsFor < 0) err("worldcup", `${t.name}: negative value`);

      // Staleness check (regression guard for bug-wc-group-standings-stale):
      // Standings "matches played" should be consistent with the scoreboard's completed/in-progress matches.
      // If a team has completed/in-progress matches in the schedule, but standings show fewer,
      // it indicates stale standings data (cached on a different revalidation cycle).
      const actualMatches = teamMatchCounts.get(t.code) || 0;
      if (actualMatches > t.played) {
        err(
          "worldcup",
          `${t.name} (${t.code}): standings show ${t.played} matches played, but schedule shows ${actualMatches} completed/in-progress (stale standings)`
        );
      }
    }
  }
  return groups;
}

// --- World Cup Golden Boot (stats) -----------------------------------------
function checkWorldCupGoldenBoot(stats) {
  if (stats.source === "mock") warn("worldcup-stats", "served from mock fallback (live feed unavailable)");

  const scorers = stats?.topScorers ?? [];
  const assisters = stats?.topAssisters ?? [];

  // Fabricated placeholder names that should never appear in user-facing Golden Boot data.
  const BANNED_PATTERNS = [
    /max m[üu]ller/i,
    /emma dupont/i,
    /carlos silva/i,
    /test\s+player/i,
    /placeholder/i,
    /^tbd$/i,
  ];
  const isFabricated = (name) => BANNED_PATTERNS.some((re) => re.test(name));

  for (const player of [...scorers, ...assisters]) {
    // Reject fabricated/placeholder names.
    if (isBadName(player.playerName) || isBadName(player.playerShortName)) {
      err("worldcup-stats", `placeholder player name: "${player.playerName}"`);
    }
    if (isFabricated(player.playerName)) {
      err("worldcup-stats", `fabricated test player name: "${player.playerName}"`);
    }
    // Realistic appearance count — tournament leaders should have positive appearances.
    // Flag zero appearances (which would indicate fabricated or placeholder data).
    if (stats.source === "espn" && player.value > 0 && player.appearances === 0) {
      err("worldcup-stats", `${player.playerShortName} has ${player.value} goals/assists but 0 appearances (impossible)`);
    }
    // Negative or nonsensical stats.
    if (player.value < 0 || player.goals < 0 || player.assists < 0 || player.appearances < 0) {
      err("worldcup-stats", `${player.playerShortName} has negative stats`);
    }
  }
}

// --- World Cup projected bracket -------------------------------------------
function checkBracket(bracket, groups) {
  // Map each team name → its actual group letter (from the live standings).
  const groupOf = new Map();
  for (const g of groups) {
    const letter = String(g.name).replace(/group/i, "").trim().toUpperCase();
    for (const t of g.teams ?? []) groupOf.set(t.name, letter);
  }
  const r32 = (bracket?.stages ?? []).find((s) => s.name === "Round of 32");
  const projected = (r32?.matches ?? []).filter((m) => String(m.id).startsWith("projected-"));
  if (!projected.length) return; // no projection right now — nothing to check

  const seen = new Set();
  for (const m of projected) {
    const hg = groupOf.get(m.homeName);
    const ag = groupOf.get(m.awayName);
    // Same actual group can never meet in the Round of 32.
    if (hg && ag && hg === ag) {
      err("worldcup-bracket", `${m.homeName} vs ${m.awayName} — both from Group ${hg} (impossible)`);
    }
    // Seed label must match the team's real group (e.g. "2nd Group E" ⇒ team is in Group E).
    const labGrp = (lbl) => (String(lbl).match(/Group ([A-L])/) || [])[1];
    if (m.homeSeedLabel && hg && labGrp(m.homeSeedLabel) !== hg)
      err("worldcup-bracket", `${m.homeName} labelled ${m.homeSeedLabel} but is in Group ${hg}`);
    if (m.awaySeedLabel && ag && labGrp(m.awaySeedLabel) !== ag)
      err("worldcup-bracket", `${m.awayName} labelled ${m.awaySeedLabel} but is in Group ${ag}`);
    for (const n of [m.homeName, m.awayName]) {
      if (seen.has(n)) err("worldcup-bracket", `${n} appears in more than one projected tie`);
      seen.add(n);
    }
  }
}

// --- Cycling (Tour de France) ----------------------------------------------
function checkCycling(snap) {
  if (snap.source === "mock") warn("cycling", "served from mock fallback (live feed unavailable)");

  const stages = snap?.stages ?? [];
  const gc = snap?.gc ?? [];
  const jerseys = snap?.jerseys ?? [];

  // Check if race should be active (after July 4, 2026 start date).
  const now = new Date();
  const raceStart = new Date(2026, 6, 4); // Month is 0-indexed (6 = July)
  const raceEnd = new Date(2026, 6, 27); // July 27, 2026
  const shouldBeActive = now >= raceStart && now <= raceEnd;

  if (shouldBeActive) {
    // During the race, we must have real data, not stale placeholders.
    // Regression guard for bug-tdf-live-data-stale.

    // 1. Check that we're NOT serving mock data during a live race.
    if (snap.source === "mock") {
      err("cycling", "serving mock data when Tour de France should be live (race started July 4)");
    }

    // 2. Check that we have GC standings if the race is active.
    // Empty GC during an active race = stale/broken data.
    if (snap.raceStatus === "active" && gc.length === 0) {
      err("cycling", "GC standings empty when race is active (stale data — see bug-tdf-live-data-stale)");
    }

    // 3. Check that completed stages have winners (not all "—" dashes).
    // If the race has been running for >3 days, we should have at least one stage winner.
    const daysIntoRace = (now - raceStart) / (1000 * 60 * 60 * 24);
    if (daysIntoRace > 3) {
      const completedStages = stages.filter((s) => s.winner);
      if (completedStages.length === 0) {
        err("cycling", `${daysIntoRace.toFixed(0)} days into race, but all stage winners show "—" (stale data)`);
      }
    }

    // 4. Check that jersey leaders are populated during an active race.
    const hasYellowJersey = jerseys.find((j) => j.jersey === "yellow")?.rider;
    if (snap.raceStatus === "active" && !hasYellowJersey) {
      err("cycling", "no yellow jersey leader when race is active (stale or broken data)");
    }
  }

  // Data integrity checks (regardless of race status).
  for (const stage of stages) {
    if (stage.stage < 1 || stage.stage > 21) {
      err("cycling", `stage ${stage.stage} out of range (must be 1-21)`);
    }
    if (isBadName(stage.course)) {
      err("cycling", `stage ${stage.stage} has placeholder course name`);
    }
  }

  for (const rider of gc) {
    if (isBadName(rider.name)) {
      err("cycling", `GC rank ${rider.rank} has placeholder rider name`);
    }
    if (rider.rank < 1) {
      err("cycling", `invalid GC rank ${rider.rank}`);
    }
  }
}

// --- Homepage placeholder content (CX-FIRST violation guard) ---------------
function checkHomepagePlaceholders(html) {
  // Per CX-FIRST rule: never ship placeholder, "coming soon", empty, or fabricated UI to users.
  // This check guards against cycling events (or any future content) displaying placeholder text
  // like "Results not yet available", "TBD", "coming soon" on the homepage.
  const PROHIBITED_PATTERNS = [
    /results not yet available/i,
    /coming soon/i,
    // Match "TBD" but exclude legitimate uses in World Cup bracket projections
    // where "TBD" is a factual statement about future matchups, not placeholder content.
    // Only flag "TBD → City · Year" patterns (like "TBD → Madrid · 2026") which indicate
    // incomplete event data, not projected bracket matchups.
    /TBD\s*[→•]\s*[A-Z]/i,
  ];

  for (const pattern of PROHIBITED_PATTERNS) {
    const match = html.match(pattern);
    if (match) {
      err("homepage", `CX-FIRST violation: placeholder text "${match[0]}" on homepage (must hide incomplete features, not show placeholders)`);
    }
  }
}

// --- Match pages demo data guard (regression for wc-match-demo-labels) -----
async function checkMatchPagesNoDemoLabels() {
  // Regression guard for bug wc-match-demo-labels: World Cup match pages previously showed
  // "Demo data" labels for non-existent matches (ESPN 404) instead of returning 404.
  // This check verifies that known-bad match IDs now properly return 404 instead of showing mock.
  const KNOWN_NONEXISTENT_MATCHES = ["401635294"]; // From the original bug report

  for (const matchId of KNOWN_NONEXISTENT_MATCHES) {
    const path = `/world-cup/match/${matchId}`;
    try {
      const res = await fetch(`${BASE}${path}`);
      if (res.status === 200) {
        const html = await res.text();
        // If the page loads, it must not contain "Demo data" labels (CX violation).
        if (html.includes("Demo data")) {
          err(
            "worldcup-match",
            `${path} shows "Demo data" labels — match doesn't exist in ESPN, should return 404 not mock fallback`
          );
        }
      }
      // If status is 404, that's correct behavior — non-existent match returns 404.
      // Any other status is unexpected but not necessarily this bug.
    } catch (e) {
      // Network error fetching the page — not this bug's concern.
    }
  }
}

// --- Auto-ticket -----------------------------------------------------------
function fileAnomalyTicket(stamp) {
  const latest = errors.map((e) => `- ${e}`).join("\n");
  // Preserve the existing log (and created date) if the ticket already exists.
  let created = stamp;
  let priorLog = "";
  if (existsSync(TICKET)) {
    const cur = readFileSync(TICKET, "utf8");
    created = (cur.match(/^created:\s*(.+)$/m) || [])[1] || stamp;
    priorLog = (cur.split("## Log")[1] || "").trim();
  }
  const newLog = `- ${stamp}: ${errors.length} anomalies — ${errors[0]}${errors.length > 1 ? " (…)" : ""}`;
  const body = `---
id: data-anomaly
status: open
deps: []
links: []
created: ${created}
type: bug
priority: 0
parent: rankings123
tags: [data, bug, monitor]
---
# Data anomaly detected (automated sanity check)

\`scripts/check-data-sanity.mjs\` found served data that fails real-world invariants — likely
fabricated, mis-parsed, or mis-sourced. **Planner: investigate the relevant feed/parse logic,
fix it, re-run \`npm run check:data-sanity\` until clean, log the resolution in the Log below,
then close this ticket.** Do NOT close while \`check:data-sanity\` still reports errors.

## Anomalies (latest run · ${stamp})
${latest}

## Log
${newLog}
${priorLog}
`;
  writeFileSync(TICKET, body);
}

// --- Run -------------------------------------------------------------------
async function main() {
  const stamp = new Date().toISOString();
  try {
    const [atp, wta, wc, bracket, wcStats, homepage, cycling] = await Promise.all([
      getJson("/api/atp/live"),
      getJson("/api/wta/live"),
      getJson("/api/worldcup/live"),
      getJson("/api/worldcup/bracket"),
      getJson("/api/worldcup/stats"),
      getHtml("/"),
      getJson("/api/tdf/live"),
    ]);
    checkTennis("atp", atp);
    checkTennis("wta", wta);
    const groups = checkWorldCup(wc);
    checkBracket(bracket, groups);
    checkWorldCupGoldenBoot(wcStats);
    checkCycling(cycling);
    checkHomepagePlaceholders(homepage);
    await checkMatchPagesNoDemoLabels();
  } catch (e) {
    err("fetch", `could not load data: ${e.message}`);
  }

  for (const w of warnings) console.warn(`  ⚠ ${w}`);

  if (errors.length) {
    console.error(`\n✗ data-sanity: ${errors.length} anomaly(ies) — filing/updating data-anomaly ticket:\n`);
    for (const e of errors) console.error(`  ${e}`);
    fileAnomalyTicket(stamp);
    console.error(`\nWrote ${TICKET} (open, p0) for the planner to fix.`);
    process.exit(1);
  }
  console.log(`✓ data-sanity: all per-sport invariants hold${warnings.length ? ` (${warnings.length} warning(s))` : ""}.`);
}

main();
