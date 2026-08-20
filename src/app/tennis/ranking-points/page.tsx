import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedLinks from "@/components/RelatedLinks";
import { generateBreadcrumbSchema, generateFAQSchema, JsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "ATP & WTA Ranking Points Explained | Tennis Rankings System",
  description:
    "Complete guide to ATP and WTA tennis ranking points. Learn how ranking points are awarded by tournament tier (Grand Slams, Masters 1000, ATP/WTA 500, 250), points breakdown by round, and how the ranking system works.",
  alternates: { canonical: "/tennis/ranking-points" },
  openGraph: {
    title: "ATP & WTA Tennis Ranking Points — Complete Guide",
    description:
      "Comprehensive reference for ATP and WTA ranking points by tournament tier. Grand Slam, Masters, ATP/WTA 500, 250 points breakdown.",
    url: "/tennis/ranking-points",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ATP & WTA Ranking Points Guide",
    description:
      "Complete breakdown of ATP and WTA ranking points by tournament tier and round. Learn how the tennis ranking system works.",
  },
  keywords: [
    "atp ranking points",
    "wta ranking points",
    "tennis ranking system",
    "how many points is a grand slam",
    "atp points breakdown",
    "wta points breakdown",
    "tennis ranking points explained",
    "masters 1000 points",
    "atp 500 points",
    "grand slam points",
    "tennis points by round",
    "how tennis rankings work",
  ],
};

const faqItems = [
  {
    question: "How are ATP rankings calculated?",
    answer:
      "ATP rankings are calculated based on a player's best 18 tournament results over the previous 52 weeks. Players earn ranking points by winning matches in ATP-sanctioned tournaments. The more prestigious the tournament (Grand Slam, Masters 1000, ATP 500, ATP 250), the more points are awarded. Rankings are updated weekly every Monday.",
  },
  {
    question: "How many points is a Grand Slam worth?",
    answer:
      "A Grand Slam singles champion earns 2,000 ranking points. Runner-up receives 1,200 points, semifinalists earn 720 points each, and quarterfinalists receive 360 points. This applies to all four Grand Slam tournaments: Australian Open, French Open, Wimbledon, and US Open for both ATP and WTA.",
  },
  {
    question: "What is the difference between ATP rankings and ATP Race?",
    answer:
      "ATP rankings reflect a player's best 18 results over the past 52 weeks (rolling 12-month window). The ATP Race rankings count only points earned in the current calendar year, from January 1st. The Race determines qualification for the year-end ATP Finals and resets to zero every January 1st.",
  },
  {
    question: "How often do tennis rankings update?",
    answer:
      "Official ATP and WTA rankings are updated every Monday. Points are added or removed based on tournament results from the previous week. During tournaments, live rankings fluctuate based on ongoing match results, showing where players would rank if the tournament ended at that moment.",
  },
  {
    question: "Do ATP and WTA use the same ranking points system?",
    answer:
      "ATP and WTA use similar but not identical systems. Grand Slams award 2,000 points for both tours. However, tier naming differs: ATP has Masters 1000, ATP 500, and ATP 250, while WTA has WTA 1000, WTA 500, and WTA 250. Points distribution is generally aligned for equivalent tiers.",
  },
  {
    question: "How long do ranking points last?",
    answer:
      "Ranking points stay on a player's record for 52 weeks (one year) from the Monday following the tournament. After 52 weeks, those points drop off and are replaced by points earned at the same tournament the following year. This creates a 'rolling' 52-week ranking system.",
  },
  {
    question: "What are qualifier points in tennis?",
    answer:
      "Players who compete in qualifying rounds earn points for each qualifying match won, in addition to points earned in the main draw. Qualifying points vary by tournament tier. For Grand Slams, reaching the main draw through qualifying earns 25 points, plus additional points for each qualifying round win.",
  },
];

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Tennis", url: "/tennis/ranking-points" },
  { name: "Ranking Points", url: "/tennis/ranking-points" },
]);

const faqSchema = generateFAQSchema(faqItems);

