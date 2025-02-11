export type TimeRange = "4주" | "6개월" | "전체";

export interface TimeRangeSelectorProps {
  selectedRange: TimeRange;
  onSelect: (range: TimeRange) => void;
}
