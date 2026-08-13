import type { Metadata } from "next";
import { getDoublesData } from "@/lib/doublesFeed";
import Link from "next/link";

export const revalidate = 3600; // Revalidate hourly

export const metadata: Metadata = {
  title: "ATP Doubles Rankings — Live Team Rankings | Rankings123",
  description:
    "ATP doubles rankings with live team standings, points, and movement. Track the top 100 men's doubles teams including Granollers/Zeballos, Arevalo/Rojer, and Krawietz/Puetz.",
  keywords: [
    "atp doubles rankings",
    "tennis doubles",
    "atp doubles",
    "mens doubles rankings",
    "doubles team rankings",
    "atp doubles points",
  ],
  alternates: { canonical: "/atp-doubles" },
  openGraph: {
    title: "ATP Doubles Rankings — Live Team Rankings",
    description:
      "ATP doubles rankings with live team standings, points, and movement. Track the top 100 men's doubles teams.",
    url: "/atp-doubles",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ATP Doubles Rankings — Live Team Rankings",
    description:
      "ATP doubles rankings with live team standings and points.",
  },
};

export default async function AtpDoublesPage() {
  const snapshot = await getDoublesData("ATP");

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8">
        <div className="mb-2 flex items-center gap-2 text-sm text-muted">
          <Link href="/" className="hover:text-fg">
            Home
          </Link>
          <span>→</span>
          <span>ATP Doubles</span>
        </div>
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-fg">
          ATP Doubles Rankings
        </h1>
        <p className="text-lg text-muted-hover">
          Official ATP men&apos;s doubles team rankings with points and movement
        </p>
      </header>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-muted">
          <div className="flex items-center gap-1.5">
            <div
              className={`size-2 rounded-full ${snapshot.source === "espn" ? "bg-green-500" : "bg-yellow-500"}`}
            />
            <span>
              Data source:{" "}
              {snapshot.source === "espn"
                ? "ESPN Live"
                : snapshot.source === "wta"
                  ? "Official ATP"
                  : "Mock data"}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href="/atp-live"
            className="btn-base btn-secondary rounded-lg px-4 py-2"
          >
            Singles Rankings
          </Link>
          <Link
            href="/wta-doubles"
            className="btn-base btn-secondary rounded-lg px-4 py-2"
          >
            WTA Doubles
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-edge">
        <table className="w-full">
          <thead className="border-b border-edge bg-surface2">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-fg">
                Rank
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-fg">
                Team
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-fg">
                Country
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-fg">
                Points
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-fg">
                Movement
              </th>
            </tr>
          </thead>
          <tbody>
            {snapshot.teams.map((team, idx) => (
              <tr
                key={team.rank}
                className={`border-b border-edge last:border-b-0 ${
                  idx % 2 === 0 ? "bg-bg" : "bg-surface1"
                }`}
              >
                <td className="px-4 py-3 text-sm font-semibold text-fg">
                  {team.rank}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl" aria-label={team.country}>
                      {team.flag}
                    </span>
                    <span className="text-sm font-medium text-fg">
                      {team.player1} / {team.player2}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-muted">
                  {team.country}
                </td>
                <td className="px-4 py-3 text-right font-mono text-sm font-semibold text-fg">
                  {team.points.toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-center">
                    {team.movement > 0 ? (
                      <span className="flex items-center gap-1 text-sm font-semibold text-green-600 dark:text-green-400">
                        ▲ {team.movement}
                      </span>
                    ) : team.movement < 0 ? (
                      <span className="flex items-center gap-1 text-sm font-semibold text-red-600 dark:text-red-400">
                        ▼ {Math.abs(team.movement)}
                      </span>
                    ) : (
                      <span className="text-sm text-muted">—</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {snapshot.source === "mock" && (
        <div className="mt-6 rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-4 text-sm text-muted-hover">
          <p>
            <strong>Data source:</strong> Currently displaying representative
            mock data. Live ATP doubles rankings feed integration in progress.
          </p>
        </div>
      )}

      <div className="mt-8 rounded-lg bg-surface2 p-6">
        <h2 className="mb-3 text-xl font-bold text-fg">
          About ATP Doubles Rankings
        </h2>
        <p className="text-sm leading-relaxed text-muted-hover">
          The ATP doubles rankings track the best men&apos;s doubles teams in
          professional tennis. Points are awarded based on performance at Grand
          Slams, ATP Masters 1000, ATP 500, and ATP 250 tournaments. Teams are
          ranked by total points earned over a rolling 52-week period.
        </p>
      </div>
    </div>
  );
}
