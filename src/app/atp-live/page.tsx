import type { Metadata } from "next";
import { getAtpLiveData } from "@/lib/atpLiveFeed";
import AtpLiveTable from "@/components/AtpLiveTable";

export const metadata: Metadata = {
  title: "ATP Live Ranking — Rankings123",
  description:
    "Live ATP ranking updated in real time during tournaments: live points, rank movement, points to defend, and current tournament progress.",
};

export const dynamic = "force-dynamic";

export default async function AtpLivePage() {
  const snapshot = await getAtpLiveData();
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="text-3xl" aria-hidden="true">🎾</span>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">ATP Live Ranking</h1>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              LIVE
            </span>
          </div>
          <p className="text-sm text-gray-500">{snapshot.weekLabel}</p>
        </div>
      </div>
      <AtpLiveTable initialSnapshot={snapshot} />
    </div>
  );
}
