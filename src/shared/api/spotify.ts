import type {
  ListeningStats,
  SpotifyArtist,
  SpotifyError,
  SpotifyTimeRangeType,
  SpotifyTrack,
  StatsPeriodType,
} from "../types/spotify";
import { startOfDay, subMonths, subWeeks, subYears } from "date-fns";

import { SPOTIFY_CONFIG } from "../config/spotify";
import SpotifyWebApi from "spotify-web-api-node";

class SpotifyApiError extends Error implements SpotifyError {
  constructor(public readonly status: number, public readonly message: string) {
    super(message);
    this.name = "SpotifyApiError";
  }
}

export class SpotifyClient {
  private readonly client: SpotifyWebApi;
  private readonly refreshToken?: string;

  constructor(accessToken: string, refreshToken?: string) {
    this.client = new SpotifyWebApi({
      clientId: SPOTIFY_CONFIG.clientId,
      clientSecret: SPOTIFY_CONFIG.clientSecret,
      redirectUri: SPOTIFY_CONFIG.redirectUri,
      accessToken,
      refreshToken,
    });
    this.refreshToken = refreshToken;
  }

  private async refreshAccessToken(): Promise<string> {
    if (!this.refreshToken) {
      throw new SpotifyApiError(401, "리프레시 토큰이 없습니다");
    }

    try {
      const {
        body: { access_token },
      } = await this.client.refreshAccessToken();
      this.client.setAccessToken(access_token);
      return access_token;
    } catch (error) {
      console.error("[SpotifyClient] 토큰 갱신 실패:", error);
      throw new SpotifyApiError(401, "토큰 갱신에 실패했습니다");
    }
  }

  private async refreshAccessTokenIfNeeded(): Promise<void> {
    try {
      await this.client.getMe();
    } catch (error) {
      if (error instanceof Error && error.message.includes("토큰이 만료되었습니다")) {
        await this.refreshAccessToken();
      } else {
        throw error;
      }
    }
  }

  private async getRecentlyPlayed(): Promise<SpotifyApi.PlayHistoryObject[]> {
    try {
      const {
        body: { items },
      } = await this.client.getMyRecentlyPlayedTracks({
        limit: 50,
        after: startOfDay(new Date()).getTime(),
      });

      return items;
    } catch (error) {
      console.error("[SpotifyClient] 최근 재생 기록 조회 실패:", error);
      throw new SpotifyApiError(500, "최근 재생 기록을 가져오는데 실패했습니다");
    }
  }

  private async getTopTracks(
    timeRange: SpotifyTimeRangeType = "short_term",
    limit: number = 20
  ): Promise<SpotifyTrack[]> {
    try {
      const {
        body: { items },
      } = await this.client.getMyTopTracks({ time_range: timeRange, limit });
      return items;
    } catch (error) {
      console.error("[SpotifyClient] 인기 트랙 조회 실패:", error);
      throw new SpotifyApiError(500, "인기 트랙을 가져오는데 실패했습니다");
    }
  }

  private async getTopArtists(
    timeRange: SpotifyTimeRangeType = "short_term",
    limit: number = 20
  ): Promise<SpotifyArtist[]> {
    try {
      const {
        body: { items },
      } = await this.client.getMyTopArtists({ time_range: timeRange, limit });
      return items;
    } catch (error) {
      console.error("[SpotifyClient] 인기 아티스트 조회 실패:", error);
      throw new SpotifyApiError(500, "인기 아티스트를 가져오는데 실패했습니다");
    }
  }

  private getTimeRange(period: StatsPeriodType): SpotifyTimeRangeType {
    const timeRangeMap: Record<StatsPeriodType, SpotifyTimeRangeType> = {
      "4주": "short_term",
      "6개월": "medium_term",
      전체: "long_term",
    };
    return timeRangeMap[period];
  }

  async getTodayStats(): Promise<ListeningStats> {
    try {
      await this.refreshAccessTokenIfNeeded();

      const recentTracks = await this.getRecentlyPlayed();
      const startDate = startOfDay(new Date());
      const endDate = new Date();

      return {
        totalListeningTime: recentTracks.length,
        topTracks: [],
        topArtists: [],
        period: "4주",
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      };
    } catch (error) {
      console.error("[SpotifyClient] 오늘의 통계 조회 실패:", error);
      throw error instanceof SpotifyApiError ? error : new SpotifyApiError(500, "통계를 가져오는데 실패했습니다");
    }
  }

  async getListeningStats(period: StatsPeriodType): Promise<ListeningStats> {
    try {
      await this.refreshAccessTokenIfNeeded();

      const now = new Date();
      const startDate = startOfDay(now);
      const timeRange = this.getTimeRange(period);

      const [recentTracks, topTracks, topArtists] = await Promise.all([
        this.getRecentlyPlayed(),
        this.getTopTracks(timeRange, 10),
        this.getTopArtists(timeRange, 10),
      ]);

      const filteredTracks = recentTracks.filter((track) => {
        const playedAt = new Date(track.played_at);
        return playedAt >= startDate && playedAt <= now;
      });

      return {
        totalListeningTime: filteredTracks.length,
        topTracks,
        topArtists,
        period,
        startDate: startDate.toISOString(),
        endDate: now.toISOString(),
      };
    } catch (error) {
      console.error("[SpotifyClient] 청취 통계 조회 실패:", error);
      throw error instanceof SpotifyApiError ? error : new SpotifyApiError(500, "통계를 가져오는데 실패했습니다");
    }
  }
}
