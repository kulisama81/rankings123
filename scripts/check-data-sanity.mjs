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

const PLACEHOLDER_NAMES = new Set(["", "tbd", "unknown", "placeholder", "—", "home", "away"]);
const isBadName = (n) => PLACEHOLDER_NAMES.has(String(n ?? "").trim().toLowerCase());

// --- Tennis (ATP / WTA) ----------------------------------------------------
function checkTennis(sport, snap) {
  const players = snap?.players ?? [];
  if (players.length < 50) return err(sport, `only ${players.length} players (expected ≥50)`);
  if (snap.source === "mock") warn(sport, "served from mock fallback (live feed unavailable)");

  const ranks = players.map((p) => p.liveRank);
  if (new Set(ranks).size !== ranks.length) err(sport, "duplicate liveRank values");

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
  if (snap.source === "mock") warn("worldcup", "served from mock fallback (live feed unavailable)");
  if (groups.length !== 12) warn("worldcup", `${groups.length} groups (expected 12 for 2026)`);

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
    }
  }
  return groups;
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
    const [atp, wta, wc, bracket] = await Promise.all([
      getJson("/api/atp/live"),
      getJson("/api/wta/live"),
      getJson("/api/worldcup/live"),
      getJson("/api/worldcup/bracket"),
    ]);
    checkTennis("atp", atp);
    checkTennis("wta", wta);
    const groups = checkWorldCup(wc);
    checkBracket(bracket, groups);
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
