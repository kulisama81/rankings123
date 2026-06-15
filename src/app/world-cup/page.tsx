import type { Metadata } from "next";
import { getWorldCupData } from "@/lib/worldCupFeed";
import WorldCupTable from "@/components/WorldCupTable";

export const metadata: Metadata = {
  title: "World Cup 2026 Live — Group Standings & Results — Rankings123",
  description:
    "Live FIFA World Cup 2026 group standings and fixtures updated in real time: points, goal difference, advancement, and today's scores.",
};

export const dynamic = "force-dynamic";

export default async function WorldCupPage() {
  const snapshot = await getWorldCupData();
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="text-3xl" aria-hidden="true">⚽</span>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">World Cup 2026 Live</h1>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              LIVE
            </span>
          </div>
          <p className="text-sm text-gray-500">FIFA World Cup 2026 · {snapshot.stageLabel}</p>
        </div>
      </div>
      <WorldCupTable initialSnapshot={snapshot} />
    </div>
  );
}
