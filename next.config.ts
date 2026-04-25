import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // devIndicators:false,
  reactCompiler: true,
  typedRoutes: true,
  cacheComponents: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',     // all hostnames (wildcard)
        port: '',
        pathname: '/**'     // all paths
      },
    ],
  },
};

export default nextConfig;
