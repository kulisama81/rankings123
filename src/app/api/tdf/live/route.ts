import { NextResponse } from "next/server";
import { getTdfSnapshot } from "@/lib/cyclingFeed";

export const runtime = "nodejs";
export const revalidate = 300; // ISR: 5 min cache

export async function GET() {
  try {
    const data = await getTdfSnapshot(300);
    return NextResponse.json(data);
  } catch (error) {
    console.error("TdF API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch Tour de France data" },
      { status: 500 }
    );
  }
}
