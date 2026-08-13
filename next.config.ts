import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  outputFileTracingRoot: __dirname,
  experimental: {
    webpackMemoryOptimizations: true,
  },
};

export default nextConfig;
