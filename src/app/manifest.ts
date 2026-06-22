import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rankings123 — Live Sports Rankings",
    short_name: "Rankings123",
    description: "Live ATP & WTA tennis rankings, FIFA World Cup 2026 standings, and cycling Grand Tours & classics.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0b0f",
    theme_color: "#b6f23c",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/icon.svg",
        sizes: "512x512",
        purpose: "maskable",
      },
    ],
  };
}
