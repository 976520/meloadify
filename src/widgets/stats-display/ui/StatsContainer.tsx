"use client";

import { useEffect, useState } from "react";

import type { ListeningStats } from "@/shared/types/spotify";
import { StatsDisplay } from "./StatsDisplay";
import { TimeRangeSelector } from "@/features/time-range-selector";

interface StatsContainerProps {
  accessToken: string;
  refreshToken?: string;
}

export function StatsContainer({ accessToken, refreshToken }: StatsContainerProps) {
  const [period, setPeriod] = useState<"4주" | "6개월" | "전체">("4주");
  const [stats, setStats] = useState<ListeningStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          throw new Error(errorData.error || errorData.details || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Stats fetch error:", error);
        setError(error instanceof Error ? error.message : "Failed to fetch stats");
        setStats(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [period, accessToken, refreshToken]);

  return (
    <div className="container mx-auto px-4 py-8">
      <TimeRangeSelector onSelect={setPeriod} selectedRange={period} />
      {error ? (
        <div className="text-center p-4 text-red-500">{error}</div>
      ) : (
        <StatsDisplay stats={stats} loading={loading} period={period} />
      )}
    </div>
  );
}
