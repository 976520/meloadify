import { metadata } from "./metadata";
import styled from "styled-components";

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export { metadata };

export default function Template({ children }: { children: React.ReactNode }) {
  return <PageWrapper>{children}</PageWrapper>;
}
