import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Explicitly set basePath to empty for custom domain
  basePath: '',
  // Ensure assets are served from root
  assetPrefix: '',
};

export default nextConfig;
