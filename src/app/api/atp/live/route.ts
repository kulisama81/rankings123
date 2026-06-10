import { NextResponse } from "next/server";
import { getAtpLiveData } from "@/lib/atpLiveFeed";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getAtpLiveData());
}
