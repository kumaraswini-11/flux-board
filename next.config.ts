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
};

export default nextConfig;
