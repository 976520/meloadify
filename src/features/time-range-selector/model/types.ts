export type TimeRange = "일" | "주" | "월" | "년";

export interface TimeRangeSelectorProps {
  selectedRange: TimeRange;
  onSelect: (range: TimeRange) => void;
}
