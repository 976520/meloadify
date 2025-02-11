"use client";

import { SelectorContainer, TimeButton } from "./styles";
import { TimeRange, TimeRangeSelectorProps } from "../model/types";

const ranges: TimeRange[] = ["일", "주", "월", "년"];

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
