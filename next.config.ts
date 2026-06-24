import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/communities/services/lgbtqia",
        destination: "/communities/services/queer-communities",
        permanent: true,
      },
      {
        source: "/communities/lgbtqia",
        destination: "/communities/services/queer-communities",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
