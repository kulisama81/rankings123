import type { MetadataRoute } from "next";
import { getWorldCupData, getWorldCupStats } from "@/lib/worldCupFeed";
import { venueToSlug } from "@/lib/worldCupVenue";

const BASE = "https://rankings123.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE}/atp-live`, lastModified: now, changeFrequency: "always", priority: 0.9 },
    { url: `${BASE}/wta-live`, lastModified: now, changeFrequency: "always", priority: 0.9 },
    { url: `${BASE}/tournaments/wimbledon-2026`, lastModified: now, changeFrequency: "always", priority: 0.9 },
    { url: `${BASE}/cycling`, lastModified: now, changeFrequency: "always", priority: 0.9 },
    { url: `${BASE}/world-cup`, lastModified: now, changeFrequency: "always", priority: 0.8 },
    { url: `${BASE}/world-cup/golden-boot`, lastModified: now, changeFrequency: "always", priority: 0.8 },
    { url: `${BASE}/changelog`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  // Add World Cup match, team, and player pages (SEO long-tail)
  try {
    const [snapshot, stats] = await Promise.all([getWorldCupData(), getWorldCupStats()]);

    const matchRoutes: MetadataRoute.Sitemap = snapshot.matches.map((match) => ({
      url: `${BASE}/world-cup/match/${match.id}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.7,
    }));

    // Extract all unique teams from all groups
    const allTeams = snapshot.groups.flatMap((group) => group.teams);
    const teamRoutes: MetadataRoute.Sitemap = allTeams.map((team) => ({
      url: `${BASE}/world-cup/team/${team.code.toLowerCase()}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.7,
    }));

    // Player pages for top scorers and assisters (SEO long-tail: "Messi World Cup stats", etc.)
    const allPlayers = [...stats.topScorers, ...stats.topAssisters];
    const uniquePlayers = Array.from(
      new Map(allPlayers.map((p) => [p.playerId, p])).values()
    );
    const playerRoutes: MetadataRoute.Sitemap = uniquePlayers.map((player) => ({
      url: `${BASE}/world-cup/player/${player.playerId}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.7,
    }));

    // Venue pages (SEO: "MetLife Stadium World Cup 2026", "Dallas World Cup matches", etc.)
    const uniqueVenues = Array.from(
      new Set(snapshot.matches.map((m) => m.venue).filter(Boolean))
    ) as string[];
    const venueRoutes: MetadataRoute.Sitemap = uniqueVenues.map((venue) => ({
      url: `${BASE}/world-cup/venue/${venueToSlug(venue)}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.7,
    }));

    return [...staticRoutes, ...matchRoutes, ...teamRoutes, ...playerRoutes, ...venueRoutes];
  } catch {
    // If World Cup data fails, still return static routes
    return staticRoutes;
  }
}
