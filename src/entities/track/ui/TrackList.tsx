import type { SpotifyTrack } from "@/shared/types/spotify";
import { TrackCard } from "./TrackCard";
import { memo } from "react";
import styled from "styled-components";

const EmptyState = styled.div`
  text-align: center;
  padding: 1rem;
  color: ${({ theme }) => theme.colors.gray[400]};
`;

const TrackListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

interface TrackListProps {
  readonly tracks: ReadonlyArray<SpotifyTrack>;
}

export const TrackList = memo(function TrackList({ tracks }: TrackListProps) {
  if (!tracks || tracks.length === 0) {
    return <EmptyState>곡이 없어요</EmptyState>;
  }

  return (
    <TrackListContainer>
      {tracks.map((track, index) => (
        <TrackCard key={track.id} track={track} index={index} />
      ))}
    </TrackListContainer>
  );
});

TrackList.displayName = "TrackList";
