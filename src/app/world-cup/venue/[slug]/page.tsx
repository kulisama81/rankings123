import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getWorldCupData } from "@/lib/worldCupFeed";
import { venueToSlug, parseVenue } from "@/lib/worldCupVenue";
import type { WorldCupMatch } from "@/types";

interface VenuePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: VenuePageProps): Promise<Metadata> {
  const { slug } = await params;
  const snapshot = await getWorldCupData();

  // Find the venue by matching slug
  const venueMatch = snapshot.matches.find(
    (m) => m.venue && venueToSlug(m.venue) === slug
  );

  if (!venueMatch || !venueMatch.venue) {
    return { title: "Venue Not Found" };
  }

  const { stadiumName, cityState } = parseVenue(venueMatch.venue);

  return {
    title: `${stadiumName} — World Cup 2026 Matches in ${cityState}`,
    description: `FIFA World Cup 2026 matches at ${stadiumName}, ${cityState}. Schedule, results, and venue information.`,
    alternates: { canonical: `/world-cup/venue/${slug}` },
    openGraph: {
      title: `${stadiumName} — World Cup 2026 — Rankings123`,
      description: `FIFA World Cup 2026 matches at ${stadiumName}, ${cityState}. Schedule, results, and venue information.`,
      url: `/world-cup/venue/${slug}`,
      type: "website",
    },
  };
}

export const revalidate = 60; // ISR: 1 minute cache

function MatchCard({ match }: { match: WorldCupMatch }) {
  const resultClass = () => {
    if (match.state === "post" && match.homeScore !== null && match.awayScore !== null) {
      return "text-fg";
    } else if (match.state === "in") {
      return "text-accent";
    }
    return "text-muted";
  };

  return (
    <Link
      href={`/world-cup/match/${match.id}`}
      className="block rounded-xl border border-edge bg-surface p-4 transition-colors hover:bg-surface2"
    >
      <div className="mb-3 text-xs text-muted">
        {new Date(match.date).toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })}
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1">
              <span className="text-lg" aria-hidden="true">
                {match.homeFlag}
              </span>
              <span className="font-semibold text-fg">{match.homeName}</span>
            </div>
            <div className={`text-xl font-bold tabular-nums ${resultClass()}`}>
              {match.homeScore ?? "–"}
            </div>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1">
              <span className="text-lg" aria-hidden="true">
                {match.awayFlag}
              </span>
              <span className="font-semibold text-fg">{match.awayName}</span>
            </div>
            <div className={`text-xl font-bold tabular-nums ${resultClass()}`}>
              {match.awayScore ?? "–"}
            </div>
          </div>
        </div>
        <div className="text-xs text-muted">{match.statusDetail}</div>
      </div>
    </Link>
  );
}

export default async function VenuePage({ params }: VenuePageProps) {
  const { slug } = await params;
  const snapshot = await getWorldCupData();

  // Find all matches at this venue
  const venueMatches = snapshot.matches.filter(
    (m) => m.venue && venueToSlug(m.venue) === slug
  );

  if (venueMatches.length === 0) {
    notFound();
  }

  // Get venue details from the first match
  const firstMatch = venueMatches[0];
  const venueName = firstMatch.venue!;
  const { stadiumName, cityState, shortName } = parseVenue(venueName);

  // Separate matches by state
  const completedMatches = venueMatches.filter((m) => m.state === "post");
  const upcomingMatches = venueMatches.filter((m) => m.state === "pre");
  const liveMatches = venueMatches.filter((m) => m.state === "in");

  // Sort: completed newest first, then upcoming by date ascending
  completedMatches.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  upcomingMatches.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Stats
  const totalGoals = completedMatches.reduce(
    (sum, m) => sum + (m.homeScore ?? 0) + (m.awayScore ?? 0),
    0
  );

  return (
    <div
      data-sport="worldcup"
      className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8"
    >
      <nav className="mb-6 text-sm text-muted">
        <Link href="/world-cup" className="hover:text-fg">
          World Cup 2026
        </Link>
        {" / "}
        <Link href="/world-cup" className="hover:text-fg">
          Venues
        </Link>
        {" / "}
        <span className="text-fg">{shortName}</span>
      </nav>

      <div className="mb-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-fg sm:text-4xl">
              {stadiumName}
            </h1>
            {cityState && (
              <p className="mt-2 text-lg text-muted">{cityState}</p>
            )}
          </div>
          {snapshot.source === "mock" && (
            <span className="rounded-full bg-down/15 px-3 py-1 text-xs font-medium text-down">
              Demo data
            </span>
          )}
        </div>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-edge bg-surface p-4">
          <div className="text-xs uppercase tracking-wide text-muted">
            Total Matches
          </div>
          <div className="mt-1 text-2xl font-bold text-fg">
            {venueMatches.length}
          </div>
        </div>
        <div className="rounded-xl border border-edge bg-surface p-4">
          <div className="text-xs uppercase tracking-wide text-muted">
            Completed
          </div>
          <div className="mt-1 text-2xl font-bold text-fg">
            {completedMatches.length}
          </div>
        </div>
        <div className="rounded-xl border border-edge bg-surface p-4">
          <div className="text-xs uppercase tracking-wide text-muted">
            Goals Scored
          </div>
          <div className="mt-1 text-2xl font-bold text-fg">{totalGoals}</div>
        </div>
      </div>

      <div className="space-y-8">
        {liveMatches.length > 0 && (
          <section>
            <h2 className="mb-4 text-xl font-bold tracking-tight text-fg">
              Live Now
            </h2>
            <div className="space-y-3">
              {liveMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </section>
        )}

        {upcomingMatches.length > 0 && (
          <section>
            <h2 className="mb-4 text-xl font-bold tracking-tight text-fg">
              Upcoming Matches
            </h2>
            <div className="space-y-3">
              {upcomingMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </section>
        )}

        {completedMatches.length > 0 && (
          <section>
            <h2 className="mb-4 text-xl font-bold tracking-tight text-fg">
              Results
            </h2>
            <div className="space-y-3">
              {completedMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