export default function TennisRankingPointsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <div className="mx-auto max-w-6xl px-4 py-8">
        <Breadcrumb
          items={[
            { name: "Home", url: "/" },
            { name: "Tennis", url: "/tennis/ranking-points" },
            { name: "Ranking Points" },
          ]}
        />

        <header className="mb-8">
          <h1 className="mb-4 text-4xl font-bold text-[--text-primary]">
            Tennis Ranking Points Explained
          </h1>
          <p className="text-lg text-[--text-secondary]">
            Complete guide to ATP and WTA ranking points. Understand how points
            are awarded by tournament tier, round-by-round breakdown, and how
            the professional tennis ranking system works.
          </p>
        </header>

        {/* ATP Singles Points */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold text-[--text-primary]">
            ATP Singles Ranking Points
          </h2>
          <p className="mb-6 text-[--text-secondary]">
            ATP ranking points are awarded based on tournament tier and the
            round reached. Higher-tier tournaments offer more points, and
            advancing deeper into the draw earns more points.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-[--border-primary] bg-[--surface-secondary]">
                  <th className="px-4 py-3 text-left font-semibold text-[--text-primary]">
                    Round
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-[--text-primary]">
                    Grand Slam
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-[--text-primary]">
                    Masters 1000
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-[--text-primary]">
                    ATP 500
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-[--text-primary]">
                    ATP 250
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[--border-secondary]">
                  <td className="px-4 py-3 font-medium text-[--text-primary]">Winner</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">2000</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">1000</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">500</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">250</td>
                </tr>
                <tr className="border-b border-[--border-secondary] bg-[--surface-secondary]">
                  <td className="px-4 py-3 font-medium text-[--text-primary]">Finalist</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">1200</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">600</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">300</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">150</td>
                </tr>
                <tr className="border-b border-[--border-secondary]">
                  <td className="px-4 py-3 font-medium text-[--text-primary]">Semifinalist</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">720</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">360</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">180</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">90</td>
                </tr>
                <tr className="border-b border-[--border-secondary] bg-[--surface-secondary]">
                  <td className="px-4 py-3 font-medium text-[--text-primary]">Quarterfinalist</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">360</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">180</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">90</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">45</td>
                </tr>
                <tr className="border-b border-[--border-secondary]">
                  <td className="px-4 py-3 font-medium text-[--text-primary]">Round of 16</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">180</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">90</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">45</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">20</td>
                </tr>
                <tr className="border-b border-[--border-secondary] bg-[--surface-secondary]">
                  <td className="px-4 py-3 font-medium text-[--text-primary]">Round of 32</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">90</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">45</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">20</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">10</td>
                </tr>
                <tr className="border-b border-[--border-secondary]">
                  <td className="px-4 py-3 font-medium text-[--text-primary]">Round of 64</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">45</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">25</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">10</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">5</td>
                </tr>
                <tr className="border-b border-[--border-secondary] bg-[--surface-secondary]">
                  <td className="px-4 py-3 font-medium text-[--text-primary]">Round of 128</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">10</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">—</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">—</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">—</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm text-[--text-tertiary]">
            <strong>Grand Slams:</strong> Australian Open, French Open,
            Wimbledon, US Open · <strong>Masters 1000:</strong> Indian Wells,
            Miami, Monte Carlo, Madrid, Rome, Canada, Cincinnati, Shanghai,
            Paris
          </p>
        </section>

        {/* WTA Singles Points */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold text-[--text-primary]">
            WTA Singles Ranking Points
          </h2>
          <p className="mb-6 text-[--text-secondary]">
            WTA ranking points follow a similar structure to ATP, with points
            awarded based on tournament category and round reached.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-[--border-primary] bg-[--surface-secondary]">
                  <th className="px-4 py-3 text-left font-semibold text-[--text-primary]">
                    Round
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-[--text-primary]">
                    Grand Slam
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-[--text-primary]">
                    WTA 1000
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-[--text-primary]">
                    WTA 500
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-[--text-primary]">
                    WTA 250
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[--border-secondary]">
                  <td className="px-4 py-3 font-medium text-[--text-primary]">Winner</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">2000</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">1000</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">500</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">250</td>
                </tr>
                <tr className="border-b border-[--border-secondary] bg-[--surface-secondary]">
                  <td className="px-4 py-3 font-medium text-[--text-primary]">Finalist</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">1300</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">650</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">325</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">160</td>
                </tr>
                <tr className="border-b border-[--border-secondary]">
                  <td className="px-4 py-3 font-medium text-[--text-primary]">Semifinalist</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">780</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">390</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">195</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">95</td>
                </tr>
                <tr className="border-b border-[--border-secondary] bg-[--surface-secondary]">
                  <td className="px-4 py-3 font-medium text-[--text-primary]">Quarterfinalist</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">430</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">215</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">108</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">55</td>
                </tr>
                <tr className="border-b border-[--border-secondary]">
                  <td className="px-4 py-3 font-medium text-[--text-primary]">Round of 16</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">240</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">120</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">60</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">30</td>
                </tr>
                <tr className="border-b border-[--border-secondary] bg-[--surface-secondary]">
                  <td className="px-4 py-3 font-medium text-[--text-primary]">Round of 32</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">130</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">65</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">30</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">15</td>
                </tr>
                <tr className="border-b border-[--border-secondary]">
                  <td className="px-4 py-3 font-medium text-[--text-primary]">Round of 64</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">70</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">35</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">15</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">8</td>
                </tr>
                <tr className="border-b border-[--border-secondary] bg-[--surface-secondary]">
                  <td className="px-4 py-3 font-medium text-[--text-primary]">Round of 128</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">10</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">—</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">—</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">—</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm text-[--text-tertiary]">
            <strong>WTA 1000 Events:</strong> Indian Wells, Miami, Madrid, Rome,
            Montreal/Toronto, Cincinnati, Beijing, Wuhan
          </p>
        </section>

        {/* Doubles Points */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold text-[--text-primary]">
            Doubles Ranking Points
          </h2>
          <p className="mb-6 text-[--text-secondary]">
            Doubles ranking points are awarded separately from singles and follow
            a similar tier structure, though with different point values.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-[--border-primary] bg-[--surface-secondary]">
                  <th className="px-4 py-3 text-left font-semibold text-[--text-primary]">
                    Round
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-[--text-primary]">
                    Grand Slam
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-[--text-primary]">
                    Masters 1000
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-[--text-primary]">
                    ATP/WTA 500
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-[--text-primary]">
                    ATP/WTA 250
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[--border-secondary]">
                  <td className="px-4 py-3 font-medium text-[--text-primary]">Winner</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">2000</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">1000</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">500</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">250</td>
                </tr>
                <tr className="border-b border-[--border-secondary] bg-[--surface-secondary]">
                  <td className="px-4 py-3 font-medium text-[--text-primary]">Finalist</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">1200</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">600</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">300</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">150</td>
                </tr>
                <tr className="border-b border-[--border-secondary]">
                  <td className="px-4 py-3 font-medium text-[--text-primary]">Semifinalist</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">720</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">360</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">180</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">90</td>
                </tr>
                <tr className="border-b border-[--border-secondary] bg-[--surface-secondary]">
                  <td className="px-4 py-3 font-medium text-[--text-primary]">Quarterfinalist</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">360</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">180</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">90</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">45</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Qualifying Points */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold text-[--text-primary]">
            Qualifying & Qualifying Round Points
          </h2>
          <p className="mb-6 text-[--text-secondary]">
            Players who compete in qualifying rounds earn points for qualifying
            wins in addition to any points earned in the main draw. Qualifying
            points vary by tournament tier.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-[--border-primary] bg-[--surface-secondary]">
                  <th className="px-4 py-3 text-left font-semibold text-[--text-primary]">
                    Achievement
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-[--text-primary]">
                    Grand Slam
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-[--text-primary]">
                    Masters 1000
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-[--text-primary]">
                    ATP/WTA 500
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-[--text-primary]">
                    ATP/WTA 250
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[--border-secondary]">
                  <td className="px-4 py-3 font-medium text-[--text-primary]">
                    Main Draw (via Qualifying)
                  </td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">25</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">25</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">20</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">12</td>
                </tr>
                <tr className="border-b border-[--border-secondary] bg-[--surface-secondary]">
                  <td className="px-4 py-3 font-medium text-[--text-primary]">
                    Q3 (Final Qualifying Round)
                  </td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">16</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">16</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">10</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">6</td>
                </tr>
                <tr className="border-b border-[--border-secondary]">
                  <td className="px-4 py-3 font-medium text-[--text-primary]">
                    Q2 (Second Qualifying Round)
                  </td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">8</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">8</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">5</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">3</td>
                </tr>
                <tr className="border-b border-[--border-secondary] bg-[--surface-secondary]">
                  <td className="px-4 py-3 font-medium text-[--text-primary]">
                    Q1 (First Qualifying Round)
                  </td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">0</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">0</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">0</td>
                  <td className="px-4 py-3 text-right text-[--text-primary]">0</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm text-[--text-tertiary]">
            Players who qualify for the main draw earn qualifying points{" "}
            <strong>in addition to</strong> any main draw points. For example, a
            qualifier who reaches the Round of 32 at a Grand Slam earns 25
            (qualifying) + 90 (R32) = 115 total points.
          </p>
        </section>

        {/* How Rankings Work */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold text-[--text-primary]">
            How Tennis Rankings Work
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-xl font-semibold text-[--text-primary]">
                Rolling 52-Week System
              </h3>
              <p className="text-[--text-secondary]">
                ATP and WTA rankings are based on a player&apos;s best 18 tournament
                results over the previous 52 weeks (12 months). Points earned at a
                tournament remain on a player&apos;s record for exactly 52 weeks from the
                Monday following the tournament. After 52 weeks, those points
                automatically drop off and are replaced by points earned at the same
                tournament the following year.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold text-[--text-primary]">
                Best 18 Results Count
              </h3>
              <p className="text-[--text-secondary]">
                Only a player&apos;s 18 best tournament results count toward their
                ranking. This includes mandatory events (Grand Slams, Masters 1000
                for top players) plus their next best results. Players can compete
                in more than 18 tournaments, but only their top 18 scores are used
                for ranking calculations.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold text-[--text-primary]">
                Weekly Updates Every Monday
              </h3>
              <p className="text-[--text-secondary]">
                Official ATP and WTA rankings are updated every Monday at 12:00 PM
                GMT. Points are added from the previous week&apos;s tournaments, and
                points from 52 weeks prior automatically drop off. During ongoing
                tournaments, live rankings show projected rankings if the tournament
                ended at that moment.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold text-[--text-primary]">
                ATP Race vs. ATP Rankings
              </h3>
              <p className="text-[--text-secondary]">
                The ATP Race (and WTA Race to Finals) counts only points earned in
                the current calendar year, from January 1st. Unlike the 52-week
                rankings, the Race resets to zero every January 1st. The Race
                determines which players qualify for the year-end ATP/WTA Finals.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-[--text-primary]">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="border-b border-[--border-secondary] pb-6 last:border-b-0"
              >
                <h3 className="mb-3 text-lg font-semibold text-[--text-primary]">
                  {item.question}
                </h3>
                <p className="text-[--text-secondary]">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Links */}
        <RelatedLinks
          links={[
            { href: "/atp-live", title: "ATP Live Rankings", description: "Real-time ATP rankings with live tournament updates" },
            { href: "/wta-live", title: "WTA Live Rankings", description: "Real-time WTA rankings with live tournament updates" },
            { href: "/atp-race", title: "ATP Race Rankings", description: "Year-to-date ATP Race to Finals rankings" },
            { href: "/wta-race", title: "WTA Race Rankings", description: "Year-to-date WTA Race to Finals rankings" },
            { href: "/us-open-2026", title: "US Open 2026", description: "US Open draw, live scores, and ranking points" },
          ]}
        />

        <footer className="mt-12 border-t border-[--border-secondary] pt-8 text-sm text-[--text-tertiary]">
          <p>
            <strong>Last Updated:</strong> August 2026 — Point values based on
            official ATP and WTA ranking systems. Rankings update weekly every
            Monday.
          </p>
          <p className="mt-2">
            Track live ATP and WTA ranking changes at{" "}
            <a href="/atp-live" className="text-[--accent] hover:underline">
              ATP Live Rankings
            </a>{" "}
            and{" "}
            <a href="/wta-live" className="text-[--accent] hover:underline">
              WTA Live Rankings
            </a>
            .
          </p>
        </footer>
      </div>
    </>
  );
}
