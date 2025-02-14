import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  reactStrictMode: true,
  publicRuntimeConfig: {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
