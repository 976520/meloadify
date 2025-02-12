import type { ListeningStats, SpotifyArtist, SpotifyTrack } from "../types/spotify";
import { startOfDay, subMonths, subWeeks, subYears } from "date-fns";

import { SPOTIFY_CONFIG } from "../config/spotify";
import SpotifyWebApi from "spotify-web-api-node";

export class SpotifyClient {
  private client: SpotifyWebApi;
  private refreshToken?: string;

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

  private async refreshAccessToken() {
    if (!this.refreshToken) {
      throw new Error("토큰이 없어요 ");
    }

    try {
      const data = await this.client.refreshAccessToken();
      const { access_token } = data.body;

      this.client.setAccessToken(access_token);

      return access_token;
    } catch (error) {
      console.error(error);
      throw new Error("토큰 갱신이 실패했어요");
    }
  }

  private async refreshAccessTokenIfNeeded() {
    try {
      await this.client.getMe();
    } catch (error) {
      if (error instanceof Error && error.message.includes("토큰이 만료되었어요")) {
        const newAccessToken = await this.refreshAccessToken();
        this.client.setAccessToken(newAccessToken);
      } else {
        throw error;
      }
    }
  }

  private async getRecentlyPlayed(): Promise<SpotifyApi.PlayHistoryObject[]> {
    try {
      const response = await this.client.getMyRecentlyPlayedTracks({
        limit: 50,
        after: startOfDay(new Date()).getTime(),
      });

      console.log("API", {
        tracks: response.body.items.map((item) => ({
          name: item.track.name,
          played_at: item.played_at,
        })),
      });

      return response.body.items;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getTodayStats(): Promise<ListeningStats> {
    try {
      await this.refreshAccessTokenIfNeeded();

      const recentTracks = await this.getRecentlyPlayed();
      console.log(recentTracks.length);

      return {
        totalListeningTime: recentTracks.length,
        topTracks: [],
        topArtists: [],
        period: "4주",
        startDate: startOfDay(new Date()).toISOString(),
        endDate: new Date().toISOString(),
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private async getTopTracks(
    time_range: "short_term" | "medium_term" | "long_term" = "short_term",
    limit: number = 20
  ): Promise<SpotifyTrack[]> {
    const response = await this.client.getMyTopTracks({ time_range, limit });
    return response.body.items;
  }

  private async getTopArtists(
    time_range: "short_term" | "medium_term" | "long_term" = "short_term",
    limit: number = 20
  ): Promise<SpotifyArtist[]> {
    const response = await this.client.getMyTopArtists({ time_range, limit });
    return response.body.items;
  }

  private getTimeRange(period: "4주" | "6개월" | "전체"): "short_term" | "medium_term" | "long_term" {
    switch (period) {
      case "4주":
        return "short_term";
      case "6개월":
        return "medium_term";
      case "전체":
        return "long_term";
      default:
        return "short_term";
    }
  }

  async getListeningStats(period: "4주" | "6개월" | "전체"): Promise<ListeningStats> {
    try {
      await this.refreshAccessTokenIfNeeded();

      const now = new Date();
      const startDate = startOfDay(now);
      const endDate = now;
      console.log({ startDate, endDate });

      const timeRange = this.getTimeRange(period);
      const currentTime = endDate.getTime();

      const [recentTracks, topTracks, topArtists] = await Promise.all([
        this.getRecentlyPlayed(),
        this.getTopTracks(timeRange, 10),
        this.getTopArtists(timeRange, 10),
      ]);

      console.log(recentTracks.length);

      const filteredTracks = recentTracks.filter((track) => {
        const playedAt = new Date(track.played_at);
        const isInRange = playedAt >= startDate && playedAt <= endDate;
        if (isInRange) {
          console.log({
            name: track.track?.name,
            playedAt: playedAt.toISOString(),
          });
        }
        return isInRange;
      });

      console.log(filteredTracks.length);

      return {
        totalListeningTime: filteredTracks.length,
        topTracks: topTracks || [],
        topArtists: topArtists || [],
        period,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
