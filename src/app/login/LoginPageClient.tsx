"use client";

import { LoginButton } from "@/features/login-with-spotify";
import styled from "styled-components";

const LoginWrapper = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #1db954 -50%, #191414 100%);
`;

const LoginContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  width: 100%;
  max-width: 400px;
  margin: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.lightGrey};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export function LoginPageClient() {
  return (
    <LoginWrapper>
      <LoginContainer>
        <Title>Meloadify</Title>
        <Subtitle>스포티파이 api 도전...</Subtitle>
        <LoginButton />
      </LoginContainer>
    </LoginWrapper>
  );
}
