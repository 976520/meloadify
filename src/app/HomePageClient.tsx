"use client";

import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";
import { StatsContainer } from "@/widgets/stats-display/ui/StatsContainer";
import styled from "styled-components";

const MainContent = styled.main`
  min-height: 100vh;
  background: linear-gradient(180deg, #191414 0%, #000000 100%);
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
  flex: 1;
`;

interface HomePageClientProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  accessToken: string;
}

export function HomePageClient({ user, accessToken }: HomePageClientProps) {
  return (
    <MainContent>
      <Header user={user} />
      <ContentContainer>
        <StatsContainer accessToken={accessToken} user={user} />
      </ContentContainer>
      <Footer />
    </MainContent>
  );
}
