import type { Metadata } from "next";
import Link from "next/link";
import { allEvents } from "@/data";
import EventCard from "@/components/EventCard";
import HeroBanner from "@/components/HeroBanner";

export const metadata: Metadata = {
  title: "Rankings123 — Live Sports Rankings",
  description:
    "Live ATP & WTA tennis rankings, FIFA World Cup 2026 standings, cycling Grand Tours & classics results. Updated in real time.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Rankings123 — Live Sports Rankings",
    description:
      "Live ATP & WTA tennis rankings, FIFA World Cup 2026 standings, cycling Grand Tours & classics results.",
    url: "/",
    type: "website",
  },
};

const tennisLinks = [
  { href: "/atp-live", label: "ATP Live", sub: "Men's live rankings", sport: "atp", isLive: true },
  { href: "/wta-live", label: "WTA Live", sub: "Women's live rankings", sport: "wta", isLive: true },
  { href: "/wta-rankings", label: "WTA Rankings", sub: "Full women's rankings", sport: "wta", isLive: false },
];

const worldCupLinks = [
  { href: "/world-cup", label: "FIFA 2026", sub: "Live standings & schedule", sport: "worldcup", isLive: true },
];

const cyclingLinks = [
  { href: "/events/giro-2026", label: "Giro d'Italia", sub: "Grand Tour 2026", sport: "cycling", isLive: false },
  { href: "/events/tdf-2026", label: "Tour de France", sub: "Grand Tour 2026", sport: "cycling", isLive: false },
  { href: "/events/tour-of-flanders-2026", label: "Tour of Flanders", sub: "Monument 2026", sport: "cycling", isLive: false },
];

function SportCard({
  href,
  label,
  sub,
  sport,
  isLive
}: {
  href: string;
  label: string;
  sub: string;
  sport: string;
  isLive: boolean;
}) {
  return (
    <Link
      href={href}
      data-sport={sport}
      className="group flex items-center justify-between rounded-2xl border border-edge bg-surface p-5 transition hover:border-accent/60 hover:bg-surface2"
    >
      <div>
        <div className="flex items-center gap-2">
          {isLive && (
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60"
                style={{ animation: "pulse-dot 1.6s ease-in-out infinite" }}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
          )}
          <span className="text-lg font-bold text-fg">{label}</span>
        </div>
        <p className="mt-1 text-xs text-muted">{sub}</p>
      </div>
      <span className="text-accent transition group-hover:translate-x-0.5">→</span>
    </Link>
  );
}

export default function HomePage() {
  // Group and sort events
  const upcomingEvents = allEvents
    .filter((s) => s.event.status === "upcoming")
    .sort((a, b) => new Date(a.event.startDate).getTime() - new Date(b.event.startDate).getTime());

  const pastEvents = allEvents
    .filter((s) => s.event.status === "completed")
    .sort((a, b) => new Date(b.event.endDate || b.event.startDate).getTime() - new Date(a.event.endDate || a.event.startDate).getTime());

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <HeroBanner
        icon="🏆"
        title="Live Sports Rankings"
        subtitle="Real-time ATP & WTA tennis, FIFA World Cup standings, cycling Grand Tours & classics."
        live={false}
        stats={[
          { label: "Sports", value: "Tennis · Football · Cycling" },
          { label: "Updated", value: "Live" },
        ]}
      />

      {/* Tennis Section */}
      <section className="mb-12">
        <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wide text-muted">
          Tennis
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {tennisLinks.map((link) => (
            <SportCard key={link.href} {...link} />
          ))}
        </div>
      </section>

      {/* World Cup Section */}
      <section className="mb-12">
        <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wide text-muted">
          World Cup
        </h2>
        <div className="grid gap-4">
          {worldCupLinks.map((link) => (
            <SportCard key={link.href} {...link} />
          ))}
        </div>
      </section>

      {/* Cycling Section */}
      <section className="mb-12">
        <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wide text-muted">
          Cycling
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {cyclingLinks.map((link) => (
            <SportCard key={link.href} {...link} />
          ))}
        </div>
      </section>

      {/* Events & Archives */}
      <section>
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-wide text-muted">
          Events &amp; archives
        </h2>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <div className="mb-10">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted opacity-75">
              Upcoming
            </h3>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((summary) => (
                <EventCard key={summary.event.id} summary={summary} />
              ))}
            </div>
          </div>
        )}

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted opacity-75">
              Past
            </h3>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {pastEvents.map((summary) => (
                <EventCard key={summary.event.id} summary={summary} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
