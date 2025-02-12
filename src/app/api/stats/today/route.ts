import { NextRequest, NextResponse } from "next/server";

import { SpotifyClient } from "@/shared/api/spotify";

export async function GET(request: NextRequest) {
  try {
    const accessToken = request.headers.get("Authorization")?.replace("Bearer ", "");
    const refreshToken = request.headers.get("Refresh-Token");

    if (!accessToken) {
      return NextResponse.json({ error: "인증 실패 (401)" }, { status: 401 });
    }

    const client = new SpotifyClient(accessToken, refreshToken || undefined);

    try {
      const stats = await client.getTodayStats();
      console.log(stats);
      return NextResponse.json(stats);
    } catch (error) {
      console.error(error);

      if (error instanceof Error && error.message.includes("token expired")) {
        return NextResponse.json({ error: "토큰 만료 (401)" }, { status: 401 });
      }

      return NextResponse.json(
        {
          error: "데이터를 불러오는데 실패했어요",
          details: error instanceof Error ? error.message : String(error),
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
