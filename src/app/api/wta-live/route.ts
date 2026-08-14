import { NextResponse } from "next/server";
import { getLiveData } from "@/lib/liveFeed";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getLiveData("wta");
  return NextResponse.json(data);
}
