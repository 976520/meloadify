import { BaseCard } from "@/shared/ui/base-card/BaseCard";
import Image from "next/image";
import type { SpotifyTrack } from "@/shared/types/spotify";
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
  border-radius: 12px;
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

const TrackName = styled.a`
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

const ArtistLink = styled.a`
  color: ${({ theme }) => theme.colors.lightGrey};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const ArtistName = styled.p`
  font-size: 0.9rem;
  opacity: 0.8;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const AudioPlayer = styled.audio`
  width: 120px;
  height: 32px;
  opacity: 0.7;
  transition: opacity 0.3s ease;
  margin-right: ${({ theme }) => theme.spacing.sm};

  &:hover {
    opacity: 1;
  }
`;

interface TrackCardProps {
  track: SpotifyTrack;
  index: number;
}

export function TrackCard({ track, index }: TrackCardProps) {
  return (
    <Card>
      <RankNumber>{index + 1}</RankNumber>
      <ImageWrapper>
        <Image
          src={track.album.images[0]?.url || "/placeholder-album.png"}
          alt={track.album.name}
          fill
          style={{ objectFit: "cover" }}
        />
      </ImageWrapper>
      <InfoSection>
        <TrackName href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
          {track.name}
        </TrackName>
        <ArtistName>
          {track.artists.map((artist, i) => (
            <>
              {i > 0 && ", "}
              <ArtistLink key={artist.id} href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                {artist.name}
              </ArtistLink>
            </>
          ))}
        </ArtistName>
      </InfoSection>
      {track.preview_url && <AudioPlayer controls src={track.preview_url} />}
    </Card>
  );
}
