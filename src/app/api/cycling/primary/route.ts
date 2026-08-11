import { NextResponse } from "next/server";
import { getCyclingRaces, getPrimaryRace } from "@/lib/cyclingFeed";

export const runtime = "nodejs";
export const revalidate = 300; // ISR: 5 min cache

export async function GET() {
  try {
    const races = await getCyclingRaces(300);
    const primary = getPrimaryRace(races);

    if (!primary) {
      return NextResponse.json(
        { error: "No active cycling races found" },
        { status: 404 }
      );
    }

    return NextResponse.json(primary);
  } catch (error) {
    console.error("Cycling primary API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch cycling data" },
      { status: 500 }
    );
  }
}
