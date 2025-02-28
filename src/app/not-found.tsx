"use client";

import Link from "next/link";
import styled from "styled-components";

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(180deg, #1db954 -50%, #191414 100%);
  text-align: center;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.lightGrey};
  margin-bottom: 2rem;
`;

const BackLink = styled(Link)`
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.black};
  border-radius: 500px;
  font-weight: bold;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
    transform: scale(1.02);
  }
`;

export default function NotFound() {
  return (
    <NotFoundContainer>
      <Title>404</Title>
      <Message>죄송합니다</Message>
      <BackLink href="/">돌아가기</BackLink>
    </NotFoundContainer>
  );
}
