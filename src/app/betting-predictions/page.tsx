import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tennis Betting Predictions 2026 | Expert Picks & Odds | Rankings123",
  description:
    "Expert tennis betting predictions for 2026. Comprehensive guides for Grand Slams, Masters 1000, and major tournaments. Odds analysis, value picks, and betting strategy for ATP and WTA events.",
  keywords: [
    "tennis betting predictions",
    "tennis betting picks 2026",
    "atp betting predictions",
    "wta betting predictions",
    "grand slam betting",
    "masters 1000 betting",
    "tennis odds",
    "tennis betting guide",
  ],
  openGraph: {
    title: "Tennis Betting Predictions 2026 | Expert Picks & Odds",
    description:
      "Expert tennis betting predictions, odds analysis, and value picks for all major tournaments. Grand Slams, Masters 1000, and more.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tennis Betting Predictions 2026 | Expert Picks & Odds",
    description:
      "Expert tennis betting predictions and odds analysis for Grand Slams, Masters 1000, and major tournaments.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Tennis Betting Predictions 2026",
  description:
    "Comprehensive tennis betting predictions, odds analysis, and expert picks for Grand Slams, Masters 1000, and major ATP/WTA tournaments.",
  publisher: {
    "@type": "Organization",
    name: "Rankings123",
  },
};

interface BettingArticle {
  title: string;
  href: string;
  description: string;
  tournament: string;
  date: string;
  status: "live" | "upcoming" | "past";
}

// CX-first gate: only show betting articles when affiliate links are live
// This prevents broken links when individual betting pages return 404
const allBettingArticles: BettingArticle[] = [
  {
    title: "US Open 2026 Betting Favorites",
    href: "/articles/us-open-2026-betting-favorites",
    description:
      "Carlos Alcaraz and Aryna Sabalenka lead odds after Sinner's withdrawal. Complete betting guide with value picks and title paths.",
    tournament: "US Open",
    date: "Aug 30 – Sep 13",
    status: "upcoming",
  },
  {
    title: "Cincinnati Open 2026 Betting Guide",
    href: "/articles/cincinnati-open-2026-betting-guide",
    description:
      "Mid-tournament analysis with Zverev leading ATP favorites and Sabalenka dominating WTA. Value picks for the final stages.",
    tournament: "Cincinnati Masters",
    date: "Aug 13 – 23",
    status: "live",
  },
];

const bettingArticles =
  process.env.BETTING_AFFILIATES_LIVE === "true" ? allBettingArticles : [];

interface UpcomingTournament {
  name: string;
  dates: string;
  surface: string;
  level: string;
}

const upcomingTournaments: UpcomingTournament[] = [
  {
    name: "US Open",
    dates: "Aug 30 – Sep 13",
    surface: "Hard",
    level: "Grand Slam",
  },
  {
    name: "Paris Masters",
    dates: "Oct 28 – Nov 3",
    surface: "Hard (Indoor)",
    level: "Masters 1000",
  },
  {
    name: "ATP Finals",
    dates: "Nov 10 – 17",
    surface: "Hard (Indoor)",
    level: "Year-End Championships",
  },
];

