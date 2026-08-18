import type { NextConfig } from "next";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Generate lib/content.generated.ts from content/**/*.json before Next.js
// evaluates the app. Runs on both `next dev` and `next build`. If content
// validation fails, scripts/build-content.mjs prints the offending file/field
// and exits non-zero, which aborts config evaluation here.
execFileSync(process.execPath, [path.join(__dirname, "scripts", "build-content.mjs")], {
  stdio: "inherit",
});

const nextConfig: NextConfig = {
  output: 'export',
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
