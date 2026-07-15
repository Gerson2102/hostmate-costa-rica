import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Export routes as directories (es/index.html) so GitHub Pages serves
  // /es/ directly; also keeps canonical/hreflang URLs slash-consistent
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Explicitly set basePath to empty for custom domain
  basePath: '',
  // Ensure assets are served from root
  assetPrefix: '',
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;
