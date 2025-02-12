import { BaseCard } from "@/shared/ui/base-card/BaseCard";
import Image from "next/image";
import type { SpotifyArtist } from "@/shared/types/spotify";
import styled from "styled-components";

const Card = styled(BaseCard)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  height: 96px;
`;

const RankNumber = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  min-width: 36px;
  text-align: center;
`;

const ImageWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}20, transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  ${Card}:hover &::after {
    opacity: 1;
  }
`;

const InfoSection = styled.div`
  flex-grow: 1;
  min-width: 0;
  padding: 0 ${({ theme }) => theme.spacing.sm};
`;

const ArtistName = styled.a`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 4px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const GenreText = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.lightGrey};
  opacity: 0.8;
  margin-bottom: 6px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const PopularityBar = styled.div`
  height: 3px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1.5px;
  overflow: hidden;
`;

const PopularityFill = styled.div<{ width: number }>`
  height: 100%;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primary}80);
  border-radius: 1.5px;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  width: ${({ width }) => width}%;
`;

interface ArtistCardProps {
  artist: SpotifyArtist;
  index: number;
}

export function ArtistCard({ artist, index }: ArtistCardProps) {
  return (
    <Card>
      <RankNumber>{index + 1}</RankNumber>
      <ImageWrapper>
        <Image
          src={artist.images[0]?.url || "/placeholder-artist.png"}
          alt={artist.name}
          fill
          style={{ objectFit: "cover" }}
        />
      </ImageWrapper>
      <InfoSection>
        <ArtistName href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
          {artist.name}
        </ArtistName>
        <GenreText>{artist.genres.slice(0, 3).join(", ")}</GenreText>
        <PopularityBar>
          <PopularityFill width={artist.popularity} />
        </PopularityBar>
      </InfoSection>
    </Card>
  );
}