export default function BettingPredictionsPage() {
  const liveArticles = bettingArticles.filter((a) => a.status === "live");
  const upcomingArticles = bettingArticles.filter(
    (a) => a.status === "upcoming"
  );
  const pastArticles = bettingArticles.filter((a) => a.status === "past");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <header className="mb-12 border-b border-edge pb-8">
          <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-accent">
            Tennis Betting Hub
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-fg sm:text-5xl">
            Tennis Betting Predictions 2026
          </h1>
          <p className="max-w-3xl text-xl text-muted-hover">
            Expert betting predictions, odds analysis, and value picks for Grand
            Slams, Masters 1000, and major ATP/WTA tournaments. Your central hub
            for tennis betting content.
          </p>
        </header>

        {/* Live Tournaments */}
        {liveArticles.length > 0 && (
          <section className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-2 w-2 animate-pulse rounded-full bg-accent"></div>
              <h2 className="text-2xl font-bold tracking-tight text-fg">
                Live Tournaments
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {liveArticles.map((article) => (
                <Link
                  key={article.href}
                  href={article.href}
                  className="group rounded-lg border border-edge bg-surface p-6 transition-colors hover:border-accent hover:bg-surface2"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-sm font-semibold text-accent">
                      {article.tournament}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-hover">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent"></div>
                      <span>LIVE</span>
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-fg group-hover:text-accent">
                    {article.title}
                  </h3>
                  <p className="mb-3 text-sm text-muted-hover">
                    {article.description}
                  </p>
                  <div className="text-xs text-muted">{article.date}</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Upcoming Tournaments */}
        {upcomingArticles.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-fg">
              Upcoming Tournaments
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {upcomingArticles.map((article) => (
                <Link
                  key={article.href}
                  href={article.href}
                  className="group rounded-lg border border-edge bg-surface p-6 transition-colors hover:border-accent hover:bg-surface2"
                >
                  <div className="mb-2 text-sm font-semibold text-accent">
                    {article.tournament}
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-fg group-hover:text-accent">
                    {article.title}
                  </h3>
                  <p className="mb-3 text-sm text-muted-hover">
                    {article.description}
                  </p>
                  <div className="text-xs text-muted">{article.date}</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Betting Research Tools */}
        <section className="mb-12 rounded-lg border border-edge bg-surface2 p-6">
          <h2 className="mb-4 text-xl font-bold text-fg">
            Betting Research Tools
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Link
              href="/atp-live"
              className="group flex flex-col rounded-lg border border-edge bg-surface p-4 transition-colors hover:border-accent"
            >
              <div className="mb-2 text-sm font-semibold text-accent">
                ATP Rankings
              </div>
              <div className="text-sm text-muted-hover">
                Live ATP rankings with projected points for betting research
              </div>
            </Link>
            <Link
              href="/wta-live"
              className="group flex flex-col rounded-lg border border-edge bg-surface p-4 transition-colors hover:border-accent"
            >
              <div className="mb-2 text-sm font-semibold text-accent">
                WTA Rankings
              </div>
              <div className="text-sm text-muted-hover">
                Live WTA rankings with projected points for betting research
              </div>
            </Link>
            <Link
              href="/whats-new"
              className="group flex flex-col rounded-lg border border-edge bg-surface p-4 transition-colors hover:border-accent"
            >
              <div className="mb-2 text-sm font-semibold text-accent">
                Latest Updates
              </div>
              <div className="text-sm text-muted-hover">
                Recent changes and new betting content on Rankings123
              </div>
            </Link>
          </div>
        </section>

        {/* Tournament Calendar */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-fg">
            Upcoming Betting Opportunities
          </h2>
          <div className="overflow-hidden rounded-lg border border-edge">
            <table className="w-full">
              <thead className="bg-surface2">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-fg">
                    Tournament
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-fg">
                    Dates
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-fg">
                    Surface
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-fg">
                    Level
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-edge bg-surface">
                {upcomingTournaments.map((tournament) => (
                  <tr key={tournament.name}>
                    <td className="px-4 py-3 font-medium text-fg">
                      {tournament.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-hover">
                      {tournament.dates}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-hover">
                      {tournament.surface}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-hover">
                      {tournament.level}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Past Articles Archive */}
        {pastArticles.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-fg">
              Past Predictions
            </h2>
            <div className="grid gap-4">
              {pastArticles.map((article) => (
                <Link
                  key={article.href}
                  href={article.href}
                  className="group flex items-center justify-between rounded-lg border border-edge bg-surface p-4 transition-colors hover:border-accent hover:bg-surface2"
                >
                  <div>
                    <div className="mb-1 text-sm font-semibold text-fg group-hover:text-accent">
                      {article.title}
                    </div>
                    <div className="text-xs text-muted">{article.tournament} · {article.date}</div>
                  </div>
                  <div className="text-accent opacity-0 transition-opacity group-hover:opacity-100">
                    →
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Disclaimer */}
        <section className="rounded-lg border-l-4 border-accent bg-surface2 p-6">
          <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">
            Responsible Betting
          </div>
          <div className="space-y-2 text-sm text-muted-hover">
            <p>
              <strong className="text-fg">Disclaimer:</strong> All betting
              predictions and analysis are for informational and entertainment
              purposes only. Always gamble responsibly and within your means.
            </p>
            <p>
              If you or someone you know has a gambling problem, help is
              available at{" "}
              <a
                href="https://www.ncpgambling.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent hover:underline"
              >
                1-800-GAMBLER
              </a>
              .
            </p>
            <p className="text-xs text-muted">
              Rankings123 is an independent tennis statistics platform. We are
              not affiliated with or endorsed by the ATP, WTA, or any betting
              operator.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
