"use client";

import { SelectorContainer, TimeButton } from "./styles";
import { TimeRange, TimeRangeSelectorProps } from "../model/types";

const ranges: TimeRange[] = ["4주", "6개월", "전체", "오늘"];

export function TimeRangeSelector({ selectedRange, onSelect }: TimeRangeSelectorProps) {
  return (
    <SelectorContainer>
      {ranges.map((range) => (
        <TimeButton key={range} isSelected={selectedRange === range} onClick={() => onSelect(range)}>
          {range}
        </TimeButton>
      ))}
    </SelectorContainer>
  );
}
