import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'server-g8da.onrender.com',
        port: "",
        pathname: "/uploads/**/*",
      },

  
    ],
  },
};

export default nextConfig;