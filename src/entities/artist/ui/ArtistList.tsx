import { ArtistCard } from "./ArtistCard";
import type { SpotifyArtist } from "@/shared/types/spotify";
import { memo } from "react";
import styled from "styled-components";

const EmptyState = styled.div`
  text-align: center;
  padding: 1rem;
  color: ${({ theme }) => theme.colors.gray[400]};
`;

const ArtistListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

interface ArtistListProps {
  readonly artists: ReadonlyArray<SpotifyArtist>;
}

export const ArtistList = memo(function ArtistList({ artists }: ArtistListProps) {
  if (!artists || artists.length === 0) {
    return <EmptyState>아티스트가 없어요</EmptyState>;
  }

  return (
    <ArtistListContainer>
      {artists.map((artist, index) => (
        <ArtistCard key={artist.id} artist={artist} index={index} />
      ))}
    </ArtistListContainer>
  );
});

ArtistList.displayName = "ArtistList";
