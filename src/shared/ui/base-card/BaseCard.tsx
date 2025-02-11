import styled from "styled-components";

export const BaseCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin: 8px 4px;

  &:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.05);
    border-color: ${({ theme }) => theme.colors.primary}30;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2), 0 0 0 1px ${({ theme }) => theme.colors.primary}20;
  }
`;
