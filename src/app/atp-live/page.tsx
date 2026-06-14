import type { Metadata } from "next";
import { getLiveData } from "@/lib/liveFeed";
import LiveRankingView from "@/components/LiveRankingView";

export const metadata: Metadata = {
  title: "ATP Live Ranking — Rankings123",
  description:
    "Live ATP ranking updated in real time during tournaments: live points, rank movement, and current tournament progress.",
};

export const dynamic = "force-dynamic";

export default async function AtpLivePage() {
  const snapshot = await getLiveData("atp");
  return <LiveRankingView tour="atp" snapshot={snapshot} />;
}
