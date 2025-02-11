"use client";

import styled from "styled-components";

const SelectorContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const TimeButton = styled.button<{ isSelected: boolean }>`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ isSelected, theme }) => (isSelected ? theme.colors.primary : theme.colors.lightGrey)};
  background: ${({ isSelected }) => (isSelected ? "rgba(29, 185, 84, 0.1)" : "transparent")};
  border-radius: 50%;
  transition: all ${({ theme }) => theme.transitions.default};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: rgba(29, 185, 84, 0.1);
    transform: scale(1.05);
  }
`;

type TimeRange = "일" | "주" | "월" | "년";

interface TimeRangeSelectorProps {
  selectedRange: TimeRange;
  onSelect: (range: TimeRange) => void;
}

export function TimeRangeSelector({ selectedRange, onSelect }: TimeRangeSelectorProps) {
  const ranges: TimeRange[] = ["일", "주", "월", "년"];

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
