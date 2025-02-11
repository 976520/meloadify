"use client";

import { TIME_RANGES } from "@/shared/config/spotify";

type TimeRange = "일" | "주" | "월" | "년";

interface TimeRangeSelectorProps {
  onSelect: (range: TimeRange) => void;
  selectedRange: TimeRange;
}

export function TimeRangeSelector({ onSelect, selectedRange }: TimeRangeSelectorProps) {
  return (
    <div className="flex gap-4 mb-8">
      {(["일", "주", "월", "년"] as TimeRange[]).map((range) => (
        <button
          key={range}
          onClick={() => onSelect(range)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedRange === range ? "bg-green-600 text-white" : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/50"
          }`}
        >
          {range.charAt(0).toUpperCase() + range.slice(1)}
        </button>
      ))}
    </div>
  );
}
