import {
  ArtistName,
  Card,
  ImageWrapper,
  InfoSection,
  PopularityBar,
  PopularityFill,
  RankNumber,
  TrackName,
} from "./styles";

import Image from "next/image";
import { TrackCardProps } from "../../model/types";

export function TrackCard({ track, index }: TrackCardProps) {
  return (
    <Card>
      <RankNumber>{index + 1}</RankNumber>
      <ImageWrapper>
        <Image
          src={track.album.images[0]?.url || "/placeholder-album.png"}
          alt={track.name}
          fill
          style={{ objectFit: "cover" }}
        />
      </ImageWrapper>
      <InfoSection>
        <TrackName>{track.name}</TrackName>
        <ArtistName>{track.artists.map((artist) => artist.name).join(", ")}</ArtistName>
        <PopularityBar>
          <PopularityFill width={track.popularity} />
        </PopularityBar>
      </InfoSection>
    </Card>
  );
}
