import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rankings123 — Live Sports Rankings",
    short_name: "Rankings123",
    description: "Live ATP & WTA tennis rankings, FIFA World Cup 2026 standings.", // TODO: Re-add cycling when cycling-dynamic-feed ships
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
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
