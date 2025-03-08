import styled from "styled-components";

export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.black};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  font-size: 0.875rem;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  transition: all ${({ theme }) => theme.transitions.default};
  width: fit-content;
  margin: 0 auto;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
    transform: scale(1.02);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;
