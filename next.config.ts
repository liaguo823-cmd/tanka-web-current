import type { NextConfig } from "next";

const repo = "tanka-web-new";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages
  output: "export",
  // GitHub Pages serves at https://<user>.github.io/<repo>/, so all asset
  // URLs need the repo prefix in production.
  basePath: isProd ? `/${repo}` : undefined,
  assetPrefix: isProd ? `/${repo}/` : undefined,
  // Pages doesn't run the Next image optimizer.
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.simpleicons.org" },
      { protocol: "https", hostname: "icons.duckduckgo.com" },
    ],
  },
  // Pages prefers trailing-slash URLs to avoid 404s.
  trailingSlash: true,
};

export default nextConfig;
