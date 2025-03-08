"use client";

import { useEffect, useState } from "react";

import type { ListeningStats } from "@/shared/types/spotify";
import { StatsDisplay } from "./StatsDisplay";
import { TimeRangeSelector } from "@/features/time-range-selector";
import { format } from "date-fns";
import styled from "styled-components";
import { toast } from "sonner";

const ListeningTimeMessage = styled.div`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Span = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

interface StatsContainerProps {
  accessToken: string;
  refreshToken?: string;
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

const formatTrackCount = (count: number) => {
  return <Span>{count}곡</Span>;
};

export function StatsContainer({ accessToken, refreshToken, user }: StatsContainerProps) {
  const [period, setPeriod] = useState<"4주" | "6개월" | "전체">("4주");
  const [stats, setStats] = useState<ListeningStats | null>(null);
  const [todayStats, setTodayStats] = useState<ListeningStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userName = user?.name || "User";
  const today = format(new Date(), "M월 d일");

  const fetchTodayStats = async () => {
    try {
      const response = await fetch(`/api/stats/today`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Refresh-Token": refreshToken || "",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.details || `HTTP 이슈! (${response.status})`);
      }

      const data = await response.json();
      setTodayStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTodayStats();
  }, [accessToken, refreshToken]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/stats?period=${encodeURIComponent(period)}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Refresh-Token": refreshToken || "",
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          const errorMessage = errorData.error || errorData.details || `HTTP 이슈! (${response.status})`;
          throw new Error(errorMessage);
        }

        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error(error);
        const errorMessage = error instanceof Error ? error.message : "데이터를 불러오는데 실패했어요";
        setError(errorMessage);
        toast.error(errorMessage, {
          duration: 4000,
        });
        setStats(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [period, accessToken, refreshToken]);

  return (
    <div className="container mx-auto px-4 py-8">
      {todayStats && (
        <ListeningTimeMessage>
          {today}, {userName}님은 spotify에서 {formatTrackCount(todayStats.totalListeningTime)}을 들었습니다.
        </ListeningTimeMessage>
      )}
      <TimeRangeSelector onSelect={setPeriod} selectedRange={period} />
      {error ? (
        <div className="text-center p-4 text-red-500">{error}</div>
      ) : (
        <StatsDisplay stats={stats} loading={loading} period={period} user={user} />
      )}
    </div>
  );
}
