/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
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
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
};

module.exports = nextConfig;
