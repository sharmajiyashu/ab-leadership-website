import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
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
