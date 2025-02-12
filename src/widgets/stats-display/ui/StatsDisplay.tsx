"use client";

import { ArtistList } from "@/entities/artist";
import { BounceDot } from "basic-loading";
import type { ListeningStats } from "@/shared/types/spotify";
import { StatCard } from "@/shared/ui/stat-card";
import { TimeRange } from "@/features/time-range-selector/model/types";
import { TrackList } from "@/entities/track";
import { format } from "date-fns";
import { formatDuration } from "@/shared/lib/format";
import styled from "styled-components";
import { theme } from "@/shared/styles/theme";

const StatsGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const StatsSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
`;

const TopItemsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;

  .basic-loading {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ListeningTimeMessage = styled.div`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

interface StatsDisplayProps {
  stats: ListeningStats | null;
  loading: boolean;
  period: TimeRange;
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function StatsDisplay({ stats, loading, period, user }: StatsDisplayProps) {
  const userName = user?.name || "User";
  const today = format(new Date(), "M월 d일");

  if (loading) {
    return (
      <LoadingWrapper>
        <BounceDot option={{ color: theme.colors.primary, size: 50 }} />
      </LoadingWrapper>
    );
  }

  if (!stats) {
    return <LoadingWrapper>데이터가 없어요</LoadingWrapper>;
  }

  return (
    <StatsGrid>
      <ListeningTimeMessage>
        {today}. {userName}님은 spotify를 {formatDuration(stats.totalListeningTime)} 들었습니다.
      </ListeningTimeMessage>

      <StatsSection>
        <TopItemsGrid>
          <div>
            <SectionTitle>최애곡</SectionTitle>
            <TrackList tracks={stats.topTracks} />
          </div>
          <div>
            <SectionTitle>최애아티스트</SectionTitle>
            <ArtistList artists={stats.topArtists} />
          </div>
        </TopItemsGrid>
      </StatsSection>
    </StatsGrid>
  );
}
