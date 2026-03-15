import type { NextConfig } from "next";
import path from "path";

const assetBaseUrl = process.env.NEXT_PUBLIC_CLOUDFLARE_ASSET_BASE_URL;
const assetHostname = assetBaseUrl ? new URL(assetBaseUrl).hostname : '';

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  turbopack: {
    root: path.resolve(__dirname, ".."), // project root
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      ...(assetHostname ? [{
        protocol: 'https' as const,
        hostname: assetHostname,
        port: '',
        pathname: '/**',
      }] : []),
    ],
  },
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
  // Required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export default nextConfig;