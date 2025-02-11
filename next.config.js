/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "platform-lookaside.fbsbx.com",
        pathname: "/platform/profilepic/**",
      },
      {
        protocol: "https",
        hostname: "mosaic.scdn.co",
        pathname: "/**",
      },
    ],
  },
  // Suppress specific warnings
  reactStrictMode: true,
  experimental: {
    // This will force Next.js to use React's new client-side hydration
    optimizeCss: true,
  },
};

module.exports = nextConfig;
