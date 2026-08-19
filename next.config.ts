import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "5050", pathname: "/uploads/**" },
      { protocol: "http", hostname: "127.0.0.1", port: "5050", pathname: "/uploads/**" },
      { protocol: "https", hostname: "**.devakihospital.com", pathname: "/uploads/**" },
      { protocol: "https", hostname: "devakihospital-backend.vercel.app", pathname: "/uploads/**" },
    ],
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
