import type { Metadata } from "next";
import Link from "next/link";
import { allEvents } from "@/data";
import EventCard from "@/components/EventCard";
import HeroBanner from "@/components/HeroBanner";

export const metadata: Metadata = {
  title: "Rankings123 — Live Sports Rankings",
  description:
    "Live ATP & WTA tennis rankings during tournaments, FIFA World Cup 2026 standings, cycling, and more. Updated in real time.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Rankings123 — Live Sports Rankings",
    description:
      "Live ATP & WTA tennis rankings during tournaments, FIFA World Cup 2026 standings, cycling, and more.",
    url: "/",
    type: "website",
  },
};

const liveLinks = [
  { href: "/atp-live", label: "ATP Live", sub: "Men's tennis", sport: "atp" },
  { href: "/wta-live", label: "WTA Live", sub: "Women's tennis", sport: "wta" },
  { href: "/world-cup", label: "World Cup", sub: "FIFA 2026", sport: "worldcup" },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <HeroBanner
        icon="🏆"
        title="Live Sports Rankings"
        subtitle="Real-time ATP & WTA tennis, FIFA World Cup, cycling, and more — updated live."
        live={false}
        stats={[
          { label: "Sports", value: "Tennis · Football · Cycling" },
          { label: "Updated", value: "Live" },
        ]}
      />

      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        {liveLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            data-sport={l.sport}
            className="group flex items-center justify-between rounded-2xl border border-edge bg-surface p-5 transition hover:border-accent/60 hover:bg-surface2"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span
                    className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60"
                    style={{ animation: "pulse-dot 1.6s ease-in-out infinite" }}
                  />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                <span className="text-lg font-bold text-fg">{l.label}</span>
              </div>
              <p className="mt-1 text-xs text-muted">{l.sub}</p>
            </div>
            <span className="text-accent transition group-hover:translate-x-0.5">→</span>
          </Link>
        ))}
      </div>

      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
        Events &amp; archives
      </h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {allEvents.map((summary) => (
          <EventCard key={summary.event.id} summary={summary} />
        ))}
      </div>
    </div>
  );
}
