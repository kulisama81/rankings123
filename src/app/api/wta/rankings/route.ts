import { NextResponse } from "next/server";
import { getWtaDeepRankingData } from "@/lib/wtaDeepRanking";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getWtaDeepRankingData());
}
