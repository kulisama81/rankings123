import { Suspense } from "react";
import type { AtpLiveSnapshot, Tour } from "@/types";
import LiveRankingTable from "./LiveRankingTable";
import HeroBanner from "./HeroBanner";

interface LiveRankingViewProps {
  tour: Tour;
  snapshot: AtpLiveSnapshot;
}

export default function LiveRankingView({ tour, snapshot }: LiveRankingViewProps) {
  const tourLabel = snapshot.tourLabel ?? tour.toUpperCase();
  const players = snapshot.players;
  const top = players[0];
  const liveCount = players.filter((p) => p.tournament?.active).length;

  const stats = top
    ? [
        { label: "Live #1", value: `${top.flag} ${top.name}` },
        { label: "Points", value: top.livePoints.toLocaleString() },
        { label: "In play", value: String(liveCount) },
        { label: "Ranked", value: String(players.length) },
      ]
    : undefined;

  return (
    <div data-sport={tour} className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <HeroBanner
        icon="🎾"
        title={`${tourLabel} Live Ranking`}
        subtitle={snapshot.weekLabel}
        stats={stats}
      />
      <Suspense fallback={<div className="text-center text-muted">Loading...</div>}>
        <LiveRankingTable tour={tour} initialSnapshot={snapshot} />
      </Suspense>
    </div>
  );
}
