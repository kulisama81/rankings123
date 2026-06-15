import { NextResponse } from "next/server";
import { getWorldCupData } from "@/lib/worldCupFeed";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getWorldCupData());
}
