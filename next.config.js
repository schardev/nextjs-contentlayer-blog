import { withContentlayer } from "next-contentlayer";
import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["iconoir-react", "@icons-pack/react-simple-icons"],
  },
};

const config = () => {
  const plugins = [
    withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" }),
    withContentlayer,
  ];
  return plugins.reduce((acc, next) => next(acc), nextConfig);
};

export default config;
