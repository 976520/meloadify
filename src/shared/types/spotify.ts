export type SpotifyTimeRangeType = "short_term" | "medium_term" | "long_term";
export type StatsPeriodType = "4주" | "6개월" | "전체";

export const STATS_PERIOD = {
  MONTH: "4주",
  HALF_YEAR: "6개월",
  ALL_TIME: "전체",
} as const;

export interface SpotifyExternalUrls {
  readonly spotify: string;
}

export interface SpotifyImage {
  readonly url: string;
  readonly height?: number;
  readonly width?: number;
}

export interface SpotifyArtistBase {
  readonly id: string;
  readonly name: string;
  readonly external_urls: SpotifyExternalUrls;
}

export interface SpotifyTrack {
  readonly id: string;
  readonly name: string;
  readonly artists: ReadonlyArray<SpotifyArtistBase>;
  readonly album: {
    readonly id: string;
    readonly name: string;
    readonly images: ReadonlyArray<SpotifyImage>;
  };
  readonly duration_ms: number;
  readonly preview_url: string | null;
  readonly popularity: number;
  readonly external_urls: SpotifyExternalUrls;
}

export interface SpotifyArtist extends SpotifyArtistBase {
  readonly images: ReadonlyArray<SpotifyImage>;
  readonly genres: ReadonlyArray<string>;
  readonly popularity: number;
}

export interface UserTopItems {
  readonly tracks: ReadonlyArray<SpotifyTrack>;
  readonly artists: ReadonlyArray<SpotifyArtist>;
}

export interface ListeningStats {
  readonly totalListeningTime: number;
  readonly topTracks: ReadonlyArray<SpotifyTrack>;
  readonly topArtists: ReadonlyArray<SpotifyArtist>;
  readonly period: StatsPeriodType;
  readonly startDate: string;
  readonly endDate: string;
}

export interface SpotifyUser {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly image?: string;
}

export interface SpotifySession {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly user: SpotifyUser;
}

export interface SpotifyError {
  readonly status: number;
  readonly message: string;
}
