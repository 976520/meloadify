import "./globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meloadify - Your Spotify Statistics",
  description: "View your Spotify listening habits and statistics",
};

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
      <body className={inter.className}>
        {children}
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
