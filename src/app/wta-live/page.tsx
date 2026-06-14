import type { Metadata } from "next";
import { getLiveData } from "@/lib/liveFeed";
import LiveRankingView from "@/components/LiveRankingView";

export const metadata: Metadata = {
  title: "WTA Live Ranking — Rankings123",
  description:
    "Live WTA ranking updated in real time during tournaments: live points, rank movement, and current tournament progress.",
};

export const dynamic = "force-dynamic";

export default async function WtaLivePage() {
  const snapshot = await getLiveData("wta");
  return <LiveRankingView tour="wta" snapshot={snapshot} />;
}
