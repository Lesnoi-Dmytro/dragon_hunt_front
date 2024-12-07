import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/hub/combat",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
