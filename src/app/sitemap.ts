import type { MetadataRoute } from "next";

const BASE = "https://rankings123.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: BASE, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE}/atp-live`, lastModified: now, changeFrequency: "always", priority: 0.9 },
    { url: `${BASE}/wta-live`, lastModified: now, changeFrequency: "always", priority: 0.9 },
    { url: `${BASE}/world-cup`, lastModified: now, changeFrequency: "always", priority: 0.8 },
  ];
}
