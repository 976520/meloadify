import { SpotifyArtist } from "@/shared/types/spotify";

export interface ArtistCardProps {
  artist: SpotifyArtist;
  index: number;
}

export interface ArtistListProps {
  artists: SpotifyArtist[];
}
