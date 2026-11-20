
import { NextRequest, NextResponse } from "next/server";
import { connection } from "next/server";
import { getMeetings } from "@/lib/meetings-db";

export async function GET(request: NextRequest) {
  await connection();

  try {
    const date =
      request.nextUrl.searchParams.get("date") ?? undefined;

    const meetings = await getMeetings(date);

    return NextResponse.json(meetings);
  } catch (error) {
    console.error("Error fetching meetings:", error);

    return NextResponse.json(
      { error: "Failed to load meetings." },
      { status: 500 }
    );
  }
}
