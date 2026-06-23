#!/usr/bin/env node
/**
 * Validates changelog data structure and sorting.
 * Runs as part of npm test.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the TypeScript file and extract the changelog array
const changelogPath = join(__dirname, "../src/data/changelog.ts");
const source = readFileSync(changelogPath, "utf-8");

// Extract entries using a more robust approach
const entries = [];
const entryRegex = /\{[^}]+\}/g;
const matches = source.match(entryRegex);

if (!matches) {
  console.error("✗ check:changelog: Could not parse changelog entries");
  process.exit(1);
}

for (const match of matches) {
  // Extract field values
  const dateMatch = match.match(/date:\s*"([^"]+)"/);
  const titleMatch = match.match(/title:\s*"([^"]+)"/);
  const descMatch = match.match(/description:\s*"([^"]+)/); // Don't require closing quote (multiline)
  const areaMatch = match.match(/area:\s*"([^"]+)"/);

  if (dateMatch && titleMatch && descMatch && areaMatch) {
    entries.push({
      date: dateMatch[1],
      title: titleMatch[1],
      description: descMatch[1],
      area: areaMatch[1],
    });
  }
}

// Validate we found entries
if (entries.length === 0) {
  console.error("✗ check:changelog: No changelog entries found");
  process.exit(1);
}

// Validate each entry
const validAreas = ["tennis", "worldcup", "cycling", "site", "all"];
const errors = [];

for (const [idx, entry] of entries.entries()) {
  if (!entry.date) errors.push(`Entry ${idx}: missing date`);
  if (!entry.title) errors.push(`Entry ${idx}: missing title`);
  if (!entry.description) errors.push(`Entry ${idx}: missing description`);
  if (!entry.area) errors.push(`Entry ${idx}: missing area`);

  // Validate date format
  if (entry.date && !/^\d{4}-\d{2}-\d{2}$/.test(entry.date)) {
    errors.push(`Entry ${idx}: date not in YYYY-MM-DD format: ${entry.date}`);
  }

  // Validate date is valid
  if (entry.date) {
    const date = new Date(entry.date);
    if (isNaN(date.getTime())) {
      errors.push(`Entry ${idx}: invalid date: ${entry.date}`);
    }
  }

  // Validate area
  if (entry.area && !validAreas.includes(entry.area)) {
    errors.push(`Entry ${idx}: invalid area: ${entry.area}`);
  }
}

// Validate sorting (newest first)
for (let i = 0; i < entries.length - 1; i++) {
  const current = new Date(entries[i].date);
  const next = new Date(entries[i + 1].date);
  if (current < next) {
    errors.push(
      `Entry ${i} (${entries[i].date}) should be >= entry ${i + 1} (${entries[i + 1].date})`
    );
  }
}

// Validate minimum count
if (entries.length < 6) {
  errors.push(`Changelog should have at least 6 entries (has ${entries.length})`);
}

if (errors.length > 0) {
  console.error("✗ check:changelog: validation errors:");
  errors.forEach((err) => console.error(`  - ${err}`));
  process.exit(1);
}

console.log(`✓ check:changelog: ${entries.length} well-formed entries, sorted newest-first.`);
process.exit(0);
