"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(18, 18, 18, 0.9);
  backdrop-filter: blur(8px);
`;

const HeaderContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.primary};
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const UserName = styled.span`
  font-size: 0.875rem;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.white};
`;

const LogoutButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  font-size: 0.875rem;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  transition: background-color ${({ theme }) => theme.transitions.default};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const UserAvatar = styled(Image)`
  border-radius: 50%;
`;

interface HeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function Header({ user }: HeaderProps) {
  return (
    <HeaderWrapper>
      <HeaderContainer>
        <HeaderContent>
          <Logo>Meloadify</Logo>
          <UserSection>
            {user.image && <UserAvatar src={user.image} alt={user.name || "User"} width={32} height={32} />}
            <UserName>{user.name}</UserName>
            <LogoutButton onClick={() => signOut()}>로그아웃</LogoutButton>
          </UserSection>
        </HeaderContent>
      </HeaderContainer>
    </HeaderWrapper>
  );
}
