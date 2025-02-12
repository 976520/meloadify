"use client";

import { ArtistList } from "@/entities/artist";
import { BounceDot } from "basic-loading";
import type { ListeningStats } from "@/shared/types/spotify";
import { StatCard } from "@/shared/ui/stat-card";
import { TimeRange } from "@/features/time-range-selector/model/types";
import { TrackList } from "@/entities/track";
import { memo } from "react";
import styled from "styled-components";
import { theme } from "@/shared/styles/theme";

interface StyledProps {
  theme: typeof theme;
}

const StatsGrid = styled.div<StyledProps>`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xl};
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const StatsSection = styled.section<StyledProps>`
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;

const TopItemsGrid = styled.div<StyledProps>`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const SectionTitle = styled.h2<StyledProps>`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  letter-spacing: -0.5px;
`;

const LoadingWrapper = styled.div<StyledProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  width: 100%;

  .basic-loading {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const EmptyStateMessage = styled.p<StyledProps>`
  color: ${({ theme }) => theme.colors.gray[400]};
  text-align: center;
  font-size: ${({ theme }) => theme.typography.sizes.lg};
`;

interface StatsDisplayProps {
  readonly stats: ListeningStats | null;
  readonly loading: boolean;
  readonly period: TimeRange;
  readonly user: {
    readonly name?: string | null;
    readonly email?: string | null;
    readonly image?: string | null;
  };
}

export const StatsDisplay = memo(function StatsDisplay({ stats, loading, period, user }: StatsDisplayProps) {
  if (loading) {
    return (
      <LoadingWrapper>
        <BounceDot option={{ color: theme.colors.primary, size: 25 }} />
      </LoadingWrapper>
    );
  }

  if (!stats) {
    return (
      <LoadingWrapper>
        <EmptyStateMessage>데이터를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.</EmptyStateMessage>
      </LoadingWrapper>
    );
  }

  const { topTracks, topArtists } = stats;

  return (
    <StatsGrid>
      <StatsSection>
        <TopItemsGrid>
          <div>
            <SectionTitle>최애곡</SectionTitle>
            <TrackList tracks={topTracks} />
          </div>
          <div>
            <SectionTitle>최애아티스트</SectionTitle>
            <ArtistList artists={topArtists} />
          </div>
        </TopItemsGrid>
      </StatsSection>
    </StatsGrid>
  );
});

StatsDisplay.displayName = "StatsDisplay";
