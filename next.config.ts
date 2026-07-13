import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jwul10vtycq0k5q2.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;