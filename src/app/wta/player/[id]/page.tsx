import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLiveData } from "@/lib/liveFeed";
import Link from "next/link";
import type { AtpLivePlayer } from "@/types";

export const revalidate = 60;

interface Props {
  params: Promise<{ id: string }>;
}

async function getPlayerData(guid: string): Promise<AtpLivePlayer | null> {
  const snapshot = await getLiveData("wta");
  return snapshot.players.find((p) => p.guid === guid) ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const player = await getPlayerData(id);
  if (!player) return { title: "Player Not Found" };

  return {
    title: `${player.name} — WTA Live Ranking`,
    description: `${player.name} live WTA ranking: #${player.liveRank} (official #${player.officialRank}). ${player.tournament ? `Currently playing ${player.tournament.name}` : "Current points, rank movement, and tournament status."}`,
    alternates: { canonical: `/wta/player/${id}` },
    openGraph: {
      title: `${player.name} — WTA Rankings123`,
      description: `Live rank #${player.liveRank} · ${player.livePoints.toLocaleString()} points`,
      url: `/wta/player/${id}`,
      type: "profile",
    },
  };
}

function RankCard({
  label,
  rank,
  subtitle,
  isLive,
}: {
  label: string;
  rank: number | string;
  subtitle?: string;
  isLive?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-6 transition ${
        isLive
          ? "border-accent bg-accent/5"
          : "border-edge bg-surface"
      }`}
      style={
        isLive
          ? {
              boxShadow: "0 0 24px color-mix(in srgb, var(--accent) 15%, transparent)",
            }
          : undefined
      }
    >
      <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">
        {label}
      </div>
      <div
        className={`font-display text-5xl font-black tabular-nums ${isLive ? "text-accent" : "text-fg"}`}
      >
        {typeof rank === "number" ? `#${rank}` : rank}
      </div>
      {subtitle && (
        <div className="mt-1 text-sm tabular-nums text-muted">{subtitle}</div>
      )}
    </div>
  );
}

function MovementCard({ value }: { value: number }) {
  const isUp = value > 0;
  const isDown = value < 0;
  const colorClass = isUp
    ? "text-up border-up/20 bg-up/5"
    : isDown
      ? "text-down border-down/20 bg-down/5"
      : "text-muted border-edge bg-surface";

  return (
    <div className={`rounded-2xl border p-6 transition ${colorClass}`}>
      <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">
        Movement
      </div>
      <div className="font-display text-5xl font-black tabular-nums">
        {isUp ? `▲${value}` : isDown ? `▼${Math.abs(value)}` : "—"}
      </div>
      <div className="mt-1 text-sm text-muted">
        {isUp ? "positions up" : isDown ? "positions down" : "no change"}
      </div>
    </div>
  );
}

function LiveDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span
        className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60"
        style={{ animation: "pulse-dot 1.6s ease-in-out infinite" }}
      />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
    </span>
  );
}

export default async function WtaPlayerPage({ params }: Props) {
  const { id } = await params;
  const player = await getPlayerData(id);

  if (!player) notFound();

  const hasTournament = Boolean(player.tournament);
  const isActiveTournament = player.tournament?.active ?? false;

  return (
    <div data-sport="wta" className="min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/wta-live"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted transition hover:text-fg"
        >
          <span>←</span>
          <span>Back to WTA Live Rankings</span>
        </Link>

        <div className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <span className="text-5xl leading-none">{player.flag}</span>
            <h1 className="font-display text-4xl font-black text-fg sm:text-5xl">
              {player.name}
            </h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted">
            <span>{player.countryCode}</span>
            {player.age > 0 && (
              <>
                <span>·</span>
                <span>{player.age} years old</span>
              </>
            )}
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <RankCard
            label="Live Rank"
            rank={player.liveRank}
            subtitle={`${player.livePoints.toLocaleString()} pts`}
            isLive={isActiveTournament}
          />
          <RankCard
            label="Official Rank"
            rank={player.officialRank}
            subtitle={`${player.officialPoints.toLocaleString()} pts`}
          />
          <MovementCard value={player.movement} />
        </div>

        {hasTournament && (
          <div
            className={`rounded-2xl border p-6 ${
              isActiveTournament
                ? "border-accent/20 bg-accent/5"
                : "border-edge bg-surface"
            }`}
          >
            <div className="mb-3 flex items-center gap-2">
              {isActiveTournament && <LiveDot />}
              <h2 className="font-display text-lg font-bold text-fg">
                {isActiveTournament ? "In Play This Week" : "This Week"}
              </h2>
            </div>
            <div className="mb-2 text-2xl font-bold text-fg">
              {player.tournament?.name}
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-muted">
                {player.tournament?.round}
                {!isActiveTournament && " · eliminated"}
              </span>
              {player.pointsDelta > 0 && (
                <>
                  <span className="text-muted">·</span>
                  <span className="font-semibold text-up">
                    +{player.pointsDelta} points earned
                  </span>
                </>
              )}
            </div>
          </div>
        )}

        {!hasTournament && (
          <div className="rounded-2xl border border-edge bg-surface p-6">
            <div className="text-sm text-muted">
              Not currently in a tournament
            </div>
          </div>
        )}

        {player.careerHigh && (
          <div className="mt-6 rounded-2xl border border-edge bg-surface p-6">
            <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">
              Career High
            </div>
            <div className="font-display text-3xl font-black text-fg">
              #{player.careerHigh}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
