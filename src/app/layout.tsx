"use client";

import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import { GlobalStyle } from "@/shared/styles/GlobalStyle";
import { Inter } from "next/font/google";
import Script from "next/script";
import StyledComponentsRegistry from "@/shared/lib/registry";
import { ThemeProvider } from "styled-components";
import { Toaster } from "sonner";
import { theme } from "@/shared/styles/theme";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self' https: data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' https: data: blob:; font-src 'self' https: data:; connect-src 'self' https: wss:;"
        />
      </head>
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Analytics />
            <Toaster position="top-right" theme="dark" richColors closeButton />
            {children}
          </ThemeProvider>
        </StyledComponentsRegistry>
        <Script id="handle-extensions" strategy="afterInteractive">
          {`
            window.addEventListener('load', function() {
              document.documentElement.removeAttribute('data-new-gr-c-s-check-loaded');
              document.documentElement.removeAttribute('data-gr-ext-installed');
            });
          `}
        </Script>
      </body>
    </html>
  );
}
