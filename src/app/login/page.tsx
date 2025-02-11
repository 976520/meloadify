import { LoginButton } from "@/features/auth/login-button";
import { authOptions } from "@/shared/config/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
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

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/");
  }

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
