import { NextResponse } from "next/server";
import { getWorldCupStats } from "@/lib/worldCupFeed";

export const dynamic = "force-dynamic";

export async function GET() {
  const stats = await getWorldCupStats();
  return NextResponse.json(stats, {
    headers: {
      "Cache-Control": "public, s-maxage=180, stale-while-revalidate=600",
    },
  });
}
