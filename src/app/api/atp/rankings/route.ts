import { NextResponse } from "next/server";
import { getAtpDeepRankingData } from "@/lib/atpDeepRanking";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getAtpDeepRankingData());
}
