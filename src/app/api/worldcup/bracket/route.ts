import { NextResponse } from "next/server";
import { getWorldCupBracket } from "@/lib/worldCupBracketFeed";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getWorldCupBracket());
}
