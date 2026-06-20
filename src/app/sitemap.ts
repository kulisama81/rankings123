import type { MetadataRoute } from "next";
import { getWorldCupData } from "@/lib/worldCupFeed";

const BASE = "https://rankings123.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE}/atp-live`, lastModified: now, changeFrequency: "always", priority: 0.9 },
    { url: `${BASE}/wta-live`, lastModified: now, changeFrequency: "always", priority: 0.9 },
    { url: `${BASE}/world-cup`, lastModified: now, changeFrequency: "always", priority: 0.8 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  // Add World Cup match pages (SEO long-tail)
  try {
    const snapshot = await getWorldCupData();
    const matchRoutes: MetadataRoute.Sitemap = snapshot.matches.map((match) => ({
      url: `${BASE}/world-cup/match/${match.id}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.7,
    }));
    return [...staticRoutes, ...matchRoutes];
  } catch {
    // If World Cup data fails, still return static routes
    return staticRoutes;
  }
}
