import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    domains: ["static.usernames.app-backend.toolsforhumanity.com"],
  },
  allowedDevOrigins: ["*"], // Add your dev origin here
  reactStrictMode: false,
};

export default nextConfig;
