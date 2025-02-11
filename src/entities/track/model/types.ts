import { SpotifyTrack } from "@/shared/types/spotify";

export interface TrackCardProps {
  track: SpotifyTrack;
  index: number;
}

export interface TrackListProps {
  tracks: SpotifyTrack[];
}
