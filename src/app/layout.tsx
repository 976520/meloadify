import "./globals.css";

import { Inter } from "next/font/google";
import { Metadata } from "next";
import { Providers } from "./providers";
import Script from "next/script";
import StyledComponentsRegistry from "@/shared/lib/registry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meloadify",
  description: "Spotify API",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
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
