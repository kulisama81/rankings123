import type { AtpLiveSnapshot, AtpLivePlayer, Tour } from "@/types";
import LiveRankingTable from "./LiveRankingTable";
import HeroBanner from "./HeroBanner";

interface LiveRankingViewProps {
  tour: Tour;
  snapshot: AtpLiveSnapshot;
}

// Server-rendered table that shows in SSR and gets replaced by interactive version
function StaticRankingTable({ players }: { players: AtpLivePlayer[] }) {
  const pageRows = players.slice(0, 50);

  return (
    <div id="ssr-table" className="contents">
      <div className="hidden overflow-hidden rounded-2xl border border-edge bg-surface md:block">
        <table className="min-w-full text-sm">
          <thead className="bg-surface2 text-[11px] uppercase tracking-wide text-muted">
            <tr>
              <th className="px-3 py-2.5 text-right">#</th>
              <th className="px-2 py-2.5 text-center">+/-</th>
              <th className="px-3 py-2.5 text-left">Player</th>
              <th className="px-2 py-2.5 text-center">Age</th>
              <th className="px-3 py-2.5 text-right">Live Pts</th>
              <th className="px-2 py-2.5 text-right">Δ</th>
              <th className="px-3 py-2.5 text-right">Official</th>
              <th className="px-3 py-2.5 text-left">Tournament</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.map((p) => (
              <tr key={p.name} className="border-t border-edge">
                <td className="px-3 py-2 text-right">
                  <span className="inline-flex h-7 min-w-[28px] items-center justify-center rounded-lg px-1.5 text-sm font-bold tabular-nums text-muted">
                    {p.liveRank}
                  </span>
                </td>
                <td className="px-2 py-2 text-center">
                  {p.movement > 0 && <span className="text-xs text-up">▲{p.movement}</span>}
                  {p.movement < 0 && <span className="text-xs text-down">▼{Math.abs(p.movement)}</span>}
                  {p.movement === 0 && <span className="text-xs text-muted/50">—</span>}
                </td>
                <td className="px-3 py-2">
                  <span className="flex items-center gap-2">
                    <span className="text-base leading-none">{p.flag}</span>
                    <span className="font-semibold text-fg">{p.name}</span>
                    <span className="text-xs text-muted">{p.countryCode}</span>
                  </span>
                </td>
                <td className="px-2 py-2 text-center text-muted">{p.age || "—"}</td>
                <td className="px-3 py-2 text-right text-[15px] font-bold text-fg tabular-nums">
                  {p.livePoints.toLocaleString()}
                </td>
                <td className="px-2 py-2 text-right">
                  {p.pointsDelta > 0 && <span className="text-xs font-medium tabular-nums text-up">+{p.pointsDelta}</span>}
                  {p.pointsDelta < 0 && <span className="text-xs font-medium tabular-nums text-down">{p.pointsDelta}</span>}
                  {p.pointsDelta === 0 && <span className="text-xs text-muted/40">—</span>}
                </td>
                <td className="px-3 py-2 text-right tabular-nums text-muted">
                  {p.officialPoints.toLocaleString()}
                </td>
                <td className="px-3 py-2 text-xs text-muted">
                  {p.tournament?.name || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-2 md:hidden">
        {pageRows.map((p) => (
          <div key={p.name} className="rounded-xl border border-edge bg-surface p-3">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-7 min-w-[28px] items-center justify-center rounded-lg px-1.5 text-sm font-bold tabular-nums text-muted">
                {p.liveRank}
              </span>
              <span className="text-base leading-none">{p.flag}</span>
              <span className="flex-1 font-semibold text-fg">{p.name}</span>
              <span className="font-bold text-fg tabular-nums">{p.livePoints.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
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
      <StaticRankingTable players={players} />
      <LiveRankingTable tour={tour} initialSnapshot={snapshot} />
    </div>
  );
}
