import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAtpDeepRankingData } from "@/lib/atpDeepRanking";
import { findPlayerBySlugOrGuid, getTop200WithSlugs, playerToSlug } from "@/lib/playerSlug";
import Link from "next/link";
import type { AtpLivePlayer } from "@/types";

export const revalidate = 60;

interface Props {
  params: Promise<{ id: string }>;
}

// Generate static params for top 200 ATP players (SEO)
export async function generateStaticParams() {
  try {
    const snapshot = await getAtpDeepRankingData();
    const top200 = getTop200WithSlugs(snapshot.players, 200);
    return top200.map((p) => ({ id: p.slug }));
  } catch {
    return []; // Graceful degradation
  }
}

async function getPlayerData(idOrSlug: string): Promise<{ player: AtpLivePlayer; slug: string } | null> {
  // Use deep ranking for full top 200 coverage
  const snapshot = await getAtpDeepRankingData();
  const player = findPlayerBySlugOrGuid(snapshot.players, idOrSlug);
  if (!player) return null;
  return { player, slug: playerToSlug(player.name) };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const result = await getPlayerData(id);
  if (!result) return { title: "Player Not Found" };

  const { player, slug } = result;
  const canonicalUrl = `/atp/player/${slug}`;

  return {
    title: `${player.name} — ATP Live Ranking`,
    description: `${player.name} live ATP ranking: #${player.liveRank} (official #${player.officialRank}). ${player.tournament ? `Currently playing ${player.tournament.name}` : "Current points, rank movement, and tournament status."}`,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${player.name} — ATP Rankings123`,
      description: `Live rank #${player.liveRank} · ${player.livePoints.toLocaleString()} points`,
      url: canonicalUrl,
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
        className={`type-hero tabular-nums ${isLive ? "text-accent" : "text-fg"}`}
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
      <div className="type-hero tabular-nums">
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

export default async function AtpPlayerPage({ params }: Props) {
  const { id } = await params;
  const result = await getPlayerData(id);

  if (!result) notFound();

  const { player } = result;

  const hasTournament = Boolean(player.tournament);
  const isActiveTournament = player.tournament?.active ?? false;

  return (
    <div data-sport="atp" className="min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/atp-live"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted transition hover:text-fg"
        >
          <span>←</span>
          <span>Back to ATP Live Rankings</span>
        </Link>

        <div className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <span className="text-5xl leading-none">{player.flag}</span>
            <h1 className="type-title text-fg">
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
