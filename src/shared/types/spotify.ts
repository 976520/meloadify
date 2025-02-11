export interface SpotifyTimeRange {
  short_term: string;
  medium_term: string;
  long_term: string;
}

export interface SpotifyImage {
  url: string;
  height?: number;
  width?: number;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{
    id: string;
    name: string;
  }>;
  album: {
    id: string;
    name: string;
    images: SpotifyImage[];
  };
  duration_ms: number;
  preview_url: string | null;
  popularity: number;
}

export interface SpotifyArtist {
  id: string;
  name: string;
  images: SpotifyImage[];
  genres: string[];
  popularity: number;
}

export interface UserTopItems {
  tracks: SpotifyTrack[];
  artists: SpotifyArtist[];
}

export interface ListeningStats {
  totalListeningTime: number;
  topTracks: SpotifyTrack[];
  topArtists: SpotifyArtist[];
  period: "4주" | "6개월" | "전체";
  startDate: string;
  endDate: string;
}

export interface SpotifySession {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
}
