import type { MetadataRoute } from "next";
import { RANK_BANDS } from "./atp-rankings/bands";

const BASE = "https://rankings123.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE}/atp-live`, lastModified: now, changeFrequency: "always", priority: 0.9 },
    { url: `${BASE}/wta-live`, lastModified: now, changeFrequency: "always", priority: 0.9 },
    { url: `${BASE}/atp-rankings`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE}/world-cup`, lastModified: now, changeFrequency: "always", priority: 0.8 },
  ];

  const bandPages: MetadataRoute.Sitemap = RANK_BANDS.map((b) => ({
    url: `${BASE}/atp-rankings/${b.slug}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...bandPages];
}
