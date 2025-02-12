import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meloadify",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    title: "Meloadify",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meloadify",
  },
};
