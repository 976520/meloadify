"use client";

import { ArtistList } from "@/entities/artist";
import type { ListeningStats } from "@/shared/types/spotify";
import { StatCard } from "@/shared/ui/stat-card";
import { TrackList } from "@/entities/track";
import { formatDuration } from "@/shared/lib/format";
import styled from "styled-components";

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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: ${({ theme }) => theme.colors.lightGrey};
  font-size: 1.125rem;
`;

interface StatsDisplayProps {
  stats: ListeningStats | null;
  loading: boolean;
  period: "일" | "주" | "월" | "년";
}

export function StatsDisplay({ stats, loading, period }: StatsDisplayProps) {
  if (loading) {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }

  if (!stats) {
    return <LoadingContainer>No stats available</LoadingContainer>;
  }

  return (
    <StatsGrid>
      <StatsSection>
        <StatCard title="들은 시간" value={formatDuration(stats.totalListeningTime)} />
      </StatsSection>

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
