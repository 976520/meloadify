import {
  ArtistName,
  Card,
  GenreText,
  ImageWrapper,
  InfoSection,
  PopularityBar,
  PopularityFill,
  RankNumber,
} from "./styles";

import Image from "next/image";
import type { SpotifyArtist } from "@/shared/types/spotify";

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
        <ArtistName>{artist.name}</ArtistName>
        <GenreText>{artist.genres.slice(0, 3).join(", ")}</GenreText>
        <PopularityBar>
          <PopularityFill width={artist.popularity} />
        </PopularityBar>
      </InfoSection>
    </Card>
  );
}
