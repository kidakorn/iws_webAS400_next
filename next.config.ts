import type { NextConfig } from "next";

// Fail the build immediately if the required API URL is not set
if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
  console.error("❌ ERROR: NEXT_PUBLIC_API_BASE_URL is missing in your environment variables.");
  console.error("Please add it to your .env.production or .env.local file before building.");
  process.exit(1);
}

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
  basePath: '/kidakorn',
};

export default nextConfig;
