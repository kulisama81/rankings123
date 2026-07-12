/**
 * Player slug utilities for SEO-friendly URLs.
 * Converts player names to URL slugs and provides lookup functions.
 */

import type { AtpLivePlayer } from "@/types";

/**
 * Generate a URL-safe slug from a player name.
 * "Jannik Sinner" → "jannik-sinner"
 * "Carlos Alcaraz Garfia" → "carlos-alcaraz-garfia"
 */
export function playerToSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD") // Decompose accented characters
    .replace(/[̀-ͯ]/g, "") // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, "") // Remove special chars
    .trim()
    .replace(/\s+/g, "-") // Spaces to hyphens
    .replace(/-+/g, "-"); // Collapse multiple hyphens
}

/**
 * Find a player by slug (case-insensitive name match).
 * Fallback to GUID lookup if slug doesn't match.
 */
export function findPlayerBySlugOrGuid(
  players: AtpLivePlayer[],
  idOrSlug: string
): AtpLivePlayer | null {
  // Try GUID lookup first (backwards compatibility)
  if (idOrSlug.includes("-") && idOrSlug.length > 30) {
    const byGuid = players.find((p) => p.guid === idOrSlug);
    if (byGuid) return byGuid;
  }

  // Try slug lookup - match against generated slug
  const normalized = idOrSlug.toLowerCase().replace(/-/g, " ");
  return (
    players.find((p) => {
      const slug = playerToSlug(p.name);
      return slug === idOrSlug || p.name.toLowerCase() === normalized;
    }) ?? null
  );
}

/**
 * Get the top N players with valid slugs for static generation.
 */
export function getTop200WithSlugs(
  players: AtpLivePlayer[],
  limit = 200
): Array<{ id: string; slug: string; name: string }> {
  return players
    .slice(0, limit)
    .filter((p) => p.name && p.name !== "Unknown")
    .map((p) => ({
      id: p.guid ?? playerToSlug(p.name),
      slug: playerToSlug(p.name),
      name: p.name,
    }));
}
