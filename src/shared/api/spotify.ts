import type { ListeningStats, SpotifyArtist, SpotifyTrack } from "../types/spotify";
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";

import { SPOTIFY_CONFIG } from "../config/spotify";
import SpotifyWebApi from "spotify-web-api-node";

export class SpotifyClient {
  private client: SpotifyWebApi;

  constructor(accessToken: string) {
    this.client = new SpotifyWebApi({
      clientId: SPOTIFY_CONFIG.clientId,
      clientSecret: SPOTIFY_CONFIG.clientSecret,
      redirectUri: SPOTIFY_CONFIG.redirectUri,
      accessToken,
    });
  }

  private async getRecentlyPlayed(before: number): Promise<SpotifyApi.PlayHistoryObject[]> {
    const response = await this.client.getMyRecentlyPlayedTracks({
      limit: 50,
      before,
    });
    return response.body.items;
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

  async getListeningStats(period: "일" | "주" | "월" | "년"): Promise<ListeningStats> {
    try {
      const now = new Date();
      let startDate: Date;
      let endDate = now;

      switch (period) {
        case "일":
          startDate = startOfDay(now);
          endDate = endOfDay(now);
          break;
        case "주":
          startDate = startOfWeek(now);
          endDate = endOfWeek(now);
          break;
        case "월":
          startDate = startOfMonth(now);
          endDate = endOfMonth(now);
          break;
        case "년":
          startDate = startOfYear(now);
          endDate = endOfYear(now);
          break;
        default:
          throw new Error("Invalid period");
      }

      try {
        const [recentTracks, topTracks, topArtists] = await Promise.all([
          this.getRecentlyPlayed(endDate.getTime()),
          this.getTopTracks("short_term", 10).catch(() => []),
          this.getTopArtists("short_term", 10).catch(() => []),
        ]);

        const totalListeningTime = recentTracks.reduce((acc, track) => acc + track.track.duration_ms, 0);

        return {
          totalListeningTime,
          topTracks: topTracks || [],
          topArtists: topArtists || [],
          period,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        };
      } catch (error) {
        console.error("API call error:", error);
        throw new Error("Failed to fetch data from Spotify API");
      }
    } catch (error) {
      console.error("Error in getListeningStats:", error);
      throw error;
    }
  }
}
