"use client";

import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  bottom: 0;
  width: 100%;
  z-index: 50;
  background: rgba(18, 18, 18, 0.9);
  backdrop-filter: blur(8px);
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
`;

const FooterContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const GithubLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  transition: opacity ${({ theme }) => theme.transitions.default};

  &:hover {
    opacity: 0.8;
  }
`;

const CopyrightText = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.gray[400]};
`;

export function Footer() {
  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterContent>
          <GithubLink href="https://github.com/976520/meloadify/tree/master" target="_blank" rel="noopener noreferrer">
            <Image src="/github_logo.png" alt="GitHub" width={24} height={24} />
          </GithubLink>
          <CopyrightText>Copyright ⓒ 2025, All rights reserved</CopyrightText>
        </FooterContent>
      </FooterContainer>
    </FooterWrapper>
  );
}
