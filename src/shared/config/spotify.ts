export const SPOTIFY_CONFIG = {
  clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
  redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/spotify`,
  scopes: [
    "user-read-email",
    "user-read-private",
    "user-top-read",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-read-currently-playing",
    "playlist-read-private",
    "playlist-read-collaborative",
  ].join(" "),
};

export const TIME_RANGES = {
  short_term: "4 weeks",
  medium_term: "6 months",
  long_term: "All time",
} as const;

export const ITEMS_LIMIT = 50;
