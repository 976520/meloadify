"use client";

import { Analytics } from "@vercel/analytics/react";
import { GlobalStyle } from "@/shared/styles/GlobalStyle";
import React from "react";
import { ThemeProvider } from "styled-components";
import { Toaster } from "sonner";
import { theme } from "@/shared/styles/theme";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
      <Analytics />
      <Toaster position="top-right" theme="dark" richColors closeButton />
    </>
  );
}
